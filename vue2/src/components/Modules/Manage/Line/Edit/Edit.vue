<template>
  <div>
    <el-col :span="12">
      <div class="map">
        <baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="12" @ready="bmapReadyHandler">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-traffic></bm-traffic>
          <bm-marker v-for="item in poslist" :position="item" :dragging="false"  >
             <bm-label :content="item.name" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
          </bm-marker>
        </baidu-map>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="list">
        <el-col :span="24" class='actions-top'>          
          <el-form :inline="true" :model='search_data' class="demo-form-inline">
            <el-form-item>
              <el-input placeholder="发货单位" v-model='search_data.fhunit' size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click='onSearch'  size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center' :data="order_list" @selection-change='onSelectionChange'>          
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="orderno" label="订单号" align="center" width="145" :sortable="true">
          </el-table-column>
          <el-table-column prop="fhunit" label="发货单位" align="center" min-width="100" :sortable="true">
          </el-table-column>
          <el-table-column prop="shunit" label="收货单位" align="center" min-width="110" :sortable="true">
          </el-table-column>
          <el-table-column prop="productname" label="货物名称" align="center" min-width="100" :sortable="true">
          </el-table-column>
          <el-table-column prop="packing" label="包装" align="center" min-width="100" :sortable="true">
          </el-table-column>
          <el-table-column prop="packagecount" label="件数" align="center" width="100" :sortable="true">
          </el-table-column>
          <el-table-column prop="weight" label="重量" align="center" width="100" :sortable="true" :formatter="formatterWeight">
          </el-table-column>
        </el-table>
        <el-col :span="24" class='btm-action'>
          <el-pagination v-if='paginations.total>0' class='pagination' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page='paginations.current_page' @current-change='onChangeCurrentPage' @size-change='onChangePageSize'>
          </el-pagination>
        </el-col>
        <el-card>
        <el-form style="margin:5px;width:99%;" label-width="100px" :model="line_data" :rules="line_rules" ref='line_data'>
          <el-form-item label='线路名称' prop='linename'>
              <el-input v-model="line_data.linename" placeholder='线路名称' class="edit-input-col"></el-input>
            </el-form-item>
          <el-form-item label='配送车辆' prop='licenseplate'>
            <el-autocomplete v-model="line_data.licenseplate" placeholder='车辆' class="edit-input-col" :fetch-suggestions="queryTruck" @select="selTruck"></el-autocomplete>
          </el-form-item>
          <el-form-item label='配送司机' prop='drivername'>
            <el-autocomplete v-model="line_data.drivername" placeholder='司机' class="edit-input-col" :fetch-suggestions="queryDriver" @select="selDriver"></el-autocomplete>
          </el-form-item>          
          <el-form-item>
            <el-button type="primary" @click='save_line("line_data")'>{{line_data.id ? '修改' : '添加'}}</el-button>
            <el-button type="default" v-if="!line_data.id" @click='reset_line("order_data")'>重置</el-button>
          </el-form-item>
        </el-form>
       </el-card>
      </div>
    </el-col>
  </div>
</template>
<script>
  import EditJs from './Edit.js';
  module.exports = EditJs;
</script>
<style scoped>
  .map {
    width: 99%;
    padding: 1px;
  }
  
  .edit-form {
    width: 500px;
  }
  
  .bm-view {
    width: 100%;
    height: 600px;
  }
  
  .demo-form-inline {
    display: inline-block;
    float: right;
  }
  
  .btm-action {
    margin-top: 2px;
    margin-bottom: 5px;
    text-align: center;
  }
  
  .actions-top {
    height: 46px;
  }
  
  .pagination {
    display: inline-block;
  }
</style>