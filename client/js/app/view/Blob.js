/**
 * Основной грид
 */
Ext.define('Refs.view.Blob', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.blob',

	requires: [
		'Refs.view.FormButton',
		'Refs.view.BlobButton',
	],	
	
	/**
	 * @cfg 
	 */
	 mode: 'local',
	 value: [],
	 scheme: {},
	 title: '',

	initComponent: function() {
		var me = this;

		Ext.apply(me, {			
			columns: me.initColumns(),
			store: me.initStore(),
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			selType: 'cellmodel',
		    plugins: [
		        Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ],
			tbar: me.initToolbar(),
		});
		
		me.callParent();
	},

	initStore: function() {
		var me = this,
			field, fields = [],
			scheme = me.scheme,
			proxy;

		for(var key in scheme) {
			field = {
				scheme: scheme[key],
				name: key,
			};

			switch(scheme[key].type) {
				case 'number':
				case 'string':
					field.type = scheme[key].type;
					break;
				case 'html':
					field.type = "string";
					break;
				case 'list':
					field.type = "auto";
					field.convert = (function(scheme) {
						return function(v) {
							scheme.list.forEach(function(item) {
								if (item.id == v) {
									v = item.name;
								}
							});
							return v;
						}
					}(scheme[key]));
					break;
				case 'form':
					field.type = "auto";					
					break;
				case 'blob':
					field.type = "auto";
					field.convert = function(v) {
						return v ? v : [];
					}
					break;
				default:
					field.type = 'auto';
					break;
			}

			fields.push(field);
		};

		if (me.mode != 'local') {
			proxy = {
				type: "ajax",
		        url: location.href,  
		        reader: {
		            type    : 'json',
		        },
		        api: {
				    create  : location.href + '&cmd=add',
				    update  : location.href + '&cmd=update',
				    destroy : location.href + '&cmd=remove',
				}
			};
		}

		return Ext.create('Ext.data.JsonStore', {
			proxy: proxy,
			fields: fields,
			data: me.value,
		});
	},

	initColumns: function() {
		var me = this,
			columns = [];

		var scheme = me.scheme;

		for(var key in scheme) {
			column = {
				text: scheme[key].title,
				dataIndex: key,
			};			

			if (scheme[key].type == 'form') {
				column.renderer = function() {
					return '...';
				}
			}

			if (scheme[key].type == 'blob') {
				column.renderer = function(v) {
					return v && v.length ? 'x' + v.length : '...';
				}	
			}

			columns.push(column);
		};

		columns.push({
			header: '',
    		dataIndex: '',
    		width: 24,
    		style: {
    			cursor: 'pointer',
    		},
    		renderer: function(){
		        return '<img width="10px" style="cursor: pointer;" src="/img/lights31.png" />';
		    },
		    getEditor: function(record) {
		    	Ext.widget('formeditor', {
		    		title: 'Редактор строки справочника',
		    		value: record.data,
		    		scheme: scheme,
		    		listeners: {
		    			"save": function(ed) {
		    				record.set(ed.value);
		    				me.store.sync();
		    			}
		    		}
		    	});
		    	return false;
		    }
		});

		return columns;
	},

	initToolbar: function() {
		var me = this;

		return [{
			xtype: 'button',
			text: 'Добавить',
			handler: function() {
				Ext.widget('formeditor', {
		    		title: 'Новая запись',
		    		value: {},
		    		scheme: me.scheme,
		    		listeners: {		    			
		    			"save": function(ed) {
		    				var record = new me.store.model;		    				
		    				record.set(ed.value);
		    				me.store.add(record);
		    				me.store.sync();
		    			}
		    		}
		    	});
			}
		},{
			xtype: 'button',
			text: 'Удалить',
			handler: function() {
				var recods = me.getSelectionModel().getSelection();
				if (recods.length) {
					var ids = [];
					recods.forEach(function(rec) {
						ids.push(rec.get('id'));
					});
					Ext.Msg.confirm('Точно?', 'Удалить строки #' + ids.join(', #') + '?', function(answer) {
						if (answer == 'yes') {
							me.store.remove(recods);
							me.store.sync();
						}
					});
				}
			}
		}]
	}
	
});