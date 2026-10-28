# A World Through Two Senses

**One painting. One song. One personal interpretation.**

An independent digital exhibition pairing twenty paintings by Vincent van Gogh with a soundtrack personally chosen by its curator. Five acts explore beginning, passion, wonder, introspection, and becoming. The paintings remain static, surrounded by a quiet museum-inspired design.

Built with React, Vite, Tailwind CSS, and Framer Motion for interface transitions. No database, backend, login, audio hosting, autoplay, or painting animation.

## Run locally

Use a current supported Node.js LTS release and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite.

## Check and build

```sh
npm test
npm run validate:curation
npm run build
npm run preview
```

`dist/` is the deployable website. Tests check artwork order, navigation boundaries, preserved original curation, local image files and safe music links. Curation validation checks all twenty completed selections. No lint or TypeScript configuration is currently included.

## Exhibition journey

Enter Exhibition begins at Almond Blossom. Previous/Next moves through all five acts, ending at Tree Roots. Continue leads to the exhibition ending. The chapter dropdown jumps to the first painting in each act. Image zoom, keyboard navigation, focus restoration, and reduced-motion support are retained.

The site uses one page with section anchors (`/#entrance`, `/#act-1` through `/#act-5`, `/#conclusion`). These links support direct navigation and refresh. Artwork modals are intentionally transient: refreshing returns to the underlying exhibition page. There are no individual artwork routes.

## Chinese and English

First-time visitors see Simplified Chinese (`zh-CN`), regardless of browser language. The **中文 | EN** control remains available on the page and inside artwork and credits dialogs. Choices are stored locally under `exhibition-language`; blocked storage does not prevent switching during the current visit. Initial language is read before rendering, with a small head script to set the document language and title before first paint.

- `src/locales/zh-CN.json` and `src/locales/en.json` contain matching keys for interface copy, metadata, all 20 artwork descriptions and all five acts.
- Original IDs, image paths, dates, source links and the music database remain in their existing files. Translation records cannot replace these fields.
- The previously retained Chinese chapter copy was reviewed; Acts II–IV use the curator's newly approved titles: 艺术在燃烧、天空没有极限、心的距离.
- Song titles, artist names and URLs are never translated. All current curator notes are empty. When adding notes, add both language versions under `curatorNotes` using the artwork ID; the original note remains a fallback.
- Institution names are translated where clear; some official names are retained to avoid ambiguity. No translation API or new dependency is used.
- `npm test` checks dictionary parity, coverage, default-language behavior and preservation of English artwork facts.

## Edit your curation

- `src/artworks.json`: artwork facts, image paths, attribution and source links.
- `src/chapters.json`: the five acts and artwork order.
- `src/artworkMusic.json`: song titles, artists, external music URLs and optional curator notes.
- `public/art/`: the twenty artwork reproductions.
- `ARTWORK-CREDITS.md`: source and reuse information.

Keep artwork IDs stable. Every music record uses:

```json
{
  "songTitle": "",
  "artist": "",
  "musicUrl": "",
  "curatorNote": ""
}
```

Edit existing values rather than adding duplicate IDs. Notes are optional plain text. Music links open in a new tab; the website does not stream music itself. NetEase availability may depend on region, account status and rights. Supplied URLs are kept as entered.

| No. | Act | Stable ID | Painting |
| --- | --- | --- | --- |
| 01 | I · The Courage to Begin | `almond` | Almond Blossom |
| 02 | I | `courting-couples` | Garden with Courting Couples: Square Saint-Pierre |
| 03 | I | `yellow-house` | The Yellow House |
| 04 | I | `first-steps` | First Steps, after Millet |
| 05 | II · The Beautiful Art of Burning | `sower` | The Sower |
| 06 | II | `red-vineyard` | The Red Vineyard |
| 07 | II | `sunflowers` | Sunflowers |
| 08 | II | `mulberry-tree` | The Mulberry Tree |
| 09 | III · A Sky Without Borders | `sea-saintes-maries` | The Sea at Les Saintes-Maries-de-la-Mer |
| 10 | III | `rhone` | Starry Night over the Rhône |
| 11 | III | `starry-night` | The Starry Night |
| 12 | III | `cypress-star` | Road with Cypress and Star |
| 13 | IV · The Rooms Within Us | `irises` | Irises |
| 14 | IV | `bedroom` | The Bedroom |
| 15 | IV | `cafe` | Café Terrace at Night |
| 16 | IV | `self-portrait` | Self-Portrait (Musée d’Orsay) |
| 17 | V · Everything Is Still Becoming | `olive-trees` | Olive Trees with Yellow Sky and Sun |
| 18 | V | `wheatfield` | A Wheatfield, with Cypresses |
| 19 | V | `thunderclouds` | Wheatfield under Thunderclouds |
| 20 | V | `tree-roots` | Tree Roots |

## Deploy to Vercel

Public repository: [caseyliukexin/Hobby](https://github.com/caseyliukexin/Hobby). Production website: [A World Through Two Senses](https://hobby-rho-ten.vercel.app/). The existing Vercel project deploys from `main`.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Root directory | Repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Required secrets | None |

`vercel.json` records the build settings. Connect the GitHub repository for automatic deployments from the production branch. Use Hobby only for personal, non-commercial use; see [Vercel Hobby](https://vercel.com/docs/plans/hobby). Do not enable paid add-ons for this site.

Social-sharing metadata reuses the Almond Blossom image. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the canonical production hostname at build time; keep system environment variables enabled. Optionally set the non-secret `SITE_URL` to a public HTTPS custom-domain URL, then redeploy. Local builds use a relative preview image until a production hostname is supplied.

## Attribution and permissions

The painting records link to faithful reproductions marked public domain by their sources; see `ARTWORK-CREDITS.md` for jurisdictional caveats. Music belongs to its rights holders and is linked, not distributed. Google Fonts serves Cormorant Garamond and DM Sans, with system-font fallbacks. This is an independent exhibition and does not claim museum or music-platform endorsement. No blanket software license is granted by this README.

## Repository hygiene

Commit application source, the lockfile, credited images and tests. Exclude dependency folders, build output, credentials, `.env` files, Vercel account state, former hosting metadata, personal workspace files and experimental assets.
