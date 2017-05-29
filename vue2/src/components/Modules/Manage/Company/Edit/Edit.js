module.exports = {
	name   : 'company',
	data() {
		return {
			company_data : {
				comapnyname: '',
				phone: '',
				address: '',
				contact: '',
				contact_phone : '',
				memo: '',
				status  : 1
			},
			company_rules: {				
			}
		}
	},
	methods: {
		save_company(companydata) {
			this.$refs[companydata].validate((valid) => {
				if (valid) {
					if(this.$route.query.id){
						this.$$api_company_saveCompany(this[companydata], data => {
							this.$router.push('/manage/company/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_company_createCompany(this[companydata], data => {
							this.$router.push('/manage/company/list');
						});
					}
				}
			});
		},
		reset_company(companydata) {
			this.$refs[companydata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_company_findCompany({
					id: this.$route.query.id
				}, (data) => {					
					this.company_data        = data.companyinfo;
					console.log(this.company_data);

				});
			}else{
				this.$delete(this.company_data,'id');
				this.$refs.company_data.resetFields();
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