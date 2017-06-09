# REM unit

CSS units can be quite tricky to master. PX is too static and make it hard to change the size of all elements globally on a layout (e.g. zoom in/zoom out using scripts). EM is a good unit but the challenge is that you might need to overwrite a lot of selectors if you use values other than 1EM (e.g. labels, lists inside lists, spans, etc.).

What option is there left? REM units. The problem is that this unit is known for having a few issues, including lack of support for older browsers. While supporting these older browsers is becoming less and less important, they can be good tools to use to see how compatible your site is.

There is not a lot of options today to polyfill REM but the rare options available seems to have open issues and bugs. They also do not play nice with other important Polyfills such as https://github.com/scottjehl/Respond.

### What is supported

1. All CSS contained in link[rel=stylesheet] elements.
2. Replace (**in-place**) all stylesheets of these elements with the REM changed by the PX equivalent value.
3. Does not run if REM is supported (safe to add on recent browser).

### What is not supported

1. @import or inline CSS in <style> tags.
2. Dynamic behaviors of REM units (onces it's in PX, its in PX).
3. @media (media queries). If your browser does not support it natively. You will need to add the modified version of `respond.js`.

### Usage

Simply add this script after your <link> (stylesheets) elements.

	<script src="remPolyfill.js"></script>

### Media Queries

So what now, you need @media (media queries) support but `respond.js` does not support REM units. No problem, simply add the modified `respond.js` script in this repository. Make sure to add this after the `remPolyfill.js` since it depends on this script to be loaded first. `remPolyfill.js` must also be loaded synchronously to make sure it will be ready to use.

	<script src="respond.js"></script>


