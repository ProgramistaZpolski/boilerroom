"use strict";

const readline = require('readline');
const fs = require("fs");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Settings: h for hQuery, p for pzplUI, j for JS, q for Plugins, m for Modernizr ', (answer) => {

	const params = answer.split("");

	let addons = "header+main+footer";
	let prefix = "./";
	if (params.includes("q") && params.includes("j")) {
		prefix = "./js/";
		fs.mkdir("./js", function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Creating directory ./js/...");
			};
		});
	};

	if (params.includes("q")) {
		let pluginTxt = `"use strict";`;
		if (params.includes("h")) {
			pluginTxt += `\n
let hQuery = function (selector) {
	let el;

	let obj = {
		getEl(selector, internal) {
			if (internal) {
				el = selector.querySelector(internal);
				return this;
			}
			if (el) {
				return el;
			};
			return document.querySelector(selector);
		},
		addClass() {
			Array.from(arguments).forEach(elem => {
				el.classList.add(elem);
			});
			return this;
		},
		removeClass() {
			Array.from(arguments).forEach(elem => {
				el.classList.remove(elem);
			});
			return this;
		},
		hasClass(className) {
			return el.classList.contains(className);
		},
		toggleClass() {
			Array.from(arguments).forEach(elem => {
				el.classList.toggle(elem);
			});
			return this;
		},
		after(html) {
			el.outerHTML += html;
			return this;
		},
		before(html) {
			el.outerHTML = html + el.outerHTML;
			return this;
		},
		append(html) {
			el.innerHTML += html;
			return this;
		},
		prepend(html) {
			el.innerHTML = html + el.innerHTML;
		},
		attr(name, value) {
			if (typeof name == "string") {
				if (value) {
					el.setAttribute(name, value);
					return this;
				} else {
					return el.getAttribute(name);
				};
			} else {
				for (let i = 0; i < name.length; i++) {
					el.setAttribute(name[i], value[i]);
				};
				return this;
			};
		},
		children() {
			return el.children;
		},
		clone() {
			return el.cloneNode(true);
		},
		data() {
			if (arguments.length == 0) {
				return el.dataset;
			} else if (arguments.length == 1) {
				return el.dataset[Array.from(arguments)[0]];
			} else {
				el.dataset[Array.from(arguments)[0]] = Array.from(arguments)[1];
				return this;
			};
		},
		empty() {
			while (el.firstChild) {
				el.removeChild(el.firstChild);
			};
		},
		find(query) {
			return this.getEl(this.getEl(el), query);
		},
		on(event, callback) {
			el.addEventListener(event, callback);
			return this;
		},
		off(event, callback) {
			el.removeEventListener(event, callback);
			return this;
		},
		html(content) {
			if (content) {
				el.innerHTML = content;
				return this;
			} else {
				return el.innerHTML;
			};
		},
		text(content) {
			if (content) {
				el.innerText = content;
				return this;
			} else {
				return el.innerText;
			};
		},
		val(content) {
			if (content) {
				el.value = content;
				return this;
			} else {
				return el.value;
			};
		},
		parent() {
			return el.parentNode;
		},
		del() {
			el.remove();
			return this;
		},
		scroll() {
			el.scrollIntoView({ behavior: 'smooth' });
			return this;
		},
		size() {
			return el.getBoundingClientRect();
		},
		fadeOut(fast) {
			let fade = setInterval(function () {
				if (!el.style.opacity) {
					el.style.opacity = 1;
				}
				if (el.style.opacity > 0) {
					el.style.opacity -= 0.1;
				} else {
					clearInterval(fade);
				}
			}, fast);
			return this;
		},
		fadeIn(fast) {
			let fade = setInterval(function () {
				if (!el.style.opacity) {
					el.style.opacity = 0;
				}
				if (el.style.opacity < 1) {
					el.style.opacity = parseFloat(el.style.opacity) + 0.1;
				} else {
					clearInterval(fade);
				}
			}, fast);
			return this;
		},
		css(property, value) {
			if (value) {
				el.style[property] = value;
				return this;
			} else {
				return el.style[property];
			};
		}
	};

	el = obj.getEl(selector);
	return obj;
};

const h = hQuery;`;
		};
		if (params.includes("m")) {
			pluginTxt += `\n
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-bloburls-canvas-cssanimations-csscolumns-customelements-fetch-flash-flexbox-history-inlinesvg-localstorage-picture-pointerevents-postmessage-scriptasync-scriptdefer-sizes-srcset-svg-svgasimg-webgl-webp-webpalpha-webpanimation-webplossless_webp_lossless-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,a,s;for(var A in y)if(y.hasOwnProperty(A)){if(e=[],n=y[A],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),b.push((o?"":"no-")+s.join("-"))}}function i(e){var n=x.className,t=Modernizr._config.classPrefix||"";if(k&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),k?x.className.baseVal=n:x.className=n)}function a(e,n){if("object"==typeof e)for(var t in e)_(e,t)&&a(t,e[t]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;n="function"==typeof n?n():n,1==r.length?Modernizr[r[0]]=n:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=n),i([(n&&0!=n?"":"no-")+r.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):k?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function A(){var e=n.body;return e||(e=s(k?"svg":"body"),e.fake=!0),e}function l(e,t,r,o){var i,a,l,u,c="modernizr",d=s("div"),f=A();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=o?o[r]:c+(r+1),d.appendChild(l);return i=s("style"),i.type="text/css",i.id="s"+c,(f.fake?f:d).appendChild(i),f.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=c,f.fake&&(f.style.background="",f.style.overflow="hidden",u=x.style.overflow,x.style.overflow="hidden",x.appendChild(f)),a=t(d,e),f.fake?(f.parentNode.removeChild(f),x.style.overflow=u,x.offsetHeight):d.parentNode.removeChild(d),!!a}function u(e,n){return!!~(""+e).indexOf(n)}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function d(e,n){return function(){return e.apply(n,arguments)}}function f(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?d(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var a=i.error?"error":"log";i[a].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function v(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==m(e,null,"position")})}return t}function h(e,n,o,i){function a(){l&&(delete I.style,delete I.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var A=v(e,o);if(!r(A,"undefined"))return A}for(var l,d,f,p,m,h=["modernizr","tspan","samp"];!I.style&&h.length;)l=!0,I.modElem=s(h.shift()),I.style=I.modElem.style;for(f=e.length,d=0;f>d;d++)if(p=e[d],m=I.style[p],u(p,"-")&&(p=c(p)),I.style[p]!==t){if(i||r(o,"undefined"))return a(),"pfx"==n?p:!0;try{I.style[p]=o}catch(g){}if(I.style[p]!=m)return a(),"pfx"==n?p:!0}return a(),!1}function g(e,n,t,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+P.join(a+" ")+a).split(" ");return r(n,"string")||r(n,"undefined")?h(s,n,o,i):(s=(e+" "+Q.join(a+" ")+a).split(" "),f(s,n,t))}function w(e,n,r){return g(e,t,t,n,r)}var b=[],y=[],C={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){y.push({name:e,fn:n,options:t})},addAsyncTest:function(e){y.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr,Modernizr.addTest("customelements","customElements"in e),Modernizr.addTest("history",function(){var n=navigator.userAgent;return-1===n.indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone")||"file:"===location.protocol?e.history&&"pushState"in e.history:!1}),Modernizr.addTest("postmessage","postMessage"in e),Modernizr.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var S=!1;try{S="WebSocket"in e&&2===e.WebSocket.CLOSING}catch(T){}Modernizr.addTest("websockets",S),Modernizr.addTest("picture","HTMLPictureElement"in e),Modernizr.addTest("fetch","fetch"in e),Modernizr.addTest("webworkers","Worker"in e);var B=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=B;var x=n.documentElement,k="svg"===x.nodeName.toLowerCase(),R="Moz O ms Webkit",Q=C._config.usePrefixes?R.toLowerCase().split(" "):[];C._domPrefixes=Q;var _;!function(){var e={}.hasOwnProperty;_=r(e,"undefined")||r(e.call,"undefined")?function(e,n){return n in e&&r(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),C._l={},C.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},C._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,r;for(e=0;e<t.length;e++)(r=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){C.addTest=a}),Modernizr.addAsyncTest(function(){var e=new Image;e.onerror=function(){a("webpalpha",!1,{aliases:["webp-alpha"]})},e.onload=function(){a("webpalpha",1==e.width,{aliases:["webp-alpha"]})},e.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="}),Modernizr.addAsyncTest(function(){var e=new Image;e.onerror=function(){a("webpanimation",!1,{aliases:["webp-animation"]})},e.onload=function(){a("webpanimation",1==e.width,{aliases:["webp-animation"]})},e.src="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}),Modernizr.addAsyncTest(function(){var e=new Image;e.onerror=function(){a("webplossless",!1,{aliases:["webp-lossless"]})},e.onload=function(){a("webplossless",1==e.width,{aliases:["webp-lossless"]})},e.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="}),Modernizr.addAsyncTest(function(){function e(e,n,t){function r(n){var r=n&&"load"===n.type?1==o.width:!1,i="webp"===e;a(e,i&&r?new Boolean(r):r),t&&t(n)}var o=new Image;o.onerror=r,o.onload=r,o.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type)for(var r=0;r<n.length;r++)e(n[r].name,n[r].uri)})}),Modernizr.addTest("svgasimg",n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var E=function(){function e(e,n){var o;return e?(n&&"string"!=typeof n||(n=s(n||"div")),e="on"+e,o=e in n,!o&&r&&(n.setAttribute||(n=s("div")),n.setAttribute(e,""),o="function"==typeof n[e],n[e]!==t&&(n[e]=t),n.removeAttribute(e)),o):!1}var r=!("onblur"in n.documentElement);return e}();C.hasEvent=E,Modernizr.addTest("pointerevents",function(){var e=!1,n=Q.length;for(e=Modernizr.hasEvent("pointerdown");n--&&!e;)E(Q[n]+"pointerdown")&&(e=!0);return e});var U=function(e,n){var t=!1,r=s("div"),o=r.style;if(e in o){var i=Q.length;for(o[e]=n,t=o[e];i--&&!t;)o[e]="-"+Q[i]+"-"+n,t=o[e]}return""===t&&(t=!1),t};C.prefixedCSSValue=U,Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("webgl",function(){var n=s("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e}),Modernizr.addAsyncTest(function(){var e,n,t,r=s("img"),o="sizes"in r;!o&&"srcset"in r?(n="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",t=function(){a("sizes",2==r.width)},r.onload=t,r.onerror=t,r.setAttribute("sizes","9px"),r.srcset=e+" 1w,"+n+" 8w",r.src=e):a("sizes",o)}),Modernizr.addTest("srcset","srcset"in s("img")),Modernizr.addTest("scriptasync","async"in s("script")),Modernizr.addTest("scriptdefer","defer"in s("script")),Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}}),Modernizr.addAsyncTest(function(){var t,r,o=function(e){x.contains(e)||x.appendChild(e)},i=function(e){e.fake&&e.parentNode&&e.parentNode.removeChild(e)},l=function(e,n){var t=!!e;if(t&&(t=new Boolean(t),t.blocked="blocked"===e),a("flash",function(){return t}),n&&p.contains(n)){for(;n.parentNode!==p;)n=n.parentNode;p.removeChild(n)}};try{r="ActiveXObject"in e&&"Pan"in new e.ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(u){}if(t=!("plugins"in navigator&&"Shockwave Flash"in navigator.plugins||r),t||k)l(!1);else{var c,d,f=s("embed"),p=A();if(f.type="application/x-shockwave-flash",p.appendChild(f),!("Pan"in f||r))return o(p),l("blocked",f),void i(p);c=function(){return o(p),x.contains(p)?(x.contains(f)?(d=f.style.cssText,""!==d?l("blocked",f):l(!0,f)):l("blocked"),void i(p)):(p=n.body||p,f=s("embed"),f.type="application/x-shockwave-flash",p.appendChild(f),setTimeout(c,1e3))},setTimeout(c,10)}});var O=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();C.mq=O;var P=(C.testStyles=l,C._config.usePrefixes?R.split(" "):[]);C._cssomPrefixes=P;var D=function(n){var r,o=B.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var a=0;o>a;a++){var s=B[a],A=s.toUpperCase()+"_"+r;if(A in i)return"@-"+s.toLowerCase()+"-"+n}return!1};C.atRule=D;var G={elem:s("modernizr")};Modernizr._q.push(function(){delete G.elem});var I={style:G.elem.style};Modernizr._q.unshift(function(){delete I.style});C.testProp=function(e,n,r){return h([e],t,n,r)};C.testAllProps=g,C.testAllProps=w,Modernizr.addTest("cssanimations",w("animationName","a",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,n=w("columnCount");try{e=!!n,e&&(e=new Boolean(e))}catch(t){}return e});for(var e,n,t=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<t.length;r++)e=t[r].toLowerCase(),n=w("column"+t[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(n=n||w(t[r])),Modernizr.addTest("csscolumns."+e,n)}(),Modernizr.addTest("flexbox",w("flexBasis","1px",!0));var L=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?D(e):(-1!=e.indexOf("-")&&(e=c(e)),n?g(e,n,t):g(e,"pfx"))},z=L("URL",e,!1);z=z&&e[z],Modernizr.addTest("bloburls",z&&"revokeObjectURL"in z&&"createObjectURL"in z),o(),i(b),delete C.addTest,delete C.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);`;
		}
		addons += `\n\t<script src="${prefix}plugins.js" defer></script>`;
		fs.writeFile(`${prefix}plugins.js`, pluginTxt, function (err) {
			if (err) {
				return console.log(err)
			} else {
				console.log(`Creating file ${prefix}plugins.js...`);
			};
		});
	};

	if (params.includes("j")) {
		addons += `\n\t<script src="${prefix}script.js" defer></script>`;
		fs.writeFile(`${prefix}script.js`, `"use strict";`, function (err) {
			if (err) {
				return console.log(err)
			} else {
				console.log(`Creating file ${prefix}script.js...`);
			};
		});
	};

	const htmlTemplate = `<!DOCTYPE html>
<html lang="en" dir="ltr">
	
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="canonical" href="">
	<meta name="description" content="">
	<meta property="og:url" content="https://www.example.com/path/to/page.html">
	<meta property="og:image" content="https://www.example.com/path/to/image.jpg">
	<meta property="og:type" content="website">
	<meta property="og:title" content="Document">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:creator" content="@ProgramistaZpolski">
	<meta name="twitter:url" content="https://www.example.com/path/to/page.html">
	<meta name="twitter:title" content="">
	<meta name="twitter:description" content="">
	<meta name="twitter:image" content="https://www.example.com/path/to/image.jpg">
	<meta name="theme-color" content="#fafafa">
	<meta name="author" content="Piotr Badełek">
	<link rel="apple-touch-icon" href="/favicon.png">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	<link rel="icon" type="image/png" href="/favicon.png">
	<meta name="msapplication-config" content="browserconfig.xml">
	<meta name="application-name" content="Sample Title">
	<meta name="msapplication-tooltip" content="A description of what this site does.">
	<meta name="msapplication-starturl" content="https://www.programistazpolski.ct8.pl/twojsuperurl/index.html?pinned=true">
	<link rel="manifest" href="site.webmanifest">
	<link rel="stylesheet" href="style.css">
</head>
	
<body>
	<!--[if IE]>
		<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
	<![endif]-->
	${addons}
</body>

</html>`;

	fs.writeFile('index.html', htmlTemplate, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./index.html...`);
		};
	});

	let cssTemplate = `@charset "utf-8";`;

	if (params.includes("p")) {
		cssTemplate += `\n/* pzplUI 2.0 */

:root {
	scroll-behavior: smooth;
	--bg-color: white;
	--bg-text: black;
	--button-text: white;
	--box-shadow-1: 0px 2px 3px rgba(50, 50, 50, 0.2);
	--box-shadow-2: 0px 3px 4px rgba(40, 40, 40, 0.4);
	--black: black;
	--black-hover: #212121;
	--black-light: #4d4d4d;
	--black-alert-a: #e6e6e6;
	--white: white;
	--blue-light: #b6d9fe;
	--blue: #0270e6;
	--blue-hover: #0068d7;
	--blue-alert-text: #0257b3;
	--blue-alert-a: #003166;
	--green-light: #a7e1aa;
	--green: #308c34;
	--green-hover: #338337;
	--green-alert-text: #236626;
	--green-alerta-a: #091a0a;
	--red-light: #ecaeb4;
	--red: #d03141;
	--red-hover: #c03240;
	--red-alert-text: #a82633;
	--red-alert-a: #55131a;
	--orange-light: #fcce94;
	--orange: #f08a07;
	--orange-hover: #df8106;
	--orange-alert-text: #995700;
	--orange-alert-a: #5b3503;
	--info-blue-light: #77dde6;
	--info-blue: #1e9aa6;
	--info-blue-hover: rgb(3, 129, 143);
	--info-blue-alert-text: #16727b;
	--info-blue-alert-a: #072224;
	--secondary: #64748B;
	--secondary-hover: #4B5563;
	--text-muted: #7d868e;
	--animation-speed: 1.5s;
	--animation-transform: 300px;
	--mp-spacing: 1rem;
	--card-border-color: rgba(12, 12, 12, 0.125);
	--card-header-bgcolor: rgba(0, 0, 0, .03);
	--modal-footer: #dee2e6;
	--mark-color: #fff4b8;
	--form1: #e9ecef;
	--form2: #ced4da;
	--form-shadow: 0 0 0 .25rem rgba(0, 102, 255, 0.438);
	--font-stack: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, "Helvetica Now Text", "Helvetica Neue", "Helvetica", Cantarell, Oxygen, Arial, Tahoma, Geneva, Verdana, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

body {
	background-color: var(--bg-color);
	color: var(--bg-text);
	line-height: 1.5;
	font-family: var(--font-stack);
}

a {
	color: #007bff;
	text-decoration: none;
	background-color: transparent;
}

[hidden] {
	display: none !important;
}

code {
	font-family: "Ubuntu Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

hr {
	margin: 20px 0;
	border: 0;
	border-top: 1px solid #eeeeee;
	border-bottom: 1px solid #ffffff;
}

/* Typography */

h1, h2, h3, h4, h5, h6 {
	font-weight: 500;
	line-height: 1.2;
}

h1 {
	font-size: 2.5rem;
}

h2 {
	font-size: 2rem;
}

h3 {
	font-size: 1.75rem;
}

h4 {
	font-size: 1.5rem;
}

h5 {
	font-size: 1.25rem;
}

h6 {
	font-size: 1rem;
}

.d1 {
	font-size: 5rem;
}

.d2 {
	font-size: 4.5rem;
}

.d3 {
	font-size: 4rem;
}

.d4 {
	font-size: 3.5rem;
}

.text-light {
	font-weight: 400;
}

mark {
	padding: .2em;
	background-color: var(--mark-color);
}

/* Backgrounds */

.bg-success {
	background-color: var(--green) !important;
}

.bg-info {
	background-color: var(--info-blue) !important;
}

.bg-danger {
	background-color: var(--orange) !important;
}

.bg-error {
	background-color: var(--red) !important;
}

.bg-normal {
	background-color: var(--blue) !important;
}

.bg-dark {
	background-color: var(--black) !important;
}

.bg-secondary {
	background-color: var(--secondary) !important;
}

.text-normal {
	color: var(--blue) !important;
}

.text-success {
	color: var(--green) !important;
}

.text-error {
	color: var(--red) !important;
}

.text-danger {
	color: var(--orange) !important;
}

.text-dark {
	color: var(--black) !important;
}

.text-info {
	color: var(--info-blue) !important;
}

.text-white {
	color: var(--white) !important;
}

.text-muted {
	color: var(--text-muted) !important;
}

.text-secondary {
	color: var(--secondary) !important;
}

.border {
	border: 1px solid var(--modal-footer) !important;
}

.border-normal {
	border-color: var(--blue) !important;
}

.border-success {
	border-color: var(--green) !important;
}

.border-error {
	border-color: var(--red) !important;
}

.border-danger {
	border-color: var(--orange) !important;
}

.border-info {
	border-color: var(--info-blue) !important;
}

.border-secondary {
	border-color: var(--secondary) !important;
}

/* Layouts */

.flexbox {
	display: flex;
	flex-wrap: wrap;
}

.column {
	display: block;
	flex-basis: 0;
	flex-grow: 1;
	flex-shrink: 1;
	padding: .75rem;
}

.flex-80, .flex-75, .flex-65, .flex-60, .flex-50, .flex-45, .flex-40, .flex-35, .flex-30, .flex-25, .flex-20, .flex-10 {
	flex: none;
}

.flex-100 {
	width: 100%;
}

.flex-80 {
	width: 80%;
}

.flex-75 {
	width: 75%;
}

.flex-65 {
	width: 65%;
}

.flex-60 {
	width: 60%;
}

.flex-50 {
	width: 50%;
}

.flex-45 {
	width: 45%;
}

.flex-40 {
	width: 40%;
}

.flex-35 {
	width: 35%;
}

.flex-30 {
	width: 30%;
}

.flex-25 {
	width: 25%;
}

.flex-20 {
	width: 20%;
}

.flex-10 {
	width: 10%;
}

.singleline {
	flex-wrap: nowrap;
}

.center-flex {
	justify-content: center !important;
}

/* Layouts 2 */

.container {
	margin: 0 auto;
}

.hero {
	padding: 3rem 1.5rem;
}

.subtitle {
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 1.25;
}

.title {
	font-size: 2rem;
	font-weight: 600;
	line-height: 1.125;
}

blockquote, body, dd, dl, dt, fieldset, figure, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
	margin: 0;
	padding: 0;
}

.consended h1, .consended h2, .consended h3, .consended h4, .consended h5, .consended h6 {
	margin: 0;
	padding: 0;
}

/* Buttons */

.btn {
	display: inline-block;
	font-weight: 400;
	color: var(--button-text);
	text-align: center;
	text-decoration: none;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: .375rem .75rem;
	font-size: 1rem;
	border-radius: .25rem;
	transition: .3s;
	box-shadow: var(--box-shadow-1);
	background-color: transparent;
}

.btn:hover {
	box-shadow: var(--box-shadow-2);
}

.btn-normal {
	background-color: var(--blue);
}

.btn-normal:hover {
	background-color: var(--blue-hover);
}

.btn:disabled {
	opacity: .6;
	cursor: default;
}

.btn-success {
	background-color: var(--green);
}

.btn-success:hover {
	background-color: var(--green-hover);
}

.btn-error {
	background-color: var(--red);
}

.btn-error:hover {
	background-color: var(--red-hover);
}

.btn-danger {
	color: var(--black);
	background-color: var(--orange);
}

.btn-danger:hover {
	background-color: var(--orange-hover);
}

.btn-info {
	background-color: var(--info-blue);
}

.btn-info:hover {
	background-color: var(--info-blue-hover);
}

.btn-dark {
	background-color: var(--black);
}

.btn-dark:hover {
	background-color: var(--black-hover);
}

.btn-secondary {
	background-color: var(--secondary);
}

.btn-secondary:hover {
	background-color: var(--secondary-hover);
}

.btn-normal-outline {
	color: var(--blue);
	border-color: var(--blue);
}

.btn-normal-outline:hover {
	color: var(--white);
	background-color: var(--blue);
}

.btn-success-outline {
	color: var(--green);
	border-color: var(--green);
}

.btn-success-outline:hover {
	color: var(--white);
	background-color: var(--green);
}

.btn-error-outline {
	color: var(--red);
	border-color: var(--red);
}

.btn-error-outline:hover {
	color: var(--white);
	background-color: var(--red);
}

.btn-danger-outline {
	color: var(--orange);
	border-color: var(--orange);
}

.btn-danger-outline:hover {
	color: var(--white);
	background-color: var(--orange);
}

.btn-info-outline {
	color: var(--info-blue);
	border-color: var(--info-blue);
}

.btn-info-outline:hover {
	color: var(--white);
	background-color: var(--info-blue);
}

.btn-dark-outline {
	color: var(--black);
	border-color: var(--black);
}

.btn-dark-outline:hover {
	color: var(--white);
	background-color: var(--black);
}

.btn-secondary-outline {
	border-color: var(--secondary);
}

.btn-secondary-outline:hover {
	background-color: var(--secondary);
}

.btn-block {
	display: block;
	width: 100%;
}

.btn-lg {
	padding: .5rem 1rem;
	font-size: 1.25rem;
	line-height: 1.5;
	border-radius: .3rem;
}

.btn-sm {
	padding: .25rem .5rem;
	font-size: .875rem;
	line-height: 1.5;
	border-radius: .2rem;
}

/* Alerts */

.alert {
	padding: .75rem 1.25rem;
	border-radius: .25rem;
	margin-bottom: 1rem;
	color: var(--white);
}

.alert-normal {
	color: var(--blue-alert-text);
	background-color: var(--blue-light);
}

.alert-normal a {
	color: var(--blue-alert-a);
}

.alert-success {
	background-color: var(--green-light);
	color: var(--green-alert-text);
}

.alert-success a {
	color: var(--green-alert-a);
}

.alert-error {
	color: var(--red-alert-text);
	background-color: var(--red-light);
}

.alert-error a {
	color: var(--red-alert-a);
}

.alert-danger {
	color: var(--orange-alert-text);
	background-color: var(--orange-light);
}

.alert-danger a {
	color: var(--orange-alert-a);
}

.alert-info {
	color: var(--info-blue-alert-text);
	background-color: var(--info-blue-light);
}

.alert-info a {
	color: var(--info-blue-alert-a);
}

.alert-dark {
	background-color: var(--black-light);
}

.alert-dark a {
	color: var(--black-alert-a);
}

.alert a {
	font-weight: 700;
}

/* Badges */

.badge {
	display: inline-block;
	padding: .25em .4em;
	font-size: 75%;
	font-weight: 700;
	line-height: 1;
	color: #fff;
	border-radius: .25rem;
}

.badge-normal {
	background-color: var(--blue);
}

.badge-success {
	background-color: var(--green);
}

.badge-error {
	background-color: var(--red);
}

.badge-danger {
	background-color: var(--orange);
}

.badge-info {
	background-color: var(--info-blue);
}

.badge-dark {
	background-color: var(--black);
}

.badge-pill {
	border-radius: 50rem !important;
}

/* Progressbar */

.progress-bar {
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	color: var(--white);
	text-align: center;
	white-space: nowrap;
	background-color: var(--blue);
	transition: width .6s ease;
}

.progress {
	display: flex;
	height: 1rem;
	overflow: hidden;
	line-height: 0;
	font-size: .75rem;
	background-color: #e9ecef;
	border-radius: .25rem;
	margin-top: 1rem;
}

.progress-bar-striped {
	background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
	background-size: 1rem 1rem;
}

/* Spinner */

.spinner {
	display: inline-block;
	width: 2rem;
	height: 2rem;
	vertical-align: text-bottom;
	border: .25em solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	animation: spinner .75s linear infinite;
}

@keyframes spinner {
	to {
		transform: rotate(360deg)
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Box */

.box {
	border-radius: 5px;
	box-shadow: 0 .5em 1em -.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
	padding: 1rem;
}

/* Animations */

.anim-top, .anim-bottom, .anim-left, .anim-right {
	position: relative;
}

.anim-spin {
	animation: pzplui-spin var(--animation-speed) linear forwards;
}

@keyframes pzplui-spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.anim-fade {
	animation: pzplui-fade var(--animation-speed) linear forwards;
}

@keyframes pzplui-fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.anim-fade-out {
	animation: pzplui-fade-out var(--animation-speed) linear forwards;
}

@keyframes pzplui-fade-out {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

.anim-top {
	animation: pzplui-top var(--animation-speed) linear forwards;
}

@keyframes pzplui-top {
	from {
		opacity: 0;
		bottom: var(--animation-transform);
	}
	to {
		opacity: 1;
		bottom: 0;
	}
}

.anim-bottom {
	animation: pzplui-bottom var(--animation-speed) linear forwards;
}

@keyframes pzplui-bottom {
	from {
		opacity: 0;
		top: var(--animation-transform);
	}
	to {
		opacity: 1;
		top: 0;
	}
}

.anim-left {
	animation: pzplui-left var(--animation-speed) linear forwards;
}

@keyframes pzplui-left {
	from {
		opacity: 0;
		right: var(--animation-transform);
	}
	to {
		opacity: 1;
		right: 0;
	}
}

.anim-right {
	animation: pzplui-right var(--animation-speed) linear forwards;
}

@keyframes pzplui-right {
	from {
		opacity: 0;
		left: var(--animation-transform);
	}
	to {
		opacity: 1;
		left: 0;
	}
}

.anim-zoom {
	animation: pzplui-zoom var(--animation-speed) forwards;
}

@keyframes pzplui-zoom {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(1);
	}
}

.anim-grow {
	width: 0%;
	animation: pzplui-grow calc(var(--animation-speed) / 3) linear forwards;
}

@keyframes pzplui-grow {
	from {
		width: 0%;
	}
	to {
		width: 100%;
	}
}

.anim-hover-grow {
	transition: transform 0.3s;
}

.anim-hover-grow:hover {
	transform: scale(1.1);
}

/* Image Utility Classes */

.img-fluid {
	max-width: 100%;
	height: auto;
}

.img-round {
	border-radius: .25rem !important;
}

/* Navbars */

.navbar {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	padding: .5rem 1rem;
	text-decoration: none;
}

.navbar-brand {
	display: inline-block;
	padding-top: .3rem;
	padding-bottom: .3rem;
	margin-right: 1rem;
	font-size: 1.25rem;
	line-height: inherit;
	white-space: nowrap;
}

.navbar ul {
	list-style: none;
	flex-direction: row;
	display: flex;
}

.navbar ul li {
	padding-right: .5rem;
	padding-left: .5rem;
	display: block;
	padding: .5rem 1rem;
	opacity: .8;
}

.navbar-fixed {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 999;
}

.nav-pill {
	border-radius: .25rem;
	display: block;
	color: var(--white) !important;
	background-color: var(--blue);
	padding: .5rem 1rem;
	text-decoration: none;
}

.not-pill {
	color: var(--blue) !important;
}

/* Float utility classes */

.float-start {
	float: left;
}

.float-end {
	float: right;
}

/* Interaction utility classes */

.pointer-disabled {
	pointer-events: none;
}

.pointer-revert {
	pointer-events: auto;
}

.select-all {
	user-select: all;
}

.select-none {
	user-select: none;
}

/* Padding and margin */

.p0 {
	padding: 0;
}

.p1 {
	padding: calc(var(--mp-spacing) * .25);
}

.p2 {
	padding: calc(var(--mp-spacing) * .5);
}

.p3 {
	padding: var(--mp-spacing);
}

.p4 {
	padding: calc(var(--mp-spacing) * 1.25);
}

.p5 {
	padding: calc(var(--mp-spacing) * 1.5);
}

.p6 {
	padding: calc(var(--mp-spacing) * 1.75);
}

.p7 {
	padding: calc(var(--mp-spacing) * 2);
}

.m0 {
	margin: 0;
}

.m1 {
	margin: calc(var(--mp-spacing) * .25);
}

.m2 {
	margin: calc(var(--mp-spacing) * .5);
}

.m3 {
	margin: var(--mp-spacing);
}

.m4 {
	margin: calc(var(--mp-spacing) * 1.25);
}

.m5 {
	margin: calc(var(--mp-spacing) * 1.5);
}

.m6 {
	margin: calc(var(--mp-spacing) * 1.75);
}

.m7 {
	margin: calc(var(--mp-spacing) * 2);
}

/* Cards */

.card {
	border: 1px solid var(--card-border-color);
	border-radius: .25rem;
}

.card-body {
	padding: 1rem 1rem;
}

.card-header {
	padding: .5rem 1rem;
	background-color: var(--card-header-bgcolor);
	border-bottom: 1px solid var(--card-border-color);
}

.card h1, .card h2, .card h3, .card h4, .card h5, .card h6 {
	margin-top: 0;
	margin-bottom: .75rem;
}

/* Modals */

.modal {
	width: 500px;
	display: none;
	position: fixed;
	z-index: 100;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
	background-color: #fff;
	border-radius: .3rem;
	margin: auto;
	max-width: 50%;
}

.modal-header {
	padding: 1rem 1rem;
	border-bottom: 1px solid var(--modal-footer);
}

.modal-body {
	padding: 1rem;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	padding: .75rem;
	border-top: 1px solid var(--modal-footer);
}

.modal-footer>* {
	margin: .25rem;
}

/* Pagination */

.pagination {
	display: flex;
	padding-left: 0;
	list-style: none;
}

.pag-link {
	display: block;
	padding: .5rem .75rem;
	margin-left: -1px;
	line-height: 1.25;
	border: 1px solid var(--modal-footer);
}

.pag-item.active .pag-link {
	color: #fff;
	background-color: var(--blue);
}

.pag-item:first-child .pag-link {
	border-top-left-radius: .25rem;
	border-bottom-left-radius: .25rem;
}

.pag-item:last-child .pag-link {
	border-top-right-radius: .25rem;
	border-bottom-right-radius: .25rem;
}

.pag-lg .pag-link {
	padding: .80rem 1.5rem;
	font-size: 1.3rem;
	line-height: 1.5;
}

.pag-sm .pag-link {
	padding: .3rem .5rem;
	font-size: .75rem;
	line-height: 1.3;
}

/* Overflows */

.overflow-auto {
	overflow: auto !important;
}

.overflow-none {
	overflow: hidden !important;
}

/* Forms */

.inputs label {
	display: flex;
	align-items: center;
	padding: .375rem .75rem;
	font-weight: 400;
	text-align: center;
	background-color: var(--form1);
	border: 1px solid var(--form2);
	border-radius: .25rem;
}

.inputs>input, .inputs>.form-select, .inputs>textarea {
	flex: 1 1 auto;
	width: 1%;
}

.inputs input, .inputs textarea {
	padding: .375rem .75rem;
	font-size: 1rem;
	line-height: 1.5;
	opacity: 0.9;
	border: 1px solid var(--form2);
	border-radius: .25rem;
}

.inputs {
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	width: 100%;
}

.inputs> :not(:first-child) {
	margin-left: -1px;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

input:focus, textarea:focus {
	box-shadow: var(--form-shadow);
}

input, textarea {
	transition: all 0.1s;
	font-family: var(--font-stack);
}

input[type="color"] {
	background-color: var(--form1);
	border: 1px solid var(--form2);
	border-radius: .25rem;
	max-width: 2.85rem;
	height: auto;
	cursor: pointer;
	padding: .375rem;
}

input[type="color"]::-moz-color-swatch {
	height: 1.5em;
	border-radius: .25rem;
}

input[type="file"] {
	cursor: pointer;
	width: 100%;
	padding: .375rem .75rem;
	border: 1px solid var(--form2);
	border-radius: .25rem;
}

input[type="file"]::file-selector-button {
	padding: .375rem .75rem;
	margin: -.375rem -.75rem;
	margin-inline-end: .75rem;
	border-style: solid;
	border-width: 0;
	border-inline-end-width: 1px;
}

/* Tables */

table {
	text-align: left;
	border-collapse: collapse;
	width: 100%;
}

table th, table td {
	padding: .7rem;
	border-top: 1px solid var(--modal-footer);
}

table thead {
	border-bottom: 2px solid var(--modal-footer);
	font-weight: 700;
}

.table-dark {
	color: white;
	background-color: #232527;
}

.table-dark td, .table-dark th, .table-dark thead {
	border-color: #35393d;
}

.table-striped tbody tr:nth-of-type(2n+1) {
	background-color: rgba(59, 59, 59, 0.089);
}

.table-dark.table-striped tbody tr:nth-of-type(2n+1) {
	background-color: rgba(235, 235, 235, 0.089);
}

.table-border td, .table-border th {
	border: 1px solid var(--modal-footer);
}

/* Dark Mode */
.dark-mode {
	--bg-color: #1d1e20;
	--bg-text: white;
	--box-shadow-1: 0 .2rem 0 rgba(0, 0, 0, 0.05);
	--box-shadow-2: 0 .2rem 0 rgba(0,0,0,.1);
	/*--blue-light: #003166;
	--blue-alert-text: #b6d9fe;
	--blue-alert-a: rgb(129, 190, 255);
	--green-light: #338337;
	--green-alert-text: #e1ffe2;
	--green-alerta-a: #84eb89;*/
	--mark-color: #ffdc1f;
	--form1: #161310;
	--form2: #312b25;
	--form-shadow: 0 0 0 .25rem #7dd4fc98;
}

.dark-mode mark {
	opacity: 0.8;
}

.dark-mode input {
	background-color: rgba(255,255,255,.05);
	color: white;
}

.dark-mode table td, .dark-mode table th, .dark-mode table thead {
	border-color: #47494d;
}`;
	};

	fs.writeFile('style.css', cssTemplate, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./style.css...`);
		};
	});

	fs.writeFile('.editorconfig', `# EditorConfig is awesome: https://EditorConfig.org
	
root = true
	
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = tab
indent_size = 4`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./.editorconfig...`);
		};
	});

	fs.writeFile('browserconfig.xml', `<?xml version="1.0" encoding="utf-8"?>
<!-- Please read: https://msdn.microsoft.com/en-us/library/ie/dn455106.aspx -->
<browserconfig>
	<msapplication>
		<tile>
			<square70x70logo src="tile.png"/>
			<square150x150logo src="tile.png"/>
		  	<wide310x150logo src="tile-wide.png"/>
			<square310x310logo src="tile.png"/>
		</tile>
	</msapplication>
</browserconfig>`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./browserconfig.xml...`);
		};
	});

	fs.writeFile('.gitattributes', `## GITATTRIBUTES FOR WEB PROJECTS
#
# These settings are for any web project.
#
# Details per file setting:
#   text    These files should be normalized (i.e. convert CRLF to LF).
#   binary  These files are binary and should be left untouched.
#
# Note that binary is a macro for -text -diff.
######################################################################

## AUTO-DETECT
##   Handle line endings automatically for files detected as
##   text and leave all files detected as binary untouched.
##   This will handle all files NOT defined below.
* text=auto

## SOURCE CODE
*.bat      text eol=crlf
*.coffee   text
*.css      text
*.htm      text
*.html     text
*.inc      text
*.ini      text
*.js       text
*.json     text
*.jsx      text
*.less     text
*.od       text
*.onlydata text
*.php      text
*.pl       text
*.py       text
*.rb       text
*.sass     text
*.scm      text
*.scss     text
*.sh       text eol=lf
*.sql      text
*.styl     text
*.tag      text
*.ts       text
*.tsx      text
*.xml      text
*.xhtml    text

## DOCKER
*.dockerignore text
Dockerfile     text

## DOCUMENTATION
*.markdown   text
*.md         text
*.mdwn       text
*.mdown      text
*.mkd        text
*.mkdn       text
*.mdtxt      text
*.mdtext     text
*.txt        text
AUTHORS      text
CHANGELOG    text
CHANGES      text
CONTRIBUTING text
COPYING      text
copyright    text
*COPYRIGHT*  text
INSTALL      text
license      text
LICENSE      text
NEWS         text
readme       text
*README*     text
TODO         text

## TEMPLATES
*.dot        text
*.ejs        text
*.haml       text
*.handlebars text
*.hbs        text
*.hbt        text
*.jade       text
*.latte      text
*.mustache   text
*.njk        text
*.phtml      text
*.tmpl       text
*.tpl        text
*.twig       text

## LINTERS
.babelrc      text
.csslintrc    text
.eslintrc     text
.htmlhintrc   text
.jscsrc       text
.jshintrc     text
.jshintignore text
.prettierrc   text
.stylelintrc  text

## CONFIGS
*.bowerrc       text
*.cnf           text
*.conf          text
*.config        text
.browserslistrc text
.editorconfig   text
.gitattributes  text
.gitconfig      text
.gitignore      text
.htaccess       text
*.npmignore     text
*.yaml          text
*.yml           text
browserslist    text
Makefile        text
makefile        text

## HEROKU
Procfile    text
.slugignore text

## GRAPHICS
*.ai   binary
*.bmp  binary
*.eps  binary
*.gif  binary
*.ico  binary
*.jng  binary
*.jp2  binary
*.jpg  binary
*.jpeg binary
*.jpx  binary
*.jxr  binary
*.pdf  binary
*.png  binary
*.psb  binary
*.psd  binary
*.svg  text
*.svgz binary
*.tif  binary
*.tiff binary
*.wbmp binary
*.webp binary

## AUDIO
*.kar  binary
*.m4a  binary
*.mid  binary
*.midi binary
*.mp3  binary
*.ogg  binary
*.ra   binary

## VIDEO
*.3gpp binary
*.3gp  binary
*.as   binary
*.asf  binary
*.asx  binary
*.fla  binary
*.flv  binary
*.m4v  binary
*.mng  binary
*.mov  binary
*.mp4  binary
*.mpeg binary
*.mpg  binary
*.ogv  binary
*.swc  binary
*.swf  binary
*.webm binary

## ARCHIVES
*.7z  binary
*.gz  binary
*.jar binary
*.rar binary
*.tar binary
*.zip binary

## FONTS
*.ttf   binary
*.eot   binary
*.otf   binary
*.woff  binary
*.woff2 binary

## EXECUTABLES
*.exe binary
*.pyc binary`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./.gitattributes...`);
		};
	});

	fs.writeFile('site.webmanifest', `{
	"short_name": "",
	"name": "",
	"icons": [{
		"src": "icon.png",
		"type": "image/png",
		"sizes": "192x192"
	}],
	"start_url": "/?installed=yes",
	"background_color": "#fafafa",
	"theme_color": "#fafafa"
}`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./site.webmanifest...`);
		};
	});

	fs.writeFile('robots.txt', `# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Disallow:`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./robots.txt...`);
		};
	});

	fs.writeFile('humans.txt', `# humanstxt.org/
# The humans responsible & technology colophon
	
# TEAM
	
		Piotr Badełek -- Author -- @ProgramistaZ
	
	# TECHNOLOGY COLOPHON
	
		HTML5, CSS3, JS, PHP`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./humans.txt...`);
		};
	});

	fs.writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
	  <loc>http://www.example.com/index.html</loc>
	  <lastmod>2005-01-01</lastmod>
	  <priority>1</priority>
   </url>
</urlset> `, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./sitemap.xml...`);
		};
	});

	fs.writeFile('package.json', `{
	"name": "Strona Internetowa",
	"version": "0.0.1",
	"description": "Super Strona",
	"keywords": "WWW",
	"license": "MIT",
	"author": "Piotr Badełek",
	"scripts": {
		"build": "parcel build index.html",
		"dev": "parcel index.html --open",
		"start": "npm run build && npm run dev",
		"test": "echo \"Error: no test specified\" && exit 1",
	},
	"devDependencies": {
		"parcel-bundler": "^1.12.4"
	}
}`, function (err) {
		if (err) {
			return console.log(err)
		} else {
			console.log(`Creating file ./package.json...`);
		};
	});

	rl.close();
});