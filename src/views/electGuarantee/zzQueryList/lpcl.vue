<template>
  <div class="app-container">
    <div v-if="applyclaimtime != '' && claimstatus != '3'" class="kpcl-form">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="理赔结果" prop="claimresult">
          <el-select
            v-model="ruleForm.claimresult"
            placeholder="请选择理赔结果"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in claimresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="理赔原因" prop="cliaimreason">
          <el-input v-model="ruleForm.cliaimreason" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
type="primary"
@click="submitForm('ruleForm')"
>理赔确认</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="applyclaimtime == ''" class="hint">
      <p>还未理赔!</p>
    </div>

    <div v-if="claimstatus == '3'" class="hint">
      <p>理赔已处理!</p>
    </div>
  </div>
</template>

<script>
// invoiceUpd
import { getToken } from '@/utils/auth';
import { dealClaim } from '@/api/electGuarantee/query';
export default {
  name: 'Kpcl',
  inject: ['reload'],
  props: {
    ywid: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    applyclaimtime: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    claimstatus: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    }
  },
  data() {
    return {
      ruleForm: {},
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      rules: {
        cliaimreason: [{ required: true, message: '请输入', trigger: 'blur' }],
        claimresult: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      claimresultOptions: []
    };
  },
  created() {
    this.$getDicts('dzbh_tbjg').then(response => {
      this.claimresultOptions = response.data;
    });
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
            '您确定要理赔吗，确认后理赔信息将不能再修改！',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.ruleForm.ywid = this.ywid;
              // this.ruleForm.claimstatus = this.ruleForm.claimresult;
              dealClaim(this.ruleForm).then(res => {
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
      this.ruleForm.files.push({
        fileName: res[0].response.data[0].fileName,
        filePath: res[0].response.data[0].filePath,
        filePostfix: res[0].response.data[0].filePostfix,
        fileSize: res[0].response.data[0].fileSize,
        fileMimetype: '16',
        glid: this.id,
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
.hint {
  font-size: 18px;
}
</style>
