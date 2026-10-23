<div align="center">
👋
<h1>Citizen</h1>
<p>

[![Contributors](https://img.shields.io/github/contributors/StarCitizenTools/mediawiki-skins-Citizen?style=flat-square&logo=github)](https://github.com/StarCitizenTools/mediawiki-skins-Citizen/graphs/contributors)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square&logo=GNU)](https://www.gnu.org/licenses/gpl-3.0)
[![MediaWiki: >=1.43.0](https://img.shields.io/badge/MediaWiki-%3E%3D1.43.0-%2336c?style=flat-square&logo=Wikipedia)](https://www.mediawiki.org)
[![Translations](https://img.shields.io/badge/translations-translatewiki-%23013467?style=flat-square&logo=GoogleTranslate)](https://translatewiki.net/w/i.php?title=Special:Translate&group=mwgithub-star-citizen)
</p>
</div>

![Citizen skin screenshot](https://upload.wikimedia.org/wikipedia/commons/0/07/Screenshot-skin-citizen.png)

<h3 align="center">
  Citizen is a beautiful, usable, responsive <a href="https://www.mediawiki.org">MediaWiki</a> skin that makes <a href="https://www.mediawiki.org/wiki/Manual:Extensions">extensions</a> part of the cohesive experience.
</h3>

<p align="center">
  <a href="https://starcitizen.tools">🚀&nbsp;Live&nbsp;demo</a>&nbsp;|
  <a href="https://mwcitizen.skin/community/showcase/">✨&nbsp;Showcase</a>&nbsp;|
  <a href="https://mwcitizen.skin">📚&nbsp;Documentation</a>
</p>

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

Check out the [configuration documentation](https://mwcitizen.skin/config/) for more details.

## Requirements

- [MediaWiki](https://www.mediawiki.org) 1.43.0 or later
- For the legacy versions, check the other release branches:

Version | MediaWiki version
:--- | :---
[2.40.2](https://github.com/StarCitizenTools/mediawiki-skins-Citizen/releases/tag/v2.40.2) | 1.39.4 – 1.42.7
[1.17.9](https://github.com/StarCitizenTools/mediawiki-skins-Citizen/releases/tag/v1.17.9) | 1.35.2 – 1.39.3

## Extensions

Check out the [extensions documentation](https://mwcitizen.skin/config/extensions) for recommended extensions and supported extension styles.

## Contributors

<a href="https://github.com/StarCitizenTools/mediawiki-skins-citizen/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=StarCitizenTools/mediawiki-skins-citizen" alt="Citizen contributors" title="Citizen contributors" width="812px" />
</a>
