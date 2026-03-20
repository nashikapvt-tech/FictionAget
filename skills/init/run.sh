#!/usr/bin/env bash
# init — template initialization: rename project identity across the repo
# Usage: bash skills/init/run.sh
# Or non-interactive: PROJECT_NAME="My App" bash skills/init/run.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

# ── Helpers ───────────────────────────────────────────────────────────────────
green()  { echo -e "\033[0;32m$*\033[0m"; }
yellow() { echo -e "\033[0;33m$*\033[0m"; }
red()    { echo -e "\033[0;31m$*\033[0m"; }
step()   { echo ""; echo "── $* ──────────────────────────────────────"; }

# ── Platform-specific sed ─────────────────────────────────────────────────────
if [[ "$(uname)" == "Darwin" ]]; then
  sedi() { sed -i '' "$@"; }
else
  sedi() { sed -i "$@"; }
fi

# ── Guard: already initialized? ──────────────────────────────────────────────
CURRENT_NAME=$(grep -o '"name": "[^"]*"' package.json | head -1 | sed 's/"name": "//;s/"//')
if [[ "$CURRENT_NAME" != "ai-native-monorepo" ]]; then
  yellow "This repo appears already initialized (current name: $CURRENT_NAME)."
  read -rp "Re-initialize? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || exit 0
fi

# ── Collect inputs ────────────────────────────────────────────────────────────
step "Project details"

PROJECT_NAME="${PROJECT_NAME:-}"
if [[ -z "$PROJECT_NAME" ]]; then
  read -rp "Project name (e.g. 'My Awesome App'): " PROJECT_NAME
fi
if [[ -z "$PROJECT_NAME" ]]; then
  red "Project name is required."
  exit 1
fi

# Auto-derive slug: lowercase, replace non-alnum with hyphens, collapse, trim
DEFAULT_SLUG=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g; s/--*/-/g; s/^-//; s/-$//')

PROJECT_SLUG="${PROJECT_SLUG:-}"
if [[ -z "$PROJECT_SLUG" ]]; then
  read -rp "Project slug [$DEFAULT_SLUG]: " PROJECT_SLUG
  PROJECT_SLUG="${PROJECT_SLUG:-$DEFAULT_SLUG}"
fi

PACKAGE_SCOPE="${PACKAGE_SCOPE:-}"
if [[ -z "$PACKAGE_SCOPE" ]]; then
  read -rp "Package scope without @ [repo]: " PACKAGE_SCOPE
  PACKAGE_SCOPE="${PACKAGE_SCOPE:-repo}"
fi

DESCRIPTION="${DESCRIPTION:-}"
if [[ -z "$DESCRIPTION" ]]; then
  read -rp "One-line description [A modern full-stack application]: " DESCRIPTION
  DESCRIPTION="${DESCRIPTION:-A modern full-stack application}"
fi

# ── Derived values ────────────────────────────────────────────────────────────
API_NAME="${PROJECT_NAME} API"
CONTAINER_PREFIX=$(echo "$PROJECT_SLUG" | tr '-' '_')
DB_NAME=$(echo "$PROJECT_SLUG" | tr '-' '_' | head -c 32)

echo ""
echo "  Project name:     $PROJECT_NAME"
echo "  Slug:             $PROJECT_SLUG"
echo "  Package scope:    @${PACKAGE_SCOPE}"
echo "  Description:      $DESCRIPTION"
echo "  API name:         $API_NAME"
echo "  Container prefix: ${CONTAINER_PREFIX}_"
echo "  DB name:          $DB_NAME"
echo ""

# ── Replace helper ────────────────────────────────────────────────────────────
# replace_in OLD NEW FILE1 FILE2 ...
# Uses | as sed delimiter to avoid issues with URLs and paths
replace_in() {
  local old="$1" new="$2"
  shift 2
  local count=0
  for f in "$@"; do
    if [[ -f "$f" ]] && grep -qF "$old" "$f"; then
      sedi "s|${old}|${new}|g" "$f"
      count=$((count + 1))
    fi
  done
  if [[ $count -gt 0 ]]; then
    echo "  '$old' → '$new'  ($count file(s))"
  fi
}

# ── Target files (explicit list — never glob into .git/ or lock files) ────────
TARGETS=(
  package.json
  pyproject.toml
  Makefile
  docker-compose.yml
  .env.example
  openapi.json
  README.md
  CLAUDE.md
  AGENTS.md
  apps/api/pyproject.toml
  apps/api/app/core/config.py
  apps/api/app/main.py
  apps/api/.env.example
  apps/web/package.json
  apps/web/src/app/layout.tsx
  apps/web/AGENTS.md
  packages/shared-types/package.json
  packages/ui/package.json
  .github/workflows/deploy.yml
  skills/deploy/run.sh
  skills/docker/README.md
  skills/dependency-add/run.sh
  skills/dependency-add/manifest.json
  skills/dependency-add/README.md
  skills/SKILLS_REGISTRY.md
)

# ── Execute replacements (most specific first) ───────────────────────────────
step "Replacing project identity"

# 1. Full name with API suffix (before bare name to avoid partial match)
replace_in "AI-Native Monorepo API" "$API_NAME" "${TARGETS[@]}"

# 2. Full human-readable name
replace_in "AI-Native Monorepo" "$PROJECT_NAME" "${TARGETS[@]}"

# 3. Kebab-case slug
replace_in "ai-native-monorepo" "$PROJECT_SLUG" "${TARGETS[@]}"

# 4. Package scope (only if changing from default)
if [[ "$PACKAGE_SCOPE" != "repo" ]]; then
  step "Replacing package scope @repo → @${PACKAGE_SCOPE}"
  replace_in "@repo/" "@${PACKAGE_SCOPE}/" "${TARGETS[@]}"
  # Also handle import references without trailing slash (e.g. "@repo/ui")
  # The above with trailing slash catches "@repo/shared-types" and "@repo/ui" already
fi

# 5. API description in main.py
replace_in "Backend API with AI memory integration" "$DESCRIPTION" \
  apps/api/app/main.py openapi.json

# 6. Next.js metadata placeholders
if [[ -f apps/web/src/app/layout.tsx ]]; then
  sedi "s|title: \"Create Next App\"|title: \"${PROJECT_NAME}\"|g" apps/web/src/app/layout.tsx
  sedi "s|description: \"Generated by create next app\"|description: \"${DESCRIPTION}\"|g" apps/web/src/app/layout.tsx
  echo "  Updated Next.js metadata in layout.tsx"
fi

# 7. Container names in docker-compose
replace_in "monorepo_postgres" "${CONTAINER_PREFIX}_postgres" docker-compose.yml skills/docker/README.md
replace_in "monorepo_api" "${CONTAINER_PREFIX}_api" docker-compose.yml skills/docker/README.md

# 8. Postgres defaults in docker-compose (the ${VAR:-default} pattern)
replace_in "POSTGRES_USER:-monorepo" "POSTGRES_USER:-${DB_NAME}" docker-compose.yml
replace_in "POSTGRES_PASSWORD:-monorepo" "POSTGRES_PASSWORD:-${DB_NAME}" docker-compose.yml
replace_in "POSTGRES_DB:-monorepo" "POSTGRES_DB:-${DB_NAME}" docker-compose.yml

# 9. Postgres defaults in .env.example (VAR=value pattern)
replace_in "POSTGRES_USER=monorepo" "POSTGRES_USER=${DB_NAME}" .env.example
replace_in "POSTGRES_PASSWORD=monorepo" "POSTGRES_PASSWORD=${DB_NAME}" .env.example
replace_in "POSTGRES_DB=monorepo" "POSTGRES_DB=${DB_NAME}" .env.example

# 10. DB connection string in api .env.example comment
replace_in "monorepo:monorepo@localhost:5432/monorepo" \
  "${DB_NAME}:${DB_NAME}@localhost:5432/${DB_NAME}" apps/api/.env.example

# 11. GAR_REPO defaults
replace_in "GAR_REPO     ?= monorepo" "GAR_REPO     ?= ${PROJECT_SLUG}" Makefile
replace_in "GAR_REPO:-monorepo" "GAR_REPO:-${PROJECT_SLUG}" skills/deploy/run.sh
# deploy.yml uses 'monorepo' as fallback string
if [[ -f .github/workflows/deploy.yml ]] && grep -qF "'monorepo'" .github/workflows/deploy.yml; then
  sedi "s|'monorepo'|'${PROJECT_SLUG}'|g" .github/workflows/deploy.yml
  echo "  Updated GAR_REPO default in deploy.yml"
fi

# 12. GitHub URL placeholder
replace_in "github.com/whyujjwal/AgentOptimisedMonorepo" \
  "github.com/YOUR_ORG/${PROJECT_SLUG}" README.md
replace_in "AgentOptimisedMonorepo" "$PROJECT_SLUG" README.md

# ── Cleanup ───────────────────────────────────────────────────────────────────
step "Cleanup"

echo "  Removing lock files (regenerate with 'make setup')"
rm -f pnpm-lock.yaml uv.lock

# ── Optional: fresh git history ───────────────────────────────────────────────
echo ""
read -rp "Remove git history for a fresh start? [y/N] " RESET_GIT
if [[ "$RESET_GIT" =~ ^[Yy]$ ]]; then
  rm -rf .git
  git init
  git add -A
  git commit -m "chore: initialize ${PROJECT_NAME} from template"
  green "  Fresh git history created"
fi

# ── Optional: run make setup ──────────────────────────────────────────────────
echo ""
read -rp "Run 'make setup' now to install dependencies? [Y/n] " RUN_SETUP
if [[ ! "$RUN_SETUP" =~ ^[Nn]$ ]]; then
  make setup
fi

# ── Summary ───────────────────────────────────────────────────────────────────
step "Done"
echo ""
echo "  Project name:     $PROJECT_NAME"
echo "  Slug:             $PROJECT_SLUG"
echo "  Package scope:    @${PACKAGE_SCOPE}"
echo "  Description:      $DESCRIPTION"
echo "  API name:         $API_NAME"
echo "  Container prefix: ${CONTAINER_PREFIX}_"
echo "  DB name:          $DB_NAME"
echo ""
green "  Template initialized successfully!"
echo ""
echo "  Next steps:"
echo "    1. Review changes: git diff (if git history was kept)"
echo "    2. Edit .env files with your secrets"
echo "    3. Run: make dev"
echo ""
