# Chinese copy editing guide

**Edit `src/locales/zh-CN.json`. This guide is a reference snapshot, not a text source used by the website.**

The unchanged English source is `src/locales/en.json`. Both files use the same keys. JSON does not support comments, so English comparisons are provided here instead.

Change only the quoted text values, not keys, artwork IDs, braces, or commas. Preserve placeholders such as `{number}`, `{title}`, and `{platform}`. Use `\n` for a line break inside a JSON string; escape literal double quotes as `\"`.

`ui.title` controls the complete exhibition title; the visible homepage title is split between `ui.titleFirst` and `ui.titleSecond`. Review all three together. The bilingual layout reads the same dictionaries, so Chinese act-title edits also appear as secondary titles in English mode. No layout changes are necessary.

## Other text locations

- `src/artworkMusic.json`: original song titles, artist names, URLs, and fallback notes. These are intentionally not translated; leave music selections unchanged. All current notes are empty. Chinese-only notes can be edited under `curatorNotes` in the Chinese dictionary. Empty localized notes fall back to the music record note.
- `src/LanguageSwitcher.jsx`: the fixed `中文 | EN` language selector labels. Leave these unchanged.
- `src/chapters.json`: legacy `chineseTitle` values are not rendered. Edit `chapters` in the Chinese dictionary instead.
- `index.html`: static Chinese title and social/SEO descriptions used before JavaScript or by sharing crawlers. The app updates metadata from the dictionary at runtime, and the build reads the localized title. Static descriptions/image-alt metadata must be synchronized with approved dictionary edits before a later deployment. Nothing has been changed or published now.

The comparison tables below cover every Chinese dictionary value. Existing artwork IDs and key paths are shown explicitly.

## 1. Homepage / 首页

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.title` | A World Through Two Senses | 用两种感官感知世界 |
| `ui.titleFirst` | A World Through | 用两种感官 |
| `ui.titleSecond` | Two Senses | 感知世界 |
| `ui.subtitle` | VINCENT VAN GOGH, REIMAGINED THROUGH MUSIC | 以音乐重新感知文森特·梵高 |
| `ui.statementFirst` | Vincent painted what he saw. | 文森特画下他所见的世界， |
| `ui.statementSecond` | I listen to what he felt. | 我聆听他所感的生命。 |
| `ui.vincent` | Vincent | 文森特 |
| `ui.painter` | Vincent van Gogh | 文森特·梵高 |
| `ui.artMusic` | ART × MUSIC | 艺术 × 音乐 |
| `ui.enter` | Enter Exhibition | 进入展览 |
| `ui.paintingsCount` | 20 PAINTINGS | 20 幅画作 |
| `ui.actsSenses` | FIVE ACTS · TWO SENSES | 五幕展览 · 两种感官 |
| `ui.scrollLabel` | Scroll to explore | 向下滚动，探索展览 |
| `ui.scroll` | SCROLL TO DISCOVER | 向下探索 |
| `ui.concept` | ONE PAINTING. ONE SONG. ONE PERSONAL INTERPRETATION. | 一幅画。一首歌。一种私人的解读。 |

## 2. Exhibition Introduction / 展览介绍

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.complete` | THE COMPLETE EXHIBITION · 20 WORKS | 完整展览 · 20 幅作品 |
| `ui.introFirst` | Five acts. | 五幕展览， |
| `ui.introSecond` | One unfolding world. | 一个徐徐展开的世界。 |
| `ui.dialogueFirst` | A dialogue between Vincent’s paintings | 文森特的画作， |
| `ui.dialogueSecond` | and music chosen by one listener. | 与一位聆听者所选音乐的对话。 |
| `ui.dimensions` | Beginning. Burning. Wonder. Introspection. Becoming. | 开始。燃烧。惊叹。内省。生长。 |
| `ui.journey` | Follow the journey, or find your own way through. | 循着展览前行，或寻找属于自己的路径。 |
| `ui.beginAlmond` | Begin with Almond Blossom | 从《盛开的杏花》开始 |
| `ui.aboutFirst` | A painting. | 一幅画。 |
| `ui.aboutSecond` | A song. | 一首歌。 |
| `ui.aboutThird` | A personal interpretation. | 一种私人的解读。 |
| `ui.aboutDescription` | This exhibition creates a dialogue between Vincent van Gogh’s paintings and contemporary music personally selected by the curator. | 本展览让文森特·梵高的画作与策展人亲自选择的当代音乐展开对话。 |
| `ui.aboutStructure` | The five acts explore emotional and philosophical dimensions of human experience, rather than a chronological biography. | 五幕展览从情感与哲思出发，探寻人的生命体验，而非依照时间讲述艺术家的生平。 |
| `ui.independent` | An independent art & music exhibition. | 一个独立的艺术与音乐展览。 |
| `ui.conceptSentence` | One painting. One song. One personal interpretation. | 一幅画。一首歌。一种私人的解读。 |

## 3. Five Acts / 五幕展览

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.act` | Act | 幕 |
| `ui.actLabel` | ACT {number} | 第 {number} 幕 |
| `ui.chapterPeriod` | . | 。 |
| `chapters.act-1.title` | The Courage to Begin | 开始的勇气 |
| `chapters.act-1.dimension` | Beginning | 开始 |
| `chapters.act-1.introduction` | Spring, encounters, hope, and love. A beginning can be a quiet act of courage. | 春天、相遇、希望与爱。每一个开始，都可以是一种安静的勇敢。 |
| `chapters.act-2.title` | The Beautiful Art of Burning | 艺术在燃烧 |
| `chapters.act-2.dimension` | Burning | 燃烧 |
| `chapters.act-2.introduction` | Creativity and labour, passion and summer. The intensity of being alive, held in colour. | 创造与劳作，热情与盛夏。生命的炽烈，被凝聚在色彩之中。 |
| `chapters.act-3.title` | A Sky Without Borders | 天空没有极限 |
| `chapters.act-3.dimension` | Wonder | 惊叹 |
| `chapters.act-3.introduction` | Sea, night, and stars. An invitation to look beyond the familiar, towards freedom and the vastness of existence. | 大海、夜色与星辰。邀请我们望向熟悉世界之外，走近自由与存在的辽阔。 |
| `chapters.act-4.title` | The Rooms Within Us | 心的距离 |
| `chapters.act-4.dimension` | Introspection | 内省 |
| `chapters.act-4.introduction` | Private spaces, relationships, and self-perception. A closer look at intimacy and the vulnerability of being seen. | 私密空间、人与人的关系，以及对自我的感知。靠近亲密，也凝视被看见时的脆弱。 |
| `chapters.act-5.title` | Everything Is Still Becoming | 万物仍在生长 |
| `chapters.act-5.dimension` | Becoming | 生长 |
| `chapters.act-5.introduction` | Nature, uncertainty, and resilience. Life continues through change, with no final shape and no fixed ending. | 自然、未知与韧性。生命在变化中延续，没有最终的形状，也没有固定的终点。 |

## 4. Artwork Titles and Descriptions / 画作标题与描述

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `artworks.almond.title` | Almond Blossom | 盛开的杏花 |
| `artworks.almond.description` | White blossoms reach across a clear turquoise sky. Dark, branching contours give each delicate flower a quiet presence. | 白色花朵舒展在清澈的绿松石色天空下。深色枝条勾勒出分明的轮廓，让每一朵柔弱的花都拥有安静的存在感。 |
| `artworks.irises.title` | Irises | 鸢尾花 |
| `artworks.irises.description` | Violet irises rise from a tangle of pointed green leaves. A single pale flower interrupts the rhythm of the crowded garden. | 紫色鸢尾从交错的尖长绿叶间挺立而出。一朵浅色的花，打破了这片繁密花园的节奏。 |
| `artworks.wheatfield.title` | A Wheatfield, with Cypresses | 麦田与柏树 |
| `artworks.wheatfield.description` | Golden wheat bends beneath rolling clouds. Dark cypresses stand against the restless curves of the field and sky. | 金色麦穗在翻涌的云层下低垂。深色柏树挺立其间，与麦田和天空中不安的曲线相映。 |
| `artworks.sunflowers.title` | Sunflowers | 向日葵 |
| `artworks.sunflowers.description` | Ochre, amber and gold fill a simple vase. Flowers at different stages of life turn a familiar still life into a study of luminous yellow. | 赭色、琥珀色与金色盛放在朴素的花瓶中。处于不同生命阶段的花朵，让熟悉的静物成为一场关于明亮黄色的探索。 |
| `artworks.bedroom.title` | The Bedroom | 卧室 |
| `artworks.bedroom.description` | Blue walls meet warm wooden furniture and a red blanket. Tilted lines bring an intimate room close to the viewer. | 蓝色墙壁与温暖的木制家具、红色毯子相接。倾斜的线条将这个私密的房间拉近到观者眼前。 |
| `artworks.yellow-house.title` | The Yellow House | 黄房子 |
| `artworks.yellow-house.description` | Sunlit yellow buildings stand beneath a saturated blue sky. Small figures and a distant train bring movement to the street. | 阳光下的黄色建筑矗立在浓郁的蓝天下。街上的小小人影与远处的火车，为街景带来动感。 |
| `artworks.starry-night.title` | The Starry Night | 星月夜 |
| `artworks.starry-night.description` | Stars radiate through a sky of sweeping blue curves. A dark cypress rises above the small, still village below. | 星光在流转的蓝色曲线间闪耀。一株深色柏树高高耸起，下方的小村庄静静安睡。 |
| `artworks.rhone.title` | Starry Night over the Rhône | 罗讷河上的星夜 |
| `artworks.rhone.description` | Golden lights stretch across deep blue water. Beneath the stars, two figures stand together at the river’s edge. | 金色灯光铺展在深蓝色水面上。星空之下，两个人影并肩站在河岸边。 |
| `artworks.cafe.title` | Café Terrace at Night | 夜间的露天咖啡座 |
| `artworks.cafe.description` | A brilliant yellow café spills light onto the cobbled street. Deep blue buildings frame a small opening of star-filled sky. | 明亮的黄色咖啡座将灯光洒向石板街道。深蓝色建筑围出一角缀满星辰的天空。 |
| `artworks.courting-couples.title` | Garden with Courting Couples: Square Saint-Pierre | 花园中的恋人：圣皮埃尔广场 |
| `artworks.courting-couples.description` | Small figures walk and sit beneath young trees. Short strokes of green and yellow cover the garden and its curving paths. | 小小的人影在幼树下漫步、休憩。绿色与黄色的短笔触铺满花园和蜿蜒的小径。 |
| `artworks.first-steps.title` | First Steps, after Millet | 第一步（临摹米勒） |
| `artworks.first-steps.description` | A child stretches toward a kneeling figure across a garden path. Pale greens, blue clothing and flowering trees frame the family. | 一个孩子隔着花园小径，伸手走向跪地迎接他的人。浅绿的草木、蓝色衣衫与开花的树，环抱着这个家庭。 |
| `artworks.sower.title` | The Sower | 播种者 |
| `artworks.sower.description` | A large yellow sun rises above a blue-violet field. A figure scatters seed across the thickly painted earth. | 一轮硕大的黄色太阳升起在蓝紫色田野上。一个身影将种子撒向由厚重笔触描绘的土地。 |
| `artworks.red-vineyard.title` | The Red Vineyard | 红色葡萄园 |
| `artworks.red-vineyard.description` | Workers bend among red and orange vines beneath a yellow sky. A bright sun and reflective water mark the distant edge of the field. | 黄色天空下，劳作者俯身于红色与橙色的葡萄藤间。明亮的太阳与映光的水面，勾勒出田野远处的边缘。 |
| `artworks.mulberry-tree.title` | The Mulberry Tree | 桑树 |
| `artworks.mulberry-tree.description` | Golden leaves spread from a dark, twisting trunk. Curving brushstrokes cross the blue sky and pale ground around the tree. | 金色树叶从深色、扭转的树干向外舒展。弯曲的笔触穿过蓝天，也掠过树旁浅色的土地。 |
| `artworks.sea-saintes-maries.title` | The Sea at Les Saintes-Maries-de-la-Mer | 圣马利海景 |
| `artworks.sea-saintes-maries.description` | Green and blue waves break into white crests in the foreground. Small sails cross the water beneath a pale, clouded sky. | 前景中，蓝绿色波浪碎成白色浪尖。浅淡多云的天空下，小小帆影横越水面。 |
| `artworks.cypress-star.title` | Road with Cypress and Star | 柏树与星空下的道路 |
| `artworks.cypress-star.description` | A tall cypress divides a sky lit by a star and crescent moon. Two figures and a carriage travel along the pale winding road. | 高高的柏树将星辰与新月照亮的天空分开。两个人影与一辆马车，行进在浅色的蜿蜒道路上。 |
| `artworks.self-portrait.title` | Self-Portrait | 自画像 |
| `artworks.self-portrait.description` | A red beard and attentive gaze stand against swirling blue-green strokes. The cool tones continue through the jacket and background. | 红色胡须与专注的目光，映衬着旋动的蓝绿色笔触。冷色调从背景延续至衣衫。 |
| `artworks.olive-trees.title` | Olive Trees with Yellow Sky and Sun | 黄天与太阳下的橄榄树 |
| `artworks.olive-trees.description` | Gnarled olive trunks rise from orange and violet earth. A yellow sun shines above the grove and a line of blue mountains. | 盘曲的橄榄树干从橙色与紫色的土地中生长出来。黄色太阳照耀着树林与一线蓝色山峦。 |
| `artworks.thunderclouds.title` | Wheatfield under Thunderclouds | 雷云下的麦田 |
| `artworks.thunderclouds.description` | An expansive green wheatfield stretches beneath deep blue clouds. Broad horizontal bands carry the landscape toward the horizon. | 广阔的绿色麦田延伸至深蓝色云层之下。宽阔的横向色带，将风景推向地平线。 |
| `artworks.tree-roots.title` | Tree Roots | 树根 |
| `artworks.tree-roots.description` | Interlaced roots and tree trunks fill the canvas. Patches of blue, green and ochre trace the exposed earth and tangled growth. | 交错的树根与树干铺满画面。蓝色、绿色和赭色的色块，描画着裸露的土地与缠绕的生长。 |

## 5. Music Section / 音乐与策展笔记

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.musicCuration` | Music curation | 音乐策展 |
| `ui.soundtrack` | A PERSONAL SOUNDTRACK | 这幅画的声音 |
| `ui.listenOn` | Listen on {platform} | 在{platform}收听 |
| `ui.newTab` | Opens in a new tab | 在新标签页打开 |
| `ui.curatorNote` | CURATOR’S NOTE | 策展人笔记 |
| `curatorNotes.almond` |  |  |
| `curatorNotes.irises` |  |  |
| `curatorNotes.wheatfield` |  |  |
| `curatorNotes.sunflowers` |  |  |
| `curatorNotes.bedroom` |  |  |
| `curatorNotes.yellow-house` |  |  |
| `curatorNotes.starry-night` |  |  |
| `curatorNotes.rhone` |  |  |
| `curatorNotes.cafe` |  |  |
| `curatorNotes.courting-couples` |  |  |
| `curatorNotes.first-steps` |  |  |
| `curatorNotes.sower` |  |  |
| `curatorNotes.red-vineyard` |  |  |
| `curatorNotes.mulberry-tree` |  |  |
| `curatorNotes.sea-saintes-maries` |  |  |
| `curatorNotes.cypress-star` |  |  |
| `curatorNotes.self-portrait` |  |  |
| `curatorNotes.olive-trees` |  |  |
| `curatorNotes.thunderclouds` |  |  |
| `curatorNotes.tree-roots` |  |  |
| `platforms.NetEase Cloud Music` | NetEase Cloud Music | 网易云音乐 |
| `platforms.Spotify` | Spotify | Spotify |
| `platforms.YouTube` | YouTube | YouTube |
| `platforms.Apple Music` | Apple Music | Apple Music |

## 6. Navigation and UI / 导航与界面

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.skip` | Skip to artworks | 跳至全部画作 |
| `ui.entrance` | Exhibition Entrance | 展览入口 |
| `ui.allArtworks` | All Artworks | 全部画作 |
| `ui.fiveActs` | The five acts | 五幕展览 |
| `ui.aboutNav` | The exhibition | 关于展览 |
| `ui.stepInside` | Step inside | 步入展览 |
| `ui.toggleNav` | Toggle navigation | 展开或收起导航 |
| `ui.mainNav` | Main navigation | 主导航 |
| `ui.mobileNav` | Mobile navigation | 移动端导航 |
| `ui.exploreAll` | Explore All Artworks | 探索全部画作 |
| `ui.chooseAct` | Choose an act | 选择一幕 |
| `ui.nextAct` | Next · Act {number} | 下一幕 · {number} |
| `ui.continue` | Continue | 继续 |
| `ui.returnArtworks` | Return to the artworks | 返回画作 |
| `ui.backTop` | Back to top | 返回顶部 |
| `ui.viewArtwork` | View {title} | 查看《{title}》 |
| `ui.imageAlt` | {title} by Vincent van Gogh | 文森特·梵高《{title}》 |
| `ui.exploreArtwork` | Explore artwork | 探索画作 |
| `ui.jumpAct` | Jump to act | 跳转至一幕 |
| `ui.chapters` | Chapters | 展览章节 |
| `ui.closeArtwork` | Close artwork | 关闭画作 |
| `ui.exhibitionNav` | Exhibition navigation | 展览导航 |
| `ui.zoomIn` | Zoom in | 放大 |
| `ui.zoomOut` | Zoom out | 缩小 |
| `ui.previous` | Previous | 上一幅 |
| `ui.next` | Next | 下一幅 |
| `ui.previousArtwork` | Previous artwork | 上一幅画作 |
| `ui.nextArtwork` | Next artwork | 下一幅画作 |
| `ui.language` | Exhibition language | 展览语言 |
| `ui.switchZh` | Switch to Simplified Chinese | 切换至简体中文 |
| `ui.switchEn` | Switch to English | 切换至英语 |

## 7. Ending Page / 结尾

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.endingLabel` | AN OPEN ENDING | 开放的结尾 |
| `ui.endingFirst` | Everything Is | 万物仍在 |
| `ui.endingSecond` | Still Becoming | 生长 |
| `ui.endingQuote` | The world does not end where a painting ends. | 画作止于画框，世界却仍在延伸。 |
| `ui.returnBeginning` | Return to the Beginning | 回到起点 |

## 8. Credits and Sources / 署名与来源

| Source key | English reference | Current Chinese (reference only) |
| --- | --- | --- |
| `ui.footerCredit` | All artworks by Vincent van Gogh. Public-domain artworks; image sources and reuse details accompany each work. | 所有画作均出自文森特·梵高。画作为公有领域作品；图像来源与使用说明随各作品列出。 |
| `ui.creditsSources` | Image credits & sources | 图像署名与来源 |
| `ui.credits` | Image credits | 图像署名 |
| `ui.closeCredits` | Close credits | 关闭图像署名 |
| `ui.collectionLabel` | THE COLLECTION | 展出作品 |
| `ui.creditsDescription` | All paintings are by Vincent van Gogh. Artwork descriptions are visual summaries, separate from the curator’s personal notes. Dates and collection information are drawn from the linked sources. | 所有画作均出自文森特·梵高。作品描述是对画面的概述，与策展人的个人笔记分开呈现。创作年份与馆藏信息依据所链接的来源。 |
| `ui.museumRecord` | Museum record | 馆藏记录 |
| `ui.originalSource` | View original source | 查看原始来源 |
| `ui.description` | Twenty paintings by Vincent van Gogh, five intimate acts, and a personally curated soundtrack. One painting. One song. One personal interpretation. | 文森特·梵高的二十幅画作，五幕细腻的情感旅程，以及策展人亲选的音乐。一幅画。一首歌。一种私人的解读。 |
| `ui.shareImageAlt` | Almond Blossom, Vincent van Gogh, 1890. Van Gogh Museum, Amsterdam. Public-domain reproduction. | 《盛开的杏花》，文森特·梵高，1890 年。阿姆斯特丹梵高博物馆藏。公有领域复制图像。 |
| `artworks.almond.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.almond.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆 · 维基共享资源 |
| `artworks.almond.license` | Public domain | 公有领域 |
| `artworks.irises.collection` | J. Paul Getty Museum, Los Angeles | 洛杉矶 J. Paul Getty Museum |
| `artworks.irises.credit` | Vincent van Gogh · J. Paul Getty Museum, Los Angeles · Wikimedia Commons | 文森特·梵高 · 洛杉矶 J. Paul Getty Museum · 维基共享资源 |
| `artworks.irises.license` | Public domain | 公有领域 |
| `artworks.wheatfield.collection` | The National Gallery, London | 伦敦国家美术馆 |
| `artworks.wheatfield.credit` | Vincent van Gogh · The National Gallery, London · Wikimedia Commons | 文森特·梵高 · 伦敦国家美术馆 · 维基共享资源 |
| `artworks.wheatfield.license` | Public domain | 公有领域 |
| `artworks.sunflowers.collection` | The National Gallery, London | 伦敦国家美术馆 |
| `artworks.sunflowers.credit` | Vincent van Gogh · The National Gallery, London · Wikimedia Commons | 文森特·梵高 · 伦敦国家美术馆 · 维基共享资源 |
| `artworks.sunflowers.license` | Public domain | 公有领域 |
| `artworks.bedroom.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.bedroom.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆 · 维基共享资源 |
| `artworks.bedroom.license` | Public domain | 公有领域 |
| `artworks.yellow-house.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.yellow-house.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆 · 维基共享资源 |
| `artworks.yellow-house.license` | Public domain | 公有领域 |
| `artworks.starry-night.collection` | The Museum of Modern Art, New York | 纽约现代艺术博物馆 |
| `artworks.starry-night.credit` | Vincent van Gogh · The Museum of Modern Art, New York · Wikimedia Commons | 文森特·梵高 · 纽约现代艺术博物馆 · 维基共享资源 |
| `artworks.starry-night.license` | Public domain | 公有领域 |
| `artworks.rhone.collection` | Musée d’Orsay, Paris | 巴黎奥赛博物馆（Musée d’Orsay） |
| `artworks.rhone.credit` | Vincent van Gogh · Musée d’Orsay, Paris · Wikimedia Commons | 文森特·梵高 · 巴黎奥赛博物馆（Musée d’Orsay） · 维基共享资源 |
| `artworks.rhone.license` | Public domain | 公有领域 |
| `artworks.cafe.collection` | Kröller-Müller Museum, Otterlo | 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） |
| `artworks.cafe.credit` | Vincent van Gogh · Kröller-Müller Museum, Otterlo · Wikimedia Commons | 文森特·梵高 · 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） · 维基共享资源 |
| `artworks.cafe.license` | Public domain | 公有领域 |
| `artworks.courting-couples.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.courting-couples.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam (Vincent van Gogh Foundation) · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆（文森特·梵高基金会） · 维基共享资源 |
| `artworks.courting-couples.license` | Public domain | 公有领域 |
| `artworks.first-steps.collection` | The Metropolitan Museum of Art, New York | 纽约大都会艺术博物馆 |
| `artworks.first-steps.credit` | Vincent van Gogh · The Metropolitan Museum of Art, New York · Wikimedia Commons | 文森特·梵高 · 纽约大都会艺术博物馆 · 维基共享资源 |
| `artworks.first-steps.license` | Public domain | 公有领域 |
| `artworks.sower.collection` | Kröller-Müller Museum, Otterlo | 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） |
| `artworks.sower.credit` | Vincent van Gogh · Kröller-Müller Museum, Otterlo · Wikimedia Commons | 文森特·梵高 · 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） · 维基共享资源 |
| `artworks.sower.license` | Public domain | 公有领域 |
| `artworks.red-vineyard.collection` | The Pushkin State Museum of Fine Arts, Moscow | 莫斯科普希金造型艺术博物馆 |
| `artworks.red-vineyard.credit` | Vincent van Gogh · The Pushkin State Museum of Fine Arts, Moscow · Wikimedia Commons | 文森特·梵高 · 莫斯科普希金造型艺术博物馆 · 维基共享资源 |
| `artworks.red-vineyard.license` | Public domain | 公有领域 |
| `artworks.mulberry-tree.collection` | Norton Simon Museum, Pasadena | 帕萨迪纳 Norton Simon Museum |
| `artworks.mulberry-tree.credit` | Vincent van Gogh · Norton Simon Museum, Pasadena · Wikimedia Commons | 文森特·梵高 · 帕萨迪纳 Norton Simon Museum · 维基共享资源 |
| `artworks.mulberry-tree.license` | Public domain | 公有领域 |
| `artworks.sea-saintes-maries.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.sea-saintes-maries.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam (Vincent van Gogh Foundation) · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆（文森特·梵高基金会） · 维基共享资源 |
| `artworks.sea-saintes-maries.license` | Public domain | 公有领域 |
| `artworks.cypress-star.collection` | Kröller-Müller Museum, Otterlo | 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） |
| `artworks.cypress-star.credit` | Vincent van Gogh · Kröller-Müller Museum, Otterlo · Wikimedia Commons | 文森特·梵高 · 奥特洛克勒勒-米勒博物馆（Kröller-Müller Museum） · 维基共享资源 |
| `artworks.cypress-star.license` | Public domain | 公有领域 |
| `artworks.self-portrait.collection` | Musée d’Orsay, Paris | 巴黎奥赛博物馆（Musée d’Orsay） |
| `artworks.self-portrait.credit` | Vincent van Gogh · Musée d’Orsay, Paris · Wikimedia Commons | 文森特·梵高 · 巴黎奥赛博物馆（Musée d’Orsay） · 维基共享资源 |
| `artworks.self-portrait.license` | Public domain | 公有领域 |
| `artworks.olive-trees.collection` | Minneapolis Institute of Art, Minneapolis | 明尼阿波利斯艺术博物馆 |
| `artworks.olive-trees.credit` | Vincent van Gogh · Minneapolis Institute of Art, Minneapolis · Wikimedia Commons | 文森特·梵高 · 明尼阿波利斯艺术博物馆 · 维基共享资源 |
| `artworks.olive-trees.license` | Public domain | 公有领域 |
| `artworks.thunderclouds.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.thunderclouds.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam (Vincent van Gogh Foundation) · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆（文森特·梵高基金会） · 维基共享资源 |
| `artworks.thunderclouds.license` | Public domain | 公有领域 |
| `artworks.tree-roots.collection` | Van Gogh Museum, Amsterdam | 阿姆斯特丹梵高博物馆 |
| `artworks.tree-roots.credit` | Vincent van Gogh · Van Gogh Museum, Amsterdam (Vincent van Gogh Foundation) · Wikimedia Commons | 文森特·梵高 · 阿姆斯特丹梵高博物馆（文森特·梵高基金会） · 维基共享资源 |
| `artworks.tree-roots.license` | Public domain | 公有领域 |

