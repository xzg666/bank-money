<template>
  <div class="app-container">
    <urge-information :form-list="formList" :form-data="formData" />
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
export default {
  name: 'Message',

  components: { UrgeInformation },

  directives: {},

  data() {
    return {
      formList: [
        {
          label: '拖欠原因', type: 'select', model: 'delayReason', dictOptions: [
            { dictLabel: '经济紧张', dictValue: 1 },
            { dictLabel: '其他', dictValue: 2 }
          ]
        },
        { label: '拖欠原因说明', model: 'delayReasonText', span: '18', inputType: 'textarea' },
        {
          label: '家庭月收入', type: 'select', model: 'homeIncome', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '个人月收入', type: 'select', model: 'personIncome', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '致电对象', type: 'select', model: 'teleTarget', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        { label: '致电号码', model: 'teleNumber' },
        {
          label: '是否接通', type: 'select', model: 'connect', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '未接通原因', type: 'select', model: 'unConnectReason', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        { label: '未接通备注', model: 'unConnectMark', span: '12', inputType: 'textarea' },
        {
          label: '催收日期', type: 'date', model: 'urgeData'
        },
        {
          label: '还款意愿', type: 'select', model: 'paybackDesire', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '预约还款日', type: 'date', model: 'appointmentDate'
        },
        { label: '预约还款金额', model: 'appointmentNumber' },
        {
          label: '风险程度', type: 'select', model: 'riskDegree', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '预警时间', type: 'date', model: 'preventionDate'
        },
        {
          label: '预警方式', type: 'select', model: 'preventionType', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '要求完成时间', type: 'date', model: 'requireDate', disabled: true
        },
        { label: '短信内容', model: 'messageTemplate', inputType: 'textarea', span: '24', rows: '4' }

      ],
      formData: {
        homeIncome: 1,
        personIncome: 1,
        delayReason: 2,
        teleTarget: 1,
        delayReasonText: '13333333333',
        teleNumber: '123',
        connect: 1,
        unConnectReason: 1,
        unConnectMark: '备注',
        urgeData: '',
        paybackDesire: 1,
        appointmentDate: '',
        appointmentNumber: '',
        riskDegree: '',
        preventionDate: '',
        preventionType: '',
        requireDate: '',
        messageTemplate: '短信模板'
      }
    };
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
