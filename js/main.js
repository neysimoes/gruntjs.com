/*global _, List */
(function( win, $ ) {
	'use strict';

	$(function() {
		$.getJSON('http://grunt-plugin-list.herokuapp.com', function( modules ) {
			// Only show plugins created after the specified date
			modules = _.filter( modules, function( el ) {
				return Date.parse( el.time.created ) > new Date('1800-01-01');
			});

			var latestModules = _.sortBy( modules, function( el ) {
				return -Date.parse( el.time.created );
			}).splice(0, 5);

			var allModules = _.sortBy( modules, function( el ) {
				// Remove the prefix, since not all plugins has it
				return el.name.replace('grunt-', '');
			});

			var latestTpl = _.template( $('#plugins-latest-template').html(), {
				modules: latestModules
			});

			var allTpl = _.template( $('#plugins-all-template').html(), {
				modules: allModules
			});

			$('#loading').remove();
			$('#plugins-latest').append( latestTpl );
			$('#plugins-all').append( allTpl ).find('.search').show();

			new List('plugins-all', {
				valueNames: [
					'name',
					'desc',
					'author',
					'modified'
				]
			});

			$('.modified time').timeago();
		});
	});
})( window, jQuery );
