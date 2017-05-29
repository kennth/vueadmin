/**
 * Created by sailengsi on 2017/4/30.
 */
import {
	Home,
	Content,
	Modules
} from '../../components/';

module.exports = [{
	path: '/manage',
	name: '业务管理',
	icon: 'inbox',
	component: Home,
	redirect: '/manage/dashboard',
	children: [{
		path: 'user',
		name: '用户管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/user/list',
		children: [{
			path: 'list',
			name: '用户列表',
			icon: 'reorder',
			component: Modules.Manage.User.List
		}, {
			path: 'edit',
			name: '编辑用户',
			icon: 'edit',
			component: Modules.Manage.User.Edit
		}, {
			path: 'access',
			hidden:true,
			name: '设置权限',
			icon: 'edit',
			component: Modules.Manage.User.Access
		}]
	}, {
		path: 'company',
		name: '公司管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/company/list',
		children: [{
			path: 'list',
			name: '公司列表',
			icon: 'reorder',
			component: Modules.Manage.Company.List
		}, {
			path: 'edit',
			name: '编辑公司',
			icon: 'edit',
			component: Modules.Manage.Company.Edit
		}]
	}, {
		path: 'driver',
		name: '司机管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/driver/list',
		children: [{
			path: 'list',
			name: '司机列表',
			icon: 'reorder',
			component: Modules.Manage.Driver.List
		}, {
			path: 'edit',
			name: '编辑司机',
			icon: 'edit',
			component: Modules.Manage.Driver.Edit
		}]
	},{
		path: 'truck',
		name: '车辆管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/truck/list',
		children: [{
			path: 'list',
			name: '车辆列表',
			icon: 'reorder',
			component: Modules.Manage.Truck.List
		}, {
			path: 'edit',
			name: '编辑车辆',
			icon: 'edit',
			component: Modules.Manage.Truck.Edit
		}]
	},{
    path: 'site',
    name: '站点管理',
    icon: 'inbox',
    component: Content,
    redirect: '/manage/site/list',
    children: [{
      path: 'list',
      name: '站点列表',
      icon: 'reorder',
      component: Modules.Manage.Site.List
    }, {
      path: 'edit',
      name: '编辑管理',
      icon: 'edit',
      component: Modules.Manage.Site.Edit
    }]
  },{
		path: 'order',
		name: '订单管理',
		icon: 'inbox',
		component: Content,
		redirect: '/manage/order/list',
		children: [{
			path: 'list',
			name: '订单列表',
			icon: 'reorder',
			component: Modules.Manage.Order.List
		}, {
			path: 'edit',
			name: '编辑订单',
			icon: 'edit',
			component: Modules.Manage.Order.Edit
		}]
	},{
    path: 'line',
    name: '线路管理',
    icon: 'inbox',
    component: Content,
    redirect: '/manage/line/list',
    children: [{
      path: 'list',
      name: '线路列表',
      icon: 'reorder',
      component: Modules.Manage.Line.List
    }, {
      path: 'edit',
      name: '编辑线路',
      icon: 'edit',
      component: Modules.Manage.Line.Edit
    }]
  },{
    path: 'dashboard',
    name: 'DashBoard',
    icon: 'inbox',
    component: Modules.Manage.DashBoard,
    hidden:true
  }]
}];