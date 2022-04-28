<template>
  <div class="app-container details-info">
    <div class="basic-info" style="padding-bottom:53px">
      <el-row>
        <el-col :span="6">
          <label>姓名:</label>
          <span>{{ detailData.jkrxm }}</span>
        </el-col>
        <el-col :span="6">
          <label>贷款金额(元)：</label>
          <span>{{ detailData.dkje }}</span>
        </el-col>
        <el-col :span="6">
          <label>身份证号码：</label>
          <span>{{ detailData.sfzhm }}</span>
        </el-col>
        <el-col :span="6">
          <label>卡号：</label>
          <span>{{ detailData.kh }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>电话：</label>
          <span>{{ detailData.dh }}</span>
        </el-col>
        <el-col :span="6">
          <label>放款日期：</label>
          <span>{{ detailData.fkrq }}</span>
        </el-col>
        <!-- <el-col :span="6">
          <label>共同借款人证件类型：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.cert_type || [],
                detailData.gtjkrzjlx
              )
            }}
          </span>
        </el-col> -->
        <el-col :span="6">
          <label>手续费(元)：</label>
          <span>{{ detailData.sxf }}</span>
        </el-col>
        <el-col :span="6">
          <label>借据号：</label>
          <span>{{ detailData.jjh }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>还款日期：</label>
          <span>{{ detailData.hkrq }}</span>
        </el-col>
        <!-- <el-col :span="6">
          <label>首付款(元)：</label>
          <span>{{ detailData.sfkje }}</span>
        </el-col>
        <el-col :span="6">
          <label>首付款比例(%)：</label>
          <span>{{ detailData.sfkbl }}</span>
        </el-col> -->
        <el-col :span="6">
          <label>还款本金(元)：</label>
          <span>{{ detailData.hkbj }}</span>
        </el-col>
        <el-col :span="6">
          <label>还本利息(元)：</label>
          <span>{{ detailData.hklx }}</span>
        </el-col>
        <el-col :span="6">
          <label>业务状态：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.all_status || [],
                detailData.ztzt
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>节点状态：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.wdywzt || [],
                detailData.ywzt
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>受理机构：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.accpt_org || [],
                detailData.blywd
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>3天预警：</label>
          <span v-if="detailData.warningStatus6 == '1'">预警</span>
        </el-col>
        <el-col :span="6">
          <label>当前预警天数：</label>
          <span>{{ detailData.dqsc }}</span>
        </el-col>
        <el-col :span="6">
          <label>银行回款至长银日期：</label>
          <span>{{ detailData.yhhkzcysj }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-show="ywztStatu > 11" class="area">
      <div class="title-sh">
        放款申请登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="cyfkForm"
            :model="detailData"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="放款申请时间：" prop="fkshsj">
                    <el-date-picker
                      v-model="detailData.fkshsj"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div v-show="ywztStatu > 12" class="area">
      <div class="title-sh">
        长银放款登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="cyfkForm"
            :model="detailData"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="长银放款至银行时间：" prop="cyfkzyhsj">
                    <el-date-picker
                      v-model="detailData.cyfkzyhsj"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!--银行回款登记-->
    <div v-show="ywztStatu == '14'" class="area">
      <div class="title-sh">
        银行回款登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="formWdzg"
            :model="detailData"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="银行回款至长银时间：" prop="yhhkzcysj">
                    <el-date-picker
                      v-model="detailData.yhhkzcysj"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注：">
                    <el-input
                      v-model="detailData.yhhkzcybz"
                      type="textarea"
                      placeholder="请输入"
                      width="150px"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="fileListFksq.length">
                <el-col :span="24">
                  <el-form-item label="附件：">
                    <p
                      v-for="(item, index) in fileListFksq"
                      :key="index"
                      class="file-tit file-name"
                      @click="downloadFunc('yhhk', index)"
                    >
                      {{ item.fileName }}
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listLog,
  getLog,
  delLog,
  addLog,
  update_info,
  exportLog,
  getFile_api,
  oprate_api,
  download_info,
  delFileInfo2_api,
  delFileInfo_api,
  process_api
} from '@/api/committe/index';
import { bankList } from '@/api/committe/bank';
import Cookies from 'js-cookie';
export default {
  name: 'DetailsInfo',
  props: {
    wdywId: {
      type: String
    }
  },
  data() {
    return {
      ywztStatu: '',
      detailData: {},
      fileListFksq: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    downloadFunc(type, index) {
      if (type == 'yhhk') {
        // location.href = this.fileListSdjyData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListFksq[index].fileId;
        location.href = url;
      }
    },
    getData() {
      const wdywId = this.$route.query.id;

      const params = {
        sfzhm: Cookies.get('cardNo')
      };
      bankList(params).then(res => {
        this.detailData = res.rows[0];
        this.ywztStatu = res.rows[0].ywzt;
        console.log('this.ywztStatu', this.ywztStatu);
        // this.hzfType = res.data.hzflx;
      });
      const paramsFile = {
        glid: wdywId
      };
      getFile_api(paramsFile).then(res => {
        const datas = res.rows;
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '15') {
              this.fileListFksq.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '15',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    height: 40px;
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
  display: inline-block;
  margin-right: 10px;
}
.file-tit {
  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  margin-top: 0;
}
.file-name {
  cursor: pointer;
  color: blue;
}
</style>

<style>
.file-area .el-upload-list__item-name {
  width: 80px;
}
.title-sh {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 10px;
  text-align: left;
}
.details-info .area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  width: 99%;
}
.area .el-row {
  margin-bottom: 50px;
}
.area .el-upload-list__item-name {
  width: 120px;
}
.area .el-input.is-disabled .el-input__inner,
.area .el-textarea.is-disabled .el-textarea__inner {
  color: #333 !important;
  background: #fff;
}
.avatar-uploader img {
  width: 178px;
  height: 178px;
}
.area .el-textarea__inner {
  width: 320px;
}
</style>
