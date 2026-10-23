/*
 * Citizen
 *
 * Inline script used to apply client preferences before the page is
 * displayed. Steller uses the same storage format as Citizen preferences.
 */

const CLIENT_PREFS_STORAGE_KEY = 'mwclientpreferences';
const STELLER_SIDEBAR_FEATURE = 'steller-sidebar-collapsed';

/**
 * Migrate the previous Steller cookie to Citizen's client preference
 * storage. This runs before the initial page paint.
 *
 * @param {string} storage
 * @return {string}
 */
function migrateStellerSidebarPreference( storage ) {
	const prefix = STELLER_SIDEBAR_FEATURE + '-clientpref-';

	if ( storage.split( ',' ).some( ( entry ) => entry.startsWith( prefix ) ) ) {
		return storage;
	}

	let legacyState = null;

	const cookies = document.cookie.split( ';' );

	for ( const cookie of cookies ) {
		const separator = cookie.indexOf( '=' );

		if ( separator === -1 ) {
			continue;
		}

		const name = cookie.slice( 0, separator ).trim();
		const value = cookie.slice( separator + 1 ).trim();

		if (
			name.endsWith( 'stellerSidebar' ) ||
			name.endsWith( 'citizenSidebar' )
		) {
			try {
				legacyState = decodeURIComponent( value );
			} catch ( e ) {
				legacyState = value;
			}

			break;
		}
	}

	if ( legacyState !== 'collapsed' && legacyState !== 'expanded' ) {
		return storage;
	}

	const value = legacyState === 'collapsed' ? '1' : '0';
	const preference = prefix + value;
	const entries = storage.split( ',' ).filter( Boolean );

	entries.push( preference );
	storage = entries.join( ',' );

	try {
		/* eslint-disable-next-line mediawiki/no-storage */
		localStorage.setItem( CLIENT_PREFS_STORAGE_KEY, storage );
	} catch ( e ) {
		// Storage may be unavailable. The current page still receives the class.
	}

	return storage;
}

/**
 * Apply client preference classes from local storage.
 */
window.clientPrefs = () => {
	const root = document.documentElement;
	let className = root.className;
	let storage = '';

	/*
	 * The default class makes this feature recognizable to Citizen's
	 * preference panel even when the user has never changed its value.
	 */
	const featurePattern = new RegExp(
		'(^| )' + STELLER_SIDEBAR_FEATURE +
			'-clientpref-[a-zA-Z0-9]+( |$)'
	);

	if ( !featurePattern.test( className ) ) {
		className += ' ' + STELLER_SIDEBAR_FEATURE + '-clientpref-0';
	}

	try {
		/* eslint-disable-next-line mediawiki/no-storage */
		storage = localStorage.getItem( CLIENT_PREFS_STORAGE_KEY ) || '';
	} catch ( e ) {
		// Storage may be unavailable.
	}

	storage = migrateStellerSidebarPreference( storage );

	if ( storage ) {
		storage.split( ',' ).forEach( ( pref ) => {
			const feature = pref.replace(
				/-clientpref-\w+$|[^\w-]+/g,
				''
			);

			if ( !feature ) {
				return;
			}

			const pattern = new RegExp(
				'(^| )' + feature +
					'-clientpref-\\w+( |$)'
			);

			if ( pattern.test( className ) ) {
				className = className.replace( pattern, '$1' + pref + '$2' );
			} else {
				className += ' ' + pref;
			}
		} );
	}

	root.className = className;
};

( () => {
	window.clientPrefs();
} );