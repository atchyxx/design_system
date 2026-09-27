<!-- Slide number: 1 -->
DADS
COMPONENT
CATALOG
FIXED SPEC
デジタル庁デザインシステム
HTML版
コンポーネント
仕様カタログ
リポジトリ実装を唯一の基準とする、静的PowerPoint仕様書
42 components  |  46 slides  |  Source: src/components/
固定仕様版  |  2026-09-27

<!-- Slide number: 2 -->
CATALOG GOVERNANCE
カタログの読み方
実装との差異を避けるため、各ページは変化しない仕様項目と根拠を併記します。
1
固定仕様
属性、状態、支援技術上の要点を実装から抽出。PPT上の要素は操作不能な静的見本です。
2
一次根拠
コンポーネントごとにMDX、CSS、HTML例の所在と件数を明記します。
3
確認方法
視覚状態・キーボード操作・レスポンシブ挙動はStorybookまたはHTML例で確認します。
対象：42コンポーネント。UIの動的挙動・支援技術での読み上げは静的資料では再現せず、注記として扱います。
COMPONENT SPECIFICATION CATALOG
2 / 46

<!-- Slide number: 3 -->
FOUNDATIONS
共通トークンと実装原則
src/global.css および src/docs/development-policy.mdx を基準とする固定値。
フォント
Noto Sans JP / Noto Sans Mono
キーカラー
--color-key-50 〜 --color-key-1200（Blue階調）
フォーカス
4px black outline + 2px yellow-300 outer ring
エレベーション
--elevation-1 〜 --elevation-8
基準ブレークポイント
48rem（768px）、モバイルファースト
アクセシビリティ
WCAG 2.2 A/AA、強制カラー・視覚効果低減に配慮
フォーカス見本：視覚的な状態だけでなく、フォーカス順・キーボード操作・ARIAの整合を実装側で確認する。
COMPONENT SPECIFICATION CATALOG
3 / 46

<!-- Slide number: 4 -->
INVENTORY
全コンポーネント一覧
42件をアルファベット順で固定収録。各コンポーネントは次ページ以降に1件ずつ掲載します。
01
Accordion
02
Blockquote
03
Breadcrumb
04
Button
05
Calendar
06
Card
07
Carousel
08
Checkbox
09
Chip Label
10
Date Picker
11
Description List
12
Disclosure
13
Divider
14
Drawer
15
Emergency Banner
16
File Upload
17
Form Control Label
18
Hamburger Menu Button
19
Heading
20
Horizontal Menu
21
Image
22
Input Text
23
Language Selector
24
Link
25
List
26
Menu List
27
Menu List Box
28
Modal Dialog
29
Notification Banner
30
Page Navigation
31
Progress Indicator
32
Radio
33
Resource List
34
Search Box
35
Select
36
Step Navigation
37
Switch
38
Tab
39
Table
40
Textarea
41
Toc
42
Utility Link
COMPONENT SPECIFICATION CATALOG
4 / 46

<!-- Slide number: 5 -->
COMPONENT 01  /  accordion
Accordion
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Accordion
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / active / focus / open
アクセシビリティ確認点
ARIA属性 / キーボード操作
根拠ファイル
src/components/accordion/accordion.mdx  |  CSS 1件  |  HTML例 2件
hover
active
focus
open
COMPONENT SPECIFICATION CATALOG
5 / 46

<!-- Slide number: 6 -->
COMPONENT 02  /  blockquote
Blockquote
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Blockquote
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-spacing: 4
静的に記載する状態
通常
アクセシビリティ確認点
ネイティブ要素・文脈に応じて確認
根拠ファイル
src/components/blockquote/blockquote.mdx  |  CSS 1件  |  HTML例 3件
normal
COMPONENT SPECIFICATION CATALOG
6 / 46

<!-- Slide number: 7 -->
COMPONENT 03  /  breadcrumb
Breadcrumb
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Breadcrumb
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / active / focus
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/breadcrumb/breadcrumb.mdx  |  CSS 1件  |  HTML例 3件
hover
active
focus
COMPONENT SPECIFICATION CATALOG
7 / 46

<!-- Slide number: 8 -->
COMPONENT 04  /  button
Button
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Button
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: md / data-type: solid-fill / data-size: lg / data-size: sm / data-size: xs / data-type: outline / data-type: text
静的に記載する状態
hover / active / focus / disabled
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/button/button.mdx  |  CSS 1件  |  HTML例 3件
hover
active
focus
disabled
COMPONENT SPECIFICATION CATALOG
8 / 46

<!-- Slide number: 9 -->
COMPONENT 05  /  calendar
Calendar
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Calendar
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: sm / data-type: outline / data-type: text
静的に記載する状態
hover / active / focus / disabled / error / selected
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作 / フォーカス
根拠ファイル
src/components/calendar/calendar.mdx  |  CSS 1件  |  HTML例 1件
hover
active
focus
disabled
error
COMPONENT SPECIFICATION CATALOG
9 / 46

<!-- Slide number: 10 -->
COMPONENT 06  /  card
Card
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Card
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
イメージエリアはDOM上ではメインエリアの後に位置し、グリッドレイアウトにより見た目上は左に配置しています
バリエーション／属性
data-size: sm / data-type: outline / data-type: solid-fill
静的に記載する状態
hover / focus / checked
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/card/card.mdx  |  CSS 6件  |  HTML例 6件
hover
focus
checked
COMPONENT SPECIFICATION CATALOG
10 / 46

<!-- Slide number: 11 -->
COMPONENT 07  /  carousel
Carousel
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Carousel
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-js-unit: スライド
静的に記載する状態
hover / active / focus / error / selected / open
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / フォーカス
根拠ファイル
src/components/carousel/carousel.mdx  |  CSS 2件  |  HTML例 3件
hover
active
focus
error
selected
COMPONENT SPECIFICATION CATALOG
11 / 46

<!-- Slide number: 12 -->
COMPONENT 08  /  checkbox
Checkbox
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Checkbox
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: sm / data-required: true / data-size: lg / data-size: md
静的に記載する状態
hover / focus / disabled / error / checked
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/checkbox/checkbox.mdx  |  CSS 1件  |  HTML例 6件
hover
focus
disabled
error
checked
COMPONENT SPECIFICATION CATALOG
12 / 46

<!-- Slide number: 13 -->
COMPONENT 09  /  chip-label
Chip Label
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Chip Label
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-style: text / data-color: gray / data-style: filled-1 / data-color: blue / data-color: light-blue / data-color: cyan / data-color: green / data-color: lime / data-color: yellow / data-color: orange / data-color: red / data-color: magenta / data-color: purple / data-style: outlined / data-style: filled-2
静的に記載する状態
error
アクセシビリティ確認点
ARIA属性 / キーボード操作
根拠ファイル
src/components/chip-label/chip-label.mdx  |  CSS 1件  |  HTML例 2件
error
COMPONENT SPECIFICATION CATALOG
13 / 46

<!-- Slide number: 14 -->
COMPONENT 10  /  date-picker
Date Picker
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Date Picker
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
Consolidatedタイプでキーボードナビゲーション（←→キーによるフィールド間移動）を実装
バリエーション／属性
data-type: consolidated / data-size: md / data-type: separated / data-required: true / data-size: sm / data-type: outline / data-type: text / data-size: lg
静的に記載する状態
hover / active / focus / disabled / error / selected / expanded / readonly / open
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作 / フォーカス / スクリーンリーダー
根拠ファイル
src/components/date-picker/date-picker.mdx  |  CSS 2件  |  HTML例 4件
hover
active
focus
disabled
error
COMPONENT SPECIFICATION CATALOG
14 / 46

<!-- Slide number: 15 -->
COMPONENT 11  /  description-list
Description List
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Description List
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-marker: bullet / data-marker: custom
静的に記載する状態
通常
アクセシビリティ確認点
ラベル／代替テキスト
根拠ファイル
src/components/description-list/description-list.mdx  |  CSS 1件  |  HTML例 1件
normal
COMPONENT SPECIFICATION CATALOG
15 / 46

<!-- Slide number: 16 -->
COMPONENT 12  /  disclosure
Disclosure
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Disclosure
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / active / focus / error / open
アクセシビリティ確認点
ARIA属性 / キーボード操作
根拠ファイル
src/components/disclosure/disclosure.mdx  |  CSS 1件  |  HTML例 1件
hover
active
focus
error
open
COMPONENT SPECIFICATION CATALOG
16 / 46

<!-- Slide number: 17 -->
COMPONENT 13  /  divider
Divider
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Divider
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-color: solid-gray-420 / data-style: solid / data-width: 1 / data-color: solid-gray-536 / data-color: black / data-width: 2 / data-width: 3 / data-width: 4 / data-style: dashed
静的に記載する状態
通常
アクセシビリティ確認点
ネイティブ要素・文脈に応じて確認
根拠ファイル
src/components/divider/divider.mdx  |  CSS 1件  |  HTML例 2件
normal
COMPONENT SPECIFICATION CATALOG
17 / 46

<!-- Slide number: 18 -->
COMPONENT 14  /  drawer
Drawer
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Drawer
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-placement: right / data-placement: left
静的に記載する状態
open
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/drawer/drawer.mdx  |  CSS 1件  |  HTML例 1件
open
COMPONENT SPECIFICATION CATALOG
18 / 46

<!-- Slide number: 19 -->
COMPONENT 15  /  emergency-banner
Emergency Banner
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Emergency Banner
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / focus / error
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/emergency-banner/emergency-banner.mdx  |  CSS 1件  |  HTML例 1件
hover
focus
error
COMPONENT SPECIFICATION CATALOG
19 / 46

<!-- Slide number: 20 -->
COMPONENT 16  /  file-upload
File Upload
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
File Upload
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
**ファイル選択**: ボタンクリックまたはドラッグ＆ドロップでファイルを選択
バリエーション／属性
data-error-invalid-type: PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメントだけが選択できます。 / data-type: outline / data-size: md / data-slot: fileName / data-slot: fileSize / data-slot: fileSizeBytes / data-type: text / data-size: xs / data-error-max-files: 選択できるファイル数は{max}個までです。現在{current}個です。 / data-error-max-total-size: 選択できるファイルサイズの合計は{max}までです。現在{current}です。 / data-error-invalid-type: このファイル形式はアップロードできません。 / data-error-max-file-size: 選択できるファイルサイズは{max}までです。現在{current}です。 / data-error-max-files: The number of files that can be selected has exceeded the limit. / data-error-max-total-size: The total size of files that can be selected has exceeded the limit. / data-error-invalid-type: This file format is not allowed. / data-error-max-file-size: The file size has exceeded the limit. / data-error-has-file-errors: There are errors in the selected files. Please reselect the files with errors. / data-announce-drop-available: You can drop files here. / data-announce-drop-unavailable: Outside of the drop area. / data-label-selected-files: {count} files (Total: {sizeFormatted} / {sizeBytes} bytes) / data-required: false / data-has-error: true / data-dragover: true / data-multiple: false / data-multiple: true / data-error: true
静的に記載する状態
focus / error / selected / expanded / checked
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / キーボード操作 / フォーカス / スクリーンリーダー
根拠ファイル
src/components/file-upload/file-upload.mdx  |  CSS 2件  |  HTML例 2件
focus
error
selected
expanded
checked
COMPONENT SPECIFICATION CATALOG
20 / 46

<!-- Slide number: 21 -->
COMPONENT 17  /  form-control-label
Form Control Label
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Form Control Label
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: md / data-required: true / data-required: false / data-size: sm / data-size: lg
静的に記載する状態
error
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / フォーカス
根拠ファイル
src/components/form-control-label/form-control-label.mdx  |  CSS 1件  |  HTML例 2件
error
COMPONENT SPECIFICATION CATALOG
21 / 46

<!-- Slide number: 22 -->
COMPONENT 18  /  hamburger-menu-button
Hamburger Menu Button
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Hamburger Menu Button
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / focus
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作
根拠ファイル
src/components/hamburger-menu-button/hamburger-menu-button.mdx  |  CSS 2件  |  HTML例 3件
hover
focus
COMPONENT SPECIFICATION CATALOG
22 / 46

<!-- Slide number: 23 -->
COMPONENT 19  /  heading
Heading
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Heading
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: 36 / data-rule: 6 / data-size: 64 / data-size: 57 / data-size: 45 / data-size: 32 / data-size: 28 / data-size: 24 / data-size: 20 / data-size: 18 / data-size: 16 / data-rule: 8 / data-rule: 4 / data-rule: 2
静的に記載する状態
error
アクセシビリティ確認点
ARIA属性 / キーボード操作
根拠ファイル
src/components/heading/heading.mdx  |  CSS 1件  |  HTML例 1件
error
COMPONENT SPECIFICATION CATALOG
23 / 46

<!-- Slide number: 24 -->
COMPONENT 20  /  horizontal-menu
Horizontal Menu
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Horizontal Menu
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / focus / error / expanded
アクセシビリティ確認点
ARIA属性 / キーボード操作
根拠ファイル
src/components/horizontal-menu/horizontal-menu.mdx  |  CSS 1件  |  HTML例 1件
hover
focus
error
expanded
COMPONENT SPECIFICATION CATALOG
24 / 46

<!-- Slide number: 25 -->
COMPONENT 21  /  image
Image
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Image
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-style: dashed / data-style: solid
静的に記載する状態
hover / focus / error
アクセシビリティ確認点
ラベル／代替テキスト
根拠ファイル
src/components/image/image.mdx  |  CSS 1件  |  HTML例 2件
hover
focus
error
COMPONENT SPECIFICATION CATALOG
25 / 46

<!-- Slide number: 26 -->
COMPONENT 22  /  input-text
Input Text
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Input Text
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: sm / data-size: md / data-required: true / data-size: lg
静的に記載する状態
hover / focus / disabled / error / readonly
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/input-text/input-text.mdx  |  CSS 1件  |  HTML例 3件
hover
focus
disabled
error
readonly
COMPONENT SPECIFICATION CATALOG
26 / 46

<!-- Slide number: 27 -->
COMPONENT 23  /  language-selector
Language Selector
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Language Selector
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
メニュー外をクリックするとメニューが閉じます
バリエーション／属性
data-size: sm / data-style: text / data-text-weight: normal / data-type: box / data-size: regular / data-type: text
静的に記載する状態
expanded / open
アクセシビリティ確認点
ARIA属性 / キーボード操作 / フォーカス
根拠ファイル
src/components/language-selector/language-selector.mdx  |  CSS 2件  |  HTML例 1件
expanded
open
COMPONENT SPECIFICATION CATALOG
27 / 46

<!-- Slide number: 28 -->
COMPONENT 24  /  link
Link
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Link
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / active / focus / error
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/link/link.mdx  |  CSS 1件  |  HTML例 1件
hover
active
focus
error
COMPONENT SPECIFICATION CATALOG
28 / 46

<!-- Slide number: 29 -->
COMPONENT 25  /  list
List
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
List
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-spacing: 4 / data-marker: number / data-spacing: 8 / data-spacing: 12
静的に記載する状態
通常
アクセシビリティ確認点
ネイティブ要素・文脈に応じて確認
根拠ファイル
src/components/list/list.mdx  |  CSS 1件  |  HTML例 1件
normal
COMPONENT SPECIFICATION CATALOG
29 / 46

<!-- Slide number: 30 -->
COMPONENT 26  /  menu-list
Menu List
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Menu List
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-type: standard / data-size: regular / data-type: box / data-size: small
静的に記載する状態
hover / focus / error / expanded
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / スクリーンリーダー
根拠ファイル
src/components/menu-list/menu-list.mdx  |  CSS 1件  |  HTML例 2件
hover
focus
error
expanded
COMPONENT SPECIFICATION CATALOG
30 / 46

<!-- Slide number: 31 -->
COMPONENT 27  /  menu-list-box
Menu List Box
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Menu List Box
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
キーボードナビゲーション
バリエーション／属性
data-size: sm / data-style: text / data-text-weight: normal / data-type: box / data-size: regular / data-type: standard / data-type: text / data-size: md / data-style: outlined / data-style: filled / data-text-weight: bold
静的に記載する状態
hover / focus / error / selected / expanded / open
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作 / フォーカス
根拠ファイル
src/components/menu-list-box/menu-list-box.mdx  |  CSS 2件  |  HTML例 1件
hover
focus
error
selected
expanded
COMPONENT SPECIFICATION CATALOG
31 / 46

<!-- Slide number: 32 -->
COMPONENT 28  /  modal-dialog
Modal Dialog
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Modal Dialog
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: lg / data-type: solid-fill / data-scroll: inner / data-scroll: outer
静的に記載する状態
hover / focus / error / open
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / フォーカス
根拠ファイル
src/components/modal-dialog/modal-dialog.mdx  |  CSS 1件  |  HTML例 6件
hover
focus
error
open
COMPONENT SPECIFICATION CATALOG
32 / 46

<!-- Slide number: 33 -->
COMPONENT 29  /  notification-banner
Notification Banner
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Notification Banner
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-style: standard / data-type: success / data-size: md / data-type: outline / data-type: solid-fill / data-type: error / data-type: info-1 / data-type: info-2 / data-type: warning / data-style: color-chip
静的に記載する状態
hover / focus / error
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/notification-banner/notification-banner.mdx  |  CSS 1件  |  HTML例 6件
hover
focus
error
COMPONENT SPECIFICATION CATALOG
33 / 46

<!-- Slide number: 34 -->
COMPONENT 30  /  page-navigation
Page Navigation
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Page Navigation
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-type: text / data-size: md / data-control: prev / data-control: next / data-type: outline / data-size: lg / data-size: sm / data-size: xs
静的に記載する状態
hover / active / focus
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / スクリーンリーダー
根拠ファイル
src/components/page-navigation/page-navigation.mdx  |  CSS 1件  |  HTML例 3件
hover
active
focus
COMPONENT SPECIFICATION CATALOG
34 / 46

<!-- Slide number: 35 -->
COMPONENT 31  /  progress-indicator
Progress Indicator
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Progress Indicator
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
**JavaScript**
バリエーション／属性
data-type: stacked / data-announce-start: Loading started / data-announce-end: Loading complete / data-announce-long: Still loading / data-announce-long-with-value: {value}% loaded / data-size: md / data-type: solid-fill / data-type: inlined / data-type: stacked-underlay / data-size: sm / data-type: outline
静的に記載する状態
error
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / キーボード操作 / スクリーンリーダー
根拠ファイル
src/components/progress-indicator/progress-indicator.mdx  |  CSS 2件  |  HTML例 6件
error
COMPONENT SPECIFICATION CATALOG
35 / 46

<!-- Slide number: 36 -->
COMPONENT 32  /  radio
Radio
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Radio
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: sm / data-required: true / data-size: lg / data-size: md
静的に記載する状態
hover / focus / disabled / error / checked
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/radio/radio.mdx  |  CSS 1件  |  HTML例 5件
hover
focus
disabled
error
checked
COMPONENT SPECIFICATION CATALOG
36 / 46

<!-- Slide number: 37 -->
COMPONENT 33  /  resource-list
Resource List
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Resource List
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-style: list / data-size: md / data-interaction: whole / data-style: frame
静的に記載する状態
hover / active / focus / disabled / error / checked
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト
根拠ファイル
src/components/resource-list/resource-list.mdx  |  CSS 1件  |  HTML例 3件
hover
active
focus
disabled
error
COMPONENT SPECIFICATION CATALOG
37 / 46

<!-- Slide number: 38 -->
COMPONENT 34  /  search-box
Search Box
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Search Box
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: lg / data-type: solid-fill / data-type: text / data-size: sm / data-size: md
静的に記載する状態
hover / focus / error / checked / open
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/search-box/search-box.mdx  |  CSS 1件  |  HTML例 2件
hover
focus
error
checked
open
COMPONENT SPECIFICATION CATALOG
38 / 46

<!-- Slide number: 39 -->
COMPONENT 35  /  select
Select
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Select
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-size: md / data-required: true / data-size: sm / data-size: lg
静的に記載する状態
hover / focus / disabled / error
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト
根拠ファイル
src/components/select/select.mdx  |  CSS 1件  |  HTML例 2件
hover
focus
disabled
error
COMPONENT SPECIFICATION CATALOG
39 / 46

<!-- Slide number: 40 -->
COMPONENT 36  /  step-navigation
Step Navigation
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Step Navigation
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-orientation: horizontal / data-size: normal / data-state: reached / data-state: completed / data-state: editing / data-state: error / data-state: skipped / data-size: small / data-orientation: vertical
静的に記載する状態
hover / focus / error
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / キーボード操作 / スクリーンリーダー
根拠ファイル
src/components/step-navigation/step-navigation.mdx  |  CSS 1件  |  HTML例 2件
hover
focus
error
COMPONENT SPECIFICATION CATALOG
40 / 46

<!-- Slide number: 41 -->
COMPONENT 37  /  switch
Switch
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Switch
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
**モードスイッチでは、どちらの選択肢をクリックしても状態がトグルします**（2択のため、選択中の側をクリックした場合も反対側に切り替わります）。
バリエーション／属性
data-size: md / data-required: true
静的に記載する状態
hover / active / focus / disabled / error / checked
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作 / フォーカス
根拠ファイル
src/components/switch/switch.mdx  |  CSS 2件  |  HTML例 4件
hover
active
focus
disabled
error
COMPONENT SPECIFICATION CATALOG
41 / 46

<!-- Slide number: 42 -->
COMPONENT 38  /  tab
Tab
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Tab
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-position: bottom / data-activation: auto / data-activation: manual / data-position: left / data-size: 24 / data-position: top / data-position: right
静的に記載する状態
hover / focus / error / selected
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / キーボード操作 / フォーカス / スクリーンリーダー
根拠ファイル
src/components/tab/tab.mdx  |  CSS 1件  |  HTML例 4件
hover
focus
error
selected
COMPONENT SPECIFICATION CATALOG
42 / 46

<!-- Slide number: 43 -->
COMPONENT 39  /  table
Table
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Table
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
**追加で必要**（モバイル表示でスクロールシャドーを使用する場合）
バリエーション／属性
data-border: right / data-border: right bottom / data-border: hidden / data-border: top-hidden / data-cell-border: bottom / data-cell-border: right / data-size: dense / data-size: sm / data-bg: solid-gray-100 / data-width: full / data-layout: fixed / data-bg: white / data-bg: solid-gray-50 / data-bg: transparent
静的に記載する状態
hover / focus / error / checked
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / スクリーンリーダー
根拠ファイル
src/components/table/table.mdx  |  CSS 1件  |  HTML例 18件
hover
focus
error
checked
COMPONENT SPECIFICATION CATALOG
43 / 46

<!-- Slide number: 44 -->
COMPONENT 40  /  textarea
Textarea
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Textarea
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
**文字数カウンターを使用する場合**
バリエーション／属性
data-size: md / data-required: true / data-error-exceeded: {count} characters exceeded. / data-announce-exceeded: {count} characters exceeded. / data-announce-remaining: {count} characters remaining.
静的に記載する状態
hover / focus / disabled / error / readonly
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / スクリーンリーダー
根拠ファイル
src/components/textarea/textarea.mdx  |  CSS 1件  |  HTML例 4件
hover
focus
disabled
error
readonly
COMPONENT SPECIFICATION CATALOG
44 / 46

<!-- Slide number: 45 -->
COMPONENT 41  /  toc
Toc
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Toc
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
data-spacing: 8 / data-border: dotted / data-border: solid
静的に記載する状態
通常
アクセシビリティ確認点
ARIA属性 / ラベル／代替テキスト / フォーカス
根拠ファイル
src/components/toc/toc.mdx  |  CSS 1件  |  HTML例 2件
normal
COMPONENT SPECIFICATION CATALOG
45 / 46

<!-- Slide number: 46 -->
COMPONENT 42  /  utility-link
Utility Link
実装ソースを基準とした固定仕様。PowerPoint上の見本は静的表示です。
STATIC SPECIMEN
Utility Link
静的仕様見本
代表状態を確認
動作・遷移・フォーカスは
実装／Storybookで検証
仕様概要
詳細は同梱MDXおよび実装ソースを参照
バリエーション／属性
属性バリエーションなし／実装参照
静的に記載する状態
hover / active / focus / error
アクセシビリティ確認点
ARIA属性 / role / ラベル／代替テキスト / スクリーンリーダー
根拠ファイル
src/components/utility-link/utility-link.mdx  |  CSS 1件  |  HTML例 2件
hover
active
focus
error
COMPONENT SPECIFICATION CATALOG
46 / 46
