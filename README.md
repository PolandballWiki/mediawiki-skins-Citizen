<div align="center">
👋
<h1>Steller</h1>
<p>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square&logo=GNU)](https://www.gnu.org/licenses/gpl-3.0)
[![MediaWiki: >=1.39.4](https://img.shields.io/badge/MediaWiki-%3E%3D1.39.4-%2336c?style=flat-square&logo=Wikipedia)](https://www.mediawiki.org)
</p>
</div>

![](https://cdn.polandball.wiki/central/5/54/Screenshot_Skin_Steller.jpg)

Steller is a fork of the Citizen MediaWiki skin that enhances the user experience with additional features and custom styling. While maintaining the beautiful, responsive design of Citizen, Steller introduces new functionalities and improved extension support.

## Notable Features
In addition to all the features from Citizen, Steller includes:

- **Enhanced Collapsible Sidebar**: A more flexible sidebar that can be collapsed to maximize content viewing space 📑
- **Custom Extension Styles**: Additional styling support for various MediaWiki extensions based on blur effects 🎨

### Citizen
- **Responsive layout**: Responsive and able to adapt to different screen sizes 📱💻🖥️
- **Light/dark mode**: Switch between light and dark mode ☀️🌙
- **Reading preferences**: Adjust page width, font size, and line height 👀📃
- **Collapsible sections**: Collapse and expand article sections 📖📕
- **Persistent ToC**: Access ToC anywhere in the article 🔍📖
- **Rich search suggestions**: More helpful search suggestions with images and descriptions 🔍👀
- **Progressive Web App**: App-like experience when added to home screen 📱

## Installation
1. [Download](https://github.com/PolandballWiki/mediawiki-skins-Citizen/archive/refs/heads/main.zip) place the file(s) in a directory called `Citizen` in your `skins/` folder.
2. Add the following code at the bottom of your LocalSettings.php and **after all other extensions**:
```php
wfLoadSkin( 'Citizen' );
```
3. **✔️Done** - Navigate to Special:Version on your wiki to verify that the skin is successfully installed.

## Configurations
**The skin works out of the box without any configurations.**
The config flags allow more customization on the specific features in the skin.

### CSS Variables
Steller provides customizable CSS variables to enhance the theme customization. These variables can be modified in your wiki's CSS files.

#### Site Background
Name | Description | Light Theme Default | Dark Theme Default
:--- | :--- | :--- | :---
`--site-bg-image` | Background image URL for the site | - | -

#### Theme Colors
Name | Description | Light Theme Default | Dark Theme Default
:--- | :--- | :--- | :---
`--color-primary` | Primary accent color | `#d78e8e` | `rgb(162,17,17)`
`--color-primary--hsl` | HSL variant of primary color | `hsla(var(--color-primary__h),var(--color-primary__s),20%,0.50)` | `hsla(var(--color-primary__h),var(--color-primary__s),30%,0.30)`
`--color-secondary` | Secondary accent color | `#401111` | `#74440f`
`--color-primary__h` | Hue value for primary color | `0` | `0`
`--color-primary__s` | Saturation value for primary color | `59%` | `65%`

#### Background Colors
Name | Description | Light Theme Default | Dark Theme Default
:--- | :--- | :--- | :---
`--steller-header-bg` | Global navigation background | `var(--color-surface-0)`  | `color-mix(in srgb, transparent, var(--color-surface-0))`

#### Links
Name | Description | Light Theme Default | Dark Theme Default
:--- | :--- | :--- | :---
`--content-link-color` | Color for hyperlinks | `???` | ``???``

### Appearance
Name | Description | Values | Default
:--- | :--- | :--- | :---
`$wgCitizenThemeDefault` | The default theme of the skin | `auto` - switch between light and dark according to OS/browser settings; `light`; `dark` | `auto`
`$wgCitizenEnableCollapsibleSections` | Enables or disable collapsible sections on content pages | `true` - enable; `false` - disable | `true`
`$wgCitizenShowPageTools` | The condition of page tools visibility | `true` - always visible; `login` - visible to logged-in users; `permission` - visible to users with the right permissions | `true`
`$wgCitizenGlobalToolsPortlet` | ID of the portlet to attach the global tools | string |
`$wgCitizenEnableDrawerSiteStats` | Enables the site statistics in drawer menu | `true` - enable; `false` - disable | `true`
`$wgCitizenUseNumberFormatter` | Use NumberFormatter for site statistics, which allows formatting number in a localized way | `true` - enable; `false` - disable | `true`
`$wgCitizenThemeColor` | The color defined in the `theme-color` meta tag | Hex color code | `#0d0e12`
`$wgCitizenEnableARFonts` | Enable included Noto Naskh Arabic for wikis that serve Arabic | `true` - enable; `false` - disable | `false`
`$wgCitizenEnableCJKFonts` | Enable included Noto Sans CJK for wikis that serves CJK languages | `true` - enable; `false` - disable | `false`
`$wgCitizenEnablePreferences` | Enable the preferences menu | `true` - enable; `false` - disable | `true`
`$wgCitizenOverflowInheritedClasses` | Defines css classes inherited by the overflow wrapper | List of css classes. Extend with `$wgCitizenOverflowInheritedClasses[] = 'my_class';` | `["floatleft", "floatright" ]`
`$wgCitizenOverflowNowrapClasses` | Defines css classes ignored by the overflow wrapper | List of css classes. Extend with `$wgCitizenOverflowNowrapClasses[] = 'my_class';` | `["citizen-table-nowrap", "diff", "mw-changeslist-line", "mw-recentchanges-table", "infobox", "cargoDynamicTable", "dataTable", "srf-datatable", "smw-datatable", "mw-capiunto-infobox" ]`

### Search suggestions
Name | Description | Values | Default
:--- | :--- | :--- | :---
`$wgCitizenSearchModule` | Which ResourceLoader module to use for search suggestion | `skins.citizen.search`; `mediawiki.searchSuggest`; string | `skins.citizen.search`
`$wgCitizenSearchGateway` | Which gateway to use for fetching search suggestion |`mwActionApi`; `mwRestApi`; `smwAskApi`; string | `mwActionApi`
`$wgCitizenMaxSearchResults` | Max number of search suggestions | Integer > 0 | `6`

### Webapp manifest
Name | Description | Values | Default
:--- | :--- | :--- | :---
`$wgCitizenEnableManifest` | Enable or disable [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) | `true` - enable; `false` - disable | `true`
`$wgCitizenManifestOptions` | Options of the web app manifest | - | See below

```php
$wgCitizenManifestOptions = [
	'background_color' => '#0d0e12',
	'description' => '',
	'short_name' => '',
	'theme_color' => "#0d0e12",
	'icons' => [],
];
```

## Requirements
* [MediaWiki](https://www.mediawiki.org) 1.39.4 or later

## Recommended extensions
These extensions are optional but recommended to enable additional features:
- [PageImages](https://www.mediawiki.org/wiki/Extension:PageImages) - Add image to search suggestion results
- [TextExtracts](https://www.mediawiki.org/wiki/Extension:TextExtracts) - Add description to search suggestion results
- [ShortDescription](https://www.mediawiki.org/wiki/Extension:ShortDescription) - Add short description under page title and in search suggestions
- [TemplateStylesExtender](https://www.mediawiki.org/wiki/Extension:TemplateStylesExtender) - Allow the use of CSS variables in TemplateStyles

## Extension Support
Steller provides enhanced styling support for various MediaWiki extensions through its skinStyles system. The styling is organized into three grades:

- **Grade A - Overhaul**: Major UI adjustments and dynamic theming
- **Grade B - Dynamic**: Basic theme integration with CSS variables
- **Grade E - Legacy**: Basic dark mode support (pending updates)

Check the `skinStyles/steller` directory for the latest extension style support.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests to help improve Steller.