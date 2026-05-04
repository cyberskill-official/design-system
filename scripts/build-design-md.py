# DEPRECATED — build-design-md.py is no longer needed
#
# As of 2026-05-04 (v1.0.2), DESIGN.md is the single source-of-truth for the
# CyberSkill Global Design System. The doctrine/ folder has been collapsed into
# redirect stubs. There is no longer a build step that flattens doctrine/<part>.md
# into DESIGN.md — DESIGN.md is now edited directly.
#
# This script is preserved for git history. Do not run it; it would attempt to
# read doctrine/ files that are now stubs and would corrupt DESIGN.md.
#
# If you ever need to revert to the multi-file model: `git revert` to a commit
# before 2026-05-04, then run this script.

import sys
print("DEPRECATED: this script is no longer maintained.", file=sys.stderr)
print("DESIGN.md is now the single source of truth. Edit it directly.", file=sys.stderr)
sys.exit(1)
