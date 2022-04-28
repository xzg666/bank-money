<template>
  <div>
    <p v-if="number === 0" style="text-align:center">当前【诉讼催收】无任务,请点击"添加代办"增加任务!</p>
    <el-table v-else :data="tableData">
      <el-table-column label="创建时间" prop="dbcjsj" />
      <el-table-column label="催收类型">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.collection_mode || [],scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column label="发函模板" prop="hjmb" />
      <el-table-column label="当前流转环节" />
      <el-table-column label="处理状态">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.todo_status || [],scope.row.dbzt) }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import UrgeInformation from '../../urgeForm/index.vue';
import { registerBody } from '@/api/urge/register';

export default {
  name: 'Prosecution',

  // components: { UrgeInformation },
  props: {
    number: {
      type: Number,
      default() {
        return 0;
      }
    },
    allDicts: {
      type: Object,
      default() {
        return {};
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      overDateShow: false,
      insteadShow: false,
      tableData: [],
      overDateFormData: {
        fhsj: null,
        fhdz: null,
        sdfs: null,
        sdcg: null,
        csrq: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        csms: null
      },
      insteadFormData: {
        fhsj: null,
        fhdz: null,
        sdfs: null,
        sdcg: null,
        csrq: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        csms: null
      }
    };
  },
  computed: {
    formList() {
      return [
        { label: '发函地址', model: 'fhdz', span: 24, inputType: 'textarea' },
        { label: '发函时间', type: 'date', model: 'fhsj' },
        {
          label: '送达方式',
          type: 'select',
          model: 'sdfs',
          dictOptions: this.allDicts.send_type
        },
        {
          label: '送达成功',
          type: 'select',
          model: 'sdcg',
          dictOptions: this.allDicts.yes_no
        },
        { label: '催收日期', type: 'date', model: 'csrq' },
        {
          label: '风险程度',
          type: 'select',
          model: 'fxcd',
          dictOptions: this.allDicts.risk_degree
        },
        { label: '预警时间', type: 'date', model: 'yjsj' },
        {
          label: '预警方式',
          type: 'select',
          model: 'yjfs',
          dictOptions: this.allDicts.prevent_type
        },
        { label: '要求完成时间', type: 'date', model: 'dbyqwcsj' },
        {
          label: '催收描述',
          model: 'csms',
          inputType: 'textarea',
          span: 24,
          rows: 4
        }
      ];
    }
  },
  created() {
    // this.getTaskByCond('1', res => {
    //   this.overDateShow = true;
    //   this.overDateFormData = res;
    // });
    // this.getTaskByCond('2', res => {
    //   this.insteadShow = true;
    //   this.insteadFormData = res;
    // });
    const formShowMapObj = {
      '1': 'overDateShow',
      '2': 'insteadShow'
    }
    const formDataMapObj = {
      '1': 'overDateFormData',
      '2': 'insteadFormData'
    }
    const { cslx, id, glid } = this.selectRows
    // 取当前任务状态和数据
    this.getTaskByCond(cslx, id, res => {
      this[formShowMapObj[cslx]] = true
      if (Object.keys(res).length > 0) this[formDataMapObj[cslx]] = res;
    })
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this.getTaskByCond(glcslx, glid, res => {
        this[formShowMapObj[glcslx]] = true
        if (Object.keys(res).length > 0) this[formDataMapObj[glcslx]] = res;
      })
    }
    this.getTableData()
  },
  mounted() { },

  methods: {
    // 查询待办数据
    getTaskByCond(cslx, id, cb) {
      const tempData = {
        csfs: '4',
        cslx: cslx,
        fpclrzh: this.$store.state.user.name,
        taskId: id
      };
      registerBody.getTaskByCond(tempData).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.dbzt !== '1') {
            // 当前待办任务不需要更新数据库，而是新增一条记录
            delete res.data.id;
          }
          cb(res.data || {});
        } else {
          this.$msgError(res.msg);
        }
      });
    },
    getTableData() {
      const tempData = {
        fpclrzh: this.$store.state.user.name,
        ids: [this.selectRows.id, this.selectRows.glid]
      }
      registerBody.getSendfilesHistory(tempData).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped></style>
