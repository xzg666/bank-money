<template>
  <div class="container">
    <fc-designer ref="designer">
      <template slot="handle">
        <el-button icon="el-icon-plus" type="text" @click="handleSave">保存</el-button>
      </template>
    </fc-designer>
    <!--表单配置详情-->
    <el-dialog :title="formTitle" :visible.sync="formOpen" width="500px" append-to-body>
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="表单名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入表单名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { form_api } from '@/api/workFlow'
import FcDesigner from '@form-create/designer';
// const label = ' 自定义多选框';
// const name = 'checkbox';
// let i = 1;
// const uniqueId = () => `uni${i++}`;

// const checkbox = {
//   icon: 'icon-checkbox',
//   label,
//   name,
//   rule() {
//     return {
//       type: name,
//       field: uniqueId(),
//       title: label,
//       info: '',
//       effect: {
//         fetch: ''
//       },
//       props: {},
//       options: [
//         { value: '1', label: '选项1' },
//         { value: '2', label: '选项2' }
//       ]
//     };
//   },
//   props() {
//     return [
//       // 生成`checkbox`组件的`options`配置规则
//       FcDesigner.makeOptionsRule('options'),
//       {
//         type: 'switch',
//         field: 'type',
//         title: '按钮类型1',
//         props: { activeValue: 'button', inactiveValue: 'default' }
//       },
//       { type: 'switch', field: 'disabled', title: '是否禁用' }, {
//         type: 'inputNumber',
//         field: 'min',
//         title: '可被勾选的 checkbox 的最小数量'
//       },
//       { type: 'inputNumber', field: 'max', title: '可被勾选的 checkbox 的最大数量' }, {
//         type: 'input',
//         field: 'textColor',
//         title: '按钮形式的 Checkbox 激活时的文本颜色'
//       },
//       { type: 'input', field: 'fill', title: '按钮形式的 Checkbox 激活时的填充色和边框色' }];
//   }
// };
export default {
  data() {
    return {
      formId: this.$route.query.formId,
      dialogVisible: false,
      formOpen: false,
      formTitle: '',
      // 表单参数
      formData: {
        name: null,
        vueTxt: null
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }]
      },
      formConf: {}
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    if (this.formId) {
      form_api.getFormByFormId(this.formId).then(res => {
        this.formConf = JSON.parse(res.data.vueTxt);
        // this.drawingList = this.formConf.fields;
        this.formData = res.data;
        this.$refs.designer.setRule(this.formConf.formRule);
        this.$refs.designer.setOption(this.formConf.formOptions);
      })
    }
    // 插入组件规则
    console.log('this.$refs.designer: ', this.$refs.designer);
    // this.$refs.designer.addComponent(checkbox);
    // // 插入拖拽按钮到`main`分类下
    // this.$refs.designer.appendMenuItem('main', {
    //   icon: checkbox.icon,
    //   name: checkbox.name,
    //   label: checkbox.label
    // })
    // 删除自带组件
    // const deleteList = ['input', 'select']
    // const deleteList = ['select']
    // deleteList.map(item => {
    //   this.$refs.designer.removeMenuItem(item)
    // })
    // 添加拖拽区域
    this.$refs.designer.addMenu({
      title: '自定义组件',
      name: 'myGroup',
      list: []
    });
    this.defineComponent({ name: 'input', label: '自定义输入框' }, [{
      type: 'select',
      field: 'type',
      title: '类型',
      options: [{ label: 'text', value: 'text' }, { label: 'textarea', value: 'textarea' }]
    }])
    this.defineComponent({ name: 'select', label: '自定义选择框' })
    this.defineTable()
    this.defineUpload()
  },
  methods: {
    // 定义自定义表单组件
    defineUpload() {
      const _this = this
      const label = ' 自定义上传';
      const name = 'upload';
      let i = 1;
      const uniqueId = () => `uni${i++}`;

      const checkbox = {
        icon: 'icon-upload',
        label,
        name: `${name}_1`,
        rule() {
          return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            effect: {
              fetch: ''
            },
            props: {
              action: ''
            },
            options: []
          };
        },
        props() {
          return [
            // 生成`checkbox`组件的`options`配置规则
            FcDesigner.makeOptionsRule('options'),
            {
              type: 'select',
              field: 'type',
              title: '文件所属类型',
              props: { activeValue: 'button', inactiveValue: 'default' },
              // options: this.$store.getters.dictData.wd_file_type || []
              options: _this.changeSelectLable('wd_file_type')
            }];
        }
      };
      this.$refs.designer.addComponent(checkbox);
      // 插入拖拽按钮到`main`分类下
      this.$refs.designer.appendMenuItem('main', {
        icon: checkbox.icon,
        name: checkbox.name,
        label: checkbox.label
      })
    },
    defineTable() {
      // const _this = this
      const label = '表单';
      const name = 'el-table';
      let i = 1;
      const uniqueId = () => `uni${i++}`;

      const checkbox = {
        icon: 'icon-table',
        label,
        name,
        rule() {
          return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            props: {
              border: true,
              data: [
                {
                  name: '苹果',
                  price: 12
                },
                {
                  name: '梨子',
                  price: 15
                }
              ]
            },
            children: [
              // {
              //   type: 'el-table-column',
              //   props: { label: '名称', prop: 'name' }
              // },
              // {
              //   type: 'el-table-column',
              //   props: { label: '价格', prop: 'price' }
              // }
            ],
            options: []
          };
        },
        props() {
          return [
            // 生成`checkbox`组件的`options`配置规则
            FcDesigner.makeOptionsRule('options'),
            {
              type: 'input',
              field: 'columnFiles',
              title: '表单列',
              props: { type: 'textarea' }
              // options: this.$store.getters.dictData.wd_file_type || []
            },
            {
              type: 'input',
              field: 'url',
              title: '接口地址'
              // options: this.$store.getters.dictData.wd_file_type || []
            }
          ];
        }
      };
      this.$refs.designer.addComponent(checkbox);
      // 插入拖拽按钮到`main`分类下
      this.$refs.designer.appendMenuItem('main', {
        icon: checkbox.icon,
        name: checkbox.name,
        label: checkbox.label
      })
    },
    // 定义通用框
    defineComponent({ name, label }, options = []) {
      console.log(name, label);
      // const label = '自定义输入';
      // const name = 'input';
      let i = 1;
      const uniqueId = () => `uni${i++}`;

      const checkbox = {
        icon: `icon-${name}`,
        label,
        name: `${name}_1`,
        rule() {
          return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            effect: {
              fetch: ''
            },
            props: {
              action: ''
            },
            options: []
          };
        },
        props() {
          return [
            // 生成`checkbox`组件的`options`配置规则
            FcDesigner.makeOptionsRule('options'),
            {
              type: 'select',
              field: 'insertDb',
              title: '是否存入数据库',
              props: { activeValue: 'button', inactiveValue: 'default' },
              // options: this.$store.getters.dictData.wd_file_type || []
              options: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
            },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            ...options
          ];
        }
      };
      this.$refs.designer.addComponent(checkbox);
      // 插入拖拽按钮到`main`分类下
      this.$refs.designer.appendMenuItem('myGroup', {
        icon: checkbox.icon,
        name: checkbox.name,
        label: checkbox.label
      })
    },
    changeSelectLable(dictCode) {
      const dictList = this.$store.getters.dictData[dictCode]
      dictList.map(item => {
        item.label = item.dictLabel
        item.value = item.dictValue
      })
      return dictList
    },
    // 表单重置
    reset() {
      this.formData = {
        formId: null,
        name: null,
        vueTxt: null,
        remark: null
      }
      this.resetForm('form')
    },
    // 取消按钮
    cancel() {
      this.formOpen = false
      this.reset()
    },
    handleSave() {
      // FcDesigner 生成的`JSON`
      const formRule = this.$refs.designer.getRule();
      // FcDesigner 生成的`options`
      const formOptions = this.$refs.designer.getOption();
      this.formConf = {
        formRule, formOptions
      }
      this.formData.vueTxt = JSON.stringify(this.formConf);
      if (!this.formId) {
        this.formOpen = true;
      } else {
        this.$confirm(`确定要修改表单内容?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          form_api.addForm(this.formData, this.formId).then(res => {
            if (res.code === 200) {
              this.$msgSuccess(res.msg)
              this.$router.go(-1)
            }
          })
        })
      }
      this.formTitle = '添加表单';
    },
    /** 保存表单信息 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          form_api.addForm(this.formData)
          this.drawingList = []
          this.idGlobal = 100
          this.open = false
          // 关闭当前标签页并返回上个页面
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "./index.scss";
.container {
  ::v-deep ._fc-designer {
    background: red !important;
  }
}
::v-deep ._fc-designer ._fc-l {
  padding: 10px 0 !important;
}
</style>
