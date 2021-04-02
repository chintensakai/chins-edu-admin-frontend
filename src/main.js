import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button,  Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem,
  Table, TableColumn, Pagination, Form, FormItem, Input, Select, Option,
  MessageBox, Message } from 'element-ui';

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
