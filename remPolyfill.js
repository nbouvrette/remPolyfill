/**
 * For browsers that do not support REM units, fallback to pixels.
 */
window.remPolyfill = {

    /** @property Number|null - The body's font size.
     *  @private */
    bodyFontSize: null,

    /**
     * Is REM supported?
     *
     * @returns {Boolean} - True when supported, otherwise false.
     */
    remIsSupported: function () {
        var divElement = document.createElement( 'div' );
        divElement.style.cssText = 'font-size: 1rem;';
        var hasSupports = (/rem/).test(divElement.style.fontSize);
        divElement = null;
        return hasSupports;
    },

    /**
     * Get the body font size.
     *
     * @returns {Number} - The body font size in pixel (number only).
     */
    getBodyFontSize: function() {
        if (!this.bodyFontSize) {
            var hasNoBodyElement = false;

            if (!document.body) {
                hasNoBodyElement = true;
                var bodyElement = document.createElement('body');
                document.documentElement.appendChild(bodyElement);
            }

            this.bodyFontSize = parseFloat(this.getStyle(document.body, 'fontSize'));

            if (hasNoBodyElement) {
                document.documentElement.removeChild(bodyElement);
                bodyElement = null;
            }
        }
        return this.bodyFontSize;
    },

    /**
     * Get the style of an element for a given property.
     *
     * @private
     *
     * @param {HTMLElement} element - The HTML element.
     * @param {string} property     - The property of the style to get.
     */
    getStyle: function(element, property) {
        if (typeof window.getComputedStyle !== 'undefined') {
            return window.getComputedStyle(element, null).getPropertyValue(property);
        } else {
            return element.currentStyle[property];
        }
    },

    /**
     * Implement this script on a given element.
     *
     * @private
     *
     * @param {HTMLLinkElement} linkElement - The link element from which to get the CSS text.
     * @param {string} cssText              - The CSS text of the link element.
     */
    replaceRemWithPx: function (linkElement, cssText) {
        if (cssText) {
            // Replace all properties containing REM units with their pixel equivalents.
            linkElement.styleSheet.cssText = cssText.replace(
                /([\d]+\.[\d]+|\.[\d]+|[\d]+)rem/g, function (fullMatch, groupMatch) {
                    return Math.round(parseFloat(groupMatch * remPolyfill.getBodyFontSize())) + 'px';
                }
            );
        }
    },

    /**
     * Implement this script on a given element.
     *
     * @param {HTMLLinkElement} linkElement - The link element to polyfill.
     */
    implement: function (linkElement) {
        if (!linkElement.href) {
            return;
        }

        var request = null;

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (exception) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (exception) {
                    request = null;
                }
            }
        }

        if (!request) {
            return;
        }

        request.open('GET', linkElement.href, true);
        request.onreadystatechange = function() {
            if ( request.readyState === 4 ){
                remPolyfill.replaceRemWithPx(linkElement, request.responseText);
            }
        };

        request.send(null);
    }
};

// Polyfill all stylesheets.
if (!remPolyfill.remIsSupported()) {
    var linkElements = document.querySelectorAll('link[rel=stylesheet]');
    for (var linkElementId in linkElements) {
        if (Object.prototype.hasOwnProperty.call(linkElements, linkElementId)) {
            remPolyfill.implement(linkElements[linkElementId]);
        }
    }
}
