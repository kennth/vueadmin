<template>
  <div>
    <el-col :span="24">
      <el-card>
        <el-col :span="9">
          <section class="chart">            
              <statis
                :id='echarts_data.id'
                :title='echarts_data.title'
                :subtext='echarts_data.subtext'
                :hoverTitle='echarts_data.hover_title'
                :dataList='echarts_data.data_list'></statis>            
          </section>
        </el-col>
        <el-col :span="15">
        <el-table :show-header="true" border style="width: 100%" align='center' :data="line_list" @selection-change='onSelectionChange'>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="linename" label="线路名称" align="center" min-width="120" :sortable="true"></el-table-column>
          <el-table-column prop="startaddr" label="起点" align="center" min-width="120" :sortable="true"></el-table-column>
          <el-table-column prop="endaddr" label="终点" align="center" min-width="120" :sortable="true"></el-table-column>
          <el-table-column prop="starttime" label="开始时间" align="center" width="180" 
            :formatter="formatterDatetime" :sortable="true">
          </el-table-column>
          <el-table-column prop="endtime" label="结束时间" align="center" width="180" 
            :formatter="formatterDatetime" :sortable="true">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="100" :sortable="true" 
            :formatter="formatterStatus">
          </el-table-column>
        </el-table>
        </el-col>
      </el-card>
    </el-col>
    <el-col :span="24">&nbsp;</el-col>
    <el-col :span="24">
      <el-card>
      <div class="map">
        <baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="12" @ready="bmapReadyHandler">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-traffic></bm-traffic>
          <bm-marker v-for="item in trucklist" :position="item.position" :dragging="false" :icon="{url: '/static/images/truck.png', size: {width: 48, height: 48}}">
            <bm-label :content="item.licenseplate" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}" />
          </bm-marker>
          <bm-marker v-for="item in poslist" :position="item" :dragging="false"  >
             <bm-label :content="item.name" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
          </bm-marker>
          <!--<bm-marker v-for="item in poslist" :position="item" :dragging="false">
             <bm-label :content="item.name" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
          </bm-marker>-->
        </baidu-map>
      </div>
      </el-card>
    </el-col>    
  </div>
</template>
<script>
  import DashBoard from './DashBoard.js';
  module.exports = DashBoard;
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