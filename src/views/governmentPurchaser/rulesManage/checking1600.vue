<template>
  <unify @init="handleInit" @submit="handleSubmit"></unify>
</template>

<script>
import {
  queryTemplateConfig,
  add_updata_rules
} from '@/api/governmentPurchaser/rules';
import unify from './unify';
export default {
  components: { unify },
  data() {
    return {};
  },
  methods: {
    handleInit(that) {
      queryTemplateConfig({
        ruleTypeId: that.$route.query.ruleTypeId
      }).then(res => {
        that.detailsData = res.data;
        // 普通条目
        that.commonList = [];
        // 测算条目
        that.calculateList = [];
        // 测算条目行数据
        that.calculateRowData = {};

        // 适配数据
        that.detailsData.tdRuleVersionEntryList =
          that.detailsData.tdRuleEntryTemplateList;
        delete that.detailsData.tdRuleEntryTemplateList;

        that.detailsData.forEach((itemDetails, indexDetails) => {
          that.detailsData[indexDetails].tdRuleVersionEntryList =
            that.detailsData[indexDetails].tdRuleEntryTemplateList;
          delete that.detailsData[indexDetails].tdRuleEntryTemplateList;
          itemDetails.tdRuleVersionEntryList.forEach((item, index) => {
            // 适配数据
            item.tdRuleVersionVariableList = item.tdRuleEntryVariableList;
            delete item.tdRuleEntryVariableList;

            delete item.entryVariableId;
            delete item.entryTemplateId;
            item.tdRuleVersionVariableList.forEach(citem => {
              delete citem.entryVariableId;
              delete citem.entryTemplateId;
              that.$set(citem, 'variableValue', citem.variableLabel);
            });

            // 普通条目
            if (item.entryShowType === '1') {
              const entryDescs = item.entryDesc.split(/[{}]/g);
              item.tdRuleVersionVariableList.forEach((citem, index) => {
                citem.variableLabel = entryDescs[2 * index];
              });
              if (entryDescs.length % 2 === 1) {
                item.tdRuleVersionVariableList[
                  item.tdRuleVersionVariableList.length - 1
                ].variableLabelLast = entryDescs.slice(-1)[0];
              }
              item.entryIsUse = '1';
              that.commonList.push(item);
              // 测算条目
            } else if (item.entryShowType === '2') {
              that.calculateList.push(item);
              if (index === 0) {
                that.calculateRowData = JSON.parse(JSON.stringify(item));
                that.calculateRowData.tdRuleVersionVariableList.forEach(
                  item => {
                    item.variableValue = '';
                  }
                );
              }
            }
          });
        });
      });
    },
    handleSubmit(that) {
      add_updata_rules({
        ...that.detailsData,
        busTypeId: that.$route.query.busId,
        tdRuleVersionEntryList: [...that.commonList, ...that.calculateList]
      }).then(res => {
        if (res.code === 200) {
          that.$message.success('新增成功!');
          that.$router.push({
            path: '/governmentPurchaser/rulesManage/rulesIndex',
            query: {
              busId: that.$route.query.busId
            }
          });
        }
      });
    }
  }
};
</script>
