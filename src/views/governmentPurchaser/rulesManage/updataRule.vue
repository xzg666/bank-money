<template>
  <unify @init="handleInit" @submit="handleSubmit"></unify>
</template>

<script>
import {
  queryTemplateConfig,
  add_updata_rules,
  queryRuleDetail
} from '@/api/governmentPurchaser/rules';
import unify from './unify';
export default {
  components: { unify },
  data() {
    return {};
  },
  methods: {
    handleInit(that) {
      queryRuleDetail({
        ruleVersionId: this.$route.query.ruleVersionId
      }).then(res => {
        // that.detailsData = res.data;
        // // 普通条目
        // that.commonList = [];
        // // 测算条目
        // that.calculateList = [];
        // // 测算条目行数据
        // that.calculateRowData = {};
        // that.detailsData.tdRuleVersionEntryList =
        //   that.detailsData.tdRuleVersionEntryTypeList[0].tdRuleVersionEntryList;
        // that.detailsData.tdRuleVersionEntryList.forEach((item, index) => {
        //   // 普通条目
        //   if (item.entryShowType === '1') {
        //     const entryDescs = item.entryDesc.split(/[{}]/g);
        //     item.tdRuleVersionVariableList.forEach((citem, index) => {
        //       citem.variableLabel = entryDescs[2 * index];
        //     });
        //     if (entryDescs.length % 2 === 1) {
        //       item.tdRuleVersionVariableList[
        //         item.tdRuleVersionVariableList.length - 1
        //       ].variableLabelLast = entryDescs.slice(-1)[0];
        //     }
        //     that.commonList.push(item);
        //     // 测算条目
        //   } else if (item.entryShowType === '2') {
        //     that.calculateList.push(item);
        //     if (index === 0) {
        //       that.calculateRowData = JSON.parse(JSON.stringify(item));
        //       that.calculateRowData.tdRuleVersionVariableList.forEach(item => {
        //         item.variableValue = '';
        //       });
        //     }
        //   }
        // });
        that.detailsData = res.data.tdRuleVersionEntryTypeList;
        // 测算条目
        that.calculateList = [];
        // 测算条目行数据
        // that.calculateRowData = [];
        const tempFormData = JSON.parse(JSON.stringify(res.data))
        delete tempFormData.tdRuleVersionEntryTypeList
        that.formData = tempFormData
        // 适配数据
        that.detailsData.map((ele, _index) => {
          // 普通条目数量
          ele.commonList = []
          // 测算条目表格数量
          ele.tableList = []

          // 表格最终绑定的数据
          that.calculateList.push([])
          // 定义条目id List  用于下面出去每个条目类型里的测算条目数量(表格数量)
          const normalEntryTemplateId = []
          ele.tdRuleVersionEntryList.forEach((item, index) => {
            // if (index === 0) {
            //   normalEntryTemplateId = item.entryTemplateId
            // }
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
              // that.commonList.push(item);
              ele.commonList.push(item)
            // 测算条目
            } else if (item.entryShowType === '2') {
              // that.calculateList.push([item]);
              // that.calculateList[_index].push([])
              // that.calculateList[_index][index].push([item])
              // 测算条目每一行的字段
              // item.calculateRowData = JSON.parse(JSON.stringify(item.tdRuleVersionVariableList))
              // that.calculateRowData[index] = JSON.parse(JSON.stringify(item));
              // item.calculateRowData.map(_item => {
              //   _item.variableValue = '';
              // })
              if (index === 0) {
                // 是第一条  都要添加一项表格数据
                ele.tableList.push(item)
                // 添加了一个表格就需要push一条表格数据
                that.calculateList[_index].push([])
                // 找对应大表里面对应小表，当前表格数量tableList的length-1即为当前需要push数据的表格
                that.calculateList[_index][ele.tableList.length - 1].push(item)
                normalEntryTemplateId.push(item.entryTemplateId)
              } else if (normalEntryTemplateId.indexOf(item.entryTemplateId) === -1) {
                // 如果不是第一项  且是一个新的条目
                ele.tableList.push(item)
                // 添加了一个表格就需要push一条表格数据
                that.calculateList[_index].push([])
                // 找对应大表里面对应小表，当前表格数量tableList的length-1即为当前需要push数据的表格
                that.calculateList[_index][ele.tableList.length - 1].push(item)
                normalEntryTemplateId.push(item.entryTemplateId)
              } else {
                // 否则需要找到相同条目模板id的表格添加数据
                if (that.calculateList[_index].length > 0) {
                  const tableData = that.calculateList[_index].find(tableItem => tableItem[0].entryTemplateId === item.entryTemplateId)
                  tableData.push(item)
                }
              }
            }
          });
        })
      });
    },
    handleSubmit(that, tdRuleVersionEntryList) {
      add_updata_rules({
        ...that.formData,
        busTypeId: that.$route.query.busId,
        ruleTypeId: that.$route.query.ruleTypeId,
        tdRuleVersionEntryList
      }).then(res => {
        if (res.code === 200) {
          that.$message.success('修改成功!');
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
