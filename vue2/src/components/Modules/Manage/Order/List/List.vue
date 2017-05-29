<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单号" v-model='search_data.ordernumber'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border style="width: 100%" align='center' :data="order_list" @selection-change='onSelectionChange'>
      </el-table-column>
      <el-table-column label='备注' type="expand">
        <template scope="props">
          <p>备注: {{ props.row.memo }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="orderno" label="订单号" align="center" width="145" :sortable="true">
      </el-table-column>
      <el-table-column prop="fhunit" label="发货单位" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="shunit" label="收货单位" align="center" min-width="110" :sortable="true">
      </el-table-column>
      <el-table-column prop="productname" label="货物名称" align="center" min-width="100" :sortable="true">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="180" 
        :formatter="formatterDatetime" :sortable="true">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100" :sortable="true" 
        :formatter="formatterStatus" :filters="status_filters.list" :filter-method="filterStatus" :filter-multiple="status_filters.multiple">
      </el-table-column>

      <el-table-column label="操作" :min-width="150" :context="_self">
        <template scope='scope'>
          <el-button type="info" icon='edit' size="mini" @click='onEditorder(scope.row)'></el-button>
          <el-button type="danger" icon='delete' size="mini" @click='onDeleteorder(scope.row,scope.$index,order_list)'></el-button>

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