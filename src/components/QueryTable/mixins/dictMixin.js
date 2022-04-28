/**
 * 处理字典
 * 入参类型 {[key: string]: string | Array}、Array<string>、string
 * */
export default function (dictList) {
  return {
    data() {
      return {
        dictObj: {}
      }
    },
    created() {
      // todo 此处循环调用字典接口，不应当
      if (Array.isArray(dictList)) {
        dictList.forEach(item => {
          this.queryDict(item)
        })
      } else if (typeof dictList === 'string') {
        this.queryDict(dictList)
      } else if (dictList instanceof Object) {
        Object.entries(dictList).forEach(([key, name]) => {
          if (Array.isArray(name)) {
            this.dictObj = {
              ...this.dictObj,
              [key]: name
            }
          } else {
            this.queryDict(key, name)
          }
        })
      }
    },
    methods: {
      /** 查询字典 */
      queryDict(key, name) {
        this.$getDicts(key).then(response => {
          this.dictObj = {
            ...this.dictObj,
            [name || key]: response.data
          }
        })
      },
      /** 通过字典名和dictValue获取dictLabel */
      getDictName(dictName, value, tip = "暂无") {
        let list = []
        if (typeof dictName === 'string') {
          list = this.dictObj[dictName] || []
        } else if (Array.isArray(dictName)) {
          list = dictName
        }
        const tItem = list?.find((item) => String(item.dictValue) === String(value))
        return tItem?.dictLabel || tip
      },
      /** 表格字典使用 */
      dictFormatter(row, col, value) {
        return this.getDictName(col.property, value)
      }
    }
  }
}
