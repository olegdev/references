/**
 * Кнопка блоба, отображаемая в редакторе
 */
Ext.define('Refs.view.BlobButton', {
	extend: 'Ext.button.Button',
	alias: 'widget.blobbutton',	

	requires: [	
		'Refs.view.BlobEditor',
	],	

	text: 'Блоб',

	/**
	 * @cfg {Mixed} value
	 */

	/**
	 * @cfg {Mixed} scheme
	 */

	 handler: function() {
	 	var me = this;

	 	var editor = Ext.widget('blobeditor', {
	 		title: me.text,
	 		value: me.value,
	 		scheme: me.scheme,
	 		listeners: {
	 			'save': function(ed, value) {
	 				me.value = value;
	 			},	 			
	 		}
	 	});	 	
	 },

	getValue: function() {
		var me = this;
		return me.value;
	},

});