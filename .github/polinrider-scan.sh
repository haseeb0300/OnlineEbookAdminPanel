#!/usr/bin/env bash
# PolinRider guard scanner / cleaner.
#   bash polinrider-scan.sh [dir]           scan only      exit 0 clean, 1 INFECTED
#   bash polinrider-scan.sh --clean [dir]   scan + strip payloads / delete artifacts, exit 0 if tree is clean afterwards, 1 if something could not be cleaned
# Works in GitHub Actions (ubuntu) and Git Bash on Windows.
set -u
CLEAN=0; [ "${1:-}" = "--clean" ] && { CLEAN=1; shift; }
cd "${1:-.}" 2>/dev/null || { echo "no such dir: ${1:-.}"; exit 2; }
CRIT=""; WARN=""; FIXED=""; LEFT=""
crit(){ CRIT="${CRIT}  [CRITICAL] $1"$'\n'; }; warn(){ WARN="${WARN}  [warning]  $1"$'\n'; }; fixed(){ FIXED="${FIXED}  [cleaned]  $1"$'\n'; }; left(){ LEFT="${LEFT}  [NOT CLEANED] $1"$'\n'; }
MARK='rmcej%otb%|Cot%3t=shtP|_\$_1e42|A8-4892|RS260605|M260630A|__inzCR|193\.247\.144\.38|app-[A-Za-z]+-eval|verify-human/'
SKIP='(^|/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb|[^/]*\.lock)$|(^|/)(node_modules|dist|build|\.next|vendor)/|polinrider-scan\.sh$|polinrider-guard\.yml$|polinrider-monitor\.yml$'
list_files(){ if git rev-parse --git-dir >/dev/null 2>&1; then git ls-files -co --exclude-standard; else find . -type f -not -path '*/node_modules/*' -not -path '*/.git/*' | sed 's#^\./##'; fi | grep -vE "$SKIP"; }
# strip: drop the createRequire shim lines, cut the first line at a >=60-blank padding run, drop everything after it
strip_payload(){ awk 'BEGIN{cut=0} { if (cut) next; if ($0 ~ /^import \{ createRequire \} from .module.;\r?$/ || $0 ~ /^const require = createRequire\(import\.meta\.url\);\r?$/) next; if (match($0, /[ \t]{60,}[^ \t]/)) { l=substr($0,1,RSTART-1); sub(/[ \t]+$/,"",l); if (length(l)) print l; cut=1; next } print }' "$1"; }
FILES=$(list_files)
# 1. payload markers anywhere
while IFS= read -r f; do [ -n "$f" ] || continue
  if [ $CLEAN = 1 ]; then tmp="$f.polinrider-tmp"; strip_payload "$f" > "$tmp"
    if grep -qE "$MARK" "$tmp"; then rm -f "$tmp"; left "payload marker still present after strip: $f (revert this file to a clean revision by hand)"; crit "payload marker in: $f"
    elif [ ! -s "$tmp" ]; then rm -f "$tmp" "$f"; fixed "deleted (file was entirely payload): $f"
    else mv -f "$tmp" "$f"; fixed "stripped payload from: $f (now $(wc -c <"$f") B)"; fi
  else crit "payload marker in: $f"; fi
done < <(printf '%s\n' "$FILES" | tr '\n' '\0' | xargs -0 -r grep -lE "$MARK" 2>/dev/null)
# 2. propagation artifacts
while IFS= read -r f; do [ -n "$f" ] || continue; if [ $CLEAN = 1 ]; then rm -f "$f" && fixed "deleted propagation artifact: $f"; else crit "propagation artifact: $f"; fi; done < <(printf '%s\n' "$FILES" | grep -iE '(^|/)(temp_auto_push\.bat|config\.bat|fa-solid-400\.woff2)$')
# 3. config files: hidden code after whitespace padding (no marker, e.g. a new variant), shim, oversized
while IFS= read -r f; do [ -f "$f" ] || continue; sz=$(wc -c <"$f")
  if grep -qE '[[:blank:]]{60,}[^[:space:]]' "$f"; then
    if [ $CLEAN = 1 ]; then tmp="$f.polinrider-tmp"; strip_payload "$f" > "$tmp"; mv -f "$tmp" "$f"; fixed "stripped hidden code after padding: $f (${sz} -> $(wc -c <"$f") B)"; else crit "hidden code after whitespace padding: $f (${sz} B)"; fi
  elif grep -qF 'createRequire(import.meta.url)' "$f" && [ "$sz" -gt 3000 ]; then crit "createRequire shim + large config (inspect): $f (${sz} B)"
  elif [ "$sz" -gt 6000 ]; then warn "config file unusually large: $f (${sz} B) — inspect the end of the file"; fi
done < <(printf '%s\n' "$FILES" | grep -E '(^|/)[A-Za-z0-9._-]*\.config\.(js|mjs|cjs|ts|mts|cts)$')
# 4. VS Code auto-run tasks
while IFS= read -r f; do [ -f "$f" ] || continue; grep -q 'folderOpen' "$f" || continue
  if grep -qiE 'curl|wget|powershell|Invoke-|node |\.woff2|\.dict|http' "$f"; then if [ $CLEAN = 1 ]; then rm -f "$f" && fixed "deleted auto-run task file: $f"; else crit "auto-run VS Code task with network/exec: $f"; fi; else warn "VS Code task runs on folderOpen: $f"; fi
done < <(printf '%s\n' "$FILES" | grep -E '(^|/)\.vscode/tasks\.json$')
# 5. fake .woff2 fonts
while IFS= read -r f; do [ -f "$f" ] || continue; [ "$(head -c 4 "$f" 2>/dev/null)" = "wOF2" ] && continue; if [ $CLEAN = 1 ]; then rm -f "$f" && fixed "deleted fake font: $f"; else crit "fake font file (not a WOFF2): $f"; fi; done < <(printf '%s\n' "$FILES" | grep -iE '\.woff2$')
# 6. known malicious packages (never auto-edited — a human must fix package.json)
while IFS= read -r f; do [ -n "$f" ] || continue; crit "known malicious dependency in: $f"; [ $CLEAN = 1 ] && left "remove the malicious dependency by hand: $f"; done < <(printf '%s\n' "$FILES" | grep -E '(^|/)package\.json$' | tr '\n' '\0' | xargs -0 -r grep -lE 'tailwindcss-style-animate|tailwind-mainanimation|tailwind-autoanimation|tailwindcss-typography-style|@common-stack/generate-plugin' 2>/dev/null)
echo "PolinRider scan of $(pwd)$([ $CLEAN = 1 ] && echo ' (clean mode)')"
[ -n "$FIXED" ] && printf '%s' "$FIXED"; [ -n "$LEFT" ] && printf '%s' "$LEFT"
if [ $CLEAN = 1 ]; then [ -n "$WARN" ] && printf '%s' "$WARN"; if [ -n "$LEFT" ]; then echo "RESULT: PARTIALLY CLEANED"; exit 1; elif [ -n "$FIXED" ]; then echo "RESULT: CLEANED"; exit 0; else echo "  nothing to clean"; exit 0; fi; fi
if [ -z "$CRIT$WARN" ]; then echo "  clean"; exit 0; fi
[ -n "$CRIT" ] && printf '%s' "$CRIT"; [ -n "$WARN" ] && printf '%s' "$WARN"
[ -n "$CRIT" ] && { echo "RESULT: INFECTED"; exit 1; } || { echo "RESULT: warnings only"; exit 0; }
