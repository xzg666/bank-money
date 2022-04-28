<template>
  <div class="app-container">
    <div class="kpcl-form">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="快递单号：" prop="expressno">
          <el-input v-model="ruleForm.expressno"></el-input>
        </el-form-item>
        <el-form-item label="快递公司：" prop="expressname">
          <el-input v-model="ruleForm.expressname"></el-input>
        </el-form-item>
        <el-form-item
          label="附件："
          style="margin-left:15px"
          prop="uploadFiles"
        >
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :headers="headers"
            name="files"
            :on-success="handlesuccessFile"
            :on-preview="handleFilePreview"
            :on-remove="handleFileRemove"
            :before-remove="beforeRemoveFile"
            :limit="5"
            :on-exceed="handleExceedFile"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <!-- <p>{{ fileListWaterName }}</p> -->
        </el-form-item>

        <el-form-item>
          <el-button
type="primary"
@click="submitForm('ruleForm')"
>保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// invoiceUpd
import { getToken } from '@/utils/auth';
import { invoiceUpd } from '@/api/electGuarantee/query';
export default {
  name: 'Kpcl',
  props: {
    id: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    }
  },
  data() {
    return {
      ruleForm: {
        uploadFiles: []
      },
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      rules: {
        expressno: [{ required: true, message: '请输入', trigger: 'blur' }],
        expressname: [{ required: true, message: '请输入', trigger: 'blur' }],
        uploadFiles: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      fileList: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
          console.log('this.ruleForm', this.ruleForm);
          this.ruleForm.id = this.id;
          invoiceUpd(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功!');
              this.$parent.openDetails = false;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handlesuccessFile(index, rows, res, file, fileList) {
      this.ruleForm.uploadFiles.push({
        fileName: res[0].response.data[0].fileName,
        filePath: res[0].response.data[0].filePath,
        filePostfix: res[0].response.data[0].filePostfix,
        fileSize: res[0].response.data[0].fileSize,
        fileMimetype: '16',
        glid: res[0].response.data[0].id,
        uid: res[0].uid
      });
    },
    handleFileRemove(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
    },
    handleFilePreview(file) {
      console.log(file);
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss" scoped>
.kpcl-form {
  width: 50%;
}
</style>
