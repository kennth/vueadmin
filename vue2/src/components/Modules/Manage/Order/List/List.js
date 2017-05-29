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
            
            order_list: [], //订单列表数组

            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //搜索表单信息
            search_data: {
                username: ''
            },

            //详情弹框信息
            dialog: {
                show: false,
                order_info: {}
            },


            //列表过滤状态
            status_filters: {//status 1.未发运 ,2.中转待发运,3.在途,4.退回 ,5.完结, 6.作废'
                list: [{
                    text: '未发运',
                    value: 1
                }, {
                    text: '待发运',
                    value: 2
                },{
                    text: '在途',
                    value: 3
                },{
                    text: '退回',
                    value: 4
                },{
                    text: '完结',
                    value: 5
                },{
                    text: '作废',
                    value: 6
                },],
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
            orderstatus : new Array("","未发运","待发运","在途","退回" ,"完结","作废")       
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
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        currentChange(data, node) {
            // console.log(data, node);
        },

        nodeClick(data, node, self) {
            // console.log(node);
        },

        checkChange(data, selfIsChecked, childHasChecked) {
            if (selfIsChecked === true && data.access.split('/').length == 4 && this.checkeds.indexOf(data.access) === -1) {
                this.checkeds.push(data.access);
            } else {
                var index = this.checkeds.indexOf(data.access);
                if (index !== -1) {
                    this.checkeds.splice(index, 1);
                }
            }
        },

        setorderAccess() {
            var flag = false;
            for (var i = 0; i < this.checkeds.length; i++) {
                var arr = this.checkeds[i].split('/');

                if (arr.length === 4) {
                    flag = true;
                    var rootPath = '/' + arr[1],
                        twoPath = rootPath + '/' + arr[2];

                    if (this.checkeds.indexOf(rootPath) === -1) {
                        this.checkeds.push(rootPath);
                    }
                    if (this.checkeds.indexOf(twoPath) === -1) {
                        this.checkeds.push(twoPath);
                    }
                }
            }

            //当前所选中的节点
            if (flag === false) {
                this.checkeds = [];
            }
            
            if (this.order_id.length) {
                orderApi.setAccessorder.call(this, {
                    order_id: this.order_id.join(','),
                    order_accesss: this.checkeds.join(',')
                }, data => {
                    this.$message.success('设置成功');
                });
            } else {
                this.$message.error('订单不能为空');
            }
        },

        /**
         * 列表状态格式化事件
         * @param  {object} item 当前订单信息
         * @return {string}      根据定义的类型转换文本描述值
         */
        formatterStatus(item) {            
            return this.orderstatus[item.status];
        },


        /**
         * 列表过滤状态事件
         * @param  {number} value 状态码
         * @param  {object} item  当前订单信息
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
            for (var p in query) {
                sd[p] = query[p];
            }

            for (var s in this.search_data) {
                sd[s] = this.search_data[s];

                if (!sd[s]) {
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
         * @param  {array} val 当前选中的订单信息数组，每个元素是订单信息对象
         */
        onSelectionChange(val) {
            // console.log(val);
            if (val.length) {
                this.batch_flag = false;
                var ids = [];
                for (var i = 0; i < val.length; i++) {
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
        onSetStatusorder(order, index, list) {
            this.$$api_order_updateorderStatus({
                id: order.id
            }, (data) => {
                order.status = order.status == 1 ? 2 : 1;
            });
        },

        /**
         * 删除订单事件
         * @param  {object || boolean} order  当前订单信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前订单列表索引
         * @param  {array} list  当前订单列表数组
         */
        onDeleteorder(order, index, list) {
            // console.dir(order);
			let title = '你确定删除订单 '+order.ordername+' 么?';
            if (order === true) {
                var id = this.batch_id;
                title = '你确定要批量删除' + id + "么?";
            } else {
                var id = order.id;
            }
			this.$confirm(title, '删除订单', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {				
				this.$$api_order_deleteOrder({
					id: id
				}, (data) => {
					if (order === true) {
						this.order_list = this.order_list.filter(function(item, idx) {
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
         * 修改订单
         * @param  {object} order 当前订单信息对象
         */
        onEditorder(order) {
            if (order && order.id) {
                this.$router.push('/manage/order/edit?id=' + order.id);
            } else {
                this.$message({
                    showClose: true,
                    message: 'ID跑哪去了？',
                    type: 'error'
                });
            }
        },

        /**
         * 查看订单信息事件
         * @param  {object} order 当前订单信息对象
         */
        onSelectorder(order) {
            this.dialog.show = true;
            this.dialog.order_info = order;
        },
		
		/**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);

            if (typeof field === 'object') {
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
        onSetStatusOrder(order, index, list) {
            this.$$api_order_saveOrder({
                id: order.id
            }, (data) => {
                order.status = order.status == 1 ? 2 : 1;
            });
        },
        
        /**
         * 列表状态格式化时间
         * @param  {object}    item
         * @return {string}      根据定义的类型转换文本描述值
         */
        formatterDatetime(item) {
            return moment(item.lastupdate).format('lll');
        },

        /**
         * 获取订单信息列表
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

            if (where) {
                data = Object.assign(data, where || {});
            }else {
				for (var s in query) {
					if (this.search_data[s] !== undefined) {
						this.search_data[s] = query[s];
						data[s]             = query[s];
					}
				}
			}

            this.$$api_order_selectOrder(data, (data) => {
                this.order_list = data.list.data;
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
    },
    watch: {
        '$route' (to, from) {
            this.getList();
        }
    }
}