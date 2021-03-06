Ext.define('Admin.Database.Tab', {

  extend: 'Ext.tab.Panel',
  title: 'Database',
  closable: true,
  border: false,

  iconCls: 'fa fa-database',

  requires: [
    'Admin.Database.Info',
    'Admin.Database.Spaces',
  ],

  listeners: {
    tabchange(tabs, tab) {
      var tabIndex = tabs.items.indexOf(tab);
      if(tabIndex == 0 || tabIndex == 1) {
        localStorage.setItem('database-default-item', tabIndex);
      }
    }
  },

  initComponent() {

    var params = this.params;

    this.title = '';
    if(params.username != 'guest') {
      this.title += params.username + ' @ ';
    }
    this.title += params.hostname;

    if(params.port != 3301) {
      this.title += ' : ' + params.port;
    }

    this.activeTab = +localStorage.getItem('database-default-item') || 0;

    this.callParent(arguments);

  },

  items: [{
    xtype: 'database-info'
  }, {
    xtype: 'database-spaces'
  }]
});
