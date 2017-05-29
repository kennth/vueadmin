module.exports = {
  name: 'list',
  data() {
    return {
      //需要给分页组件传的信息
      paginations: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },

      line_list: [], //列表数组

      batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
      batch_flag: true, //符合批量删除为true,否则为false

      //搜索表单信息
      search_data: {
        linename: '',
      },

      //详情弹框信息
      dialog: {
        show: false,
        data:{
          poslist:[],
        }
      },

      //列表过滤状态
      status_filters: { //status 1.未发运 ,2.中转待发运,3.在途,4.退回 ,5.完结, 6.作废'
        list: [{
          text: '待发运',
          value: 1
        }, {
          text: '在途',
          value: 2
        }, {
          text: '完结',
          value: 3
        }, {
          text: '作废',
          value: 4
        } ],
        multiple: false
      },

      checkAll: true,
      isIndeterminate: true,

      accesss: [],
      checkeds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      linestatus: new Array("","待发运","在途","完结","作废")
    }
  },
  methods: {
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },

    filterNode(value, data) {
      if(!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    currentChange(data, node) {
      // console.log(data, node);
    },

    nodeClick(data, node, self) {
      // console.log(node);
    },

    checkChange(data, selfIsChecked, childHasChecked) {
      if(selfIsChecked === true && data.access.split('/').length == 4 && this.checkeds.indexOf(data.access) === -1) {
        this.checkeds.push(data.access);
      } else {
        var index = this.checkeds.indexOf(data.access);
        if(index !== -1) {
          this.checkeds.splice(index, 1);
        }
      }
    },

    setlineAccess() {
      var flag = false;
      for(var i = 0; i < this.checkeds.length; i++) {
        var arr = this.checkeds[i].split('/');

        if(arr.length === 4) {
          flag = true;
          var rootPath = '/' + arr[1],
            twoPath = rootPath + '/' + arr[2];

          if(this.checkeds.indexOf(rootPath) === -1) {
            this.checkeds.push(rootPath);
          }
          if(this.checkeds.indexOf(twoPath) === -1) {
            this.checkeds.push(twoPath);
          }
        }
      }

      //当前所选中的节点
      if(flag === false) {
        this.checkeds = [];
      }

      if(this.line_id.length) {
        lineApi.setAccessline.call(this, {
          line_id: this.line_id.join(','),
          line_accesss: this.checkeds.join(',')
        }, data => {
          this.$message.success('设置成功');
        });
      } else {
        this.$message.error('不能为空');
      }
    },

    /**
     * 列表状态格式化事件
     * @param  {object} item 当前信息
     * @return {string}      根据定义的类型转换文本描述值
     */
    formatterStatus(item) {
      return this.linestatus[item.status];
    },

    /**
     * 列表状态格式化时间
     * @param  {object} 	 item
     * @return {string}      根据定义的类型转换文本描述值
     */
    formatterDatetime(item) {
      return moment(item.lastupdate).format('lll');
    },

    /**
     * 列表过滤状态事件
     * @param  {number} value 状态码
     * @param  {object} item  当前信息
     * @return {boolean}       匹配成功为true,否则为false
     */
    filterStatus(value, item) {
      return item.status == value;
    },

    /**
     * 点击搜索按钮事件
     */
    onSearch() {
      console.log(this.search_data);

      var sd = {};

      var query = this.$route.query;
      for(var p in query) {
        sd[p] = query[p];
      }

      for(var s in this.search_data) {
        sd[s] = this.search_data[s];

        if(!sd[s]) {
          delete sd[s];
        }
      }

      this.$router.push({
        path: this.$route.path,
        query: sd
      });
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的信息数组，每个元素是信息对象
     */
    onSelectionChange(val) {
      // console.log(val);
      if(val.length) {
        this.batch_flag = false;
        var ids = [];
        for(var i = 0; i < val.length; i++) {
          ids.push(val[i].id);
        }
        this.batch_id = ids.join(',');
      } else {
        this.batch_flag = true;
        this.batch_id = '';
      }
    },

    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath(field, value) {
      var path = this.$route.path,
        query = Object.assign({}, this.$route.query);

      query[field] = value;

      this.$router.push({
        path: path,
        query: query
      });
    },

    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage(page) {
      this.setPath('page', page);
    },

    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize(size) {
      this.setPath('page_size', size);
    },

    /**
     * 删除事件
     * @param  {object || boolean} line  当前信息对象或者为布尔值,为布尔值时，代表是批量删除
     * @param  {number} index 当前列表索引
     * @param  {array} list  当前列表数组
     */
    onDeleteline(line, index, list) {
      // console.dir(line);
      let title = '你确定删除 ' + line.linename + ' 么?';
      if(line === true) {
        var id = this.batch_id;
        title = '你确定要批量删除' + id + "么?";
      } else {
        var id = line.id;
      }
      this.$confirm(title, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$$api_line_deleteLine({
          id: id
        }, (data) => {
          if(line === true) {
            this.line_list = this.line_list.filter(function(item, idx) {
              return id.indexOf(item.id) === -1;
            });
          } else {
            list.splice(index, 1);
          }
          this.getList();
        });
      });

    },

    /**
     * 修改
     * @param  {object} line 当前信息对象
     */
    onEditline(line) {
      if(line && line.id) {
        this.$router.push('/manage/line/edit?id=' + line.id);
      } else {
        this.$message({
          showClose: true,
          message: 'ID跑哪去了？',
          type: 'error'
        });
      }
    },

    /**
     * 查看信息事件
     * @param  {object} line 当前信息对象
     */
    onSelectline(line) {
      let pathlist= eval("(" + line.path + ")");
      pathlist.forEach(r=>{
        let pos = [];
        pos.lng = r.lng;
        pos.lat = r.lat;
        r.pos = pos;
      })
      this.dialog.data.poslist = pathlist;
      console.log(this.dialog.data.poslist);
      this.dialog.show = true;
    },

    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath(field, value) {
      var path = this.$route.path,
        query = Object.assign({}, this.$route.query);

      if(typeof field === 'object') {
        query = field;
      } else {
        query[field] = value;
      }

      this.$router.push({
        path,
        query
      });
    },

    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage(page) {
      this.getList({
        page,
        fn: () => {
          this.setPath('page', page);
        }
      });
    },

    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize(page_size) {
      this.getList({
        page_size,
        fn: () => {
          this.setPath('page_size', page_size);
        }
      });
    },

    /**
     * 设置状态
     */
    onSetStatusLine(line, index, list) {
      this.$$api_line_saveLine({
        id: line.id
      }, (data) => {
        line.status = line.status == 1 ? 2 : 1;
      });
    },

    /**
     * 获取信息列表
     * @param  {number} options.page      当前页码，切换页码时用
     * @param  {number} options.page_size 每页显示数量，改变每页数量时用
     * @param  {function} options.fn                            } 获取列表后的回调函数
     */
    getList({
      page,
      page_size,
      where,
      fn
    } = {}) {

      var query = this.$route.query;

      this.paginations.current_page = page || parseInt(query.page) || 1;
      this.paginations.page_size = page_size || parseInt(query.page_size) || this.paginations.page_size;

      var data = {
        page: this.paginations.current_page,
        page_size: this.paginations.page_size
      };

      if(where) {
        data = Object.assign(data, where || {});
      } else {
        for(var s in query) {
          if(this.search_data[s] !== undefined) {
            this.search_data[s] = query[s];
            data[s] = query[s];
          }
        }
      }

      this.$$api_line_selectLine(data, (data) => {
        this.line_list = data.list.data;
        this.paginations.total = data.list.total;

        fn && fn();
      });
    },

    bmapReadyHandler({
      BMap,
      map
    }) {
      this.lng = 120.152217;
      this.lat = 30.284408
    },

  },

  mounted() {
    this.getList({
      fn: () => {
        // this.onSelectArticle(this.article_list[1]);
      }
    });
  },
  watch: {
    '$route' (to, from) {
      this.getList();
    }
  }
}