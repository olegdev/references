Ext.define('Refs.plugin.WinCascade', {
   alias: 'plugin.cascade',
	
	init: function(win) {
		if(!window.cascadeArr) {
			window.cascadeArr = [];
		}
		
		window.cascadeArr.push(win);
		
		if(!window.cascadePosition) {
			window.cascadePosition = {
				x: 150,
				y: 150
			}
		}		

		var closeEvent = win.closeAction === 'hide' ? 'hide' : 'close';
		
		win.on('show', function() {
			if (win.maximized) {
				return;
			}

			win.setPosition(window.cascadePosition.x, window.cascadePosition.y);
			
			window.cascadePosition.x += 20;
			window.cascadePosition.y += 20;
		});

		win.on(closeEvent, function() {
			if (win.maximized) {
				return;
			}
			window.cascadePosition.x -= 20;
			window.cascadePosition.y -= 20;
		});

		win.on('maximize', function() {
			window.cascadePosition.x -= 20;
			window.cascadePosition.y -= 20;
		});
		win.on('restore', function() {
			window.cascadePosition.x += 20;
			window.cascadePosition.y += 20;
		});
	}
});