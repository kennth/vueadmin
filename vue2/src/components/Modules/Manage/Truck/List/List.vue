<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="车牌号" v-model='search_data.licenseplate'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="truck_list" @selection-change='onSelectionChange'>
      </el-table-column>
      <el-table-column prop="licenseplate" label="车牌号" align="center" width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="truck_type" label="车型" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="tonnage" label="吨位" align="center" width="110" :sortable="true">
      </el-table-column>
      <el-table-column prop="volume_length" label="体积长" align="center" width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="volume_width" label="体积宽" align="center" width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="volume_height" label="体积高" align="center" width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="lastupdate" label="最后更新" align="center" width="180" :formatter="formatterDatetime" :sortable="true">
      </el-table-column>
      <el-table-column label="操作" :min-width="100" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='view' size="mini" @click='onSelecttruck(scope.row)'></el-button>
          <el-button type="info" icon='edit' size="mini" @click='onEdittruck(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeletetruck(scope.row,scope.$index,truck_list)'></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class='btm-action'>
      <el-pagination v-if='paginations.total>0' class='pagination' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page='paginations.current_page' @current-change='onChangeCurrentPage' @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

    <el-dialog title="车辆信息" v-model="dialog.show" size="small">
      <el-form style="margin:20px;width:100%;min-width:100%" label-width="100px" :model="dialog.truck_info">
        <baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="17" @ready="bmapReadyHandler">
          <bm-marker :position="dialog.truck_info.positioncode" :dragging="false" :icon="{url: '/static/images/truck.png', size: {width: 48, height: 48}}">
            <bm-label :content="dialog.truck_info.licenseplate" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}" />
          </bm-marker>
        </baidu-map>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="dialog.show = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import ListJs from './List.js';
  module.exports = ListJs;
</script>
<style scoped lang='less'>
  .demo-form-inline {
    display: inline-block;
    float: right;
  }
  
  .btm-action {
    margin-top: 20px;
    text-align: center;
  }
  
  .actions-top {
    height: 46px;
  }
  
  .pagination {
    display: inline-block;
  }
  
  .bm-view {
    width: 95%;
    height: 300px;
  }
</style>