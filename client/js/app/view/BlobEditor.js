/**
 * Редактор блоба
 */
Ext.define('Refs.view.BlobEditor', {
	extend: 'Ext.window.Window',
	alias: 'widget.blobeditor',

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
			xtype: 'blob',
			value: me.value,
			scheme: me.scheme,
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

	saveAndClose: function() {
		var me = this,
			data = [];
			
		me.items.items[0].store.each(function(rec) {
			data.push(rec.data);
		});

		me.value = data;

		setTimeout(function() {
			me.close();	
		},0);
	}

});