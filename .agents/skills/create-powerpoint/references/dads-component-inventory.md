# DADS Component Inventory

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

