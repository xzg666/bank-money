<template>
  <div class="app-container bussiness-detail ">
    <div class="basic-info" style="padding-bottom:53px">
      <el-row>
        <el-col :span="6">
          <label>身份证正面：</label>
          <span
            v-if="imageUrlFrontData.fileName"
            class="file-tit file-name"
            @click="downloadFunc('sfzzm')"
          >
            <i class="el-icon-download"></i>
            {{ imageUrlFrontData.fileName }}</span>
          <!-- <img :src="imageUrlFront" /> -->
        </el-col>
        <el-col :span="6">
          <label>身份证反面：</label>
          <span
            v-if="imageUrlReveseData.fileName"
            class="file-tit file-name"
            @click="downloadFunc('sfzfm')"
          >
            <i class="el-icon-download"></i>
            {{ imageUrlReveseData.fileName }}</span>
          <!-- <img :src="imageUrlRevese" /> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label>客户银行还款流水：</label>
          <span
            v-for="(item, index) in fileListWaterData"
            v-if="fileListWaterName"
            :key="index"
            class="file-tit file-name"
            @click="downloadFunc('yhhkls', index)"
          >
            <i class="el-icon-download"></i>
            {{ item.fileName }}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label>委贷合同：</label>
          <span
            v-for="(item, index) in fileListIndentData"
            v-if="fileListIndentName"
            :key="index"
            class="file-tit file-name"
            @click="downloadFunc('wdht', index)"
          >
            <i class="el-icon-download"></i>
            {{ item.fileName }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label>服务合同：</label>
          <span
            v-for="(item, index) in fileListServiceData"
            v-if="fileListServiceName"
            :key="index"
            class="file-tit file-name"
            @click="downloadFunc('fwht', index)"
          >
            <i class="el-icon-download"></i>
            {{ item.fileName }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label>费用支付凭证：</label>
          <span
            v-for="(item, index) in fileListApplyData"
            v-if="fileListApplyName"
            :key="index"
            class="file-tit file-name"
            @click="downloadFunc('fyzfpz', index)"
          >
            <i class="el-icon-download"></i>
            {{ item.fileName }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label>公积金审批表：</label>
          <span
            v-for="(item, index) in fileListProvidentData"
            v-if="fileListProvidentName"
            :key="index"
            class="file-tit file-name"
            @click="downloadFunc('gjj', index)"
          >
            <i class="el-icon-download"></i>
            {{ item.fileName }}</span>
        </el-col>
      </el-row>

      <el-row>
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
          <label>受理日期：</label>
          <span>{{ detailData.slsj }}</span>
        </el-col>
        <el-col :span="6">
          <label>借款申请人姓名：</label>
          <span>{{ detailData.jkrxm }}</span>
        </el-col>
        <el-col :span="6">
          <label>借款申请人证件类型：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.cert_type || [],
                detailData.jkrzjlx
              )
            }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>借款申请人证件号码：</label>
          <span>{{ detailData.jkrsfz }}</span>
        </el-col>
        <el-col :span="6">
          <label>共同借款人姓名：</label>
          <span>{{ detailData.gtjkrxm }}</span>
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
          <label>共同借款人证件号码：</label>
          <span>{{ detailData.gtjkrsfz }}</span>
        </el-col>
        <el-col :span="6">
          <label>房屋坐落：</label>
          <span>{{ detailData.fwzl }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>房屋总价(元)：</label>
          <span>{{ detailData.fwzj }}</span>
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
          <label>建筑面积(平方米)：</label>
          <span>{{ detailData.fwjcmj }}</span>
        </el-col>
        <el-col :span="6">
          <label>贷款金额(元)：</label>
          <span>{{ detailData.dkje }}</span>
        </el-col>
        <el-col :span="6">
          <label>贷款类型：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.loan_type || [],
                detailData.dklx
              )
            }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="6">
          <label>购房次数：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.num_house_dict || [],
                detailData.gfcs
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>抵押类型：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.mortgage_type_dict || [],
                detailData.dylx
              )
            }}
          </span>
        </el-col> -->

        <!-- <el-col :span="6">
          <label>贷款期限(年)：</label>
          <span>{{ detailData.dkqx }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>年利率(%)：</label>
          <span>{{ detailData.nll }}</span>
        </el-col>
        <el-col :span="6">
          <label>还款方式：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.repayment_type || [],
                detailData.hkfs
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>每月还款金额(元)：</label>
          <span>{{ detailData.myhkje }}</span>
        </el-col>
        <el-col :span="6">
          <label>其他月均负债(元)：</label>
          <span>{{ detailData.qtyjfz }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>家庭月平均收入(元)：</label>
          <span>{{ detailData.jtpjysr }}</span>
        </el-col>
        <el-col :span="6">
          <label>负债比(%)：</label>
          <span>{{ detailData.fzbl }}</span>
        </el-col>
        <el-col :span="6">
          <label>委托银行：</label>
          <span>{{ detailData.wtyh }}</span>
        </el-col> -->

        <el-col :span="6">
          <label>合作方类型：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.partner_type || [],
                detailData.hzflx
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>合作方：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.partners || [],
                detailData.hzf
              )
            }}
          </span>
        </el-col>
        <!-- <el-col :span="6">
          <label>预警类型：</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.wd_warning || [],
              detailData.exeStatus
            )
          }}</span>
        </el-col> -->
        <!-- <el-col :span="6">
          <label>提醒方式：</label>
          <span>{{ detailData.txFs }}</span>
        </el-col> -->
        <el-col :span="6">
          <label>60日资金回笼异常：</label>
          <!-- <span>{{
            $selectDictLabel(
              $store.getters.dictData.funds_type || [],
              detailData.warningStatus1
            )
          }}</span> -->
          <span v-if="detailData.warningStatus1 == '1'">60日未结清异常</span>
        </el-col>
        <el-col :span="6">
          <label>80日资金回笼异常：</label>
          <!-- <span>{{
            $selectDictLabel(
              $store.getters.dictData.funds_type || [],
              detailData.warningStatus1
            )
          }}</span> -->
          <span v-if="detailData.warningStatus11 == '1'">80日未结清异常</span>
        </el-col>
        <el-col :span="6">
          <label>90日资金回笼异常：</label>
          <!-- <span>{{
            $selectDictLabel(
              $store.getters.dictData.funds_type || [],
              detailData.warningStatus1
            )
          }}</span> -->
          <span v-if="detailData.warningStatus111 == '1'">90日未结清异常</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>商贷结清异常：</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.remind_way || [],
              detailData.warningStatus2
            )
          }}</span>
        </el-col>
        <el-col :span="6">
          <label>商贷解押异常：</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.remind_way || [],
              detailData.warningStatus3
            )
          }}</span>
        </el-col>
        <el-col :span="6">
          <label>公积金入押异常：</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.remind_way || [],
              detailData.warningStatus4
            )
          }}</span>
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
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>借款合同编号：</label>
          <span>{{ detailData.htbh }}</span>
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
          <label>是否按时放款：</label>
          <span>{{
              $selectDictLabel(
                $store.getters.dictData.is_lending || [],
                detailData.sfasfk
              )
            }}
          </span>
        </el-col>
        <el-col :span="6">
          <label>监控天数：</label>
          <span>{{ detailData.ywjkts }}</span>
        </el-col>
        <el-col :span="6">
          <label>开户行及支行：</label>
          <span>{{ detailData.khhjzh }}</span>
        </el-col>
        <el-col :span="6">
          <label>客户收款账号：</label>
          <span>{{ detailData.khskzh }}</span>
        </el-col>
        <!-- <el-col :span="6">
          <label>客户收款账号：</label>
          <span>{{ detailData.khskzh }}</span> -->
        <!-- </el-col> -->
        <el-col :span="6">
          <label>婚姻状态：</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.marriage_type || [],
              detailData.hyzk
            )
          }}</span>
        </el-col>
        <!-- <el-col :span="6">
                  <label>贷款类型：</label>
                  <span>{{ $selectDictLabel( $store.getters.dictData.loan_type || [], detailData.dklx ) }}
                  </span>
              </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>办理业务员账号：</label>
          <span>{{ detailData.blywyzh }}</span>
        </el-col>
        <el-col :span="6">
          <label>办理业务员名称：</label>
          <span>{{ detailData.blywymc }}</span>
        </el-col>
        <!-- <el-col :span="6">
              <label>公积金审批时间：</label>
              <span>{{ detailData.gjjdkzgshsj }}</span>
            </el-col>
            <el-col :span="6">
              <label>公积金审核备注：</label>
              <span>{{ detailData.gjjdkzgshbz }}</span>
            </el-col> -->
      </el-row>
      <!-- <el-row>
            <el-col :span="6">
              <label>财务放款时间：</label>
              <span>{{ detailData.cwfksj }}</span>
            </el-col>
            <el-col :span="6">
              <label>财务放款备注：</label>
              <span>{{ detailData.cwfkbz }}</span>
            </el-col>
            <el-col :span="6">
              <label>实际放款时间：</label>
              <span>{{ detailData.wdsjfks }}</span>
            </el-col>
            <el-col :span="6">
              <label>实际放款备注：</label>
              <span>{{ detailData.wdsjfkzb }}</span>
            </el-col>
          </el-row> -->
      <!-- <el-row>
            <el-col :span="6">
              <label>预计结清时间：</label>
              <span>{{ detailData.yjjqsj }}</span>
            </el-col>
            <el-col :span="6">
              <label>借款结清时间：</label>
              <span>{{ detailData.jkjqsj }}</span>
            </el-col>
            <el-col :span="6">
              <label>借款结清备注：</label>
              <span>{{ detailData.jkjqzh }}</span>
            </el-col>
            <el-col :span="6">
              <label>借款解押时间：</label>
              <span>{{ detailData.jkjysj }}</span>
            </el-col>
          </el-row> -->
      <!-- <el-row>
            <el-col :span="6">
              <label>借款解押备注：</label>
              <span>{{ detailData.jkjybz }}</span>
            </el-col>
            <el-col :span="6">
              <label>公积金入押时间：</label>
              <span>{{ detailData.gjjrysj }}</span>
            </el-col>
            <el-col :span="6">
              <label>公积金入押备注：</label>
              <span>{{ detailData.gjjrybz }}</span>
            </el-col>
            <el-col :span="6">
              <label>回款时间：</label>
              <span>{{ detailData.hksj }}</span>
            </el-col>
          </el-row> -->
    </div>

    <!--放款申请登记--->
    <!-- <div v-show="ywztStatu > 10 && hzfType == '1'" class="area">
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
            <div v-if="ywztStatu > 10">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="放款申请时间：" prop="gjjrysj">
                    <el-date-picker
                      v-model="detailData.gjjrysj"
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
                  <el-form-item label="备注：" prop="gjjrybz">
                    <el-input
                      v-model="detailData.gjjrybz"
                      type="textarea"
                      placeholder="请输入"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div> -->

    <!--长银放款登记--->
    <!-- <div v-show="ywztStatu > 11 && hzfType == '1'" class="area">
      <div class="title-sh">
        银行回款登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="yhhkForm"
            :model="detailData"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div v-if="ywztStatu > 11">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="长银放款至银行时间：" prop="gjjrysj">
                    <el-date-picker
                      v-model="detailData.gjjrysj"
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
                  <el-form-item label="备注：" prop="gjjrybz">
                    <el-input
                      v-model="detailData.gjjrybz"
                      type="textarea"
                      placeholder="请输入"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件：" prop="jkjqzh">
                    <span
                      v-for="(item, index) in fileListYhhk"
                      :key="index"
                      class="file-name"
                      @click="downloadFunc('gjjry', index)"
                    >
                      <i class="el-icon-download"></i>
                      {{ item.fileName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div> -->

    <!--银行回款登记-->
    <!-- <div v-show="ywztStatu > 12" class="area">
      <div class="title-sh">
        银行回款登记
      </div>
      <div class="basic-info">
        <div style="padding-left:25px">
          <el-form
            ref="formWdzg"
            :model="yhhkForm"
            :rules="yhhkRules"
            label-width="180px"
            label-position="right"
            :inline="true"
          >
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="银行回款至长银时间：" prop="value">
                    <el-date-picker
                      v-model="yhhkForm.value"
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
                  <el-form-item label="备注：" prop="value">
                    <el-input
                      v-model="yhhkForm.value"
                      type="textarea"
                      placeholder="请输入"
                      width="400px"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
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
    </div> -->
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
export default {
  name: 'BussinessDetails',
  props: {
    wdywId: {
      type: String
    }
  },
  data() {
    return {
      ywztStatu: '',
      detailData: {},
      addInfoSdjy: {},
      addInfoHkqr: {},
      fileListSdjqData: [],
      fileListSdjyData: [],
      fileListGjjRyData: [],
      fileListFksq: [],
      // 身份证正面
      imageUrlFront: '',
      fileListWdywData: [],
      imageUrlFrontData: {
        fileName: '',
        filePath: '',
        filePostfix: '',
        fileSize: '',
        fileMimetype: '1'
      },
      yhhkForm: {
        value: ''
      },
      // 身份证反面
      imageUrlRevese: '',
      imageUrlReveseData: {
        fileName: '',
        filePath: '',
        filePostfix: '',
        fileSize: '',
        fileMimetype: '2'
      },
      // 公积金审批表
      fileListProvident: [],
      fileListProvidentData: [],
      // 客户还款流水
      fileListWater: [],
      fileListWaterData: [],
      // 委贷合同
      fileListIndent: [],
      fileListIndentData: [],
      // 服务合同
      fileListService: [],
      fileListServiceData: [],
      // 费用支付凭证
      fileListApply: [],
      fileListApplyData: [],
      hzfType: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    downloadFunc(type, index) {
      if (type == 'sfzzm') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.imageUrlFrontData.fileId;
        location.href = url;
      }
      if (type == 'sfzfm') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.imageUrlReveseData.fileId;
        location.href = url;
      }

      if (type == 'fyzfpz') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListApplyData[index].fileId;
        location.href = url;
      }
      if (type == 'gjj') {
        const urlPath =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListProvidentData[index].fileId;
        console.log('urlPath', urlPath);
        window.open(urlPath);
        // location.href = urlPath;
      }
      if (type == 'gjjry') {
        const urlPath =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListGjjRyData[index].fileId;
        console.log('urlPath', urlPath);
        window.open(urlPath);
        // location.href = urlPath;
      }
      if (type == 'fwht') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListServiceData[index].fileId;
        location.href = url;
      }
      if (type == 'wdht') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListIndentData[index].fileId;
        location.href = url;
      }
      if (type == 'yhhkls') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListWaterData[index].fileId;
        location.href = url;
      }
      if (type == 'wdywfk') {
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListWdywData[index].fileId;
        location.href = url;
        // location.href = this.fileListWdywData.filePath;
      }
      if (type == 'sdjq') {
        // location.href = this.fileListSdjqData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjqData[index].fileId;
        location.href = url;
      }
      if (type == 'sdjy') {
        // location.href = this.fileListSdjyData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjyData[index].fileId;
        location.href = url;
      }
      if (type == 'yhhk') {
        // location.href = this.fileListSdjyData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjyData[index].fileId;
        location.href = url;
      }
    },
    getData() {
      const wdywId = this.$route.query.id;
      getLog(wdywId).then(res => {
        this.detailData = res.data;
        this.ywztStatu = res.data.ywzt;
        this.hzfType = res.data.hzflx;
      });
      const params = {
        glid: wdywId
      };
      this.fileListWaterData = [];
      this.fileListIndentData = [];
      this.fileListServiceData = [];
      this.fileListApplyData = [];
      this.fileListProvidentData = [];
      getFile_api(params).then(res => {
        const datas = res.rows;
        for (let i = 0; i < datas.length; i++) {
          // 身份证正面
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '1') {
              this.imageUrlFront = datas[i].filePath;
              this.imageUrlFrontId = datas[i].id;
              this.imageUrlFrontData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '1',
                fileId: datas[i].id
              };
            }
          }
          // 身份证反面
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '2') {
              this.imageUrlRevese = datas[i].filePath;
              this.imageUrlReveseId = datas[i].id;
              this.imageUrlReveseData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '2',
                fileId: datas[i].id
              };
            }
          }
          // 银行还款流水
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '3') {
              this.fileListWaterName = datas[i].fileName;
              this.fileListWaterData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '3',
                fileId: datas[i].id
              });
            }
          }
          // 委贷合同
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '4' || datas[i].fileMimetype == '8') {
              this.fileListIndentName = datas[i].fileName;
              this.fileListIndentData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '4',
                fileId: datas[i].id
              });
            }
          }
          // 服务合同
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '5') {
              this.fileListServiceName = datas[i].fileName;
              this.fileListServiceData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '5',
                fileId: datas[i].id
              });
            }
          }
          // 费用支付凭证
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '6') {
              this.fileListApplyName = datas[i].fileName;
              this.fileListApplyData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '6',
                fileId: datas[i].id
              });
            }
          }
          // 公积金审批表
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '7') {
              this.fileListProvidentName = datas[i].fileName;
              this.fileListProvidentData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '7',
                fileId: datas[i].id
              });
            }
          }

          // 委贷业务放款
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '8' || datas[i].fileMimetype == '4') {
              this.fileListWdywtName = datas[i].fileName;
              this.fileListWdywData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '8',
                fileId: datas[i].id
              });
            }
          }

          // 商贷结清登记
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '9') {
              this.fileListSdjqName = datas[i].fileName;
              this.fileListSdjqData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '9',
                fileId: datas[i].id
              });
            }
          }

          // 商贷解押登记
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '10') {
              this.fileListSdjyName = datas[i].fileName;
              this.fileListSdjyData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '10',
                fileId: datas[i].id
              });
            }
          }

          // 公积金中心入押登记
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '11') {
              this.fileListGjjRyName = datas[i].fileName;
              this.fileListGjjRyData.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '11',
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
.bussiness-detail .area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  width: 87%;
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
