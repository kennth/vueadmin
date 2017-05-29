<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="线路" v-model='search_data.linename'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="line_list" @selection-change='onSelectionChange'>
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
        :formatter="formatterStatus" :filters="status_filters.list" :filter-method="filterStatus" :filter-multiple="status_filters.multiple">
      </el-table-column>
      <el-table-column label="操作" :min-width="130" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='view' size="mini" @click='onSelectline(scope.row)'></el-button>
          <el-button type="info" icon='edit' size="mini" @click='onEditline(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeleteline(scope.row,scope.$index,line_list)'></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class='btm-action'>
      <el-pagination v-if='paginations.total>0' class='pagination' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page='paginations.current_page' @current-change='onChangeCurrentPage' @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

    <el-dialog title="线路信息" v-model="dialog.show" size="small">
      <el-form style="margin:20px;width:100%;min-width:100%" label-width="100px" :model="dialog.data">
        <baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="13" @ready="bmapReadyHandler">
          <bm-marker v-for="item in dialog.data.poslist" :position="item.pos" :dragging="false">
             <bm-label :content="item.name" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}"/>
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