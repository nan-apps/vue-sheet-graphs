require('./bootstrap');

import vueConfig from 'vue-config';
import config from './app_conf.js';
Vue.use(vueConfig, config);

Vue.config.productionTip = false;

import App from './components/App.vue';
import store from './store/index';

new Vue({
  	store,
	el: '#app',
  	components: { App },
  	template: '<App/>'
});

