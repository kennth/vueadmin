import {
    Default as Statis
} from 'common/Echarts/Pie/';
module.exports = {
	name   : 'dashboard',
	components: {
        Statis
    },
	data() {
		return {
		  echarts_data: {
          id: 'orderPieDefault',
          title: '订单状态',
          hover_title: '订单量',
          data_list: [{
              name: '未发运',
              value: '0'
          }, {
              name: '待发运',
              value: '0'
          }, {
              name: '已发运',
              value: '0'
          }, {
              name: '已完成',
              value: '0'
          }, {
              name: '已取消',
              value: '0'
          }, {
              name: '退单',
              value: '0'
          }]
      },
      line_data:{        
        linename    :'',
        licenseplate:'',
        drivername  :'',
        startaddr   :'',
        endaddr     :'',
        path        :[],
        process     : 1,
        starttime   :'',
        endtime     :'',
        orderlist   :[],
      },
      line_rules: {        
      },
      trucklist : [],      
      line_list: [], //列表数组

      isIndeterminate: true,
      checkeds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      
      poslist : [],
			bmapReady : false,
			linestatus: new Array("","待发运","在途","完结","作废")
		}
	},
	methods: {
	  formatterDatetime(item) {
      return moment(item.lastupdate).format('lll');
    },

    filterNode(value, data) {
      if(!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    currentChange(data, node) {
      // console.log(data, node);
    },

    nodeClick(data, node, self) {
      // console.log(node);
    },    
    
    formatterStatus(item) {
      return this.linestatus[item.status];
    },
   
    formatterWeight(item) {
      return item.weight.toFixed(2);
    },    
    
    filterStatus(value, item) {
      return item.status == value;
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的信息数组，每个元素是信息对象
     */
    onSelectionChange(val) {
      this.poslist = [];
      if(val.length) {       
        val.forEach(r=>{
           let list = eval("(" + r.path +")");
           list.forEach(pos=>{
             this.poslist.push(pos);
           })
        })
      }
      //console.log(this.poslist);
    },  

    /**
     * 获取信息列表
     * @param  {number} options.page      当前页码，切换页码时用
     * @param  {number} options.page_size 每页显示数量，改变每页数量时用
     * @param  {function} options.fn                            } 获取列表后的回调函数
     */
    getList({
      page,
      page_size,
      where,
      fn
    } = {}) {

      var query = this.$route.query;

      var data = {
      };

      if(where) {
        data = Object.assign(data, where || {});
      } else {
        for(var s in query) {
          if(this.search_data[s] !== undefined) {
            this.search_data[s] = query[s];
            data[s] = query[s];
          }
        }
      }
      this.$$api_line_selectLine(data, (data) => {        
        this.line_list = data.list.data;
        fn && fn();
      });
    },		
		
		bmapReadyHandler({BMap,map}){			
			this.lng = 116.404;
			this.lat = 39.915;
		},	    
 
    loadtrucklist(){
      let result = this.$$api_truck_selectTruck({},(data)=>{
          var list = data.list;
          var rs = [];
          list.data.forEach(r=>{
            let position = [];
            position.lng = r.longitude;
            position.lat = r.latitude;
            r.position = position;
          });
          this.trucklist = data.list.data;
      });      
    },
    
    loadorderstatics(){
      let result = this.$$api_order_staticsOrder({},(data)=>{
          let list = data;
          list.forEach(r=>{   
            let value = this.echarts_data.data_list[r.status - 1];            
            value.value =  r.count;
            this.$set(this.echarts_data.data_list, r.status - 1, value);
          });
          //console.log(this.echarts_data.data_list)
      });      
    }
	},
	mounted() {
	  this.getList({
      fn: () => {       
      }
    });
    this.loadtrucklist();
    this.loadorderstatics();
	},

	watch: {
		$route(to, from){
		  this.getList();
		}
	}
}