<template>
  <div class="app-container">
    <span>逾期催收</span>
    <el-divider />
    <urge-information :form-list="formList" :form-data="formData" />
    <span>代偿催收</span>
    <el-divider />
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
          label: '短信模板', type: 'select', model: 'template', dictOptions: [
            { dictLabel: '逾期2期', dictValue: 1 },
            { dictLabel: '逾期3期', dictValue: 2 }
          ]
        },
        {
          label: '发送对象', type: 'select', model: 'sendTarget', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        { label: '发送号码', model: 'phoneNumber' },
        { label: '短信内容', model: 'messageTemplate', inputType: 'textarea', span: '24', rows: '4' }

      ],
      formData: {
        sendTarget: 1,
        template: 2,
        phoneNumber: '13333333333',
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
