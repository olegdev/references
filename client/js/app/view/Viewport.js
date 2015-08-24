/**
 * Экран приложения
 */
Ext.define('Refs.view.Viewport', {
	extend: 'Ext.container.Container',

	requires: [
		'Refs.view.Grid',
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
				xtype: 'maingrid',
				flex: 1,
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
				text: item.name,
				href: item.href,
				margin: '0 10 0 0',
			})
		});

		return buttons;

	},
	
});