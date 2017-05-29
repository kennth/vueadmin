<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="公司名称" v-model='search_data.companyname' clear></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="联系人" v-model='search_data.contact'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="company_list" @selection-change='onSelectionChange'>
      </el-table-column>
      <el-table-column label='公司地址' type="expand">
        <template scope="props">
          <p>备注: {{ props.row.address }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="phone" label="公司电话" align="center" min-width="130" :sortable="true">
      </el-table-column>
      <el-table-column prop="contact" label="联系人" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="contact_phone" label="联系人电话" align="center" min-width="130" :sortable="true">
      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" align="center" width="180" :formatter="formatterDatetime" :sortable="true">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100" :sortable="true" :formatter="formatterStatus" :filters="status_filters.list" :filter-method="filterStatus" :filter-multiple="status_filters.multiple">
      </el-table-column>
      <el-table-column label="操作" width="150" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='edit' size="mini" @click='onEditcompany(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeletecompany(scope.row,scope.$index,company_list)'></el-button>
          <el-button size="mini" :type="scope.row.status==1 ? 'danger' : 'info'" @click='onSetStatusCompany(scope.row,scope.$index,company_list)'>{{scope.row.status==1 ? '禁用' : '启用'}}
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