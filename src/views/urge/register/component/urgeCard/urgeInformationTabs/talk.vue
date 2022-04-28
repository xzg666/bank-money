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
          label: '面谈开始时间', type: 'date', model: 'talkStartTime'
        },
        {
          label: '面谈结束时间', type: 'date', model: 'talkEndTime'
        },
        {
          label: '地址类型', type: 'select', model: 'addressType', disabled: true, dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '省', type: 'select', model: 'province', disabled: true, dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '市', type: 'select', model: 'city', disabled: true, dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '区/县', type: 'select', model: 'area', disabled: true, dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        { label: '面谈地址', model: 'talkAddress', disabled: true, inputType: 'textarea', span: '24', rows: '1' },
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
        { label: '短信内容', model: 'messageTemplate', inputType: 'textarea', span: '24', rows: '1' }

      ],
      formData: {
        homeIncome: 1,
        personIncome: 1,
        delayReason: 2,
        delayReasonText: '13333333333',
        addressType: 1,
        province: 1,
        city: '备注',
        talkStartTime: '',
        talkEndTime: '',
        area: '',
        urgeData: '',
        talkAddress: '',
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
