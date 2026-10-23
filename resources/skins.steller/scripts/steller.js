/**
 * Steller sidebar and native Citizen menu integration.
 */
( function () {
	const root = document.documentElement;
	const sidebar = document.querySelector( '.steller-sidebar' );
	const sidebarDetails = sidebar?.querySelector( '.steller-sidebar__details' );
	const toggle = sidebar?.querySelector( '.steller-sidebar__toggle' );

	const preferenceName = 'steller-sidebar-collapsed';
	const preferencePrefix = preferenceName + '-clientpref-';
	const expandedClass = preferencePrefix + '0';
	const collapsedClass = preferencePrefix + '1';
	const storageKey = 'mwclientpreferences';

	const desktopQuery = window.matchMedia( '(min-width: 1120px)' );

	if ( !sidebar || !sidebarDetails || !toggle ) {
		return;
	}

	const menuSections = [];

	function isDesktopSidebar() {
		return desktopQuery.matches &&
			root.classList.contains( 'citizen-header-position-left' );
	}

	function isCollapsed() {
		return root.classList.contains( collapsedClass );
	}

	function setPreferenceClass( collapsed ) {
		root.classList.remove( expandedClass, collapsedClass );
		root.classList.add(
			collapsed ? collapsedClass : expandedClass
		);
	}

	function setToggleLabel( messageKey ) {
		const label = mw.msg( messageKey );

		toggle.setAttribute( 'aria-label', label );
		toggle.setAttribute( 'title', label );
	}

	function registerPreference( register ) {
		register( {
			preferences: {
				[ preferenceName ]: {
					section: 'behavior',
					options: [ '0', '1' ],
					type: 'switch',
					labelMsg: 'steller-sidebar-preference-name',
					descriptionMsg: 'steller-sidebar-preference-description',
					visibilityCondition: 'always',
					default: '0'
				}
			}
		} );
	}

	mw.hook( 'citizen.preferences.register' ).add( registerPreference );

	/**
	 * Make each native Citizen menu heading a collapsible button.
	 * Keep the original menu content and links untouched.
	 */
	function enhanceMenuHeadings() {
		sidebar.querySelectorAll(
			'.steller-main-menu > .citizen-menu'
		).forEach( ( nav ) => {
			const heading = nav.querySelector(
				':scope > .citizen-menu__heading'
			);
			const content = nav.querySelector(
				':scope > .citizen-menu__content'
			);

			if (
				!heading ||
				!content ||
				heading.dataset.stellerEnhanced === 'true'
			) {
				return;
			}

			const label = heading.textContent.trim();

			if ( !label ) {
				return;
			}

			content.id = content.id || `${ nav.id || 'steller-menu' }-content`;
			content.hidden = false;

			const button = document.createElement( 'button' );
			button.type = 'button';
			button.className = 'citizen-menu__heading steller-menu__heading';
			button.setAttribute( 'aria-controls', content.id );
			button.setAttribute( 'aria-expanded', 'true' );

			const icon = document.createElement( 'span' );
			icon.className =
				'citizen-ui-icon mw-ui-icon-wikimedia-book steller-menu__heading-icon';
			icon.setAttribute( 'aria-hidden', 'true' );

			const text = document.createElement( 'span' );
			text.className = 'steller-menu__heading-label';
			text.textContent = label;

			const chevron = document.createElement( 'span' );
			chevron.className =
				'citizen-ui-icon mw-ui-icon-wikimedia-collapse steller-menu__heading-chevron';
			chevron.setAttribute( 'aria-hidden', 'true' );

			button.append( icon, text, chevron );
			heading.replaceWith( button );

			nav.classList.add( 'steller-menu' );
			nav.dataset.stellerEnhanced = 'true';

			const section = { button, content };
			menuSections.push( section );

			button.addEventListener( 'click', () => {
				/*
				 * In compact mode, selecting a section also expands the
				 * sidebar, so its links have room to be displayed.
				 */
				if ( isDesktopSidebar() && isCollapsed() ) {
					savePreference( false );
					applyDesktopState( false );
					content.hidden = false;
					button.setAttribute( 'aria-expanded', 'true' );
					return;
				}

				content.hidden = !content.hidden;
				button.setAttribute(
					'aria-expanded',
					String( !content.hidden )
				);
			} );
		} );
	}

	function savePreference( collapsed ) {
		setPreferenceClass( collapsed );

		try {
			/* eslint-disable-next-line mediawiki/no-storage */
			const existing = localStorage.getItem( storageKey ) || '';
			const entries = existing.split( ',' ).filter( ( entry ) => {
				return entry && !entry.startsWith( preferencePrefix );
			} );

			entries.push( preferencePrefix + ( collapsed ? '1' : '0' ) );

			/* eslint-disable-next-line mediawiki/no-storage */
			localStorage.setItem( storageKey, entries.join( ',' ) );
		} catch ( e ) {
			// The current page remains usable if storage is unavailable.
		}

		mw.hook( 'citizen.preferences.changed' ).fire(
			preferenceName,
			collapsed ? '1' : '0'
		);
	}

	function applyDesktopState( collapsed ) {
		setPreferenceClass( collapsed );
		sidebarDetails.open = false;

		toggle.setAttribute( 'aria-expanded', String( !collapsed ) );
		setToggleLabel(
			collapsed ?
				'steller-sidebar-expand' :
				'steller-sidebar-collapse'
		);

		menuSections.forEach( ( section ) => {
			section.button.setAttribute(
				'aria-expanded',
				String( !collapsed && !section.content.hidden )
			);
		} );
	}

	function applyMobileState() {
		sidebarDetails.open = false;
		toggle.setAttribute( 'aria-expanded', 'false' );
		setToggleLabel( 'steller-sidebar-open' );
	}

	function syncViewport() {
		if ( isDesktopSidebar() ) {
			applyDesktopState( isCollapsed() );
		} else {
			applyMobileState();
		}
	}

	enhanceMenuHeadings();
	syncViewport();

	toggle.addEventListener( 'click', ( event ) => {
		if ( !isDesktopSidebar() ) {
			return;
		}

		event.preventDefault();

		const nextState = !isCollapsed();
		savePreference( nextState );
		applyDesktopState( nextState );
	} );

	sidebarDetails.addEventListener( 'toggle', () => {
		if ( !isDesktopSidebar() ) {
			toggle.setAttribute(
				'aria-expanded',
				String( sidebarDetails.open )
			);
			setToggleLabel(
				sidebarDetails.open ?
					'steller-sidebar-close' :
					'steller-sidebar-open'
			);
		}
	} );

	mw.hook( 'citizen.preferences.changed' ).add( ( feature, value ) => {
		if ( feature !== preferenceName ) {
			return;
		}

		const collapsed = value === '1';
		setPreferenceClass( collapsed );

		if ( isDesktopSidebar() ) {
			applyDesktopState( collapsed );
		}
	} );

	desktopQuery.addEventListener( 'change', syncViewport );
}() );