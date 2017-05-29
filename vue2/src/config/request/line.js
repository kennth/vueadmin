/**
 * 线路模块
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取线路列表',
		method: 'selectLine',
		path: 'list/line',
		type: 'get',
	},
	{
		name: '添加线路',
		method: 'createLine',
		path: 'post/line',
		type: 'post',
	},
	{
		name: '修改线路',
		method: 'saveLine',
		path: 'save/line',
		type: 'patch',
	},
	{
		name: '删除线路',
		method: 'deleteLine',
		path: 'delete/line',
		type: 'delete',
	},
	{
		name: '获取线路信息',
		method: 'findLine',
		path: 'find/line',
		type: 'get',
	}
];