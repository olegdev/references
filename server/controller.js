/**
 * Контроллер. Все запросы с cmd обрабатываются здесь
 */

module.exports = {
	process: function(ref, cmd, params, callback) {
		switch(cmd) {
			case 'update': {
				ref.update(params, callback);
				break;
			}
			case 'add': {
				ref.add(params, callback);
				break;
			}
			case 'remove': {
				ref.remove(params, callback);
				break;
			}
			default: {
				callback('Unknown cmd');
			}
		}
	}
}