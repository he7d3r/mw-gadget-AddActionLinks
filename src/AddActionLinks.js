/**
 * Adds "edit", "hist" and "delete" link to [[Special:WhatLinksHere]] and the list of templates used in a page
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 * Based on [[mw:Snippets/Special:WhatLinksHere action links]] (rev 2)
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/AddActionLinks.js]] ([[File:User:Helder.wiki/Tools/AddActionLinks.js]])
 */
/*jslint browser: true, white: true, forin: true, todo: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function addRelevantLinks ( rights ){
	var actions = {
			history: 'hist'
		},
		sel = {};
	if ( $.inArray( 'delete', rights ) !== -1 ){
		actions['delete'] = 'elim';
	}
	if( mw.config.get( 'wgCanonicalSpecialPageName' ) ){
		actions.edit = 'editar';
		sel.items = '#mw-whatlinkshere-list li';
		sel.link = '.mw-whatlinkshere-tools a:last';
	} else {
		sel.items = '#editform .templatesUsed li';
		sel.link = 'a:last';
	}
	$( function(){
		$( sel.items ).each( function() {
			var action,
				$a = $( sel.link, this ),
				url = mw.config.get( 'wgScript' ) + '?title=' +
					encodeURIComponent( $( 'a:first', this ).text() ) +
					'&action=';
			for( action in actions ){
				$a.after(
					$( '<a>' )
						.attr( 'href', url + action )
						.text( actions[ action ] )
				).after( ' | ' );
			}
		} );
	} );

}

if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Whatlinkshere' || $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
	// TODO: Add chekboxes to show/hide each extra button
	mw.loader.using( 'mediawiki.user', function(){
		mw.user.getRights( addRelevantLinks );
	} );
}

}( mediaWiki, jQuery ) );