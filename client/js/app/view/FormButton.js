/**
 * Кнопка формы, отображаемая в редакторе
 */
Ext.define('Refs.view.FormButton', {
	extend: 'Ext.button.Button',
	alias: 'widget.formbutton',	

	requires: [
		'Refs.view.FormEditor',	
	],	

	text: 'Форма',

	/**
	 * @cfg {Mixed} value
	 */

	/**
	 * @cfg {Mixed} scheme
	 */

	 handler: function() {
	 	var me = this;

	 	var editor = Ext.widget('formeditor', {
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