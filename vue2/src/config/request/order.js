/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 订单管理
 * @type {Object}
 */
module.exports = [	
	{
		name: '获取订单列表',
		method: 'selectOrder',
		path: 'list/order',
		type: 'get',
	},
	{
		name: '添加订单',
		method: 'createOrder',
		path: 'post/order',
		type: 'post',
	},
	{
		name: '修改订单',
		method: 'saveOrder',
		path: 'save/order',
		type: 'patch',
	},
	{
		name: '删除订单',
		method: 'deleteOrder',
		path: 'delete/order',
		type: 'delete',
	},
	{
		name: '获取订单信息',
		method: 'findOrder',
		path: 'find/order',
		type: 'get',
	},
  {
    name: '获取订单状态',
    method: 'staticsOrder',
    path: 'statics/order/statics/',
    type: 'get',
  }
];