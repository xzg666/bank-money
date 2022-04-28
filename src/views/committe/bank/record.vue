<template>
  <div class="app-container">
    <!--放款申请登记-->
    <!-- <div class="area">
      <div class="title">
        放款申请登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="formWdzg"
            :model="fksqForm"
            :rules="fksqRules"
            label-width="150px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="放款申请时间：" prop="value">
                    <el-date-picker
                      v-model="fksqForm.value"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注：" prop="value">
                    <el-input
                      v-model="fksqForm.value"
                      type="textarea"
                      placeholder="请输入"
                      width="400px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-button type="primary" @click="onSave">保存</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="returnFunc()">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div> -->
    <!--长银放款登记-->
    <!-- <div class="area">
      <div class="title">
        长银放款登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="formWdzg"
            :model="cyfkForm"
            :rules="cyfkRules"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="长银放款至银行时间：" prop="value">
                    <el-date-picker
                      v-model="cyfkForm.value"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注：" prop="value">
                    <el-input
                      v-model="cyfkForm.value"
                      type="textarea"
                      placeholder="请输入"
                      width="400px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="附件：" :required="true">
                    <el-upload
                      class="upload-demo"
                      :action="uploadImgUrl"
                      :headers="headers"
                      name="files"
                      :on-preview="handlePreviewHkqr"
                      :on-remove="handleRemoveHkqr"
                      :on-success="handlesuccessHkqr"
                      :file-list="fileListHkqr"
                    >
                      <el-button
size="small"
type="primary"
>点击上传</el-button>
                    </el-upload>
                    <p
                      v-for="(item, index) in fileListFksq"
                      :key="index"
                      class="file-tit file-name"
                      @click="downloadFunc('gjjry', index)"
                    >
                      {{ item.fileName }}
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-button type="primary" @click="onSave">保存</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="returnFunc()">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div> -->

    <!--银行回款登记-->
    <div v-if="isSelf">
      <div v-if="ywztStatu != '14'" class="area">
        <div class="title">
          银行回款登记
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="formYhhk"
              :model="yhhkForm"
              :rules="yhhkRules"
              label-width="180px"
              label-position="right"
              :inline="true"
            >
              <div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="银行回款至长银时间：" prop="yhhkzcysj">
                      <el-date-picker
                        v-model="yhhkForm.yhhkzcysj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：" prop="yhhkzcybz">
                      <el-input
                        v-model="yhhkForm.yhhkzcybz"
                        type="textarea"
                        placeholder="请输入"
                        width="400px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附件：">
                      <el-upload
                        class="upload-demo"
                        :action="uploadFileUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewYhhk"
                        :on-remove="handleRemoveYhhk"
                        :on-success="handlesuccessYhhk"
                        :file-list="fileListYhhkPre"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <!-- <p
                      v-for="(item, index) in fileListFksq"
                      :key="index"
                      class="file-tit file-name"
                      @click="downloadFunc('gjjry', index)"
                    >
                      {{ item.fileName }}
                    </p> -->
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div>
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isSelf == false" style="font-size:18px">
      只有本人发起的进件才能修改登记！
    </div>

    <div v-if="ywztStatu == '14'" style="font-size:18px">
      流程已完成！
    </div>
  </div>
</template>

<script>
import { register_info } from '@/api/committe/index';
import { getLog } from '@/api/committe/index';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';
export default {
  name: 'Record',
  data() {
    return {
      // 长银放款附件
      fileListFksq: [],
      fileListYhhkPre: [],
      // 银行回款附件
      fileListYhhk: [],
      fksqForm: {
        value: ''
      },
      cyfkForm: {
        value: ''
      },
      yhhkForm: {
        yhhkzcybz: '',
        yhhkzcysj: ''
      },
      uploadFileUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      value: '',
      // fksqRules: {
      //   value: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      // cyfkRules: {
      //   value: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      yhhkRules: {
        yhhkzcybz: [{ required: true, message: '请输入', trigger: 'blur' }],
        yhhkzcysj: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      ywztStatu: '',
      isSelf: false
      // hzflx:'',
    };
  },
  mounted() {
    this.getDetailsData();
    const userName = getUserName();
    const blywy = Cookies.get('ywblyUser');
    if (userName == blywy) {
      this.isSelf = true;
    } else {
      this.isSelf = false;
    }
  },
  created() {
    this.getDetailsData();
  },
  methods: {
    returnFunc() {
      this.$router.go(-1);
    },
    // 获取详情
    getDetailsData() {
      const wdywId = this.$route.query.id;
      getLog(wdywId).then(res => {
        this.ywztStatu = res.data.ywzt;
        console.log('状态', this.ywztStatu);
        // this.hzflx=res.data.hzflx;
      });
    },
    onSubmit() {
      const ywzt = this.ywztStatu;
      const wdywId = this.$route.query.id;
      const weywIdArr = [];
      weywIdArr.push(wdywId);
      // 回款时间
      if (ywzt == '13') {
        // const arr = [];
        // arr.push(this.fileListYhhk);
        this.$refs.formYhhk.validate(async valid => {
          if (valid) {
            const params = {
              yhhkzcysj: this.yhhkForm.yhhkzcysj,
              yhhkzcybz: this.yhhkForm.yhhkzcybz,
              ywId: wdywId,
              ywzt: ywzt,
              uploadFiles: this.fileListYhhk,
              hzflx: '1'
              // dklx: '05'
            };
            register_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.$router.go(-1);
              }
            });
          }
        });
      }
    },
    // 银行行回款
    handlesuccessYhhk(res, file, fileList) {
      this.fileListYhhk.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '15',
        glid: this.$route.query.id
      });
    },
    handleRemoveYhhk(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewYhhk(file) {
      console.log(file);
    },
    // 放款申请附件
    handlesuccessFksq(res, file, fileList) {
      this.fileListFksq.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '15',
        glid: this.$route.query.id
      });
    },
    handleRemoveHkqr(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewHkqr(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.title {
  //   height: 40px;
  //   line-height: 40px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  padding: 15px;
  text-align: left;
}
.return-btn {
  height: 30px;
  line-height: 30px;
  float: right;
  margin-top: -7px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.basic-info {
  padding: 15px;
  label {
    // font-weight: 700;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
  }
  span {
    font-size: 14px;
  }
  .el-row {
    line-height: 35px;
    margin-bottom: 0;
  }
}
.file-name {
  width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}
.file-tit {
  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}
</style>
