/**
 * 车辆模块
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取车辆列表',
		method: 'selectTruck',
		path: 'list/truck',
		type: 'get',
	},
	{
		name: '添加车辆',
		method: 'createTruck',
		path: 'post/truck',
		type: 'post',
	},
	{
		name: '修改车辆',
		method: 'saveTruck',
		path: 'save/truck',
		type: 'patch',
	},
	{
		name: '删除车辆',
		method: 'deleteTruck',
		path: 'delete/truck',
		type: 'delete',
	},
	{
		name: '获取车辆信息',
		method: 'findTruck',
		path: 'find/truck',
		type: 'get',
	}
];