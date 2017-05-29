module.exports = {
	name   : 'user',
	data() {
		return {
			user_data : {
				email   : '',
				username: '',
				phone : '',
				status  : "1"
			},
			user_rules: {
				email   : [{
					required: true,
					message : '邮箱不能为空！',
					trigger : 'blur'
				}, {
					type   : 'email',
					message: '邮箱格式不正确！',
					trigger: 'blur'
				}],
				username: [{
					required: true,
					message : '用户名不能为空！',
					trigger : 'blur'
				}],
				phone : [{
					required: true,
					message : '联系电话不能为空！',
					trigger : 'change'
				},{
					pattern:/^1[34578]\d{9}$/, 
					message: '联系电话格式不正确！',
					trigger: 'blur'
				}]
			}
		}
	},
	methods: {
		save_user(userdata) {
			this.$refs[userdata].validate((valid) => {
				if (valid) {
					// console.log(this[userdata]);

					// console.log(this[userdata].status);

					//测试：强制修改用户名或者状态时，接口返回不允许修改的错误信息
					/*if (this[userdata].id) {
					 // this[userdata].username='testupdatename';

					 // this[userdata].status=!this[userdata].status;
					 }*/
					if(this.$route.query.id){
						this.$$api_user_saveUser(this[userdata], data => {
							this.$router.push('/manage/user/edit?id='+this.$route.query.id);
							this.$message.success('修改成功');
						});
					}else{
						this.$$api_user_createUser(this[userdata], data => {
							this.$router.push('/manage/user/list');
						});
					}
				}
			});
		},
		reset_user(userdata) {
			this.$refs[userdata].resetFields();
		},

		getView(){
			if (this.$route.query.id) {
				this.$$api_user_findUser({
					id: this.$route.query.id
				}, (data) => {
					this.user_data.status = data.userinfo.status;
					this.user_data        = data.userinfo;
				});
			}else{
				this.$delete(this.user_data,'id');
				this.$refs.user_data.resetFields();
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