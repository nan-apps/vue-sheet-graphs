
import lodash from 'lodash';
window._ = lodash;

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import Vue from 'vue';
window.Vue = Vue;