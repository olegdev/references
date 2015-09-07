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

Reference.prototype.add = function(data, callback) {
	var me = this;
	data.id = me.getId();
	this.data.push(data);
	this.sync();
	callback();
}

Reference.prototype.update = function(data, callback) {
	var me = this;
	if (data.id) {
		for(var i = 0; i < this.data.length; i++) {
			if (this.data[i].id == data.id) {				
				this.data[i] = data;
				me.sync();
				callback();
				return;
			}
		}
		callback('Record not found');
		return;
	} else {
		callback('Record id is not defined');
		return;
	}
}

Reference.prototype.remove = function(records, callback) {
	var me = this;
	if (records.id) {
		records = [records];
	}
	records.forEach(function(rec) {
		var index;
		me.data.forEach(function(item, i) {
			if (item.id == rec.id) {
				index = i;
			}
		});
		if (typeof index == 'number') {
			me.data.splice(index,1);
		}
	});
	me.sync();
	callback();
}

Reference.prototype.sync = function() {
	fs.writeFileSync(__dirname + '/references/' + this.name + '/' + this.name + '.json' , JSON.stringify(this.data), {encoding: 'utf8'});
};

Reference.prototype.getId = function() {	
	if (this.data.length) {
		return this.data[this.data.length-1].id+1;
	} else {
		return 1;
	}
};

Reference.prototype.asList = function() {
	var me = this,
		list = [];
	this.data.forEach(function(item) {
		list.push({id: item.id, name: item.name});
	});
	return list;
}

Reference.prototype.resolveReferenceLinks = function(config) {
	var me = this,
		ref;

	for(var key in config) {
 		if (typeof config[key] == 'object') {
 			if (config[key].type == "ref") {
 				ref = new Reference(config[key].ref);
 				config[key] = {
 					type: "list",
 					title: config[key].title,
 					list: ref.asList(),
 				}
 			} else {
 				me.resolveReferenceLinks(config[key]);
 			}
 		}
 	}
}

Reference.prototype.syncRemote = function(callback) {
	var me = this,
		dest = CONFIG.export_folder + '/' + me.name,

		copyFile = function(src, dest, cb) {
			var cbCalled = false;
			var done = function(err) {
	    		if (!cbCalled) {
	      			cb(err);
	      			cbCalled = true;
	    		}
	  		}
			var rd = fs.createReadStream(src);
	  		rd.on("error", function(err) {
	    		done(err);
	  		});
	  		var wr = fs.createWriteStream(dest);
	  		wr.on("error", function(err) {
	    		done(err);
	  		});
	  		wr.on("close", function(ex) {
	    		done();
	  		});
	  		rd.pipe(wr);
		}


	if (!fs.existsSync(dest)){
	    fs.mkdirSync(dest);
	}

	copyFile(__dirname + '/references/' + me.name + '/' + me.name + '.config', dest + '/' + me.name + '.config', function(err) {
		if (err) {
			callback(err);
		} else {
			copyFile(__dirname + '/references/' + me.name + '/' + me.name + '.json', dest + '/' + me.name + '.json', function(err) {
				callback(err);
			});
		}
	});
}

module.exports = Reference;