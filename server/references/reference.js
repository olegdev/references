/**
 * Базовый класс справочника
 */
 var fs = require('fs');

 var Reference = function(name) {
 	this.config = JSON.parse(fs.readFileSync(__dirname + '/' + name + '/' + name + '.config' , 'utf8'));
 	this.data = JSON.parse(fs.readFileSync(__dirname + '/' + name + '/' + name + '.json' , 'utf8'));
 }

Reference.prototype.addRecords = function(data) {
	this.data = this.data.concat(data);
	// TODO sync with fs
}

Reference.prototype.removeRecords = function(ids) {
	var me = this;
	ids.forEach(function(id) {
		var index;
		me.data.forEach(function(item, i) {
			if (item.id == id) {
				index = i;
			}
		});
		if (typeof index == 'number') {
			me.data.splice(index,1);
		}
	});
	// TODO sync with fs
}

 module.exports = Reference;