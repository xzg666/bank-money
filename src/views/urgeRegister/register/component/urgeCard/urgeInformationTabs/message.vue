<template>
  <div class="app-container">
    <div v-if="overDateShow">
      <span>逾期催收</span>
      <el-divider />
      <message-form
        :message-temp-list="overDateMessageTempList"
        :target-list="targetList"
        :select-rows="selectRows"
        @save="saveOverDate"
      ></message-form>
    </div>
    <div v-if="insteadShow">
      <span>代偿催收</span>
      <el-divider />
      <message-form
        :message-temp-list="insteadMessageTempList"
        :target-list="targetList"
        :select-rows="selectRows"
        @save="saveInstead"
      ></message-form>
    </div>
  </div>
</template>

<script>
import MessageForm from './components/MessageForm';
import { registerBody } from '@/api/urge/register';
import eventBus from '../../eventBus.js'
export default {
  name: 'Message',

  components: { MessageForm },
  directives: {},
  inject: ['taskStatus'],

  props: {
    selectRows: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      overDateMessageTempList: [],
      insteadMessageTempList: [],
      overDateShow: false,
      insteadShow: false,
      overDateFormData: {},
      insteadFormData: {},
      // 致电对象列表
      targetList: [
        {
          'lxhm': '17680144682111',
          'lxdxLable': '11',
          'lxdxValue': '11'
        }
      ],
      form: {
        templateId: '',
        target: ''
      }
    };
  },
  created() {
    this.judgeTaskStauts(this.selectRows)
    this.selectRows.glid && this.getTaskStatus(this.selectRows.glid);
    registerBody.getMessageTemplate().then(res => {
      if (res.code === 200) {
        this.overDateMessageTempList = res.data.filter(item => item.mblx === '1')
        this.insteadMessageTempList = res.data.filter(item => item.mblx === '2')
      }
    })
    registerBody.getConectList(this.selectRows.zjhm).then(res => {
      if (res.code === 200) {
        this.targetList = res.data
      }
    })
    // // 获取任务数据 1:逾期
    // this.getTaskByCond('1', res => {
    //   this.overDateFormData = res;
    // });
    // // 获取任务数据 2:代偿
    // this.getTaskByCond('2', res => {
    //   this.insteadFormData = res;
    // });
    const formShowMapObj = {
      '1': 'overDateShow',
      '2': 'insteadShow'
    }
    // const formDataMapObj = {
    //   '1': 'overDateFormData',
    //   '2': 'insteadFormData'
    // }
    const { cslx, glid } = this.selectRows
    this[formShowMapObj[cslx]] = true
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this[formShowMapObj[glcslx]] = true
    }
  },
  mounted() {

  },

  methods: {
    getMessageTemplate() {

    },
    saveOverDate(data) {
      data.taskId = this.selectRows.cslx === '1' ? this.selectRows.id : this.selectRows.glid;
      data.csfs = '1';
      data.cslx = '1';
      data.dbzt = '2'
      data.djrxm = this.$store.state.user.nickName
      data.djrzh = this.$store.state.user.name
      data.dxsjfsrzh = this.$store.state.user.name
      data.dblx = this.overDateFormData.dblx || '2'
      data.ywlx = this.overDateFormData.ywlx || this.selectRows.ywlx
      if (!this.overDateFormData.id) {
        data.fqfs = '2'
        data.fpclrzh = this.$store.state.user.name
      }
      const tempData = {
        fileList: [],
        registerEntity: data
      }
      registerBody.saveTelephoneTask(tempData).then(response => {
        if (response.code === 200) {
          this.$msgSuccess(response.msg)
          eventBus.$emit('urgeHisChange')
        } else {
          this.$msgError(response.msg)
        }
      });
    },
    saveInstead(data) {
      data.taskId = this.selectRows.cslx === '1' ? this.selectRows.glid : this.selectRows.id;
      data.csfs = '1';
      data.cslx = '2';
      data.dbzt = '2'
      data.djrxm = this.$store.state.user.nickName
      data.djrzh = this.$store.state.user.name
      data.dxsjfsrzh = this.$store.state.user.name
      data.dblx = this.insteadFormData.dblx || '2'
      data.ywlx = this.insteadFormData.ywlx || this.selectRows.ywlx
      if (!this.overDateFormData.id) {
        data.fqfs = '2'
        data.fpclrzh = this.$store.state.user.name
      }
      const tempData = {
        fileList: [],
        registerEntity: data
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
    // 查询待办数据
    getTaskByCond(cslx, cb) {
      const tempData = {
        csfs: '2',
        cslx: cslx,
        fpclrzh: this.$store.state.user.name,
        taskId: this.selectRows.id
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
    // 查询任务状态
    getTaskStatus(taskId) {
      // 获取任务状态
      registerBody.getTaksStatusByTaskId(taskId).then(res => {
        if (res.code === 200 && res.data) {
          const resData = res.data;
          this.judgeTaskStauts(resData)
        }
      });
    },
    judgeTaskStauts(resData) {
      console.log('resData: ', resData);
      if (resData.cslx === '1') {
        // 当前任务是逾期
        if ('3,4,6,7'.indexOf(resData.rwzt) === -1) {
          // 当前任务已完成或取消
          this.overDateShow = true;
        }
      } else {
        // 当前任务是代偿
        if ('3,4,6,7'.indexOf(resData.rwzt) === -1) {
          // 当前任务已完成或取消
          this.insteadShow = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
