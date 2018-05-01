import Vue from 'vue';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

export const getDataFromApi = (url) => {
	
  	return Vue.jsonp( url, { 
		callbackQuery: 'callback', callbackName: 'myFunc' 
	})

}