// 设置自定义表单组件的下拉框options数组
/**
 * 
 * @param {Array} formList 表单字段列表
 * @param {Array} optionsList 字段列表 
 * @param {String} labelName 对应select label 
 */
export function setSelectOptions(formList, optionsList, labelName) {
  formList.find(item => item.label === labelName).dictOptions = optionsList
}