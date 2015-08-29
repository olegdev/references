/**
 * Основной грид
 */
Ext.define('Refs.view.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.maingrid',

	requires: [
		'Refs.view.RowEditor',
	],	
	
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			title: config.ref.name,
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
			scheme = config.ref.scheme;

		for(var key in scheme) {
			field = {
				name: key,
			};

			switch(scheme[key].type) {
				case 'number':
				case 'string':
					field.type = scheme[key].type;
					break;
				default:
					field.type = 'auto';
					break;
			}

			fields.push(field);
		};

		return Ext.create('Ext.data.JsonStore', {
			proxy: {
				type: "ajax",
		        url: location.href,  
		        reader: {
		            type    : 'json',
		        },
		        api: {
				    create  : location.href + '&cmd=add',
				    read    : '/controller/load',
				    update  : '/controller/update',
				    destroy : '/controller/destroy_action'
				}
			},
			storeId:'Main',
			fields: fields,
			data: config.data,
		});
	},

	initColumns: function() {
		var me = this,
			columns = [];

		scheme = config.ref.scheme;

		for(var key in scheme) {
			column = {
				text: scheme[key].name,
				dataIndex: key,
			};			

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
		    	Ext.widget('roweditor', {
		    		record: record,
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

			}
		}]
	}
	
});