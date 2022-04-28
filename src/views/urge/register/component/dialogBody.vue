<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8" style="padding-left:65px">
      <el-col v-for="item in topButtonList" :key="item.type" :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="clickTopButton(item)"
        >{{ item.name }}</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>客户信息 </span>
      </div>
      <div class="text item">
        <information-card />
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <over-date />
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <urge-information />
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>催收记录</span>
      </div>
      <div class="text item">
        <urge-record />
      </div>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="openDialog" width="90%" append-to-body style="height:95%; overflow:auto">
      <component :is="currentComponent" />
    </el-dialog>
  </div>
</template>

<script>
import InformationCard from './urgeCard/informationCard.vue';
import BusinessInfromation from './urgeCard/businessInfromation.vue';
import OverDate from './urgeCard/overDate.vue';
import UrgeRecord from './urgeCard/urgeRecord.vue';
import UrgeInformation from './urgeCard/urgeInformation.vue';
import Delay from './information/delay.vue';
import Replace from './information/replace.vue';
import Urge from './information/urge.vue';
import PayMent from './information/payMent.vue';
import Company from './information/company.vue';
import Together from './information/together.vue';
import Mortgage from './information/mortgage.vue';
export default {
  name: 'Dialogbody',

  components: {
    InformationCard, BusinessInfromation, OverDate, UrgeInformation, UrgeRecord, Delay, Replace, Urge, PayMent, Company, Together, Mortgage
  },

  data() {
    return {
      topButtonList: [
        { name: '拖欠信息', type: 'delay' },
        { name: '还款信息', type: 'repayment' },
        { name: '代偿信息', type: 'replace' },
        { name: '催收信息', type: 'urge' },
        { name: '缴存信息', type: 'PayMent' },
        { name: '单位信息', type: 'company' },
        { name: '共有人信息', type: 'together' },
        { name: '抵押物信息', type: 'mortgage' }
      ],
      dialogTitle: '拖欠信息',
      currentComponent: 'delay',
      openDialog: false
    };
  },

  mounted() {

  },

  methods: {
    clickTopButton(item) {
      console.log(item);
      this.dialogTitle = item.name;
      this.currentComponent = item.type;
      this.openDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
}
.app-container {
  height: 100%;
}
</style>
