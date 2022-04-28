<template>
  <div class="app-container">
    <my-form
      v-if="formData.length > 0"
      :query-params="queryParams"
      :loading="loading"
      :button-span="buttonSpan"
      v-bind="form"
      @get-list="getList"
      v-on="form"
    >
      <slot name="form" />
      <form-list
        v-if="!!formData"
        :form="queryParams"
        :form-data="formData"
        @get-list="getList"
      >
        <template
          v-for="item in formData"
          :slot="item.type"
          slot-scope="slotProps"
        >
          <slot :name="item.type" :formLabel="slotProps.item" />
        </template>
      </form-list>
      <template slot="operating">
        <slot name="operating"></slot>
      </template>
    </my-form>
    <my-table
      :query-params="queryParams"
      :data="data"
      :loading="loading"
      :total="total"
      :row-key="rowKey"
      :select-rows="selectRows"
      :indexed="indexed"
      :pagination="pagination"
      v-bind="$attrs"
      @get-list="getList"
      v-on="$listeners"
    >
      <slot name="table" />
    </my-table>
  </div>
</template>

<script>
import MyTable from './MyTable';
import MyForm from './MyForm';
import FormList from './FormList';
import { baseSpan } from './utils/config';
export default {
  name: 'QueryTable',
  components: { FormList, MyForm, MyTable },
  provide() {
    return {
      queryForm: this
    };
  },
  props: {
    // 表单样式(label-position label-width style)
    formStyle: {
      type: Object,
      default: () => {}
    },
    // 查询用参数
    queryParams: {
      type: Object,
      required: true
    },
    // 获取列表数据接口
    getData: {
      type: Function,
      required: true
    },
    // 透传form列表
    formData: {
      type: Array
    },
    // 透传elForm的参数
    form: {
      type: Object
    },

    /** tableProps */
    rowKey: {
      type: String,
      default: 'id'
    },
    selectRows: {
      type: [Array, Object]
    },
    // 是否显示打印按钮
    showExport: {
      type: Boolean,
      default: false
    },
    /** 序号，注意，分页树形结构请不要使用 */
    indexed: Boolean,
    pagination: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      loading: false,
      data: [],
      total: 0
    };
  },
  computed: {
    /** 查询按钮的样式 */
    // eslint-disable-next-line vue/return-in-computed-property
    buttonSpan() {
      if (this.$attrs.buttonSpan) {
        return this.$attrs.buttonSpan;
      }
      if (this.formData) {
        let rowLength = 0;
        this.formData.forEach(item => {
          const span = Number(item.span || baseSpan);
          rowLength += span;
          if (rowLength > 24) {
            rowLength = span;
          } else if (rowLength === 24) {
            rowLength = 0;
          }
        });
        let c = 24 - rowLength;
        if (c < 6) {
          c = 6;
        }
        return c;
      }
    }
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 查询数据*/
    getList() {
      this.loading = true;
      this.getData(this.queryParams)
        .then(response => {
          this.loading = false;
          if (response !== false) {
            this.data = response?.rows || [];
            this.total = response?.total || 0;
            this.$emit('queryResult', response);
          }
        })
        .catch(response => {
          this.loading = false;
          this.data = response?.rows || [];
          this.total = response?.total || 0;
        });
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .el-select--medium {
  width: 100%;
}
</style>
