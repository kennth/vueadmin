<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="站点" v-model='search_data.sitename'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="site_list" @selection-change='onSelectionChange'>
      </el-table-column>
      <el-table-column label='备注' type="expand">
        <template scope="props">
          <p>备注: {{ props.row.memo }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sitename" label="站点名称" align="center" min-width="150" :sortable="true"></el-table-column>
      <el-table-column prop="phone" label="站点电话" align="center" min-width="120" :sortable="true"></el-table-column>
      <el-table-column prop="contact" label="联系人" align="center" min-width="100" :sortable="true"></el-table-column>
      <el-table-column prop="contact_phone" label="联系人电话" align="center" min-width="100" :sortable="true"></el-table-column>
      <el-table-column prop="address" label="地址" align="center" min-width="200" :sortable="true"></el-table-column>
      <el-table-column label="操作" :min-width="130" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='view' size="mini" @click='onSelectsite(scope.row)'></el-button>
          <el-button type="info" icon='edit' size="mini" @click='onEditsite(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeletesite(scope.row,scope.$index,site_list)'></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class='btm-action'>
      <el-pagination v-if='paginations.total>0' class='pagination' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page='paginations.current_page' @current-change='onChangeCurrentPage' @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

    <el-dialog title="站点信息" v-model="dialog.show" size="small">
      <el-form style="margin:20px;width:100%;min-width:100%" label-width="100px" :model="dialog.site_info">
        <baidu-map class="bm-view" :center="{lng: 120.152217, lat: 30.284408}" :zoom="13" @ready="bmapReadyHandler">
          <bm-marker :position="dialog.site_info.positioncode" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="dialog.site_info.sitename" :labelStyle="{color: 'blue', fontSize : '16px'}" :offset="{width: -20, height: 30}" />
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