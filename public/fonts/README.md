# Chinese web fonts

Noto Serif SC and Noto Sans SC, from Google Fonts / the Noto project.
Sources: https://github.com/google/fonts/tree/main/ofl/notoserifsc and https://github.com/google/fonts/tree/main/ofl/notosanssc

Both fonts are licensed under SIL Open Font License 1.1; the complete licenses are adjacent to these files. These modified WOFF2 subsets use the family names Exhibition Chinese Serif and Exhibition Chinese Sans. They cover 588 Chinese characters and punctuation used by the current dictionaries and music records, with variable weights 400–600. Latin and Korean text keep their original fonts. Total WOFF2 transfer: approximately 323 KiB, cached normally by the browser and served from the same origin. No Chinese font-provider request is needed at runtime.

To regenerate after adding Chinese characters, install Python fonttools and brotli in a temporary virtual environment, then run `python scripts/subset-chinese-fonts.py` from the repository. Commit the resulting fonts, coverage.json, and src/chinese-fonts.css. Run npm test and npm run build. Runtime/build do not require Python or these font tools.

The previous implementation supplied no Chinese fonts: headings depended on Songti SC / Noto Serif CJK SC / SimSun, and body copy on generic sans-serif. Mobile CSS adjusted sizes but not families. The available browser automation cannot expose the old platform-resolved font names; computed CSS stacks are not proof of the rendered font. Actual iOS/Android devices were not available. Noto Serif preserves the Song-style serif direction; Noto Sans preserves the body/UI sans-serif direction. Rasterization can still differ slightly by device.

Preloads start both small subsets early; font-display: swap keeps text readable if loading is delayed. A slow network can still cause a brief fallback or minor reflow; zero layout shift under every network condition is not guaranteed.

## Latin fonts (2026-10-29)

Cormorant Garamond (normal 400/500/600, italic 400/500) and DM Sans
(normal 400/500/600) are served from this directory to avoid runtime requests
to Google Fonts. The original Google Fonts CSS faces were downloaded and
losslessly repackaged from TrueType to WOFF2 using fontTools; their existing
CSS family names, styles, weights and `font-display: swap` are retained.
The accompanying OFL files are from the official google/fonts repository.
