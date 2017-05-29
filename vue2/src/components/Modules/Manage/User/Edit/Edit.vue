<template>
	<div class="form">
		<el-form style="margin:20px;width:60%;min-width:600px;" label-width="100px" :model="user_data" :rules="user_rules" ref='user_data'>
			<el-form-item class='edit-form' label="邮箱" prop='email'>
				<el-input v-model="user_data.email" placeholder='常用邮箱'></el-input>
			</el-form-item>
			<el-form-item class='edit-form' label="用户名称" prop='username'>
				<el-input :disabled='user_data.id ? true : false' v-model="user_data.username" placeholder='用户名'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='联系电话' prop='phone'>
				<el-input v-model="user_data.phone" placeholder='联系电话'></el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-switch on-text="" off-text="" v-model="user_data.status" on-value="1" off-value="0"></el-switch>
			</el-form-item>
			<el-form-item label="密码" v-if='!user_data.id'>
				创建成功的初始密码为<strong>手机号末6位</strong>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='save_user("user_data")'>{{user_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!user_data.id" @click='reset_user("user_data")'>重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import EditJs from './Edit.js';
	module.exports = EditJs;
</script>
<style scoped>
	.edit-form {
		width: 500px;
	}
</style>