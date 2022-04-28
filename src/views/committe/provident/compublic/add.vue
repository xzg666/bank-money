<template>
  <div class="app-container">
    <div class="register">
      <div>
        <span class="return-btn">
          <el-button type="primary" @click="returnFunc()">返回</el-button>
        </span>
      </div>
      <div style="margin-top:50px">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="业务详情" name="ywxq">
            <details-info></details-info>
          </el-tab-pane>
          <el-tab-pane label="修改登记" name="xgdj">
            <updata-add></updata-add>
          </el-tab-pane>

          <el-tab-pane label="流程记录" name="lcjl">
            <log></log>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import detailsInfo from './detailsInfo';
import updataAdd from './updataAdd';
import Log from './log';
// import { getUserName } from '@/utils/auth';
import {
  addLog,
  saveFile_api,
  getLog,
  getFile_api,
  update_info,
  register_info,
  download_info
} from '@/api/committe/index';
import { getToken } from '@/utils/auth';
export default {
  name: 'Add',
  components: {
    detailsInfo,
    updataAdd,
    Log
  },
  data() {
    return {
      fileListWaterData: [],
      activeTab: 'xgdj',
      isSelf: false,
      pickerOptions0: {
        disabledDate: time => {
          if (this.addInfoYwfk.wdsjfksj != '') {
            return (
              time.getTime() < Date.now() ||
              time.getTime() < this.addInfoYwfk.wdsjfksj
            );
          } else {
            return time.getTime() < Date.now();
          }
        }
      },
      // pickerOptions1: {
      //   disabledDate: time => {
      //     return (
      //       time.getTime() < this.addInfoYwfk.yjjqsj ||
      //       time.getTime() > Date.now()
      //     );
      //   }
      // },
      baseURL: process.env.VUE_APP_BASE_API,
      wdzgRules: {
        gjjdkzgshsj: [{ required: true, message: '请选择', trigger: 'blur' }],
        gjjdkzgshbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      ywfkRules: {
        wdsjfksj: [{ required: true, message: '请选择', trigger: 'blur' }],
        wdsjfkzb: [{ required: true, message: '请输入', trigger: 'blur' }],
        yjjqsj: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      sdjqRules: {
        jkjqsj: [{ required: true, message: '请选择', trigger: 'blur' }],
        jkjqzh: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      sdjyRules: {
        jkjysj: [{ required: true, message: '请选择', trigger: 'blur' }],
        jkjybz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      gjjRules: {
        gjjrysj: [{ required: true, message: '请选择', trigger: 'blur' }],
        gjjrybz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      fksjRules: {
        gjjfksj: [{ required: true, message: '请选择', trigger: 'blur' }],
        gjjfkbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      hkqrRules: {
        hksj: [{ required: true, message: '请选择', trigger: 'blur' }],
        hkbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      fileListWdywtName: '',
      fileListWdywData: {},
      fileListSdjqName: '',
      fileListSdjqData: {},
      fileListSdjyName: '',
      fileListSdjyData: {},
      fileListGjjRyName: '',
      fileListGjjRyData: {},
      fileListRes: {},
      ywztStatu: '',
      fileListLoan: {},
      fileListJkdj: {},
      fileListJkdjData: {},
      fileListJkjyData: {},
      fileListGjjData: {},
      addInfo: {},
      addInfoWdzg: {},
      addInfoYwfk: {},
      addInfoSdjq: {},
      addInfoSdjy: {},
      addInfoGjj: {},
      addInfoFksj: {},
      addInfoHkqr: {},
      detailData: {},
      isBlockBasic: true,
      addFormData: {},
      addFile: {},
      //   id: this.$route.query.id,
      fileListWaterName: '',
      fileListIndentName: '',
      fileListServiceName: '',
      fileListApplyName: '',
      fileListProvidentName: '',

      // 身份证正面
      imageUrlFront: '',
      imageUrlFrontData: {
        fileName: '',
        filePath: '',
        filePostfix: '',
        fileSize: '',
        fileMimetype: '身份证正面',
        gid: ''
      },
      // 身份证反面
      imageUrlRevese: '',
      imageUrlReveseData: {
        fileName: '',
        filePath: '',
        filePostfix: '',
        fileSize: '',
        fileMimetype: '身份证反面面',
        gid: ''
      },
      // 公积金审批表
      fileListProvident: {},
      fileListProvidentData: [],
      // 客户还款流水
      fileListWater: {},
      fileListWatertData: [],
      // 委贷合同
      fileLisIndent: {},
      fileListIndentData: [],
      // 服务合同
      fileLisService: {},
      fileListServiceData: [],
      // 费用支付凭证
      fileLisApply: {},
      fileListApplyData: [],
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      gjjShow: false,
      ywUser: ''
    };
  },
  computed: {
    addFormList: function(params) {
      return [
        {
          label: '受理机构',
          model: 'blywd',
          type: 'select',
          width: '150',
          dictOptions: this.$store.getters.dictData.accpt_org || []
        },
        // { label: '受理人姓名', model: 'sfzh' },
        { label: '受理日期', model: 'slsj', type: 'date' },
        { label: '借款申请人姓名', model: 'jkrxm' },
        {
          label: '借款申请人证件类型',
          model: 'jkrzjlx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.cert_type || []
        },
        { label: '借款申请人证件号码', model: 'jkrsfz', width: '200' },
        { label: '共同借款人姓名', model: 'gtjkrxm' },
        {
          label: '共同借款人证件类型',
          model: 'gtjkrzjlx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.cert_type || []
        },
        { label: '共同借款人证件号码', model: 'gtjkrsfz' },
        { label: '楼盘名称', model: 'lpmc' },
        { label: '借款合同编号', model: 'htbh' },
        { label: '房屋坐落', model: 'fwzl' },
        { label: '所在区域', model: 'szqy' },
        { label: '房屋总价', model: 'fwzj' },
        { label: '首付款', model: 'sfkje' },
        { label: '首付款比例', model: 'sfkbl' },
        { label: '建筑面积', model: 'fwjcmj' },
        {
          label: '购房次数',
          model: 'gfcs',
          type: 'select',
          dictOptions: this.$store.getters.dictData.num_house_dict || []
        },
        {
          label: '抵押类型',
          model: 'dylx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.mortgage_type_dict || []
        },
        { label: '贷款金额', model: 'dkje' },
        { label: '贷款期限', model: 'dkqx' },
        { label: '年利率', model: 'nll' },
        {
          label: '还款方式',
          model: 'hkfs',
          type: 'select',
          dictOptions: this.$store.getters.dictData.repayment_type || []
        },
        { label: '每月还款金额', model: 'myhkje' },
        { label: '其他月均负债', model: 'qtyjfz' },
        { label: '家庭月平均收入', model: 'jtpjysr' },
        { label: '负债比', model: 'fzbl' },
        { label: '委托银行', model: 'wtyh' },
        {
          label: '贷款类型',
          model: 'dklx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.loan_type || []
        }
      ];
    }
  },
  mounted() {
    this.ywztStatu = Number(this.$route.query.ywzt);
    console.log(this.ywztStatu);
    const wdywId = this.$route.query.id;
    getLog(wdywId).then(res => {
      this.detailData = res.data;
      this.ywUser = res.data.blywyzh;
      if (res.data.gjjdkzgshsj != null && res.data.gjjdkzgshsj != '') {
        this.addInfoWdzg.gjjdkzgshbz = res.data.gjjdkzgshbz;
        this.addInfoWdzg.gjjdkzgshsj = res.data.gjjdkzgshsj;
        this.gjjShow = true;
      } else {
        this.gjjShow = false;
      }
      if (res.data.wdsjfksj != null && res.data.wdsjfksj != '') {
        this.addInfoYwfk.wdsjfksj = res.data.wdsjfksj;
        this.addInfoYwfk.wdsjfkzb = res.data.wdsjfkzb;
      }
      if (res.data.jkjqsj != null && res.data.jkjqsj != '') {
        this.addInfoSdjq.jkjqsj = res.data.jkjqsj;
        this.addInfoSdjq.jkjqzh = res.data.jkjqzh;
      }
      if (res.data.jkjysj != null && res.data.jkjysj != '') {
        this.addInfoSdjy.jkjysj = res.data.jkjysj;
        this.addInfoSdjy.jkjybz = res.data.jkjybz;
      }
      if (res.data.gjjrysj != null && res.data.gjjrysj != '') {
        this.addInfoGjj.gjjrysj = res.data.gjjrysj;
        this.addInfoGjj.gjjrybz = res.data.gjjrybz;
      }
      if (res.data.gjjfksj != null && res.data.gjjfksj != '') {
        this.addInfoFksj.gjjfksj = res.data.gjjfksj;
        this.addInfoFksj.gjjfkbz = res.data.gjjfkbz;
      }
      if (res.data.hksj != null && res.data.hksj != '') {
        this.addInfoHkqr.hksj = res.data.hksj;
        this.addInfoHkqr.hkbz = res.data.hkbz;
      }
    });
    const params = {
      glid: wdywId
    };
    getFile_api(params).then(res => {
      const datas = res.rows;
      for (let i = 0; i < datas.length; i++) {
        // 身份证正面
        if (datas[i].fileMimetype != null) {
          if (datas[i].fileMimetype == '1') {
            this.imageUrlFront = datas[i].filePath;
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
          console.log(' this.fileListWaterData', this.fileListWaterData);
          console.log(' this.fileListWaterName', this.fileListWaterName);
        }
        // 委贷合同
        if (datas[i].fileMimetype != null) {
          if (datas[i].fileMimetype == '4') {
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
          if (datas[i].fileMimetype == '8') {
            this.fileListWdywtName = datas[i].fileName;
            this.fileListWdywData = {
              fileName: datas[i].fileName,
              filePath: datas[i].filePath,
              filePostfix: datas[i].filePostfix,
              fileSize: datas[i].fileSize,
              fileMimetype: '8',
              fileId: datas[i].id
            };
          }
        }

        // 商贷结清登记
        if (datas[i].fileMimetype != null) {
          if (datas[i].fileMimetype == '9') {
            this.fileListSdjqName = datas[i].fileName;
            this.fileListSdjqData = {
              fileName: datas[i].fileName,
              filePath: datas[i].filePath,
              filePostfix: datas[i].filePostfix,
              fileSize: datas[i].fileSize,
              fileMimetype: '9',
              fileId: datas[i].id
            };
          }
        }

        // 商贷解押登记
        if (datas[i].fileMimetype != null) {
          if (datas[i].fileMimetype == '10') {
            this.fileListSdjyName = datas[i].fileName;
            this.fileListSdjyData = {
              fileName: datas[i].fileName,
              filePath: datas[i].filePath,
              filePostfix: datas[i].filePostfix,
              fileSize: datas[i].fileSize,
              fileMimetype: '10',
              fileId: datas[i].id
            };
          }
        }

        // 公积金中心入押登记
        if (datas[i].fileMimetype != null) {
          if (datas[i].fileMimetype == '11') {
            this.fileListGjjRyName = datas[i].fileName;
            this.fileListGjjRyData = {
              fileName: datas[i].fileName,
              filePath: datas[i].filePath,
              filePostfix: datas[i].filePostfix,
              fileSize: datas[i].fileSize,
              fileMimetype: '11',
              fileId: datas[i].id
            };
          }
        }
      }
    });
  },
  methods: {
    isUserName() {
      const userName = this.getUserName();
      if (userName == ywUser) {
        this.isSelf = true;
      }
    },
    getUnixTime(dateStr) {
      var newstr = dateStr.replace(/-/g, '/');
      var date = new Date(newstr);
      var time_str = date.getTime().toString();
      return time_str.substr(0, 10);
    },
    // 下载附件
    downloadFunc(type, index) {
      if (type == 'sfzzm') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.imageUrlFrontData.fileId;
        location.href = url;
      }
      if (type == 'sfzfm') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.imageUrlReveseData.fileId;
        location.href = url;
      }

      if (type == 'fyzfpz') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListApplyData[index].fileId;
        location.href = url;
      }
      if (type == 'gjj') {
        const urlPath =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListProvidentData[index].fileId;
        console.log('urlPath', urlPath);
        window.open(urlPath);
        // location.href = urlPath;
      }
      if (type == 'fwht') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListServiceData[index].fileId;
        location.href = url;
      }
      if (type == 'wdht') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListIndentData[index].fileId;
        location.href = url;
      }
      if (type == 'yhhkls') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListWaterData[index].fileId;
        location.href = url;
      }
      if (type == 'wdywfk') {
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListWdywData.fileId;
        location.href = url;
        // location.href = this.fileListWdywData.filePath;
      }
      if (type == 'sdjq') {
        // location.href = this.fileListSdjqData.filePath;
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjqData.fileId;
        location.href = url;
      }
      if (type == 'sdjy') {
        // location.href = this.fileListSdjyData.filePath;
        const url =
          'https://www.hncydb.com/cydb-admin' +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjyData.fileId;
        location.href = url;
      }
    },
    returnFunc() {
      this.$router.go(-1);
    },
    onSubmit() {
      const ywzt = this.$route.query.ywzt;
      const wdywId = this.$route.query.id;
      if (ywzt == '1' || ywzt == '2') {
        this.$refs.formWdzg.validate(async valid => {
          if (valid) {
            const params = {
              gjjdkzgshsj: this.addInfoWdzg.gjjdkzgshsj,
              gjjdkzgshbz: this.addInfoWdzg.gjjdkzgshbz,
              ywId: wdywId,
              ywzt: ywzt
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
      if (ywzt == '4') {
        this.$refs.ywfkForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);

            const data1 = this.getUnixTime(this.addInfoYwfk.wdsjfksj);
            const data2 = this.getUnixTime(this.addInfoYwfk.yjjqsj);
            if (data2 < data1) {
              this.$message.success('预计清算时间不能小于实际放款时间');
            } else {
              const params = {
                wdsjfksj: this.addInfoYwfk.wdsjfksj,
                wdsjfkzb: this.addInfoYwfk.wdsjfkzb,
                yjjqsj: this.addInfoYwfk.yjjqsj,
                ywId: wdywId,
                ywzt: ywzt,
                dklx: this.detailData.dklx,
                dkje: this.detailData.dkje,
                uploadFiles: arr
              };
              const files = Object.keys(this.fileListLoanData);
              if (params.uploadFiles[0] == null || files.length == 0) {
                delete params.uploadFiles;
              }
              register_info(params).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功!');
                  this.$router.go(-1);
                }
              });
            }
          }
        });
      }
      // 借款结清登记
      if (ywzt == '5') {
        this.$refs.sdjqForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListJkdjData);
            const params = {
              jkjqsj: this.addInfoSdjq.jkjqsj,
              jkjqzh: this.addInfoSdjq.jkjqzh,
              ywId: wdywId,
              ywzt: ywzt,
              uploadFiles: arr
              // dklx: '05'
            };
            const files = Object.keys(this.fileListJkdjData);
            if (params.uploadFiles[0] == null || files.length == 0) {
              delete params.uploadFiles;
            }
            register_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.$router.go(-1);
              }
            });
          }
        });
      }
      // 借款解押登记
      if (ywzt == '6') {
        this.$refs.sdjyForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListJkjyData);
            const params = {
              jkjysj: this.addInfoSdjy.jkjysj,
              jkjybz: this.addInfoSdjy.jkjybz,
              ywId: wdywId,
              ywzt: ywzt,
              uploadFiles: arr
              // dklx: '05'
            };
            const files = Object.keys(this.fileListJkjyData);
            if (params.uploadFiles[0] == null || files.length == 0) {
              delete params.uploadFiles;
            }
            register_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.$router.go(-1);
              }
            });
          }
        });
      }
      // 公积金中心入押登记
      if (ywzt == '7') {
        this.$refs.gjjForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListGjjData);
            const params = {
              gjjrysj: this.addInfoGjj.gjjrysj,
              gjjrybz: this.addInfoGjj.gjjrybz,
              ywId: wdywId,
              ywzt: ywzt,
              uploadFiles: arr
              // dklx: '05'
            };
            const files = Object.keys(this.fileListGjjData);
            if (params.uploadFiles[0] == null || files.length == 0) {
              delete params.uploadFiles;
            }
            register_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.$router.go(-1);
              }
            });
          }
        });
      }
      // 放款时间
      if (ywzt == '8') {
        this.$refs.fksjForm.validate(async valid => {
          if (valid) {
            const params = {
              gjjfksj: this.addInfoFksj.gjjfksj,
              gjjfkbz: this.addInfoFksj.gjjfkbz,
              ywId: wdywId,
              ywzt: ywzt
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

      // 回款时间
      if (ywzt == '9') {
        this.$refs.hkqrForm.validate(async valid => {
          if (valid) {
            const params = {
              hksj: this.addInfoHkqr.hksj,
              hkbz: this.addInfoHkqr.hkbz,
              ywId: wdywId,
              ywzt: ywzt,
              dklx: this.detailData.dklx,
              dkje: this.detailData.dkje
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
    handlesuccessLoan(res, file, fileList) {
      this.fileListLoanData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '8',
        glid: this.$route.query.id
      };
    },
    handleRemoveLoan(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewLoan(file) {
      console.log(file);
    },
    handleExceedLoan(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveLoan(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 借款结清登记
    handlesuccessJkdj(res, file, fileList) {
      this.fileListJkdjData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      };
    },
    handleRemoveJkdj(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewJkdj(file) {
      console.log(file);
    },
    handleExceedJkdj(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveJkdj(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 借款解押登记
    handlesuccessJkjy(res, file, fileList) {
      this.fileListJkjyData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '10',
        glid: this.$route.query.id
      };
    },
    handleRemoveJkjy(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewJkjy(file) {
      console.log(file);
    },
    handleExceedJkjy(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveJkjy(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 公积金中心
    handlesuccessGjj(res, file, fileList) {
      this.fileListGjjData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '11',
        glid: this.$route.query.id
      };
    },
    handleRemoveGjj(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewGjj(file) {
      console.log(file);
    },
    handleExceedGjj(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveGjj(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 保存附件
    saveFile() {
      const arr = [];
      arr.push(this.imageUrlFrontData);
      arr.push(this.imageUrlReveseData);
      arr.push(this.fileListProvidentData);
      arr.push(this.fileListWatertData);
      arr.push(this.fileListIndentData);
      arr.push(this.fileListServiceData);
      arr.push(this.fileListApplyData);
      const params = {
        uploadFiles: arr
      };
      saveFile_api(params).then(res => {
        console.log('是保存附件', res);
      });
    },
    // 确认登记按钮
    addSubmit() {
      addLog(this.addFormData).then(response => {
        if (response.code === 200) {
          this.$message.success('操作成功!');
        }
      });
    },
    // 身份证反面面
    handleAvatarSuccessRevese(res, file) {
      this.imageUrlRevese = URL.createObjectURL(file.raw);
      this.imageUrlReveseData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '身份证反面面'
      };
    },
    // 身份证正面
    handleAvatarSuccessFront(res, file) {
      this.imageUrlFrontData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '身份证正面'
      };
      this.imageUrlFront = URL.createObjectURL(file.raw);
    },
    // 公积金审批表
    handlesuccessProvident(res, file, fileList) {
      this.fileListProvidentData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '公积金审批表',
        gid: ''
      };
    },
    handleRemoveProvident(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewProvident(file) {
      console.log(file);
    },
    handleExceedProvident(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveProvident(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 银行还款流水
    // 委贷合同
    handlesuccessIndent(res, file, fileList) {
      this.fileListIndentData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '委贷合同',
        gid: ''
      };
    },
    handleRemoveIndent(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewIndent(file) {
      console.log(file);
    },
    handleExceedIndent(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveIndent(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 服务合同
    handlesuccessService(res, file, fileList) {
      this.fileListServiceData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '服务合同',
        gid: ''
      };
    },
    handleRemoveService(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewService(file) {
      console.log(file);
    },
    handleExceedService(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveService(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 费用支付凭证
    handlesuccessApply(res, file, fileList) {
      this.fileListApplyData = {
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '服务合同',
        gid: ''
      };
    },
    handleRemoveApply(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewApply(file) {
      console.log(file);
    },
    handleExceedApply(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveApply(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss" scoped>
fieldset[disabled] {
  -ms-pointer-events: none;
  pointer-events: none;
}
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  margin-top: 30px;
}
.title {
  //   height: 40px;
  //   line-height: 40px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 15px;
  text-align: left;
}
.return-btn {
  height: 30px;
  line-height: 30px;
  float: right;
  position: absolute;
  top: 30px;
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
  width: 120px;
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
// .area {
//   padding: 10px;
// }
</style>
<style>
.area .el-input.is-disabled .el-input__inner,
.area .el-textarea.is-disabled .el-textarea__inner {
  color: #333 !important;
  background: #fff;
}
.area .el-textarea.is-disabled .el-textarea__inner {
}
.area .el-row {
  margin-bottom: 50px;
}
.area .el-upload-list__item-name {
  width: 120px;
}
.file-name {
  cursor: pointer;
  color: blue;
}
.return-btn {
  height: 30px;
  line-height: 30px;
  float: right;
  margin-top: -7px;
}
.register .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  font-weight: bold;
}
</style>
