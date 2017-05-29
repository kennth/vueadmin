import Vue from 'vue';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

// router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vuex
import Vuex from 'vuex';
Vue.use(Vuex);

//页面顶部进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


// root component
import App from './App';

//vuex store
import store from './store/';


import routes from './config/router.js';

import 'register/';
import 'mixin/';

window.moment = require('moment');
moment.locale('zh-CN');

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {  
  ak: 'DrUsyR6I4CCiwqLW7vdYteGV'
})

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {

	window.scroll(0, 0);

	var userinfo = store.state.user.userinfo;

	if (!userinfo.token && to.path !== '/login') {
		store.dispatch('remove_userinfo');
		next('/login');
	} else {

		//判断是否开启权限
		if (userinfo.access_status === 1) {
			var web_routers = typeof userinfo.web_routers === 'object' ? userinfo.web_routers : {};

			//判断当前用户是否拥有目标页面访问权限，防止用户强制在地址栏输入访问没有权限的页面
			if (to.path!="/login" && !web_routers[to.path]) {
				ElementUI.MessageBox.alert('您没用权限访问此页面！', '访问错误', {
					confirmButtonText: '确定',
					cancelButtonText : '取消',
					type             : 'warning'
				}).then(() => {
					if (userinfo.default_web_routers) {
						next(userinfo.default_web_routers);
					} else {
						store.dispatch('remove_userinfo');
						next('/login');
					}
				});
			} else {
				if (userinfo.token && to.path === '/login') {
					next(userinfo.default_web_routers);
				} else {
					NProgress.start();
					next();
				}
			}
		} else {

			if (userinfo.token && to.path === '/login') {
				next({
					path: '/manage'
				});
			} else {
				NProgress.start();
				next();
			}
		}

	}
})

router.afterEach(transition => {
	NProgress.done();
});

const appAdmin = new Vue({
	el    : '#app',
	data() {
		return {};
	},
	// template: '<App/>',
	router,
	store,
	render: h => h(App)
})