<template>
  <div>
    <!-- <el-table v-if="number === 0" :data="tableData">
      <el-table-column label="创建时间" prop="dbcjsj" />
      <el-table-column label="催收类型">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.collection_mode || [],scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column label="发函模板" />
      <el-table-column label="当前流转环节" />
      <el-table-column label="处理状态">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.todo_status || [],scope.row.dbzt) }}</template>
      </el-table-column>
    </el-table> -->
    <p v-if="number === 0" style="text-align:center">当前【发函催收】无任务,请点击"添加代办"增加任务!</p>
    <div v-else>
      <div v-if="overDateShow">
        <span>逾期催收</span>
        <el-divider />
        <urge-information
          :form-list="formList"
          :form-data="overDateFormData"
          :show-upload="true"
          :rules="formRules"
          @save="saveOverDate"
        >
          <template slot="openOtherUrl">
            <el-form label-width="130px">
              <el-form-item label="函件模板">
                <el-button
                  v-for="item in overDateFormData.hjmbList"
                  :key="item.templateNo"
                  type="text"
                  @click="previewTemp(item.templateNo)"
                >{{ item.templateName || '' }}</el-button>
              </el-form-item>
            </el-form>
          </template>
        </urge-information>
      </div>
      <div v-if="insteadShow">
        <span>代偿催收</span>
        <el-divider />
        <urge-information
        :form-list="formList"
        :form-data="insteadFormData"
        :show-upload="true"
        :rules="formRules"
        @save="saveInstead"
        >
          <template slot="openOtherUrl">
            <el-form label-width="130px">
              <el-form-item label="函件模板">
                <el-button
                  v-for="item in insteadFormData.hjmbList"
                  :key="item.templateNo"
                  type="text"
                  @click="previewTemp(item.templateNo)"
                >{{ item.templateName || '' }}</el-button>
              </el-form-item>
            </el-form>
          </template>
        </urge-information>
      </div>
    </div>
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
import { registerBody } from '@/api/urge/register';
import eventBus from '../../eventBus'
export default {
  name: 'Sendfile',

  components: { UrgeInformation },
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
      },
      formRules: {
        fhdz: [{ required: true, message: '请输入发函地址' }],
        date: [{ required: true, message: '请发函时间' }],
        sdfs: [{ required: true, message: '选择送达方式' }],
        sdcg: [{ required: true, message: '请选择是否送达成功' }]
        // tqyy: [{ required: true, message: '请选择是否接通', trigger: 'change' }],
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
    // // 获取任务数据 1:逾期
    // this.getTaskByCond('1', res => {
    //   if (Object.keys(res).length > 0) {
    //     this.overDateShow = true;
    //     this.overDateFormData = res;
    //   }
    // });
    // // 获取任务数据 2:代偿
    // this.getTaskByCond('2', res => {
    //   if (Object.keys(res).length > 0) {
    //     this.insteadShow = true;
    //     this.insteadFormData = res;
    //   }
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
      if (Object.keys(res).length > 0) {
        this[formShowMapObj[cslx]] = true
        this[formDataMapObj[cslx]] = res;
      }
    })
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this.getTaskByCond(glcslx, glid, res => {
        console.log('res: ', res);
        if (Object.keys(res).length > 0) {
          this[formShowMapObj[glcslx]] = true
          this[formDataMapObj[glcslx]] = res;
        }
      })
    }
    // this.getTableData()
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
        console.log('res: ', res);
        if (res.code === 200) {
          console.log('res.rows: ', res.rows);
          this.overDateFormData = res.rows.find(item => item.cslx === '1') || {}
          this.insteadFormData = res.row.find(item => item.cslx === '2') || {}
        }
      })
    },
    // 点击模板预览
    previewTemp(templateNo) {
      // window.open(this.$iframeBaseUrl)
      window.open(`${this.$iframeBaseUrl}/loan/collectionRegister/fhcs/templateFill?id=${this.selectRows.id}&templateNo=${templateNo}`)
    },
    // 保存逾期催收
    saveOverDate() {
      this.overDateFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.id : this.selectRows.glid;
      this.overDateFormData.csfs = '4';
      this.overDateFormData.cslx = '1';
      this.overDateFormData.dbzt = '2'
      this.overDateFormData.djrxm = this.$store.state.user.nickName
      this.overDateFormData.djrzh = this.$store.state.user.name
      this.overDateFormData.dblx = this.overDateFormData.dblx || '2'
      this.overDateFormData.ywlx = this.overDateFormData.ywlx || this.selectRows.ywlx
      const tempData = {
        fileList: this.overDateFormData.fileList || [],
        registerEntity: this.overDateFormData
      };
      registerBody.saveTelephoneTask(tempData).then(response => {
        if (response.code === 200) {
          this.$msgSuccess(response.msg)
          eventBus.$emit('urgeHisChange')
        } else {
          this.$msgError(response.msg)
        }
      });
    },
    // 保存代偿催收
    saveInstead() {
      this.insteadFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.glid : this.selectRows.id;
      this.insteadFormData.csfs = '4';
      this.insteadFormData.cslx = '2';
      this.insteadFormData.dbzt = '2'
      this.insteadFormData.djrxm = this.$store.state.user.nickName
      this.insteadFormData.djrzh = this.$store.state.user.name
      this.insteadFormData.dblx = this.insteadFormData.dblx || '2'
      this.insteadFormData.ywlx = this.insteadFormData.ywlx || this.selectRows.ywlx
      const tempData = {
        fileList: this.insteadFormData.fileList || [],
        registerEntity: this.insteadFormData
      };
      registerBody.saveTelephoneTask(tempData).then(response => {
        if (response.code === 200) {
          this.$msgSuccess(response.msg)
          eventBus.$emit('urgeHisChange')
        } else {
          this.$msgError(response.msg)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
