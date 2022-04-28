<template>
  <div class="app-container">
    <div v-if="applyquittime != '' && bankstatus != '1'" class="kpcl-form">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="退保结果" prop="policyresult">
          <el-select
            v-model="ruleForm.policyresult"
            placeholder="请选择退保结果"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in policyresultOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="退保原因" prop="policyreason">
          <el-input v-model="ruleForm.policyreason" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
type="primary"
@click="submitForm('ruleForm')"
>退保确认</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="applyquittime == ''" class="hint">
      <p>还未退保!</p>
    </div>

    <div v-if="bankstatus == '1'" class="hint">
      <p>退保已处理!</p>
    </div>
  </div>
</template>

<script>
// invoiceUpd
import { getToken } from '@/utils/auth';
import { invoiceBank } from '@/api/electGuarantee/query';
export default {
  name: 'Kpcl',
  inject: ['reload'],
  props: {
    ywid: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    applyquittime: {
      type: String,
      default: () => '' // data数据格式为： {name: '龙灿',sex: '女'}
    },
    bankstatus: {
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
        policyreason: [{ required: true, message: '请输入', trigger: 'blur' }],
        policyresult: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      policyresultOptions: []
    };
  },
  created() {
    this.$getDicts('dzbh_tbjg').then(response => {
      this.policyresultOptions = response.data;
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
            '您确定要退保吗，确认后退保信息将不能再修改！',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.ruleForm.ywid = this.ywid;
              this.ruleForm.bankstatus = this.ruleForm.policyresult;
              invoiceBank(this.ruleForm).then(res => {
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
        glid: this.ywid,
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
