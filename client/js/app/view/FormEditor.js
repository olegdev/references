/**
 * Редактор строчки грида
 */
Ext.define('Refs.view.FormEditor', {
	extend: 'Ext.window.Window',
	alias: 'widget.formeditor',

	width: 800,
	height: 500,

	maximizable: true,
	modal: true,

	autoShow: true,

	requires: [		
		'Refs.plugin.WinCascade',
	],

	plugins: [{
		ptype: 'cascade',
	}],

	/**
	 * @cfg
	 */
	scheme: null,
	value: null,
	title: null,

	layout: 'fit',

	autoShow: true,

	initComponent: function() {
		var me = this;

		me.value = me.value || {};

		me.addEvents('save');

		me.items = [{
			xtype: 'panel',
			layout: 'form',
			bodyPadding: '10',
			items: me.initFields(),
		}];

		me.buttons = [{
			text: 'Сохранить',
			handler: function() {
				me.saveAndClose();
				me.fireEvent('save', me, me.value);
			}
		},{
			text: 'Отмена',
			handler: function() {
				me.close();
			}
		},]

		me.callParent(arguments);
	},

	initFields: function() {
		var me = this,
			items = [],
			scheme, item;

		me.filters = {};

		for(var key in me.scheme) {
			if (me.scheme[key].type == 'list' && me.scheme[key].filter) {
				me.filters[key] = me.value[key];
			}
		}

		for(var key in me.scheme) {
			scheme = me.scheme[key];
			switch(scheme.type) {
				case 'number': {
					item = {
						xtype: 'numberfield',
						name: key,
						value: me.value[key],
						fieldLabel: scheme.title,
					};
					break;
				}
				case 'string': {
					item = {
						xtype: 'textfield',
						name: key,
						value: me.value[key],
						fieldLabel: scheme.title,
					};
					break;
				}
				case 'html': {
					item = {
						xtype: 'htmleditor',
						name: key,
						value: me.value[key],
						fieldLabel: scheme.title,
					};
					break;
				}
				case 'list': {
					item = {
						xtype: 'combo',
						name: key,
						value: me.value[key],
						fieldLabel: scheme.title,
						queryMode: 'local',
					    displayField: 'name',
					    valueField: 'id',
					    triggerAction: 'all',
					    store: Ext.create('Ext.data.JsonStore', {
					    	fields: [{
					    		name: 'id',
					    		type: 'int'
					    	}, {
					    		name: 'name',
					    		type: 'string'
					    	}],
					    	data: scheme.list,
					    })
					};
					break;
				}
				case 'form': {
					item = {
						xtype: 'formbutton',
						name: key,
						value: me.value[key],
						scheme: scheme.form,
						text: scheme.title,
						margin: '20 0 0 0',
					};
					break;
				}
				case 'blob': {
					item = {
						xtype: 'blobbutton',
						name: key,
						value: me.value[key],
						scheme: scheme.blob.scheme,
						text: scheme.title,
						margin: '20 0 0 0',
					};
					break;
				}
			}

			item.readOnly = scheme.readOnly;

			if (scheme.filter_value) {
				item.filterValue = scheme.filter_value;
				item.hidden = me.filters[scheme.filter_value.name] != scheme.filter_value.value;
			}

			if (scheme.type == 'list' && scheme.filter) {
				item.listeners = {
					select: function(field) {
						me.filters[field.name] = field.getValue();
						me.onFilterChanged();
					}
				}				
			}

			items.push(item);
		}

		return items;
	},

	onFilterChanged: function() {
		var me = this,
			form = me.items.items[0];

		form.items.each(function(item) {
			if (item.filterValue) {
				item.setVisible(item.filterValue.value == me.filters[item.filterValue.name]);
			}
		});
	},

	saveAndClose: function() {
		var me = this,
			data = {},
			form = me.items.items[0];		

		form.items.each(function(item) {
			if (item.isVisible()) {
				data[item.name] = item.getValue();
			}
		});

		me.value = data;

		setTimeout(function() {
			me.close();	
		},0);
	}
});