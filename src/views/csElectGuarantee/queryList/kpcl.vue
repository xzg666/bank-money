<template>
  <div class="app-container">
    <div v-if="resettime != '' && invoicestatus != '1'" class="kpcl-form">
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
        <el-form-item label="附件：" style="margin-left:15px" prop="files">
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
>开票确认</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="resettime == ''" class="hint">
      <p>标段还未开标!</p>
    </div>

    <div v-if="invoicestatus == '1'" class="hint">
      <p>开票已处理!</p>
    </div>
  </div>
</template>

<script>
// invoiceUpd
import { getToken } from '@/utils/auth';
import { invoiceUpd } from '@/api/electGuarantee/query';
export default {
  name: 'Kpcl',
  inject: ['reload'],
  props: {
    ywid: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    resettime: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    invoicestatus: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    }
  },
  data() {
    return {
      ruleForm: {
        files: [],
        invoicedownloadurl: ''
      },
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      rules: {
        expressno: [{ required: true, message: '请输入', trigger: 'blur' }],
        expressname: [{ required: true, message: '请输入', trigger: 'blur' }],
        files: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      fileList: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log('this.ruleForm', this.ruleForm);
          // this.ruleForm.id = this.id;
          // invoiceUpd(this.ruleForm).then(res => {
          //
          //   if (res.code == 200) {
          //     this.$message.success('操作成功!');
          //     this.$emit('closeDetails');
          //     console.log(' this.$parent', this.$parent);
          //     // this.$parent.closeDetails();
          //     // this.reload();
          //   }
          // });
          this.$confirm(
            '您确定要开票吗，确认后开票信息将不能再修改！',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.ruleForm.ywid = this.ywid;
              invoiceUpd(this.ruleForm).then(res => {
                if (res.code == 200) {
                  this.$message.success('操作成功!');
                  this.$emit('closeDetails');
                  console.log(' this.$parent', this.$parent);
                  // this.$parent.closeDetails();
                  // this.reload();
                }
              });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handlesuccessFile(index, rows, res, file, fileList) {
      debugger;
      this.ruleForm.files.push({
        fileName: res[0].response.data[0].fileName,
        filePath: res[0].response.data[0].filePath,
        filePostfix: res[0].response.data[0].filePostfix,
        fileSize: res[0].response.data[0].fileSize,
        fileMimetype: '16',
        glid: this.ywid,
        uid: res[0].uid
      });
      this.ruleForm.invoicedownloadurl = res[0].response.data[0].filePath;
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
.hint {
  font-size: 18px;
}
</style>
