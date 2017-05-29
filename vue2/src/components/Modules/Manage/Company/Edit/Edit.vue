<template>
	<div class="form">
		<el-form style="margin:20px;width:60%;min-width:600px;" label-width="100px" :model="company_data" :rules="company_rules" ref='company_data'>
			<el-form-item class='edit-form' label="公司名称" prop='companyname'>
				<el-input v-model="company_data.companyname" placeholder='公司名称'></el-input>
			</el-form-item>
			<el-form-item class='edit-form' label="公司电话" prop='phone'>
				<el-input v-model="company_data.phone" placeholder='公司电话'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='联系人' prop='contact'>
				<el-input v-model="company_data.contact" placeholder='联系人'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='联系人电话' prop='contact_phone'>
				<el-input v-model="company_data.contact_phone" placeholder='联系人电话'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='公司地址' prop='address'>
				<el-input v-model="company_data.address" placeholder='公司地址'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='备注' prop='memo'>
				<el-input type="textarea" v-model="company_data.memo" placeholder='备注信息'></el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-switch on-text="启用" off-text="禁用" v-model="company_data.status" on-value=1 off-value=0></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='save_company("company_data")'>{{company_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!company_data.id" @click='reset_company("company_data")'>重置</el-button>
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