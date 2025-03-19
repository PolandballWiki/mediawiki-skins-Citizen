/**
 * Handles the expansion and collapse of the header for screens wider than 640px.
 * Toggles the header size and visibility of navigation elements on button click.
 * Remembers the state using a cookie.
 *
 * @constant {string} cookieName - The name of the cookie used to store the state.
 * @constant {string} collapsedClass - The CSS class applied when the header is collapsed.
 * @constant {string} expandedHeaderSize - The CSS variable value for the expanded header size.
 * @constant {string} collapsedHeaderSize - The CSS variable value for the collapsed header size.
 * @function applyCollapseState - Applies the collapsed or expanded state to the header.
 */
(function () {
    var $toggleButton = $('#toggle-nav');
    var $citizenHeader = $('.citizen-header');
    var $siteInfo = $('.steller-header-siteinfo, .steller-header-nav'); // Navigation elements
    var cookieName = 'citizenSidebar';
    var collapsedClass = 'collapsed';
    var expandedHeaderSize = '13.5rem';
    var collapsedHeaderSize = '3.5rem';

    // Function to apply the collapsed or expanded state
    function applyCollapseState(isCollapsed) {
        if (isCollapsed) {
            $('body').addClass(collapsedClass);
            $citizenHeader.addClass(collapsedClass).css('--header-size', collapsedHeaderSize);
            $siteInfo.hide();
        } else {
            $('body').removeClass(collapsedClass);
            $citizenHeader.removeClass(collapsedClass).css('--header-size', expandedHeaderSize);
            $siteInfo.show();
        }
    }

    // Load the mediawiki.cookie module
    mw.loader.using('mediawiki.cookie').then(function () {
        if (window.matchMedia("(min-width: 640px)").matches) {
            // Get the initial state from the cookie
            var isCollapsed = mw.cookie.get(cookieName) === 'collapsed';
            applyCollapseState(isCollapsed);

            $toggleButton.on('click', function () {
                isCollapsed = !isCollapsed;
                applyCollapseState(isCollapsed);

                // Save the state in the cookie for 30 days
                mw.cookie.set(cookieName, isCollapsed ? 'collapsed' : 'expanded', { expires: 30 });
            });
        }
    });
})();
