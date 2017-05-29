module.exports = {
	name   : 'order',
	data() {
		return {
			order_data : {
				id:'',
				orderno:'',
				companyid:0,
				paperreceipt:1,
				abnormal:1,
				status:1,
				endway:1,
				fhunit:'',
				fhunitphone:'',
				fhname:'',
				fhphone:'',
				fhlongitude:0,
				fhlatitude:0,
				shunit:'',
				shunitphone:'',
				shname:'',
				shphone:'',
				shlongitude:0,
        shlatitude:0,
				fhtime:'',
				shtime:'',
				productcode:'',
				productname:'',
				packing:'',
				packagecount:0.0,
				weight:0.0,
				paymentmode:3,
				deliverymode:2,
				totalfee:0.0,
				attachment:'',
				createtime:new Date(),
				updatetime:'',
				shtime:new Date(),
				memo:'',
				drivername:'',
				licenseplate:''
			},
			order_rules: {				
			},
			deliveryoptions: [{//1. 2. 3.送货上楼4送货5中转自提6中转送货7大车直送
          value: 1,
          label: '自提'
        }, {
          value: 2,
          label: '送货上门'
        }],
      payoptions: [{ //paymentmode 1:现付,2:回付,3:月结,4:欠付,5:到付,6:现付欠付,7:现付回付,8:现付到付,9:到付回付,10:到付欠付,11.汇款,12支票'
          value: 1,
          label: '现付'
        }, {
          value: 2,
          label: '回付'
        }, {
          value: 3,
          label: '月结'
        }, {
          value: 4,
          label: '欠付'
        }, {
          value: 5,
          label: '到付'
        }, {
          value: 6,
          label: '现付欠付'
        }, {
          value: 7,
          label: '现付回付'
        }, {
          value: 8,
          label: '现付到付'
        }, {
          value: 9,
          label: '到付回付'
        }, {
          value: 10,
          label: '到付欠付'
        }, {
          value: 11,
          label: '汇款'
        }, {
          value: 12,
          label: '支票'
        }],
        packoption: [{ //"纸箱",id:"1", "木箱",id:"2", "铁桶",id:"3","塑料桶",id:"4","纸桶",id:"5","纸袋",id:"6",'
          value: '纸箱',
        }, {
          value: '木箱',
        }, {
          value: '铁桶',
        }, {
          value: '塑料桶',
        }, {
          value: '纸桶',
        }, {
          value: '纸袋',
        }],
        statusoption: [{ //"未发运","待发运","在途","退回" ,"完结","作废"
          value: 1,
          label: '未发运'
        }, {
          value: 2,
          label: '待发运'
        }, {
          value: 3,
          label: '在途'
        }, {
          value: 4,
          label: '退回'
        }, {
          value: 5,
          label: '完结'
        }, {
          value: 6,
          label: '作废'
        }],
      comlist : [],
      sitelist: [],
      trucklist : [],
      driverlist: [],
		}
	},
	methods: {
		save_order(orderdata) {
			this.$refs[orderdata].validate((valid) => {
				if (valid) {
					if(this.$route.query.id){
						this.$$api_order_saveOrder(this[orderdata], data => {
							this.$router.push('/manage/order/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_order_createOrder(this[orderdata], data => {
							this.$router.push('/manage/order/list');
						});
					}
				}
			});
		},
		reset_order(orderdata) {
			this.$refs[orderdata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_order_findOrder({
					id: this.$route.query.id
				}, (data) => {					
					data.orderinfo.weight = data.orderinfo.weight.toFixed(2);
					data.orderinfo.totalfee = data.orderinfo.totalfee.toFixed(2);
					this.order_data        = data.orderinfo;			
				});
			}else{
				this.$delete(this.order_data,'id');
				this.$refs.order_data.resetFields();
			}
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
		queryCompany(queryString, cb) {
        var comlist = this.comlist;
        var results = queryString ? comlist.filter(this.createStateFilter(queryString)) : comlist;        
        cb(results);        
    },
    querySite(queryString, cb) {
        var sitelist = this.sitelist;
        var results = queryString ? sitelist.filter(this.createStateFilter(queryString)) : sitelist;        
        cb(results);        
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    selFhunit(item) {
      this.order_data.fhunitphone = item.phone;
      this.order_data.fhname = item.contact;
      this.order_data.fhphone = item.contact_phone;
      this.order_data.fhaddress = item.address;     
      this.order_data.fhlongitude = item.longitude;
      this.order_data.fhlatitude = item.latitude;
    },
    selShunit(item) {
      console.log(item);
      this.order_data.shunitphone = item.phone;
      this.order_data.shname = item.contact;
      this.order_data.shphone = item.contact_phone;
      this.order_data.shaddress = item.address;    
      this.order_data.shlongitude = item.longitude;
      this.order_data.shlatitude = item.latitude;
    },
    selTruck(item) {
      this.order_data.licenseplate = item.licenseplate;        
    },
    selDriver(item) {
      this.order_data.drivername = item.username;        
    },
    loadcomlist(){
      let result = this.$$api_company_selectCompany({},(data)=>{
          var list = data.list;
          var rs = [];
          list.data.forEach(r=>{
            r.value=r.companyname;
          });
          this.comlist = data.list.data;
      });
    },
    loadsitelist(){
      let result = this.$$api_site_selectSite({},(data)=>{
          var list = data.list;
          var rs = [];
          list.data.forEach(r=>{
            r.value=r.sitename;
          });
          this.sitelist = data.list.data;
      });
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
		this.getView();
		this.sitelist=this.loadsitelist();
		this.comlist=this.loadcomlist();
		this.trucklist = this.loadtrucklist();
		this.driverlist =this.loaddriverlist();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}