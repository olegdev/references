/**
 * Редактор строчки грида
 */
Ext.define('Refs.view.RowEditor', {
	extend: 'Ext.window.Window',
	alias: 'widget.roweditor',

	width: 400,
	height: 400,

	autoShow: true,

	requires: [
		//
	],

	/**
	 * @cfg
	 */
	record: null,	
	
	initComponent: function() {
		var me = this;
		me.items = [{
			xtype: 'textfield',
		}];

		console.log(me.record.data);

		me.callParent(arguments);
	},
});