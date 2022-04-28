export default function ({
  ref = 'queryTable',
  queryParams = {}, // 查询参数
  selectType = '', // 左侧是否允许选中
  rowKey = 'id',

  deleteApi, // 删除条目的api
} = {}) {
  return {
    data: function () {
      return {
        // 查询条件初始值
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          ...queryParams,
        },
        // 选择类型，单选、多选
        selectType,
        // 选中的每一条（完整）
        selectRows: selectType === 'radio'
          ? null : !!selectType ? [] : undefined,
      }
    },
    computed: {
      /** 选中的key值，单选是string｜number，多选是Array<string｜number> */
      selectKeys() {
        if (this.selectType === 'radio') {
          return this.selectRows?.[rowKey]
        }
        if (this.selectType) {
          return this.selectRows?.map(item => item[rowKey])
        }
        return undefined
      },
    },
    created() {
      // console.log(this.$route)
    },
    methods: {
      getList() {
        try {
          if (this.$refs[ref]) {
            this.$refs[ref].getList()
          } else {
            this.$nextTick(() => {
              this.$refs[ref].getList()
            })
          }
        } catch {
          throw Error('未实现queryTable的ref')
        }
      },
      selectionChange(selection) {
        this.selectRows = selection
      },
      handlePrompt(operation = "该操作") {
        return this.$confirm(`是否确认${operation}?`, "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
      },
      /** 弹窗的删除方法 */
      handleDelete(ids = this.selectKeys) {
        this.handlePrompt("删除").then(() => {
          let response;
          try {
            const deleteFunc = deleteApi || this.deleteApi
            response = deleteFunc(ids);
          } catch {
            throw Error("deleteApi/this.deleteApi请至少实现其中一种")
          }
          return response
        }).then(() => {
          this.getList();
          this.removeRowKeys(ids)
          this.$msgSuccess("删除成功");
        })
      },
      handleOtherPrompt(api, ids = this.selectKeys, { operation, clearId = true }) {
        if (!api) {
          throw Error("api为必传参数")
        }
        this.handlePrompt(operation).then(() => {
          return api(ids)
        }).then(() => {
          this.getList();
          if (clearId) {
            this.removeRowKeys(ids)
          }
          this.$msgSuccess("操作成功");
        })
      },
      /** 不传默认删除所有 */
      removeRowKeys(ids) {
        if (this.selectRows && ids) {
          if (Array.isArray(ids)) {
            this.selectRows = this.selectRows.filter(item => !ids.includes(item[rowKey]))
          } else {
            if (Array.isArray(this.selectRows)) {
              this.selectRows = this.selectRows.filter(item => ids !== item[rowKey])
            } else if (this.selectRows[rowKey] === ids) {
              this.selectRows = null
            }
          }
        } else {
          this.clearRowKeys()
        }
      },
      /** 清除选中项 */
      clearRowKeys() {
        if (this.selectType === 'radio') {
          this.selectRows = null
        } else if (this.selectType) {
          this.selectRows = []
        } else {
          this.selectRows = undefined
        }
      }
    },
    watch: {
      selectType() {
        this.clearRowKeys()
      }
    }
  }
}
