<template>
  <div class="app-container">
    <div>
      <el-form
        ref="operationFile"
        :model="addFile"
        label-width="140px"
        label-position="left"
        :inline="true"
      >
        <el-row style="margin-bottom:50px">
          <el-col :span="8">
            <el-form-item label="身份证正面" :required="true">
              <el-upload
                class="avatar-uploader"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :limit="1"
                :show-file-list="true"
                :on-success="handleAvatarSuccessFront"
                :file-list="fileListFront"
                :on-remove="handleFrontRemove"
              >
                <img
                  v-if="imageUrlFront"
                  style="width:178px;height:178px"
                  :src="
                    imageUrlFront && imageUrlFrontId && imageUrlFrontBoolea
                      ? baseApiUrl +
                        '/gjjwd/info/byFilePathDownload?filePath=' +
                        imageUrlFrontPath
                      : imageUrlFront
                  "
                  class="avatar"
                />

                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p
                v-if="imageUrlFrontData.fileId"
                style="color: red;cursor: pointer;text-align:center"
                @click="delFileFunc('sfzzm')"
              >
                删除
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="身份证反面"
              style="margin-left:15px"
              :required="true"
            >
              <el-upload
                class="avatar-uploader"
                style="width:178px;height:178px"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :limit="1"
                :show-file-list="true"
                :on-success="handleAvatarSuccessRevese"
                :file-list="fileListRevese"
                :on-remove="handleFrontRevese"
              >
                <img
                  v-if="imageUrlRevese"
                  :src="
                    imageUrlRevese && imageUrlReveseId && imageUrlReveseBoolea
                      ? baseApiUrl +
                        '/gjjwd/info/byFilePathDownload?filePath=' +
                        imageUrlRevesePath
                      : imageUrlRevese
                  "
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <p
                  v-if="imageUrlReveseData.fileId"
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('sfzfm')"
                >
                  删除
                </p>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="客户银行还款流水"
              style="margin-left:15px"
              :required="true"
            >
              <el-upload
                class="upload-demo"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreviewWater"
                :on-remove="handleRemoveWater"
                :on-success="handlesuccessWater"
                :before-remove="beforeRemoveWater"
                :limit="5"
                multiple
                :on-exceed="handleExceedWater"
                :file-list="fileListWater"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div v-for="(item, index) in fileListWaterData" :key="index">
                <p class="file-tit" @click="downloadFunc('yhhkls', index)">
                  {{ item.fileName }}
                </p>
                <span
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('yhhkls', index)"
                  >删除</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="委贷合同" style="margin-left:15px">
              <el-upload
                class="upload-demo"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreviewIndent"
                :on-remove="handleRemoveIndent"
                :on-success="handlesuccessIndent"
                :before-remove="beforeRemoveIndent"
                :limit="5"
                multiple
                :on-exceed="handleExceedIndent"
                :file-list="fileListIndent"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div v-for="(item, index) in fileListIndentData" :key="index">
                <p class="file-tit" @click="downloadFunc('wdht', index)">
                  {{ item.fileName }}
                </p>
                <span
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('wdht', index)"
                  >删除</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="服务合同"
              style="margin-left:15px"
              :required="true"
            >
              <el-upload
                class="upload-demo"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreviewService"
                :on-remove="handleRemoveService"
                :on-success="handlesuccessService"
                :before-remove="beforeRemoveService"
                :limit="5"
                multiple
                :on-exceed="handleExceedService"
                :file-list="fileListService"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div v-for="(item, index) in fileListServiceData" :key="index">
                <p class="file-tit" @click="downloadFunc('fwht', index)">
                  {{ item.fileName }}
                </p>
                <span
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('fwht', index)"
                  >删除</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="费用支付凭证"
              style="margin-left:15px"
              :required="true"
            >
              <el-upload
                class="upload-demo"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreviewApply"
                :on-remove="handleRemoveApply"
                :on-success="handlesuccessApply"
                :before-remove="beforeRemoveApply"
                :limit="5"
                multiple
                :on-exceed="handleExceedApply"
                :file-list="fileListApply"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <!-- <p v-if="dialogTit == '修改'" class="file-tit">
                  {{ fileListApplyName
                  }}<span @click="delFileFunc('fyzfpz')">删除</span>
                </p> -->
              <div v-for="(item, index) in fileListApplyData" :key="index">
                <p class="file-tit" @click="downloadFunc('fyzfpz', index)">
                  {{ item.fileName }}
                </p>
                <span
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('fyzfpz', index)"
                  >删除</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="公积金审批表"
              style="margin-left:15px"
              :required="true"
            >
              <el-upload
                class="upload-demo"
                :action="uploadImgUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreviewProvident"
                :on-remove="handleRemoveProvident"
                :on-success="handlesuccessProvident"
                :before-remove="beforeRemoveProvident"
                :limit="5"
                multiple
                :on-exceed="handleExceedProvident"
                :file-list="fileListProvident"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div v-for="(item, index) in fileListProvidentData" :key="index">
                <p class="file-tit" @click="downloadFunc('gjjspb', index)">
                  {{ item.fileName }}
                </p>
                <span
                  style="color: red;cursor: pointer;"
                  @click="delFileFunc('gjj', index)"
                  >删除</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <data-form
        ref="dataForm"
        :form-list="addFormList"
        :form-data="addFormData"
        :rules-data="rulesForm"
        :is-block="isBlockBasic"
        @addSubmit="addSubmit"
        @cacleBtn="returnFunc"
        @addSubmitTj="addSubmitTj"
        @addSubmitProcess="addSubmitProcess"
      ></data-form>

      <div class="area">
        <div class="title">
          委贷资格审核
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="formWdzg"
              :model="wdzgshForm"
              label-width="150px"
              label-position="right"
              :inline="true"
            >
              <!--委贷资格审核-->
              <div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公积金审批时间：" prop="gjjdkzgshsj">
                      <el-date-picker
                        v-model="wdzgshForm.gjjdkzgshsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="wdzgshForm.gjjdkzgshbz"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import DataForm from '././DataForm';
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
  process_api,
  register_info,
  addProcess_api,
  template_api
} from '@/api/committe/index';
import { useCapital, begainProcess } from '@/api/committe/apply';
export default {
  name: 'Edit',
  components: {
    DataForm
  },
  inject: ['reload'],
  data() {
    return {
      arr2: [],
      ywztStatu: '',
      hzfBoole: false,
      wdzgshForm: {
        gjjdkzgshsj: '',
        gjjdkzgshbz: ''
      },
      id: '',
      arrUpdata: [],
      ywztArr: [],
      fileListRevese: [],
      fileListFront: [],
      jkrxmArr: [],
      ywztStatu: '',
      single: '',
      openDetails: false,
      detailData: {},
      addInfo: {},
      addInfoWdzg: {},
      addInfoYwfk: {},
      addInfoSdjq: {},
      addInfoSdjy: {},
      addInfoGjj: {},
      addInfoFksj: {},
      addInfoHkqr: {},
      rulesForm: {
        hjid: [{ required: true, message: '请选择', trigger: 'change' }],
        jqhbh: [{ required: true, message: '请输入', trigger: 'blur' }],
        jkrxm: [{ required: true, message: '请输入', trigger: 'blur' }],
        blywd: [{ required: true, message: '请选择', trigger: 'change' }],
        hzf: [{ required: true, message: '请选择', trigger: 'change' }],
        hzflx: [{ required: true, message: '请选择', trigger: 'change' }],
        slsj: [{ required: true, message: '请选择', trigger: 'change' }],
        jkrzjlx: [{ required: true, message: '请选择', trigger: 'change' }],
        jkrsfz: [{ required: true, message: '请输入', trigger: 'blur' }],
        khhjzh: [{ required: true, message: '请输入', trigger: 'blur' }],
        khskzh: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const strBin =
                '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99';
              if (!value) {
                callback(new Error('请输入'));
              } else if (strBin.indexOf(value.substring(0, 2)) === -1) {
                callback(new Error('银行卡号开头6位不符合规范'));
              } else {
                callback();
                // if (value.trim().length < 12 || value.trim().length > 19) {
                //   callback(new Error('银行卡号长度必须在12到19之间'));
                // }
              }
            }
          }
        ],
        hyzk: [{ required: true, message: '请选择', trigger: 'change' }],
        // jkrxm: [{ required: true, message: '请输入', trigger: 'blur' }],
        // gtjkrxm: [{ required: true, message: "请输入", trigger: "blur" }],
        // gtjkrzjlx: [{ required: true, message: '请选择', trigger: 'change' }],
        // gtjkrsfz: [{ required: true, message: '请输入', trigger: 'blur' }],
        // lpmc: [{ required: true, message: '请输入', trigger: 'blur' }],
        htbh: [{ required: true, message: '请输入', trigger: 'blur' }],
        fwzl: [{ required: true, message: '请输入', trigger: 'blur' }],
        // szqy: [{ required: true, message: '请输入', trigger: 'blur' }],
        fwzj: [{ required: true, message: '请输入', trigger: 'blur' }],
        // sfkje: [{ required: true, message: '请输入', trigger: 'blur' }],
        // sfkbl: [{ required: true, message: '请输入', trigger: 'blur' }],
        // fwjcmj: [{ required: true, message: '请输入', trigger: 'blur' }],
        // gfcs: [{ required: true, message: '请选择', trigger: 'change' }],
        // dylx: [{ required: true, message: '请选择', trigger: 'change' }],
        dkje: [{ required: true, message: '请输入', trigger: 'blur' }],
        // dkqx: [{ required: true, message: '请输入', trigger: 'blur' }],
        // hkfs: [{ required: true, message: '请选择', trigger: 'change' }],
        // myhkje: [{ required: true, message: '请输入', trigger: 'blur' }],
        // qtyjfz: [{ required: true, message: '请输入', trigger: 'blur' }],
        // jtpjysr: [{ required: true, message: '请输入', trigger: 'blur' }],
        // fzbl: [{ required: true, message: '请输入', trigger: 'blur' }],
        // wtyh: [{ required: true, message: '请输入', trigger: 'blur' }],
        dklx: [{ required: true, message: '请选择', trigger: 'change' }]
        // nll: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      queryOprateParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 身份证正面
      imageUrlFront: '',
      imageUrlReveseBoolea: true,
      imageUrlFrontBoolea: true,
      imageUrlFrontId: '',
      imageUrlRevesePath: '',
      imageUrlFrontPath: '',
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
      imageUrlReveseId: '',
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
      fileListWater: [],
      fileListWaterData: [],
      // 委贷合同
      fileLisIndent: [],
      fileListIndentData: [],
      // 服务合同
      fileLisService: [],
      fileListServiceData: [],
      // 费用支付凭证
      fileLisApply: [],
      fileListApplyData: [],
      openOprate: false,
      dialogTableData: [],
      ywzt: '',
      dialogTit: '新增',
      queryFormStyle: {
        'label-width': '155px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      multipleSelection: [],
      fileListWaterName: '',
      fileListIndentName: '',
      fileListServiceName: '',
      fileListApplyName: '',
      fileListProvidentName: '',
      id: '',
      ids: [],
      cardOptions: [],
      isBlockBasic: true,
      addFormData: {},
      addFile: {},
      // 身份证正面
      imageUrlFront: '',
      imageUrlFrontData: {
        fileName: '',
        filePath: '',
        filePostfix: '',
        fileSize: '',
        fileMimetype: '1'
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
      fileListWatertData: [],
      // 委贷合同
      fileListIndent: [],
      fileListIndentData: [],
      // 服务合同
      fileListService: [],
      fileListServiceData: [],
      // 费用支付凭证
      fileListApply: [],
      fileListApplyData: [],
      curMoney: '',
      baseApiUrl: process.env.VUE_APP_BASE_API,
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      selectRows: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      // multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      logList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        operateContent: null,
        operateUser: null,
        operateUserId: null,
        operateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      formDataEdit: {
        jkrzjlx: '',
        // gtjkrzjlx: '',
        // gfcs: '',
        // dylx: '',
        hkfs: '',
        dklx: ''
      },
      dklxOptions: [],
      hkfsOptions: [],
      dylxPassword: [],
      gfcsOptions: [],
      zjlxOptions: [],
      dylxOptions: [],
      sljgOptions: [],
      file1: false,
      file2: false,
      file3: false,
      file4: false,
      file5: false,
      file6: false,
      file7: false,
      hzflx: '',
      hzf: '',
      templateShow: false,
      jqhTemplateArr: []
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    },
    formData: function(params) {
      return [
        // { label: '流程标题', model: 'title' },
        { label: '借款人姓名', model: 'jkrxm' },
        {
          label: '借款人身份证号码',
          model: 'jkrsfz'
        },
        // {
        //   label: '共同借款人姓名',
        //   model: 'gtjkrxm'
        // },
        // {
        //   label: '共同借款人证件类型',
        //   model: 'gtjkrzjlx',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.cert_type || []
        // },
        // {
        //   label: '共同借款人证件号码',
        //   model: 'gtjkrsfz'
        // },
        // {
        //   label: '楼盘名称',
        //   model: 'lpmc'
        // },
        // {
        //   label: '借款合同编号',
        //   model: 'htbh'
        // },
        // {
        //   label: '房屋坐落',
        //   model: 'fwzl'
        // },
        // {
        //   label: '购房次数',
        //   model: 'gfcs',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.num_house_dict || []
        // },
        // {
        //   label: '抵押类型',
        //   model: 'dylx',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.mortgage_type_dict || []
        // },
        // {
        //   label: '还款方式',
        //   model: 'hkfs',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.repayment_type || []
        // },
        {
          label: '受理机构',
          model: 'blywd',
          type: 'select',
          dictOptions: this.$store.getters.dictData.accpt_org || []
        },
        {
          label: '资金回笼',
          model: 'warningStatus1',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_warning || []
        },
        {
          label: '入押',
          model: 'warningStatus2',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_warning || []
        },
        {
          label: '解押',
          model: 'warningStatus3',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_warning || []
        },
        {
          label: '业务状态',
          model: 'ywzt',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wdywzt || []
        }
      ];
    },
    addFormList: function(params) {
      return [
        {
          label: '受理机构',
          model: 'blywd',
          type: 'select',
          width: '150',
          show: true,
          dictOptions: this.$store.getters.dictData.accpt_org || []
        },
        // { label: '受理人姓名', model: 'sfzh' },
        { label: '受理日期', model: 'slsj', type: 'date', show: true },
        { label: '借款申请人姓名', model: 'jkrxm', show: true },
        {
          label: '借款申请人证件类型',
          model: 'jkrzjlx',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.cert_type || []
        },
        {
          label: '借款申请人证件号码',
          model: 'jkrsfz',
          width: '200',
          show: true
        },
        { label: '共同借款人姓名', model: 'gtjkrxm', show: true },
        // {
        //   label: '共同借款人证件类型',
        //   model: 'gtjkrzjlx',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.cert_type || []
        // },
        { label: '共同借款人证件号码', model: 'gtjkrsfz', show: true },
        // { label: '楼盘名称', model: 'lpmc' },
        { label: '借款合同编号', model: 'htbh', show: true },
        { label: '房屋坐落', model: 'fwzl', show: true },
        // { label: '所在区域', model: 'szqy' },
        { label: '房屋总价', model: 'fwzj', unit: '元', show: true },
        // { label: '首付款', model: 'sfkje', unit: '元' },
        // { label: '首付款比例', model: 'sfkbl', unit: '%' },
        { label: '建筑面积', model: 'fwjcmj', unit: '平方米', show: true },
        // {
        //   label: '购房次数',
        //   model: 'gfcs',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.num_house_dict || []
        // },
        // {
        //   label: '抵押类型',
        //   model: 'dylx',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.mortgage_type_dict || []
        // },
        { label: '贷款金额', model: 'dkje', unit: '元', show: true },
        { label: '委贷金额', model: 'wdje', unit: '元', show: true },
        { label: '服务费金额', model: 'wdlxsr', unit: '元', show: true },
        // { label: '贷款期限', model: 'dkqx', unit: '年' },
        // { label: '年利率', model: 'nll', unit: '%' },
        // {
        //   label: '还款方式',
        //   model: 'hkfs',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.repayment_type || []
        // },
        // { label: '每月还款金额', model: 'myhkje', unit: '元' },
        // { label: '其他月均负债', model: 'qtyjfz', unit: '元' },
        // { label: '家庭月平均收入', model: 'jtpjysr', unit: '元' },
        // { label: '负债比', model: 'fzbl', unit: '%' },
        // { label: '委托银行', model: 'wtyh' },
        {
          label: '贷款类型',
          model: 'dklx',
          type: 'select',
          show: true,
          // dictOptions: this.$store.getters.dictData.loan_type || [],
          // disabled: true,
          dictOptions: [{ dictValue: '05', dictLabel: '商转公贷款' }]
          // placeholder: '商转公贷款'
          // value:'05'
        },
        {
          label: '合作方类型',
          model: 'hzflx',
          type: 'select',
          show: true,
          dictOptions: this.hzflxOptions || []
        },
        {
          label: '合作方',
          model: 'hzf',
          type: 'select',
          show: true,
          dictOptions: this.hzfOptions || []
        },
        { label: '开户行及支行', model: 'khhjzh', show: true },
        { label: '客户收款账号', model: 'khskzh', show: true },
        {
          label: '婚姻状态',
          model: 'hyzk',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.marriage_type || []
        },
        {
          label: '函件模板',
          model: 'hjid',
          type: 'select',
          show: this.templateShow,
          dictOptions: this.jqhTemplateArr || []
        },
        {
          label: '结清函编号',
          model: 'jqhbh',
          show: this.templateShow
        }
        // { label: '公积金审批时间', model: 'gjjdkzgshsj', type: 'date' },
        // { label: '备注', model: 'gjjdkzgshbz' }
      ];
    }
  },
  watch: {
    'addFormData.hzflx': function(value, old) {
      // console.log('addFormData', addFormData)
      console.log(value);

      if (value) {
        if (value != old && old != undefined) {
          this.addFormData.hzf = '';
        }
        if (value == '1') {
          console.log('this.addFormData', this.addFormData);
          this.$store.getters.dictData.partners.map(item => {
            if (item.dictValue == '3') {
              //
              this.templateShow = false;
              item.disabled = true;
            } else {
              item.disabled = false;
            }
          });
        } else {
          if (value == '2') {
            this.templateShow = true;
            // this.addFormData.hzf = '';
            this.$store.getters.dictData.partners.map(item => {
              if (item.dictValue == '1' || item.dictValue == '2') {
                item.disabled = true;
              } else {
                item.disabled = false;
              }
            });
          }
        }
      }
    },
    'addFormData.khskzh': function(value) {
      // debugger;
      // console.log('value', value, value.length);
      this.addFormData.khskzh = value
        .replace(/\D/g, '')
        .replace(/....(?!$)/g, '$& ');
      console.log('  this.addFormData.khskzh', this.addFormData.khskzh);
      this.$set(this.addFormData, 'khskzh', this.addFormData.khskzh);
      console.log('  this.addFormData.khskzh', this.addFormData.khskzh);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getTemplate();
    this.getData();

    this.getDictDatas();
    this.getUseCapital();
  },
  methods: {
    getUseCapital() {
      useCapital(4).then(res => {
        this.curMoney = res.data.quota;
      });
    },
    // 获取函件模板
    getTemplate() {
      const params = {
        templateNo: 'wddkjqh'
      };
      template_api(params).then(res => {
        console.log(res);
        const result = res.data;
        for (let i = 0; i < result.length; i++) {
          this.jqhTemplateArr.push({
            dictValue: result[i].templateNo,
            dictLabel: result[i].templateName
          });
        }
        console.log('this.jqhTemplateArr', this.jqhTemplateArr);
      });
    },
    getDictDatas() {
      this.hzflxOptions = this.$store.getters.dictData.partner_type;
      this.hzfOptions = this.$store.getters.dictData.partners;
    },
    addSubmitProcess() {
      if (this.wdzgshForm) {
        this.$refs.dataForm.validateFormFunc(msg => {
          if (msg) {
            this.addFormData.uploadFiles = [];
            this.addFormData.uploadFiles = this.arrUpdata;

            console.log(this.addFormData);
            console.log(this.formDataEdit);
            if (
              this.wdzgshForm.gjjdkzgshsj == '' ||
              this.wdzgshForm.gjjdkzgshsj == undefined
            ) {
              this.$message.warning('请填写公积金审批时间和备注!');
            } else {
              if (this.arrUpdata.length != 0) {
                for (var j = 0; j < this.arr2.length; j++) {
                  for (var k = 0; k < this.arrUpdata.length; k++) {
                    if (
                      this.arr2[j].fileMimetype == '1' ||
                      this.arrUpdata[k].fileMimetype == '1'
                    ) {
                      this.file1 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '2' ||
                      this.arrUpdata[k].fileMimetype == '2'
                    ) {
                      this.file2 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '3' ||
                      this.arrUpdata[k].fileMimetype == '3'
                    ) {
                      this.file3 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '4' ||
                      this.arrUpdata[k].fileMimetype == '4'
                    ) {
                      this.file4 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '5' ||
                      this.arrUpdata[k].fileMimetype == '5'
                    ) {
                      this.file5 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '6' ||
                      this.arrUpdata[k].fileMimetype == '6'
                    ) {
                      this.file6 = true;
                      this.arr2[j].glid = this.id;
                    }
                    if (
                      this.arr2[j].fileMimetype == '7' ||
                      this.arrUpdata[k].fileMimetype == '7'
                    ) {
                      this.file7 = true;
                      this.arr2[j].glid = this.id;
                    }
                  }
                }
              } else {
                for (var j = 0; j < this.arr2.length; j++) {
                  if (this.arr2[j].fileMimetype == '1') {
                    this.file1 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '2') {
                    this.file2 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '3') {
                    this.file3 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '4') {
                    this.file4 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '5') {
                    this.file5 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '6') {
                    this.file6 = true;
                    this.arr2[j].glid = this.id;
                  }
                  if (this.arr2[j].fileMimetype == '7') {
                    this.file7 = true;
                    this.arr2[j].glid = this.id;
                  }
                }

                if (
                  this.file1 &&
                  this.file2 &&
                  this.file3 &&
                  this.file5 &&
                  this.file6 &&
                  this.file7
                ) {
                  this.$refs.dataForm.btnLoad = true;
                  if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.jkrzjlx)) {
                    this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
                    console.log(
                      'this.addFormData.jkrzjlx',
                      this.addFormData.jkrzjlx
                    );
                    console.log(
                      'this.formDataEdit.jkrzjlx',
                      this.formDataEdit.jkrzjlx
                    );
                  }
                  if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.hkfs)) {
                    this.addFormData.hkfs = this.formDataEdit.hkfs;
                  }
                  if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dklx)) {
                    this.addFormData.dklx = this.formDataEdit.dklx;
                  }
                  this.addFormData.ywzt = this.ywztStatu;
                  this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                  this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                  if (this.curMoney > this.addFormData.dkje) {
                    addProcess_api(this.addFormData).then(response => {
                      if (response.code === 200) {
                        this.$message.success('发起成功!');
                        this.$refs.dataForm.btnLoad = false;
                        //   this.open = false;
                        //   this.$refs.queryTable.getList();
                        this.returnFunc();
                        this.fileListWater = [];
                        this.fileListIndent = [];
                        this.fileListService = [];
                        this.fileListApply = [];
                        this.fileListProvident = [];
                        this.file1 = false;
                        this.file2 = false;
                        this.file3 = false;
                        this.file4 = false;
                        this.file5 = false;
                        this.file6 = false;
                        this.file7 = false;
                      }
                    });
                  } else {
                    this.$message.warning(
                      '当前资金池余额为:' + this.curMoney + '!,不能发起审核!'
                    );
                    this.$refs.dataForm.btnLoad = false;
                  }
                } else {
                  this.$message.warning('请上传附件!');
                  this.$refs.dataForm.btnLoad = false;
                }
              }
            }
          }
        });
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.arr2 = [];
      this.arrUpdata = [];
      console.log('附件的总数:', this.arr2);

      const wdywId = this.$route.query.id;

      this.open = true;
      this.fileListWaterData = [];
      this.fileListIndentData = [];
      this.fileListServiceData = [];
      this.fileListApplyData = [];
      this.fileListProvidentData = [];
      this.fileListWater = [];
      this.fileListIndent = [];
      this.fileListService = [];
      this.fileListApply = [];
      this.fileListProvident = [];
      this.fileListFront = [];
      this.fileListRevese = [];
      getLog(wdywId).then(res => {
        this.addFormData = res.data;
        this.addFormList = res.data;
        // let chineseData=
        this.formDataEdit.jkrzjlx = this.addFormData.jkrzjlx;
        this.addFormData.jkrzjlx = this.$selectDictLabel(
          this.$store.getters.dictData.cert_type || [],
          res.data.jkrzjlx
        );

        // this.formDataEdit.gtjkrzjlx = this.addFormData.gtjkrzjlx;

        // this.addFormData.gtjkrzjlx = this.$selectDictLabel(
        //   this.$store.getters.dictData.cert_type || [],
        //   res.data.gtjkrzjlx
        // );

        // this.formDataEdit.gfcs = this.addFormData.gfcs;
        // console.log(this.formDataEdit.gfcs);

        // this.addFormData.gfcs = this.$selectDictLabel(
        //   this.$store.getters.dictData.num_house_dict || [],
        //   res.data.gfcs
        // );

        // this.formDataEdit.dylx = this.addFormData.dylx;

        // this.addFormData.dylx = this.$selectDictLabel(
        //   this.$store.getters.dictData.mortgage_type_dict || [],
        //   res.data.dylx
        // );

        this.formDataEdit.hkfs = this.addFormData.hkfs;
        console.log(this.formDataEdit.hkfs);

        this.addFormData.hkfs = this.$selectDictLabel(
          this.$store.getters.dictData.repayment_type || [],
          res.data.hkfs
        );

        this.formDataEdit.dklx = this.addFormData.dklx;

        this.addFormData.dklx = this.$selectDictLabel(
          this.$store.getters.dictData.loan_type || [],
          res.data.dklx
        );

        // this.formDataEdit.hjid = this.addFormData.hjid;

        // this.addFormData.hjid = this.jqhTemplateArr;
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
              this.imageUrlFrontId = datas[i].id;
              this.imageUrlFrontData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '1',
                glid: wdywId,
                fileId: datas[i].id
              };
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '1',
                glid: wdywId,
                fileId: datas[i].id
              });
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
                glid: wdywId,
                fileId: datas[i].id
              };
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '2',
                glid: wdywId,
                fileId: datas[i].id
              });
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '3',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
            console.log('修改流水', this.fileListWaterData);
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '4',
                glid: wdywId,
                fileId: datas[i].id
              });
              // this.fileListIndentData = {
              //   fileName: datas[i].fileName,
              //   filePath: datas[i].filePath,
              //   filePostfix: datas[i].filePostfix,
              //   fileSize: datas[i].fileSize,
              //   fileMimetype: '4',
              //   glid: wdywId
              // };
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '5',
                glid: wdywId,
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '6',
                glid: wdywId,
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '7',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
          }
        }
        // if(res.)
      });
    },
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
          this.fileListWdywData.fileId;
        location.href = url;
        // location.href = this.fileListWdywData.filePath;
      }
      if (type == 'sdjq') {
        // location.href = this.fileListSdjqData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjqData.fileId;
        location.href = url;
      }
      if (type == 'sdjy') {
        // location.href = this.fileListSdjyData.filePath;
        const url =
          process.env.VUE_APP_BASE_API +
          '/gjjwd/info/download?' +
          'fileId=' +
          this.fileListSdjyData.fileId;
        location.href = url;
      }
    },
    delFileFunc(type, index) {
      if (type == 'sfzzm') {
        var fileId = this.imageUrlFrontData.fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            this.imageUrlFrontBoolea = false;
            // this.imageUrlRevese=''
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }
            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.imageUrlFrontData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'sfzfm') {
        var fileId = this.imageUrlReveseData.fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            this.imageUrlReveseBoolea = false;
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }
            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.imageUrlReveseData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'yhhkls') {
        var fileId = this.fileListWaterData[index].fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            console.log('this.arr2', this.arr2);
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }

            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'wdht') {
        var fileId = this.fileListIndentData[index].fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }

            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'fwht') {
        var fileId = this.fileListServiceData[index].fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }

            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'fyzfpz') {
        var fileId = this.fileListApplyData[index].fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }

            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.handleUpdate();
          });
        });
      }
      if (type == 'gjj') {
        var fileId = this.fileListProvidentData[index].fileId;
        delFileInfo2_api(fileId).then(res => {
          delFileInfo_api(fileId).then(res => {
            this.$message.success('删除成功!');
            for (let i = 0; i < this.arr2.length; i++) {
              if (this.arr2[i].fileId == fileId) {
                this.arr2.splice(i, 1);
              }
            }

            this.fileListWaterData = [];
            this.fileListIndentData = [];
            this.fileListServiceData = [];
            this.fileListApplyData = [];
            this.fileListProvidentData = [];
            this.handleUpdate();
          });
        });
      }
      // const fileId = this.fileListWaterData[index].fileId;
      // delFileInfo2_api(fileId).then(res => {
      //   if (type == 'yhhkls') {
      //     const params = {
      //       id: this.fileListWaterData[index].fileId
      //     };
      //     delFileInfo_api(params).then(res => {
      //       this.$message.success('删除成功!');
      //       this.handleUpdate();
      //     });
      //   }
      //   if (type == 'wdht') {
      //     const params = {
      //       id: this.fileListIndentData[index].fileId
      //     };
      //     delFileInfo_api(params).then(res => {
      //       this.$message.success('删除成功!');
      //       this.handleUpdate();
      //     });
      //   }
      // });
      //  if (type == 'yhhkls') {
      //   const id = this.id;
      //   delFileInfo_api(id).then(res => {
      //     const params = {
      //       filePath: this.imageUrlFrontData.filePath
      //     };
      //     delFileInfo2_api(params).then(res => {
      //        this.$message.success('删除成功!');
      //     });
      //   });
    },
    returnFunc() {
      this.$router.go(-1);
    },
    addSubmitTj() {
      if (this.arrUpdata.length != 0) {
        for (var j = 0; j < this.arr2.length; j++) {
          for (var k = 0; k < this.arrUpdata.length; k++) {
            if (
              this.arr2[j].fileMimetype == '1' ||
              this.arrUpdata[k].fileMimetype == '1'
            ) {
              this.file1 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '2' ||
              this.arrUpdata[k].fileMimetype == '2'
            ) {
              this.file2 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '3' ||
              this.arrUpdata[k].fileMimetype == '3'
            ) {
              this.file3 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '4' ||
              this.arrUpdata[k].fileMimetype == '4'
            ) {
              this.file4 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '5' ||
              this.arrUpdata[k].fileMimetype == '5'
            ) {
              this.file5 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '6' ||
              this.arrUpdata[k].fileMimetype == '6'
            ) {
              this.file6 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '7' ||
              this.arrUpdata[k].fileMimetype == '7'
            ) {
              this.file7 = true;
              this.arr2[j].glid = this.id;
            }
          }
        }
      } else {
        for (var j = 0; j < this.arr2.length; j++) {
          if (this.arr2[j].fileMimetype == '1') {
            this.file1 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '2') {
            this.file2 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '3') {
            this.file3 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '4') {
            this.file4 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '5') {
            this.file5 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '6') {
            this.file6 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '7') {
            this.file7 = true;
            this.arr2[j].glid = this.id;
          }
        }
      }
      this.$refs.dataForm.validateFormFunc(msg => {
        if (msg) {
          this.addFormData.uploadFiles = [];
          this.addFormData.uploadFiles = this.arrUpdata;

          console.log(this.addFormData);
          console.log(this.formDataEdit);
          if (this.addFormData.hyzk != '0') {
            if (
              this.addFormData.gtjkrxm != '' &&
              this.addFormData.gtjkrxm != undefined &&
              this.addFormData.gtjkrsfz != '' &&
              this.addFormData.gtjkrsfz != undefined
            ) {
              if (
                this.file1 &&
                this.file2 &&
                this.file3 &&
                this.file5 &&
                this.file6 &&
                this.file7
              ) {
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.jkrzjlx)) {
                  this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
                  console.log(
                    'this.addFormData.jkrzjlx',
                    this.addFormData.jkrzjlx
                  );
                  console.log(
                    'this.formDataEdit.jkrzjlx',
                    this.formDataEdit.jkrzjlx
                  );
                }
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.hkfs)) {
                  this.addFormData.hkfs = this.formDataEdit.hkfs;
                }
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dklx)) {
                  this.addFormData.dklx = this.formDataEdit.dklx;
                }
                this.addFormData.ywzt = this.ywztStatu;
                register_info(this.addFormData).then(response => {
                  if (response.code === 200) {
                    this.$message.success('提交成功!');
                    //   this.open = false;
                    //   this.$refs.queryTable.getList();
                    this.returnFunc();
                    this.fileListWater = [];
                    this.fileListIndent = [];
                    this.fileListService = [];
                    this.fileListApply = [];
                    this.fileListProvident = [];
                    this.file1 = false;
                    this.file2 = false;
                    this.file3 = false;
                    this.file4 = false;
                    this.file5 = false;
                    this.file6 = false;
                    this.file7 = false;
                  }
                });
              } else {
                this.$message.warning('请上传附件!');
                this.$refs.dataForm.btnLoad = false;
              }
            } else {
              this.$message.warning('请填写共同借款人姓名和身份证号码!');
            }
          } else {
            if (
              this.file1 &&
              this.file2 &&
              this.file3 &&
              this.file5 &&
              this.file6 &&
              this.file7
            ) {
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.jkrzjlx)) {
                this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
                console.log(
                  'this.addFormData.jkrzjlx',
                  this.addFormData.jkrzjlx
                );
                console.log(
                  'this.formDataEdit.jkrzjlx',
                  this.formDataEdit.jkrzjlx
                );
              }
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.hkfs)) {
                this.addFormData.hkfs = this.formDataEdit.hkfs;
              }
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dklx)) {
                this.addFormData.dklx = this.formDataEdit.dklx;
              }
              this.addFormData.ywzt = this.ywztStatu;
              register_info(this.addFormData).then(response => {
                if (response.code === 200) {
                  this.$message.success('提交成功!');
                  //   this.open = false;
                  //   this.$refs.queryTable.getList();
                  this.returnFunc();
                  this.fileListWater = [];
                  this.fileListIndent = [];
                  this.fileListService = [];
                  this.fileListApply = [];
                  this.fileListProvident = [];
                  this.file1 = false;
                  this.file2 = false;
                  this.file3 = false;
                  this.file4 = false;
                  this.file5 = false;
                  this.file6 = false;
                  this.file7 = false;
                }
              });
            } else {
              this.$message.warning('请上传附件!');
              this.$refs.dataForm.btnLoad = false;
            }
          }
        } else {
          this.$message.warning('请填写完整!');
        }
      });
    },
    addSubmit() {
      if (this.arrUpdata.length != 0) {
        for (var j = 0; j < this.arr2.length; j++) {
          for (var k = 0; k < this.arrUpdata.length; k++) {
            if (
              this.arr2[j].fileMimetype == '1' ||
              this.arrUpdata[k].fileMimetype == '1'
            ) {
              this.file1 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '2' ||
              this.arrUpdata[k].fileMimetype == '2'
            ) {
              this.file2 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '3' ||
              this.arrUpdata[k].fileMimetype == '3'
            ) {
              this.file3 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '4' ||
              this.arrUpdata[k].fileMimetype == '4'
            ) {
              this.file4 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '5' ||
              this.arrUpdata[k].fileMimetype == '5'
            ) {
              this.file5 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '6' ||
              this.arrUpdata[k].fileMimetype == '6'
            ) {
              this.file6 = true;
              this.arr2[j].glid = this.id;
            }
            if (
              this.arr2[j].fileMimetype == '7' ||
              this.arrUpdata[k].fileMimetype == '7'
            ) {
              this.file7 = true;
              this.arr2[j].glid = this.id;
            }
          }
        }
      } else {
        for (var j = 0; j < this.arr2.length; j++) {
          if (this.arr2[j].fileMimetype == '1') {
            this.file1 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '2') {
            this.file2 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '3') {
            this.file3 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '4') {
            this.file4 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '5') {
            this.file5 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '6') {
            this.file6 = true;
            this.arr2[j].glid = this.id;
          }
          if (this.arr2[j].fileMimetype == '7') {
            this.file7 = true;
            this.arr2[j].glid = this.id;
          }
        }
      }
      this.$refs.dataForm.validateFormFunc(msg => {
        if (msg) {
          // this.imageUrlFrontData.glid = this.id;
          // arr2.push(this.imageUrlFrontData);
          // this.imageUrlReveseData.glid = this.id;
          // arr2.push(this.imageUrlReveseData);
          // this.fileListProvidentData.glid = this.id;
          // arr2.push(this.fileListProvidentData);
          // this.fileListWatertData.glid = this.id;
          // arr2.push(this.fileListWatertData);
          // this.fileListIndentData.glid = this.id;
          // arr2.push(this.fileListIndentData);
          // this.fileListServiceData.glid = this.id;
          // arr2.push(this.fileListServiceData);
          // this.fileListApplyData.glid = this.id;
          // arr2.push(this.fileListApplyData);
          // this.addFormData.uploadFiles = this.arr2;
          this.addFormData.uploadFiles = [];
          this.addFormData.uploadFiles = this.arrUpdata;
          // for (let i = 0; i < this.arrUpdata.length; i++) {
          //   console.log(this.arr2);
          //   if (this.arr2[i].glid != '') {
          //     if (
          //       this.fileListWaterData[i].fileId != this.arr2[i].fileId &&
          //       this.fileListIndentData[i].fileId != this.arr2[i].fileId &&
          //       this.fileListServiceData[i].fileId != this.arr2[i].fileId &&
          //       this.fileListApplyData[i].fileId != this.arr2[i].fileId &&
          //       this.fileListProvidentData[i].fileId != this.arr2[i].fileId
          //     ) {
          //       this.addFormData.uploadFiles.push(this.arr2[i]);
          //     }
          //   }
          // }

          console.log(this.addFormData);
          console.log(this.formDataEdit);
          //        arr.push(this.imageUrlFrontData);
          // arr.push(this.imageUrlReveseData);
          // arr.push(this.fileListProvidentData);
          // arr.push(this.fileListWatertData);
          // arr.push(this.fileListIndentData);
          // arr.push(this.fileListServiceData);
          // arr.push(this.fileListApplyData);
          // if (this.imageUrlFrontData.fileSize != '') {
          //   if (params.uploadFiles[0] == null || files.length == 0) {
          //     delete params.uploadFiles;
          //   }
          // }
          // delete this.addFormData.uploadFiles;
          if (this.addFormData.hyzk != '0') {
            if (
              this.addFormData.gtjkrxm != '' &&
              this.addFormData.gtjkrxm != undefined &&
              this.addFormData.gtjkrsfz != '' &&
              this.addFormData.gtjkrsfz != undefined
            ) {
              if (
                this.file1 &&
                this.file2 &&
                this.file3 &&
                this.file5 &&
                this.file6 &&
                this.file7
              ) {
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.jkrzjlx)) {
                  this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
                  console.log(
                    'this.addFormData.jkrzjlx',
                    this.addFormData.jkrzjlx
                  );
                  console.log(
                    'this.formDataEdit.jkrzjlx',
                    this.formDataEdit.jkrzjlx
                  );
                }
                // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.gtjkrzjlx)) {
                //   this.addFormData.gtjkrzjlx = this.formDataEdit.gtjkrzjlx;
                // }
                // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.gfcs)) {
                //   this.addFormData.gfcs = this.formDataEdit.gfcs;
                // }
                // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dylx)) {
                //   this.addFormData.dylx = this.formDataEdit.dylx;
                // }
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.hkfs)) {
                  this.addFormData.hkfs = this.formDataEdit.hkfs;
                }
                if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dklx)) {
                  this.addFormData.dklx = this.formDataEdit.dklx;
                }
                this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                update_info(this.addFormData).then(response => {
                  if (response.code === 200) {
                    this.$message.success('修改成功!');
                    //   this.open = false;
                    //   this.$refs.queryTable.getList();
                    this.returnFunc();
                    this.fileListWater = [];
                    this.fileListIndent = [];
                    this.fileListService = [];
                    this.fileListApply = [];
                    this.fileListProvident = [];
                    this.file1 = false;
                    this.file2 = false;
                    this.file3 = false;
                    this.file4 = false;
                    this.file5 = false;
                    this.file6 = false;
                    this.file7 = false;
                  }
                });
              } else {
                this.$message.success('请上传附件!');
                this.$refs.dataForm.btnLoad = false;
              }
            } else {
              this.$message.warning('请填写共同借款人姓名和身份证号码!');
            }
          } else {
            if (
              this.file1 &&
              this.file2 &&
              this.file3 &&
              this.file5 &&
              this.file6 &&
              this.file7
            ) {
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.jkrzjlx)) {
                this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
                console.log(
                  'this.addFormData.jkrzjlx',
                  this.addFormData.jkrzjlx
                );
                console.log(
                  'this.formDataEdit.jkrzjlx',
                  this.formDataEdit.jkrzjlx
                );
              }
              // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.gtjkrzjlx)) {
              //   this.addFormData.gtjkrzjlx = this.formDataEdit.gtjkrzjlx;
              // }
              // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.gfcs)) {
              //   this.addFormData.gfcs = this.formDataEdit.gfcs;
              // }
              // if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dylx)) {
              //   this.addFormData.dylx = this.formDataEdit.dylx;
              // }
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.hkfs)) {
                this.addFormData.hkfs = this.formDataEdit.hkfs;
              }
              if (/^[\u4e00-\u9fa5]{1,}$/.test(this.addFormData.dklx)) {
                this.addFormData.dklx = this.formDataEdit.dklx;
              }
              this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
              this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
              update_info(this.addFormData).then(response => {
                if (response.code === 200) {
                  this.$message.success('修改成功!');
                  //   this.open = false;
                  //   this.$refs.queryTable.getList();
                  this.returnFunc();
                  this.fileListWater = [];
                  this.fileListIndent = [];
                  this.fileListService = [];
                  this.fileListApply = [];
                  this.fileListProvident = [];
                  this.file1 = false;
                  this.file2 = false;
                  this.file3 = false;
                  this.file4 = false;
                  this.file5 = false;
                  this.file6 = false;
                  this.file7 = false;
                }
              });
            } else {
              this.$message.success('请上传附件!');
              this.$refs.dataForm.btnLoad = false;
            }
          }
        } else {
          this.$message.success('请填写完整!');
        }
      });
    },
    getData() {
      this.fileListWaterData = [];
      this.fileListIndentData = [];
      this.fileListServiceData = [];
      this.fileListApplyData = [];
      this.fileListProvidentData = [];
      this.fileListWater = [];
      this.fileListIndent = [];
      this.fileListService = [];
      this.fileListApply = [];
      this.fileListProvident = [];
      this.fileListFront = [];
      this.fileListRevese = [];
      const wdywId = this.$route.query.id;
      getLog(wdywId).then(res => {
        this.addFormData = res.data;
        this.addFormList = res.data;
        this.ywztStatu = res.data.ywzt;
        this.wdzgshForm.gjjdkzgshsj = res.data.gjjdkzgshsj;
        this.wdzgshForm.gjjdkzgshbz = res.data.gjjdkzgshbz;
        //  this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
        //         this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
        // let chineseData=
        this.formDataEdit.jkrzjlx = this.addFormData.jkrzjlx;
        this.addFormData.jkrzjlx = this.$selectDictLabel(
          this.$store.getters.dictData.cert_type || [],
          res.data.jkrzjlx
        );

        // this.formDataEdit.gtjkrzjlx = this.addFormData.gtjkrzjlx;

        // this.addFormData.gtjkrzjlx = this.$selectDictLabel(
        //   this.$store.getters.dictData.cert_type || [],
        //   res.data.gtjkrzjlx
        // );

        // this.formDataEdit.gfcs = this.addFormData.gfcs;
        // console.log(this.formDataEdit.gfcs);

        // this.addFormData.gfcs = this.$selectDictLabel(
        //   this.$store.getters.dictData.num_house_dict || [],
        //   res.data.gfcs
        // );

        // this.formDataEdit.dylx = this.addFormData.dylx;

        // this.addFormData.dylx = this.$selectDictLabel(
        //   this.$store.getters.dictData.mortgage_type_dict || [],
        //   res.data.dylx
        // );

        this.formDataEdit.hkfs = this.addFormData.hkfs;
        console.log(this.formDataEdit.hkfs);

        this.addFormData.hkfs = this.$selectDictLabel(
          this.$store.getters.dictData.repayment_type || [],
          res.data.hkfs
        );

        this.formDataEdit.dklx = this.addFormData.dklx;

        this.addFormData.dklx = this.$selectDictLabel(
          this.$store.getters.dictData.loan_type || [],
          res.data.dklx
        );
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
              this.imageUrlFrontId = datas[i].id;
              this.imageUrlFrontPath = datas[i].filePath;
              this.imageUrlFrontData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '1',
                glid: wdywId,
                fileId: datas[i].id
              };
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '1',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
          }
          // 身份证反面
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '2') {
              this.imageUrlRevese = datas[i].filePath;
              this.imageUrlReveseId = datas[i].id;
              this.imageUrlRevesePath = datas[i].filePath;
              this.imageUrlReveseData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '2',
                glid: wdywId,
                fileId: datas[i].id
              };
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '2',
                glid: wdywId,
                fileId: datas[i].id
              });
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '3',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
            console.log('修改流水', this.fileListWaterData);
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '4',
                glid: wdywId,
                fileId: datas[i].id
              });
              // this.fileListIndentData = {
              //   fileName: datas[i].fileName,
              //   filePath: datas[i].filePath,
              //   filePostfix: datas[i].filePostfix,
              //   fileSize: datas[i].fileSize,
              //   fileMimetype: '4',
              //   glid: wdywId
              // };
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '5',
                glid: wdywId,
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '6',
                glid: wdywId,
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
                glid: wdywId,
                fileId: datas[i].id
              });
              this.arr2.push({
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '7',
                glid: wdywId,
                fileId: datas[i].id
              });
            }
          }
        }
        // if(res.)
      });
    },
    // 身份证反面面
    handleAvatarSuccessRevese(res, file) {
      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '2',
        glid: this.id
      });
      this.imageUrlRevese = URL.createObjectURL(file.raw);
      this.imageUrlRevesePath = res.data[0].filePath;
      this.imageUrlReveseBoolea = true;
      // this.reload()
      // this.imageUrlReveseData = {
      //   fileName: res.data[0].fileName,
      //   filePath: res.data[0].filePath,
      //   filePostfix: res.data[0].filePostfix,
      //   fileSize: res.data[0].fileSize,
      //   fileMimetype: '2'
      // };
    },
    handleFrontRevese(file, fileList) {
      for (let i = 0; i < this.arr2.length; i++) {
        if (this.arr2[i].fileName == file.name) {
          // delete this.arr2[i];
          this.arr2.splice(i, 1);
        }
      }
    },
    // 身份证正面
    handleAvatarSuccessFront(res, file) {
      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '1',
        glid: this.id
      });
      this.imageUrlFront = URL.createObjectURL(file.raw);
      // this.imageUrlFrontId=this.id
      this.imageUrlFrontPath = res.data[0].filePath;
      this.imageUrlFrontBoolea = true;
    },
    handleFrontRemove(file, fileList) {
      for (let i = 0; i < this.arr2.length; i++) {
        if (this.arr2[i].fileName == file.name) {
          this.arr2.splice(i, 1);
        }
      }
      console.log('zm', this.arr2);
    },
    // 公积金审批表
    handlesuccessProvident(res, file, fileList) {
      // this.fileListProvidentData = {
      //   fileName: res.data[0].fileName,
      //   filePath: res.data[0].filePath,
      //   filePostfix: res.data[0].filePostfix,
      //   fileSize: res.data[0].fileSize,
      //   fileMimetype: '7'
      // };
      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '7',
        glid: this.id
      });
    },
    handleRemoveProvident(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arr2.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.arrUpdata.length; i++) {
          if (this.arrUpdata[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arrUpdata.splice(i, 1);
          }
        }
      }
    },
    handlePreviewProvident(file) {
      console.log(file);
    },
    handleExceedProvident(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveProvident(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 银行还款流水
    handlesuccessWater(res, file, fileList) {
      if (res.code == 200) {
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '3',
          glid: this.id
        });
        // this.fileListWatertData.push({
        //   fileName: res.data[0].fileName,
        //   filePath: res.data[0].filePath,
        //   filePostfix: res.data[0].filePostfix,
        //   fileSize: res.data[0].fileSize,
        //   fileMimetype: '3'
        // });
      }
      console.log('银行还款流水', this.arr2);
    },
    handleRemoveWater(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arr2.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.arrUpdata.length; i++) {
          if (this.arrUpdata[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arrUpdata.splice(i, 1);
          }
        }
      }
    },
    handlePreviewWater(file) {
      console.log(file);
    },
    handleExceedWater(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveWater(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 委贷合同
    handlesuccessIndent(res, file, fileList) {
      // this.fileListIndentData = {
      //   fileName: res.data[0].fileName,
      //   filePath: res.data[0].filePath,
      //   filePostfix: res.data[0].filePostfix,
      //   fileSize: res.data[0].fileSize,
      //   fileMimetype: '4'
      // };

      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '4',
        glid: this.id
      });
    },
    handleRemoveIndent(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arr2.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.arrUpdata.length; i++) {
          if (this.arrUpdata[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arrUpdata.splice(i, 1);
          }
        }
      }
    },
    handlePreviewIndent(file) {
      console.log(file);
    },
    handleExceedIndent(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveIndent(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 服务合同
    handlesuccessService(res, file, fileList) {
      // this.fileListServiceData = {
      //   fileName: res.data[0].fileName,
      //   filePath: res.data[0].filePath,
      //   filePostfix: res.data[0].filePostfix,
      //   fileSize: res.data[0].fileSize,
      //   fileMimetype: '5'
      // };

      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '5',
        glid: this.id
      });
    },
    handleRemoveService(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arr2.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.arrUpdata.length; i++) {
          if (this.arrUpdata[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arrUpdata.splice(i, 1);
          }
        }
      }
    },
    handlePreviewService(file) {
      console.log(file);
    },
    handleExceedService(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveService(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 费用支付凭证
    handlesuccessApply(res, file, fileList) {
      // this.fileListApplyData = {
      //   fileName: res.data[0].fileName,
      //   filePath: res.data[0].filePath,
      //   filePostfix: res.data[0].filePostfix,
      //   fileSize: res.data[0].fileSize,
      //   fileMimetype: '6'
      // };
      this.arrUpdata.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '6',
        glid: this.id
      });
    },
    handleRemoveApply(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arr2.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.arrUpdata.length; i++) {
          if (this.arrUpdata[i].fileName == file.name) {
            // delete this.arr2[i];
            this.arrUpdata.splice(i, 1);
          }
        }
      }
    },
    handlePreviewApply(file) {
      console.log(file);
    },
    handleExceedApply(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
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
</style>
<style>
.file-tit {
  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  margin-top: 0;
  cursor: pointer;
}
</style>
