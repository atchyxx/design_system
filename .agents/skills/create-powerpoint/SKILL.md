---
name: create-powerpoint
description: DADSデザイントークンを使用し、デザインスタイル手順書とテンプレート生成スクリプトからアクセシブルなPowerPoint（.pptx）資料を作成・更新する。
compatibility: Requires Node.js and pptxgenjs to generate the optional PowerPoint template. MarkItDown and LibreOffice or PowerPoint are optional for validation.
metadata:
  author: atchyxx (unofficial DADS reference skill)
  version: "1.1"
---

# PowerPoint資料作成スキル

デジタル庁デザインシステム（HTML版、DADS）を、PowerPointで静的に再現する。
コンポーネントの説明資料と、DADSのデザイン言語を採用した一般資料の両方を対象とする。
これはデジタル庁が配布する公式PowerPointテンプレートではない。

## 再現性の原則

このスキルの唯一の仕様は、資料作成時点のリポジトリ実装である。スキル本文の例示や記憶した値で代用しない。

- すべてのカラー、文字スタイル、余白、罫線、角丸、影、アイコン、図形、状態、バリエーションは、該当するソースから取得する。
- コンポーネントを扱う資料では、対象コンポーネントの全バリエーションと視覚状態を省略しない。
- PowerPointで動作を再現できない要素は、操作可能に見せかけない。通常・フォーカス・ホバー・無効・エラーなどを、明示した静的な状態見本として別々に示す。
- CSSの内容を「DADSらしい」任意の見た目に置換しない。PowerPointで同じ見た目を作れない場合は、差異と理由を資料の注記または作成報告に記載する。

## 公式DADS・PowerPoint適合の表記

DADSはWebサービス向けの公式デザインアセットである。DADSの公開トークンやコンポーネントを参照したPowerPointは、比較対象となる公式`.pptx`またはPowerPoint向けブランドガイドを確認していない限り、**「DADSを参照して作成」**と表記する。

- 「デジタル庁公式PowerPointテンプレート準拠」「デジタル庁公式テンプレートそのもの」「完全準拠」と表記してはならない。
- これらの表記には、公式配布元、版、利用条件を確認できる比較対象と、対象資料のフォント、配色、レイアウト、スライドマスター、アクセシビリティの照合記録が必要である。
- DADSの採用書体は`Noto Sans JP`と`Noto Sans Mono`である。既存のシステムフォントを使うことはDADSの公式ガイダンスで禁止されていないが、Notoを使った、または公式テンプレート準拠であるとは表記しない。
- 本文テキストは少なくとも14 CSS px、通常の読み物本文は16 CSS px以上を基準にする。投影・研修資料では14–16pt以上を基本とし、11–12ptの本文を使わない。
- テキストは背景に対して4.5:1以上、非テキスト要素は隣接背景に対して3:1以上のコントラスト比を満たす。
- 判断の根拠は、[DADSの基本デザイン](https://design.digital.go.jp/dads/foundations/)、[タイポグラフィ](https://design.digital.go.jp/dads/foundations/typography/)、[カラー](https://design.digital.go.jp/dads/foundations/color/)を優先する。作成時に公式資料または実装と矛盾する場合は、より新しい公式資料・実装を採用し、差異を記録する。

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
│   ├── generate-dads-powerpoint-template.cjs
│   └── embed-component-specifications.cjs
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

`SKILL.md`本文の「固定コンポーネント仕様スナップショット」は、全42コンポーネントのCSS値・バリエーション・状態を含む。これは生成時点の固定参照であり、実装変更後は`node scripts/generate-component-inventory.cjs`、続けて`node scripts/embed-component-specifications.cjs`を実行して更新する。

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

<!-- DADS_COMPONENT_SPECIFICATIONS_START -->

## 固定コンポーネント仕様スナップショット

この節は、生成時点の`src/components/`を固定した参照データである。全42コンポーネントのHTML例、Storybook、公開`data-*`バリエーション、状態、メディアクエリ、アクセシビリティシグナル、および個別CSSの全値を含む。

コンポーネントが変更された場合は、次を順に実行してこの節を更新する。

```text
node scripts/generate-component-inventory.cjs
node scripts/embed-component-specifications.cjs
```

### 全コンポーネントのバリエーション・状態

This generated reference covers every component directory in `src/components/`. It is the required coverage checklist for component-oriented PowerPoint decks. Regenerate it after component changes with:

```text
node scripts/generate-component-inventory.cjs
```

## Coverage summary

| Component | HTML examples | Data modifiers | Static states |
| --- | ---: | --- | --- |
| Accordion | 2 | — | hover, active, focus |
| Blockquote | 3 | data-spacing=4 | normal |
| Breadcrumb | 3 | — | hover, active, focus |
| Button | 3 | data-size=lg, data-type=solid-fill, data-size=md, data-size=sm, data-size=xs, data-type=outline, data-type=text | hover, active, focus, disabled |
| Calendar | 1 | data-size=sm, data-cell, data-type=outline, data-type=text, data-selected=true | hover, active, focus, disabled, selected |
| Card | 6 | data-size=sm, data-type=outline, data-type=solid-fill | hover, focus, checked |
| Carousel | 3 | — | hover, active, focus, selected |
| Checkbox | 6 | data-size=lg, data-size=md, data-size=sm, data-required=true | hover, focus, disabled, error, checked |
| ChipLabel | 2 | data-style=text, data-color=gray, data-color=blue, data-color=light-blue, data-color=cyan, data-color=green, data-color=lime, data-color=yellow, data-color=orange, data-color=red, data-color=magenta, data-color=purple, data-style=outlined, data-style=filled-1, data-style=filled-2 | normal |
| DatePicker | 4 | data-size=sm, data-size=md, data-size=lg, data-error, data-disabled, data-readonly, data-type=consolidated, data-type=separated, data-required=true, data-type=outline, data-cell, data-type=text, data-selected=true | hover, active, focus, disabled, error, expanded, readonly, open |
| DescriptionList | 1 | data-marker=bullet, data-marker=custom | normal |
| Disclosure | 1 | — | hover, active, focus |
| Divider | 2 | data-color=solid-gray-420, data-style=solid, data-width=1, data-color=solid-gray-536, data-color=black, data-width=2, data-width=3, data-width=4, data-style=dashed | normal |
| Drawer | 1 | data-placement=right, data-placement=left | open |
| EmergencyBanner | 1 | — | hover, focus |
| FileUpload | 2 | data-has-error=true, data-dragover=true, data-type=outline, data-size=xs, data-multiple=false, data-multiple=true, data-error=true, data-error-invalid-type=PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメントだけが選択できます。, data-size=md, data-type=text, data-error-, data-error-max-files=選択できるファイル数は{max}個までです。現在{current}個です。, data-error-max-total-size=選択できるファイルサイズの合計は{max}までです。現在{current}です。, data-error-invalid-type=このファイル形式はアップロードできません。, data-error-max-file-size=選択できるファイルサイズは{max}までです。現在{current}です。, data-error-max-files=The number of files that can be selected has exceeded the limit., data-error-max-total-size=The total size of files that can be selected has exceeded the limit., data-error-invalid-type=This file format is not allowed., data-error-max-file-size=The file size has exceeded the limit., data-error-has-file-errors=There are errors in the selected files. Please reselect the files with errors., data-error-invalid-type=PNG/JPEGだけが選択できます。, data-required=false | focus, error |
| FormControlLabel | 2 | data-size=sm, data-size=md, data-size=lg, data-required=true, data-required=false | error |
| HamburgerMenuButton | 3 | — | hover, focus |
| Heading | 1 | data-size=64, data-size=57, data-size=45, data-size=36, data-size=32, data-size=28, data-size=24, data-size=20, data-size=18, data-size=16, data-chip, data-rule=8, data-rule=6, data-rule=4, data-rule=2 | normal |
| HorizontalMenu | 1 | — | hover, focus, expanded |
| Image | 2 | data-full-width, data-bordered, data-style=dashed, data-style=solid | hover, focus |
| InputText | 3 | data-size=sm, data-size=md, data-size=lg, data-required=true | hover, focus, disabled, error, readonly |
| LanguageSelector | 1 | data-size=sm, data-style=text, data-text-weight=normal, data-type=box, data-size=regular, data-current, data-type=text | expanded |
| Link | 1 | — | hover, active, focus |
| List | 1 | data-spacing=4, data-marker=number, data-spacing=8, data-spacing=12 | normal |
| MenuList | 2 | data-type=standard, data-size=regular, data-expanded, data-current, data-size=small, data-type=box | hover, focus, checked, selected, expanded |
| MenuListBox | 1 | data-size=sm, data-size=md, data-style=outlined, data-style=filled, data-text-weight=bold, data-style=text, data-text-weight=normal, data-type=box, data-size=regular, data-type=standard, data-type=text | hover, focus, expanded |
| ModalDialog | 6 | data-size=lg, data-type=solid-fill, data-scroll=inner, data-scroll=outer | hover, focus, open |
| NotificationBanner | 6 | data-style=standard, data-type=error, data-size=md, data-type=outline, data-type=solid-fill, data-type=info-1, data-type=info-2, data-style=color-chip, data-type=success, data-type=warning | hover, focus |
| PageNavigation | 3 | data-size=lg, data-control=prev, data-control=next, data-type=outline, data-type=text, data-size=md, data-size=sm, data-size=xs | hover, active, focus |
| ProgressIndicator | 6 | data-size=md, data-type=solid-fill, data-type=stacked, data-type=inlined, data-type=stacked-underlay, data-size=sm, data-type=outline, data-paused, data-indeterminate | normal |
| Radio | 5 | data-size=lg, data-size=md, data-size=sm, data-required=true | hover, focus, disabled, error, checked |
| ResourceList | 3 | data-style=frame, data-style=list, data-size=md, data-interaction=whole | hover, active, focus, disabled, checked |
| SearchBox | 2 | data-size=lg, data-type=solid-fill, data-size=md, data-size=sm, data-type=text | hover, focus, checked |
| Select | 2 | data-size=md, data-size=sm, data-size=lg, data-required=true | hover, focus, disabled, error |
| StepNavigation | 2 | data-orientation=horizontal, data-size=normal, data-state=reached, data-state=completed, data-state=editing, data-state=error, data-state=skipped, data-size=small, data-first, data-last, data-orientation=vertical | hover, focus |
| Switch | 4 | data-size=md, data-required=true | hover, active, focus, disabled, checked |
| Tab | 4 | data-size=24, data-heading, data-position=top, data-position=bottom, data-position=left, data-position=right, data-activation=auto, data-activation=manual | hover, focus, selected |
| Table | 18 | data-border=hidden, data-size=dense, data-cell-border=bottom, data-cell-border=right, data-bg=solid-gray-100, data-border=right, data-row-stripe, data-row-hover-highlight, data-width=full, data-layout=fixed, data-selectable, data-size=sm, data-bg=white, data-bg=solid-gray-50, data-bg=transparent, data-border=right bottom, data-border=top-hidden | hover, focus, checked |
| Textarea | 4 | data-size=md, data-announcer=assertive, data-announcer=polite, data-count, data-exceeded, data-required=true, data-error-exceeded={count} characters exceeded. | hover, focus, disabled, error, readonly |
| Toc | 2 | data-spacing=8, data-border=dotted, data-border=solid | normal |
| UtilityLink | 2 | — | hover, active, focus |

## Accordion

**Source:** `src/components/accordion/`

### Variations and examples

- `playground.html`
- `stacked.html`

### Story files

- `accordion.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (min-width: 48rem) / (hover: hover)

### Accessibility signals to preserve

- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Blockquote

**Source:** `src/components/blockquote/`

### Variations and examples

- `multiple-paragraphs.html`
- `playground.html`
- `with-list.html`

### Story files

- `blockquote.stories.ts`

### Data modifiers

- `data-spacing=4`

### Static states to include

- `normal`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- Use native semantics and inspect source markup.

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Breadcrumb

**Source:** `src/components/breadcrumb/`

### Variations and examples

- `plain.html`
- `with-home-icon.html`
- `with-visible-label.html`

### Story files

- `breadcrumb.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-labelledby`
- `aria-hidden`
- `aria-current`
- `aria-label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Button

**Source:** `src/components/button/`

### Variations and examples

- `all-buttons-using-button.html`
- `all-buttons-using-link.html`
- `playground.html`

### Story files

- `button.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-type=solid-fill`
- `data-size=md`
- `data-size=sm`
- `data-size=xs`
- `data-type=outline`
- `data-type=text`

### Static states to include

- `hover`
- `active`
- `focus`
- `disabled`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-label`
- `aria-disabled`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Calendar

**Source:** `src/components/calendar/`

### Variations and examples

- `playground.html`

### Story files

- `calendar.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-cell`
- `data-type=outline`
- `data-type=text`
- `data-selected=true`

### Static states to include

- `hover`
- `active`
- `focus`
- `disabled`
- `selected`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-disabled`
- `aria-label`
- `aria-selected`
- `aria-live`
- `aria-hidden`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Card

**Source:** `src/components/card/`

### Variations and examples

- `example-1.html`
- `example-2.html`
- `example-3.html`
- `example-4.html`
- `example-5.html`
- `example-6.html`

### Story files

- `card.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-type=outline`
- `data-type=solid-fill`

### Static states to include

- `hover`
- `focus`
- `checked`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-label`
- `role`
- `label`
- `alt`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Carousel

**Source:** `src/components/carousel/`

### Variations and examples

- `container.html`
- `key-visual-multi.html`
- `key-visual-single.html`

### Story files

- `carousel.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`
- `selected`

### Responsive and interaction media queries

- (hover: hover) / (min-width: 30rem) / (min-width: 64rem)

### Accessibility signals to preserve

- `aria-current`
- `aria-selected`
- `aria-label`
- `aria-labelledby`
- `aria-hidden`
- `aria-live`
- `aria-atomic`
- `role`
- `alt`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Checkbox

**Source:** `src/components/checkbox/`

### Variations and examples

- `all-checkboxes.html`
- `errored.html`
- `indeterminate.html`
- `playground.html`
- `stacked.html`
- `standalone.html`

### Story files

- `checkbox.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-size=md`
- `data-size=sm`
- `data-required=true`

### Static states to include

- `hover`
- `focus`
- `disabled`
- `error`
- `checked`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-disabled`
- `aria-labelledby`
- `aria-describedby`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## ChipLabel

**Source:** `src/components/chip-label/`

### Variations and examples

- `all-chip-labels.html`
- `playground.html`

### Story files

- `chip-label.stories.ts`

### Data modifiers

- `data-style=text`
- `data-color=gray`
- `data-color=blue`
- `data-color=light-blue`
- `data-color=cyan`
- `data-color=green`
- `data-color=lime`
- `data-color=yellow`
- `data-color=orange`
- `data-color=red`
- `data-color=magenta`
- `data-color=purple`
- `data-style=outlined`
- `data-style=filled-1`
- `data-style=filled-2`

### Static states to include

- `normal`

### Responsive and interaction media queries

- (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## DatePicker

**Source:** `src/components/date-picker/`

### Variations and examples

- `playground-consolidated.html`
- `playground-separated.html`
- `readonly.html`
- `with-form-control-label.html`

### Story files

- `date-picker.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-size=md`
- `data-size=lg`
- `data-error`
- `data-disabled`
- `data-readonly`
- `data-type=consolidated`
- `data-type=separated`
- `data-required=true`
- `data-type=outline`
- `data-cell`
- `data-type=text`
- `data-selected=true`

### Static states to include

- `hover`
- `active`
- `focus`
- `disabled`
- `error`
- `expanded`
- `readonly`
- `open`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-expanded`
- `aria-describedby`
- `aria-live`
- `aria-label`
- `aria-haspopup`
- `aria-modal`
- `aria-hidden`
- `role`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## DescriptionList

**Source:** `src/components/description-list/`

### Variations and examples

- `playground.html`

### Story files

- `description-list.stories.ts`

### Data modifiers

- `data-marker=bullet`
- `data-marker=custom`

### Static states to include

- `normal`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- `alt`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Disclosure

**Source:** `src/components/disclosure/`

### Variations and examples

- `playground.html`

### Story files

- `disclosure.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Divider

**Source:** `src/components/divider/`

### Variations and examples

- `all-dividers.html`
- `playground.html`

### Story files

- `divider.stories.ts`

### Data modifiers

- `data-color=solid-gray-420`
- `data-style=solid`
- `data-width=1`
- `data-color=solid-gray-536`
- `data-color=black`
- `data-width=2`
- `data-width=3`
- `data-width=4`
- `data-style=dashed`

### Static states to include

- `normal`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- Use native semantics and inspect source markup.

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Drawer

**Source:** `src/components/drawer/`

### Variations and examples

- `playground.html`

### Story files

- `drawer.stories.ts`

### Data modifiers

- `data-placement=right`
- `data-placement=left`

### Static states to include

- `open`

### Responsive and interaction media queries

- (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-labelledby`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## EmergencyBanner

**Source:** `src/components/emergency-banner/`

### Variations and examples

- `playground.html`

### Story files

- `emergency-banner.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `focus`

### Responsive and interaction media queries

- (min-width: 48rem) / (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-label`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## FileUpload

**Source:** `src/components/file-upload/`

### Variations and examples

- `playground.html`
- `with-existing-files.html`

### Story files

- `file-upload.stories.ts`

### Data modifiers

- `data-has-error=true`
- `data-dragover=true`
- `data-type=outline`
- `data-size=xs`
- `data-multiple=false`
- `data-multiple=true`
- `data-error=true`
- `data-error-invalid-type=PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメントだけが選択できます。`
- `data-size=md`
- `data-type=text`
- `data-error-`
- `data-error-max-files=選択できるファイル数は{max}個までです。現在{current}個です。`
- `data-error-max-total-size=選択できるファイルサイズの合計は{max}までです。現在{current}です。`
- `data-error-invalid-type=このファイル形式はアップロードできません。`
- `data-error-max-file-size=選択できるファイルサイズは{max}までです。現在{current}です。`
- `data-error-max-files=The number of files that can be selected has exceeded the limit.`
- `data-error-max-total-size=The total size of files that can be selected has exceeded the limit.`
- `data-error-invalid-type=This file format is not allowed.`
- `data-error-max-file-size=The file size has exceeded the limit.`
- `data-error-has-file-errors=There are errors in the selected files. Please reselect the files with errors.`
- `data-error-invalid-type=PNG/JPEGだけが選択できます。`
- `data-required=false`

### Static states to include

- `focus`
- `error`

### Responsive and interaction media queries

- (forced-colors: active)

### Accessibility signals to preserve

- `aria-labelledby`
- `aria-live`
- `aria-describedby`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## FormControlLabel

**Source:** `src/components/form-control-label/`

### Variations and examples

- `multiple.html`
- `single.html`

### Story files

- `form-control-label.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-size=md`
- `data-size=lg`
- `data-required=true`
- `data-required=false`

### Static states to include

- `error`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- `aria-describedby`
- `aria-invalid`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## HamburgerMenuButton

**Source:** `src/components/hamburger-menu-button/`

### Variations and examples

- `desktop-and-mobile.html`
- `mobile-conditional-en.html`
- `mobile-conditional.html`

### Story files

- `hamburger-menu-button.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `focus`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-label`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Heading

**Source:** `src/components/heading/`

### Variations and examples

- `playground.html`

### Story files

- `heading.stories.ts`

### Data modifiers

- `data-size=64`
- `data-size=57`
- `data-size=45`
- `data-size=36`
- `data-size=32`
- `data-size=28`
- `data-size=24`
- `data-size=20`
- `data-size=18`
- `data-size=16`
- `data-chip`
- `data-rule=8`
- `data-rule=6`
- `data-rule=4`
- `data-rule=2`

### Static states to include

- `normal`

### Responsive and interaction media queries

- (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## HorizontalMenu

**Source:** `src/components/horizontal-menu/`

### Variations and examples

- `playground.html`

### Story files

- `horizontal-menu.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `focus`
- `expanded`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-current`
- `aria-expanded`
- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Image

**Source:** `src/components/image/`

### Variations and examples

- `playground.html`
- `with-picture-element.html`

### Story files

- `image.stories.ts`

### Data modifiers

- `data-full-width`
- `data-bordered`
- `data-style=dashed`
- `data-style=solid`

### Static states to include

- `hover`
- `focus`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `alt`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## InputText

**Source:** `src/components/input-text/`

### Variations and examples

- `playground.html`
- `readonly.html`
- `with-form-control-label.html`

### Story files

- `input-text.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-size=md`
- `data-size=lg`
- `data-required=true`

### Static states to include

- `hover`
- `focus`
- `disabled`
- `error`
- `readonly`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-disabled`
- `aria-describedby`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## LanguageSelector

**Source:** `src/components/language-selector/`

### Variations and examples

- `playground.html`

### Story files

- `language-selector.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-style=text`
- `data-text-weight=normal`
- `data-type=box`
- `data-size=regular`
- `data-current`
- `data-type=text`

### Static states to include

- `expanded`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- `aria-current`
- `aria-expanded`
- `aria-controls`
- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Link

**Source:** `src/components/link/`

### Variations and examples

- `playground.html`

### Story files

- `link.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-label`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## List

**Source:** `src/components/list/`

### Variations and examples

- `all-lists.html`

### Story files

- `list.stories.ts`

### Data modifiers

- `data-spacing=4`
- `data-marker=number`
- `data-spacing=8`
- `data-spacing=12`

### Static states to include

- `normal`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- Use native semantics and inspect source markup.

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## MenuList

**Source:** `src/components/menu-list/`

### Variations and examples

- `has-children.html`
- `playground.html`

### Story files

- `menu-list.stories.ts`

### Data modifiers

- `data-type=standard`
- `data-size=regular`
- `data-expanded`
- `data-current`
- `data-size=small`
- `data-type=box`

### Static states to include

- `hover`
- `focus`
- `checked`
- `selected`
- `expanded`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-label`
- `aria-current`
- `aria-selected`
- `aria-checked`
- `aria-expanded`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## MenuListBox

**Source:** `src/components/menu-list-box/`

### Variations and examples

- `playground.html`

### Story files

- `menu-list-box.stories.ts`

### Data modifiers

- `data-size=sm`
- `data-size=md`
- `data-style=outlined`
- `data-style=filled`
- `data-text-weight=bold`
- `data-style=text`
- `data-text-weight=normal`
- `data-type=box`
- `data-size=regular`
- `data-type=standard`
- `data-type=text`

### Static states to include

- `hover`
- `focus`
- `expanded`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-expanded`
- `aria-controls`
- `aria-haspopup`
- `aria-hidden`
- `aria-labelledby`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## ModalDialog

**Source:** `src/components/modal-dialog/`

### Variations and examples

- `fixed-width.html`
- `inner-scroll-with-fixed-actions.html`
- `inner-scroll-with-fixed-both.html`
- `inner-scroll-with-fixed-header.html`
- `inner-scroll.html`
- `playground.html`

### Story files

- `modal-dialog.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-type=solid-fill`
- `data-scroll=inner`
- `data-scroll=outer`

### Static states to include

- `hover`
- `focus`
- `open`

### Responsive and interaction media queries

- (hover: hover) / (min-width: 48rem) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-labelledby`
- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## NotificationBanner

**Source:** `src/components/notification-banner/`

### Variations and examples

- `error.html`
- `info-1.html`
- `info-2.html`
- `mobile-compact.html`
- `success.html`
- `warning.html`

### Story files

- `notification-banner.stories.ts`

### Data modifiers

- `data-style=standard`
- `data-type=error`
- `data-size=md`
- `data-type=outline`
- `data-type=solid-fill`
- `data-type=info-1`
- `data-type=info-2`
- `data-style=color-chip`
- `data-type=success`
- `data-type=warning`

### Static states to include

- `hover`
- `focus`

### Responsive and interaction media queries

- (min-width: 48rem) / (forced-colors: active) / (hover: hover)

### Accessibility signals to preserve

- `aria-label`
- `aria-labelledby`
- `aria-hidden`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## PageNavigation

**Source:** `src/components/page-navigation/`

### Variations and examples

- `arrow-button.html`
- `outlined-button.html`
- `text-button.html`

### Story files

- `page-navigation.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-control=prev`
- `data-control=next`
- `data-type=outline`
- `data-type=text`
- `data-size=md`
- `data-size=sm`
- `data-size=xs`

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-label`
- `aria-hidden`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## ProgressIndicator

**Source:** `src/components/progress-indicator/`

### Variations and examples

- `interactive-demo.html`
- `linear-fill.html`
- `linear-loop.html`
- `spinner-fill.html`
- `spinner-loop.html`
- `static.html`

### Story files

- `progress-indicator.stories.ts`

### Data modifiers

- `data-size=md`
- `data-type=solid-fill`
- `data-type=stacked`
- `data-type=inlined`
- `data-type=stacked-underlay`
- `data-size=sm`
- `data-type=outline`
- `data-paused`
- `data-indeterminate`

### Static states to include

- `normal`

### Responsive and interaction media queries

- (prefers-reduced-motion: reduce) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-valuemin`
- `aria-valuemax`
- `aria-labelledby`
- `aria-label`
- `aria-valuenow`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Radio

**Source:** `src/components/radio/`

### Variations and examples

- `all-radios.html`
- `errored.html`
- `playground.html`
- `stacked.html`
- `standalone.html`

### Story files

- `radio.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-size=md`
- `data-size=sm`
- `data-required=true`

### Static states to include

- `hover`
- `focus`
- `disabled`
- `error`
- `checked`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-describedby`
- `aria-disabled`
- `aria-labelledby`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## ResourceList

**Source:** `src/components/resource-list/`

### Variations and examples

- `multiple-items.html`
- `playground.html`
- `with-control.html`

### Story files

- `resource-list.stories.ts`

### Data modifiers

- `data-style=frame`
- `data-style=list`
- `data-size=md`
- `data-interaction=whole`

### Static states to include

- `hover`
- `active`
- `focus`
- `disabled`
- `checked`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-label`
- `aria-hidden`
- `role`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## SearchBox

**Source:** `src/components/search-box/`

### Variations and examples

- `playground.html`
- `with-detail.html`

### Story files

- `search-box.stories.ts`

### Data modifiers

- `data-size=lg`
- `data-type=solid-fill`
- `data-size=md`
- `data-size=sm`
- `data-type=text`

### Static states to include

- `hover`
- `focus`
- `checked`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active) / (min-width: 48rem)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-labelledby`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Show mobile and desktop specimens with their viewport widths.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Select

**Source:** `src/components/select/`

### Variations and examples

- `playground.html`
- `with-form-control-label.html`

### Story files

- `select.stories.ts`

### Data modifiers

- `data-size=md`
- `data-size=sm`
- `data-size=lg`
- `data-required=true`

### Static states to include

- `hover`
- `focus`
- `disabled`
- `error`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-describedby`
- `aria-hidden`
- `aria-disabled`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## StepNavigation

**Source:** `src/components/step-navigation/`

### Variations and examples

- `playground-full.html`
- `playground-single.html`

### Story files

- `step-navigation.stories.ts`

### Data modifiers

- `data-orientation=horizontal`
- `data-size=normal`
- `data-state=reached`
- `data-state=completed`
- `data-state=editing`
- `data-state=error`
- `data-state=skipped`
- `data-size=small`
- `data-first`
- `data-last`
- `data-orientation=vertical`

### Static states to include

- `hover`
- `focus`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-current`
- `aria-label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Switch

**Source:** `src/components/switch/`

### Variations and examples

- `playground-mode.html`
- `playground-on-off.html`
- `with-form-control-label-mode.html`
- `with-form-control-label-on-off.html`

### Story files

- `switch.stories.ts`

### Data modifiers

- `data-size=md`
- `data-required=true`

### Static states to include

- `hover`
- `active`
- `focus`
- `disabled`
- `checked`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-checked`
- `aria-hidden`
- `aria-disabled`
- `aria-describedby`
- `role`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Tab

**Source:** `src/components/tab/`

### Variations and examples

- `example.html`
- `playground-aria.html`
- `playground-static.html`
- `playground.html`

### Story files

- `tab.stories.ts`

### Data modifiers

- `data-size=24`
- `data-heading`
- `data-position=top`
- `data-position=bottom`
- `data-position=left`
- `data-position=right`
- `data-activation=auto`
- `data-activation=manual`

### Static states to include

- `hover`
- `focus`
- `selected`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-labelledby`
- `aria-current`
- `aria-selected`
- `aria-controls`
- `aria-orientation`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Table

**Source:** `src/components/table/`

### Variations and examples

- `border-on-row-and-column.html`
- `condensed-table.html`
- `first-column-as-header-cell.html`
- `first-row-and-column-as-header-cell.html`
- `first-row-as-header-cell.html`
- `highlight-hovered-row.html`
- `indented-rows.html`
- `linked-text-in-cell.html`
- `overflow-on-mobile.html`
- `plain.html`
- `playground.html`
- `selectable-table.html`
- `sortable-header-dense.html`
- `sortable-header.html`
- `stripe-table.html`
- `table-header-with-colspan.html`
- `table-header-with-rowspan.html`
- `with-caption.html`

### Story files

- `table.stories.ts`

### Data modifiers

- `data-border=hidden`
- `data-size=dense`
- `data-cell-border=bottom`
- `data-cell-border=right`
- `data-bg=solid-gray-100`
- `data-border=right`
- `data-row-stripe`
- `data-row-hover-highlight`
- `data-width=full`
- `data-layout=fixed`
- `data-selectable`
- `data-size=sm`
- `data-bg=white`
- `data-bg=solid-gray-50`
- `data-bg=transparent`
- `data-border=right bottom`
- `data-border=top-hidden`

### Static states to include

- `hover`
- `focus`
- `checked`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-label`
- `aria-description`
- `aria-labelledby`
- `aria-hidden`
- `aria-sort`
- `aria-haspopup`
- `role`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Textarea

**Source:** `src/components/textarea/`

### Variations and examples

- `playground.html`
- `readonly.html`
- `with-counter.html`
- `with-form-control-label.html`

### Story files

- `textarea.stories.ts`

### Data modifiers

- `data-size=md`
- `data-announcer=assertive`
- `data-announcer=polite`
- `data-count`
- `data-exceeded`
- `data-required=true`
- `data-error-exceeded={count} characters exceeded.`

### Static states to include

- `hover`
- `focus`
- `disabled`
- `error`
- `readonly`

### Responsive and interaction media queries

- (hover: hover) / (forced-colors: active)

### Accessibility signals to preserve

- `aria-invalid`
- `aria-describedby`
- `aria-live`
- `aria-disabled`
- `label`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## Toc

**Source:** `src/components/toc/`

### Variations and examples

- `nested.html`
- `playground.html`

### Story files

- `toc.stories.ts`

### Data modifiers

- `data-spacing=8`
- `data-border=dotted`
- `data-border=solid`

### Static states to include

- `normal`

### Responsive and interaction media queries

- 基本表示のみ（対象CSSを確認）

### Accessibility signals to preserve

- `aria-labelledby`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

## UtilityLink

**Source:** `src/components/utility-link/`

### Variations and examples

- `multiple.html`
- `playground.html`

### Story files

- `utility-link.stories.ts`

### Data modifiers

- No data-* modifier found.

### Static states to include

- `hover`
- `active`
- `focus`

### Responsive and interaction media queries

- (hover: hover)

### Accessibility signals to preserve

- `aria-hidden`
- `aria-label`
- `role`

### Required PowerPoint coverage

- [ ] Include every HTML example or Storybook variation listed above.
- [ ] Include every data modifier listed above.
- [ ] Show every listed state as an individually labeled static specimen.
- [ ] Do not imply a responsive layout change unless the source adds a viewport media query.
- [ ] Note interactive or assistive-technology behavior that PowerPoint cannot reproduce.

### 全コンポーネントの個別CSS値

### Accordion CSS values

#### `src/components/accordion/accordion.css`

```css
.dads-accordion {
  --_icon-size: calc(20 / 16 * 1rem);
  border-bottom: 1px solid var(--color-neutral-solid-gray-420);
}

@media (min-width: 48rem) {
  .dads-accordion {
    --_icon-size: calc(32 / 16 * 1rem);
  }
}

.dads-accordion__summary {
  position: relative;
  display: block;
  padding: calc(8 / 16 * 1rem) calc(8 / 16 * 1rem) calc(8 / 16 * 1rem)
    calc(var(--_icon-size) + 0.75rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  cursor: default;
}

.dads-accordion__summary::marker {
  content: "";
}

.dads-accordion__summary::-webkit-details-marker {
  display: none;
}

@media (min-width: 48rem) {
  .dads-accordion__summary {
    padding: calc(16 / 16 * 1rem) calc(16 / 16 * 1rem) calc(16 / 16 * 1rem)
      calc(var(--_icon-size) + calc(20 / 16 * 1rem));
    font-size: calc(18 / 16 * 1rem);
    line-height: 1.6;
  }
}

@media (hover: hover) {
  .dads-accordion__summary:hover:not(:focus-visible) {
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-accordion__summary:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-accordion__icon {
  position: absolute;
  top: calc(8 / 16 * 1rem);
  left: calc(2 / 16 * 1rem);
  margin-top: calc((1lh - var(--_icon-size)) / 2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--_icon-size);
  height: var(--_icon-size);
  border-radius: 50%;
  border: 1px solid currentcolor;
  background-color: var(--color-neutral-white);
  color: var(--color-key-1000);
}

@media (min-width: 48rem) {
  .dads-accordion__icon {
    top: calc(14 / 16 * 1rem);
    left: calc(6 / 16 * 1rem);
  }
}

.dads-accordion[open] .dads-accordion__icon {
  transform: rotate(180deg);
}

@media (hover: hover) {
  .dads-accordion__summary:hover .dads-accordion__icon {
    outline: calc(2 / 16 * 1rem) solid currentcolor;
  }
}

.dads-accordion__icon-svg {
  margin-top: calc(2 / 16 * 1rem);
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  pointer-events: none;
}

@media (min-width: 48rem) {
  .dads-accordion__icon-svg {
    width: auto;
    height: auto;
  }
}

.dads-accordion__summary :is(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font: inherit;
}

.dads-accordion__content {
  padding: calc(16 / 16 * 1rem) calc(8 / 16 * 1rem) calc(16 / 16 * 1rem)
    calc(var(--_icon-size) + 0.75rem);
}

@media (min-width: 48rem) {
  .dads-accordion__content {
    padding: calc(24 / 16 * 1rem) calc(16 / 16 * 1rem) calc(24 / 16 * 1rem)
      calc(var(--_icon-size) + 1.25rem);
  }
}

.dads-accordion__back-link:any-link {
  display: flex;
  align-items: flex-start;
  gap: calc(6 / 16 * 1rem);
  width: fit-content;
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
  text-spacing-trim: trim-start;
}

@media (hover: hover) {
  .dads-accordion__back-link:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-accordion__back-link:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-accordion__back-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-accordion__back-link-icon {
  margin-top: calc((1lh - 24 / 16 * 1rem) / 2);
  flex-shrink: 0;
}
```

### Blockquote CSS values

#### `src/components/blockquote/blockquote.css`

```css
.dads-blockquote {
  margin: 0 calc(40 / 16 * 1rem);
  border-left: 8px solid var(--color-neutral-solid-gray-536);
  padding-top: calc(8 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
  padding-left: calc(24 / 16 * 1rem);
}

.dads-blockquote > *:first-child {
  margin-top: 0 !important;
}

.dads-blockquote > *:last-child {
  margin-bottom: 0 !important;
}
```

### Breadcrumb CSS values

#### `src/components/breadcrumb/breadcrumb.css`

```css
.dads-breadcrumb {
  display: flex;
  column-gap: calc(4 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-breadcrumb__label {
  flex-shrink: 0;
}

.dads-breadcrumb__label::after {
  content: "：";
}

.dads-breadcrumb__list {
  margin: 0;
  padding: 0;
}

.dads-breadcrumb__item {
  display: inline;
  overflow-wrap: break-word;
}

.dads-breadcrumb__link:any-link {
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-breadcrumb__link:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-breadcrumb__link:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-breadcrumb__link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-breadcrumb__link-icon {
  display: inline-block;
  vertical-align: -0.15em;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

.dads-breadcrumb__separator::before,
.dads-breadcrumb__separator::after {
  content: " ";
}

.dads-breadcrumb__separator-icon {
  display: inline-block;
  margin-right: calc(1 / 16 * 1rem);
  margin-left: calc(1 / 16 * 1rem);
  width: calc(12 / 16 * 1rem);
  height: calc(12 / 16 * 1rem);
  vertical-align: middle;
  color: var(--color-neutral-solid-gray-900);
}
```

### Button CSS values

#### `src/components/button/button.css`

```css
.dads-button {
  --button-color: var(--color-key-900);
  --button-hover-color: var(--color-key-1000);
  --button-active-color: var(--color-key-1200);
  --button-outline-hover-bg-color: var(--color-key-200);
  --button-outline-active-bg-color: var(--color-key-300);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: calc(4 / 16 * 1rem);
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  text-decoration: none;
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-button:disabled,
.dads-button[aria-disabled="true"] {
  cursor: default;
}

.dads-button[data-type="solid-fill"] {
  border: 4px double transparent;
  background-color: var(--button-color);
  color: var(--color-neutral-white);
}

@media (hover: hover) {
  .dads-button[data-type="solid-fill"]:hover {
    background-color: var(--button-hover-color);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
  }
}

.dads-button[data-type="solid-fill"]:active {
  background-color: var(--button-active-color);
  text-decoration: underline;
}

.dads-button[data-type="solid-fill"]:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-button[data-type="solid-fill"]:disabled,
.dads-button[data-type="solid-fill"][aria-disabled="true"] {
  background-color: var(--color-neutral-solid-gray-300);
  color: var(--color-neutral-solid-gray-50);
  text-decoration: none;
}

@media (forced-colors: active) {
  .dads-button[data-type="solid-fill"]:disabled,
  .dads-button[data-type="solid-fill"][aria-disabled="true"] {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-button[data-type="outline"] {
  border: 1px solid currentcolor;
  background-color: var(--color-neutral-white);
  color: var(--button-color);
}

@media (hover: hover) {
  .dads-button[data-type="outline"]:hover {
    background-color: var(--button-outline-hover-bg-color);
    color: var(--button-hover-color);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
  }
}

.dads-button[data-type="outline"]:active {
  background-color: var(--button-outline-active-bg-color);
  color: var(--button-active-color);
  text-decoration: underline;
}

.dads-button[data-type="outline"]:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-button[data-type="outline"]:disabled,
.dads-button[data-type="outline"][aria-disabled="true"] {
  background-color: var(--color-neutral-white);
  color: var(--color-neutral-solid-gray-300);
  text-decoration: none;
}

@media (forced-colors: active) {
  .dads-button[data-type="outline"]:disabled,
  .dads-button[data-type="outline"][aria-disabled="true"] {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-button[data-type="text"] {
  border: 0;
  background-color: transparent;
  color: var(--button-color);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-button[data-type="text"]:hover {
    background-color: var(--color-key-50);
    color: var(--button-hover-color);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-button[data-type="text"]:active {
  background-color: var(--color-key-100);
  color: var(--button-active-color);
}

.dads-button[data-type="text"]:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-button[data-type="text"]:disabled,
.dads-button[data-type="text"][aria-disabled="true"] {
  background-color: transparent;
  color: var(--color-neutral-solid-gray-300);
  text-decoration-thickness: revert;
}

@media (forced-colors: active) {
  .dads-button[data-type="text"]:disabled,
  .dads-button[data-type="text"][aria-disabled="true"] {
    color: GrayText;
  }
}

.dads-button[data-size="lg"] {
  min-width: calc(136 / 16 * 1rem);
  min-height: calc(56 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-button[data-size="md"] {
  min-width: calc(96 / 16 * 1rem);
  min-height: calc(48 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-button[data-size="sm"] {
  position: relative;
  min-width: calc(80 / 16 * 1rem);
  min-height: calc(36 / 16 * 1rem);
  border-radius: calc(6 / 16 * 1rem);
  padding: calc(2 / 16 * 1rem) calc(12 / 16 * 1rem);
}

.dads-button[data-size="sm"]::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  height: calc(44 / 16 * 1rem);
}

.dads-button[data-size="xs"] {
  position: relative;
  min-width: calc(72 / 16 * 1rem);
  min-height: calc(28 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  padding: calc(2 / 16 * 1rem) calc(8 / 16 * 1rem);
  font-size: calc(14 / 16 * 1rem);
}

.dads-button[data-size="xs"]::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  height: calc(44 / 16 * 1rem);
}

.dads-button__icon {
  flex-shrink: 0;
}
```

### Calendar CSS values

#### `src/components/calendar/calendar.css`

```css
.dads-calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-calendar__controls {
  display: flex;
  column-gap: calc(8 / 16 * 1rem);
  padding: calc(16 / 16 * 1rem);
}

.dads-calendar__navigation {
  display: flex;
}

.dads-calendar__nav-button.dads-button[data-size="sm"] {
  width: calc(44 / 16 * 1rem);
  min-width: 0;
  padding: 0;
}

@media (hover: hover) {
  .dads-calendar__nav-button.dads-button[data-size="sm"]:hover {
    border-width: calc(3 / 16 * 1rem);
  }
}

.dads-calendar__current-month {
  margin: 0;
  align-self: center;
  width: calc(56 / 16 * 1rem);
  text-align: center;
}

.dads-calendar__table {
  margin-right: calc(12 / 16 * 1rem);
  margin-bottom: calc(8 / 16 * 1rem);
  margin-left: calc(12 / 16 * 1rem);
  width: auto;
  border-collapse: collapse;
}

.dads-calendar__header-cell {
  width: calc(48 / 16 * 1rem);
  height: calc(48 / 16 * 1rem);
  padding: 0;
  color: var(--color-neutral-solid-gray-700);
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}

.dads-calendar__data-cell {
  padding: 0;
}

.dads-calendar__date {
  margin: calc(4 / 16 * 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: calc(40 / 16 * 1rem);
  height: calc(40 / 16 * 1rem);
  border-radius: 50%;
  border: 0;
  background-color: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-calendar__date:not([data-selected]):hover {
    border: 1px solid var(--color-neutral-black);
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
  }
}

.dads-calendar__date:not([data-selected]):active {
  background-color: var(--color-neutral-solid-gray-100);
}

.dads-calendar__date:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-calendar__date[data-selected] {
  border: 1px solid transparent;
  background-color: var(--color-key-900);
  color: var(--color-neutral-white);
}

.dads-calendar__date:disabled {
  visibility: hidden;
}

.dads-calendar__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: calc(16 / 16 * 1rem);
  box-sizing: border-box;
  width: 100%;
  padding: calc(16 / 16 * 1rem);
}
```

### Card CSS values

#### `src/components/card/card-example-1.css`

```css
.dads-card-example-1-list {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-1-list > li {
  display: flex;
  min-width: 0;
}

.dads-card-example-1 {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  width: 352px;
  max-width: 100%;
  font-family: var(--font-family-sans);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.dads-card-example-1:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(16 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-card-example-1__image {
  position: relative;
  box-sizing: content-box;
  aspect-ratio: 3 / 2;
  border: 1px solid var(--color-neutral-solid-gray-420);
  border-radius: calc(16 / 16 * 1rem) calc(16 / 16 * 1rem) 0 0;
  background:
    linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    linear-gradient(
      114deg,
      var(--color-primitive-cyan-400) 0%,
      var(--color-primitive-purple-500) 100%
    );
}

.dads-card-example-1__image svg {
  position: absolute;
  inset: 0;
  margin: auto;
  width: calc(64 / 16 * 1rem);
  height: calc(64 / 16 * 1rem);
  z-index: 0;
  translate: 0 calc(-12 / 16 * 1rem);
}

.dads-card-example-1__main {
  flex-grow: 1;
  position: relative;
  margin-top: calc(-24 / 16 * 1rem);
  display: grid;
  align-content: start;
  row-gap: calc(16 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  border-radius: calc(16 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
}

.dads-card-example-1__main h2 {
  margin: 0;
  min-width: 0;
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-card-example-1:hover .dads-card-example-1__main h2 {
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-card-example-1__main p {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}
```

#### `src/components/card/card-example-2.css`

```css
.dads-card-example-2-list {
  margin: 0;
  display: grid;
  gap: calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-2-list > li {
  min-width: 0;
}

.dads-card-example-2 {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: grid;
  grid-template:
    "image main" auto /
    minmax(auto, min(50%, calc(352 / 16 * 1rem))) 1fr;
  max-width: calc(1024 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-card-example-2__main {
  position: relative;
  grid-area: main;
  display: grid;
  row-gap: calc(16 / 16 * 1rem);
  min-width: 0;
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
}

.dads-card-example-2__main-header {
  display: flex;
  justify-content: space-between;
  column-gap: calc(16 / 16 * 1rem);
  min-width: 0;
}

.dads-card-example-2__heading {
  margin: 0;
  min-width: 0;
  padding-top: calc(4 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-card-example-2__function {
  margin-right: calc(-24 / 16 * 1rem);
  flex-shrink: 0;
}

.dads-card-example-2__function > button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
  border: 1px solid transparent;
  border-radius: calc(6 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding: 0;
  color: var(--color-neutral-solid-gray-800);
}

@media (hover: hover) {
  .dads-card-example-2__function > button:hover {
    border-color: var(--color-neutral-black);
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-card-example-2__function > button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-card-example-2__contents {
  margin-top: 0;
  margin-bottom: 0;
  min-width: 0;
}

.dads-card-example-2__block-link {
  grid-area: 1 / 1 / -1 / -1;
  display: grid;
  grid-template: subgrid / subgrid;
  color: inherit;
  text-decoration: inherit;
}

.dads-card-example-2__divider {
  margin-top: calc(8 / 16 * 1rem);
  margin-bottom: calc(8 / 16 * 1rem);
  border-top: 1px solid var(--color-neutral-solid-gray-536);
}

.dads-card-example-2__links {
  display: flex;
  column-gap: calc(16 / 16 * 1rem);
  justify-content: end;
}

.dads-card-example-2__learn-more:any-link {
  background: var(--color-primitive-light-blue-900);
  display: flex;
  border: 4px double transparent;
  padding: calc(6 / 16 * 1rem) calc(8 / 16 * 1rem);
  color: var(--color-neutral-white);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
  text-decoration: none;
}

@media (hover: hover) {
  .dads-card-example-2__learn-more:hover {
    background: var(--color-primitive-light-blue-1000);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-card-example-2__learn-more:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-card-example-2__image {
  position: relative;
  grid-area: image;
  border-right: 1px solid var(--color-neutral-solid-gray-420);
}

.dads-card-example-2__image-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

#### `src/components/card/card-example-3.css`

```css
.dads-card-example-3-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 354px));
  gap: calc(32 / 16 * 1rem) calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-3-list > li {
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
  min-width: 0;
}

.dads-card-example-3 {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
  row-gap: 0;
  border-radius: calc(16 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-card-example-3__main {
  display: grid;
  align-content: start;
  row-gap: calc(16 / 16 * 1rem);
  min-width: 0;
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
  padding-bottom: 0;
}

.dads-card-example-3__main-header {
  display: flex;
  align-items: start;
  column-gap: calc(16 / 16 * 1rem);
  min-width: 0;
}

.dads-card-example-3__avatar {
  order: -1;
  flex-shrink: 0;
}

.dads-card-example-3__heading {
  display: flex;
  flex-direction: column;
  row-gap: calc(8 / 16 * 1rem);
  min-width: 0;
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

.dads-card-example-3__title {
  margin: 0;
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-card-example-3__label {
  order: -1;
}

.dads-card-example-3__contents {
  display: flex;
  flex-direction: column;
  row-gap: calc(16 / 16 * 1rem);
  min-width: 0;
}

.dads-card-example-3__contents > p {
  margin: 0;
}

.dads-card-example-3__contents img {
  display: block;
  max-width: 100%;
  height: auto;
}

.dads-card-example-3__sub {
  display: grid;
  gap: calc(16 / 16 * 1rem);
  min-width: 0;
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
}

.dads-card-example-3__sub > * {
  min-width: 0;
}

.dads-card-example-3__actions {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(16 / 16 * 1rem);
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  list-style: none;
}
```

#### `src/components/card/card-example-4.css`

```css
.dads-card-example-4-list {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-4-list > li {
  min-width: 0;
}

.dads-card-example-4 {
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: calc(16 / 16 * 1rem);
  box-sizing: border-box;
  width: 465px;
  max-width: 100%;
  border: 1px solid var(--color-neutral-solid-gray-420);
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-card-example-4__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: calc(4 / 16 * 1rem);
  min-width: 0;
  padding-top: calc(4 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-card-example-4__function {
  flex-shrink: 0;
}

.dads-card-example-4__function button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
  border: 1px solid transparent;
  border-radius: calc(6 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding: 0;
  color: var(--color-neutral-solid-gray-800);
}

@media (hover: hover) {
  .dads-card-example-4__function button:hover {
    border-color: var(--color-neutral-black);
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-card-example-4__function button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-card-example-4__contents {
  grid-column: 1 / -1;
  min-width: 0;
}

.dads-card-example-4__contents img {
  display: block;
}

.dads-card-example-4__actions {
  grid-column: 1 / -1;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(16 / 16 * 1rem);
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
  padding: 0;
  list-style: none;
}

.dads-card-example-4 .dads-button {
  border-radius: 0;
}

.dads-card-example-4 .dads-button:focus-visible {
  border-radius: calc(4 / 16 * 1rem);
}
```

#### `src/components/card/card-example-5.css`

```css
.dads-card-example-5-list {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-5-list > li {
  display: flex;
  min-width: 0;
}

.dads-card-example-5 {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 400px;
  max-width: 100%;
  border-radius: calc(16 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-card-example-5__link:any-link {
  display: block;
  border-radius: calc((16 - 1) / 16 * 1rem) calc((16 - 1) / 16 * 1rem) 0 0;
  padding-bottom: calc(16 / 16 * 1rem);
  color: inherit;
  text-decoration: inherit;
}

.dads-card-example-5__link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-card-example-5__heading {
  margin: 0;
  font: inherit;
}

.dads-card-example-5__image-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: calc((16 - 1) / 16 * 1rem) calc((16 - 1) / 16 * 1rem) 0 0;
}

.dads-card-example-5__image-label {
  position: absolute;
  top: calc(16 / 16 * 1rem);
  left: calc(16 / 16 * 1rem);
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: calc(4 / 16 * 1rem);
  width: calc(58 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding: calc(8 / 16 * 1rem);
}

.dads-card-example-5__month {
  color: var(--color-primitive-cyan-900);
  font-weight: bold;
  font-size: calc(14 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-card-example-5__date {
  font-weight: bold;
  font-size: calc(24 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-card-example-5__label {
  margin: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem) calc(8 / 16 * 1rem);
  display: block;
}

.dads-card-example-5__title {
  margin: 0 calc(24 / 16 * 1rem);
  display: block;
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-card-example-5__link:hover .dads-card-example-5__title {
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-card-example-5__sub {
  flex-grow: 1;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: calc(32 / 16 * 1rem);
  padding: 0 calc(24 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-card-example-5__sub > * {
  min-width: 0;
}

.dads-card-example-5__actions {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(16 / 16 * 1rem);
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  list-style: none;
}

.dads-card-example-5 .dads-button {
  --button-color: var(--color-primitive-cyan-900);
  --button-hover-color: var(--color-primitive-cyan-1000);
  --button-active-color: var(--color-primitive-cyan-1200);
  --button-outline-hover-bg-color: var(--color-primitive-cyan-50);
  --button-outline-active-bg-color: var(--color-primitive-cyan-100);
}
```

#### `src/components/card/card-example-6.css`

```css
.dads-card-example-6-list {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc(24 / 16 * 1rem);
  padding: 0;
  list-style: none;
}

.dads-card-example-6-list > li {
  display: flex;
  min-width: 0;
}

.dads-card-example-6 {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    "image"
    "main";
  grid-template-rows: auto 1fr;
  width: 354px;
  max-width: 100%;
  border-radius: calc(16 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-card-example-6:has(:checked) {
  background-color: var(--color-key-50);
}

.dads-card-example-6__main {
  grid-area: main;
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
}

.dads-card-example-6__heading {
  margin: 0;
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-card-example-6__heading label::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
}

.dads-card-example-6__contents {
  margin: calc(16 / 16 * 1rem) 0 0;
}

.dads-card-example-6__image {
  position: relative;
  grid-area: image;
  min-width: 0;
  border-bottom: 1px solid var(--color-neutral-solid-gray-420);
}

.dads-card-example-6__checkbox {
  position: absolute;
  top: calc(16 / 16 * 1rem);
  right: calc(16 / 16 * 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: calc(48 / 16 * 1rem);
  height: calc(48 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  border-radius: calc(6 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
}

.dads-card-example-6__image-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: calc((16 - 1) / 16 * 1rem) calc((16 - 1) / 16 * 1rem) 0 0;
}
```

### Carousel CSS values

#### `src/components/carousel/carousel-single.css`

```css
.dads-carousel-single {
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-carousel-single__link {
  position: relative;
  display: block;
  width: fit-content;
}

@media (hover: hover) {
  .dads-carousel-single__link:any-link:hover {
    outline: calc(4 / 16 * 1rem) solid var(--color-key-900);
    outline-offset: calc(-2 / 16 * 1rem);
  }

  .dads-carousel-single__link:any-link:hover::after {
    position: absolute;
    inset: 2px;
    box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
    pointer-events: none;
    content: "";
  }
}

.dads-carousel-single__link:any-link:focus-visible {
  overflow: hidden;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-2 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
}

.dads-carousel-single__link:any-link:focus-visible::after {
  position: absolute;
  inset: 2px;
  box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  border-radius: calc(6 / 16 * 1rem);
  pointer-events: none;
  content: "";
}

.dads-carousel-single__image {
  display: block;
  max-width: 100%;
  height: auto;
  outline: 2px solid var(--color-neutral-black);
  outline-offset: -2px;
}
```

#### `src/components/carousel/carousel.css`

```css
.dads-carousel {
  container-type: inline-size;
  display: block;
}

.dads-carousel__inner {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  max-width: calc(1024 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

@container (min-width: 64rem) {
  .dads-carousel__inner {
    padding-right: calc(48 / 16 * 1rem);
    padding-left: calc(48 / 16 * 1rem);
  }
}

.dads-carousel__heading {
  margin-top: 0;
  margin-bottom: calc(16 / 16 * 1rem);
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  font-weight: bold;
  letter-spacing: 0.02em;
}

@media (min-width: 30rem) {
  .dads-carousel__heading {
    font-size: calc(24 / 16 * 1rem);
  }
}

@media (min-width: 64rem) {
  .dads-carousel__heading {
    font-size: calc(32 / 16 * 1rem);
    letter-spacing: 0.01em;
  }
}

.dads-carousel__number {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: calc(32 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-800);
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0 0 calc(2 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font: inherit;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-carousel__number[aria-current="true"],
.dads-carousel__number[aria-selected="true"] {
  background-color: var(--color-neutral-solid-gray-800);
  color: var(--color-neutral-white);
  box-shadow: 0 0 0 2px var(--color-neutral-white);
  outline: 1px solid var(--color-neutral-solid-gray-800);
  outline-offset: 2px;
}

.dads-carousel__panel-set {
  display: grid;
  grid-template: "main" auto / auto;
}

@container (min-width: 64rem) {
  .dads-carousel__panel-set {
    margin-right: calc(-48 / 16 * 1rem);
    margin-left: calc(-48 / 16 * 1rem);
    grid-template:
      "number main next ." auto /
      calc(48 / 16 * 1rem) 3fr 1fr calc(48 / 16 * 1rem);
  }
}

.dads-carousel__panel-set::before {
  grid-area: number;
  justify-self: center;
  display: none;
  border-right: 1px solid var(--color-neutral-black);
  height: 100%;
  content: "";
}

.dads-carousel__panel-number {
  grid-area: number;
  justify-self: center;
  display: none;
}

.dads-carousel__main-bg {
  position: relative;
  z-index: -1;
  grid-area: main;
  overflow: clip;
}

.dads-carousel__main-bg > div {
  position: absolute;
  inset: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: blur(25px);
  transform: translate3d(0, 0, 0); /* for better performance on Safari */
}

.dads-carousel__main-bg > div img {
  width: auto;
  height: 200%;
}

.dads-carousel__main-bg > div::after {
  position: absolute;
  inset: 0;
  background-color: var(--color-neutral-white);
  mix-blend-mode: soft-light;
  content: "";
}

.dads-carousel__main {
  grid-area: main;
  position: relative;
  min-width: 0;
}

.dads-carousel__main-link {
  display: block;
}

@media (hover: hover) {
  .dads-carousel__main-link:any-link:hover:not(:focus-visible) {
    outline: calc(4 / 16 * 1rem) solid var(--color-key-900);
    outline-offset: calc(-2 / 16 * 1rem);
  }

  .dads-carousel__main-link:any-link:hover:not(:focus-visible)::after {
    position: absolute;
    inset: 2px;
    box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
    pointer-events: none;
    content: "";
  }
}

.dads-carousel__main-link:focus-visible {
  overflow: hidden;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-2 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
}

.dads-carousel__main-link:focus-visible::after {
  position: absolute;
  inset: 2px;
  box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  border-radius: calc(6 / 16 * 1rem);
  pointer-events: none;
  content: "";
}

.dads-carousel__image-container {
  display: grid;
  place-content: center;
  height: 100%;
  border-radius: inherit;
  outline: 2px solid var(--color-neutral-black);
  outline-offset: -2px;
}

.dads-carousel__image-container img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
}

.dads-carousel__next-bg {
  position: relative;
  z-index: -1;
  display: none;
  grid-area: next;
  overflow: clip;
}

.dads-carousel__next-bg > div {
  position: absolute;
  inset: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: blur(25px);
  transform: translate3d(0, 0, 0); /* for better performance on Safari */
}

.dads-carousel__next-bg > div img {
  width: auto;
  height: 200%;
  max-width: none;
}

.dads-carousel__next-bg > div::after {
  position: absolute;
  inset: 0;
  background-color: var(--color-neutral-white);
  mix-blend-mode: soft-light;
  content: "";
}

@container (min-width: 64rem) {
  .dads-carousel__next-bg {
    display: block;
  }
}

.dads-carousel__next {
  grid-area: next;
  margin: 0;
  display: none;
  min-width: 0;
  border: 1px solid var(--color-neutral-solid-gray-420);
  border-left-width: 0;
  padding: calc(24 / 16 * 1rem);
}

@container (min-width: 64rem) {
  .dads-carousel__next {
    display: block;
  }
}

.dads-carousel__next > button {
  position: relative;
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  padding: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
  cursor: pointer;
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-carousel__next > button:hover {
    outline: calc(4 / 16 * 1rem) solid var(--color-key-900);
    outline-offset: -1px;
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }

  .dads-carousel__next > button:hover:not(:focus-visible)::after {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
    pointer-events: none;
    content: "";
  }
}

.dads-carousel__next > button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__next-image-container img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
}

.dads-carousel__next-image-label {
  display: block;
  border-top: 1px solid var(--color-neutral-solid-gray-420);
  padding: calc(16 / 16 * 1rem);
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
  text-decoration-thickness: inherit;
}

.dads-carousel__controls {
  display: flex;
  align-items: center;
  column-gap: calc(20 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) 0;
}

@container (min-width: 64rem) {
  .dads-carousel__controls {
    column-gap: calc(32 / 16 * 1rem);
  }
}

.dads-carousel__others[open] {
  flex: 1;
}

.dads-carousel__others .dads-disclosure__summary {
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white) !important;
  padding: calc(8 / 16 * 1rem) calc(12 / 16 * 1rem);
  cursor: pointer;
}

.dads-carousel__others-content.dads-disclosure__content {
  margin: calc(12 / 16 * 1rem) 0 0;
  padding-left: 0;
}

.dads-carousel__others-content > ul {
  display: grid;
  row-gap: calc(24 / 16 * 1rem);
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dads-carousel dads-carousel-step-nav {
  display: none;
}

@container (min-width: 64rem) {
  .dads-carousel dads-carousel-step-nav {
    display: flex;
  }
}

.dads-carousel__step-nav {
  position: relative;
  margin: 0;
  display: flex;
  justify-content: end;
  column-gap: calc(16 / 16 * 1rem);
  padding: 0;
  list-style-type: none;
}

.dads-carousel__step-nav > li {
  position: relative;
  flex-shrink: 0;
}

.dads-carousel__step-nav > li:not(:last-child)::before {
  position: absolute;
  top: 50%;
  left: 100%;
  width: calc(16 / 16 * 1rem);
  border-bottom: 1px solid var(--color-neutral-solid-gray-800);
  content: "";
}

.dads-carousel__step {
  position: relative;
}

.dads-carousel__step:not([aria-selected="true"]) {
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-carousel__step::after {
  position: absolute;
  inset: calc(-7 / 16 * 1rem);
  content: "";
}

@media (hover: hover) {
  .dads-carousel__step:not([aria-selected="true"]):hover {
    outline: calc(2 / 16 * 1rem) solid;
    text-decoration-thickness: calc(3 / 16 * 1rem);
    cursor: pointer;
  }
}

.dads-carousel__step:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__page-nav {
  flex-shrink: 0;
  position: relative;
  margin: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: calc(12 / 16 * 1rem);
  padding: 0;
}

@container (min-width: 64rem) {
  .dads-carousel__page-nav {
    display: none;
  }
}

.dads-carousel__page-nav > button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  border: 1px solid var(--color-key-1000);
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0;
  color: var(--color-key-1000);
  cursor: pointer;
}

.dads-carousel__page-nav > button::after {
  position: absolute;
  inset: -100%;
  margin: auto;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
  content: "";
}

@media (hover: hover) {
  .dads-carousel__page-nav > button:hover {
    outline: calc(2 / 16 * 1rem) solid;
    background-color: var(--color-key-200);
  }
}

.dads-carousel__page-nav > button:active {
  background-color: var(--color-key-300);
  color: var(--color-key-1200);
}

.dads-carousel__page-nav > button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-carousel__page-nav > span {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}

.dads-carousel__others {
  order: -1;
}

/* 展開中 */

@container (min-width: 64rem) {
  .dads-carousel:has([open]) .dads-carousel__panel-set::before {
    display: block;
  }

  .dads-carousel:has([open]) .dads-carousel__panel-number {
    display: flex;
  }

  .dads-carousel:has([open]) .dads-carousel__next-bg {
    display: none;
  }

  .dads-carousel:has([open]) .dads-carousel__next {
    display: none;
  }

  .dads-carousel:has([open]) dads-carousel-step-nav {
    display: none;
  }
}

.dads-carousel:has([open]) .dads-carousel__controls {
  padding-bottom: calc(56 / 16 * 1rem);
}

.dads-carousel:has([open]) .dads-carousel__page-nav {
  display: none;
}

.dads-carousel:has([open]) .dads-carousel__expand {
  display: none;
}

.dads-carousel:has([open]) .dads-carousel__slides {
  display: grid;
}
```

### Checkbox CSS values

#### `src/components/checkbox/checkbox.css`

```css
.dads-checkbox {
  display: flex;
  align-items: start;
  gap: var(--_gap);
  width: fit-content;
}

.dads-checkbox:has(.dads-checkbox__label:not(:empty)) {
  padding-top: calc(8 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-checkbox[data-size="sm"] {
  --_gap: calc(4 / 16 * 1rem);
  --_checkbox-size: calc(24 / 16 * 1rem);
  --_checkbox-border-width: calc(2 / 16 * 1rem);
  --_checkbox-scale: 1;
  --_label-padding-top: calc(1 / 16 * 1rem);
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-checkbox[data-size="md"] {
  --_gap: calc(8 / 16 * 1rem);
  --_checkbox-size: calc(32 / 16 * 1rem);
  --_checkbox-border-width: calc(2 / 16 * 1rem);
  --_checkbox-scale: calc(20 / 14);
  --_label-padding-top: calc(4 / 16 * 1rem);
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-checkbox[data-size="lg"] {
  --_gap: calc(8 / 16 * 1rem);
  --_checkbox-size: calc(44 / 16 * 1rem);
  --_checkbox-border-width: calc(3 / 16 * 1rem);
  --_checkbox-scale: calc(27 / 14);
  --_label-padding-top: calc(10 / 16 * 1rem);
  --_label-font-size: calc(17 / 16 * 1rem);
}

.dads-checkbox__checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: var(--_checkbox-size);
  height: var(--_checkbox-size);
  border-radius: 12.5%;
}

@media (hover: hover) {
  .dads-checkbox__checkbox:has(
    :not(:focus, :disabled, [aria-disabled="true"]):hover
  ) {
    background-color: var(--color-neutral-solid-gray-420);
  }
}

.dads-checkbox__input {
  --_base-color: var(--color-neutral-white);
  --_accent-color: var(--color-key-900);
  --_accent-hover-color: var(--color-key-1100);
  --_border-color: var(--color-neutral-solid-gray-600);
  --_border-hover-color: var(--color-neutral-black);
  --_check-color: var(--color-neutral-white);

  margin: 0;
  appearance: none;
  width: 75%;
  height: 75%;
  border-radius: calc(2 / 18 * 100%);
  background-color: var(--_base-color);
  background-clip: padding-box;
  border: var(--_checkbox-border-width) solid var(--_border-color);
}

.dads-checkbox__input:focus {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-checkbox__input:not(:disabled, [aria-disabled="true"]):hover {
    border-color: var(--_border-hover-color);
  }
}

.dads-checkbox__input:is(:checked, :indeterminate) {
  border-color: var(--_accent-color);
  background-color: var(--_accent-color);
}

@media (hover: hover) {
  .dads-checkbox__input:is(:checked, :indeterminate):not(
    :disabled,
    [aria-disabled="true"]
  ):hover {
    border-color: var(--_accent-hover-color);
    background-color: var(--_accent-hover-color);
  }
}

.dads-checkbox__input::before {
  display: none;
  width: calc(14 / 16 * 1rem);
  height: calc(14 / 16 * 1rem);
  background-color: var(--_check-color);
  transform-origin: left top;
  transform: scale(var(--_checkbox-scale, 1));
  content: "";
}

.dads-checkbox__input:checked::before {
  display: block;
  clip-path: path(
    "M5.6,11.2L12.65,4.15L11.25,2.75L5.6,8.4L2.75,5.55L1.35,6.95L5.6,11.2Z"
  );
}

.dads-checkbox__input:indeterminate::before {
  display: block;
  clip-path: path("M2,6h10v2H2Z");
}

.dads-checkbox__input[aria-invalid="true"] {
  --_accent-color: var(--color-semantic-error-1);
  --_accent-hover-color: var(--color-primitive-red-1000);
  --_border-color: var(--color-semantic-error-1);
  --_border-hover-color: var(--color-primitive-red-1000);
}

.dads-checkbox__input:is(:disabled, [aria-disabled="true"]) {
  --_base-color: var(--color-neutral-solid-gray-50);
  --_accent-color: var(--color-neutral-solid-gray-300);
  --_accent-hover-color: var(--color-neutral-solid-gray-300);
  --_border-color: var(--color-neutral-solid-gray-300);
  --_border-hover-color: var(--color-neutral-solid-gray-300);
}

@media (forced-colors: active) {
  .dads-checkbox__input,
  .dads-checkbox__input[aria-invalid="true"] {
    --_accent-color: Highlight;
    --_accent-hover-color: Highlight;
    --_border-color: ButtonText;
    --_border-hover-color: ButtonText;
    --_check-color: HighlightText;
  }

  .dads-checkbox__input:is(:disabled, [aria-disabled="true"]) {
    --_accent-color: GrayText;
    --_accent-hover-color: GrayText;
    --_border-color: GrayText;
    --_border-hover-color: GrayText;
    --_check-color: Canvas;
  }
}

.dads-checkbox__label {
  padding-top: var(--_label-padding-top);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: var(--_label-font-size);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
}
```

### ChipLabel CSS values

#### `src/components/chip-label/chip-label.css`

```css
.dads-chip-label {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  align-content: center;
  box-sizing: border-box;
  min-height: calc(32 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  padding: calc(3 / 16 * 1rem) calc(7 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-chip-label[data-style="text"] {
  padding: calc(4 / 16 * 1rem) calc(8 / 16 * 1rem);
  color: var(--_text, #000);
}

.dads-chip-label[data-style="outlined"] {
  border: 1px solid var(--_non-text, #000);
  background-color: var(--color-neutral-white);
  color: var(--_text, #000);
}

.dads-chip-label[data-style="filled-1"] {
  border: 1px solid var(--_non-text, #000);
  background-color: var(--_bg, #eee);
  color: var(--_text-dark, #000);
}

.dads-chip-label[data-style="filled-2"] {
  border: 1px solid transparent;
  background-color: var(--_non-text, #000);
  color: var(--color-neutral-white, #fff);
}

.dads-chip-label[data-color="gray"] {
  --_non-text: var(--color-neutral-solid-gray-700);
  --_bg: var(--color-neutral-solid-gray-50);
  --_text: var(--color-neutral-solid-gray-800);
  --_text-dark: var(--color-neutral-solid-gray-800);
}

.dads-chip-label[data-color="blue"] {
  --_non-text: var(--color-primitive-blue-700);
  --_bg: var(--color-primitive-blue-50);
  --_text: var(--color-primitive-blue-700);
  --_text-dark: var(--color-primitive-blue-800);
}

.dads-chip-label[data-color="light-blue"] {
  --_non-text: var(--color-primitive-light-blue-800);
  --_bg: var(--color-primitive-light-blue-50);
  --_text: var(--color-primitive-light-blue-800);
  --_text-dark: var(--color-primitive-light-blue-900);
}

.dads-chip-label[data-color="cyan"] {
  --_non-text: var(--color-primitive-cyan-900);
  --_bg: var(--color-primitive-cyan-50);
  --_text: var(--color-primitive-cyan-900);
  --_text-dark: var(--color-primitive-cyan-1000);
}

.dads-chip-label[data-color="green"] {
  --_non-text: var(--color-primitive-green-800);
  --_bg: var(--color-primitive-green-50);
  --_text: var(--color-primitive-green-800);
  --_text-dark: var(--color-primitive-green-900);
}

.dads-chip-label[data-color="lime"] {
  --_non-text: var(--color-primitive-lime-900);
  --_bg: var(--color-primitive-lime-50);
  --_text: var(--color-primitive-lime-900);
  --_text-dark: var(--color-primitive-lime-1000);
}

.dads-chip-label[data-color="yellow"] {
  --_non-text: var(--color-primitive-yellow-1000);
  --_bg: var(--color-primitive-yellow-50);
  --_text: var(--color-primitive-yellow-1000);
  --_text-dark: var(--color-primitive-yellow-1100);
}

.dads-chip-label[data-color="orange"] {
  --_non-text: var(--color-primitive-orange-900);
  --_bg: var(--color-primitive-orange-50);
  --_text: var(--color-primitive-orange-900);
  --_text-dark: var(--color-primitive-orange-1000);
}

.dads-chip-label[data-color="red"] {
  --_non-text: var(--color-primitive-red-900);
  --_bg: var(--color-primitive-red-50);
  --_text: var(--color-primitive-red-900);
  --_text-dark: var(--color-primitive-red-1000);
}

.dads-chip-label[data-color="magenta"] {
  --_non-text: var(--color-primitive-magenta-800);
  --_bg: var(--color-primitive-magenta-50);
  --_text: var(--color-primitive-magenta-800);
  --_text-dark: var(--color-primitive-magenta-900);
}

.dads-chip-label[data-color="purple"] {
  --_non-text: var(--color-primitive-purple-800);
  --_bg: var(--color-primitive-purple-50);
  --_text: var(--color-primitive-purple-800);
  --_text-dark: var(--color-primitive-purple-800);
}

.dads-chip-label__icon {
  --_icon-size: calc(24 / 16 * 1rem);
  --_offset: calc((var(--_icon-size) - 1cap) / 2);
  position: relative;
  top: var(--_offset);
  margin-top: calc(-1 * var(--_offset));
  margin-right: calc(4 / 16 * 1rem);
  margin-bottom: var(--_offset);
  flex-shrink: 0;
}

@media (forced-colors: active) {
  .dads-chip-label__icon {
    fill: CanvasText;
  }
}

.dads-chip-label[data-style="filled-1"] .dads-chip-label__icon {
  color: var(--_non-text, #000);
}
```

### DatePicker CSS values

#### `src/components/date-picker/date-picker.css`

```css
.dads-date-picker {
  display: inline-block;
  vertical-align: middle;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-date-picker__controls {
  position: relative;
  display: flex;
  align-items: end;
  column-gap: calc(16 / 16 * 1rem);
}

.dads-date-picker__inputs {
  --_background-color: var(--color-neutral-white);

  display: inline-flex;
  box-sizing: border-box;
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--_background-color);
  padding: calc(2 / 16 * 1rem) 0 calc(2 / 16 * 1rem) calc(2 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="sm"] .dads-date-picker__inputs {
  height: calc(40 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="md"] .dads-date-picker__inputs {
  height: calc(48 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="lg"] .dads-date-picker__inputs {
  height: calc(56 / 16 * 1rem);
}

.dads-date-picker__inputs:focus-within {
  border-color: var(--color-neutral-black);
}

@media (hover: hover) {
  .dads-date-picker__inputs:hover {
    border-color: var(--color-neutral-solid-gray-900);
  }
}

.dads-date-picker__inputs[data-error] {
  border-color: var(--color-semantic-error-1);
}

.dads-date-picker__inputs[data-error]:focus-within {
  border-color: var(--color-primitive-red-1000);
}

.dads-date-picker__inputs[data-disabled] {
  --_background-color: var(--color-neutral-solid-gray-50);
  border-color: var(--color-neutral-solid-gray-300);
  color: var(--color-neutral-solid-gray-420);
}

.dads-date-picker__inputs[data-readonly] {
  border-style: dashed;
  border-color: var(--color-neutral-solid-gray-600);
}

@media (forced-colors: active) {
  .dads-date-picker__inputs:focus-within {
    border-color: Highlight;
  }

  @media (hover: hover) {
    .dads-date-picker__inputs:hover {
      border-color: Highlight;
    }
  }

  .dads-date-picker__inputs[data-disabled] {
    --_background-color: ButtonFace;
    border-color: GrayText;
    color: GrayText;
  }

  .dads-date-picker__inputs[data-readonly] {
    border-color: currentcolor;
  }
}

.dads-date-picker__year,
.dads-date-picker__month,
.dads-date-picker__day {
  position: relative;
  z-index: 0;
  display: inline-flex;
  flex-direction: row-reverse;
}

:is(.dads-date-picker__month, .dads-date-picker__day):not(:first-child) {
  margin-left: calc(-4 / 16 * 1rem);
}

:is(.dads-date-picker__month, .dads-date-picker__day):last-child {
  padding-right: calc(16 / 16 * 1rem);
}

.dads-date-picker__label {
  position: relative;
  z-index: 1;
  align-self: center;
  background-color: var(--_background-color);
  padding: calc(4 / 16 * 1rem);
  line-height: 1;
}

.dads-date-picker__input {
  margin-right: calc(-4 / 16 * 1rem);
  box-sizing: border-box;
  width: calc(64 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid transparent;
  background-color: transparent;
  padding-right: calc(12 / 16 * 1rem);
  color: inherit;
  text-align: right;
  font: inherit;
  letter-spacing: inherit;
}

.dads-date-picker__input:focus {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

:is(.dads-date-picker__month, .dads-date-picker__day) .dads-date-picker__input {
  width: calc(44 / 16 * 1rem);
}

.dads-date-picker__separated-inputs {
  display: inline-flex;
  column-gap: calc(16 / 16 * 1rem);
  box-sizing: content-box;
  padding-top: calc(12 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="sm"]
  .dads-date-picker__separated-inputs {
  height: calc(40 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="md"]
  .dads-date-picker__separated-inputs {
  height: calc(48 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="lg"]
  .dads-date-picker__separated-inputs {
  height: calc(56 / 16 * 1rem);
}

.dads-date-picker__separated-year,
.dads-date-picker__separated-month,
.dads-date-picker__separated-day {
  position: relative;
}

.dads-date-picker__separated-label {
  position: absolute;
  top: calc(-12 / 16 * 1rem);
  right: 0;
  left: 0;
  margin: 0 auto;
  box-sizing: border-box;
  width: calc(24 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding: calc(4 / 16 * 1rem);
  line-height: 1;
}

.dads-date-picker__separated-label:has(+ :disabled) {
  color: var(--color-neutral-solid-gray-420);
}

@media (forced-colors: active) {
  .dads-date-picker__separated-label:has(+ :disabled) {
    color: GrayText;
  }
}

.dads-date-picker__separated-input {
  box-sizing: border-box;
  width: calc(72 / 16 * 1rem);
  height: 100%;
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white);
  color: inherit;
  text-align: center;
  font: inherit;
  letter-spacing: inherit;
}

.dads-date-picker__separated-input:read-only:not(:disabled) {
  border-style: dashed;
}

.dads-date-picker__separated-input[aria-invalid="true"] {
  border-color: var(--color-semantic-error-1);
}

@media (hover: hover) {
  .dads-date-picker__separated-input:not(:read-only):hover {
    border-color: var(--color-neutral-solid-gray-900);
  }

  .dads-date-picker__separated-input[aria-invalid="true"]:hover {
    border-color: var(--color-primitive-red-1000);
  }
}

.dads-date-picker__separated-input:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-date-picker__separated-input:disabled {
  border-color: var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-solid-gray-50);
  color: var(--color-neutral-solid-gray-420);
}

:is(.dads-date-picker__separated-month, .dads-date-picker__separated-day)
  .dads-date-picker__separated-input {
  width: calc(56 / 16 * 1rem);
}

@media (forced-colors: active) {
  .dads-date-picker__separated-input:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-date-picker__calendar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: calc(4 / 16 * 1rem);
  border-radius: calc(6 / 16 * 1rem);
  border: 1px solid;
  background-color: var(--color-neutral-white);
  padding-right: calc(12 / 16 * 1rem);
  padding-left: calc(12 / 16 * 1rem);
  color: var(--color-key-900);
}

.dads-date-picker__controls[data-size="sm"] .dads-date-picker__calendar-button {
  height: calc(40 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="md"] .dads-date-picker__calendar-button {
  height: calc(48 / 16 * 1rem);
}

.dads-date-picker__controls[data-size="lg"] .dads-date-picker__calendar-button {
  height: calc(56 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-date-picker__calendar-button:enabled:hover {
    border-width: calc(3 / 16 * 1rem);
    background-color: var(--color-key-200);
    padding-right: calc(10 / 16 * 1rem);
    padding-left: calc(10 / 16 * 1rem);
  }
}

.dads-date-picker__calendar-button:enabled:active {
  background-color: var(--color-key-300);
}

.dads-date-picker__calendar-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-date-picker__calendar-button:disabled {
  cursor: default;
  background-color: var(--color-neutral-white);
  color: var(--color-neutral-solid-gray-300);
  text-decoration: none;
}

@media (forced-colors: active) {
  .dads-date-picker__calendar-button:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-date-picker__calendar-icon {
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-date-picker__calendar-chevron {
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

.dads-date-picker__calendar-button[aria-expanded="true"]
  .dads-date-picker__calendar-chevron {
  rotate: 180deg;
}

.dads-date-picker__backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.dads-date-picker__calendar-popover {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  box-shadow: var(--elevation-1);
}

.dads-date-picker__error-text {
  margin: calc(8 / 16 * 1rem) 0 0 0;
  color: var(--color-semantic-error-1);
  line-height: 1.7;
}
```

#### `src/components/date-picker/date-picker.stories.css`

```css
.sb-story {
  padding: calc(6 / 16 * 1rem);
}
```

### DescriptionList CSS values

#### `src/components/description-list/description-list.css`

```css
.dads-description-list {
  margin-top: calc(16 / 16 * 1rem);
  margin-bottom: calc(16 / 16 * 1rem);
  display: grid;
  gap: calc(8 / 16 * 1rem) 0;
  overflow-wrap: anywhere;
}

.dads-description-list dt {
  font-weight: bold;
}

.dads-description-list[data-marker="bullet"] dt {
  margin-left: calc(32 / 16 * 1rem);
  display: list-item;
  list-style-type: disc;
}

.dads-description-list[data-marker="custom"] dt > span:first-child {
  display: inline-block;
  min-width: calc(32 / 16 * 1rem);
}

.dads-description-list dd {
  margin-left: calc(32 / 16 * 1rem);
}
```

### Disclosure CSS values

#### `src/components/disclosure/disclosure.css`

```css
.dads-disclosure__summary {
  display: flex;
  align-items: start;
  justify-content: start;
  gap: calc(8 / 16 * 1rem);
  width: fit-content;
  cursor: default;
  list-style-type: none;
}

@media (hover: hover) {
  .dads-disclosure__summary:hover {
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-disclosure__summary:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-disclosure__summary::marker {
  content: "";
}

.dads-disclosure__summary::-webkit-details-marker {
  display: none;
}

.dads-disclosure__icon {
  flex-shrink: 0;
  margin-top: calc((1lh - 24px) / 2);
  color: var(--color-key-1000);
}

@media (forced-colors: active) {
  .dads-disclosure__icon {
    color: inherit;
  }
}

.dads-disclosure[open] .dads-disclosure__icon {
  rotate: 180deg;
}

.dads-disclosure__icon-hover {
  display: none;
}

@media (hover: hover) {
  .dads-disclosure__summary:hover .dads-disclosure__icon-circle {
    fill: Canvas;
  }

  .dads-disclosure__summary:hover .dads-disclosure__icon-triangle {
    fill: currentcolor;
  }
}

.dads-disclosure__content {
  padding-left: calc(32 / 16 * 1rem);
  margin: calc(16 / 16 * 1rem) 0;
}

.dads-disclosure__back-link:any-link {
  display: flex;
  align-items: start;
  gap: calc(6 / 16 * 1rem);
  width: fit-content;
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
  text-spacing-trim: trim-start;
}

@media (hover: hover) {
  .dads-disclosure__back-link:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-disclosure__back-link:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-disclosure__back-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-disclosure__back-link-icon {
  margin-top: calc((1lh - 24 / 16 * 1rem) / 2);
  flex-shrink: 0;
}
```

### Divider CSS values

#### `src/components/divider/divider.css`

```css
.dads-divider {
  margin: 0;
  border: 0;
  border-top: 1px solid;
  opacity: 1;
}

.dads-divider[data-color="solid-gray-420"] {
  border-top-color: var(--color-neutral-solid-gray-420);
}

.dads-divider[data-color="solid-gray-536"] {
  border-top-color: var(--color-neutral-solid-gray-536);
}

.dads-divider[data-color="black"] {
  border-top-color: var(--color-neutral-black);
}

.dads-divider[data-style="solid"] {
  border-top-style: solid;
}

.dads-divider[data-style="dashed"] {
  border-top-style: dashed;
}

.dads-divider[data-width="1"] {
  border-top-width: 1px;
}

.dads-divider[data-width="2"] {
  border-top-width: 2px;
}

.dads-divider[data-width="3"] {
  border-top-width: 3px;
}

.dads-divider[data-width="4"] {
  border-top-width: 4px;
}
```

### Drawer CSS values

#### `src/components/drawer/drawer.css`

```css
.dads-drawer {
  margin: unset;
  max-width: 100%;
  max-height: unset;
  box-sizing: border-box;
  width: calc(288 / 16 * 1rem);
  height: 100vh;
  height: 100dvh;
  box-shadow: var(--elevation-2);
  background-color: var(--color-neutral-white);
  border: 0;
  padding: 0;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-drawer[data-placement="right"] {
  left: auto;
  border-left: 1px solid transparent;
}

.dads-drawer[data-placement="left"] {
  right: auto;
  border-right: 1px solid transparent;
}

.dads-drawer[open] {
  display: grid;
  grid-template: "header" auto "body" 1fr / 1fr;
}

.dads-drawer::backdrop {
  background-color: var(--color-neutral-opacity-gray-100);
}

@media (forced-colors: active) {
  .dads-drawer::backdrop {
    background-color: #000b;
  }
}

.dads-drawer__header {
  display: flex;
  grid-area: header;
  padding: calc(20 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-drawer[data-placement="right"] .dads-drawer__header {
  justify-content: end;
}

.dads-drawer[data-placement="left"] .dads-drawer__header {
  justify-content: start;
}

.dads-drawer__body {
  grid-area: body;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}
```

### EmergencyBanner CSS values

#### `src/components/emergency-banner/emergency-banner.css`

```css
.dads-emergency-banner {
  display: grid;
  row-gap: calc(8 / 16 * 1rem);
  border: 6px solid var(--color-semantic-warning-orange-1);
  background-color: var(--color-neutral-white);
  padding: calc(14 / 16 * 1rem) calc(10 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

@media (min-width: 48rem) {
  .dads-emergency-banner {
    row-gap: calc(16 / 16 * 1rem);
    padding: calc(26 / 16 * 1rem);
  }
}

.dads-emergency-banner__header {
  display: grid;
  row-gap: calc(8 / 16 * 1rem);
}

.dads-emergency-banner__heading {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  text-spacing-trim: trim-start;
}

@media (min-width: 48rem) {
  .dads-emergency-banner__heading {
    font-size: calc(24 / 16 * 1rem);
  }
}

.dads-emergency-banner__timestamp {
  display: block;
  text-autospace: normal;
}

.dads-emergency-banner__body {
  display: grid;
  row-gap: calc(8 / 16 * 1rem);
}

.dads-emergency-banner__body > * {
  margin-top: 0;
  margin-bottom: 0;
}

@media (min-width: 48rem) {
  .dads-emergency-banner__body {
    row-gap: calc(16 / 16 * 1rem);
    font-size: var(--font-size-20);
    line-height: var(--line-height-150);
  }
}

.dads-emergency-banner__action {
  padding-top: calc(8 / 16 * 1rem);
}

@media (min-width: 48rem) {
  .dads-emergency-banner__action {
    display: flex;
    justify-content: center;
    padding-top: calc(12 / 16 * 1rem);
    padding-bottom: calc(4 / 16 * 1rem);
  }
}

.dads-emergency-banner__button,
.dads-emergency-banner__button:any-link {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid transparent;
  border-radius: calc(12 / 16 * 1rem);
  background-color: var(--color-semantic-error-1);
  padding: calc(18 / 16 * 1rem);
  color: var(--color-neutral-white);
  text-align: center;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
  text-decoration: none;
}

@media (min-width: 48rem) {
  .dads-emergency-banner__button,
  .dads-emergency-banner__button:any-link {
    width: fit-content;
    min-width: 50%;
    border-width: 4px;
    border-radius: calc(16 / 16 * 1rem);
    padding: calc(20 / 16 * 1rem);
  }
}

@media (hover: hover) {
  .dads-emergency-banner__button:hover {
    background-color: var(--color-semantic-error-2);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-emergency-banner__button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-emergency-banner__button::after {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-neutral-white);
  border-radius: calc(10 / 16 * 1rem);
  content: "";
}

@media (min-width: 48rem) {
  .dads-emergency-banner__button::after {
    border-width: 4px;
    border-radius: calc(12 / 16 * 1rem);
  }
}

@media (forced-colors: active) {
  .dads-emergency-banner__button::after {
    inset: calc(4 / 16 * 1rem);
    border-width: 2px;
    border-radius: calc(8 / 16 * 1rem);
  }
}

.dads-emergency-banner__button-icon {
  display: inline-block;
  fill: currentcolor;
  vertical-align: -0.15em;
}

.dads-emergency-banner__button-icon::before {
  content: " ";
}

.dads-emergency-banner__button-icon-glyph {
  display: block;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}
```

### FileUpload CSS values

#### `src/components/file-upload/file-upload.css`

```css
.dads-file-upload {
  display: block;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-form-control-label .dads-file-upload {
  margin-top: calc(8 / 16 * 1rem);
}

.dads-file-upload__input:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-file-upload:defined .dads-file-upload__input {
  display: none;
}

.dads-file-upload:not(:defined) .dads-file-upload__drop-area,
.dads-file-upload:not(:defined) .dads-file-upload__empty-message,
.dads-file-upload:not(:defined) .dads-file-upload__remove-button {
  display: none;
}

.dads-file-upload__drop-area {
  border: 1px solid var(--color-neutral-solid-gray-536);
  border-radius: calc(8 / 16 * 1rem);
  background-color: var(--color-neutral-solid-gray-50);
  padding: calc(32 / 16 * 1rem);
}

.dads-file-upload[data-has-error="true"] .dads-file-upload__drop-area {
  border-color: var(--color-semantic-error-1);
}

.dads-file-upload__drop-area[data-dragover="true"] {
  outline: 4px solid var(--color-semantic-success-1);
  outline-offset: -4px;
  background-color: var(--color-primitive-green-50);
}

.dads-file-upload__button-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-file-upload__button-area .dads-button {
  flex-shrink: 0;
}

.dads-file-upload__drop-area[data-dragover="true"] .dads-button,
.dads-button[data-dragover="true"] {
  background-color: var(--button-outline-active-bg-color);
  color: var(--button-active-color);
  text-decoration: underline;
}

.dads-file-upload[data-has-error="true"] .dads-button[data-type="outline"] {
  border-color: var(--color-semantic-error-1);
}

.dads-file-upload__button-area p {
  margin: 0;
  width: 0;
  flex-grow: 1;
  min-width: 12em;
}

.dads-file-upload__select-summary {
  margin: calc(8 / 16 * 1rem) 0 0;
}

.dads-file-upload__select-summary:empty {
  margin-top: 0;
}

.dads-file-upload__error-messages {
  margin: calc(8 / 16 * 1rem) 0 0;
  padding: 0;
  list-style-type: none;
}

.dads-file-upload__error-messages:empty {
  margin-top: 0;
}

.dads-file-upload__error-messages > li {
  color: var(--color-semantic-error-1);
}

.dads-file-upload__drop-area .dads-file-upload__error-messages > li {
  color: var(--color-semantic-error-2);
}

.dads-file-upload__expand-drop-area {
  margin: calc(48 / 16 * 1rem) 0 calc(-16 / 16 * 1rem) calc(-4 / 16 * 1rem);
}

.dads-file-upload__empty-message {
  margin: calc(16 / 16 * 1rem) 0 0;
}

.dads-file-upload__file-list {
  margin: calc(16 / 16 * 1rem) 0 0;
  padding: 0;
  list-style-type: none;
  counter-reset: file-item;
}

.dads-file-upload__file-item {
  display: flex;
  align-items: baseline;
  counter-increment: file-item;
}

.dads-file-upload__remove-button {
  order: -1;
}

.dads-file-upload__file-item + .dads-file-upload__file-item {
  margin-top: calc(4 / 16 * 1rem);
}

.dads-file-upload__remove-button.dads-button[data-size="xs"] {
  flex-shrink: 0;
  min-width: calc(48 / 16 * 1rem);
  min-height: calc(30 / 16 * 1rem);
  font-size: calc(16 / 16 * 1rem);
}

.dads-file-upload[data-multiple="false"] .dads-file-upload__file-marker {
  display: flex;
  flex-shrink: 0;
  align-self: start;
  justify-content: center;
  align-items: center;
  width: calc(24 / 16 * 1rem);
  height: calc(30 / 16 * 1rem);
}

.dads-file-upload[data-multiple="false"]
  .dads-file-upload__file-marker::before {
  width: calc(6 / 16 * 1rem);
  height: calc(6 / 16 * 1rem);
  border-radius: 50%;
  background-color: currentcolor;
  content: "";
}

@media (forced-colors: active) {
  .dads-file-upload[data-multiple="false"]
    .dads-file-upload__file-marker::before {
    background-color: CanvasText;
  }
}

.dads-file-upload[data-multiple="true"] .dads-file-upload__file-marker {
  width: calc(32 / 16 * 1rem);
}

.dads-file-upload[data-multiple="true"] .dads-file-upload__file-marker::before {
  content: counter(file-item) ".";
}

.dads-file-upload__file-info {
  flex: 1;
  min-width: 0;
}

.dads-file-upload__file-item[data-error="true"] .dads-file-upload__file-info {
  border-left: 4px solid var(--color-semantic-error-1);
  padding-left: calc(8 / 16 * 1rem);
  color: var(--color-semantic-error-1);
}

.dads-file-upload__file-info > p {
  margin: 0;
}

.dads-file-upload__file-name {
  margin-right: calc(16 / 16 * 1rem);
  font-weight: bold;
}

.dads-file-upload__file-meta {
  color: var(--color-neutral-solid-gray-600);
}

.dads-file-upload__file-item[data-error="true"] .dads-file-upload__file-meta {
  color: inherit;
}

.dads-file-upload__file-item input[type="file"] {
  display: none;
}

.dads-file-upload__viewport-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  border: 4px solid var(--color-semantic-success-1);
  background-color: var(--color-primitive-green-50);
}

.dads-file-upload__viewport-overlay-message {
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: calc(32 / 16 * 1rem - 4px);

  /* @link https://utopia.fyi/type/calculator/?c=320,18,1.2,1920,48,1.25,0,0,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
  font-size: clamp(
    calc(18 / 16 * 1rem),
    0.75rem +
    1.875vw,
    calc(48 / 16 * 1rem)
  );
  font-weight: bold;
  pointer-events: none;
}

.dads-file-upload__viewport-overlay-message span {
  display: inline-block;
}
```

#### `src/components/file-upload/file-upload.stories.css`

```css
.story-form-page {
  margin: 0;
  padding: 0;
}

.story-form-page__header {
  border-bottom: 1px solid var(--color-neutral-solid-gray-420);
  padding: calc(16 / 16 * 1rem) calc(24 / 16 * 1rem);
  margin-bottom: calc(40 / 16 * 1rem);
}

.story-form-page__header-title {
  margin: 0;
  font-size: calc(20 / 16 * 1rem);
  font-weight: bold;
}

.story-form-page__container {
  max-width: calc(800 / 16 * 1rem);
  margin: 0 auto;
  padding: 0 calc(24 / 16 * 1rem) calc(40 / 16 * 1rem);
}

.story-form-page__container .dads-heading {
  margin-bottom: calc(32 / 16 * 1rem);
}

.story-form-page__field {
  margin-bottom: calc(32 / 16 * 1rem);
}

.story-form-page__actions {
  margin-top: calc(48 / 16 * 1rem);
  text-align: center;
}

.story-form-page__actions .dads-button {
  min-width: calc(200 / 16 * 1rem);
}
```

### FormControlLabel CSS values

#### `src/components/form-control-label/form-control-label.css`

```css
.dads-form-control-label {
  margin: 0;
  display: flex;
  flex-direction: column;
  border: 0;
  padding: 0;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-form-control-label[data-size="sm"] {
  gap: calc(4 / 16 * 1rem);
}

.dads-form-control-label[data-size="md"] {
  gap: calc(8 / 16 * 1rem);
}

.dads-form-control-label[data-size="lg"] {
  gap: calc(8 / 16 * 1rem);
}

.dads-form-control-label__label {
  align-self: start;
  padding: 0;
  font-weight: bold;
}

.dads-form-control-label[data-size="sm"] .dads-form-control-label__label {
  font-size: calc(16 / 16 * 1rem);
}

.dads-form-control-label[data-size="md"] .dads-form-control-label__label {
  font-size: calc(17 / 16 * 1rem);
}

.dads-form-control-label[data-size="lg"] .dads-form-control-label__label {
  font-size: calc(18 / 16 * 1rem);
}

legend.dads-form-control-label__label {
  margin-bottom: calc(8 / 16 * 1rem);
  float: none;
}

.dads-form-control-label__requirement {
  margin-left: calc(4 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
}

.dads-form-control-label__requirement[data-required="true"] {
  color: var(--color-semantic-error-1);
}

.dads-form-control-label__requirement::before {
  content: " ";
}

.dads-form-control-label__status {
  margin-left: calc(4 / 16 * 1rem);
  display: inline-block;
  outline: 1px solid transparent;
  border-radius: calc(8 / 16 * 1rem);
  background-color: var(--color-neutral-solid-gray-536);
  padding: calc(8 / 16 * 1rem);
  color: var(--color-neutral-white);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-form-control-label__support-text {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--color-neutral-solid-gray-600);
}

.dads-form-control-label__error-text {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--color-semantic-error-1);
  line-height: 1.3;
  letter-spacing: 0;
}
```

### HamburgerMenuButton CSS values

#### `src/components/hamburger-menu-button/hamburger-menu-button.css`

```css
.dads-hamburger-menu-button {
  display: flex;
  align-items: center;
  column-gap: calc(4 / 16 * 1rem);
  width: fit-content;
  border: 0;
  border-radius: calc(6 / 16 * 1rem);
  background: transparent;
  padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem) calc(6 / 16 * 1rem)
    calc(12 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-hamburger-menu-button:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-hamburger-menu-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-hamburger-menu-button__icon {
  margin-top: calc(2 / 16 * 1rem);
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  flex-shrink: 0;
  color: var(--color-neutral-black);
}

@media (forced-colors: active) {
  .dads-hamburger-menu-button__icon {
    color: currentcolor;
  }
}
```

#### `src/components/hamburger-menu-button/hamburger-menu-icon-button.css`

```css
.dads-hamburger-menu-icon-button {
  display: block;
  width: fit-content;
  border: 0;
  border-radius: calc(4 / 16 * 1rem);
  background: transparent;
  padding: 0;
  color: var(--color-neutral-black);
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-hamburger-menu-icon-button:hover {
    outline: 1px solid;
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-hamburger-menu-icon-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-hamburger-menu-icon-button__icon {
  display: block;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}
```

### Heading CSS values

#### `src/components/heading/heading.css`

```css
.dads-heading {
  color: var(--color-neutral-solid-gray-800);
  font-family: var(--font-family-sans);
}

.dads-heading[data-size="64"] {
  --_shoulder-size: calc(28 / 16 * 1rem);
  --_shoulder-line-height: 1.5;
  --_shoulder-letter-spacing: 0.01em;
  font-weight: bold;
  font-size: calc(64 / 16 * 1rem);
  line-height: 1.4;
  letter-spacing: 0;
}

.dads-heading[data-size="57"] {
  --_shoulder-size: calc(24 / 16 * 1rem);
  --_shoulder-line-height: 1.5;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(57 / 16 * 1rem);
  line-height: 1.4;
  letter-spacing: 0;
}

.dads-heading[data-size="45"] {
  --_shoulder-size: calc(22 / 16 * 1rem);
  --_shoulder-line-height: 1.5;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(45 / 16 * 1rem);
  line-height: 1.4;
  letter-spacing: 0;
}

.dads-heading[data-size="36"] {
  --_shoulder-size: calc(20 / 16 * 1rem);
  --_shoulder-line-height: 1.5;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(36 / 16 * 1rem);
  line-height: 1.4;
  letter-spacing: 0.01em;
}

.dads-heading[data-size="32"] {
  --_shoulder-size: calc(18 / 16 * 1rem);
  --_shoulder-line-height: 1.6;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(32 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.dads-heading[data-size="28"] {
  --_shoulder-size: calc(16 / 16 * 1rem);
  --_shoulder-line-height: 1.7;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(28 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.dads-heading[data-size="24"] {
  --_shoulder-size: calc(16 / 16 * 1rem);
  --_shoulder-line-height: 1.7;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(24 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-heading[data-size="20"] {
  --_shoulder-size: calc(16 / 16 * 1rem);
  --_shoulder-line-height: 1.7;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-heading[data-size="18"] {
  --_shoulder-size: calc(16 / 16 * 1rem);
  --_shoulder-line-height: 1.7;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(18 / 16 * 1rem);
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.dads-heading[data-size="16"] {
  --_shoulder-size: calc(16 / 16 * 1rem);
  --_shoulder-line-height: 1.7;
  --_shoulder-letter-spacing: 0.02em;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

.dads-heading[data-chip] {
  position: relative;
  padding-left: calc(1em / 3 + 0.5em);
}

.dads-heading[data-chip]::before {
  position: absolute;
  top: 0.2em;
  bottom: 0.1em;
  left: 0;
  width: calc(1em / 3);
  background-color: var(--color-key-900);
  content: "";
}

@supports (top: 1lh) {
  .dads-heading[data-chip]::before {
    top: calc(0.5lh - 0.45em);
    bottom: calc(0.5lh - 0.55em);
  }
}

.dads-heading[data-chip]:has(.dads-heading__shoulder)::before {
  top: calc((var(--_shoulder-size) * (var(--_shoulder-line-height) - 1)) / 2);
}

@media (forced-colors: active) {
  .dads-heading[data-chip]::before {
    background-color: CanvasText;
  }
}

.dads-heading[data-rule] {
  border-bottom: solid var(--color-key-900);
}

.dads-heading[data-rule="8"] {
  border-bottom-width: calc(8 / 16 * 1rem);
  padding-bottom: calc(32 / 16 * 1rem);
}

.dads-heading[data-rule="6"] {
  border-bottom-width: calc(6 / 16 * 1rem);
  padding-bottom: calc(24 / 16 * 1rem);
}

.dads-heading[data-rule="4"] {
  border-bottom-width: calc(4 / 16 * 1rem);
  padding-bottom: calc(16 / 16 * 1rem);
}

.dads-heading[data-rule="2"] {
  border-bottom-width: calc(2 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-heading__shoulder {
  margin: 0;
  font-weight: bold;
  font-size: var(--_shoulder-size);
  line-height: var(--_shoulder-line-height);
  letter-spacing: var(--_shoulder-letter-spacing);
}

.dads-heading__heading {
  margin: 0;
  font: inherit;
}

.dads-heading__icon {
  margin-right: calc(0.4em - 0.25em);
}

.dads-heading__icon::after {
  content: " ";
}

.dads-heading__icon-svg {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.25em;
}
```

### HorizontalMenu CSS values

#### `src/components/horizontal-menu/horizontal-menu.css`

```css
.dads-horizontal-menu {
  margin: 0;
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--color-neutral-solid-gray-420);
  padding: 0;
  color: var(--color-neutral-solid-gray-900);
  list-style-type: none;
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
}

.dads-horizontal-menu__item {
  display: flex;
  align-items: stretch;
  position: relative;
}

.dads-horizontal-menu__item-inner,
.dads-horizontal-menu__item-inner:any-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(4 / 16 * 1rem);
  box-sizing: border-box;
  min-height: calc(64 / 16 * 1rem);
  border: 0;
  background-color: transparent;
  padding: calc(16 / 16 * 1rem) calc(20 / 16 * 1rem);
  color: inherit;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.dads-horizontal-menu__front-icon {
  flex-shrink: 0;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-horizontal-menu__chevron {
  margin-top: calc(4 / 16 * 1rem);
  box-sizing: content-box;
  flex-shrink: 0;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-horizontal-menu__item-inner:hover {
    background-color: var(--color-neutral-solid-gray-50);
  }

  .dads-horizontal-menu__item-inner:hover::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid var(--color-neutral-black);
    content: "";
  }
}

.dads-horizontal-menu__item-inner[aria-current] {
  background-color: var(--color-neutral-white);
  color: var(--color-key-1000);
}

.dads-horizontal-menu__item-inner[aria-current]::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 4px solid var(--color-key-900);
  content: "";
}

@media (hover: hover) {
  .dads-horizontal-menu__item-inner[aria-current]:hover {
    color: var(--color-key-900);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-horizontal-menu__item-inner:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-horizontal-menu__item-inner[aria-current]:focus-visible {
  background-color: var(--color-neutral-white);
}

.dads-horizontal-menu__item-inner[aria-expanded="true"]
  .dads-horizontal-menu__chevron {
  transform: rotate(180deg);
}
```

### Image CSS values

#### `src/components/image/image.css`

```css
.dads-image {
  margin: 0;
  width: fit-content;
}

.dads-image[data-full-width] {
  width: 100%;
}

.dads-image[data-full-width] .dads-image__img {
  width: 100%;
}

.dads-image__image-area {
  display: block;
}

.dads-image__image-area[data-bordered] {
  outline: 1px solid var(--color-neutral-solid-gray-420);
  outline-offset: -1px;
}

.dads-image__image-area:any-link {
  outline: 1px solid var(--color-primitive-blue-900);
  outline-offset: -1px;
}

@media (hover: hover) {
  .dads-image__image-area:any-link:hover {
    outline-width: 4px;
    outline-offset: -4px;
  }
}

.dads-image__image-area:any-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-image__img {
  display: block;
  max-width: 100%;
  height: auto;
}

.dads-image__caption {
  margin: calc(8 / 16 * 1rem) 0 0;
  contain: inline-size;
  padding: calc(8 / 16 * 1rem) calc(24 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-family: var(--font-family-sans);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

.dads-image__caption[data-style="dashed"] {
  border: 1px dashed var(--color-neutral-solid-gray-700);
}

.dads-image__caption[data-style="solid"] {
  border: 1px solid var(--color-neutral-solid-gray-420);
}
```

### InputText CSS values

#### `src/components/input-text/input-text.css`

```css
.dads-input-text {
  display: block;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-input-text__input {
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font: inherit;
  line-height: 1;
}

.dads-input-text__input[data-size="sm"] {
  height: 2.5rem;
}

.dads-input-text__input[data-size="md"] {
  height: 3rem;
}

.dads-input-text__input[data-size="lg"] {
  height: 3.5rem;
}

.dads-input-text__input:read-only:not(:disabled) {
  border-style: dashed;
}

.dads-input-text__input:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-input-text__input:not(:read-only):hover {
    border-color: var(--color-neutral-black);
  }
}

.dads-input-text__input:is(:user-invalid, [aria-invalid="true"]) {
  border-color: var(--color-semantic-error-1);
}

@media (hover: hover) {
  .dads-input-text__input:is(:user-invalid, [aria-invalid="true"]):hover {
    border-color: var(--color-primitive-red-1000);
  }
}

.dads-input-text__input:is(:disabled, [aria-disabled="true"]),
.dads-input-text__input:is(:disabled, [aria-disabled="true"]):hover {
  border-color: var(--color-neutral-solid-gray-300);
  background-color: var(--color-neutral-solid-gray-50);
  color: var(--color-neutral-solid-gray-420);
}

@media (forced-colors: active) {
  .dads-input-text__input[aria-disabled="true"],
  .dads-input-text__input[aria-disabled="true"]:hover {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-input-text__error-text {
  margin: calc(8 / 16 * 1rem) 0 0 0;
  display: block;
  color: var(--color-semantic-error-1);
}
```

### LanguageSelector CSS values

#### `src/components/language-selector/language-selector.css`

```css
.dads-language-selector {
  display: block;
  width: fit-content;
}

.dads-language-selector__check {
  visibility: hidden;
}

[aria-current] > .dads-language-selector__check {
  visibility: visible;
}
```

#### `src/components/language-selector/language-selector.stories.css`

```css
.sb-story {
  padding: calc(6 / 16 * 1rem);
}
```

### Link CSS values

#### `src/components/link/link.css`

```css
.dads-link:any-link {
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-link:visited {
  color: var(--color-primitive-magenta-900);
}

@media (hover: hover) {
  .dads-link:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-link:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-link__icon {
  display: inline-block;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  vertical-align: -0.15em;
}
```

### List CSS values

#### `src/components/list/list.css`

```css
.dads-list {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: calc(32 / 16 * 1rem);
  list-style-type: revert;
}

.dads-list > li {
  --_spacing: 0;
  padding-top: var(--_spacing);
  padding-bottom: var(--_spacing);
}

.dads-list[data-spacing="4"] > li {
  --_spacing: calc(4 / 16 * 1rem);
}

.dads-list[data-spacing="8"] > li {
  --_spacing: calc(8 / 16 * 1rem);
}

.dads-list[data-spacing="12"] > li {
  --_spacing: calc(12 / 16 * 1rem);
}

.dads-list[data-marker="number"] {
  padding-left: 0;
  list-style-type: none;
}

.dads-list[data-marker="number"] > li {
  padding-left: calc(32 / 16 * 1rem);
}

.dads-list[data-marker="number"] > li > a:only-child {
  margin-left: calc(-32 / 16 * 1rem);
  padding-left: calc(32 / 16 * 1rem);
}

.dads-list[data-marker="number"] > li > span:first-child,
.dads-list[data-marker="number"] > li > a:only-child > span:first-child {
  margin-left: calc(-32 / 16 * 1rem);
  display: inline-block;
  min-width: calc(32 / 16 * 1rem);
  white-space: nowrap;
}

.dads-list[data-marker="number"] > li > a:only-child > span:first-child {
  text-decoration: inherit;
}

.dads-list .dads-list {
  margin-top: var(--_spacing);
  margin-bottom: calc(-1 * var(--_spacing));
}
```

### MenuList CSS values

#### `src/components/menu-list/menu-list.css`

```css
.dads-menu-list {
  position: relative;
  z-index: 0;
  margin: 0;
  list-style-type: none;
  padding-left: 0;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
}

.dads-menu-list__item,
.dads-menu-list__item:any-link {
  display: flex;
  align-items: center;
  column-gap: calc(8 / 16 * 1rem);
  box-sizing: border-box;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  border: 0;
  background-color: transparent;
  padding-right: calc(16 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  color: inherit;
  text-align: left;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: none;
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-menu-list__item[data-size="regular"] {
  min-height: calc(44 / 16 * 1rem);
  padding-top: calc(10 / 16 * 1rem);
  padding-bottom: calc(10 / 16 * 1rem);
  line-height: 1.3;
}

.dads-menu-list__item[data-size="small"] {
  min-height: calc(36 / 16 * 1rem);
  padding-top: calc(6 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
  line-height: 1.2;
}

.dads-menu-list__item[data-type="standard"] {
  margin-left: calc(1rem * var(--menu-list-indentation, 0));
}

.dads-menu-list__item[data-type="standard"][data-size="regular"] {
  border-radius: calc(8 / 16 * 1rem);
}

.dads-menu-list__item[data-type="standard"][data-size="small"] {
  border-radius: calc(4 / 16 * 1rem);
}

.dads-menu-list__item[data-type="box"] {
  border-radius: 0;
}

.dads-menu-list__item[data-type="box"] {
  padding-left: calc(16 / 16 * 1rem + 1rem * var(--menu-list-indentation, 0));
}

.dads-menu-list__item[data-current] {
  background-color: var(--color-key-100);
  color: var(--color-key-1000);
  font-weight: bold;
}

.dads-menu-list__item:has(+ * [data-current]) {
  background-color: var(--color-key-50);
  color: var(--color-key-1000);
}

@media (hover: hover) {
  .dads-menu-list__item:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }

  .dads-menu-list__item[data-current]:hover,
  .dads-menu-list__item:has(+ * [data-current]):hover {
    background-color: var(--color-key-50);
    color: var(--color-key-900);
  }
}

.dads-menu-list__item:focus-visible {
  position: relative;
  z-index: 1;
  background-color: var(--color-primitive-yellow-300);
}

.dads-menu-list__item[data-type="standard"]:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-menu-list__item[data-type="box"]:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-4 / 16 * 1rem);
  box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-menu-list__item[data-current]:focus-visible {
  background-color: var(--color-key-100);
}

.dads-menu-list__item:has(+ * [data-current]):focus-visible {
  background-color: var(--color-key-50);
}

.dads-menu-list__front-icon {
  flex-shrink: 0;
}

.dads-menu-list__tail-icon {
  display: inline-block;
  vertical-align: -0.15em;
}

.dads-menu-list__end-icon {
  margin-top: calc(2 / 16 * 1rem);
  margin-right: calc(-4 / 16 * 1rem);
  margin-left: auto;
  flex-shrink: 0;
}

.dads-menu-list__item[data-expanded] .dads-menu-list__end-icon {
  transform: rotate(180deg);
}
```

### MenuListBox CSS values

#### `src/components/menu-list-box/menu-list-box.css`

```css
.dads-menu-list-box {
  position: relative;
  display: block;
  width: fit-content;
  color: var(--color-neutral-solid-gray-900);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.2;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-menu-list-box__opener {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: calc(8 / 16 * 1rem);
  border: 0;
  background: transparent;
  padding-top: calc(4 / 16 * 1rem);
  padding-bottom: calc(4 / 16 * 1rem);
  font: inherit;
  letter-spacing: inherit;
}

.dads-menu-list-box__opener[data-size="sm"] {
  min-height: calc(36 / 16 * 1rem);
  padding-right: calc(4 / 16 * 1rem);
  padding-left: calc(4 / 16 * 1rem);
  column-gap: calc(4 / 16 * 1rem);
}

.dads-menu-list-box__opener[data-size="md"] {
  min-height: calc(44 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  column-gap: calc(8 / 16 * 1rem);
}

.dads-menu-list-box__opener[data-style="outlined"] {
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: transparent;
}

.dads-menu-list-box__opener[data-style="filled"] {
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-menu-list-box__opener[data-text-weight="bold"] {
  font-weight: bold;
}

@media (hover: hover) {
  .dads-menu-list-box__opener:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }

  .dads-menu-list-box__opener[data-style="outlined"]:hover {
    border-color: var(--color-neutral-black);
  }

  .dads-menu-list-box__opener[data-style="filled"]:hover {
    background-color: var(--color-neutral-solid-gray-100);
  }
}

.dads-menu-list-box__opener:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-menu-list-box__opener[data-style="filled"]:focus-visible {
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-menu-list-box__opener-icon {
  flex-shrink: 0;
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-menu-list-box__opener-arrow {
  margin-top: calc(4 / 16 * 1rem);
  flex-shrink: 0;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

[aria-expanded="true"] > .dads-menu-list-box__opener-arrow {
  transform: rotate(180deg);
}

.dads-menu-list-box__popup {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: max-content;
  max-height: calc((16 + 44 * 6.5) / 16 * 1rem);
  overflow-y: auto;
  border-radius: calc(8 / 16 * 1rem) 0 0 calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-420);
  background-color: var(--color-neutral-white);
  padding: calc(16 / 16 * 1rem) 0;
  box-shadow: var(--elevation-1);
}
```

#### `src/components/menu-list-box/menu-list-box.stories.css`

```css
.sb-story {
  padding: calc(6 / 16 * 1rem);
}
```

### ModalDialog CSS values

#### `src/components/modal-dialog/modal-dialog.css`

```css
.dads-modal-dialog {
  --modal-dialog-width: fit-content;
  inset: 0;
  box-sizing: border-box;
  container-type: inline-size;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  border: 0;
  background-color: transparent;
  padding: 0 calc(16 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  overflow-wrap: break-word;
  color-scheme: dark;
}

.dads-modal-dialog:modal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dads-modal-dialog::before,
.dads-modal-dialog::after {
  display: block;
  flex-shrink: 9999;
  width: 1px;
  height: calc(120 / 16 * 1rem);
  min-height: calc(16 / 16 * 1rem);
  content: "";
}

.dads-modal-dialog::backdrop {
  background-color: var(--color-neutral-opacity-gray-600);
}

.dads-modal-dialog__dialog {
  display: flex;
  flex-direction: column;
  row-gap: calc(12 / 16 * 1rem);
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--modal-dialog-width);
  min-width: min(calc(480 / 16 * 1rem), calc(100cqw - 32 / 16 * 1rem));
  max-width: 100%;
  min-height: 0;
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-black);
  background-color: var(--color-neutral-white);
  box-shadow: var(--elevation-3);
  color: var(--color-neutral-solid-gray-800);
  color-scheme: light;
}

.dads-modal-dialog__header {
  display: flex;
  align-items: start;
  flex-shrink: 0;
  column-gap: calc(16 / 16 * 1rem);
  min-width: 0;
  padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem) 0;
}

.dads-modal-dialog__heading {
  margin: 0;
  flex-grow: 1;
  min-width: 0;
  font-weight: bold;
  font-size: calc(24 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.dads-modal-dialog__heading:focus-visible {
  outline: 0;
  border-radius: 0;
  box-shadow: none;
}

.dads-modal-dialog__close {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  column-gap: calc(4 / 16 * 1rem);
  width: fit-content;
  border: 0;
  border-radius: calc(6 / 16 * 1rem);
  background: transparent;
  padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem) calc(6 / 16 * 1rem)
    calc(12 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-modal-dialog__close:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-modal-dialog__close:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-modal-dialog__close-icon {
  margin-top: calc(2 / 16 * 1rem);
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  flex-shrink: 0;
  color: var(--color-neutral-black);
}

.dads-modal-dialog__body {
  flex-shrink: 0;
  min-width: 0;
  padding: 0 calc(16 / 16 * 1rem) calc(32 / 16 * 1rem);
}

.dads-modal-dialog__actions {
  flex-shrink: 0;
  min-width: 0;
  padding: 0 calc(16 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-modal-dialog__scroll-area {
  display: flex;
  flex-direction: column;
  row-gap: calc(12 / 16 * 1rem);
  overflow-y: auto;
  scrollbar-width: thin;
}

.dads-modal-dialog__scroll-area:not(:first-child) {
  margin-top: calc(-4 / 16 * 1rem);
  border-top: 1px solid var(--color-neutral-solid-gray-600);
}

.dads-modal-dialog__scroll-area:not(:last-child) {
  margin-bottom: calc(4 / 16 * 1rem);
  border-bottom: 1px solid var(--color-neutral-solid-gray-600);
}

.dads-modal-dialog:not([data-scroll]),
.dads-modal-dialog[data-scroll="outer"] {
  scrollbar-gutter: stable;
}

.dads-modal-dialog[data-scroll="inner"] .dads-modal-dialog__dialog {
  flex-shrink: 1;
  scrollbar-width: thin;
}

.dads-modal-dialog[data-scroll="inner"]:not(
    :has(.dads-modal-dialog__scroll-area)
  )
  .dads-modal-dialog__dialog {
  overflow-y: auto;
}

@media (min-width: 48rem) {
  .dads-modal-dialog__dialog {
    row-gap: calc(16 / 16 * 1rem);
  }

  .dads-modal-dialog__scroll-area {
    row-gap: calc(16 / 16 * 1rem);
  }

  .dads-modal-dialog__scroll-area:not(:first-child) {
    margin-top: calc(8 / 16 * 1rem);
  }

  .dads-modal-dialog__scroll-area:not(:last-child) {
    margin-bottom: calc(8 / 16 * 1rem);
  }

  .dads-modal-dialog__header {
    padding: calc(24 / 16 * 1rem) calc(24 / 16 * 1rem) 0;
  }

  .dads-modal-dialog__heading {
    font-weight: bold;
    font-size: calc(28 / 16 * 1rem);
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  .dads-modal-dialog__body {
    padding: 0 calc(24 / 16 * 1rem) calc(32 / 16 * 1rem);
  }

  .dads-modal-dialog__actions {
    padding: 0 calc(24 / 16 * 1rem) calc(24 / 16 * 1rem);
  }
}

@media (forced-colors: active) {
  .dads-modal-dialog::backdrop {
    background-color: #000b;
  }

  .dads-modal-dialog__close-icon {
    color: currentcolor;
  }
}
```

### NotificationBanner CSS values

#### `src/components/notification-banner/notification-banner.css`

```css
.dads-notification-banner {
  --_base-color: var(--color-primitive-blue-900);
  --_color-chip-color: var(--color-primitive-blue-900);
  display: grid;
  grid-template-columns: calc(24 / 16 * 1rem) 1fr auto;
  grid-template-rows: minmax(calc(36 / 16 * 1rem), auto);
  border: solid var(--_base-color);
  background-color: var(--color-neutral-white);
  padding-top: calc(8 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-bottom: calc(24 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-notification-banner[data-style="standard"] {
  border-radius: calc(12 / 16 * 1rem);
  border-width: calc(3 / 16 * 1rem);
}

.dads-notification-banner[data-style="color-chip"] {
  border-width: calc(2 / 16 * 1rem);
  padding-left: calc(24 / 16 * 1rem);
  box-shadow: inset calc(8 / 16 * 1rem) 0 0 0 var(--_color-chip-color);
}

@media (min-width: 48rem) {
  .dads-notification-banner {
    grid-template-columns: calc(36 / 16 * 1rem) 1fr auto;
    padding-top: calc(24 / 16 * 1rem);
    padding-right: calc(24 / 16 * 1rem);
    padding-bottom: calc(32 / 16 * 1rem);
    padding-left: calc(24 / 16 * 1rem);
    column-gap: calc(24 / 16 * 1rem);
  }

  .dads-notification-banner[data-style="color-chip"] {
    padding-left: calc(40 / 16 * 1rem);
    box-shadow: inset calc(16 / 16 * 1rem) 0 0 0 var(--_color-chip-color);
  }
}

.dads-notification-banner[data-type="success"] {
  --_base-color: var(--color-semantic-success-2);
  --_color-chip-color: var(--color-semantic-success-2);
}

.dads-notification-banner[data-type="error"] {
  --_base-color: var(--color-semantic-error-1);
  --_color-chip-color: var(--color-semantic-error-1);
}

.dads-notification-banner[data-type="warning"] {
  --_base-color: var(--color-semantic-warning-yellow-2);
  --_color-chip-color: var(--color-primitive-yellow-400);
}

.dads-notification-banner[data-type="info-1"] {
  --_base-color: var(--color-primitive-blue-900);
  --_color-chip-color: var(--color-primitive-blue-900);
}

.dads-notification-banner[data-type="info-2"] {
  --_base-color: var(--color-neutral-solid-gray-536);
  --_color-chip-color: var(--color-neutral-solid-gray-536);
}

.dads-notification-banner__icon {
  justify-self: center;
  width: calc(28 / 16 * 1rem);
  height: calc(28 / 16 * 1rem);
  max-width: none;
  max-height: none;
  padding-top: calc(3 / 16 * 1rem);
  color: var(--_base-color);
}

@media (min-width: 48rem) {
  .dads-notification-banner__icon {
    margin-top: calc(-4 / 16 * 1rem);
    margin-bottom: calc(-4 / 16 * 1rem);
    width: calc(44 / 16 * 1rem);
    height: calc(44 / 16 * 1rem);
    padding: 0;
  }
}

@media (forced-colors: active) {
  .dads-notification-banner__icon {
    color: currentcolor;
  }
}

.dads-notification-banner__heading {
  grid-column: span 2;
  margin-top: 0;
  margin-bottom: 0;
  display: grid;
  grid-template-columns: inherit;
  gap: inherit;
}

.dads-notification-banner__heading-text {
  padding-top: calc(3 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(17 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

@media (min-width: 48rem) {
  .dads-notification-banner__heading-text {
    padding-top: calc(2 / 16 * 1rem);
    font-size: calc(20 / 16 * 1rem);
    line-height: 1.5;
  }
}

.dads-notification-banner__close {
  margin-right: calc(-12 / 16 * 1rem);
  display: flex;
  align-self: start;
  align-items: center;
  column-gap: calc(4 / 16 * 1rem);
  background: transparent;
  border-radius: calc(8 / 16 * 1rem);
  border: 0;
  padding-top: calc(4 / 16 * 1rem);
  padding-right: calc(12 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
  padding-left: calc(12 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font: inherit;
  line-height: 1;
  letter-spacing: inherit;
}

@media (hover: hover) {
  .dads-notification-banner__close:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-notification-banner__close:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-notification-banner__close-icon {
  margin-top: calc(2 / 16 * 1rem);
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-notification-banner__mobile-close {
  margin-top: calc(4 / 16 * 1rem);
  border: 0;
  border-radius: calc(4 / 16 * 1rem);
  background: transparent;
  padding: 0;
  color: var(--color-neutral-black);
  touch-action: manipulation;
}

@media (hover: hover) {
  .dads-notification-banner__mobile-close:hover {
    outline: 1px solid;
    background-color: var(--color-neutral-solid-gray-50);
  }
}

.dads-notification-banner__mobile-close:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-notification-banner__mobile-close-icon {
  display: block;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}

.dads-notification-banner__body {
  margin-top: calc(-4 / 16 * 1rem);
  display: grid;
  row-gap: calc(8 / 16 * 1rem);
  grid-column: 1 / 4;
  color: var(--color-neutral-solid-gray-800);
}

@media (min-width: 48rem) {
  .dads-notification-banner__body {
    margin-top: 0;
    grid-column: 2 / 4;
  }
}

.dads-notification-banner__body > * {
  margin-top: 0;
  margin-bottom: 0;
}

.dads-notification-banner__timestamp time {
  text-autospace: normal;
}

.dads-notification-banner__actions {
  margin-bottom: calc(-8 / 16 * 1rem);
  display: grid;
  gap: calc(8 / 16 * 1rem);
  grid-column: 1 / 4;
}

@media (min-width: 48rem) {
  .dads-notification-banner__actions {
    grid-auto-flow: column;
    gap: calc(16 / 16 * 1rem);
    grid-column: 2 / 4;
    justify-content: end;
  }
}

.dads-notification-banner .dads-button {
  width: auto;
}

.dads-notification-banner[data-type="success"] .dads-button {
  --button-color: var(--color-semantic-success-2);
  --button-hover-color: var(--color-primitive-green-1000);
  --button-active-color: var(--color-primitive-green-1200);
  --button-outline-hover-bg-color: var(--color-primitive-green-200);
  --button-outline-active-bg-color: var(--color-primitive-green-300);
}

.dads-notification-banner[data-type="error"] .dads-button {
  --button-color: var(--color-semantic-error-1);
  --button-hover-color: var(--color-primitive-red-1000);
  --button-active-color: var(--color-primitive-red-1200);
  --button-outline-hover-bg-color: var(--color-primitive-red-200);
  --button-outline-active-bg-color: var(--color-primitive-red-300);
}

.dads-notification-banner[data-type="warning"] .dads-button {
  --button-color: var(--color-semantic-warning-yellow-2);
  --button-hover-color: var(--color-primitive-yellow-1000);
  --button-active-color: var(--color-primitive-yellow-1200);
  --button-outline-hover-bg-color: var(--color-primitive-yellow-200);
  --button-outline-active-bg-color: var(--color-primitive-yellow-300);
}

.dads-notification-banner[data-type="info-1"] .dads-button {
  --button-color: var(--color-primitive-blue-900);
  --button-hover-color: var(--color-primitive-blue-1000);
  --button-active-color: var(--color-primitive-blue-1200);
  --button-outline-hover-bg-color: var(--color-primitive-blue-200);
  --button-outline-active-bg-color: var(--color-primitive-blue-300);
}

.dads-notification-banner[data-type="info-2"] .dads-button {
  --button-color: var(--color-neutral-solid-gray-800);
  --button-hover-color: var(--color-neutral-solid-gray-900);
  --button-active-color: var(--color-neutral-black);
  --button-outline-hover-bg-color: var(--color-neutral-solid-gray-200);
  --button-outline-active-bg-color: var(--color-neutral-solid-gray-300);
}
```

### PageNavigation CSS values

#### `src/components/page-navigation/page-navigation.css`

```css
.dads-page-navigation {
  display: flex;
  align-items: center;
  gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-page-navigation__counter {
  min-width: calc(60 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
  text-align: center;
  white-space: nowrap;
}

.dads-page-navigation .dads-button[data-type="text"][data-control="prev"] {
  padding-left: calc(8 / 16 * 1rem);
}

.dads-page-navigation .dads-button[data-type="text"][data-control="next"] {
  padding-right: calc(8 / 16 * 1rem);
}

.dads-page-navigation .dads-button[data-type="outline"][data-control="prev"] {
  padding-right: calc(24 / 16 * 1rem);
}

.dads-page-navigation .dads-button[data-type="outline"][data-control="next"] {
  padding-left: calc(24 / 16 * 1rem);
}

.dads-page-navigation__arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0;
  color: var(--color-key-1000);
}

.dads-page-navigation__arrow-button[data-size="lg"] {
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="lg"] svg {
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="md"] {
  position: relative;
  width: calc(32 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="md"]::after {
  content: "";
  position: absolute;
  inset: -100%;
  margin: auto;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="md"] svg {
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="sm"] {
  position: relative;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="sm"]::after {
  content: "";
  position: absolute;
  inset: -100%;
  margin: auto;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="sm"] svg {
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="xs"] {
  position: relative;
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="xs"]::after {
  content: "";
  position: absolute;
  inset: -100%;
  margin: auto;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
}

.dads-page-navigation__arrow-button[data-size="xs"] svg {
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-page-navigation__arrow-button:any-link:hover,
  .dads-page-navigation__arrow-button:enabled:hover {
    border-width: 3px;
    background-color: var(--color-key-200);
  }
  .dads-page-navigation__arrow-button[data-size="sm"]:any-link:hover,
  .dads-page-navigation__arrow-button[data-size="sm"]:enabled:hover,
  .dads-page-navigation__arrow-button[data-size="xs"]:any-link:hover,
  .dads-page-navigation__arrow-button[data-size="xs"]:enabled:hover {
    border-width: 2px;
  }
}

.dads-page-navigation__arrow-button:any-link:active,
.dads-page-navigation__arrow-button:enabled:active {
  background-color: var(--color-key-300);
  color: var(--color-key-1200);
}

.dads-page-navigation__arrow-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-page-navigation__button-icon {
  flex-shrink: 0;
}
```

### ProgressIndicator CSS values

#### `src/components/progress-indicator/progress-indicator.css`

```css
.dads-progress-indicator {
  display: flex;
  gap: calc(16 / 16 * 1rem) calc(8 / 16 * 1rem);
  justify-content: center;
  align-items: center;
  color: var(--color-neutral-solid-gray-900);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

dads-progress-indicator:not([active]) {
  display: none;
}

dads-progress-indicator:not([active]) * {
  animation: none !important;
}

.dads-progress-indicator[data-type="stacked"] {
  flex-direction: column;
}

.dads-progress-indicator[data-type="stacked-underlay"] {
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  width: fit-content;
  border-radius: calc(16 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-white);
}

.dads-progress-indicator[data-type="stacked-underlay"]:has(
  .dads-progress-indicator__spinner,
  .dads-progress-indicator__static
) {
  min-width: calc(128 / 16 * 1rem);
  min-height: calc(128 / 16 * 1rem);
  padding: calc(16 / 16 * 1rem);
}

.dads-progress-indicator[data-type="stacked-underlay"]:has(
  .dads-progress-indicator__linear
) {
  padding: calc(24 / 16 * 1rem);
}

.dads-progress-indicator__track {
  stroke: currentcolor;
  color: var(--color-key-100);
}

.dads-progress-indicator__bar {
  color: var(--color-key-1200);
  stroke-dashoffset: calc(100 - clamp(0, var(--value, 35), 100));
}

.dads-progress-indicator__border {
  color: var(--color-key-1200);
}

/* Spinner type */

.dads-progress-indicator__spinner g {
  transform-origin: center;
}

.dads-progress-indicator__spinner .dads-progress-indicator__bar {
  stroke-dasharray: 100;
  transform: rotate(-90deg);
  transform-origin: center;
}

.dads-progress-indicator__spinner[data-indeterminate] g {
  animation: dads-spinner-rotate 13s linear infinite;
}

.dads-progress-indicator__spinner[data-indeterminate] g > g {
  animation: dads-spinner-group-rotate 2.5s linear infinite;
}

.dads-progress-indicator__spinner[data-indeterminate]
  .dads-progress-indicator__bar {
  animation:
    dads-spinner-bar-rotate 2.5s cubic-bezier(0.4, 0, 0.3, 1) infinite,
    dads-spinner-bar-dash 2.5s cubic-bezier(0.4, 0, 0.3, 1) infinite;
}

@keyframes dads-spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dads-spinner-group-rotate {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(135deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes dads-spinner-bar-rotate {
  0% {
    transform: rotate(0deg);
  }
  4% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.5, 0.4, 0.3, 0.9);
  }
  100% {
    transform: rotate(540deg);
  }
}

@keyframes dads-spinner-bar-dash {
  0% {
    stroke-dasharray: 8 92;
    stroke-dashoffset: 4;
  }
  30% {
    stroke-dasharray: 80 20;
    stroke-dashoffset: 40;
  }
  100% {
    stroke-dasharray: 8 92;
    stroke-dashoffset: 4;
  }
}

/* Linear type */

.dads-progress-indicator__linear .dads-progress-indicator__bar {
  stroke-dasharray: 100;
}

.dads-progress-indicator__linear[data-indeterminate]
  .dads-progress-indicator__bar {
  stroke-dasharray: 35 65;
  animation: dads-linear-rotate 4s linear infinite;
}

/* Static type */

.dads-progress-indicator__static {
  color: var(--color-key-1200);
}

@keyframes dads-linear-rotate {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: -100;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dads-progress-indicator__spinner,
  .dads-progress-indicator__spinner *,
  .dads-progress-indicator__linear,
  .dads-progress-indicator__linear * {
    animation: none !important;
  }
}

/* Percentage display */

.dads-progress-indicator__percentage span {
  display: inline-block;
  min-width: 2ch;
  text-align: right;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}

@media (forced-colors: active) {
  .dads-progress-indicator__track {
    color: Canvas;
  }

  .dads-progress-indicator__bar,
  .dads-progress-indicator__border {
    color: CanvasText;
  }

  .dads-progress-indicator__static {
    color: CanvasText;
  }
}
```

#### `src/components/progress-indicator/progress-indicator.stories.css`

```css
:has(> .dads-progress-indicator) {
  display: grid;
  gap: 4rem;
  place-items: center;
  min-block-size: 0;
}

[data-paused] .dads-progress-indicator * {
  animation-play-state: paused !important;
}
```

### Radio CSS values

#### `src/components/radio/radio.css`

```css
.dads-radio {
  display: flex;
  align-items: start;
  gap: var(--_gap);
  width: fit-content;
}

.dads-radio:has(.dads-radio__label:not(:empty)) {
  padding-top: calc(8 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-radio[data-size="sm"] {
  --_gap: calc(4 / 16 * 1rem);
  --_radio-size: calc(24 / 16 * 1rem);
  --_radio-outer-size: calc(20 / 16 * 1rem);
  --_radio-inner-size: calc(10 / 16 * 1rem);
  --_radio-border-width: calc(2 / 16 * 1rem);
  --_label-padding-top: 1px;
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-radio[data-size="md"] {
  --_gap: calc(8 / 16 * 1rem);
  --_radio-size: calc(32 / 16 * 1rem);
  --_radio-outer-size: calc(26 / 16 * 1rem);
  --_radio-inner-size: calc(12 / 16 * 1rem);
  --_radio-border-width: calc(2 / 16 * 1rem);
  --_label-padding-top: calc(4 / 16 * 1rem);
  --_label-font-size: calc(16 / 16 * 1rem);
}

.dads-radio[data-size="lg"] {
  --_gap: calc(12 / 16 * 1rem);
  --_radio-size: calc(44 / 16 * 1rem);
  --_radio-outer-size: calc(36 / 16 * 1rem);
  --_radio-inner-size: calc(16 / 16 * 1rem);
  --_radio-border-width: calc(3 / 16 * 1rem);
  --_label-padding-top: calc(10 / 16 * 1rem);
  --_label-font-size: calc(17 / 16 * 1rem);
}

.dads-radio__radio {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: var(--_radio-size);
  height: var(--_radio-size);
  border-radius: 50%;
}

@media (hover: hover) {
  .dads-radio__radio:has(
    :not(:focus, :disabled, [aria-disabled="true"]):hover
  ) {
    background-color: var(--color-neutral-solid-gray-420);
  }
}

.dads-radio__input {
  --_base-color: var(--color-neutral-white);
  --_accent-color: var(--color-key-900);
  --_accent-hover-color: var(--color-key-1100);
  --_border-color: var(--color-neutral-solid-gray-600);
  --_border-hover-color: var(--color-neutral-black);

  position: relative;
  margin: 0;
  appearance: none;
  width: var(--_radio-outer-size);
  height: var(--_radio-outer-size);
  border-radius: 51%;
  background-color: var(--_base-color);
  border: var(--_radio-border-width) solid var(--_border-color);
}

.dads-radio__input:focus {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-radio__input:not(:disabled, [aria-disabled="true"]):hover {
    border-color: var(--_border-hover-color);
  }
}

.dads-radio__input:checked {
  border-color: var(--_accent-color);
}

@media (hover: hover) {
  .dads-radio__input:checked:not(:disabled, [aria-disabled="true"]):hover {
    border-color: var(--_accent-hover-color);
  }
}

.dads-radio__input:checked::before {
  position: absolute;
  inset: 0;
  margin: auto;
  width: var(--_radio-inner-size);
  height: var(--_radio-inner-size);
  border-radius: 51%;
  background-color: var(--_accent-color);
  content: "";
}

@media (hover: hover) {
  .dads-radio__input:checked:not(
    :disabled,
    [aria-disabled="true"]
  ):hover::before {
    background-color: var(--_accent-hover-color);
  }
}

.dads-radio__input[aria-invalid="true"] {
  --_accent-color: var(--color-semantic-error-1);
  --_accent-hover-color: var(--color-primitive-red-1000);
  --_border-color: var(--color-semantic-error-1);
  --_border-hover-color: var(--color-primitive-red-1000);
}

.dads-radio__input:is(:disabled, [aria-disabled="true"]) {
  --_base-color: var(--color-neutral-solid-gray-50);
  --_accent-color: var(--color-neutral-solid-gray-300);
  --_accent-hover-color: var(--color-neutral-solid-gray-300);
  --_border-color: var(--color-neutral-solid-gray-300);
  --_border-hover-color: var(--color-neutral-solid-gray-300);
}

@media (forced-colors: active) {
  .dads-radio__input,
  .dads-radio__input[aria-invalid="true"] {
    --_accent-color: Highlight;
    --_accent-hover-color: Highlight;
    --_border-color: ButtonText;
    --_border-hover-color: ButtonText;
  }

  .dads-radio__input:is(:disabled, [aria-disabled="true"]) {
    --_accent-color: GrayText;
    --_accent-hover-color: GrayText;
    --_border-color: GrayText;
    --_border-hover-color: GrayText;
  }
}

.dads-radio__label {
  padding-top: var(--_label-padding-top);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: var(--_label-font-size);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
}
```

### ResourceList CSS values

#### `src/components/resource-list/resource-list.css`

```css
.dads-resource-list {
  display: flex;
  align-items: center;
  background: var(--color-neutral-white);
  color: var(--color-neutral-solid-gray-800);
  font-family: var(--font-family-sans);
  overflow-wrap: anywhere;

  --_border-color: var(--color-neutral-solid-gray-420);
  --_padding-block: calc(16 / 16 * 1rem);
  --_padding-inline: calc(16 / 16 * 1rem);
}

.dads-resource-list[data-style="list"] {
  border: 1px solid transparent;
  border-bottom-color: var(--_border-color);
}

.dads-resource-list[data-style="frame"] {
  border-radius: calc(16 / 16 * 1rem);
  border: 1px solid var(--_border-color);
}

.dads-resource-list:has(:checked:enabled) {
  background: var(--color-key-50);
  --_border-color: var(--color-neutral-solid-gray-500);
}

.dads-resource-list[data-interaction="whole"]:has(:disabled) {
  background: var(--color-neutral-solid-gray-50);
  color: var(--color-neutral-solid-gray-420);
}

.dads-resource-list[data-style="list"]:has(:disabled) {
  border-bottom-color: var(--color-neutral-solid-gray-300);
}

.dads-resource-list[data-style="frame"]:has(:disabled) {
  border-color: var(--color-neutral-solid-gray-300);
}

.dads-resource-list__body {
  position: relative;
  z-index: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: calc(16 / 16 * 1rem);
  outline-offset: calc(-1 / 16 * 1rem);
  border-radius: inherit;
  padding: var(--_padding-block) var(--_padding-inline);
  color: inherit;
  text-decoration: none;
}

.dads-resource-list__body:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

@media (hover: hover) {
  .dads-resource-list__body:any-link:hover,
  .dads-resource-list[data-interaction="whole"]
    .dads-resource-list__body:has(:enabled):hover:not(:focus-visible) {
    outline: calc(2 / 16 * 1rem) solid var(--color-neutral-black);
    background: var(--color-neutral-solid-gray-50);
  }
}

.dads-resource-list__body:any-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-resource-list__body > * {
  flex-shrink: 0;
}

.dads-resource-list__body .dads-checkbox,
.dads-resource-list__body .dads-radio {
  align-self: stretch;
  margin: calc(-1 * var(--_padding-block)) calc(-1 * var(--_padding-block));
  margin-right: 0;
  padding: var(--_padding-block) var(--_padding-inline);
  padding-right: 0;
  align-items: center;
}

.dads-resource-list__contents {
  width: 0;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  gap: calc(4 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  letter-spacing: 0;
}

.dads-resource-list__contents > * {
  max-width: 100%;
}

.dads-resource-list__label {
  order: -1;
}

.dads-resource-list__label > * {
  margin: 0;
}

.dads-resource-list__title {
  margin: 0;
  color: var(--color-neutral-solid-gray-900);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}
.dads-resource-list[data-interaction="whole"]:has(:disabled)
  .dads-resource-list__title {
  color: inherit;
}

.dads-resource-list__body:any-link .dads-resource-list__title,
.dads-resource-list__title a {
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-resource-list__title a,
.dads-resource-list__title label {
  isolation: isolate;
  margin-top: calc(-8 / 16 * 1rem);
  margin-bottom: calc(-8 / 16 * 1rem);
  display: block;
  padding-top: calc(8 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-resource-list[data-interaction="whole"]
  .dads-resource-list__title
  label::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  content: "";
}

@media (hover: hover) {
  .dads-resource-list__body:any-link:hover .dads-resource-list__title,
  .dads-resource-list__title a:hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-resource-list__body:any-link:active .dads-resource-list__title,
.dads-resource-list__title a:active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-resource-list__title a:focus-visible {
  margin-top: 0;
  margin-bottom: 0;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  padding-top: 0;
  padding-bottom: 0;
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-resource-list__support > * {
  margin: 0;
}

.dads-resource-list__sub {
  flex-shrink: 0;
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  letter-spacing: 0;
}

.dads-resource-list__sub > * {
  margin: 0;
}

.dads-resource-list__action {
  flex-shrink: 0;
  align-self: stretch;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

.dads-resource-list__action-button {
  width: calc(44 / 16 * 1rem);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: inherit;
  background: transparent;
  padding: 0;
  color: inherit;
}

@media (hover: hover) {
  .dads-resource-list__action-button:enabled:hover {
    outline: calc(2 / 16 * 1rem) solid var(--color-neutral-black);
    outline-offset: calc(-1 / 16 * 1rem);
    background: var(--color-neutral-solid-gray-50);
  }
}

.dads-resource-list__action-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-3 / 16 * 1rem);
  background: var(--color-primitive-yellow-300);
  box-shadow: none;
}
```

### SearchBox CSS values

#### `src/components/search-box/search-box.css`

```css
.dads-search-box {
  display: grid;
  grid-template-areas: "fields submit" "detail detail";
  grid-template-columns: 1fr auto;
  column-gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-search-box__fields {
  position: relative;
  z-index: 0;
  display: flex;
  grid-area: fields;
}

.dads-search-box__select {
  position: relative;
  display: flex;
  flex-shrink: 0;
}

.dads-search-box__select > span {
  position: absolute;
  top: calc(50% - 1.25rem);
  left: calc(17 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-700);
  pointer-events: none;
  z-index: 2;
}

.dads-search-box__select > select {
  appearance: none;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: calc(160 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem) 0 0 calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-solid-gray-50);
  padding-top: calc(20 / 16 * 1rem);
  padding-right: calc(40 / 16 * 1rem);
  padding-bottom: 0;
  padding-left: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font: inherit;
  font-size: calc(17 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@supports (appearance: base-select) {
  .dads-search-box__select > select {
    appearance: base-select;
  }

  .dads-search-box__select > select::picker-icon {
    display: none;
  }

  .dads-search-box__select > select::picker(select) {
    appearance: base-select;
    border: 1px solid var(--color-neutral-solid-gray-420);
    box-shadow: var(--elevation-1);
    padding: calc(16 / 16 * 1rem) 0;
  }
}

.dads-search-box__select > svg {
  position: absolute;
  top: 0;
  right: calc(16 / 16 * 1rem);
  bottom: 0;
  z-index: 1;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  align-items: center;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  pointer-events: none;
}

.dads-search-box__select > select:focus-visible {
  position: relative;
  z-index: 1;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-search-box__select > select:hover {
    border-color: var(--color-neutral-black);
  }
}

.dads-search-box__select option {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: calc(44 / 16 * 1rem);
  padding: calc(10 / 16 * 1rem) calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
}

.dads-search-box__select option::checkmark {
  display: none;
}

@media (hover: hover) {
  .dads-search-box__select option:hover {
    background-color: var(--color-neutral-solid-gray-50);
    text-decoration: underline;
    text-decoration-thickness: calc(1 / 16 * 1rem);
    text-underline-offset: calc(3 / 16 * 1rem);
  }
}

.dads-search-box__select option:checked {
  font-weight: bold;
  background-color: var(--color-key-100);
  color: var(--color-key-1000);
}

@media (hover: hover) {
  .dads-search-box__select option:checked:hover {
    background-color: var(--color-key-50);
    color: var(--color-key-900);
  }
}

.dads-search-box__select option:focus-visible {
  border-radius: 0;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(-4 / 16 * 1rem);
  box-shadow: none;
}

.dads-search-box__select option:not(:checked):focus-visible {
  background-color: var(--color-primitive-yellow-300);
}

.dads-search-box__select option:checked:focus-visible {
  box-shadow: inset 0 0 0 calc(6 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-search-box__input {
  flex-grow: 1;
  position: relative;
  display: flex;
}

.dads-search-box__input > svg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(16 / 16 * 1rem);
  z-index: 1;
  margin: auto 0;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-600);
  pointer-events: none;
}

@media (forced-colors: active) {
  .dads-search-box__input > svg {
    color: CanvasText;
  }
}

.dads-search-box__input > input {
  flex-grow: 1;
  box-sizing: border-box;
  width: 8rem;
  border: 1px solid var(--color-neutral-solid-gray-600);
  border-radius: calc(8 / 16 * 1rem);
  background-color: var(--color-neutral-white);
  padding-top: calc(12 / 16 * 1rem);
  padding-right: calc(16 / 16 * 1rem);
  padding-bottom: calc(12 / 16 * 1rem);
  padding-left: calc(48 / 16 * 1rem);
  color: inherit;
  font: inherit;
}

.dads-search-box__input:not(:first-child) > input {
  margin-left: calc(-1 / 16 * 1rem);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

@media (hover: hover) {
  .dads-search-box__input > input:hover {
    border-color: var(--color-neutral-black);
  }
}

.dads-search-box__input > input::-webkit-search-cancel-button {
  display: none;
}

.dads-search-box__input > input::placeholder {
  color: var(--color-neutral-solid-gray-600);
}

.dads-search-box__input > input:focus-visible {
  position: relative;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-search-box__detail {
  margin-top: calc(16 / 16 * 1rem);
  grid-area: detail;
  width: fit-content;
  border: 1px solid var(--color-neutral-solid-gray-600);
  border-radius: calc(8 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-search-box__detail[open] {
  width: auto;
  padding-bottom: calc(24 / 16 * 1rem);
}

.dads-search-box__detail .dads-disclosure__summary {
  margin: calc(-12 / 16 * 1rem) calc(-16 / 16 * 1rem);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
}

.dads-search-box__detail .dads-disclosure__content {
  margin: calc(32 / 16 * 1rem) 0 0;
  padding-left: 0;
}

.dads-search-box__detail-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(16 / 16 * 1rem);
}

.dads-search-box__detail-actions .dads-button[data-type="solid-fill"] {
  width: 100%;
  cursor: pointer;
}

@media (min-width: 48rem) {
  .dads-search-box__detail-actions .dads-button[data-type="solid-fill"] {
    width: fit-content;
    min-width: 50%;
  }
}

.dads-search-box > .dads-button {
  grid-area: submit;
  cursor: pointer;
}

.dads-search-box__detail[open] + .dads-button {
  visibility: hidden;
}

.dads-search-box[data-size="md"] .dads-search-box__select > span {
  top: calc(50% - 1.125rem);
}

.dads-search-box[data-size="md"] .dads-search-box__select > select {
  padding-top: calc(18 / 16 * 1rem);
}

.dads-search-box[data-size="md"] .dads-search-box__input > input {
  padding-top: calc(11 / 16 * 1rem);
  padding-bottom: calc(11 / 16 * 1rem);
}

.dads-search-box[data-size="sm"] .dads-search-box__select > span {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.dads-search-box[data-size="sm"] .dads-search-box__select > select {
  padding-top: 0;
}

.dads-search-box[data-size="sm"] .dads-search-box__input > input {
  padding-top: calc(7 / 16 * 1rem);
  padding-bottom: calc(7 / 16 * 1rem);
}
```

### Select CSS values

#### `src/components/select/select.css`

```css
.dads-select {
  display: block;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-select__control {
  position: relative;
  display: block;
  width: fit-content;
}

.dads-select__select {
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: calc(8 / 16 * 1rem);
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white);
  padding-right: calc(40 / 16 * 1rem);
  padding-left: calc(16 / 16 * 1rem);
  color: inherit;
  font: inherit;
  line-height: 1;
  letter-spacing: inherit;
  appearance: none;
}

.dads-select__select[data-size="sm"] {
  height: calc(40 / 16 * 1rem);
}

.dads-select__select[data-size="md"] {
  height: calc(48 / 16 * 1rem);
}

.dads-select__select[data-size="lg"] {
  height: calc(56 / 16 * 1rem);
}

.dads-select__select:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-select__select:hover {
    border-color: var(--color-neutral-black);
  }
}

.dads-select__select:is(:user-invalid, [aria-invalid="true"]) {
  border-color: var(--color-semantic-error-1);
}

@media (hover: hover) {
  .dads-select__select:is(:user-invalid, [aria-invalid="true"]):hover {
    border-color: var(--color-primitive-red-1000);
  }
}

.dads-select__select:is(:disabled, [aria-disabled="true"]),
.dads-select__select:is(:disabled, [aria-disabled="true"]):hover {
  border: 1px solid var(--color-neutral-solid-gray-300);
  background-color: var(--color-neutral-solid-gray-50);
  color: var(--color-neutral-solid-gray-420);
}

@media (forced-colors: active) {
  .dads-select__select {
    color: ButtonText;
    border-color: ButtonText;
  }

  .dads-select__select[aria-disabled="true"],
  .dads-select__select[aria-disabled="true"]:hover {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-select__chevron {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: calc(16 / 16 * 1rem);
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
}

.dads-select__select:disabled + .dads-select__chevron {
  color: var(--color-neutral-solid-gray-420);
}

@media (forced-colors: active) {
  .dads-select__chevron {
    color: ButtonText;
  }

  .dads-select__select:disabled + .dads-select__chevron {
    color: GrayText;
  }
}

.dads-select__error-text {
  margin: calc(8 / 16 * 1rem) 0 0 0;
  display: block;
  color: var(--color-semantic-error-1);
}
```

### StepNavigation CSS values

#### `src/components/step-navigation/step-navigation.css`

```css
.dads-step-navigation {
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  font-family: var(--font-family-sans);
  line-height: 1.7;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-step-navigation[data-size="normal"] {
  --_number-size: calc(44 / 16 * 1rem);
  --_number-margin: calc(4 / 16 * 1rem);
  --_outline-width: calc(2 / 16 * 1rem);
  --_title-margin: calc(24 / 16 * 1rem);
  --_description-margin: calc(8 / 16 * 1rem);
}

.dads-step-navigation[data-size="small"] {
  --_number-size: calc(32 / 16 * 1rem);
  --_number-margin: calc(3 / 16 * 1rem);
  --_outline-width: calc(1 / 16 * 1rem);
  --_title-margin: calc(16 / 16 * 1rem);
  --_description-margin: calc(4 / 16 * 1rem);
}

.dads-step-navigation > ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dads-step-navigation__step {
  position: relative;
  box-sizing: border-box;
}

.dads-step-navigation__step::before,
.dads-step-navigation__step::after {
  position: absolute;
  z-index: -1;
  content: "";
}

.dads-step-navigation__step[data-first]::before {
  display: none;
}

.dads-step-navigation__step[data-last]::after {
  display: none;
}

.dads-step-navigation__header {
  display: block;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  text-wrap: pretty;
}

.dads-step-navigation__header:any-link,
.dads-step-navigation__header:enabled {
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-step-navigation__header:any-link:hover,
  .dads-step-navigation__header:enabled:hover {
    text-decoration-thickness: calc(3 / 16 * 1rem);
    cursor: pointer;
  }
}

.dads-step-navigation__header:focus-visible {
  border-radius: 0;
  outline: 0;
  box-shadow: none;
}

.dads-step-navigation__number {
  position: relative;
  display: grid;
  place-content: center;
  margin: calc(4 / 16 * 1rem);
  box-sizing: border-box;
  width: fit-content;
  height: var(--_number-size);
  min-width: var(--_number-size);
  border: 2px solid;
  border-radius: 50%;
  background-color: var(--color-neutral-white);
  padding: 0 calc(2 / 16 * 1rem) calc(2 / 16 * 1rem);
  font-weight: bold;
  font-size: calc(20 / 16 * 1rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-decoration: inherit;
  text-decoration-thickness: inherit;
}

.dads-step-navigation[data-size="small"] .dads-step-navigation__number {
  margin: calc(3 / 16 * 1rem);
  border-width: 1px;
  font-size: calc(16 / 16 * 1rem);
}

.dads-step-navigation__step[data-state="reached"]
  .dads-step-navigation__number {
  background-color: var(--color-neutral-solid-gray-800);
  color: var(--color-neutral-white);
  border-color: var(--color-neutral-solid-gray-800);
}

.dads-step-navigation__step[data-state="completed"]
  .dads-step-navigation__number {
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-step-navigation__step[data-state="error"] .dads-step-navigation__number {
  color: var(--color-semantic-error-1);
}

.dads-step-navigation__step[data-state="skipped"]
  .dads-step-navigation__number {
  border-width: 1px;
  border-style: dashed;
}

.dads-step-navigation__step[aria-current] .dads-step-navigation__number {
  outline: var(--_outline-width) solid var(--color-neutral-solid-gray-800);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-neutral-white);
}

@media (forced-colors: active) {
  .dads-step-navigation__step[data-state="reached"]
    .dads-step-navigation__number {
    background-color: CanvasText;
    color: Canvas;
    forced-color-adjust: none;
  }

  .dads-step-navigation__step[data-state="completed"]
    .dads-step-navigation__state-icon
    circle {
    fill: CanvasText;
  }

  .dads-step-navigation__step[data-state="completed"]
    .dads-step-navigation__state-icon
    path {
    fill: Canvas;
  }

  .dads-step-navigation__step[data-state="editing"]
    .dads-step-navigation__state-icon
    path {
    fill: CanvasText;
  }

  .dads-step-navigation__step[data-state="error"]
    .dads-step-navigation__state-icon
    path {
    fill: CanvasText;
  }
}

@media (hover: hover) {
  .dads-step-navigation__header:any-link:hover .dads-step-navigation__number,
  .dads-step-navigation__header:enabled:hover .dads-step-navigation__number {
    outline: 1px solid;
  }

  .dads-step-navigation__step[data-state="reached"]
    :is(
      .dads-step-navigation__header:any-link,
      .dads-step-navigation__header:enabled
    ):hover
    .dads-step-navigation__number {
    outline-color: var(--color-neutral-solid-gray-800);
  }

  .dads-step-navigation__step[data-state="skipped"]
    :is(
      .dads-step-navigation__header:any-link,
      .dads-step-navigation__header:enabled
    ):hover
    .dads-step-navigation__number {
    outline: none;
    border-width: 2px;
  }
}

.dads-step-navigation__header:focus-visible .dads-step-navigation__number {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-step-navigation__state-icon {
  position: absolute;
  top: calc(-10 / 16 * 1rem);
  left: calc(50% + calc(6 / 16 * 1rem));
  border-radius: 50%;
  background-color: var(--color-neutral-white);
}

.dads-step-navigation[data-size="small"] .dads-step-navigation__state-icon {
  top: calc(-9 / 16 * 1rem);
  left: calc(50% + calc(4 / 16 * 1rem));
}

.dads-step-navigation__state-icon > svg {
  display: block;
  max-width: none;
}

.dads-step-navigation[data-size="small"]
  .dads-step-navigation__state-icon
  > svg {
  width: calc(20 / 16 * 1rem);
  height: calc(20 / 16 * 1rem);
}

.dads-step-navigation__state-label {
  position: absolute;
  inset: calc(100% + calc(8 / 16 * 1rem)) -100% 0;
  margin: 0 auto;
  width: 4em;
  height: 1.2em;
  background-color: var(--color-neutral-white);
  font-weight: normal;
  font-size: calc(14 / 16 * 1rem);
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
}

.dads-step-navigation__title {
  display: block;
  font-weight: bold;
  font-size: calc(18 / 16 * 1rem);
  line-height: 1.6;
  letter-spacing: 0.02em;
  text-decoration-thickness: inherit;
}

.dads-step-navigation[data-size="small"] .dads-step-navigation__title {
  font-weight: bold;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

.dads-step-navigation__description {
  margin: var(--_description-margin) 0 0;
}

/* Orientations */

.dads-step-navigation[data-orientation="horizontal"] {
  overflow-x: auto;
  padding-top: calc(6 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
}

.dads-step-navigation[data-orientation="horizontal"] > ul {
  display: flex;
}

.dads-step-navigation[data-orientation="vertical"] > ul {
  display: flex;
  flex-direction: column;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__step {
  width: calc(var(--_step-width, 320) / 16 * 1rem);
  min-width: calc(var(--_step-min-width, 160) / 16 * 1rem);
  padding: 0 calc(16 / 16 * 1rem);
}

.dads-step-navigation[data-orientation="vertical"] .dads-step-navigation__step {
  flex: 1;
  padding-bottom: calc(24 / 16 * 1rem);
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__step:last-child {
  padding-bottom: 0;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__step::before {
  top: calc(var(--_number-size) / 2 + var(--_number-margin));
  right: 50%;
  width: 50%;
  border-bottom: 1px solid;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__step::after {
  top: calc(var(--_number-size) / 2 + var(--_number-margin));
  left: 50%;
  width: 50%;
  border-bottom: 1px solid;
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__step::before {
  left: calc(var(--_number-size) / 2 + var(--_number-margin));
  top: 0;
  height: calc(32 / 16 * 1rem);
  border-right: 1px solid;
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__step::after {
  left: calc(var(--_number-size) / 2 + var(--_number-margin));
  bottom: 0;
  height: calc(100% - calc(32 / 16 * 1rem));
  border-right: 1px solid;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__header {
  width: 100%;
  text-align: center;
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__header {
  position: relative;
  display: flex;
  align-items: baseline;
  column-gap: calc(16 / 16 * 1rem);
  text-align: left;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__number {
  margin-right: auto;
  margin-left: auto;
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__number {
  flex-shrink: 0;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__title {
  margin-top: var(--_title-margin);
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__title {
  padding: calc(var(--_number-size) / 2 + var(--_number-margin) - 0.875rem) 0;
}

.dads-step-navigation[data-orientation="horizontal"]
  .dads-step-navigation__description {
  text-align: center;
}

.dads-step-navigation[data-orientation="vertical"]
  .dads-step-navigation__description {
  margin-top: calc(
    var(--_description-margin) -
    (var(--_number-size) / 2 + var(--_number-margin) - 0.875rem)
  );
  padding-left: calc(
    var(--_number-size) +
    var(--_number-margin) +
    var(--_number-margin) +
    calc(16 / 16 * 1rem)
  );
}
```

### Switch CSS values

#### `src/components/switch/switch-mode.css`

```css
.dads-switch-mode {
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-switch-mode__option {
  position: relative;
  display: flex;
  align-self: stretch;
  align-items: center;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-align: inherit;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}

/* For expanding the clickable area */
.dads-switch-mode__option::before {
  position: absolute;
  inset: calc(-8 / 16 * 1rem) 0;
  content: "";
}

/* For the focus indicator */
.dads-switch-mode__option::after {
  position: absolute;
  inset: 0;
  content: "";
}

.dads-switch-mode__option:first-of-type::before,
.dads-switch-mode__option:first-of-type::after {
  right: calc(-1 * (60 + 16) / 16 * 1rem);
}

.dads-switch-mode__option:last-of-type::before,
.dads-switch-mode__option:last-of-type::after {
  left: calc(-1 * (60 + 16) / 16 * 1rem);
}

.dads-switch-mode__option[aria-checked="true"] {
  z-index: -1;
}

.dads-switch-mode__option:focus-visible {
  outline: none;
  box-shadow: none;
}

.dads-switch-mode__option:focus-visible::after {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  border-radius: calc(9999 / 16 * 1rem);
}

.dads-switch-mode__control {
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: calc(60 / 16 * 1rem);
  border-radius: calc(9999 / 16 * 1rem);
  padding: calc(6 / 16 * 1rem);
  pointer-events: none;
}

@media (hover: hover) {
  .dads-switch-mode:hover .dads-switch-mode__control {
    box-shadow: 0 0 0 calc(4 / 16 * 1rem) var(--color-neutral-solid-gray-420);
  }

  .dads-switch-mode:active .dads-switch-mode__control {
    box-shadow: 0 0 0 calc(6 / 16 * 1rem) var(--color-neutral-solid-gray-600);
  }
}

.dads-switch-mode__rail {
  box-sizing: border-box;
  display: block;
  height: calc(16 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  background-color: var(--color-primitive-blue-100);
  border: 2px solid var(--color-primitive-blue-900);
}

@media (hover: hover) {
  .dads-switch-mode:hover .dads-switch-mode__rail {
    border-color: var(--color-primitive-blue-1100);
  }
}

.dads-switch-mode__thumb {
  position: absolute;
  inset: -100% auto -100% 0;
  margin-top: auto;
  margin-bottom: auto;
  box-sizing: content-box;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  border-radius: 50%;
  border: 2px solid var(--color-neutral-white);
  background-color: var(--color-primitive-blue-900);
}

.dads-switch-mode:has(:last-of-type[aria-checked="true"])
  .dads-switch-mode__thumb {
  left: calc(32 / 16 * 1rem);
}

@media (hover: hover) {
  .dads-switch-mode:hover .dads-switch-mode__thumb {
    background-color: var(--color-primitive-blue-1100);
  }
}

.dads-switch-mode:has(:disabled, [aria-disabled="true"]) {
  color: var(--color-neutral-solid-gray-300);
}

.dads-switch-mode:has(:disabled, [aria-disabled="true"])
  .dads-switch-mode__control {
  box-shadow: none;
}

.dads-switch-mode__option[aria-disabled="true"]:focus-visible::before {
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-switch-mode:has(:disabled, [aria-disabled="true"])
  .dads-switch-mode__rail {
  border-color: var(--color-neutral-solid-gray-300);
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-switch-mode:has(:disabled, [aria-disabled="true"])
  .dads-switch-mode__thumb {
  background-color: var(--color-neutral-solid-gray-300);
}

@media (forced-colors: active) {
  .dads-switch-mode:has(:disabled) {
    color: GrayText;
  }

  .dads-switch-mode:has([aria-disabled="true"]) {
    color: GrayText;
  }

  .dads-switch-mode__option:focus-visible::after {
    outline-color: Highlight;
  }

  .dads-switch-mode__rail,
  .dads-switch-mode:hover .dads-switch-mode__rail {
    border-color: ButtonText;
  }

  .dads-switch-mode__thumb,
  .dads-switch-mode:hover .dads-switch-mode__thumb {
    background-color: ButtonText;
    border-color: Canvas;
  }

  .dads-switch-mode:has(:disabled) .dads-switch-mode__thumb,
  .dads-switch-mode:has([aria-disabled="true"]) .dads-switch-mode__thumb {
    background-color: GrayText;
  }
}
```

#### `src/components/switch/switch-on-off.css`

```css
.dads-switch-on-off {
  display: inline-flex;
  align-items: center;
}

.dads-switch-on-off__button {
  --switch-on-off-track-bg-color: var(--color-neutral-white);
  --switch-on-off-track-border-color: var(--color-neutral-solid-gray-600);
  --switch-on-off-track-shadow: none;
  --switch-on-off-thumb-color: var(--color-neutral-solid-gray-800);
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}

.dads-switch-on-off__button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  border-radius: calc(9999 / 16 * 1rem);
}

/* For expanding the clickable area */
.dads-switch-on-off__button::before {
  position: absolute;
  inset: calc(-4 / 16 * 1rem) 0;
  content: "";
}

.dads-switch-on-off__track {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: calc(56 / 16 * 1rem);
  border-radius: calc(9999 / 16 * 1rem);
  border: 2px solid var(--switch-on-off-track-border-color);
  background-color: var(--switch-on-off-track-bg-color);
  box-shadow: var(--switch-on-off-track-shadow);
  padding: calc(4 / 16 * 1rem);
}

.dads-switch-on-off__thumb {
  display: block;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  border-radius: 50%;
  background-color: var(--switch-on-off-thumb-color);
}

.dads-switch-on-off__icon {
  display: none;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
  flex-shrink: 0;
  color: var(--color-neutral-white);
}

/* Checked */

.dads-switch-on-off__button[aria-checked="true"] {
  --switch-on-off-track-bg-color: var(--color-key-50);
  --switch-on-off-track-border-color: var(--color-key-900);
  --switch-on-off-thumb-color: var(--color-key-900);
}

.dads-switch-on-off__button[aria-checked="true"] .dads-switch-on-off__thumb {
  margin-left: auto;
}

.dads-switch-on-off__button[aria-checked="true"] .dads-switch-on-off__icon {
  display: block;
}

/* Hover, Active */

@media (hover: hover) {
  .dads-switch-on-off__button:hover {
    --switch-on-off-track-border-color: var(--color-neutral-black);
    --switch-on-off-track-shadow: 0 0 0 calc(4 / 16 * 1rem)
      var(--color-neutral-solid-gray-420);
    --switch-on-off-thumb-color: var(--color-neutral-black);
  }

  /* :where() keeps the specificity low so that Disabled can override it */
  .dads-switch-on-off__button:where([aria-checked="true"]):hover {
    --switch-on-off-track-border-color: var(--color-key-1100);
    --switch-on-off-thumb-color: var(--color-key-1100);
  }

  .dads-switch-on-off__button:active {
    --switch-on-off-track-shadow: 0 0 0 calc(6 / 16 * 1rem)
      var(--color-neutral-solid-gray-600);
  }
}

/* Disabled */

.dads-switch-on-off__button:is(:disabled, [aria-disabled="true"]) {
  --switch-on-off-track-bg-color: var(--color-neutral-solid-gray-50);
  --switch-on-off-track-border-color: var(--color-neutral-solid-gray-300);
  --switch-on-off-track-shadow: none;
  --switch-on-off-thumb-color: var(--color-neutral-solid-gray-300);
}

/* Forced colors */

@media (forced-colors: active) {
  .dads-switch-on-off__track {
    border-color: ButtonText;
  }

  .dads-switch-on-off__thumb {
    background-color: ButtonText;
  }

  .dads-switch-on-off__icon {
    color: Canvas;
  }

  .dads-switch-on-off__button[aria-checked="true"] .dads-switch-on-off__track {
    border-color: Highlight;
  }

  .dads-switch-on-off__button[aria-checked="true"] .dads-switch-on-off__thumb {
    background-color: Highlight;
  }

  .dads-switch-on-off__button:is(:disabled, [aria-disabled="true"])
    .dads-switch-on-off__track {
    border-color: GrayText;
  }

  .dads-switch-on-off__button:is(:disabled, [aria-disabled="true"])
    .dads-switch-on-off__thumb {
    background-color: GrayText;
  }
}
```

### Tab CSS values

#### `src/components/tab/tab.css`

```css
.dads-tab {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.dads-tab__list {
  position: relative;
  z-index: 0;
  margin: calc(-6 / 16 * 1rem);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding-top: calc((6 + 1) / 16 * 1rem);
  padding-right: calc(6 / 16 * 1rem);
  padding-bottom: calc(6 / 16 * 1rem);
  padding-left: calc((6 + 1) / 16 * 1rem);
  list-style: none;
}

.dads-tab__list > li {
  margin: 0;
  display: contents;
}

.dads-tab__list::after {
  position: relative;
  flex-grow: 1;
  border: 0 solid var(--color-neutral-solid-gray-420);
  content: "";
}

.dads-tab__tab,
.dads-tab__tab:any-link {
  isolation: isolate;
  appearance: none;
  margin: -1px 0 0 -1px;
  display: flex;
  border: 1px solid var(--color-neutral-solid-gray-420);
  background: var(--color-neutral-white);
  padding: 0;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-align: left;
  text-decoration: none;
}

.dads-tab__tab[role="tab"] {
  cursor: default;
}

.dads-tab__tab:focus-visible {
  overflow: hidden;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
  z-index: 1;
}

.dads-tab__tab > span {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  border: 0 solid var(--color-neutral-solid-gray-50);
  padding: calc(16 / 16 * 1rem);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.2;
  letter-spacing: 0;
}

.dads-tab__tab > span::before {
  content: "";
  position: absolute;
}

.dads-tab__tab:is([aria-selected="true"], [aria-current]) > span {
  font-weight: bold;
}

/* パネル間ボーダーを消去 */
.dads-tab__tab:is([aria-selected="true"], [aria-current]):not(
  :focus-visible
)::before {
  position: absolute;
  border: 0 solid var(--color-neutral-white);
  content: "";
}

.dads-tab__tab:is([aria-selected="true"], [aria-current]) > span::before {
  background-color: var(--color-key-900);
}

.dads-tab__panels {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.dads-tab__panel {
  border: solid var(--color-neutral-solid-gray-420);
  background: var(--color-neutral-white);
  padding: calc(16 / 16 * 1rem);
}

.dads-tab__panel:focus-visible {
  z-index: 1;
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

/* position: top (default) */

.dads-tab:is(:not([data-position]), [data-position="top"])
.dads-tab__list::after {
  margin-left: -1px;
  width: 1px;
  border-bottom-width: 1px;
}

.dads-tab:is(:not([data-position]), [data-position="top"])
  .dads-tab__tab::before {
  bottom: calc(6 / 16 * 1rem);
  width: 100%;
  border-bottom-width: 1px;
}

.dads-tab:is(:not([data-position]), [data-position="top"])
  .dads-tab__tab
  > span {
  border-top-width: 5px;
}

.dads-tab:is(:not([data-position]), [data-position="top"])
  .dads-tab__tab
  > span::before {
  top: -6px;
  right: 0;
  left: 0;
  height: calc(6 / 16 * 1rem);
}

.dads-tab:is(:not([data-position]), [data-position="top"]) .dads-tab__panel {
  border-width: 0 1px 1px 1px;
}

/* position: bottom */

.dads-tab[data-position="bottom"] .dads-tab__list {
  flex-wrap: wrap-reverse;
}

.dads-tab[data-position="bottom"] .dads-tab__list::after {
  margin-top: -1px;
  margin-left: -1px;
  width: 1px;
  border-top-width: 1px;
}

.dads-tab[data-position="bottom"] .dads-tab__tab::before {
  top: calc(6 / 16 * 1rem);
  width: 100%;
  border-bottom-width: 1px;
}

.dads-tab[data-position="bottom"] .dads-tab__tab > span {
  border-bottom-width: 5px;
}

.dads-tab[data-position="bottom"] .dads-tab__tab > span::before {
  right: 0;
  bottom: -6px;
  left: 0;
  height: calc(6 / 16 * 1rem);
}

.dads-tab[data-position="bottom"] .dads-tab__panel {
  border-width: 1px 1px 0 1px;
}

/* position: left */

.dads-tab[data-position="left"] {
  flex-direction: row;
}

.dads-tab[data-position="left"] .dads-tab__list {
  flex-direction: column;
  flex-shrink: 0;
}

.dads-tab[data-position="left"] .dads-tab__list::after {
  margin-top: -1px;
  height: 1px;
  border-right-width: 1px;
}

.dads-tab[data-position="left"] .dads-tab__tab::before {
  right: calc(6 / 16 * 1rem);
  border-right-width: 1px;
  height: 100%;
}

.dads-tab[data-position="left"] .dads-tab__tab > span {
  border-left-width: 5px;
}

.dads-tab[data-position="left"] .dads-tab__tab > span::before {
  top: 0;
  bottom: 0;
  left: -6px;
  width: calc(6 / 16 * 1rem);
}

.dads-tab[data-position="left"] .dads-tab__panels {
  min-width: 0;
}

.dads-tab[data-position="left"] .dads-tab__panel {
  flex-grow: 1;
  border-width: 1px 1px 1px 0;
}

/* position: right */

.dads-tab[data-position="right"] {
  flex-direction: row-reverse;
}

.dads-tab[data-position="right"] .dads-tab__list {
  flex-direction: column;
  flex-shrink: 0;
}

.dads-tab[data-position="right"] .dads-tab__list::after {
  margin-top: -1px;
  margin-left: -1px;
  height: 1px;
  border-left-width: 1px;
}

.dads-tab[data-position="right"] .dads-tab__tab::before {
  left: calc(6 / 16 * 1rem);
  border-left-width: 1px;
  height: 100%;
}

.dads-tab[data-position="right"] .dads-tab__tab > span {
  border-right-width: 5px;
}

.dads-tab[data-position="right"] .dads-tab__tab > span::before {
  top: 0;
  right: -6px;
  bottom: 0;
  width: calc(6 / 16 * 1rem);
}

.dads-tab[data-position="right"] .dads-tab__panels {
  min-width: 0;
}

.dads-tab[data-position="right"] .dads-tab__panel {
  flex-grow: 1;
  border-width: 1px 0 1px 1px;
}

@media (hover: hover) {
  .dads-tab__tab:not([aria-selected="true"]):not([aria-current]):hover {
    background-color: var(--color-neutral-solid-gray-50);
  }

  .dads-tab__tab:not([aria-selected="true"]):not([aria-current]):hover > span {
    text-decoration: underline;
    text-underline-offset: calc(3 / 16 * 1rem);
    text-decoration-thickness: calc(1 / 16 * 1rem);
  }

  .dads-tab__tab:not([aria-selected="true"]):not([aria-current]):hover
    > span::before {
    background-color: var(--color-neutral-solid-gray-420);
  }
}

@media (forced-colors: active) {
  .dads-tab__tab:is([aria-selected="true"], [aria-current]):not(
    :focus-visible
  )::before {
    border-color: Canvas;
  }

  .dads-tab__tab > span {
    border-color: Canvas;
  }

  .dads-tab__tab:is([aria-selected="true"], [aria-current]) > span::before,
  .dads-tab__tab:is([aria-selected="true"], [aria-current]):hover
    > span::before {
    background-color: ButtonText;
  }
}
```

### Table CSS values

#### `src/components/table/table.css`

```css
.dads-table {
  --_border-color: var(--color-neutral-solid-gray-420);
  --_padding: calc(20 / 16 * 1rem) calc(16 / 16 * 1rem);
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-table[data-size="dense"] {
  --_padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  line-height: 1.3;
}

.dads-table__caption {
  font-weight: bold;
  font-size: calc(17 / 16 * 1rem);
}

.dads-table__table {
  border-collapse: collapse;
}

.dads-table__table :is(td, th) {
  padding: var(--_padding);
  text-align: left;
  vertical-align: baseline;
}

.dads-table__table th {
  font-weight: bold;
}

.dads-table__col-header {
  --_border-color: var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-solid-gray-100);
  color: var(--color-neutral-solid-gray-900);
}

.dads-table__row-header {
  --_border-color: var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-solid-gray-100);
  color: var(--color-neutral-solid-gray-900);
}

/* Stripe */

.dads-table[data-row-stripe] {
  --_border-color: var(--color-neutral-solid-gray-500);
}

.dads-table[data-row-stripe] tr:nth-child(even) {
  background-color: var(--color-neutral-solid-gray-50);
}

/* Hover highlight */

.dads-table[data-row-hover-highlight] {
  --_border-color: var(--color-neutral-solid-gray-500);
}

@media (hover: hover) {
  .dads-table[data-row-hover-highlight] tr:hover {
    background-color: var(--color-key-50);
  }
}

/* With checkbox */

.dads-table[data-selectable] {
  --_border-color: var(--color-neutral-solid-gray-500);
}

.dads-table[data-selectable] tr:has(:checked) :where(td, th) {
  background:
    linear-gradient(#fff, #fff) top / 100% 1px no-repeat,
    linear-gradient(90deg, #fff, #fff) left / var(--_gap-x, 0) 100% no-repeat,
    var(--color-key-100);
  background-origin: padding-box;
}

.dads-table [data-border=""] :is(td, th):first-child,
.dads-table [data-border~="left"] :is(td, th):first-child,
.dads-table [data-cell-border=""] :is(td, th),
.dads-table [data-cell-border~="left"] :is(td, th),
.dads-table [data-cell-border~="right"] :is(td, th) + :is(td, th),
.dads-table [data-border=""]:is(td, th),
.dads-table [data-border~="left"]:is(td, th),
.dads-table [data-border=""] + :is(td, th),
.dads-table [data-border~="right"] + :is(td, th) {
  --_gap-x: 1px;
}

@supports (selector(:has(.x))) {
  .dads-table td:has(.dads-checkbox:only-child, .dads-radio:only-child),
  .dads-table th:has(.dads-checkbox:only-child, .dads-radio:only-child) {
    position: relative;
    box-sizing: border-box;
    width: calc(40 / 16 * 1rem);
    padding: 0;
  }

  .dads-table td > :is(.dads-checkbox:only-child, .dads-radio:only-child),
  .dads-table th > :is(.dads-checkbox:only-child, .dads-radio:only-child) {
    position: absolute;
    inset: 0;
    display: grid;
    justify-content: center;
    width: auto;
    padding-top: calc(10 / 16 * 1rem);
  }
}

/* Sort and action */

.dads-table__sort-header {
  --_border-color: var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-solid-gray-100);
  padding: calc(12 / 16 * 1rem) calc(16 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
}

.dads-table[data-size="dense"] .dads-table__sort-header {
  padding-top: 0;
  padding-bottom: 0;
}

.dads-table__sort-inner {
  display: flex;
  align-items: start;
  justify-content: space-between;
  column-gap: calc(4 / 16 * 1rem);
}

.dads-table__sort-label {
  display: flex;
  align-items: start;
  gap: calc(4 / 16 * 1rem);
  padding-top: calc(8 / 16 * 1rem);
  padding-bottom: calc(8 / 16 * 1rem);
}

.dads-table[data-size="dense"] .dads-table__sort-label {
  padding-top: calc(11 / 16 * 1rem);
  padding-bottom: calc(11 / 16 * 1rem);
}

.dads-table__sort-button {
  display: inline-flex;
  align-items: start;
  column-gap: calc(4 / 16 * 1rem);
  border: 0;
  background-color: transparent;
  padding: 0;
  color: inherit;
  text-align: left;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: underline;
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-table__sort-button:hover {
  text-decoration-thickness: calc(3 / 16 * 1rem);
}

.dads-table__sort-button:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-table__sort-icon {
  flex-shrink: 0;
  padding-top: calc(2 / 16 * 1rem);
}

.dads-table[data-size="dense"] .dads-table__sort-icon {
  margin-top: calc(-2 / 16 * 1rem);
  padding-top: 0;
}

.dads-table__sort-svg {
  display: block;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

.dads-table__action {
  margin-right: calc(-16 / 16 * 1rem);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: calc(44 / 16 * 1rem);
  height: calc(44 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  border: 0;
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.dads-table__action:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-table__action-svg {
  display: block;
  width: calc(24 / 16 * 1rem);
  height: calc(24 / 16 * 1rem);
}

/* Utilities */

.dads-table [data-width="full"] {
  width: 100%;
}

.dads-table [data-layout="fixed"] {
  table-layout: fixed;
}

.dads-table [data-cell-border=""] :where(td, th) {
  border: 1px solid var(--_border-color);
}

.dads-table [data-cell-border~="top"] :where(td, th) {
  border-top: 1px solid var(--_border-color);
}

.dads-table [data-cell-border~="right"] :where(td, th) {
  border-right: 1px solid var(--_border-color);
}

.dads-table [data-cell-border~="bottom"] :where(td, th) {
  border-bottom: 1px solid var(--_border-color);
}

.dads-table [data-cell-border~="left"] :where(td, th) {
  border-left: 1px solid var(--_border-color);
}

/* Header cell's black border should take precedence over [data-cell-border] */
:last-of-type > .dads-table__col-header,
:last-of-type > .dads-table__sort-header {
  border-bottom: 1px solid var(--color-neutral-black);
}
.dads-table__row-header:last-of-type {
  border-right: 1px solid var(--color-neutral-black);
}

.dads-table [data-border=""] {
  border: 1px solid var(--_border-color);
}

.dads-table [data-border~="top"] {
  border-top: 1px solid var(--_border-color);
}

.dads-table [data-border~="right"] {
  border-right: 1px solid var(--_border-color);
}

.dads-table [data-border~="bottom"] {
  border-bottom: 1px solid var(--_border-color);
}

.dads-table [data-border~="left"] {
  border-left: 1px solid var(--_border-color);
}

.dads-table [data-border="hidden"] {
  border-style: hidden;
}

.dads-table [data-border~="top-hidden"] {
  border-top-style: hidden;
}

.dads-table [data-border~="right-hidden"] {
  border-right-style: hidden;
}

.dads-table [data-border~="bottom-hidden"] {
  border-bottom-style: hidden;
}

.dads-table [data-border~="left-hidden"] {
  border-left-style: hidden;
}

.dads-table [data-bg="white"] {
  background-color: var(--color-neutral-white);
}

.dads-table [data-bg="solid-gray-50"] {
  --_border-color: var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-solid-gray-50);
}

.dads-table [data-bg="solid-gray-100"] {
  --_border-color: var(--color-neutral-solid-gray-500);
  background-color: var(--color-neutral-solid-gray-100);
}

.dads-table [data-bg="transparent"] {
  background-color: transparent;
}
```

### Textarea CSS values

#### `src/components/textarea/textarea.css`

```css
.dads-textarea {
  display: block;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-textarea__textarea {
  display: block;
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid var(--color-neutral-solid-gray-600);
  background-color: var(--color-neutral-white);
  padding: calc(16 / 16 * 1rem);
  border-radius: calc(8 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-900);
  font: inherit;
  resize: vertical;
}

.dads-textarea__textarea:read-only:not(:disabled) {
  border-style: dashed;
}

.dads-textarea__textarea:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

@media (hover: hover) {
  .dads-textarea__textarea:not(:read-only):hover {
    border-color: var(--color-neutral-black);
  }
}

.dads-textarea__textarea:is(:user-invalid, [aria-invalid="true"]) {
  border-color: var(--color-semantic-error-1);
}

@media (hover: hover) {
  .dads-textarea__textarea:is(:user-invalid, [aria-invalid="true"]):hover {
    border-color: var(--color-primitive-red-1000);
  }
}

.dads-textarea__textarea:is(:disabled, [aria-disabled="true"]),
.dads-textarea__textarea:is(:disabled, [aria-disabled="true"]):hover {
  border-color: var(--color-neutral-solid-gray-300);
  background-color: var(--color-neutral-solid-gray-50);
  color: var(--color-neutral-solid-gray-420);
  resize: none;
}

@media (forced-colors: active) {
  .dads-textarea__textarea[aria-disabled="true"],
  .dads-textarea__textarea[aria-disabled="true"]:hover {
    border-color: GrayText;
    color: GrayText;
  }
}

.dads-textarea__error-text {
  margin: calc(8 / 16 * 1rem) 0 0 0;
  display: block;
  color: var(--color-semantic-error-1);
}

.dads-textarea__counter {
  display: block;
  margin-top: calc(8 / 16 * 1rem);
  color: var(--color-neutral-solid-gray-600);
  font-size: calc(16 / 16 * 1rem);
  line-height: 1;
  letter-spacing: 0.02em;
}

.dads-textarea__counter[data-exceeded] {
  color: var(--color-semantic-error-1);
}
```

### Toc CSS values

#### `src/components/toc/toc.css`

```css
.dads-toc {
  width: fit-content;
  color: var(--color-neutral-solid-gray-800);
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.7;
  font-family: var(--font-family-sans);
  letter-spacing: 0.02em;
}

.dads-toc[data-border] {
  border: 1px var(--color-neutral-solid-gray-420);
  padding-top: calc(12 / 16 * 1rem);
  padding-right: calc(24 / 16 * 1rem);
  padding-bottom: calc(24 / 16 * 1rem);
  padding-left: calc(20 / 16 * 1rem);
}

.dads-toc[data-border="dotted"] {
  border-style: dotted;
}

.dads-toc[data-border="solid"] {
  border-style: solid;
}

.dads-toc__heading {
  margin-top: 0;
  margin-bottom: calc(8 / 16 * 1rem);
  font: inherit;
  letter-spacing: inherit;
}

.dads-toc .dads-link:any-link {
  color: inherit;
}

.dads-toc > .dads-list:has(.dads-list) {
  padding-left: 0;
  list-style-type: none;
  font-weight: bold;
}

.dads-toc > .dads-list .dads-list {
  list-style-type: disc;
}

.dads-toc > .dads-list > li > .dads-list {
  margin-top: 0;
  font-weight: normal;
}

.dads-toc > .dads-list .dads-list .dads-list {
  list-style-type: circle;
}
```

### UtilityLink CSS values

#### `src/components/utility-link/utility-link.css`

```css
.dads-utility-link:any-link {
  display: block;
  width: fit-content;
  font-weight: normal;
  font-size: calc(16 / 16 * 1rem);
  line-height: 1.3;
  font-family: var(--font-family-sans);
  letter-spacing: 0;
  text-decoration: none;
  text-wrap: pretty;
}

.dads-utility-link:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  background-color: var(--color-primitive-yellow-300);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-utility-link__lead-icon {
  display: inline-block;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  vertical-align: -0.15em;
  color: var(--color-neutral-solid-gray-900);
}

.dads-utility-link__label {
  color: var(--color-neutral-solid-gray-800);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

.dads-utility-link:visited .dads-utility-link__label {
  color: var(--color-neutral-solid-gray-800);
}

@media (hover: hover) {
  .dads-utility-link:hover .dads-utility-link__label {
    color: var(--color-neutral-solid-gray-800);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

.dads-utility-link:active .dads-utility-link__label {
  color: var(--color-neutral-solid-gray-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

.dads-utility-link__tail-icon {
  display: inline-block;
  width: calc(16 / 16 * 1rem);
  height: calc(16 / 16 * 1rem);
  vertical-align: -0.15em;
  color: var(--color-neutral-solid-gray-900);
}
```

### Foundation CSS値

Foundationの色、フォント、全タイポグラフィユーティリティ、エレベーション、フォーカス、リンク、強制カラー・視覚効果低減の規則は、次の固定スナップショットを使用する。

#### `src/global.css`

```css
:root {
  --color-primitive-blue-50: #e8f1fe;
  --color-primitive-blue-100: #d9e6ff;
  --color-primitive-blue-200: #c5d7fb;
  --color-primitive-blue-300: #9db7f9;
  --color-primitive-blue-400: #7096f8;
  --color-primitive-blue-500: #4979f5;
  --color-primitive-blue-600: #3460fb;
  --color-primitive-blue-700: #264af4;
  --color-primitive-blue-800: #0031d8;
  --color-primitive-blue-900: #0017c1;
  --color-primitive-blue-1000: #00118f;
  --color-primitive-blue-1100: #000071;
  --color-primitive-blue-1200: #000060;
  --color-primitive-light-blue-50: #f0f9ff;
  --color-primitive-light-blue-100: #dcf0ff;
  --color-primitive-light-blue-200: #c0e4ff;
  --color-primitive-light-blue-300: #97d3ff;
  --color-primitive-light-blue-400: #57b8ff;
  --color-primitive-light-blue-500: #39abff;
  --color-primitive-light-blue-600: #008bf2;
  --color-primitive-light-blue-700: #0877d7;
  --color-primitive-light-blue-800: #0066be;
  --color-primitive-light-blue-900: #0055ad;
  --color-primitive-light-blue-1000: #00428c;
  --color-primitive-light-blue-1100: #00316a;
  --color-primitive-light-blue-1200: #00234b;
  --color-primitive-cyan-50: #e9f7f9;
  --color-primitive-cyan-100: #c8f8ff;
  --color-primitive-cyan-200: #99f2ff;
  --color-primitive-cyan-300: #79e2f2;
  --color-primitive-cyan-400: #2bc8e4;
  --color-primitive-cyan-500: #01b7d6;
  --color-primitive-cyan-600: #00a3bf;
  --color-primitive-cyan-700: #008da6;
  --color-primitive-cyan-800: #008299;
  --color-primitive-cyan-900: #006f83;
  --color-primitive-cyan-1000: #006173;
  --color-primitive-cyan-1100: #004c59;
  --color-primitive-cyan-1200: #003741;
  --color-primitive-green-50: #e6f5ec;
  --color-primitive-green-100: #c2e5d1;
  --color-primitive-green-200: #9bd4b5;
  --color-primitive-green-300: #71c598;
  --color-primitive-green-400: #51b883;
  --color-primitive-green-500: #2cac6e;
  --color-primitive-green-600: #259d63;
  --color-primitive-green-700: #1d8b56;
  --color-primitive-green-800: #197a4b;
  --color-primitive-green-900: #115a36;
  --color-primitive-green-1000: #0c472a;
  --color-primitive-green-1100: #08351f;
  --color-primitive-green-1200: #032213;
  --color-primitive-lime-50: #ebfad9;
  --color-primitive-lime-100: #d0f5a2;
  --color-primitive-lime-200: #c0f354;
  --color-primitive-lime-300: #ade830;
  --color-primitive-lime-400: #9ddd15;
  --color-primitive-lime-500: #8cc80c;
  --color-primitive-lime-600: #7eb40d;
  --color-primitive-lime-700: #6fa104;
  --color-primitive-lime-800: #618e00;
  --color-primitive-lime-900: #507500;
  --color-primitive-lime-1000: #3e5a00;
  --color-primitive-lime-1100: #2c4100;
  --color-primitive-lime-1200: #1e2d00;
  --color-primitive-yellow-50: #fbf5e0;
  --color-primitive-yellow-100: #fff0b3;
  --color-primitive-yellow-200: #ffe380;
  --color-primitive-yellow-300: #ffd43d;
  --color-primitive-yellow-400: #ffc700;
  --color-primitive-yellow-500: #ebb700;
  --color-primitive-yellow-600: #d2a400;
  --color-primitive-yellow-700: #b78f00;
  --color-primitive-yellow-800: #a58000;
  --color-primitive-yellow-900: #927200;
  --color-primitive-yellow-1000: #806300;
  --color-primitive-yellow-1100: #6e5600;
  --color-primitive-yellow-1200: #604b00;
  --color-primitive-orange-50: #ffeee2;
  --color-primitive-orange-100: #ffdfca;
  --color-primitive-orange-200: #ffc199;
  --color-primitive-orange-300: #ffa66d;
  --color-primitive-orange-400: #ff8d44;
  --color-primitive-orange-500: #ff7628;
  --color-primitive-orange-600: #fb5b01;
  --color-primitive-orange-700: #e25100;
  --color-primitive-orange-800: #c74700;
  --color-primitive-orange-900: #ac3e00;
  --color-primitive-orange-1000: #8b3200;
  --color-primitive-orange-1100: #6d2700;
  --color-primitive-orange-1200: #541e00;
  --color-primitive-red-50: #fdeeee;
  --color-primitive-red-100: #ffdada;
  --color-primitive-red-200: #ffbbbb;
  --color-primitive-red-300: #ff9696;
  --color-primitive-red-400: #ff7171;
  --color-primitive-red-500: #ff5454;
  --color-primitive-red-600: #fe3939;
  --color-primitive-red-700: #fa0000;
  --color-primitive-red-800: #ec0000;
  --color-primitive-red-900: #ce0000;
  --color-primitive-red-1000: #a90000;
  --color-primitive-red-1100: #850000;
  --color-primitive-red-1200: #620000;
  --color-primitive-magenta-50: #f3e5f4;
  --color-primitive-magenta-100: #ffd0ff;
  --color-primitive-magenta-200: #ffaeff;
  --color-primitive-magenta-300: #ff8eff;
  --color-primitive-magenta-400: #f661f6;
  --color-primitive-magenta-500: #f137f1;
  --color-primitive-magenta-600: #db00db;
  --color-primitive-magenta-700: #c000c0;
  --color-primitive-magenta-800: #aa00aa;
  --color-primitive-magenta-900: #8b008b;
  --color-primitive-magenta-1000: #6c006c;
  --color-primitive-magenta-1100: #500050;
  --color-primitive-magenta-1200: #3b003b;
  --color-primitive-purple-50: #f1eafa;
  --color-primitive-purple-100: #ecddff;
  --color-primitive-purple-200: #ddc2ff;
  --color-primitive-purple-300: #cda6ff;
  --color-primitive-purple-400: #bb87ff;
  --color-primitive-purple-500: #a565f8;
  --color-primitive-purple-600: #8843e1;
  --color-primitive-purple-700: #6f23d0;
  --color-primitive-purple-800: #5c10be;
  --color-primitive-purple-900: #5109ad;
  --color-primitive-purple-1000: #41048e;
  --color-primitive-purple-1100: #30016c;
  --color-primitive-purple-1200: #21004b;
  --color-neutral-white: #ffffff;
  --color-neutral-black: #000000;
  --color-neutral-solid-gray-50: #f2f2f2;
  --color-neutral-solid-gray-100: #e6e6e6;
  --color-neutral-solid-gray-200: #cccccc;
  --color-neutral-solid-gray-300: #b3b3b3;
  --color-neutral-solid-gray-400: #999999;
  --color-neutral-solid-gray-420: #949494;
  --color-neutral-solid-gray-500: #7f7f7f;
  --color-neutral-solid-gray-536: #767676;
  --color-neutral-solid-gray-600: #666666;
  --color-neutral-solid-gray-700: #4d4d4d;
  --color-neutral-solid-gray-800: #333333;
  --color-neutral-solid-gray-900: #1a1a1a;
  --color-neutral-opacity-gray-50: rgba(0, 0, 0, 0.05);
  --color-neutral-opacity-gray-100: rgba(0, 0, 0, 0.1);
  --color-neutral-opacity-gray-200: rgba(0, 0, 0, 0.2);
  --color-neutral-opacity-gray-300: rgba(0, 0, 0, 0.3);
  --color-neutral-opacity-gray-400: rgba(0, 0, 0, 0.4);
  --color-neutral-opacity-gray-420: rgba(0, 0, 0, 0.42);
  --color-neutral-opacity-gray-500: rgba(0, 0, 0, 0.5);
  --color-neutral-opacity-gray-536: rgba(0, 0, 0, 0.54);
  --color-neutral-opacity-gray-600: rgba(0, 0, 0, 0.6);
  --color-neutral-opacity-gray-700: rgba(0, 0, 0, 0.7);
  --color-neutral-opacity-gray-800: rgba(0, 0, 0, 0.8);
  --color-neutral-opacity-gray-900: rgba(0, 0, 0, 0.9);
  --font-family-sans:
    "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: "Noto Sans Mono", monospace;
  --elevation-1:
    0 2px 8px 1px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  --elevation-2:
    0 2px 12px 2px rgba(0, 0, 0, 0.1), 0 1px 6px 0 rgba(0, 0, 0, 0.3);
  --elevation-3:
    0 4px 16px 3px rgba(0, 0, 0, 0.1), 0 1px 6px 0 rgba(0, 0, 0, 0.3);
  --elevation-4:
    0 6px 20px 4px rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  --elevation-5:
    0 8px 24px 5px rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  --elevation-6:
    0 10px 30px 6px rgba(0, 0, 0, 0.1), 0 3px 12px 0 rgba(0, 0, 0, 0.3);
  --elevation-7:
    0 12px 36px 7px rgba(0, 0, 0, 0.1), 0 3px 14px 0 rgba(0, 0, 0, 0.3);
  --elevation-8:
    0 14px 40px 7px rgba(0, 0, 0, 0.1), 0 3px 16px 0 rgba(0, 0, 0, 0.3);
  --color-semantic-success-1: var(--color-primitive-green-600);
  --color-semantic-success-2: var(--color-primitive-green-800);
  --color-semantic-error-1: var(--color-primitive-red-800);
  --color-semantic-error-2: var(--color-primitive-red-900);
  --color-semantic-warning-yellow-1: var(--color-primitive-yellow-700);
  --color-semantic-warning-yellow-2: var(--color-primitive-yellow-900);
  --color-semantic-warning-orange-1: var(--color-primitive-orange-600);
  --color-semantic-warning-orange-2: var(--color-primitive-orange-800);
  --color-key-50: var(--color-primitive-blue-50);
  --color-key-100: var(--color-primitive-blue-100);
  --color-key-200: var(--color-primitive-blue-200);
  --color-key-300: var(--color-primitive-blue-300);
  --color-key-400: var(--color-primitive-blue-400);
  --color-key-500: var(--color-primitive-blue-500);
  --color-key-600: var(--color-primitive-blue-600);
  --color-key-700: var(--color-primitive-blue-700);
  --color-key-800: var(--color-primitive-blue-800);
  --color-key-900: var(--color-primitive-blue-900);
  --color-key-1000: var(--color-primitive-blue-1000);
  --color-key-1100: var(--color-primitive-blue-1100);
  --color-key-1200: var(--color-primitive-blue-1200);
}

html {
  scrollbar-gutter: stable;
  font-family: var(--font-family-sans);
}

html:has(:modal) {
  overflow: clip;
  scrollbar-gutter: auto;
}

body:has(:modal) {
  overflow: auto;
  scrollbar-gutter: stable;
}

:where(a):any-link {
  color: var(--color-primitive-blue-1000);
  text-decoration: underline;
  text-decoration-thickness: calc(1 / 16 * 1rem);
  text-underline-offset: calc(3 / 16 * 1rem);
}

:where(a):visited {
  color: var(--color-primitive-magenta-900);
}

@media (hover: hover) {
  :where(a):hover {
    color: var(--color-primitive-blue-900);
    text-decoration-thickness: calc(3 / 16 * 1rem);
  }
}

:where(a):active {
  color: var(--color-primitive-orange-800);
  text-decoration-thickness: calc(1 / 16 * 1rem);
}

:focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black);
  outline-offset: calc(2 / 16 * 1rem);
  border-radius: calc(4 / 16 * 1rem);
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300);
}

.dads-u-visually-hidden {
  clip: rect(0 0 0 0) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
}

:where(.dads-u-focus-outline):focus-visible {
  outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black) !important;
  outline-offset: calc(2 / 16 * 1rem) !important;
  border-radius: calc(4 / 16 * 1rem) !important;
  background-color: var(--color-primitive-yellow-300) !important;
  box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300) !important;
}

@supports selector(:has(*)) {
  :where(.dads-u-focus-within-outline):focus-visible,
  :where(.dads-u-focus-within-outline):has(:focus-visible) {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black) !important;
    outline-offset: calc(2 / 16 * 1rem) !important;
    border-radius: calc(4 / 16 * 1rem) !important;
    background-color: var(--color-primitive-yellow-300) !important;
    box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300) !important;
  }
}
@supports not selector(:has(*)) {
  :where(.dads-u-focus-within-outline):focus-within {
    outline: calc(4 / 16 * 1rem) solid var(--color-neutral-black) !important;
    outline-offset: calc(2 / 16 * 1rem) !important;
    border-radius: calc(4 / 16 * 1rem) !important;
    background-color: var(--color-primitive-yellow-300) !important;
    box-shadow: 0 0 0 calc(2 / 16 * 1rem) var(--color-primitive-yellow-300) !important;
  }
}

.dads-u-dsp-64B-140 {
  font-weight: bold !important;
  font-size: calc(64 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-dsp-57B-140 {
  font-weight: bold !important;
  font-size: calc(57 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-dsp-48B-140 {
  font-weight: bold !important;
  font-size: calc(48 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-dsp-64N-140 {
  font-weight: normal !important;
  font-size: calc(64 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-dsp-57N-140 {
  font-weight: normal !important;
  font-size: calc(57 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-dsp-48N-140 {
  font-weight: normal !important;
  font-size: calc(48 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-std-45B-140 {
  font-weight: bold !important;
  font-size: calc(45 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-std-36B-140 {
  font-weight: bold !important;
  font-size: calc(36 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-32B-150 {
  font-weight: bold !important;
  font-size: calc(32 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-28B-150 {
  font-weight: bold !important;
  font-size: calc(28 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-26B-150 {
  font-weight: bold !important;
  font-size: calc(26 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-24B-150 {
  font-weight: bold !important;
  font-size: calc(24 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-22B-150 {
  font-weight: bold !important;
  font-size: calc(22 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-20B-150 {
  font-weight: bold !important;
  font-size: calc(20 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-18B-160 {
  font-weight: bold !important;
  font-size: calc(18 / 16 * 1rem) !important;
  line-height: 1.6 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-17B-170 {
  font-weight: bold !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.7 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-16B-170 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.7 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-16B-175 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.75 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-45N-140 {
  font-weight: normal !important;
  font-size: calc(45 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
}

.dads-u-std-36N-140 {
  font-weight: normal !important;
  font-size: calc(36 / 16 * 1rem) !important;
  line-height: 1.4 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-32N-150 {
  font-weight: normal !important;
  font-size: calc(32 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-28N-150 {
  font-weight: normal !important;
  font-size: calc(28 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.01em !important;
}

.dads-u-std-26N-150 {
  font-weight: normal !important;
  font-size: calc(26 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-24N-150 {
  font-weight: normal !important;
  font-size: calc(24 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-22N-150 {
  font-weight: normal !important;
  font-size: calc(22 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-20N-150 {
  font-weight: normal !important;
  font-size: calc(20 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-18N-160 {
  font-weight: normal !important;
  font-size: calc(18 / 16 * 1rem) !important;
  line-height: 1.6 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-17N-170 {
  font-weight: normal !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.7 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-16N-170 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.7 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-std-16N-175 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.75 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-dns-17B-130 {
  font-weight: bold !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-17B-120 {
  font-weight: bold !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-16B-130 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-16B-120 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-14B-130 {
  font-weight: bold !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-14B-120 {
  font-weight: bold !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-17N-130 {
  font-weight: normal !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-17N-120 {
  font-weight: normal !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-16N-130 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-16N-120 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-14N-130 {
  font-weight: normal !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.3 !important;
  letter-spacing: 0 !important;
}

.dads-u-dns-14N-120 {
  font-weight: normal !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
}

.dads-u-oln-17B-100 {
  font-weight: bold !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-oln-16B-100 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-oln-14B-100 {
  font-weight: bold !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-oln-17N-100 {
  font-weight: normal !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-oln-16N-100 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-oln-14N-100 {
  font-weight: normal !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.dads-u-mono-17B-150 {
  font-weight: bold !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}

.dads-u-mono-16B-150 {
  font-weight: bold !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}

.dads-u-mono-14B-150 {
  font-weight: bold !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}

.dads-u-mono-17N-150 {
  font-weight: normal !important;
  font-size: calc(17 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}

.dads-u-mono-16N-150 {
  font-weight: normal !important;
  font-size: calc(16 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}

.dads-u-mono-14N-150 {
  font-weight: normal !important;
  font-size: calc(14 / 16 * 1rem) !important;
  line-height: 1.5 !important;
  font-family: var(--font-family-mono) !important;
  letter-spacing: 0 !important;
}
```

### コンポーネントの動作仕様

PowerPointでは次のJavaScriptの動作を実装したように見せかけない。キーボード操作、フォーカス遷移、ARIA更新、ライブリージョン、開閉、選択、並べ替え、入力補助は、資料内で状態名と注記として扱う。

#### `src/components/calendar/calendar.js`

```js
export class Calendar extends HTMLElement {
  #abort = null;
  #displayYear = new Date().getFullYear();
  #displayMonth = new Date().getMonth();
  #selectedDate = null;
  #minDate = null;
  #maxDate = null;
  #cellTemplateCache = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#initializeCalendar();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  static observedAttributes = ["min-date", "max-date"];
  attributeChangedCallback(name) {
    if (name === "min-date" || name === "max-date") {
      this.#initializeDateRange();
      this.#populateYearSelect();
      this.#renderCalendar();
    }
  }

  #initializeCalendar() {
    this.#initializeDateRange();
    this.#populateYearSelect();
    this.#renderCalendar();
  }

  #setupEventListeners() {
    const { signal } = this.#abort;
    this.#calendarTable.addEventListener(
      "click",
      (e) => this.#handleDateClick(e),
      { signal },
    );
    this.#calendarTable.addEventListener(
      "keydown",
      (e) => this.#handleKeydown(e),
      { signal },
    );
    this.#prevMonthButton.addEventListener(
      "click",
      () => this.#navigateMonth(-1),
      { signal },
    );
    this.#nextMonthButton.addEventListener(
      "click",
      () => this.#navigateMonth(1),
      { signal },
    );
    this.#yearSelect.addEventListener(
      "change",
      (e) => this.#handleYearChange(e),
      { signal },
    );
    this.#deleteButton.addEventListener(
      "click",
      () => this.#deleteSelectedDate(),
      { signal },
    );
    this.#todayButton.addEventListener("click", () => this.#selectToday(), {
      signal,
    });
  }

  #initializeDateRange() {
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDate = now.getDate();

    let minDateAttr = this.getAttribute("min-date");
    let maxDateAttr = this.getAttribute("max-date");

    if (minDateAttr > maxDateAttr) {
      minDateAttr = null;
      maxDateAttr = null;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(minDateAttr)) {
      const [year, month, date] = minDateAttr.split("-");
      this.#minDate = new Date(year, month - 1, date);
    } else {
      this.#minDate = new Date(nowYear - 1, nowMonth, nowDate);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(maxDateAttr)) {
      const [year, month, date] = maxDateAttr.split("-");
      this.#maxDate = new Date(year, month - 1, Number(date) + 1);
    } else {
      this.#maxDate = new Date(nowYear + 1, nowMonth, nowDate);
    }

    const closestDate = this.#getClosestDateInRange(now);
    this.#displayYear = closestDate.getFullYear();
    this.#displayMonth = closestDate.getMonth();
  }

  #populateYearSelect() {
    const startYear = this.#minDate.getFullYear();
    const endYear = this.#previousMaxDate.getFullYear();

    this.#yearSelect.innerHTML = "";

    for (let year = startYear; year <= endYear; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = this.#formatJapaneseYear(year);
      this.#yearSelect.appendChild(option);
    }

    this.#yearSelect.value = this.#displayYear;
  }

  // 和暦付きの年表示
  #formatJapaneseYear(year) {
    const date = new Date(year, 0, 1);
    const parts = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      era: "long",
      year: "numeric",
    }).formatToParts(date);

    const era = parts.find((part) => part.type === "era")?.value || "";
    const yearValue = parts.find((part) => part.type === "year")?.value || "";

    return `${year}年(${era}${yearValue}年)`;
  }

  #isDateInRange(date) {
    // Invalid Date
    if (Number.isNaN(date.getTime())) {
      return false;
    }

    // 時刻部分を無視して日付のみで比較
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    return dateOnly >= this.#minDate && dateOnly < this.#maxDate;
  }

  #getClosestDateInRange(date) {
    if (date < this.#minDate) {
      return new Date(this.#minDate);
    }
    if (date >= this.#maxDate) {
      return new Date(this.#previousMaxDate);
    }
    return new Date(date);
  }

  #renderCalendar() {
    const displayYear = this.#displayYear;
    const displayMonth = this.#displayMonth;
    const selectedDate = this.#selectedDate;
    const yearSelect = this.#yearSelect;
    const prevMonthButton = this.#prevMonthButton;
    const isPreviousMonthAvailable = this.#isPreviousMonthAvailable;
    const currentMonth = this.#currentMonth;
    const nextMonthButton = this.#nextMonthButton;
    const isNextMonthAvailable = this.#isNextMonthAvailable;
    const calendarHeadingForAnnouncement = this.#calendarHeadingForAnnouncement;
    const calendarTable = this.#calendarTable;
    const tbody = this.#tbody;
    const calendarHasSelectedDate = this.#calendarHasSelectedDate;
    const calendarHasToday = this.#calendarHasToday;

    /* コントロール要素の更新 */

    yearSelect.value = displayYear;

    prevMonthButton.setAttribute("aria-disabled", !isPreviousMonthAvailable);
    nextMonthButton.setAttribute("aria-disabled", !isNextMonthAvailable);

    /* カレンダーテーブルの描画 */

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const row of tbody.querySelectorAll("tr")) row.remove();

    const firstDay = new Date(displayYear, displayMonth, 1);
    const lastDay = new Date(displayYear, displayMonth + 1, 0);
    const startDate = new Date(firstDay);

    // 日曜日から開始
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const currentDate = new Date(startDate);
    let weekCount = 0;
    const maxWeeks = 6;

    while (weekCount++ < maxWeeks) {
      const row = document.createElement("tr");
      let weekContainsLastDay = false;

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const date = new Date(currentDate);
        const isCurrentMonth = date.getMonth() === displayMonth;
        const isInRange = this.#isDateInRange(date);
        const isToday = date.getTime() === today.getTime();

        const isDisabled = !isCurrentMonth || !isInRange;
        const isSelected =
          selectedDate && date.getTime() === selectedDate.getTime();
        const isFocusable =
          isSelected || (!calendarHasSelectedDate && isToday && !isDisabled);

        const cell = this.#createDateCell(date, {
          isDisabled,
          isSelected,
          isFocusable,
        });
        row.appendChild(cell);

        weekContainsLastDay ||= lastDay.getTime() === date.getTime();

        currentDate.setDate(currentDate.getDate() + 1);
      }

      tbody.appendChild(row);

      if (weekContainsLastDay) {
        break;
      }
    }

    // 選択済み日付も今日も表示されていない場合、どのセルにもtabindex=0がついていないため、
    // 最初のenabledな日付にtabindex=0を設定
    if (!calendarHasSelectedDate && !calendarHasToday) {
      const buttons = tbody.querySelectorAll(
        "[data-js-date-button]:not(:disabled)",
      );
      buttons[0]?.setAttribute("tabindex", "0");
    }

    /* 見出しとラベルの更新 */

    const formatter = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
    });
    const heading = formatter.format(firstDay);

    this.setAttribute("aria-label", heading);
    calendarHeadingForAnnouncement.textContent = heading;
    calendarTable.setAttribute("aria-label", heading);

    currentMonth.textContent = new Intl.DateTimeFormat("ja-JP", {
      month: "long",
    }).format(firstDay);
  }

  #createDateCell(date, { isDisabled, isSelected, isFocusable }) {
    const cell = this.#cellTemplate.content.cloneNode(true).firstElementChild;
    const button = cell.querySelector("button");

    button.textContent = date.getDate();

    const formatter = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    const ariaLabel = formatter.format(date);

    if (isDisabled) {
      cell.setAttribute("aria-disabled", "true");
      button.disabled = true;
    }
    if (isSelected) {
      cell.setAttribute("aria-selected", "true");
      button.setAttribute("aria-label", `選択中 ${ariaLabel}`);
      button.setAttribute("data-selected", "true");
    } else {
      button.setAttribute("aria-label", ariaLabel);
    }
    button.tabIndex = isFocusable ? 0 : -1;

    button.dataset.year = date.getFullYear();
    button.dataset.month = date.getMonth();
    button.dataset.date = date.getDate();

    return cell;
  }

  #handleDateClick(e) {
    const button = e.target.matches("[data-js-date-button]") ? e.target : null;
    if (!button || button.disabled) return;

    const year = Number.parseInt(button.dataset.year);
    const month = Number.parseInt(button.dataset.month);
    const date = Number.parseInt(button.dataset.date);

    this.#selectDate(new Date(year, month, date));
  }

  #handleKeydown(e) {
    const button = e.target.matches("[data-js-date-button]") ? e.target : null;
    if (!button) return;

    const year = Number.parseInt(button.dataset.year);
    const month = Number.parseInt(button.dataset.month);
    const date = Number.parseInt(button.dataset.date);
    const currentDate = new Date(year, month, date);

    const targetDate = new Date(currentDate);

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        targetDate.setDate(targetDate.getDate() - 7);
        this.#navigateToDate(targetDate);
        break;
      case "ArrowDown":
        e.preventDefault();
        targetDate.setDate(targetDate.getDate() + 7);
        this.#navigateToDate(targetDate);
        break;
      case "ArrowLeft":
        e.preventDefault();
        targetDate.setDate(targetDate.getDate() - 1);
        this.#navigateToDate(targetDate);
        break;
      case "ArrowRight":
        e.preventDefault();
        targetDate.setDate(targetDate.getDate() + 1);
        this.#navigateToDate(targetDate);
        break;
    }
  }

  #navigateToDate(targetDate) {
    if (!this.#isDateInRange(targetDate)) {
      return;
    }

    this.setDisplayMonth(targetDate.getFullYear(), targetDate.getMonth());

    const targetButton = this.#calendarTable.querySelector(
      `[data-year="${targetDate.getFullYear()}"][data-month="${targetDate.getMonth()}"][data-date="${targetDate.getDate()}"]`,
    );
    if (targetButton) {
      for (const el of this.#calendarTable.querySelectorAll('[tabindex="0"]')) {
        el.setAttribute("tabindex", "-1");
      }
      targetButton.setAttribute("tabindex", "0");
      targetButton.focus();
    }
  }

  #selectDate(date) {
    this.#selectedDate = date;
    this.#renderCalendar();

    this.dispatchEvent(
      new CustomEvent("date-selected", {
        detail: { date },
        bubbles: true,
      }),
    );
  }

  #navigateMonth(direction) {
    if (direction === -1 && !this.#isPreviousMonthAvailable) return;
    if (direction === 1 && !this.#isNextMonthAvailable) return;
    this.setDisplayMonth(this.#displayYear, this.#displayMonth + direction);
  }

  #handleYearChange(e) {
    this.setDisplayMonth(Number.parseInt(e.target.value), this.#displayMonth);
  }

  #deleteSelectedDate() {
    this.#selectDate(null);
  }

  #selectToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (this.#isDateInRange(today)) {
      this.setDisplayMonth(today.getFullYear(), today.getMonth());
      this.#selectDate(today);
    }
  }

  setSelectedDate(date) {
    if (date && this.#isDateInRange(date)) {
      this.#selectedDate = date;
    } else {
      this.#selectedDate = null;
    }
    this.#renderCalendar();
  }

  setDisplayMonth(y, m) {
    const monthToDisplay = this.#getClosestDateInRange(new Date(y, m, 1));
    const year = monthToDisplay.getFullYear();
    const month = monthToDisplay.getMonth();
    const changed = this.#displayYear !== year || this.#displayMonth !== month;
    this.#displayYear = year;
    this.#displayMonth = month;
    if (changed) this.#renderCalendar();
  }

  focus() {
    const focusableElement =
      this.#calendarTable.querySelector('[tabindex="0"]');
    if (focusableElement) {
      focusableElement.focus();
    }
  }

  get #previousMaxDate() {
    return new Date(
      this.#maxDate.getFullYear(),
      this.#maxDate.getMonth(),
      this.#maxDate.getDate() - 1,
    );
  }

  get #isPreviousMonthAvailable() {
    const prevMonthLastDay = new Date(this.#displayYear, this.#displayMonth, 0);
    return this.#isDateInRange(prevMonthLastDay);
  }

  get #isNextMonthAvailable() {
    const nextMonthFirstDay = new Date(
      this.#displayYear,
      this.#displayMonth + 1,
      1,
    );
    return this.#isDateInRange(nextMonthFirstDay);
  }

  get #calendarHasSelectedDate() {
    return (
      this.#selectedDate &&
      this.#displayYear === this.#selectedDate.getFullYear() &&
      this.#displayMonth === this.#selectedDate.getMonth()
    );
  }

  get #calendarHasToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return (
      this.#displayYear === today.getFullYear() &&
      this.#displayMonth === today.getMonth() &&
      this.#isDateInRange(today)
    );
  }

  get #calendarHeadingForAnnouncement() {
    return this.querySelector("[data-js-calendar-heading]");
  }

  get #yearSelect() {
    return this.querySelector("[data-js-year-select]");
  }

  get #prevMonthButton() {
    return this.querySelector("[data-js-prev-month-button]");
  }

  get #nextMonthButton() {
    return this.querySelector("[data-js-next-month-button]");
  }

  get #currentMonth() {
    return this.querySelector("[data-js-current-month]");
  }

  get #calendarTable() {
    return this.querySelector("[data-js-calendar-table]");
  }

  get #tbody() {
    return this.querySelector("[data-js-calendar-tbody]");
  }

  get #cellTemplate() {
    if (!this.#cellTemplateCache) {
      this.#cellTemplateCache = this.querySelector("[data-js-cell-template]");
    }
    return this.#cellTemplateCache;
  }

  get #deleteButton() {
    return this.querySelector("[data-js-delete-button]");
  }

  get #todayButton() {
    return this.querySelector("[data-js-today-button]");
  }
}

customElements.define("dads-calendar", Calendar);
```

#### `src/components/carousel/carousel.js`

```js
export class Carousel extends HTMLElement {
  #slideData = [];
  #currentIndex = 0;
  #abort = null;
  #widthObserver = null;

  connectedCallback() {
    if (!this.hasAttribute("breakpoint-rem")) {
      console.error(`<${this.localName}>: "breakpoint-rem" attr is required.`);
      return;
    }

    this.#abort = new AbortController();

    this.#widthObserver = new WidthObserver(this, this.#breakpointRem);

    this.#collectSlideData();
    this.#initializeSlideBgs();
    this.#setupEventListeners();

    requestAnimationFrame(() => {
      this.#update();
    });
  }

  disconnectedCallback() {
    this.#abort?.abort();
    this.#widthObserver?.disconnect();
  }

  #collectSlideData() {
    this.#slideData = this.#slides.map((slide) => {
      const link = slide.querySelector("a");
      const href = link?.href;
      const target = link?.target;
      const rel = link?.rel;

      return { el: slide, href, target, rel };
    });
  }

  #initializeSlideBgs() {
    for (const slide of this.#slideData) {
      const bg = slide.el.querySelector("[data-js-bg-container]");
      const image = this.#getSlideImage(slide, { noAlt: true });
      bg.innerHTML = "";
      bg.appendChild(image);
    }
  }

  #setupEventListeners() {
    const signal = this.#abort.signal;

    this.#nextButton.addEventListener("click", () => this.next(), { signal });

    this.#prevSlideButton.addEventListener("click", () => this.prev(), {
      signal,
    });
    this.#nextSlideButton.addEventListener("click", () => this.next(), {
      signal,
    });

    this.addEventListener("select", (event) => this.goTo(event.detail.index), {
      signal,
    });

    this.#widthObserver.addEventListener("change", () => this.#update(), {
      signal,
    });
  }

  #update() {
    const nextIndex = (this.#currentIndex + 1) % this.#slideData.length;
    const current = this.#slideData[this.#currentIndex];
    const next = this.#slideData[nextIndex];

    this.#currentNumber.textContent = this.#currentIndex + 1;

    if (this.#widthObserver.matches) {
      this.#mainPanel.setAttribute("role", "tabpanel");
      this.#mainPanel.setAttribute(
        "aria-label",
        `${this.#unit}${this.#currentIndex + 1}`,
      );
    } else {
      this.#mainPanel.removeAttribute("role");
      this.#mainPanel.removeAttribute("aria-label");
    }

    if (current.href) {
      this.#mainLink.href = current.href;
      this.#mainLink.target = current.target || "_self";
      this.#mainLink.rel = current.rel || "";
    } else {
      this.#mainLink.removeAttribute("href");
      this.#mainLink.removeAttribute("target");
      this.#mainLink.removeAttribute("rel");
    }

    this.#mainLabel.textContent = `${this.#unit}${this.#currentIndex + 1}`;

    const mainImage = this.#getSlideImage(current);
    this.#mainImages.innerHTML = "";
    this.#mainImages.appendChild(mainImage);

    const mainImageBg = this.#getSlideImage(current, { noAlt: true });
    this.#mainBg.innerHTML = "";
    this.#mainBg.appendChild(mainImageBg);

    // Workaround for macOS Safari reading bug
    this.#mainLink.replaceWith(this.#mainLink.cloneNode(true));

    const nextImage = this.#getSlideImage(next, { noAlt: true });
    this.#nextImageContainer.innerHTML = "";
    this.#nextImageContainer.appendChild(nextImage);

    const nextImageBg = this.#getSlideImage(next, { noAlt: true });
    this.#nextBg.innerHTML = "";
    this.#nextBg.appendChild(nextImageBg);

    this.#currentSlide.textContent = `${this.#currentIndex + 1} / ${this.#slideData.length}`;

    this.#slideContainer.innerHTML = "";
    this.#slideContainer.append(
      ...[
        ...this.#slideData.slice(this.#currentIndex + 1),
        ...this.#slideData.slice(0, this.#currentIndex),
      ].map((slide) => slide.el),
    );

    this.#stepNav.setSelectedIndex(this.#currentIndex);
  }

  #getSlideImage(slide, { noAlt } = {}) {
    const picture = slide.el.querySelector("picture");
    const img = slide.el.querySelector("img");

    const imgOrPicture = (picture || img).cloneNode(true);
    const imgEl = picture ? imgOrPicture.querySelector("img") : imgOrPicture;

    if (noAlt) {
      imgEl.alt = "";
    }

    return imgOrPicture;
  }

  next() {
    this.#currentIndex = (this.#currentIndex + 1) % this.#slideData.length;
    this.#update();
  }

  prev() {
    this.#currentIndex =
      (this.#currentIndex + this.#slideData.length - 1) %
      this.#slideData.length;
    this.#update();
  }

  goTo(index) {
    if (index < 0 || index >= this.#slideData.length) return;
    this.#currentIndex = index;
    this.#update();
  }

  get #breakpointRem() {
    return parseFloat(this.getAttribute("breakpoint-rem"));
  }

  get #unit() {
    return this.getAttribute("data-js-unit") || "Slide ";
  }

  get #slides() {
    return Array.from(this.querySelectorAll("[data-js-slide]"));
  }

  get #mainPanel() {
    return this.querySelector("[data-js-main-panel]");
  }

  get #mainLink() {
    return this.querySelector("[data-js-main-link]");
  }

  get #mainLabel() {
    return this.querySelector("[data-js-main-label]");
  }

  get #mainImages() {
    return this.querySelector("[data-js-main-images]");
  }

  get #mainBg() {
    return this.querySelector("[data-js-main-bg]");
  }

  get #currentNumber() {
    return this.querySelector("[data-js-current-number]");
  }

  get #nextButton() {
    return this.querySelector("[data-js-next-button]");
  }

  get #nextImageContainer() {
    return this.querySelector("[data-js-next-image-container]");
  }

  get #nextBg() {
    return this.querySelector("[data-js-next-bg]");
  }

  get #stepNav() {
    return this.querySelector("dads-carousel-step-nav");
  }

  get #prevSlideButton() {
    return this.querySelector("[data-js-prev-slide-button]");
  }

  get #nextSlideButton() {
    return this.querySelector("[data-js-next-slide-button]");
  }

  get #currentSlide() {
    return this.querySelector("[data-js-current-slide]");
  }

  get #slideContainer() {
    return this.querySelector("[data-js-slide-container]");
  }
}

export class CarouselStepNav extends HTMLElement {
  #selectedIndex = 0;
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
    this.#update();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const signal = this.#abort.signal;

    this.#tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.#selectTab(index), { signal });
    });

    this.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          this.#next();
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          this.#prev();
        }
      },
      { signal },
    );
  }

  #next() {
    const newIndex = (this.#selectedIndex + 1) % this.#tabs.length;
    this.#selectTab(newIndex);
  }

  #prev() {
    const newIndex =
      (this.#selectedIndex + this.#tabs.length - 1) % this.#tabs.length;
    this.#selectTab(newIndex);
  }

  #selectTab(index) {
    this.#selectedIndex = index;
    this.#update();

    this.#tabs[index].focus();

    const event = new CustomEvent("select", {
      detail: { index },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }

  setSelectedIndex(index) {
    this.#selectedIndex = index;
    this.#update();
  }

  #update() {
    this.#tabs.forEach((tab, i) => {
      const isSelected = i === this.#selectedIndex;
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
      tab.tabIndex = isSelected ? 0 : -1;
    });
  }

  get #tabs() {
    return Array.from(this.querySelectorAll("[role='tab']"));
  }
}

class WidthObserver extends EventTarget {
  minWidth;
  matches;
  #resizeObserver;

  constructor(element, minWidthRem) {
    super();
    this.minWidth = minWidthRem;
    this.matches = false;

    this.#resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          const widthPx = entry.borderBoxSize[0].inlineSize;
          const remSize = parseFloat(
            getComputedStyle(document.documentElement).fontSize,
          );
          const widthRem = widthPx / remSize;
          const currentMatches = widthRem >= minWidthRem;

          if (currentMatches !== this.matches) {
            this.matches = currentMatches;
            this.dispatchEvent(
              new CustomEvent("change", {
                detail: { matches: currentMatches },
              }),
            );
          }
        }
      });
    });

    this.#resizeObserver.observe(element);
  }

  disconnect() {
    this.#resizeObserver.disconnect();
  }
}

customElements.define("dads-carousel", Carousel);
customElements.define("dads-carousel-step-nav", CarouselStepNav);
```

#### `src/components/date-picker/date-picker.js`

```js
export class DatePicker extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const { signal } = this.#abort;
    if (this.#isConsolidated) {
      if (this.#yearInput) {
        this.#yearInput.addEventListener(
          "keydown",
          (e) => this.#handleInputKeydown(e, "year"),
          { signal },
        );
      }
      if (this.#monthInput) {
        this.#monthInput.addEventListener(
          "keydown",
          (e) => this.#handleInputKeydown(e, "month"),
          { signal },
        );
      }
      if (this.#dayInput) {
        this.#dayInput.addEventListener(
          "keydown",
          (e) => this.#handleInputKeydown(e, "day"),
          { signal },
        );
      }
    }

    if (this.#isCalendar) {
      this.addEventListener(
        "date-selected",
        (e) => this.#handleDateSelected(e),
        { signal },
      );
      this.#calendarButton.addEventListener(
        "click",
        () => this.#toggleCalendar(),
        { signal },
      );
      this.#calendarPopover.addEventListener(
        "keydown",
        (e) => this.#handlePopoverKeydown(e),
        { signal },
      );
      this.#backdrop.addEventListener("click", () => this.#closeCalendar(), {
        signal,
      });
    }
  }

  #handleDateSelected(e) {
    const { date } = e.detail;
    this.#syncToInputs(date);
    this.#closeCalendar();
  }

  #clearInputs() {
    if (this.#yearInput) this.#yearInput.value = "";
    if (this.#monthInput) this.#monthInput.value = "";
    if (this.#dayInput) this.#dayInput.value = "";
  }

  #syncToInputs(date) {
    if (!date) {
      this.#clearInputs();
      return;
    }
    if (this.#yearInput) {
      this.#yearInput.value = String(date.getFullYear()).padStart(4, "0");
    }
    if (this.#monthInput) {
      this.#monthInput.value = String(date.getMonth() + 1).padStart(2, "0");
    }
    if (this.#dayInput) {
      this.#dayInput.value = String(date.getDate()).padStart(2, "0");
    }
  }

  #toggleCalendar() {
    if (this.#isCalendarOpen) {
      this.#closeCalendar();
    } else {
      this.#openCalendar();
    }
  }

  #openCalendar() {
    const year = this.#yearInput
      ? Number.parseInt(this.#yearInput.value)
      : null;
    const month = this.#monthInput
      ? Number.parseInt(this.#monthInput.value)
      : null;
    const day = this.#dayInput ? Number.parseInt(this.#dayInput.value) : null;

    this.#calendar.setSelectedDate(new Date(year, month - 1, day));

    if (year && month && !Number.isNaN(year) && !Number.isNaN(month)) {
      this.#calendar.setDisplayMonth(year, month - 1);
    }

    this.#calendarPopover.style.display = "block";
    this.#calendarButton.setAttribute("aria-expanded", "true");
    this.#calendar.focus();
  }

  #closeCalendar() {
    this.#calendarPopover.style.display = "none";
    this.#calendarButton.setAttribute("aria-expanded", "false");
    this.#calendarButton.focus();
  }

  #handleInputKeydown(e, fieldType) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const input = e.target;
      const cursorPosition = input.selectionStart;
      const isAtStart = cursorPosition === 0;
      const isAtEnd = cursorPosition === input.value.length;

      if (e.key === "ArrowLeft" && isAtStart) {
        e.preventDefault();
        this.#focusPreviousField(fieldType);
      } else if (e.key === "ArrowRight" && isAtEnd) {
        e.preventDefault();
        this.#focusNextField(fieldType);
      }
    }
  }

  #focusPreviousField(currentField) {
    if (currentField === "month" && this.#yearInput) {
      this.#yearInput.focus();
    } else if (currentField === "day" && this.#monthInput) {
      this.#monthInput.focus();
    }
  }

  #focusNextField(currentField) {
    if (currentField === "year" && this.#monthInput) {
      this.#monthInput.focus();
    } else if (currentField === "month" && this.#dayInput) {
      this.#dayInput.focus();
    }
  }

  #handlePopoverKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.#closeCalendar();
      return;
    }

    if (e.key === "Tab") {
      const focusableElements = this.#getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  #getFocusableElements() {
    const selectors = [
      "button:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    return Array.from(this.#calendarPopover.querySelectorAll(selectors));
  }

  get #isCalendar() {
    return Boolean(this.#calendarButton);
  }

  get #isCalendarOpen() {
    return this.#calendarButton.getAttribute("aria-expanded") === "true";
  }

  get #isConsolidated() {
    return this.getAttribute("data-type") === "consolidated";
  }

  get #yearInput() {
    return this.querySelector("[data-js-year-input]");
  }

  get #monthInput() {
    return this.querySelector("[data-js-month-input]");
  }

  get #dayInput() {
    return this.querySelector("[data-js-day-input]");
  }

  get #calendarButton() {
    return this.querySelector("[data-js-calendar-button]");
  }

  get #calendarPopover() {
    return this.querySelector("[data-js-calendar-popover]");
  }

  get #calendar() {
    return this.querySelector("[data-js-calendar]");
  }

  get #backdrop() {
    return this.querySelector("[data-js-backdrop]");
  }
}

customElements.define("dads-date-picker", DatePicker);
```

#### `src/components/file-upload/file-upload.js`

```js
let activeExpandedComponent = null;

export class FileUpload extends HTMLElement {
  /**
   * @typedef {Object} FileInfo
   * @property {string} id
   * @property {string} name
   * @property {number} size
   * @property {boolean} isExisting
   * @property {HTMLElement} element
   * @property {File} [file]
   * @property {string[]} [errors]
   */
  /** @type {FileInfo[]} */
  files = [];

  /** @type {string[]} */
  errors = [];

  #timers = {};
  #dragCounter = 0;
  #viewportOverlay = null;
  #abort = null;

  static get defaultMessages() {
    return {
      error: {
        maxFiles: "選択できるファイル数が上限を超過しています。",
        maxTotalSize: "選択できるファイルサイズの合計が上限を超過しています。",
        invalidType: "許可されていないファイル形式です。",
        maxFileSize: "ファイルサイズが上限を超過しています。",
        hasFileErrors:
          "選択したファイルにエラーがあります。該当ファイルをチェックしてください。",
      },
      announce: {
        dropAvailable: "ここにドロップできます。",
        dropUnavailable: "ドロップエリア外。",
      },
      label: {
        selectedFiles:
          "選択中：{count}個、{sizeFormatted}（{sizeBytes}バイト）",
      },
    };
  }

  connectedCallback() {
    this.#abort = new AbortController();

    this.#viewportOverlay = this.querySelector("[data-js-viewport-overlay]");
    if (this.#viewportOverlay) {
      document.body.appendChild(this.#viewportOverlay);
    }

    this.#loadExistingFiles();
    this.#setupEventListeners();
    this.#updateUI();
  }

  disconnectedCallback() {
    this.#abort.abort();
    this.#clearAllTimers();

    if (this.#viewportOverlay) {
      this.appendChild(this.#viewportOverlay);
    }
  }

  addFiles(files) {
    const filesToAdd = this.#isMultiple ? files : files.slice(0, 1);

    if (!this.#isMultiple && this.files.length > 0) {
      this.files.forEach((file) => {
        if (file.element) {
          file.element.remove();
        }
      });
      this.files = [];
    }

    const newFiles = filesToAdd.map((file) => ({
      id: `file-${Math.random().toString(36).slice(-8)}`,
      file: file,
      name: file.name,
      size: file.size,
      isExisting: false,
      errors: [],
    }));

    this.files.push(...newFiles);
    this.#validateFiles();
    this.#updateUI();
  }

  removeFile(fileId) {
    const index = this.files.findIndex((f) => f.id === fileId);
    if (index === -1) return;

    const file = this.files[index];
    if (file.element) {
      file.element.remove();
    }
    this.files.splice(index, 1);
    this.#validateFiles();
    this.#updateUI();
  }

  #setExpandedDropArea(expanded) {
    if (this.#expandDropAreaCheckbox) {
      this.#expandDropAreaCheckbox.checked = expanded;
    }
  }

  #clearAllTimers() {
    for (const key in this.#timers) {
      clearTimeout(this.#timers[key]);
      clearInterval(this.#timers[key]);
    }
    this.#timers = {};
  }

  #setupEventListeners() {
    const signal = this.#abort.signal;

    this.#selectButton.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        this.#fallbackInput.click();
      },
      { signal },
    );

    this.#fallbackInput.addEventListener(
      "change",
      (e) => {
        const files = Array.from(e.target.files || []);
        this.addFiles(files);
        this.#fallbackInput.value = "";
        this.#selectButton.focus();
      },
      { signal },
    );

    const dropZone = this.#dropArea || this.#selectButton;

    dropZone.addEventListener(
      "dragenter",
      () => {
        this.#dragCounter++;
        if (this.#dragCounter === 1) {
          dropZone.setAttribute("data-dragover", "true");
          this.#startDropAnnounce();
        }
      },
      { signal },
    );

    dropZone.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      },
      { signal },
    );

    dropZone.addEventListener(
      "dragleave",
      () => {
        this.#dragCounter--;
        if (this.#dragCounter === 0) {
          dropZone.removeAttribute("data-dragover");
          this.#stopDropAnnounce();
          this.#announceText(
            this.#getMessage("announce", "dropUnavailable"),
            true,
          );
        }
      },
      { signal },
    );

    dropZone.addEventListener(
      "drop",
      (e) => {
        e.preventDefault();
        this.#dragCounter = 0;
        dropZone.removeAttribute("data-dragover");
        this.#stopDropAnnounce();

        const files = Array.from(e.dataTransfer?.files || []);
        this.addFiles(files);
        this.#selectButton.focus();
      },
      { signal },
    );

    this.#expandDropAreaCheckbox?.addEventListener(
      "change",
      (e) => {
        if (e.target.checked) {
          if (activeExpandedComponent && activeExpandedComponent !== this) {
            activeExpandedComponent.#setExpandedDropArea(false);
          }
          activeExpandedComponent = this;
        } else {
          if (activeExpandedComponent === this) {
            activeExpandedComponent = null;
          }
        }
      },
      { signal },
    );

    document.documentElement.addEventListener(
      "dragover",
      (e) => {
        if (this.#expandDropAreaCheckbox?.checked) {
          e.preventDefault();
          this.#showViewportOverlay();
        }
      },
      { signal },
    );

    this.#viewportOverlay?.addEventListener(
      "dragenter",
      () => {
        this.#dragCounter++;
        if (this.#dragCounter === 1) {
          this.#startDropAnnounce();
        }
      },
      { signal },
    );

    this.#viewportOverlay?.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#resetDragOverTimeout();
        e.dataTransfer.dropEffect = "copy";
      },
      { signal },
    );

    this.#viewportOverlay?.addEventListener(
      "dragleave",
      () => {
        this.#dragCounter--;
        if (this.#dragCounter === 0) {
          this.#hideViewportOverlay();
          this.#stopDropAnnounce();
          this.#announceText(
            this.#getMessage("announce", "dropUnavailable"),
            true,
          );
        }
      },
      { signal },
    );

    this.#viewportOverlay?.addEventListener(
      "drop",
      (e) => {
        e.preventDefault();
        this.#dragCounter = 0;
        this.#hideViewportOverlay();
        this.#stopDropAnnounce();

        const files = Array.from(e.dataTransfer?.files || []);
        this.addFiles(files);
        this.#selectButton.focus();
      },
      { signal },
    );

    // Remove button delegation
    this.addEventListener(
      "click",
      ({ target }) => {
        if (!target.closest("[data-js-remove-button]")) return;

        const listItem = target.closest("li");
        const fileId = listItem?.dataset.id;
        const fileIndex = this.files.findIndex((f) => f.id === fileId);

        this.removeFile(fileId);
        this.#focusAfterFileRemoval(fileIndex);
      },
      { signal },
    );
  }

  #startDropAnnounce() {
    this.#stopDropAnnounce();

    const message = this.#getMessage("announce", "dropAvailable");

    this.#announceText(message, true);

    this.#timers.drop = setInterval(() => {
      this.#announceText(message);
    }, 3000);
  }

  #stopDropAnnounce() {
    clearInterval(this.#timers.drop);
  }

  #announceText(text, assertive = false) {
    const announcer = assertive ? this.#announcerAssertive : this.#announcer;
    if (!announcer || !text) return;

    const timerKey = `announce_${assertive ? "assertive" : "polite"}`;
    clearTimeout(this.#timers[timerKey]);

    announcer.textContent = "";

    this.#timers[timerKey] = setTimeout(() => {
      announcer.textContent = text;
      this.#timers[timerKey] = setTimeout(() => {
        announcer.textContent = "";
      }, 1000);
    }, 100);
  }

  #resetDragOverTimeout() {
    clearTimeout(this.#timers.dragover);

    this.#timers.dragover = setTimeout(() => {
      if (
        this.#viewportOverlay &&
        !this.#viewportOverlay.hasAttribute("hidden")
      ) {
        this.#dragCounter = 0;
        this.#hideViewportOverlay();
      }
    }, 300);
  }

  #showViewportOverlay() {
    this.#viewportOverlay.removeAttribute("hidden");
  }

  #hideViewportOverlay() {
    this.#viewportOverlay.setAttribute("hidden", "");
  }

  #focusAfterFileRemoval(index) {
    const totalCount = this.files.length;

    if (totalCount === 0) {
      this.#selectButton.focus();
    } else if (index < this.files.length) {
      const nextFile = this.files[index];
      nextFile.element.querySelector("[data-js-remove-button]")?.focus();
    } else {
      const lastFile = this.files[this.files.length - 1];
      lastFile.element.querySelector("[data-js-remove-button]")?.focus();
    }
  }

  #getMessage(category, key, variables = {}) {
    const datasetKey = `${category}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    let template = this.dataset[datasetKey];

    if (!template) {
      template = FileUpload.defaultMessages[category]?.[key] || "";
    }

    return template.replace(/\{(\w+)\}/g, (match, variable) => {
      return variables[variable] !== undefined ? variables[variable] : match;
    });
  }

  #loadExistingFiles() {
    const existingItems = this.#fileList.querySelectorAll(":scope > li");
    existingItems.forEach((item) => {
      const fileId = `file-${Math.random().toString(36).slice(-8)}`;
      item.dataset.id = fileId;

      const fileNameEl = item.querySelector('[data-slot="fileName"]');
      const fileSizeEl = item.querySelector('[data-slot="fileSizeBytes"]');
      const fileSizeText = fileSizeEl?.textContent.trim() ?? "0";

      const removeButton = item.querySelector("[data-js-remove-button]");

      if (fileNameEl && removeButton) {
        const nameId = `${fileId}-name`;
        const buttonId = `${fileId}-remove`;

        fileNameEl.id = nameId;
        removeButton.id = buttonId;
        removeButton.setAttribute("aria-labelledby", `${buttonId} ${nameId}`);
      }

      const fileInfo = {
        id: fileId,
        name: fileNameEl?.textContent.trim() ?? "",
        size: Number.parseInt(fileSizeText.replace(/,/g, ""), 10),
        isExisting: true,
        element: item,
      };
      this.files.push(fileInfo);
    });
  }

  #validateFiles() {
    this.errors = [];
    this.files.forEach((fileInfo) => {
      if (!fileInfo.isExisting) {
        fileInfo.errors = [];
      }
    });

    const newFiles = this.files.filter((f) => !f.isExisting);

    const maxFiles = Number.parseInt(this.getAttribute("max-files"), 10);
    if (!Number.isNaN(maxFiles) && this.files.length > maxFiles) {
      this.errors.push(
        this.#getMessage("error", "maxFiles", {
          max: maxFiles,
          current: this.files.length,
        }),
      );
    }

    const accept = this.#fallbackInput.accept;
    const allowedExtensions = parseAcceptAttribute(accept);
    const maxFileSize = parseSize(this.getAttribute("max-file-size"));
    const maxTotalSize = parseSize(this.getAttribute("max-total-size"));
    const totalSize = this.files.reduce((sum, fileInfo) => {
      return sum + (fileInfo.size || 0);
    }, 0);

    newFiles.forEach((fileInfo) => {
      if (allowedExtensions.length > 0) {
        const ext = getFileExtension(fileInfo.name);
        const mimeType = fileInfo.file.type;

        if (!isFileTypeAllowed(ext, mimeType, allowedExtensions)) {
          fileInfo.errors.push(this.#getMessage("error", "invalidType"));
        }
      }

      if (maxFileSize && fileInfo.size > maxFileSize) {
        const { size1: maxFormatted, size2: currentFormatted } =
          formatSizeWithDiff(maxFileSize, fileInfo.size);
        fileInfo.errors.push(
          this.#getMessage("error", "maxFileSize", {
            max: maxFormatted,
            current: currentFormatted,
          }),
        );
      }
    });

    if (maxTotalSize && totalSize > maxTotalSize) {
      const { size1: maxFormatted, size2: currentFormatted } =
        formatSizeWithDiff(maxTotalSize, totalSize);
      this.errors.push(
        this.#getMessage("error", "maxTotalSize", {
          max: maxFormatted,
          current: currentFormatted,
        }),
      );
    }

    const hasFileErrors = this.files.some((f) => f.errors?.length > 0);
    if (hasFileErrors) {
      this.errors.unshift(this.#getMessage("error", "hasFileErrors"));
    }
  }

  #updateUI() {
    this.#updateSelectedFilesMessage();
    this.#updateErrorMessages();
    this.#updateFileList();

    if (this.files.length === 0) {
      this.#emptyMessage.removeAttribute("hidden");
      this.#fileList.setAttribute("hidden", "");
    } else {
      this.#emptyMessage.setAttribute("hidden", "");
      this.#fileList.removeAttribute("hidden");
    }

    this.setAttribute("data-multiple", this.#isMultiple ? "true" : "false");

    if (this.errors.length > 0) {
      this.setAttribute("data-has-error", "true");
    } else {
      this.removeAttribute("data-has-error");
    }
  }

  #updateSelectedFilesMessage() {
    if (this.files.length === 0) {
      this.#selectSummary.textContent = "";
      return;
    }

    const currentFileCount = this.files.length;
    const currentTotalSize = this.files.reduce((sum, f) => sum + f.size, 0);
    const sizeFormatted = formatSize(currentTotalSize);
    const sizeBytes = currentTotalSize.toLocaleString();

    const message = this.#getMessage("label", "selectedFiles", {
      count: currentFileCount,
      sizeFormatted: sizeFormatted,
      sizeBytes: sizeBytes,
    });

    this.#selectSummary.textContent = message;
  }

  #updateErrorMessages() {
    this.#errorMessagesContainer.innerHTML = "";

    for (const errorText of this.errors) {
      const li = document.createElement("li");
      li.textContent = `＊${errorText}`;
      this.#errorMessagesContainer.appendChild(li);
    }
  }

  #updateFileList() {
    const newFiles = this.files.filter((f) => !f.element);

    newFiles.forEach((fileInfo) => {
      const li = this.#createFileItem(fileInfo);
      fileInfo.element = li;
      this.#fileList.appendChild(li);
    });
  }

  #createFileItem(fileInfo) {
    const hasErrors = fileInfo.errors && fileInfo.errors.length > 0;

    const clone = this.#fileItemTemplate.content.cloneNode(true);

    const slots = {
      fileName: fileInfo.name,
      fileSize: formatSize(fileInfo.size),
      fileSizeBytes: fileInfo.size.toLocaleString(),
    };

    Object.entries(slots).forEach(([key, value]) => {
      const elements = clone.querySelectorAll(`[data-slot="${key}"]`);
      elements.forEach((element) => {
        element.textContent = value;
      });
    });

    const li = clone.firstElementChild;
    li.dataset.id = fileInfo.id;

    const fileNameElement = li.querySelector('[data-slot="fileName"]');
    const removeButton = li.querySelector("[data-js-remove-button]");

    if (fileNameElement && removeButton) {
      const nameId = `${fileInfo.id}-name`;
      const removeId = `${fileInfo.id}-remove`;

      fileNameElement.id = nameId;
      removeButton.id = removeId;
      removeButton.setAttribute("aria-labelledby", `${removeId} ${nameId}`);
    }

    if (hasErrors) {
      li.setAttribute("data-error", "true");

      const infoDiv = li.querySelector("[data-js-file-info]");
      if (infoDiv) {
        fileInfo.errors.forEach((errorText) => {
          const errorP = document.createElement("p");
          errorP.textContent = `＊${errorText}`;
          infoDiv.appendChild(errorP);
        });
      }
    }

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = this.#fallbackInput.name;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(fileInfo.file);
    fileInput.files = dataTransfer.files;

    li.appendChild(fileInput);

    return li;
  }

  get #dropArea() {
    return this.querySelector("[data-js-drop-area]");
  }

  get #fallbackInput() {
    return this.querySelector("[data-js-input]");
  }

  get #selectButton() {
    return this.querySelector("[data-js-select-button]");
  }

  get #emptyMessage() {
    return this.querySelector("[data-js-empty-message]");
  }

  get #fileList() {
    return this.querySelector("[data-js-file-list]");
  }

  get #errorMessagesContainer() {
    return this.querySelector("[data-js-error-messages]");
  }

  get #fileItemTemplate() {
    return this.querySelector("[data-js-template]");
  }

  get #expandDropAreaCheckbox() {
    return this.querySelector("[data-js-expand-drop-area]");
  }

  get #announcer() {
    return this.querySelector("[data-js-announcer]");
  }

  get #announcerAssertive() {
    return this.querySelector("[data-js-announcer-assertive]");
  }

  get #selectSummary() {
    return this.querySelector("[data-js-select-summary]");
  }

  get #isMultiple() {
    return this.#fallbackInput.hasAttribute("multiple");
  }
}

customElements.define("dads-file-upload", FileUpload);

/* Utility Functions */

export function parseSize(sizeStr) {
  if (!sizeStr) return null;

  const units = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
  };

  const match = sizeStr
    .toLowerCase()
    .match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2] || "b";

  return value * units[unit];
}

export function formatSize(bytes, precision = null) {
  if (bytes === 0) return "0B";

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const decimals = precision !== null ? precision : i > 0 ? 1 : 0;
  return `${parseFloat((bytes / k ** i).toFixed(decimals))}${units[i]}`;
}

export function formatSizeWithDiff(bytes1, bytes2) {
  if (bytes1 === 0) return { size1: "0B", size2: formatSize(bytes2) };
  if (bytes2 === 0) return { size1: formatSize(bytes1), size2: "0B" };

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i1 = Math.floor(Math.log(bytes1) / Math.log(k));
  const i2 = Math.floor(Math.log(bytes2) / Math.log(k));

  const i = Math.max(i1, i2);
  const value1 = bytes1 / k ** i;
  const value2 = bytes2 / k ** i;

  if (i === 0 || value1 === value2) {
    const precision = i > 0 ? 1 : 0;
    return {
      size1: formatSize(bytes1, precision),
      size2: formatSize(bytes2, precision),
    };
  }

  let precision = 1;
  while (true) {
    const formatted1 = value1.toFixed(precision);
    const formatted2 = value2.toFixed(precision);
    if (formatted1 !== formatted2) {
      return {
        size1: `${parseFloat(formatted1)}${units[i]}`,
        size2: `${parseFloat(formatted2)}${units[i]}`,
      };
    }
    precision++;
  }
}

export function parseAcceptAttribute(accept) {
  if (!accept) return [];
  return accept.split(",").map((s) => s.trim().toLowerCase());
}

export function getFileExtension(filename) {
  const match = filename.match(/\.([^.]+)$/);
  return match ? `.${match[1].toLowerCase()}` : "";
}

export function isFileTypeAllowed(ext, mimeType, allowedExtensions) {
  return allowedExtensions.some((allowed) => {
    if (allowed.includes("/*")) {
      const [category] = allowed.split("/");
      return mimeType.startsWith(`${category}/`);
    }
    if (allowed.startsWith(".")) {
      return ext === allowed;
    }
    return mimeType === allowed;
  });
}
```

#### `src/components/language-selector/language-selector.js`

```js
export class LanguageSelector extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const { signal } = this.#abort;
    this.#opener.addEventListener("click", (e) => this.#handleOpenerClick(e), {
      signal,
    });
    this.#opener.addEventListener(
      "keydown",
      (e) => this.#handleOpenerKeydown(e),
      { signal },
    );
    this.#menu.addEventListener("keydown", (e) => this.#handleMenuKeydown(e), {
      signal,
    });
    this.#menu.addEventListener(
      "focusout",
      (e) => this.#handleMenuFocusOut(e),
      { signal },
    );
    document.addEventListener("click", (e) => this.#handleClickOutside(e), {
      signal,
    });
    document.addEventListener("keydown", (e) => this.#handleEscape(e), {
      signal,
    });
    this.addEventListener(
      "click",
      (event) => {
        if (event.target.closest("[data-js-menu-item]"))
          this.#handleMenuItemClick();
      },
      { signal },
    );
  }

  #handleOpenerClick(event) {
    event.preventDefault();
    this.#toggleMenu();
  }

  #handleOpenerKeydown(event) {
    if (!this.#isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.#focusFirstMenuItem();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.#focusLastMenuItem();
        break;
    }
  }

  #handleMenuKeydown(event) {
    if (!this.#isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.#focusNextMenuItem();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.#focusPreviousMenuItem();
        break;
      case "Home":
        event.preventDefault();
        this.#focusFirstMenuItem();
        break;
      case "End":
        event.preventDefault();
        this.#focusLastMenuItem();
        break;
    }
  }

  #handleMenuItemClick() {
    this.#closeMenu();
    this.#opener.focus();
  }

  #handleClickOutside(event) {
    if (!this.#isOpen) return;
    if (!this.contains(event.target)) {
      this.#closeMenu();
    }
  }

  #handleMenuFocusOut(event) {
    if (!this.#isOpen) return;
    if (!event.relatedTarget) return;

    if (!this.contains(event.relatedTarget)) {
      this.#closeMenu();
    }
  }

  #handleEscape(event) {
    if (event.key === "Escape" && this.#isOpen) {
      event.preventDefault();
      this.#closeMenu();
      this.#opener.focus();
    }
  }

  #toggleMenu() {
    if (this.#isOpen) {
      this.#closeMenu();
    } else {
      this.#openMenu();
    }
  }

  #openMenu() {
    this.#popup.hidden = false;
    this.#opener.setAttribute("aria-expanded", "true");
  }

  #closeMenu() {
    this.#popup.hidden = true;
    this.#opener.setAttribute("aria-expanded", "false");
  }

  #focusFirstMenuItem() {
    this.#focusItem(0);
  }

  #focusLastMenuItem() {
    this.#focusItem(this.#menuItems.length - 1);
  }

  #focusNextMenuItem() {
    if (this.#currentIndex >= this.#menuItems.length - 1) {
      this.#focusItem(0);
    } else {
      this.#focusItem(this.#currentIndex + 1);
    }
  }

  #focusPreviousMenuItem() {
    if (this.#currentIndex <= 0) {
      this.#focusItem(this.#menuItems.length - 1);
    } else {
      this.#focusItem(this.#currentIndex - 1);
    }
  }

  #focusItem(index) {
    this.#menuItems[index]?.focus();
  }

  get #opener() {
    return this.querySelector("[data-js-opener]");
  }

  get #popup() {
    return this.querySelector("[data-js-popup]");
  }

  get #menu() {
    return this.querySelector("[data-js-menu]");
  }

  get #menuItems() {
    return Array.from(this.querySelectorAll("[data-js-menu-item]"));
  }

  get #isOpen() {
    return this.#opener.getAttribute("aria-expanded") === "true";
  }

  get #currentIndex() {
    return this.#menuItems.findIndex((item) => item === document.activeElement);
  }
}

customElements.define("dads-language-selector", LanguageSelector);
```

#### `src/components/menu-list-box/menu-list-box.js`

```js
export class MenuListBox extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const { signal } = this.#abort;
    this.#opener.addEventListener("click", (e) => this.#handleOpenerClick(e), {
      signal,
    });
    this.#opener.addEventListener(
      "keydown",
      (e) => this.#handleOpenerKeydown(e),
      { signal },
    );
    this.#menu.addEventListener("keydown", (e) => this.#handleMenuKeydown(e), {
      signal,
    });
    this.#menu.addEventListener(
      "focusout",
      (e) => this.#handleMenuFocusOut(e),
      { signal },
    );
    document.addEventListener("click", (e) => this.#handleClickOutside(e), {
      signal,
    });
    document.addEventListener("keydown", (e) => this.#handleEscape(e), {
      signal,
    });
    this.addEventListener(
      "click",
      (event) => {
        const item = event.target.closest("[data-js-menu-item]");
        if (item) this.#selectMenuItem(item);
      },
      { signal },
    );
  }

  #handleOpenerClick(event) {
    event.preventDefault();
    this.#toggleMenu();
    if (this.#isOpen) {
      this.#focusFirstMenuItem();
    }
  }

  #handleOpenerKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.#openMenu();
        this.#focusFirstMenuItem();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.#openMenu();
        this.#focusLastMenuItem();
        break;
    }
  }

  #handleMenuKeydown(event) {
    if (!this.#isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.#focusNextMenuItem();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.#focusPreviousMenuItem();
        break;
      case "Home":
        event.preventDefault();
        this.#focusFirstMenuItem();
        break;
      case "End":
        event.preventDefault();
        this.#focusLastMenuItem();
        break;
    }
  }

  #handleClickOutside(event) {
    if (!this.#isOpen) return;
    if (!this.contains(event.target)) {
      this.#closeMenu();
    }
  }

  #handleMenuFocusOut(event) {
    if (!this.#isOpen) return;
    if (!event.relatedTarget) return;

    if (!this.contains(event.relatedTarget)) {
      this.#closeMenu();
    }
  }

  #handleEscape(event) {
    if (event.key === "Escape" && this.#isOpen) {
      event.preventDefault();
      this.#closeMenu();
      this.#opener.focus();
    }
  }

  #toggleMenu() {
    if (this.#isOpen) {
      this.#closeMenu();
    } else {
      this.#openMenu();
    }
  }

  #openMenu() {
    this.#popup.hidden = false;
    this.#opener.setAttribute("aria-expanded", "true");
  }

  #closeMenu() {
    this.#popup.hidden = true;
    this.#opener.setAttribute("aria-expanded", "false");
  }

  #focusFirstMenuItem() {
    this.#focusItem(0);
  }

  #focusLastMenuItem() {
    this.#focusItem(this.#menuItems.length - 1);
  }

  #focusNextMenuItem() {
    if (this.#currentIndex >= this.#menuItems.length - 1) {
      this.#focusItem(0);
    } else {
      this.#focusItem(this.#currentIndex + 1);
    }
  }

  #focusPreviousMenuItem() {
    if (this.#currentIndex <= 0) {
      this.#focusItem(this.#menuItems.length - 1);
    } else {
      this.#focusItem(this.#currentIndex - 1);
    }
  }

  #focusItem(index) {
    const menuItems = this.#menuItems;

    if (index >= 0 && index < menuItems.length) {
      menuItems.forEach((item) => {
        item.setAttribute("tabindex", "-1");
      });
      menuItems[index].setAttribute("tabindex", "0");
      menuItems[index].focus();
    }
  }

  #selectMenuItem(menuItem) {
    const selectedText = menuItem.textContent.trim();

    this.dispatchEvent(
      new CustomEvent("menuitemselect", {
        bubbles: true,
        detail: {
          selectedItem: menuItem,
          selectedValue: selectedText,
          selectedIndex: this.#menuItems.indexOf(menuItem),
        },
      }),
    );

    this.#closeMenu();
    this.#opener.focus();
  }

  get #opener() {
    return this.querySelector("[data-js-opener]");
  }

  get #popup() {
    return this.querySelector("[data-js-popup]");
  }

  get #menu() {
    return this.querySelector("[data-js-menu]");
  }

  get #menuItems() {
    return Array.from(this.querySelectorAll("[data-js-menu-item]"));
  }

  get #isOpen() {
    return this.#opener.getAttribute("aria-expanded") === "true";
  }

  get #currentIndex() {
    return this.#menuItems.findIndex((item) => item === document.activeElement);
  }
}

customElements.define("dads-menu-list-box", MenuListBox);
```

#### `src/components/progress-indicator/progress-indicator.js`

```js
class ProgressIndicator extends HTMLElement {
  static DEFAULT_ANNOUNCE_INTERVAL_MS = 5000;

  static get observedAttributes() {
    return ["value", "active"];
  }

  static get defaultMessages() {
    return {
      announce: {
        start: "読み込みを開始しました",
        end: "読み込みが完了しました",
        long: "読み込み中です",
        longWithValue: "{value}% 読み込みました。",
      },
      label: {
        defaultLabel: "読み込み中",
      },
    };
  }

  #announcerEl = null;
  #longTimer = 0;
  #repeatTimer = 0;
  #announceTimer = 0;

  connectedCallback() {
    this.#validateIntent();
    this.#setupAnnouncer();
    this.#setup();
    this.#updateValue();

    if (this.active) {
      this.#handleStart();
    }
  }

  disconnectedCallback() {
    this.#clearTimers();
    this.#announcerEl?.remove();
    this.#announcerEl = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.#updateValue();
    }

    if (name === "active") {
      if (newValue !== null) {
        this.#handleStart();
      } else {
        this.#handleStop();
      }
    }
  }

  // --- Public properties ---

  get value() {
    const value = this.getAttribute("value");
    if (value === null || value === "") {
      return null;
    }
    const numValue = Number(value);
    return Number.isNaN(numValue) ? null : Math.min(100, Math.max(0, numValue));
  }

  set value(val) {
    if (val === null || val === undefined) {
      this.removeAttribute("value");
      return;
    }
    const numValue = Math.min(100, Math.max(0, Number(val) || 0));
    this.setAttribute("value", String(numValue));
  }

  get active() {
    return this.hasAttribute("active");
  }

  set active(val) {
    if (val) {
      this.setAttribute("active", "");
    } else {
      this.removeAttribute("active");
    }
  }

  start() {
    this.setAttribute("active", "");
  }

  stop() {
    this.removeAttribute("active");
  }

  get intent() {
    const val = this.getAttribute("intent");
    if (val === "explicit" || val === "passive") return val;
    return null;
  }

  get announceInterval() {
    const val = this.getAttribute("announce-interval");
    if (val === null || val === "") {
      return ProgressIndicator.DEFAULT_ANNOUNCE_INTERVAL_MS;
    }
    const num = Number(val);
    if (!Number.isFinite(num) || num <= 0) {
      return ProgressIndicator.DEFAULT_ANNOUNCE_INTERVAL_MS;
    }
    return num * 1000;
  }

  // --- Private methods ---

  #validateIntent() {
    const val = this.getAttribute("intent");
    if (val !== "explicit" && val !== "passive") {
      throw new Error(
        `[dads-progress-indicator] "intent" 属性は必須です。"explicit" または "passive" を指定してください。`,
      );
    }
  }

  #setupAnnouncer() {
    if (this.#announcerEl) return;

    const el = document.createElement("span");
    el.setAttribute("role", "status");

    // Visually hidden
    el.style.cssText =
      "clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";

    this.after(el);
    this.#announcerEl = el;
  }

  #setup() {
    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", "100");

    const label = this.label;
    if (label && label.textContent.trim() !== "") {
      const labelId = `dads-pi-${crypto.randomUUID()}`;
      label.id = labelId;
      this.setAttribute("aria-labelledby", labelId);
    } else {
      label?.remove();
      this.setAttribute(
        "aria-label",
        this.#getMessage("label", "defaultLabel"),
      );
    }
  }

  #updateValue() {
    const value = this.value;

    if (value !== null) {
      this.indicator?.removeAttribute("data-indeterminate");
      this.setAttribute("aria-valuenow", String(value));
      this.style.setProperty("--value", String(value));

      if (this.percentage) {
        const intValue = Math.round(value);
        this.percentage.innerHTML = ` (<span>${intValue}</span>%)`;
      }
    } else {
      this.indicator?.setAttribute("data-indeterminate", "");
      this.removeAttribute("aria-valuenow");
      this.style.removeProperty("--value");

      if (this.percentage) {
        this.percentage.textContent = "";
      }
    }
  }

  #shouldAnnounce() {
    return this.intent === "explicit";
  }

  #getMessage(category, key, variables = {}) {
    const datasetKey = `${category}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    let template = this.dataset[datasetKey];

    if (!template) {
      template = ProgressIndicator.defaultMessages[category]?.[key] || "";
    }

    return template.replace(/\{(\w+)\}/g, (match, variable) => {
      return variables[variable] !== undefined ? variables[variable] : match;
    });
  }

  #handleStart() {
    if (this.#shouldAnnounce()) {
      this.#announce(this.#getMessage("announce", "start"));
      this.#scheduleLongAndRepeats();
    }
  }

  #handleStop() {
    this.#clearTimers();

    if (this.#shouldAnnounce()) {
      this.#announce(this.#getMessage("announce", "end"));
    }
  }

  #announce(text) {
    if (!this.#announcerEl) return;

    this.#announceTimer = setTimeout(() => {
      this.#announcerEl.textContent = text;
      this.#announceTimer = setTimeout(() => {
        this.#announcerEl.textContent = "";
      }, 1000);
    }, 100);
  }

  #announceLong() {
    const value = this.value;
    if (value !== null) {
      this.#announce(
        this.#getMessage("announce", "longWithValue", {
          value: Math.round(value),
        }),
      );
    } else {
      this.#announce(this.#getMessage("announce", "long"));
    }
  }

  #scheduleLongAndRepeats() {
    if (!this.#shouldAnnounce()) return;
    this.#clearLongTimers();

    const interval = this.announceInterval;

    this.#longTimer = setTimeout(() => {
      if (!this.active || !this.#shouldAnnounce()) return;

      this.#announceLong();

      this.#repeatTimer = setInterval(() => {
        if (!this.active || !this.#shouldAnnounce()) return;
        this.#announceLong();
      }, interval);
    }, interval);
  }

  #clearLongTimers() {
    clearTimeout(this.#longTimer);
    clearInterval(this.#repeatTimer);
  }

  #clearTimers() {
    this.#clearLongTimers();
    clearTimeout(this.#announceTimer);
  }

  // --- DOM references ---

  get label() {
    return this.querySelector("[data-js-label]");
  }

  get indicator() {
    return this.querySelector("[data-js-indicator]");
  }

  get percentage() {
    return this.querySelector("[data-js-percentage]");
  }
}

customElements.define("dads-progress-indicator", ProgressIndicator);
```

#### `src/components/switch/switch-mode.js`

```js
export class SwitchMode extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const signal = this.#abort.signal;

    this.addEventListener(
      "click",
      (e) => {
        const button = e.target.closest("[data-js-option]");
        if (!button || !this.contains(button)) return;
        this.#select(button);
      },
      { signal },
    );
  }

  #select(button) {
    if (this.#isDisabled(button)) return;

    const checked = button.getAttribute("aria-checked") !== "true";

    for (const option of this.#options) {
      option.setAttribute(
        "aria-checked",
        option === button ? String(checked) : String(!checked),
      );
    }

    button.dispatchEvent(new Event("input", { bubbles: true }));
    button.dispatchEvent(new Event("change", { bubbles: true }));
  }

  #isDisabled(button) {
    return button.disabled || button.getAttribute("aria-disabled") === "true";
  }

  get #options() {
    return this.querySelectorAll("[data-js-option]");
  }
}

customElements.define("dads-switch-mode", SwitchMode);
```

#### `src/components/switch/switch-on-off.js`

```js
export class SwitchOnOff extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupEventListeners() {
    const signal = this.#abort.signal;

    this.addEventListener(
      "click",
      (e) => {
        const button = e.target.closest("[data-js-toggle]");
        if (!button || !this.contains(button)) return;
        this.#toggle(button);
      },
      { signal },
    );
  }

  #toggle(button) {
    if (this.#isDisabled(button)) return;

    const checked = button.getAttribute("aria-checked") !== "true";
    button.setAttribute("aria-checked", String(checked));

    button.dispatchEvent(new Event("input", { bubbles: true }));
    button.dispatchEvent(new Event("change", { bubbles: true }));
  }

  #isDisabled(button) {
    return button.disabled || button.getAttribute("aria-disabled") === "true";
  }
}

customElements.define("dads-switch-on-off", SwitchOnOff);
```

#### `src/components/tab/tab-aria.js`

```js
export class TabAria extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setupIds();
    this.#initializeVisibility();
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  #setupIds() {
    const id = this.id || `dads-tab-${Math.random().toString(36).slice(-8)}`;
    const tabs = this.#tabs;
    const panels = this.#panels;

    tabs.forEach((tab, index) => {
      const tabId = `${id}-tab-${index}`;
      const href = tab.getAttribute("href");
      const hrefTarget = href?.startsWith("#") ? href.slice(1) : null;
      const panel = hrefTarget
        ? this.querySelector(`#${CSS.escape(hrefTarget)}[role="tabpanel"]`)
        : panels[index];
      const panelId = panel?.id || `${id}-panel-${index}`;

      tab.id = tabId;
      tab.setAttribute("aria-controls", panelId);

      if (panel) {
        panel.id = panelId;
        panel.setAttribute("aria-labelledby", tabId);
      }
    });
  }

  #initializeVisibility() {
    const tabs = this.#tabs;
    const panels = this.#panels;

    const selectedIndex = tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );
    const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
      tab.setAttribute("tabindex", i === activeIndex ? "0" : "-1");
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== activeIndex;
    });
  }

  #setupEventListeners() {
    const { signal } = this.#abort;

    this.#tablist.addEventListener(
      "click",
      (e) => {
        const tab = e.target.closest('[role="tab"]');
        if (tab) this.#handleTabClick(e, tab);
      },
      { signal },
    );

    this.#tablist.addEventListener(
      "auxclick",
      (e) => {
        const tab = e.target.closest('[role="tab"]');
        if (tab) this.#handleTabAuxclick(e);
      },
      { signal },
    );

    this.#tablist.addEventListener(
      "keydown",
      (e) => {
        const tab = e.target.closest('[role="tab"]');
        if (tab) this.#handleTabKeydown(e);
      },
      { signal },
    );
  }

  #handleTabClick(event, tab) {
    event.preventDefault();
    this.selectTab(tab);
  }

  #handleTabAuxclick(event) {
    // ミドルクリック（新しいタブで開く）を抑制
    if (event.button === 1) {
      event.preventDefault();
    }
  }

  #handleTabKeydown(event) {
    const { key } = event;
    const isManual = this.#isManualActivation;

    const focusedTab = event.target.closest('[role="tab"]');
    if (!focusedTab) return;

    const tabs = this.#tabs;
    const currentIndex = tabs.indexOf(focusedTab);

    const activate = isManual
      ? (tab) => this.#focusTab(tab)
      : (tab) => this.selectTab(tab);

    if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
      activate(tabs[prevIndex]);
    } else if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
      activate(tabs[nextIndex]);
    } else if (key === "Home") {
      event.preventDefault();
      activate(tabs[0]);
    } else if (key === "End") {
      event.preventDefault();
      activate(tabs[tabs.length - 1]);
    } else if (key === " " && isManual) {
      event.preventDefault();
      this.selectTab(focusedTab);
    }
  }

  #focusTab(tab) {
    tab.focus();
  }

  selectTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    const panel = panelId
      ? this.querySelector(`#${CSS.escape(panelId)}`)
      : null;

    for (const t of this.#tabs) {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    }

    for (const p of this.#panels) {
      p.hidden = true;
    }

    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.focus();

    if (panel) {
      panel.hidden = false;
    }

    this.dispatchEvent(
      new CustomEvent("tab-change", {
        bubbles: true,
        detail: {
          selectedTab: tab,
          selectedTabLabel: tab.textContent.trim(),
          selectedPanel: panel,
          selectedIndex: this.#tabs.indexOf(tab),
        },
      }),
    );
  }

  get #tablist() {
    return this.querySelector('[role="tablist"]');
  }

  get #tabs() {
    return Array.from(this.querySelectorAll('[role="tab"]'));
  }

  get #panels() {
    return Array.from(this.querySelectorAll('[role="tabpanel"]'));
  }

  get #isManualActivation() {
    return this.getAttribute("data-activation") === "manual";
  }
}

customElements.define("dads-tab-aria", TabAria);
```

#### `src/components/tab/tab.js`

```js
export class Tab extends HTMLElement {
  #abort = null;
  #insertedHeadings = [];

  connectedCallback() {
    this.#abort = new AbortController();

    const labelledby = this.#list?.getAttribute("aria-labelledby");
    if (!labelledby) {
      throw new Error(
        "[dads-tab] [data-js-tab-list] に aria-labelledby 属性が必要です。タブ全体の見出し要素のIDを指定してください。",
      );
    }

    const headingEl = document.getElementById(labelledby);
    if (!headingEl) {
      throw new Error(
        `[dads-tab] aria-labelledby="${labelledby}" に対応する要素が見つかりません。`,
      );
    }

    this.#insertPanelHeadings(headingEl);
    this.#selectTab(this.#findActiveIndex());
    this.#setupEventListeners();
  }

  disconnectedCallback() {
    this.#abort.abort();
    for (const heading of this.#insertedHeadings) {
      heading.remove();
    }
    this.#insertedHeadings = [];
  }

  #insertPanelHeadings(headingEl) {
    const match = headingEl.tagName.match(/^H([1-6])$/i);
    const headingLevel = match ? Number.parseInt(match[1], 10) : 2;
    const level = Math.min(headingLevel + 1, 6);

    const tabs = this.#tabs;
    const panels = this.#panels;

    panels.forEach((panel, index) => {
      const tab = tabs[index];
      if (!tab) return;

      const label = tab.textContent.trim();
      const heading = document.createElement(`h${level}`);
      heading.textContent = label;
      heading.setAttribute("tabindex", "-1");

      Object.assign(heading.style, {
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px",
      });

      panel.insertBefore(heading, panel.firstChild);
      this.#insertedHeadings.push(heading);
    });
  }

  #findActiveIndex() {
    return Math.max(
      this.#tabs.findIndex(
        (tab) => tab.getAttribute("aria-current") === "true",
      ),
      0,
    );
  }

  #selectTab(index, moveFocus = false) {
    const tabs = this.#tabs;
    const panels = this.#panels;

    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.setAttribute("aria-current", "true");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });

    if (moveFocus) {
      this.#insertedHeadings[index]?.focus();

      this.dispatchEvent(
        new CustomEvent("tab-change", {
          bubbles: true,
          detail: {
            selectedTab: tabs[index],
            selectedTabLabel: tabs[index].textContent.trim(),
            selectedPanel: panels[index],
            selectedIndex: index,
          },
        }),
      );
    }
  }

  #setupEventListeners() {
    const { signal } = this.#abort;

    this.#list.addEventListener(
      "click",
      (e) => {
        const tab = e.target.closest("[data-js-tab]");
        if (!tab || !this.#list.contains(tab)) return;
        e.preventDefault();

        const index = this.#tabs.indexOf(tab);
        if (index === -1) return;
        this.#selectTab(index, true);
      },
      { signal },
    );
  }

  get #list() {
    return this.querySelector("[data-js-tab-list]");
  }

  get #tabs() {
    return Array.from(this.querySelectorAll("[data-js-tab]"));
  }

  get #panels() {
    return this.#tabs.map((tab) => {
      const hash = new URL(tab.href).hash;
      return hash ? this.querySelector(hash) : null;
    });
  }
}

customElements.define("dads-tab", Tab);
```

#### `src/components/table/scroll-shadow.js`

```js
export class ScrollShadow extends HTMLElement {
  #abort = null;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#setup();
    this.#setupEventListeners();
    this.#update();
  }

  disconnectedCallback() {
    this.#abort.abort();
    this.#teardown();
  }

  #setup() {
    Object.assign(this.style, {
      position: "relative",
      marginRight: "calc(var(--scroll-shadow-padding) * -1)",
      marginLeft: "calc(var(--scroll-shadow-padding) * -1)",
      display: "flex",
      overflowX: "auto",
      paddingRight: "var(--scroll-shadow-padding)",
      paddingBottom: "calc(8 / 16 * 1rem)",
      paddingLeft: "var(--scroll-shadow-padding)",
    });

    this.tabIndex = 0;

    const commonShadowStyles = `
      position: sticky;
      top: 0;
      bottom: 0;
      flex-shrink: 0;
      width: calc(24 / 16 * 1rem);
      transition: opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;`;

    this.insertAdjacentHTML(
      "afterbegin",
      `<div class="dads-scroll-shadow__left" style="
        ${commonShadowStyles}
        left: calc(var(--scroll-shadow-padding) * -1);
        margin-right: calc(-24 / 16 * 1rem);
        background: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
      "></div>`,
    );

    this.insertAdjacentHTML(
      "beforeend",
      `<div class="dads-scroll-shadow__right" style="
        ${commonShadowStyles}
        right: calc(var(--scroll-shadow-padding) * -1);
        margin-left: calc(-24 / 16 * 1rem);
        background: linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent);
      "></div>`,
    );
  }

  #teardown() {
    this.removeAttribute("tabindex");
    this.querySelector(".dads-scroll-shadow__left")?.remove();
    this.querySelector(".dads-scroll-shadow__right")?.remove();
  }

  #setupEventListeners() {
    const { signal } = this.#abort;
    this.addEventListener("scroll", () => this.#update(), { signal });
    window.addEventListener("resize", () => this.#update(), { signal });
  }

  #update() {
    if (this.#leftShadow) {
      this.#leftShadow.style.opacity = this.#hasLeftShadow ? "1" : "0";
    }
    if (this.#rightShadow) {
      this.#rightShadow.style.opacity = this.#hasRightShadow ? "1" : "0";
    }
  }

  get #leftShadow() {
    return this.querySelector(".dads-scroll-shadow__left");
  }

  get #rightShadow() {
    return this.querySelector(".dads-scroll-shadow__right");
  }

  get #hasLeftShadow() {
    const paddingValue = this.#getPaddingValue();
    return this.scrollLeft > paddingValue;
  }

  get #hasRightShadow() {
    const paddingValue = this.#getPaddingValue();
    return this.scrollLeft + this.clientWidth < this.scrollWidth - paddingValue;
  }

  #getPaddingValue() {
    return resolveVarPx(this, "--scroll-shadow-padding");
  }
}

function resolveVarPx(targetEl, varName) {
  const probe = document.createElement("div");
  probe.style.cssText = `
    position:absolute;
    visibility:hidden;
    width:var(${varName});
  `;
  targetEl.appendChild(probe);
  const px = parseFloat(getComputedStyle(probe).width);
  probe.remove();
  return px;
}

customElements.define("dads-scroll-shadow", ScrollShadow);
```

#### `src/components/textarea/textarea-counter.js`

```js
export class TextareaCounter extends HTMLElement {
  #debounceTimer = 0;
  #announceTimer = 0;
  #abort = null;

  static defaultMessages = {
    error: {
      exceeded: "{count}文字超過しています",
    },
    announce: {
      exceeded: "{count}文字超過",
      remaining: "残り{count}文字",
    },
  };

  connectedCallback() {
    this.#render();
    this.#setupEventListeners();
    this.#update({ initial: true });
  }

  disconnectedCallback() {
    this.#abort?.abort();
    clearTimeout(this.#debounceTimer);
    clearTimeout(this.#announceTimer);
  }

  #render() {
    this.innerHTML = `
        <span class="dads-u-visually-hidden" aria-live="assertive" data-announcer="assertive"></span>
        <span class="dads-u-visually-hidden" aria-live="polite" data-announcer="polite"></span>
        <span data-count>${0} / ${this.#max}</span>
      `;
  }

  #setupEventListeners() {
    this.#abort = new AbortController();
    const signal = this.#abort.signal;

    this.#textarea?.addEventListener(
      "input",
      (e) => {
        if (!e.isComposing) {
          this.#update();
        }
      },
      { signal },
    );

    this.#textarea?.addEventListener("compositionend", () => this.#update(), {
      signal,
    });
  }

  #countTextLength(text) {
    return text.length;
  }

  #getMessage(category, key, variables = {}) {
    const datasetKey = `${category}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    let template = this.dataset[datasetKey];

    if (!template) {
      template = TextareaCounter.defaultMessages[category]?.[key] || "";
    }

    return template.replace(/\{(\w+)\}/g, (match, variable) => {
      return variables[variable] !== undefined ? variables[variable] : match;
    });
  }

  #update({ initial = false } = {}) {
    const textarea = this.#textarea;
    const countEl = this.#countEl;
    if (!textarea || !countEl) return;

    const current = this.#countTextLength(textarea.value);
    const remaining = this.#max - current;
    const exceeded = remaining < 0;

    countEl.textContent = `${current} / ${this.#max}`;
    this.toggleAttribute("data-exceeded", exceeded);

    if (exceeded) {
      textarea.setCustomValidity(
        this.#getMessage("error", "exceeded", { count: Math.abs(remaining) }),
      );
    } else {
      textarea.setCustomValidity("");
    }

    if (!initial) {
      if (exceeded) {
        clearTimeout(this.#debounceTimer);
        this.#announce(this.#getAnnounceMessage(remaining, exceeded), true);
      } else {
        this.#scheduleAnnounce(remaining, exceeded);
      }
    }
  }

  #calcDelay(remaining) {
    if (remaining <= 1) return 1000;
    return Math.max(1, Math.log10(remaining)) * 1000;
  }

  #getAnnounceMessage(remaining, exceeded) {
    const key = exceeded ? "exceeded" : "remaining";
    return this.#getMessage("announce", key, { count: Math.abs(remaining) });
  }

  #announce(text, assertive = false) {
    clearTimeout(this.#announceTimer);

    const active = assertive ? "assertive" : "polite";
    const inactive = assertive ? "polite" : "assertive";
    this.#getAnnouncer(inactive).textContent = "";
    this.#getAnnouncer(active).textContent = "";

    this.#announceTimer = window.setTimeout(() => {
      this.#getAnnouncer(active).textContent = text;
    }, 100);
  }

  #scheduleAnnounce(remaining, exceeded) {
    clearTimeout(this.#debounceTimer);

    const delay = this.#calcDelay(remaining);

    this.#debounceTimer = window.setTimeout(() => {
      this.#announce(this.#getAnnounceMessage(remaining, exceeded));
    }, delay);
  }

  #getAnnouncer(type) {
    return this.querySelector(`[data-announcer="${type}"]`);
  }

  get #textarea() {
    const forId = this.getAttribute("for");
    if (!forId) return null;
    return document.getElementById(forId);
  }

  get #max() {
    return parseInt(this.getAttribute("max") ?? "0", 10);
  }

  get #countEl() {
    return this.querySelector("[data-count]");
  }
}

customElements.define("dads-textarea-counter", TextareaCounter);
```

### アセット利用規則

| Source asset | Type | Bytes |
| --- | --- | ---: |
| `src/components/card/card-2.jpg` | `JPG` | 98074 |
| `src/components/card/card-3-1.png` | `PNG` | 4174 |
| `src/components/card/card-3-2.png` | `PNG` | 12969 |
| `src/components/card/card-4.jpg` | `JPG` | 119447 |
| `src/components/card/card-5.jpg` | `JPG` | 121749 |
| `src/components/card/card-6.jpg` | `JPG` | 163165 |
| `src/components/carousel/docs/carousel-1024.webp` | `WEBP` | 19384 |
| `src/components/carousel/docs/carousel-1024@2x.webp` | `WEBP` | 52102 |
| `src/components/carousel/image-1.webp` | `WEBP` | 40562 |
| `src/components/carousel/image-1@2x.webp` | `WEBP` | 107354 |
| `src/components/carousel/image-2.webp` | `WEBP` | 35466 |
| `src/components/carousel/image-2@2x.webp` | `WEBP` | 80276 |
| `src/components/carousel/image-3.webp` | `WEBP` | 43642 |
| `src/components/carousel/image-3@2x.webp` | `WEBP` | 114676 |
| `src/components/carousel/image-4.webp` | `WEBP` | 22634 |
| `src/components/carousel/image-4@2x.webp` | `WEBP` | 43548 |
| `src/components/carousel/image-5.webp` | `WEBP` | 60614 |
| `src/components/carousel/image-5@2x.webp` | `WEBP` | 160882 |
| `src/components/carousel/image-6.webp` | `WEBP` | 62706 |
| `src/components/carousel/image-6@2x.webp` | `WEBP` | 195284 |
| `src/components/carousel/image-7.webp` | `WEBP` | 19662 |
| `src/components/carousel/image-7@2x.webp` | `WEBP` | 47136 |
| `src/components/carousel/image-8.webp` | `WEBP` | 12092 |
| `src/components/carousel/image-8@2x.webp` | `WEBP` | 29648 |
| `src/components/carousel/image-9.webp` | `WEBP` | 67336 |
| `src/components/carousel/image-9@2x.webp` | `WEBP` | 161104 |
| `src/components/image/sample-mobile.png` | `PNG` | 11891 |
| `src/components/image/sample-mobile@2x.png` | `PNG` | 32812 |
| `src/components/image/sample.png` | `PNG` | 12165 |
| `src/components/image/sample@2x.png` | `PNG` | 37687 |

Use an asset without changing its aspect ratio. Give meaningful assets descriptive PowerPoint alt text; decorative assets receive empty alt text.

<!-- DADS_COMPONENT_SPECIFICATIONS_END -->
