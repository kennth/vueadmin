<template>
	<div class="form">
		<el-form style="margin:20px;width:98%;min-width:600px;" label-position="right" :model="order_data" :rules="order_rules" ref='order_data'>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-col :span=24 v-if="order_data.id">
			  <!-- "未发运","待发运","在途","退回" ,"完结","作废"-->
			  <el-col :span=12>
  			  <el-steps :space="100" :active="order_data.status" finish-status="success" process-status="process">
            <el-step title="未发运" stauts="wait"></el-step>
            <el-step title="待发运" stauts="wait"></el-step>
            <el-step title="在途" stauts="process"></el-step>
            <el-step v-if="order_data.status==4" title="退回" stauts="error"></el-step>
            <el-step v-if="order_data.status!=4&&order_data.status!=6" title="完结" stauts="finish"></el-step>
            <el-step v-if="order_data.status==6" title="作废" stauts="error"></el-step>
          </el-steps>
        </el-col>
        <el-col :span=12>
          <el-form-item class='edit-form' label="订单状态" prop='status'>
            <el-select v-model="order_data.status" placeholder="订单状态">
              <el-option
                v-for="item in statusoption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
         </el-col>
			</el-col>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-card class="box-card-full">
				<el-form-item  class="edit-form">	
					<el-col :span=8>
						<el-form-item v-if="order_data.id" label="订单号" prop='orderno'>
							<el-input v-model="order_data.orderno" placeholder='订单号' class="edit-input-col"></el-input>
						</el-form-item>
						<span v-if="!order_data.id" >&nbsp;</span>
					</el-col>
					<el-col :span=8>
						<el-form-item label="下单时间" prop='createtime'>
							<el-date-picker v-model="order_data.createtime" type="datetime"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span=8>
						<el-form-item label="送货时间" prop='shtime'>
							<el-date-picker v-model="order_data.shtime" type="datetime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
			</el-card>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-col :span=12>
			<el-card class="box-card">
				<el-form-item class="edit-form">					
					<el-col :span=12>
						<el-form-item label='发货单位' prop='fhunit'>
							<el-autocomplete v-model="order_data.fhunit" placeholder='发货单位' class="edit-input-col"  
							  :fetch-suggestions="queryCompany" @select="selFhunit"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span=12>
						<el-form-item label="单位电话" prop='fhunitphone'>
							<el-input v-model="order_data.fhunitphone"  placeholder='单位电话' class="edit-input-col"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
					<el-col :span=12>
						<el-form-item label='发货人' prop='fhname' >
							&nbsp;&nbsp;
							<el-input v-model="order_data.fhname" placeholder='发货人' class="edit-input-col"></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span=12>
						<el-form-item label="联系电话" prop='fhphone'>
							<el-input v-model="order_data.fhphone" placeholder='联系电话' class="edit-input-col"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
					<el-col :span=24>
						<el-form-item label='发货地址' prop='fhaddress'>
							<el-input v-model="order_data.fhaddress" placeholder='发货单位' class="edit-input-full"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>				
			</el-card>
			</el-col>
			<el-col :span=12>
			<el-card class="box-card">
				<el-form-item class="edit-form">					
					<el-col :span=12>
						<el-form-item label='收货单位' prop='shunit'>
							<el-autocomplete v-model="order_data.shunit" placeholder='收货单位' class="edit-input-col"
							  :fetch-suggestions="querySite" @select="selShunit"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span=12>
						<el-form-item label="单位电话" prop='shunitphone'>
							<el-input v-model="order_data.shunitphone"  placeholder='单位电话' class="edit-input-col"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
					<el-col :span=12>
						<el-form-item label='收货人' prop='shname' >
							&nbsp;&nbsp;
							<el-input v-model="order_data.shname" placeholder='收货人' class="edit-input-col"></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span=12>
						<el-form-item label="联系电话" prop='shphone'>
							<el-input v-model="order_data.shphone" placeholder='联系电话' class="edit-input-col"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
					<el-col :span=24>
						<el-form-item label='收货地址' prop='shaddress'>
							<el-input v-model="order_data.shaddress" placeholder='收货单位' class="edit-input-full"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>				
			</el-card>			
			</el-col>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-col :span=24>
				<el-card class="box-card-full">					
					<el-form-item class="edit-input-col" label='货物名称' prop='productname' >
						<el-input v-model="order_data.productname" placeholder='货物名称'  class="edit-input-full"></el-input>
					</el-form-item>          
          <el-form-item>  
            <el-col :span=8>
              <el-form-item class='edit-form' label="包装方式" prop='packing'>
                  <el-select v-model="order_data.packing" placeholder="包装方式">
                    <el-option
                      v-for="item in packoption"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span=8>
              <el-form-item class="edit-form" label='件数' prop='packagecount' >
                <el-input-number v-model="order_data.packagecount" placeholder='件数' :min=1 :step="1"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span=8>
              <el-form-item class="edit-form" label='重量(吨)' prop='weight' >
                <el-input-number v-model="order_data.weight" placeholder='重量' :min=0.1 :max=10 :step="0.1"></el-input-number>
              </el-form-item>  
            </el-col>
          </el-form-item>
				</el-card>
			</el-col>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
      <el-col :span=24>
        <el-card class="box-card-full"> 
            <el-form-item>  
              <el-col :span=8>
                <el-form-item class='edit-form' label="配送方式" prop='deliverymode'>
                  <el-select v-model="order_data.deliverymode" placeholder="请选择">
                    <el-option
                      v-for="item in deliveryoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span=8>
                <el-form-item  class='edit-form' label="支付方式" prop='paymentmode'>                  
                  <el-select v-model="order_data.paymentmode" placeholder="请选择">
                    <el-option
                      v-for="item in payoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span=8>
                <el-form-item class="edit-form" label='总计费用(元)' prop='totalfee' >
                  <el-input-number v-model="order_data.totalfee" placeholder='总计费用' :min="0" :max="9999999999" :step="0.01"></el-input-number>
                </el-form-item>
              </el-col>             
            </el-form-item>
            <el-form-item v-if="order_data.id">
              <el-col :span=12>
                <el-form-item label='配送车辆' prop='licenseplate'>
                  <el-autocomplete v-model="order_data.licenseplate" placeholder='车辆' class="edit-input-col"  
                    :fetch-suggestions="queryTruck" @select="selTruck"></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span=12>                
                <el-form-item label='配送司机' prop='drivername'>
                  <el-autocomplete v-model="order_data.drivername" placeholder='司机' class="edit-input-col"  
                    :fetch-suggestions="queryDriver" @select="selDriver"></el-autocomplete>
                </el-form-item>
              </el-col>              
            </el-form-item>
        </el-card>
      </el-col>
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-col :span=24>
				<el-card class="box-card-full">	
					<el-form-item class="edit-form" label='备注' prop='memo' >
						<el-input type="textarea" v-model="order_data.memo" placeholder='备注信息'></el-input>
					</el-form-item>
				</el-card>
			</el-col>		
			<el-col :span=24 class="line edit-form-col">&nbsp;</el-col>
			<el-col :span=24>
			<el-form-item>
				<el-button type="primary" @click='save_order("order_data")'>{{order_data.id ? '修改' : '添加'}}</el-button>
				<el-button type="default" v-if="!order_data.id" @click='reset_order("order_data")'>重置</el-button>
			</el-form-item>
			</el-col>		
		</el-form>
	</div>
</template>
<script>
	import EditJs from './Edit.js';
	module.exports = EditJs;
</script>
<style scoped>
	.edit-form {
		width: 100%;
	}
	.edit-form-col {
		height: 10px;
	}
	.edit-input-min{
    width: 30%;
  }
	.edit-input-col{
		width: 75%;
	}
	.edit-input-full{
		width: 88%;
	}
	.box-card {
    	width: 98%;
	}
	.box-card-full {
  	width: 99%;
	}
</style>