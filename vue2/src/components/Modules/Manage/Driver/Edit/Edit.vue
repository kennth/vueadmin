<template>
	<div class="form">
		<el-form style="margin:20px;width:60%;min-width:600px;" label-width="100px" :model="driver_data" :rules="driver_rules" ref='driver_data'>
			<el-form-item class='edit-form' label="姓名" prop='username'>
				<el-input v-model="driver_data.username" placeholder='司机名称'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='邮件' prop='email'>
				<el-input v-model="driver_data.email" placeholder='联系人'></el-input>
			</el-form-item>
			<el-form-item class='edit-form' label="电话" prop='phone'>
				<el-input v-model="driver_data.phone" placeholder='司机电话'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='驾照' prop='driverlicense'>
				<el-input v-model="driver_data.driverlicense" placeholder='司机地址'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='备注' prop='memo'>
				<el-input type="textarea" v-model="driver_data.memo" placeholder='备注信息'></el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-switch on-text="启用" off-text="禁用" v-model="driver_data.status" on-value=1 off-value=0></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='save_driver("driver_data")'>{{driver_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!driver_data.id" @click='reset_driver("driver_data")'>重置</el-button>
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