module.exports = {
	name   : 'truck',
	data() {
		return {
			truck_data : {
				id: '',
				licenseplate: '',
				truck_type: '',
				tonnage: 0,
				volume_length: 0,
				volume_length: 0,
				volume_length: 0,
				postioncode : {lng: 120.152217, lat: 30.284408},
				longitude : 0,
				latitude : 0,
				lastupdate : ''
			},
			truck_types:[],
			truck_rules: {				
			},
			bmapReady : false
		}
	},
	methods: {
		save_truck(truckdata) {
			this.$refs[truckdata].validate((valid) => {
				if (valid) {
				  this.$delete(this[truckdata],'positioncode');
					if(this.$route.query.id){
						this.$$api_truck_saveTruck(this[truckdata], data => {
							this.$router.push('/manage/truck/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_truck_createTruck(this[truckdata], data => {
							this.$router.push('/manage/truck/list');
						});
					}
				}
			});
		},
		reset_truck(truckdata) {
			this.$refs[truckdata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_truck_findTruck({
					id: this.$route.query.id
				}, (data) => {					
					this.truck_data        = data.truckinfo;
					this.truck_data.positioncode = [];
					this.truck_data.positioncode.lng = data.truckinfo.longitude;
					this.truck_data.positioncode.lat = data.truckinfo.latitude;
				});
			}else{
				this.$delete(this.truck_data,'id');
				this.$refs.truck_data.resetFields();
			}
		},
		
		bmapReadyHandler({BMap,map}){			
			this.lng = 116.404;
			this.lat = 39.915;
		},
		
		load_truck_types(){
			return[
			 	{ "value": "小货车", "tonnage": "1.2", "volume_length":"2" , "volume_width":"1.2", "volume_height":"1.5" },
          		{ "value": "厢式货车", "tonnage": "2.0", "volume_length":"3" , "volume_width":"1.5", "volume_height":"2" },
          		{ "value": "大货车", "tonnage": "4.5", "volume_length":"4" , "volume_width":"2", "volume_height":"2.5" },
			]
		},		
		querySearch(queryString, cb) {
			var truck_types = this.truck_types;
			var results = queryString ? truck_types.filter(this.createFilter(queryString)) : truck_types;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createFilter(queryString) {
			return(truck_types) => {
				return(truck_types.value.indexOf(queryString.toLowerCase()) === 0);
			};
		},
		fillparams(item){
			this.truck_data.tonnage = item.tonnage;
			this.truck_data.volume_length = item.volume_length;
			this.truck_data.volume_width = item.volume_width;
			this.truck_data.volume_height = item.volume_height;
		}
	},
	mounted() {
		this.getView();
		this.truck_types = this.load_truck_types();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}