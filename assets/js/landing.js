/*
 * Landing: a Google Űrlap beágyazása, a mobil gyorssáv elrejtése, kisegítő viselkedés.
 * Nincs külső szkript, nincs követőkód, nincs süti.
 */
( function () {
	'use strict';
	var cfg = window.EK_LANDING || {};
	var slot = document.getElementById( 'form-slot' );

	function isGoogleFormUrl( u ) {
		try {
			var x = new URL( u );
			return x.protocol === 'https:' && x.hostname === 'docs.google.com' && /^\/forms\//.test( x.pathname ) && ! /\/edit\/?$/.test( x.pathname );
		} catch ( e ) { return false; }
	}

	if ( slot ) {
		if ( cfg.formUrl && isGoogleFormUrl( cfg.formUrl ) ) {
			var sep = cfg.formUrl.indexOf( '?' ) === -1 ? '?' : '&';
			var src = cfg.formUrl + sep + 'embedded=true';
			slot.setAttribute( 'data-state', 'ready' );
			slot.innerHTML = '';
			var f = document.createElement( 'iframe' );
			f.src = src;
			f.title = 'Jelentkezési űrlap – Egészségképlet információs est';
			f.loading = 'lazy';
			f.setAttribute( 'referrerpolicy', 'strict-origin-when-cross-origin' );
			f.innerHTML = 'Az űrlap betöltése...';
			slot.appendChild( f );
			var p = document.createElement( 'p' );
			p.className = 'fine form-alt';
			p.innerHTML = 'Nem jelenik meg az űrlap? <a rel="noopener noreferrer" target="_blank"></a>';
			p.querySelector( 'a' ).href = cfg.formUrl;
			p.querySelector( 'a' ).textContent = 'Nyisd meg külön lapon';
			slot.appendChild( p );
		} else {
			slot.setAttribute( 'data-state', 'pending' );
			slot.innerHTML = '<div class="notice"><p><strong>Az online űrlap hamarosan elérhető.</strong> Addig jelentkezz telefonon, vagy írj az <a href="mailto:egeszsegkeplet@gmail.com">egeszsegkeplet@gmail.com</a> címre. Kérjük, add meg a neved, a telefonszámod és hogy hányan jöttök.</p></div>';
		}
	}

	// A mobil gyorssáv a jelentkezési szakasz láthatóságakor eltűnik (ne takarja az űrlapot).
	var bar = document.querySelector( '.bar' );
	var reg = document.getElementById( 'jelentkezes' );
	if ( bar && reg && 'IntersectionObserver' in window ) {
		new IntersectionObserver( function ( es ) {
			document.body.classList.toggle( 'in-form', es[ 0 ].isIntersecting );
		}, { threshold: 0.12 } ).observe( reg );
	}
}() );
