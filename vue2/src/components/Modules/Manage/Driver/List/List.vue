<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="姓名" v-model='search_data.username'></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="电话" v-model='search_data.phone'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="driver_list" @selection-change='onSelectionChange'>
      </el-table-column>
      <el-table-column label='备注' type="expand">
        <template scope="props">
          <p>备注: {{ props.row.memo }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="email" label="邮件" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="phone" label="司机电话" align="center" width="110" :sortable="true">
      </el-table-column>
      <el-table-column prop="driverlicense" label="驾照" align="center" min-width="180" :sortable="true">
      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" :formatter="formatterDatetime" align="center" width="180" :sortable="true">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100" :sortable="true" :formatter="formatterStatus" :filters="status_filters.list" :filter-method="filterStatus" :filter-multiple="status_filters.multiple">
      </el-table-column>

      <el-table-column label="操作" :min-width="150" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='edit' size="mini" @click='onEditdriver(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeletedriver(scope.row,scope.$index,driver_list)'></el-button>
          <el-button size="mini" :type="scope.row.status==1 ? 'danger' : 'info'" @click='onSetStatusDriver(scope.row,scope.$index,driver_list)'>{{scope.row.status==1 ? '禁用' : '启用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class='btm-action'>
      <el-pagination v-if='paginations.total>0' class='pagination' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page='paginations.current_page' @current-change='onChangeCurrentPage' @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

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
</style>