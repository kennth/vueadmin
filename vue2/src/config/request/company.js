/**
 * 公司模块
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取公司列表',
		method: 'selectCompany',
		path: 'list/company',
		type: 'get',
	},
	{
		name: '添加公司',
		method: 'createCompany',
		path: 'post/company',
		type: 'post',
	},
	{
		name: '修改公司',
		method: 'saveCompany',
		path: 'save/company',
		type: 'patch',
	},
	{
		name: '删除公司',
		method: 'deleteCompany',
		path: 'delete/company',
		type: 'delete',
	},
	{
		name: '获取公司信息',
		method: 'findCompany',
		path: 'find/company',
		type: 'get',
	}
];