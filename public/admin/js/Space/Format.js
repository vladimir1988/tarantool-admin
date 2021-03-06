Ext.define('Admin.Space.Format', {

  extend: 'Ext.grid.Panel',

  title: 'Format',
  width: 300,

  store: {
    fields: ['index', 'name', 'type'],
  },

  listeners: {
    selectionchange(sm, sel) {
      this.down('[name=remove-button]').setDisabled(!sel.length);
    }
  },

  tbar: [{
    text: 'Add',
    iconCls: 'fa fa-plus-circle',
    handler() {
      var win = Ext.create('Ext.window.Window', {
        modal: true,
        title: 'New property',
        items: [{
          xtype: 'form',
          bodyPadding: 10,
          items: [{
            selectOnFocus: true,
            fieldLabel: 'Name',
            allowBlank: false,
            xtype: 'textfield',
            name: 'name'
          }, {
            fieldLabel: 'Type',
            allowBlank: false,
            name: 'type',
            value: 'unsigned',

            xtype: 'combobox',
            editable: false,
            queryMode: 'local',
            displayField: 'type',
            valueField: 'type',
            store: {
              xtype: 'arraystore',
              fields: ['type'],
              data: ['unsigned', 'str'].map(v => [v])
            }
          }],
          bbar: ['->', {
            formBind: true,
            text: 'Create',
            handler: () => {
              var values = win.down('form').getValues();
              var params = Ext.apply({
                name: values.name,
                type: values.type,
              }, this.up('space-tab').params);

              dispatch('space.addProperty', params)
                .then(() => {
                  win.close();
                  this.up('space-info').reloadInfo();
                });
            }
          }]
        }]
      });
      win.show();
      win.down('textfield').focus();
    }
  }, {
    disabled: true,
    name: 'remove-button',
    iconCls: 'fa fa-minus-circle',
    text: 'Remove',
    handler() {
      var params = Ext.apply({
        name: this.up('grid').getSelectionModel().getSelection()[0].get('name'),
      }, this.up('space-tab').params);

      dispatch('space.removeProperty', params)
        .then(() => {
          this.up('space-info').reloadInfo();
        });
    }
  }],

  selModel: {
    type: 'spreadsheet',
    rowNumbererHeaderWidth: 0,
  },
  plugins: {
    ptype: 'clipboard',
  },

  columns: [{
    header: '#',
    width: 35,
    align: 'center',
    dataIndex: 'index',
    renderer: v => v + 1,
  },{
    header: 'Name',
    width: 150,
    dataIndex: 'name'
  }, {
    header: 'Type',
    dataIndex: 'type',
    flex: 1
  }, {
    header: 'Reference',
    dataIndex: 'reference',
    hidden: true,
    flex: 1
  }]
});
