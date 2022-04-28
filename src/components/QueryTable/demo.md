## query-table
### 参数
- 必传 queryParams 查询条件，必须包含pageNum, pageSize,属性
- 必传 getData 获取数据方法，(queryParams) => Promise，若返回false则不作处理
- formData 数据将透传给form-list组件，结构`[{label: '名称', model: 'name', type: 'input'}]`
- row-key 每一条的key，默认为"id"
- select-rows 传入选中的条目，至少需要row-key，注意多选是数组，单选是对象
- form 对象值将透传给elForm
- tableSelection 对象透传给多选框
- pagination 分页是否显示，默认显示
- indexed 是否显示序号 
- 其它参数将透传给elTable
  
### event
- selects-change select-rows改变时的回调
  
### slot
- table el-table组件的slot
- form 查询条件部分（一般使用formData就可以不用这个插槽）
- operating 一般摆放新增、批量操作等按钮的位置
- 其它插槽将根据formData的type来

### formData
- label elFormItem的label(必传)
- model 查询字段名(必传)
- type 使用组件类型或slot名称，默认input
- slotOption 组件参数透传对象
- span 选择项长度，默认utils/config/baseSpan
- dictOptions 字典配置
- 其它参数将透传给elFormItem

### formData.type
- input 输入框
- select 下拉选择框, 必传dictOptions:Array<{dictValue, dictLabel}>


```angular2html
<query-table
  ref="queryTable"
  :query-params="queryParams"
  :get-data="getData"
  :form-data="formData"
  :select-rows="selectRows"
  @selects-change="selectRows = $event"
>
  <template slot="operating">
    <el-button>
      新增
    </el-button>
  </template>
  <template slot="table">
    <el-table-column label="产品编号" align="center" prop="productCode" />
  </template>
  <template slot="other">
<!--  自定义组件部分  -->
  </template>
</query-table>
```

## tableMixin
### 参数
- ref query-table的ref
- queryParams 查询条件，会自动创建分页
- selectType 左侧是否允许选中，true(checkbox)、radio、false
- rowKey 每一条的key，默认为id
- deleteApi 删除条目的api

### 可用api
- selectKeys、selectRows选中的每一项
- getList列表查询方法
- handleDelete删除方法
- handleOtherPrompt其它需二次确认方法

```angular2html
  mixins: [
    tableMixin({
      ref: 'queryTable',
      queryParams: { name: null },
      selectType: true,
      deleteApi,
      rowKey: 'id'
})],
```

## dictMixin
### 入参类型
若有value为string，则对应dictObj的key
- {[key: string]: string | Array} 推荐
- Array<string>
- string

### 可用api
- dictObj 字典集合
- getDictName 获取字典值方法
- dictFormatter 方便table使用

```angular2html
<el-table-column label="字典值" align="center" prop="newName" :formatter="dictFormatter" />

dictMixin({
      dictName: 'newName'
    })
```

## 开发中
- QueryTable/components下开发formData.type的更多类型
- table-column优化
- 其它