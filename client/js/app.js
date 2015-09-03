Ext.ns('Refs');

Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Refs': 'js/app',		
	}
});

Ext.onReady(function() {
	Ext.application({		
		appFolder: 'js/app',	
		appProperty: 'app',
		autoCreateViewport: true,
		enableQuickTips: true,
		name: 'Refs',
		requires: [
			'Refs.view.Viewport',
		],

		controllers: [
			'Main',
		],

		models: [
			//
		],

		stores: [
			//
		],

		init: function() {
			var me = this,
				ns;
			
			Refs[me.appProperty] = me;

			me.callParent();
		},
	});
});