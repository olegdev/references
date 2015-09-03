/**
 * Контроллер отображения чата
 */
Ext.define('Refs.controller.Main', {
	extend: 'Ext.app.Controller',

	init: function(app) {
		var me = this;

		Ext.Ajax.on('requestexception', function(conn, resp, opts) {
			Ext.Msg.alert('Server error', 'Server error "' + resp.status + '" <br/> ' + opts.url + '<br/><br/>' + resp.responseText + '');
		});

	},

});
			