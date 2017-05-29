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

      user_list: [], //用户列表数组

      batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
      batch_flag: true, //符合批量删除为true,否则为false

      //搜索表单信息
      search_data: {
        username: '',
        email: '',
      },

      //详情弹框信息
      dialog: {
        show: false,
        user_info: {}
      },

      dialog_access: {
        show: false,
        userinfo: {},
        web_routers: [],
        api_routers: []
      },

      //列表过滤状态
      status_filters: {
        list: [{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: 0
        }],
        multiple: false
      },

      checkAll: true,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true,

      accesss: [],
      checkeds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }

    }
  },
  methods: {    
    formatterDatetime(item) {
      return moment(item.lastupdate).format('lll');
    },
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

    setUserAccess() {
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

      // console.log(this.checkeds.join(','));
      // console.log(this.user_id.join(','));

      if(this.user_id.length) {
        UserApi.setAccessUser.call(this, {
          user_id: this.user_id.join(','),
          user_accesss: this.checkeds.join(',')
        }, data => {
          this.$message.success('设置成功');
        });
      } else {
        this.$message.error('用户不能为空');
      }
    },

    initRouters() {
      var routes = this.$router.options.routes;
      for(var i = 0; i < routes.length; i++) {
        if(routes[i].hidden !== true && routes[i].children && routes[i].children.length) {
          var tempObj = {},
            module = routes[i],
            menus = module.children;
          tempObj.name = module.name;
          tempObj.path = module.path;
          tempObj.access = module.path;
          tempObj.children = [];
          for(var j = 0; j < menus.length; j++) {
            if(menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
              var tempChildObj = {},
                menu = menus[j],
                pages = menu.children;
              tempChildObj.name = menu.name;
              tempChildObj.path = '/' + menu.path;
              tempChildObj.access = tempObj.path + '/' + menu.path;
              tempChildObj.children = [];
              for(var k = 0; k < pages.length; k++) {
                if(pages[k].hidden !== true) {
                  var tempPageObj = {},
                    page = pages[k];
                  tempPageObj.name = page.name;
                  tempPageObj.path = '/' + page.path;
                  tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
                  tempChildObj.children.push(tempPageObj);
                }
              }
              tempObj.children.push(tempChildObj);
            }
          }
          this.accesss.push(tempObj);
        }
      }
    },

    /**
     * 列表状态格式化事件
     * @param  {object} item 当前用户信息
     * @return {string}      根据定义的类型转换文本描述值
     */
    formatterStatus(item) {
      return item.status == 1 ? '启用' : '禁用';
    },

    /**
     * 列表过滤状态事件
     * @param  {number} value 状态码
     * @param  {object} item  当前用户信息
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
     * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
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
     * 设置状态
     */
    onSetStatusUser(user, index, list) {
      this.$$api_user_updateUserStatus({
        id: user.id
      }, (data) => {
        user.status = user.status == 1 ? 2 : 1;
      });
    },

    /**
     * 设置权限
     */
    onSetAccess(user, index, list) {
      this.$router.push({
        path: '/manage/user/access',
        query: {
          id: user.id
        }
      });

      // this.dialog_access.userinfo=user;
      // this.dialog_access.show=true;       
    },

    /**
     * 删除用户事件
     * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
     * @param  {number} index 当前用户列表索引
     * @param  {array} list  当前用户列表数组
     */
    onDeleteUser(user, index, list) {
      // console.dir(user);
      let title = '你确定删除用户 ' + user.username + ' 么?';
      if(user === true) {
        var id = this.batch_id;
        title = '你确定要批量删除' + id + "么?";
      } else {
        var id = user.id;
      }
      this.$confirm(title, '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$$api_user_deleteUser({
          id: id
        }, (data) => {
          if(user === true) {
            this.user_list = this.user_list.filter(function(item, idx) {
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
     * 修改用户
     * @param  {object} user 当前用户信息对象
     */
    onEditUser(user) {
      if(user && user.id) {
        this.$router.push('/manage/user/edit?id=' + user.id);
      } else {
        this.$message({
          showClose: true,
          message: 'ID跑哪去了？',
          type: 'error'
        });
      }
    },

    /**
     * 查看用户信息事件
     * @param  {object} user 当前用户信息对象
     */
    onSelectUser(user) {
      this.dialog.show = true;
      this.dialog.user_info = user;
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
     * 获取用户信息列表
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

      this.$$api_user_selectUser(data, (data) => {
        this.user_list = data.list.data;
        this.paginations.total = data.list.total;

        fn && fn();
      });
    },
  },

  mounted() {
    this.getList({
      fn: () => {
        // this.onSelectArticle(this.article_list[1]);
      }
    });

    this.initRouters();

    //test dialog

    /* setTimeout(() => {
         this.onSelectUser(this.user_list[0]);
     }, 600);*/
  },
  watch: {
    '$route' (to, from) {
      this.getList();
    }
  }
}