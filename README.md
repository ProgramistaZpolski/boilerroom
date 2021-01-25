# boilerroom
A HTML5 boilerplate generator made for my own projects<br>
The project structure:

![Screenshot](https://raw.githubusercontent.com/ProgramistaZpolski/boilerroom/master/Screenshot%20from%202021-01-25%2017-08-14.png)

```
/
	/js
		plugins.js - Javascript Plugins
		script.js - Master JS file
		
	.editorconfig - The config for the editor (Tabs, 4)
	.gitattributes - GITATTRIBUTES for web projects
	browserconfig.xml - Windows Tiles
	humans.txt - http://humanstxt.org/
	index.html - master html file
	package.json - Parcel installation
	robots.txt - The robots file for search engines
	site.webmanifest - A webmanifest for PWA
	sitemap.xml - A sitemap for search engines
	style.css - master css file
```

Avalible plugins:
- hQuery
- pzplUI
- script.js
- plugins.js
- Modernizr

### Usage
Start the code
```sh
node generator.js
Settings: h for hQuery, p for pzplUI, j for JS, q for Plugins, m for Modernizr 
```
Then type out the arguments
for example:
```sh
node generator.js
Settings: h for hQuery, p for pzplUI, j for JS, q for Plugins, m for Modernizr hjq
```
Will use the script.js, plugins.js and hQuery plugins
