/**
 * 用户模块
 * @type {Object}
 */
module.exports = [
	{
		name: '登录',
		method: 'login',
		path: '/login/login',
		type: 'post',
	},
	{
		name: '注册',
		method: 'register',
		path: 'reg/user',
		type: 'post',
	},
	{
		name: '获取用户列表',
		method: 'selectUser',
		path: 'list/user',
		type: 'get',
	},
	{
		name: '添加用户',
		method: 'createUser',
		path: 'create/user',
		type: 'post',
	},
	{
		name: '修改用户',
		method: 'saveUser',
		path: 'save/user',
		type: 'patch',
	},
	{
		name: '删除用户',
		method: 'deleteUser',
		path: 'delete/user',
		type: 'delete',
	},
	{
		name: '获取用户信息',
		method: 'findUser',
		path: 'find/user',
		type: 'get',
	},
	{
		name: '修改密码',
		method: 'updatePass',
		path: 'uppass/user',
		type: 'patch',
	},
	{
		name: '设置权限',
		method: 'updateUserAccess',
		path: 'access/user',
		type: 'patch',
	},
	{
		name: '设置用户状态',
		method: 'updateUserStatus',
		path: 'status/user',
		type: 'patch',
	}
];