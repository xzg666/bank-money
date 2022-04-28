<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="(tab, event) => handleClick(tab, event, 2)"
    >
      <el-tab-pane :label="'短信催收(' + labelNumber('1') + ')'" name="first">
        <message :select-rows="selectRows" />
      </el-tab-pane>
      <el-tab-pane :label="'电话催收(' + labelNumber('2') + ')'" name="second">
        <tele-phone
          :over-date-data="TelePhoneData.overDateData"
          :all-dicts="allDicts"
          :select-rows="selectRows"
        />
      </el-tab-pane>
      <el-tab-pane :label="'上门催收(' + labelNumber('3') + ')'" name="third">
        <scence :number="labelNumber('3')" :all-dicts="allDicts" :select-rows="selectRows" :address-options="addressOptions" />
      </el-tab-pane>
      <el-tab-pane :label="'发函催收(' + labelNumber('4') + ')'" name="five">
        <send-file :number="labelNumber('4')" :all-dicts="allDicts" :select-rows="selectRows" />
      </el-tab-pane>
      <el-tab-pane :label="'面谈催收(' + labelNumber('6') + ')'" name="six">
        <talk :number="labelNumber('6')" :all-dicts="allDicts" :select-rows="selectRows" :address-options="addressOptions" />
      </el-tab-pane>
      <el-tab-pane :label="'其他催收(' + labelNumber('10') + ')'" name="seven">
        <other :all-dicts="allDicts" :select-rows="selectRows" />
      </el-tab-pane>
      <!-- <el-tab-pane :label="'诉讼催收(' + labelNumber('5') + ')'" name="eight">
        <prosecution :number="labelNumber('5')" :all-dicts="allDicts" :select-rows="selectRows" />
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
import Message from './urgeInformationTabs/message.vue';
import Other from './urgeInformationTabs/other.vue';
// import Prosecution from './urgeInformationTabs/prosecution.vue';
import Scence from './urgeInformationTabs/scence.vue';
import SendFile from './urgeInformationTabs/sendFile.vue';
import Talk from './urgeInformationTabs/talk.vue';
import TelePhone from './urgeInformationTabs/telePhone.vue';
import { registerBody } from '@/api/urge/register';
import { customInformationApi } from '@/api/customInformation';
import eventBus from '../eventBus'
export default {
  name: 'UrgeInformation',
  components: {
    Message,
    TelePhone,
    Scence,
    SendFile,
    Talk,
    Other
    // Prosecution
  },
  provide() {
    return {
      TelePhoneData: this.TelePhoneData,
      taskStatus: this.taskStatus
    };
  },
  props: {
    form: {
      type: Array,
      default() {
        return [];
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      activeName: 'first',
      labelData: [
        {
          csfs: '2',
          cnt: 0
        }
      ],
      TelePhoneData: {
        overDateData: {
          a: 1
        }
      },
      taskStatus: {
        overDateShow: false,
        insteadShow: false
      },
      allDicts: {},
      addressOptions: []
    };
  },
  computed: {
    labelNumber: function () {
      return function (csfs) {
        let number = 0;
        const tempObj = this.labelData.find(item => item.csfs === csfs);
        if (tempObj) {
          number = tempObj.cnt;
        }
        return number;
      };
    }
  },
  created() {
    // const params = {
    //   gpbz: '12',
    //   gpyy: '12'
    // }
    // registerBody.test(params)
    // 循环获取下拉框数据字典
    eventBus.$on('urgeHisChange', () => {
      this.getTaskNumber()
    })
    const dictsList = [
      'delay_reason',
      'home_income',
      'personal_income',
      'unconnect_reason',
      'repayment_attitude',
      'risk_degree',
      'prevent_type',
      'yes_no',
      'send_type',
      'talk_adress_type',
      'collection_type_other'
    ];
    dictsList.map(item => {
      this.$getDicts(item).then(res => {
        this.$set(this.allDicts, item, res.data);
      });
    });
    registerBody.getProvince().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.provinceName;
          item.dictValue = item.provinceId;
        });
        this.$set(this.allDicts, 'province', res.data);
      }
    });
    this.getCollecTypeDict();
    this.getTaskNumber();
    this.getTaskDataByCond();
    this.getTaskStatus(this.selectRows.id);
    this.queryCustomAddressOptions()
  },
  mounted() { },

  methods: {
    handleClick(tab, event, number) { },
    // 获取催收方式字典
    getCollecTypeDict() {
      this.$getDicts('collection_mode').then(response => {
        console.log(response);
        const result = this.$selectDictLabel(response.data, 2);
        console.log(result);
      });
    },
    // 获取任务数量
    getTaskNumber() {
      registerBody
        .getTodoNumber({
          fpclrzh: this.$store.state.user.name,
          ids: [this.selectRows.id, this.selectRows.glid]
        })
        .then(res => {
          if (res.code === 200) {
            this.labelData = res.data;
          } else {
            this.$message({ type: 'error', message: res.msg });
          }
        });
    },
    // 获取具体任务数据
    getTaskDataByCond() {
      registerBody
        .getTaskByCond({
          csfs: '2',
          cslx: '1',
          fpclrzh: this.$store.state.user.name,
          taskId: this.selectRows.id
        })
        .then(res => {
          if (res.code === 200) {
            this.TelePhoneData.overDateData = res.data || {};
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
          if (resData.cslx === '1') {
            // 当前任务是逾期
            this.taskStatus.overDateShow = true;
          } else {
            // 当前任务是代偿
            this.taskStatus.insteadShow = true;
          }
          // 判断是否有关联任务
          if (resData.glid) {
            registerBody.getTaksStatusByTaskId(resData.glid).then(glres => {
              if (glres.code === 200 && glres.data) {
                const glresData = glres.data;
                if ('3,4,6,7'.indexOf(glresData.rwzt) === -1) {
                  // 关联任务未完成或未取消
                  this.taskStatus.overDateShow = true;
                  this.taskStatus.insteadShow = true;
                }
              }
            });
          }
        }
      });
    },
    queryCustomAddressOptions() {
      // 查询客户已有的地址数据
      customInformationApi.getAddressInfoByCertNo(this.selectRows.zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              delete item.params
              item.dictLabel = item.address
              item.dictValue = item.id
            })
            this.addressOptions = res.data
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped></style>
