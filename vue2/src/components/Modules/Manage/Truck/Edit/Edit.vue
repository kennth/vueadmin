<template>
	<div class="form">
		<el-form style="margin:20px;width:60%;min-width:600px;" label-width="100px" :model="truck_data" :rules="truck_rules" ref='truck_data'>
			<el-form-item class='edit-form' label="车牌号" prop='licenseplate'>
				<el-input v-model="truck_data.licenseplate" placeholder='车牌号'></el-input>
			</el-form-item>
			<el-form-item class="edit-form" label='车型' prop='truck_type'>
				<el-autocomplete v-model="truck_data.truck_type" :fetch-suggestions="querySearch" placeholder='车型' @select="fillparams"></el-autocomplete>
			</el-form-item>
			<el-form-item class='edit-form' label="吨位(吨)" prop='tonnage'>
				<el-input-number v-model="truck_data.tonnage" placeholder='吨位' size="small" :min="0.1" :max="10" :step="0.1"></el-input-number>				
			</el-form-item>
			<el-form-item class="edit-form" label='体积长(米)' prop='volume_length'>
				<el-input-number v-model="truck_data.volume_length" placeholder='体积长' size="small" :min="0.1" :max="10" :step="0.1"></el-input-number>
			</el-form-item>
			<el-form-item class="edit-form" label='体积宽(米)' prop='volume_width'>
				<el-input-number v-model="truck_data.volume_width" placeholder='体积宽' size="small" :min="0.1" :max="5" :step="0.1"></el-input-number>
			</el-form-item>
			<el-form-item class="edit-form" label='体积高(米)' prop='volume_height'>
				<el-input-number v-model="truck_data.volume_height" placeholder='体积高' size="small" :min="0.1" :max="4" :step="0.1"></el-input-number>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='save_truck("truck_data")'>{{truck_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!truck_data.id" @click='reset_truck("truck_data")'>重置</el-button>
			</el-form-item>
			<el-row>
				<el-col :span=24>
				<baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="15" @ready="bmapReadyHandler" v-if="truck_data.id">
				  <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
				  <bm-traffic></bm-traffic>
					<bm-marker :position="truck_data.positioncode" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
				      <bm-label :content="truck_data.licenseplate" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
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