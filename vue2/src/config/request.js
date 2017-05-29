/*var article=require('./request/article.js');
console.log(article);*/

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
var request=[{
	module:'user',
	name:'用户管理',
	list:require('./request/user.js')
},{
	module:'company',
	name:'公司管理',
	list:require('./request/company.js')
},{
	module:'driver',
	name:'司机管理',
	list:require('./request/driver.js')
},{
	module:'truck',
	name:'车辆管理',
	list:require('./request/truck.js')
},{
	module:'order',
	name:'订单管理',
	list:require('./request/order.js')
},{
  module:'site',
  name:'站点管理',
  list:require('./request/site.js')
},{
  module:'line',
  name:'线路管理',
  list:require('./request/line.js')
}];

module.exports=request;


