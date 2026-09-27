---
name: create-powerpoint
description: DADSデザイントークンを使用し、デザインスタイル手順書とテンプレート生成スクリプトからアクセシブルなPowerPoint（.pptx）資料を作成・更新する。
compatibility: Requires Node.js and pptxgenjs to generate the optional PowerPoint template. MarkItDown and LibreOffice or PowerPoint are optional for validation.
metadata:
  author: Digital Agency Design System
  version: "1.0"
---

# PowerPoint資料作成スキル

デジタル庁デザインシステム（HTML版、DADS）を、PowerPointで静的に再現する。
コンポーネントの説明資料と、DADSのデザイン言語を採用した一般資料の両方を対象とする。

## 再現性の原則

このスキルの唯一の仕様は、資料作成時点のリポジトリ実装である。スキル本文の例示や記憶した値で代用しない。

- すべてのカラー、文字スタイル、余白、罫線、角丸、影、アイコン、図形、状態、バリエーションは、該当するソースから取得する。
- コンポーネントを扱う資料では、対象コンポーネントの全バリエーションと視覚状態を省略しない。
- PowerPointで動作を再現できない要素は、操作可能に見せかけない。通常・フォーカス・ホバー・無効・エラーなどを、明示した静的な状態見本として別々に示す。
- CSSの内容を「DADSらしい」任意の見た目に置換しない。PowerPointで同じ見た目を作れない場合は、差異と理由を資料の注記または作成報告に記載する。

## 発火条件

以下の依頼でこのスキルを使用する。

- `.pptx`、PowerPoint、スライド、プレゼンテーションを作成または更新する
- DADSのコンポーネント、デザイントークン、利用方法を資料にまとめる
- 既存のPowerPointテンプレートを用いて資料を作成する

## 完全なデザインインベントリ

資料の生成前に、目的、対象読者、必要なスライド数または構成、出力先を確認する。不明な場合は質問する。次に、必ず現行のリポジトリからデザインインベントリを作る。

### 基盤トークン

以下を読み、PowerPointで使う値をトークン名・解決済み値・用途の組で記録する。

1. `src/global.css`
   - すべてのCSS Custom Properties
   - カラーのエイリアスを解決した16進値または透明度
   - タイポグラフィユーティリティのフォント、サイズ、ウェイト、行高、字間
   - フォーカスリング、リンク、ユーティリティ、強制カラー対応の視覚ルール
2. `src/docs/foundations/colors.mdx`
3. `src/docs/foundations/typography.mdx`
4. `src/docs/foundations/elevation.mdx`
5. `AGENTS.md`
6. `src/docs/development-policy.mdx`

色の利用可能な全階調、ニュートラル、不透明度、セマンティックカラー、Keyカラー、全エレベーションを対象にする。資料内で未使用のトークンを削除してはならない。カラーパレット・トークン一覧を求められた場合は、すべてを欠けなく掲載する。

<!-- DADS_COLOR_PALETTE_START -->

### 全カラーパレット

PowerPointでは次の解決済み値を使う。PptxGenJSでは先頭の`#`を除いて指定する。キー色はBlueのエイリアスであり、`--color-key-50`から`--color-key-1200`は、それぞれ同じ階調の`--color-primitive-blue-*`を参照する。

#### Blue / Light Blue / Cyan / Green / Lime

| 階調 | `blue` | `light-blue` | `cyan` | `green` | `lime` |
| --- | --- | --- | --- | --- | --- |
| 50 | `#E8F1FE` | `#F0F9FF` | `#E9F7F9` | `#E6F5EC` | `#EBFAD9` |
| 100 | `#D9E6FF` | `#DCF0FF` | `#C8F8FF` | `#C2E5D1` | `#D0F5A2` |
| 200 | `#C5D7FB` | `#C0E4FF` | `#99F2FF` | `#9BD4B5` | `#C0F354` |
| 300 | `#9DB7F9` | `#97D3FF` | `#79E2F2` | `#71C598` | `#ADE830` |
| 400 | `#7096F8` | `#57B8FF` | `#2BC8E4` | `#51B883` | `#9DDD15` |
| 500 | `#4979F5` | `#39ABFF` | `#01B7D6` | `#2CAC6E` | `#8CC80C` |
| 600 | `#3460FB` | `#008BF2` | `#00A3BF` | `#259D63` | `#7EB40D` |
| 700 | `#264AF4` | `#0877D7` | `#008DA6` | `#1D8B56` | `#6FA104` |
| 800 | `#0031D8` | `#0066BE` | `#008299` | `#197A4B` | `#618E00` |
| 900 | `#0017C1` | `#0055AD` | `#006F83` | `#115A36` | `#507500` |
| 1000 | `#00118F` | `#00428C` | `#006173` | `#0C472A` | `#3E5A00` |
| 1100 | `#000071` | `#00316A` | `#004C59` | `#08351F` | `#2C4100` |
| 1200 | `#000060` | `#00234B` | `#003741` | `#032213` | `#1E2D00` |

#### Yellow / Orange / Red / Magenta / Purple

| 階調 | `yellow` | `orange` | `red` | `magenta` | `purple` |
| --- | --- | --- | --- | --- | --- |
| 50 | `#FBF5E0` | `#FFEEE2` | `#FDEEEE` | `#F3E5F4` | `#F1EAFA` |
| 100 | `#FFF0B3` | `#FFDFCA` | `#FFDADA` | `#FFD0FF` | `#ECDDFF` |
| 200 | `#FFE380` | `#FFC199` | `#FFBBBB` | `#FFAEFF` | `#DDC2FF` |
| 300 | `#FFD43D` | `#FFA66D` | `#FF9696` | `#FF8EFF` | `#CDA6FF` |
| 400 | `#FFC700` | `#FF8D44` | `#FF7171` | `#F661F6` | `#BB87FF` |
| 500 | `#EBB700` | `#FF7628` | `#FF5454` | `#F137F1` | `#A565F8` |
| 600 | `#D2A400` | `#FB5B01` | `#FE3939` | `#DB00DB` | `#8843E1` |
| 700 | `#B78F00` | `#E25100` | `#FA0000` | `#C000C0` | `#6F23D0` |
| 800 | `#A58000` | `#C74700` | `#EC0000` | `#AA00AA` | `#5C10BE` |
| 900 | `#927200` | `#AC3E00` | `#CE0000` | `#8B008B` | `#5109AD` |
| 1000 | `#806300` | `#8B3200` | `#A90000` | `#6C006C` | `#41048E` |
| 1100 | `#6E5600` | `#6D2700` | `#850000` | `#500050` | `#30016C` |
| 1200 | `#604B00` | `#541E00` | `#620000` | `#3B003B` | `#21004B` |

#### ニュートラル（不透明）

| トークン | 値 |
| --- | --- |
| `--color-neutral-white` | `#FFFFFF` |
| `--color-neutral-black` | `#000000` |
| `--color-neutral-solid-gray-50` | `#F2F2F2` |
| `--color-neutral-solid-gray-100` | `#E6E6E6` |
| `--color-neutral-solid-gray-200` | `#CCCCCC` |
| `--color-neutral-solid-gray-300` | `#B3B3B3` |
| `--color-neutral-solid-gray-400` | `#999999` |
| `--color-neutral-solid-gray-420` | `#949494` |
| `--color-neutral-solid-gray-500` | `#7F7F7F` |
| `--color-neutral-solid-gray-536` | `#767676` |
| `--color-neutral-solid-gray-600` | `#666666` |
| `--color-neutral-solid-gray-700` | `#4D4D4D` |
| `--color-neutral-solid-gray-800` | `#333333` |
| `--color-neutral-solid-gray-900` | `#1A1A1A` |

#### ニュートラル（透明）

透明色はPowerPoint上の背景色との合成結果を確認する。

| トークン | 値 |
| --- | --- |
| `--color-neutral-opacity-gray-50` | `rgba(0, 0, 0, 0.05)` |
| `--color-neutral-opacity-gray-100` | `rgba(0, 0, 0, 0.1)` |
| `--color-neutral-opacity-gray-200` | `rgba(0, 0, 0, 0.2)` |
| `--color-neutral-opacity-gray-300` | `rgba(0, 0, 0, 0.3)` |
| `--color-neutral-opacity-gray-400` | `rgba(0, 0, 0, 0.4)` |
| `--color-neutral-opacity-gray-420` | `rgba(0, 0, 0, 0.42)` |
| `--color-neutral-opacity-gray-500` | `rgba(0, 0, 0, 0.5)` |
| `--color-neutral-opacity-gray-536` | `rgba(0, 0, 0, 0.54)` |
| `--color-neutral-opacity-gray-600` | `rgba(0, 0, 0, 0.6)` |
| `--color-neutral-opacity-gray-700` | `rgba(0, 0, 0, 0.7)` |
| `--color-neutral-opacity-gray-800` | `rgba(0, 0, 0, 0.8)` |
| `--color-neutral-opacity-gray-900` | `rgba(0, 0, 0, 0.9)` |

#### セマンティックカラー

| トークン | 参照先 | 解決値 |
| --- | --- | --- |
| `--color-semantic-success-1` | `--color-primitive-green-600` | `#259D63` |
| `--color-semantic-success-2` | `--color-primitive-green-800` | `#197A4B` |
| `--color-semantic-error-1` | `--color-primitive-red-800` | `#EC0000` |
| `--color-semantic-error-2` | `--color-primitive-red-900` | `#CE0000` |
| `--color-semantic-warning-yellow-1` | `--color-primitive-yellow-700` | `#B78F00` |
| `--color-semantic-warning-yellow-2` | `--color-primitive-yellow-900` | `#927200` |
| `--color-semantic-warning-orange-1` | `--color-primitive-orange-600` | `#FB5B01` |
| `--color-semantic-warning-orange-2` | `--color-primitive-orange-800` | `#C74700` |

<!-- DADS_COLOR_PALETTE_END -->

### コンポーネント仕様

コンポーネントを説明・再現する資料では、対象ディレクトリ内の以下をすべて読む。複数コンポーネントが対象なら、対象ごとに同じ手順を実施する。

1. すべてのHTMLファイル（`playground.html` を含む）
2. `<component-name>.stories.ts` と `<component-name>.stories.css`（存在する場合）
3. `<component-name>.css`
4. `<component-name>.js`、`<component-name>.test.js`、`<component-name>.unit.js`（存在する場合）
5. `<component-name>.mdx`
6. コンポーネントが直接依存するCSS、JavaScript、画像、アイコン

各コンポーネントについて、次を漏れなく抽出する。

- DOM構造、表示文言、アイコン、画像、代替テキスト
- すべての `data-*`、ARIA、`disabled`、擬似クラス、メディアクエリによる見た目の差
- 寸法、余白、間隔、罫線、角丸、塗り、透明度、影、アイコンサイズ、テキスト整列
- 利用するトークンとコンポーネントスコープのCustom Properties
- 通常、ホバー、アクティブ、フォーカス、無効、エラー、選択済み、展開済みなどの全状態
- 読み上げ・キーボード・動的動作に関する説明。PowerPointでは静的な注記として扱う

## 生成方式の選択

1. ユーザーがテンプレートを指定した場合は、テンプレート編集方式を使用する。
2. 指定がない場合は、[DADS PowerPointデザインスタイル手順書](references/dads-design-style.md) を基に作成する。
3. 編集可能なベーステンプレートが必要な場合は、`scripts/generate-dads-powerpoint-template.cjs` で生成する。
4. テンプレートの有無にかかわらず、出力はユーザー指定の場所へ保存する。指定がなければ、`output/` 配下に内容を表すケバブケースのファイル名で保存する。

## 同梱リソース

```text
create-powerpoint/
├── SKILL.md
├── scripts/
│   ├── generate-component-inventory.cjs
│   └── generate-dads-powerpoint-template.cjs
└── references/
    ├── dads-component-inventory.md
    ├── dads-design-style.md
    ├── dads-powerpoint-template.md
    ├── dads-component-spec-catalog.md
    └── dads-complete-visual-catalog.md
```

| ファイル | 用途 |
| --- | --- |
| [dads-design-style.md](references/dads-design-style.md) | DADSトークン、6レイアウト、アクセシビリティ、品質確認を定めたデザインスタイル手順書 |
| [dads-component-inventory.md](references/dads-component-inventory.md) | 全42コンポーネントのHTML例、`data-*`修飾子、状態、メディアクエリ、アクセシビリティシグナルを網羅した生成仕様 |
| [dads-powerpoint-template.md](references/dads-powerpoint-template.md) | 6レイアウトのテキスト構成とプレースホルダー |
| [dads-component-spec-catalog.md](references/dads-component-spec-catalog.md) | 全42コンポーネントの固定仕様カタログから抽出したテキスト |
| [dads-complete-visual-catalog.md](references/dads-complete-visual-catalog.md) | 全42コンポーネント・129 Storybookストーリーのビジュアルカタログから抽出したテキスト |

通常の資料作成では、デザインスタイル手順書の「スライドスタイルの必須規則」と「6つの標準レイアウト」を必ず読む。コンポーネント資料では、加えて「リポジトリ実装から導く変換規則」と全コンポーネント網羅表を必ず読む。レイアウトの文言構成を確認するときはテンプレート参照資料を読む。対象カタログを読み、対象コンポーネントの実装値で見た目を調整する。

全コンポーネントを扱う資料では、`references/dads-component-inventory.md`の各コンポーネントにある「Required PowerPoint coverage」を全て完了させる。コンポーネントの実装が変わった場合は、`node scripts/generate-component-inventory.cjs`を実行して網羅表を更新してから資料を作成する。

PowerPointをMarkdownへ変換する必要がある場合は、`scripts/extract-pptx-text.py <source.pptx> <destination.md>` を使用する。このスクリプトはOffice Open XMLをUTF-8で直接読むため、日本語の文字化けを避けられる。

## CSSからPowerPointへの変換規則

### カラー

`src/global.css` から抽出・解決した値を使用する。PptxGenJSでは16進数の先頭の `#` を除いて指定する。

- 色、透明度、罫線色、影色を含め、CSSの解決値と同一にする。
- 情報を色だけで区別しない。状態はラベル、アイコン、テキストでも示す。
- CSSに定義のない装飾色、グラデーション、アクセント線を追加しない。
- 透明な色は、元の背景と合成した場合の見た目とPowerPointの透明度が一致することを確認する。

### タイポグラフィ

- フォントファミリー、サイズ、ウェイト、行高、字間、配置は、対象のCSSルールから取得する。
- CSSのピクセル値は `1 CSS px = 0.75 pt` としてPowerPointポイントへ変換する。インチ指定は `1 inch = 96 CSS px` として変換する。
- DADSのすべての文字ユーティリティを資料化する場合は、Display、Standard、Dense、One Line、Monoの全クラスを、スタイル値と共に掲載する。
- 指定フォントがPowerPoint環境にない場合は代替フォントを勝手に選ばず、利用可能なフォントを確認して差異を記録する。
- 長文は文字を縮小して収めず、ソース上の情報階層を保ったまま複数のスライドへ分割する。

### レイアウト

SKILL.md
- HTMLのボックスモデルを基準に、幅、高さ、padding、margin、gap、border、border-radius、position、z-indexを変換する。
- CSSの角丸はPowerPointの最も近い図形だけで近似せず、元の半径に見合う値を指定する。再現できない形状はSVGまたはPNGで保持する。
- CSSの影は、色、透明度、ぼかし、距離、角度をPowerPointの影へ対応付ける。PowerPointで対応しない影は、元の見た目を画像化して使用する。
- SVG、擬似要素、マスク、複雑な背景、CSSで描かれるアイコンは、品質を落とさずにSVGまたはPNGとして取り込む。単純な図形へ勝手に置換しない。
- レスポンシブレイアウトは、資料の想定サイズを明記したうえで、その幅のレイアウトを再現する。複数ブレークポイントが資料の対象なら、各ブレークポイントを別の状態見本として示す。
- コンポーネント説明では、実際のHTML例、全バリエーション、全状態、アクセシビリティ上の要点を対応付ける。

### UI要素と図形

- ボタン、入力欄、選択肢、表、通知、ナビゲーション、モーダルなどは、コンポーネントCSSとHTMLの構造に従ってグループ化して描画する。
- アイコンは、リポジトリ内の元アセットを優先する。代替する場合は、意味・線幅・塗り・サイズが一致するものだけを使う。
- 状態を持つ要素は、状態ごとに独立した図形グループを作る。単一図形の色だけを変えて状態を省略しない。
- 文書や一般資料のために新しい図形を作る場合も、基盤トークンと既存コンポーネントの図形規則を参照する。

## テンプレート編集方式

テンプレートを使用する場合は、次の順序を守る。

1. `python -m markitdown "<template.pptx>"` でテキストとプレースホルダーを確認する。スライドの見た目は、PowerPointまたはPATH上で利用できるLibreOfficeでPDF／画像へレンダリングして確認する。ユーザー固有のローカルパスやスキルディレクトリをコマンドに含めない。
2. 内容ごとに最適なテンプレートスライドを対応付ける。繰り返しの多い箇条書きレイアウトを避ける。
3. `unpack.py` で展開し、構造変更、内容編集、`clean.py`、`pack.py` の順に処理する。
4. 不要な項目はテキストだけでなく、関連する画像、図形、キャプションを含むグループ全体を削除する。
5. テンプレートのフォント、余白、既存のデザイン規則を優先する。ただし、本文の判読性とコントラストは必ず確保する。

## PptxGenJSによる新規作成

- 生成用スクリプトは、出力先の近くに一時的に置かず、必要に応じて `scripts/` 配下へ内容を表す名前で保存する。
- プレゼンテーションの `author`、`title`、`subject` を設定する。
- テキストボックスを図形に揃える場合は、`margin: 0` を明示する。
- 箇条書きはUnicode文字を直接挿入せず、PptxGenJSの `bullet: true` を使用する。
- 画像には内容を表す `altText` を設定する。
- 図表は元データと単位を明記する。外部情報を使う場合は、出典をスライド内または巻末に記載する。
- 生成スクリプトには、抽出したトークンを名前付き定数として定義する。色や寸法のリテラル値を分散させない。
- コンポーネントを再現する場合は、各バリエーション・状態・ブレークポイントを列挙した配列からスライドまたは状態見本を生成し、漏れを防ぐ。

## 品質確認

生成後、完了を報告する前に必ず次を行う。

1. 抽出したトークン、コンポーネント、バリエーション、状態をチェックリスト化する。
2. 各項目が少なくとも1つのスライドまたは状態見本に対応していることを照合する。未対応項目があれば、資料を完成扱いにしない。
3. `python -m markitdown <output.pptx>` で、内容、順序、文字化け、プレースホルダーの残存を確認する。
4. `soffice.py` と `pdftoppm` を使って各スライドを画像化し、視覚確認する。
5. ソース側のHTMLまたはStorybookの対象状態と、PowerPointのレンダリングを並べて比較する。色、文字、余白、罫線、角丸、影、アイコン、状態表示の相違を修正する。
6. テキストの切れ・重なり・はみ出し、余白不足、整列ずれ、低コントラスト、表やフッターの衝突を確認する。
7. 1回以上の修正と再確認を行い、チェックリストがすべて完了するまで繰り返す。

PPTX内のテキストが長すぎて収まらない場合は、文字サイズを過度に下げず、内容を短縮するかスライドを分割する。

## 利用例

以下のような依頼で、このスキルを使用する。

```text
このデザインシステムを使い、事業説明用のPowerPointを作成して。
出力先: output/service-overview.pptx
対象読者: 行政サービスの企画担当者
構成: 表紙、課題、提案、導入効果、次のアクション
```

```text
button、input-text、notification-bannerを使ったフォーム画面の
PowerPointモックを作成して。通常、エラー、フォーカスの状態をすべて示して。
```

```text
このテンプレートを使い、DADSのトークンとコンポーネントで資料を更新して。
既存のレイアウトを保持し、結果をoutput/updated-deck.pptxに保存して。
```

## 完了報告

完了時は、次を簡潔に報告する。

- 作成または更新した `.pptx` のパス
- 使用したDADSの主要トークンとコンポーネント
- 静的資料として注記した非再現要素（ある場合）
- 実施した内容・視覚確認の結果

## 全コンポーネントの完全ビジュアルカタログ

全コンポーネント、全Storybookストーリー、デスクトップとモバイルの表示幅を資料化する場合は、実装を図形へ推測変換しない。Storybookをビルドし、各ストーリーを実行してキャプチャした画像をPowerPointへ配置する。

1. `npm run build-storybook` を実行する。
2. `storybook-static/index.json` から `Components/` 配下の全ストーリーIDを取得する。
3. 各 `iframe.html?id=<story-id>&viewMode=story` を、少なくとも1440pxと390pxの幅でキャプチャする。
4. 各ストーリーのデスクトップ／モバイル画像、ストーリー名、ソースファイル、IDを同じスライドへ配置する。
5. キャプチャ数がストーリー数の2倍であること、コンポーネント数と目次の件数が一致することを確認する。

このリポジトリでは `scripts/generate-complete-visual-catalog.cjs` が上記を実装し、`output/dads-complete-visual-catalog.pptx` を生成する。PowerPoint内で操作を再現できないため、ホバー、フォーカス、キーボード操作、アニメーションはStorybookで確認するよう明記する。
