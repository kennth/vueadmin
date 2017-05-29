module.exports = {
	name   : 'driver',
	data() {
		return {
			driver_data : {
				username: '',
				phone: '',
				email: '',
				driverlicense: '',
				memo: '',
				status  : 1
			},
			driver_rules: {				
			}
		}
	},
	methods: {
		save_driver(driverdata) {
			this.$refs[driverdata].validate((valid) => {
				if (valid) {
					if(this.$route.query.id){
						this.$$api_driver_saveDriver(this[driverdata], data => {
							this.$router.push('/manage/driver/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_driver_createDriver(this[driverdata], data => {
							this.$router.push('/manage/driver/list');
						});
					}
				}
			});
		},
		reset_driver(driverdata) {
			this.$refs[driverdata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_driver_findDriver({
					id: this.$route.query.id
				}, (data) => {					
					this.driver_data        = data.driverinfo;
					console.log(this.driver_data);

				});
			}else{
				this.$delete(this.driver_data,'id');
				this.$refs.driver_data.resetFields();
			}
		}
	},
	mounted() {
		this.getView();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}