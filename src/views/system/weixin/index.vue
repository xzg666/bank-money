<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="内容">
        <el-input v-model="form.button" :rows="7" type="textarea"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交内容</el-button>
      </el-form-item>
    </el-form>

    <el-form
      ref="ewmform"
      :model="ewmForm"
      :rules="ewmRulesForm"
      label-width="80px"
    >
      <el-form-item label="渠道" prop="qudao">
        <el-input v-model="ewmForm.qudao" :rows="7"></el-input>
      </el-form-item>
      <el-form-item label="机构" prop="branch">
        <el-input v-model="ewmForm.branch" :rows="7"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
type="primary"
@click="onGetSubmit('ewmform')"
>获取二维码</el-button>
      </el-form-item>
    </el-form>

    <img v-if="ewmImg" :src="ewmImg" style="width:200px" />
  </div>
</template>

<script>
import { getListData, editData, getEwmImg } from '@/api/system/weixin';

export default {
  data() {
    return {
      ewmRulesForm: {
        qudao: [{ required: true, message: '请输入', trigger: 'blur' }],
        branch: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      form: {
        button: []
      },
      resultData: [],

      ewmForm: {},
      ewmImg: ''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getListData().then(res => {
        this.resultData = res.data;
        this.form.button = JSON.stringify(this.resultData);
        console.log('this.resultData', this.resultData);
      });
    },
    onSubmit() {
      this.form = JSON.parse(this.form.button);
      editData(this.form).then(res => {
        if (res.data.errcode == 0) {
          this.$message.success('操作成功!');
          this.getData();
        } else {
          this.$message.warning('操作失败!');
          this.getData();
        }
      });
    },
    onGetSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getEwmImg(this.ewmForm).then(res => {
            debugger;
            if (res.code == 200) {
              this.ewmImg = res.msg;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
