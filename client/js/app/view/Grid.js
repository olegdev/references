/**
 * Основной грид
 */
Ext.define('Refs.view.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.maingrid',

	requires: [
		// 
	],	
	
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			title: config.ref.name,
			columns: me.initColumns(),
			store: me.initStore(),
			selModel: Ext.create('Ext.selection.CheckboxModel'),
		});
	
		
		me.callParent();
	},

	initStore: function() {
		var me = this,
			field, fields = [],
			scheme = config.ref.scheme;

		for(var key in scheme) {
			field = {
				name: key,
			};

			switch(scheme[key].type) {
				case 'number':
				case 'string':
					field.type = scheme[key].type;
					break;
				default:
					field.type = 'auto';
					break;
			}

			fields.push(field);
		};

		return Ext.create('Ext.data.JsonStore', {
			storeId:'Main',
			fields: fields,
			data: config.data,
		});
	},

	initColumns: function() {
		var me = this,
			columns = [];

		scheme = config.ref.scheme;

		for(var key in scheme) {
			column = {
				text: scheme[key].name,
				dataIndex: key,
			};			

			columns.push(column);
		};

		return columns;
	}
	
});