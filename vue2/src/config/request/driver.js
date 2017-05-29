/**
 * 司机模块
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取司机列表',
		method: 'selectDriver',
		path: 'list/driver',
		type: 'get',
	},
	{
		name: '添加司机',
		method: 'createDriver',
		path: 'post/driver',
		type: 'post',
	},
	{
		name: '修改司机',
		method: 'saveDriver',
		path: 'save/driver',
		type: 'patch',
	},
	{
		name: '删除司机',
		method: 'deleteDriver',
		path: 'delete/driver',
		type: 'delete',
	},
	{
		name: '获取司机信息',
		method: 'findDriver',
		path: 'find/driver',
		type: 'get',
	}
];