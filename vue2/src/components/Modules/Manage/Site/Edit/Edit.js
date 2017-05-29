module.exports = {
	name   : 'site',
	data() {
		return {
			site_data : {
				id: '',
				sitename: '',
				contact: '',
				phone: '',
				contact_phone: '',
				adress : '',
				memo : '',
				postioncode : {"lng": 116.404, "lat": 39.915},
				longitude : 0,
				latitude : 0,
				lastupdate : ''
			},
			site_types:[],
			site_rules: {				
			},
			bmapReady : false
		}
	},
	methods: {
		save_site(sitedata) {
			this.$refs[sitedata].validate((valid) => {
				if (valid) {
				  this.$delete(this[sitedata],'positioncode');
					if(this.$route.query.id){
						this.$$api_site_saveSite(this[sitedata], data => {
							this.$router.push('/manage/site/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_site_createSite(this[sitedata], data => {
							this.$router.push('/manage/site/list');
						});
					}
				}
			});
		},
		reset_site(sitedata) {
			this.$refs[sitedata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_site_findSite({
					id: this.$route.query.id
				}, (data) => {					
					this.site_data        = data.siteinfo;
					this.site_data.positioncode = [];
					this.site_data.positioncode.lng = data.siteinfo.longitude;
					this.site_data.positioncode.lat = data.siteinfo.latitude;
				});
			}else{
				this.$delete(this.site_data,'id');
				this.$refs.site_data.resetFields();
			}
		},
		
		bmapReadyHandler({BMap,map}){			
			this.lng = 116.404;
			this.lat = 39.915;
		},	

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