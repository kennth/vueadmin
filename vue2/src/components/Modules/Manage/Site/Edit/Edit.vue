<template>
	<div class="form">
		<el-form style="margin:20px;width:60%;min-width:600px;" label-width="100px" :model="site_data" :rules="site_rules" ref='site_data'>
			<el-form-item class='edit-form' label="站点名称" prop='sitename'>
        <el-input v-model="site_data.sitename" placeholder='站点名称'></el-input>
      </el-form-item>
      <el-form-item class='edit-form' label="站点电话" prop='phone'>
        <el-input v-model="site_data.phone" placeholder='站点电话'></el-input>
      </el-form-item>
      <el-form-item class="edit-form" label='联系人' prop='contact'>
        <el-input v-model="site_data.contact" placeholder='联系人'></el-input>
      </el-form-item>
      <el-form-item class="edit-form" label='联系人电话' prop='contact_phone'>
        <el-input v-model="site_data.contact_phone" placeholder='联系人电话'></el-input>
      </el-form-item>
      <el-form-item class="edit-form" label='站点地址' prop='address'>
        <el-input v-model="site_data.address" placeholder='站点地址'></el-input>
      </el-form-item>
      <el-form-item class="edit-form" label='备注' prop='memo'>
        <el-input type="textarea" v-model="site_data.memo" placeholder='备注信息'></el-input>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" @click='save_site("site_data")'>{{site_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!site_data.id" @click='reset_site("site_data")'>重置</el-button>
			</el-form-item>
			<el-row>
				<el-col :span=24>
				<baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="13" @ready="bmapReadyHandler" v-if="site_data.id">
					<bm-marker :position="site_data.positioncode" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
				      <bm-label :content="site_data.sitename" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
				    </bm-marker>
  				</baidu-map>	
  				</el-col>
			</el-row>			
			
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
	.bm-view {
	  width: 100%;
	  height: 300px;
	}
</style>