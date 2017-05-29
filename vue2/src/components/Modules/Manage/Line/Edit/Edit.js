module.exports = {
	name   : 'line',
	data() {
		return {
		  //需要给分页组件传的信息
      paginations: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
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
      driverlist: [],
      
      order_list: [], //列表数组

      batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
      batch_flag: true, //符合批量删除为true,否则为false

      //搜索表单信息
      search_data: {
        linename: '',
      },      

      checkAll: true,
      isIndeterminate: true,

      accesss: [],
      checkeds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      
      poslist : [],
			bmapReady : false
		}
	},
	methods: {
	  handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
    
    formatterNumber(item) {
      return moment(item.lastupdate).format('lll');
    },
    
    filterStatus(value, item) {
      return item.status == value;
    },

    /** 点击搜索按钮事件 */
    onSearch() {
      console.log(this.search_data);

      var sd = {};

      var query = this.$route.query;
      for(var p in query) {
        sd[p] = query[p];
      }

      for(var s in this.search_data) {
        sd[s] = this.search_data[s];

        if(!sd[s]) {
          delete sd[s];
        }
      }

      this.$router.push({
        path: this.$route.path,
        query: sd
      });
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的信息数组，每个元素是信息对象
     */
    onSelectionChange(val) {
      this.poslist = [];
      this.line_data.orderlist = [];
      if(val.length) {
        this.batch_flag = false;
        var ids = [];
        var fhunitlist = [];
        
        for(var i = 0; i < val.length; i++) {
          if(!fhunitlist.includes(val[i].fhunit)){
            let position = {};
            position.lng = val[i].fhlongitude;
            position.lat = val[i].fhlatitude;
            position.name = val[i].fhunit;
            this.poslist.push(position);
            fhunitlist.push(val[i].fhunit);
            this.line_data.startaddr = val[i].fhaddress
            this.line_data.starttime = val[i].fhtime
          }
          ids.push(val[i].id);
          let position = {};
          position.lng = val[i].shlongitude;
          position.lat = val[i].shlatitude;
          position.name = val[i].shunit;
          this.poslist.push(position);
          this.line_data.endaddr = val[i].shaddress
          this.line_data.endtime = val[i].shtime      
          this.line_data.orderlist.push(val[i].orderno)
        }
        this.line_data.path = this.poslist;
        if(!this.line_data.linename &&fhunitlist.length)
          this.line_data.linename = fhunitlist[0];       
        this.batch_id = ids.join(',');         
      } else {
        this.batch_flag = true;
        this.batch_id = '';        
      }
    },

    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath(field, value) {
      var path = this.$route.path,
        query = Object.assign({}, this.$route.query);

      query[field] = value;

      this.$router.push({
        path: path,
        query: query
      });
    },

    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage(page) {
      this.setPath('page', page);
    },

    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize(size) {
      this.setPath('page_size', size);
    }, 
    
    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath(field, value) {
      var path = this.$route.path,
        query = Object.assign({}, this.$route.query);

      if(typeof field === 'object') {
        query = field;
      } else {
        query[field] = value;
      }

      this.$router.push({
        path,
        query
      });
    },

    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage(page) {
      this.getList({
        page,
        fn: () => {
          this.setPath('page', page);
        }
      });
    },

    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize(page_size) {
      this.getList({
        page_size,
        fn: () => {
          this.setPath('page_size', page_size);
        }
      });
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

      this.paginations.current_page = page || parseInt(query.page) || 1;
      this.paginations.page_size = page_size || parseInt(query.page_size) || this.paginations.page_size;

      var data = {
        page: this.paginations.current_page,
        page_size: this.paginations.page_size
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
      data['status']=1;
      this.$$api_order_selectOrder(data, (data) => {        
        this.order_list = data.list.data;
        this.paginations.total = data.list.total;

        fn && fn();
      });
    },
    
		save_line(linedata) {
			this.$refs[linedata].validate((valid) => {
				if (valid) {				  
					if(this.$route.query.id){
						this.$$api_line_saveLine(this[linedata], data => {
							this.$router.push('/manage/line/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_line_createLine(this[linedata], data => {
							this.$router.push('/manage/line/list');
						});
					}
				}
			});
		},
		reset_line(linedata) {
			this.$refs[linedata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_line_findLine({
					id: this.$route.query.id
				}, (data) => {					
					this.line_data        = data.lineinfo;
					this.line_data.positioncode = [];
					this.line_data.positioncode.lng = data.lineinfo.longitude;
					this.line_data.positioncode.lat = data.lineinfo.latitude;
				});
			}else{
				this.$delete(this.line_data,'id');
				this.$refs.line_data.resetFields();
			}
		},
		
		bmapReadyHandler({BMap,map}){			
			this.lng = 116.404;
			this.lat = 39.915;
		},	
    
    queryDriver(queryString, cb) {
        var driverlist = this.driverlist;
        var results = queryString ? driverlist.filter(this.createStateFilter(queryString)) : driverlist;        
        cb(results);        
    },
    queryTruck(queryString, cb) {
        var trucklist = this.trucklist;
        var results = queryString ? trucklist.filter(this.createStateFilter(queryString)) : trucklist;        
        cb(results);        
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    selTruck(item) {
      this.line_data.licenseplate = item.licenseplate;        
    },
    selDriver(item) {
      this.line_data.drivername = item.username;        
    },
    loadtrucklist(){
      let result = this.$$api_truck_selectTruck({},(data)=>{
          var list = data.list;
          var rs = [];
          list.data.forEach(r=>{
            r.value=r.licenseplate;
          });
          this.trucklist = data.list.data;
      });
    },
    loaddriverlist(){
      let result = this.$$api_driver_selectDriver({},(data)=>{
          var list = data.list;
          var rs = [];
          list.data.forEach(r=>{
            r.value=r.username;
          });
          this.driverlist = data.list.data;
      });
    }
	},
	mounted() {
	  this.getList({
      fn: () => {       
      }
    });
    this.loadtrucklist();
    this.loaddriverlist();
		//this.getView();
	},

	watch: {
		$route(to, from){
		  this.getList();
			//this.getView();
		}
	}
}