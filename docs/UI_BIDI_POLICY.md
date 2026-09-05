# UI Bidi Policy

The app is Persian/RTL overall, but Python code and English tokens must remain true LTR.

- Persian instructional text: RTL.
- Code blocks, code editors, variable names, function names, expected output, and English-only options: LTR.
- Mixed Persian/English question text must not reverse Python tokens or punctuation.
- Code-repair starter code must be copied exactly as displayed.
- UI changes involving mixed direction must be covered by `scripts/validate-bidi.mjs` where practical.
