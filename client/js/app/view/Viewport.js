/**
 * Экран приложения
 */
Ext.define('Refs.view.Viewport', {
	extend: 'Ext.container.Container',

	requires: [
		'Refs.view.Blob',
	],
	
	id: 'viewport',
	
	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	renderTo: 'viewport-wrapper',
	
	initComponent: function() {
		var me = this;

		me.items = [{
			xtype: 'container',
			layout: {
				type: 'hbox',
				pack: 'left',
			},
			items: me.initButtons(),
			padding: '3',
		}];

		if (config.ref) {
			me.items.push({
				xtype: 'blob',
				mode: 'remote',
				flex: 1,
				title: config.ref.title,
				value: config.data,
				scheme: config.ref.scheme,
			});
		} else {
			me.items.push({
				xtype: 'panel',
				title: 'Справочники',
				flex: 1,
			});
		}
		
		me.callParent();
	},

	initButtons: function() {
		var me = this,
			buttons = [];

		config.references.forEach(function(item) {
			buttons.push({
				xtype: 'button',
				text: item.title,
				href: 'http://' + location.host + '?ref=' + item.name,
				hrefTarget: '_self',
				margin: '0 10 0 0',
			})
		});

		return buttons;

	},
	
});