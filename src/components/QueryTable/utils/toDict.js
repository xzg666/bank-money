// 用于配合FormSelect，将数据转换格式
export default function(list, value = "dictValue", label = "dictLabel") {
  if (Array.isArray(list)) {
    return list.map(item => ({
      ...item,
      dictValue: item[value],
      dictLabel: item[label]
    }))
  }
  return []
}
