/**
 * Базовый класс справочника
 */
 var fs = require('fs');

 var Reference = function(name) {
 	var me = this;

 	me.name = name;
 	me.config = JSON.parse(fs.readFileSync(__dirname + '/references/' + name + '/' + name + '.config' , 'utf8'));
 	me.data = JSON.parse(fs.readFileSync(__dirname + '/references/' + name + '/' + name + '.json' , 'utf8'));

 	me.resolveReferenceLinks(me.config);
}

Reference.getAllList = function() {
	var list = [];
	fs.readdirSync(__dirname + '/references').forEach(function(dirName) {
		var config = JSON.parse(fs.readFileSync(__dirname + '/references/' + dirName + '/' + dirName + '.config' , 'utf8'));
		list.push({
			name: dirName,
			title: config.title
		})
	});
	return list;
}

Reference.getAllList();