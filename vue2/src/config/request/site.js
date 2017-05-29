/**
 * 站点模块
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取站点列表',
		method: 'selectSite',
		path: 'list/site',
		type: 'get',
	},
	{
		name: '添加站点',
		method: 'createSite',
		path: 'post/site',
		type: 'post',
	},
	{
		name: '修改站点',
		method: 'saveSite',
		path: 'save/site',
		type: 'patch',
	},
	{
		name: '删除站点',
		method: 'deleteSite',
		path: 'delete/site',
		type: 'delete',
	},
	{
		name: '获取站点信息',
		method: 'findSite',
		path: 'find/site',
		type: 'get',
	}
];