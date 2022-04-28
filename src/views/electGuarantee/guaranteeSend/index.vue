<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-check"
              @click="clickAutograph"
            >签名</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-document"
              @click="generateGuarantee"
            >生成电子保函</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-circle-close"
              @click="cancleCredit"
            >增信撤销</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-delete" @click="del">废弃</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="edit">修改</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="editCustomerTags"
            >修改客户标签</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-promotion"
              @click="sendMessage"
            >发送短信</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-document"
              @click="clickUpdateHistory"
            >查看修改日志</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-download"
              @click="downTemplate"
            >下载履约采购流程数据模板</el-button>
          </el-col>
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-upload2"
              @click="uploadBusinessData"
            >上传业务数据文件</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" width="170" label="保函编号" prop="bhNo"></el-table-column>
        <el-table-column align="center" width="150" label="客户编号" prop="khbh"></el-table-column>
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="供应商名称"
          prop="gysmc"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          show-overflow-tooltip
          label="是否违约"
          prop="isContract"
        >
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.yes_no || [],scope.row.isContract) }}</template>
        </el-table-column>
        <el-table-column align="center" width="150" label="是否警示" prop="isWarning">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.yes_no || [],scope.row.isWarning) }}</template>
        </el-table-column>
        <el-table-column align="center" width="180" label="供应商统一社会信用代码" prop="gysshdb"></el-table-column>
        <el-table-column align="center" width="120" label="客户星级" prop="khxjpd"></el-table-column>
        <el-table-column align="center" width="150" label="是否使用优惠">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.yes_no || [],scope.row.useYh) }}</template>
        </el-table-column>
        <el-table-column align="center" width="150" label="受益人名称" prop="syrmc"></el-table-column>
        <el-table-column align="center" label="保函类型" prop="bhlx"></el-table-column>
        <el-table-column align="center" width="100" label="增信额度(元)" prop="zxed"></el-table-column>
        <el-table-column align="center" width="100" label="实际费率(%)" prop="sjfl"></el-table-column>
        <el-table-column align="center" width="100" label="优惠费率(%)" prop="yhfl"></el-table-column>
        <el-table-column align="center" width="120" label="金额校验" prop="jejy">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.amount_check || [], scope.row.jejy) }}</template>
        </el-table-column>
        <el-table-column align="center" width="150" label="卖场注册手机号" prop="mczcsjh"></el-table-column>
        <el-table-column align="center" width="150" label="办理日期" prop="blrq"></el-table-column>
        <el-table-column align="center" width="150" label="增信生效日期" prop="zxsxrq"></el-table-column>
        <el-table-column align="center" width="150" label="增信失效日期" prop="zxgqrq"></el-table-column>
        <el-table-column align="center" width="100" label="收费金额(元)" prop="sfje"></el-table-column>
        <el-table-column align="center" width="170" show-overflow-tooltip label="合作方" prop="hzf"></el-table-column>
        <el-table-column align="center" label="分支机构" prop="fzOrg"></el-table-column>
        <el-table-column
          align="center"
          label="签名信息"
          width="150"
          show-overflow-tooltip
          prop="signInfo"
        />
        <el-table-column align="center" label="增信状态" prop="sendStatus">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.addCredit_status || [],scope.row.sendStatus) }}</template>
        </el-table-column>
        <el-table-column align="center" label="增信类型" prop>
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.addCredit_type || [],scope.row.zxType) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="响应结果"
          prop="responsInfo"
        ></el-table-column>
      </template>
    </query-table>
    <el-dialog :visible.sync="uploadDialogShow" title="上传业务数据">
      <!-- <file-upload :value='fileValue' upload-url='/loan/uploadFiles/multifileUpload'></file-upload> -->
      <el-upload
        :action="baseUrl + '/ctzdzbh/lycginfo/uploadBusFile/filePath'"
        :headers="headers"
        name="file"
        :limit="1"
        :file-list="fileList"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-exceed="fileExceed"
      >
        <el-button size="small" type="primary" icon="el-icon-upload2">上传附件</el-button>
      </el-upload>
    </el-dialog>
    <!-- 文件上传失败弹出框 -->
    <el-dialog title="文件如下内容存在重复,请修改后重新上传!" :visible.sync="unploadFailVisible">
      <el-table :data="failDataList">
        <el-table-column align="center" property="name" label="客户编号"></el-table-column>
        <el-table-column align="center" property="value" label="重复条数"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="updateDialogShow" width="80%" append-to-body title="修改">
      <simple-form
        :form-list="updataFormList"
        :form-data="updataFormData"
        :form-style="updateFormStyle"
      >
        <template slot="operate">
          <el-row type="flex" justify="center">
            <el-button type="success" size="small" @click="updateSave">保存</el-button>
            <el-button type="primary" size="small">重置</el-button>
          </el-row>
        </template>
      </simple-form>
    </el-dialog>
    <!-- 修改标签 -->
    <el-dialog :visible.sync="tagsShow" width="50%" append-to-body title="修改标签">
      <el-form label-width="100px" inline>
        <el-form-item label="是否违约">
          <el-select v-model="tagsData.isContract">
            <el-option
              v-for="item in $store.getters.dictData.yes_no || []"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否警示">
          <el-select v-model="tagsData.isWarning">
            <el-option
              v-for="item in $store.getters.dictData.yes_no || []"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button icon="el-icon-circle-close" size="mini" @click="tagsShow=false">取消</el-button>
        <el-button type="primary" icon="el-icon-check" size="mini" @click="saveTags">保存</el-button>
      </el-row>
    </el-dialog>
    <!-- 查看修改日志 -->
    <el-dialog :visible.sync="updateHistoryShow" width="80%" append-to-body title="修改">
      <query-table
        :query-params="updateHistoryQueryParams"
        :form-data="[]"
        :get-data="getUpdateHistory"
      >
        <template slot="table">
          <el-table-column align="center" show-overflow-tooltip label="原修改内容" prop="oldContent"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="修改后内容" prop="updContent"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="修改原因" prop="updReson"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="操作人" prop="operateUser"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="操作人IP地址" prop="ip"></el-table-column>
        </template>
      </query-table>
    </el-dialog>
    <!-- 签名弹出框 -->
    <el-dialog :visible.sync="autographShow" width="50%" append-to-body title="签名">
      <el-form label-width="80px">
        <el-form-item label="原明文">
          <el-input v-model="autographData.yuanWen" type="textarea" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="验签结果">
          <el-input v-model="autographData.miWen" type="textarea" rows="4"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="primary" icon="el-icon-s-check" size="mini" @click="handleAutograph ">签名</el-button>
        <el-button icon="el-icon-check" size="mini" @click="saveAutograph">保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { guaranteeSendApi } from '@/api/electGuarantee'
import { getToken } from '@/utils/auth'
import SimpleForm from '@/components/SimpleForm';
import moment from 'moment';
import _JITHTTPCLIENT from './JITHTTPCLIENT'
const Base64 = require('js-base64').Base64
export default {
  name: 'GuaranteeSend',

  components: { QueryTable, SimpleForm },

  directives: {},

  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bhNo: undefined,
        khbh: undefined,
        khxjpd: undefined,
        useYh: undefined,
        gysmc: undefined,
        mczcsjh: undefined,
        sendStatus: undefined,
        zxType: undefined,
        fzOrg: undefined,
        blrq: moment(new Date()).format('YYYY-MM-DD')
      },
      selectRows: [],
      getData: guaranteeSendApi.getPageList,
      uploadDialogShow: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [],
      fileValue: [],
      unploadFailVisible: false,
      failDataList: [],
      updateDialogShow: false,
      updataFormList: [
        { label: '供应商名称', span: 8, model: 'gysmc' },
        { label: '卖场注册手机号', span: 8, model: 'mczcsjh' },
        { label: '增信额度', span: 8, model: 'zxed' },
        { label: '收费金额', span: 8, model: 'sfje' },
        { label: '增信生效日期', span: 8, type: 'date', model: 'zxsxrq' },
        { label: '增信失效日期', span: 8, type: 'date', model: 'zxgqrq' },
        { label: '增信办理日期', span: 8, type: 'date', model: 'blrq' },
        {
          label: '分支机构', span: 8, type: 'select', model: 'fzOrg', dictOptions: [
            { dictLabel: '长沙', dictValue: '长沙' },
            { dictLabel: '株洲', dictValue: '株洲' },
            { dictLabel: '湘潭', dictValue: '湘潭' },
            { dictLabel: '湘西', dictValue: '湘西' },
            { dictLabel: '郴州', dictValue: '郴州' }
          ]
        },
        { label: '修改原因', span: 24, inputType: 'textarea', model: 'updReson', rows: 3 }
      ],
      // 标签弹出款
      tagsShow: false,
      tagsData: {},
      // 修改前的内容
      oldFormData: {},
      // 修改后的内容
      updataFormData: {},
      updateFormStyle: {
        'label-position': 'right',
        'label-width': '130px',
        'form-item': 'width:100%'
      },
      // 查看修改日志
      updateHistoryShow: false,
      getUpdateHistory: guaranteeSendApi.getUpdateHistory,
      updateHistoryQueryParams: {
        pageNum: 1,
        pageSize: 10
      },

      // 签名弹出框
      autographShow: false,
      oldAutograph: '',
      autographData: {
        yuanWen: '',
        miWen: ''
      }
    };
  },
  computed: {
    formData: function () {
      return [
        { label: '供应商名称', model: 'gysmc' },
        { label: '客户编号', model: 'khbh' },
        { label: '客户星级', type: 'select', model: 'khxjpd', dictOptions: this.$store.getters.dictData.supplier_level || [] },
        { label: '是否使用优惠', type: 'select', model: 'useYh', dictOptions: this.$store.getters.dictData.yes_no || [] },
        { label: '卖场注册手机号', model: 'mczcsjh' },
        { label: '保函编号', model: 'bhNo' },
        { label: '增信状态', type: 'select', model: 'sendStatus', dictOptions: this.$store.getters.dictData.addCredit_status || [] },
        { label: '增信类型', type: 'select', model: 'zxType', dictOptions: this.$store.getters.dictData.addCredit_type || [] },
        {
          label: '分支机构', type: 'select', model: 'fzOrg', dictOptions: [
            { dictLabel: '长沙', dictValue: '长沙' },
            { dictLabel: '株洲', dictValue: '株洲' },
            { dictLabel: '湘潭', dictValue: '湘潭' },
            { dictLabel: '湘西', dictValue: '湘西' },
            { dictLabel: '郴州', dictValue: '郴州' }
          ]
        },
        { label: '办理日期', type: 'date', model: 'blrq' }
      ]
    }
  },
  mounted() {

  },

  methods: {
    del() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      }
      if (!this.isTodoCreditStatus()) {
        this.$msgError('请选择增信状态为待增信的数据!')
        return
      }
      this.$confirm(`确定要废弃已选中的${this.selectRows.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        guaranteeSendApi.delete(this.getSelectRowsIdList(this.selectRows)).then(res => {
          if (res.code === 200) {
            this.selectRows = []
            this.$msgSuccess('删除成功!')
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    // 发送短信
    sendMessage() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据')
        return
      }
      this.$confirm(`确定要给 ${this.selectRows[0].mczcsjh} 发送短信?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        guaranteeSendApi.postMessage(this.selectRows[0]).then(res => {
          if (res.code === 200) {
            this.$msgSuccess('短信发送成功!')
          }
        })
      })
      // console.log('this.selectRows: ', this.selectRows);
    },
    // 修改
    edit() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据')
        return
      }
      if (!this.isTodoCreditStatus()) {
        this.$msgError('请选择增信状态为待增信的数据!')
        return
      }
      const { gysmc, mczcsjh, zxed, sfje, zxsxrq, zxgqrq, blrq, fzOrg, updReson } = { ...this.selectRows[0] }
      // 保存原数据 用于保存日志   只需要一部分
      this.oldFormData = { gysmc, mczcsjh, zxed, sfje, zxsxrq, zxgqrq, blrq, fzOrg, updReson }
      // 传给修改接口时传整条数据
      this.updataFormData = Object.assign({}, this.selectRows[0])
      this.updateDialogShow = true
    },
    // 保存修改
    updateSave() {
      guaranteeSendApi.update(this.updataFormData).then(res => {
        if (res.code === 200) {
          // 从修改的数据里面取出一部分传给日志接口
          const { gysmc, mczcsjh, zxed, sfje, zxsxrq, zxgqrq, blrq, fzOrg, updReson } = { ...this.selectRows[0] }
          const newData = { gysmc, mczcsjh, zxed, sfje, zxsxrq, zxgqrq, blrq, fzOrg, updReson }
          const logData = {
            bhId: this.selectRows[0].id,
            oldContent: JSON.stringify(this.oldFormData),
            updContent: JSON.stringify(newData),
            updReson: this.updataFormData.updReson
          }
          guaranteeSendApi.saveLog(JSON.stringify(logData)).then(res => {
            if (res.code === 200) {
              this.$msgSuccess('修改成功!')
              this.updateDialogShow = false
              this.selectRows = []
              this.$refs.queryTable.getList()
            }
          })
        }
      })
    },
    // 点击修改标签
    editCustomerTags() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据!')
        return
      }
      this.tagsShow = true
      const { isContract, isWarning, gysshdb, id } = this.selectRows[0]
      this.tagsData = { isContract, isWarning, gysshdb, id }
    },
    // 保存修改标签
    saveTags() {
      this.$confirm('确定保存客户标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        guaranteeSendApi.editTags(this.tagsData).then(res => {
          if (res.code === 200) {
            this.$msgSuccess('保存成功!')
            this.selectRows = []
            this.tagsShow = false
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    // 查看修改日志
    clickUpdateHistory() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据')
        return
      }
      this.updateHistoryShow = true
    },
    // 下载模板
    downTemplate() {
      window.open(`${this.$iframeBaseUrl}/cztbhmoban/moban.xlsx`)
    },
    getSelectRowsIdList(arr) {
      const tempList = []
      let str = ''
      arr.map(item => {
        tempList.push(item.id)
      })
      str = tempList.toString()
      return str
    },
    // 点击签名
    clickAutograph() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      } else if (this.selectRows.length > 50) {
        this.$msgError('当前选中数据条数超过50条,请重新选择!')
        return
      }
      if (!this.isTodoCreditStatus()) {
        this.$msgError('请选择增信状态为待增信的数据!')
        return
      }
      if (this.selectRows.length === 1) {
        this.autographShow = true
        guaranteeSendApi.getYuanWenBySingle(this.selectRows[0].id).then(res => {
          if (res.code === 200) {
            this.oldAutograph = res.msg
            const str = res.msg.replace('<ROOT>', '').replace('</ROOT>', '')
            this.autographData.yuanWen = Base64.encode(str)
          }
        })
      } else {
        this.$confirm(`确定对选中的${this.selectRows.length}条数据批量生成签名吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const tempArr = []
          this.selectRows.map(item => {
            tempArr.push({ id: item.id })
          })
          guaranteeSendApi.getYuanWenBymultiple(tempArr).then(res => {
            if (res.code === 200) {
              const resList = res.rows
              resList.map(item => {
                const str = item.yuanWen.replace('<ROOT>', '').replace('</ROOT>', '')
                item.signInfo = this.dealAutograph(Base64.encode(str))
                item.signYuanWen = item.yuanWen
                // 在选中的数据中找出与当前ID相匹配的那一条
                // const currentObj = this.selectRows.map(ele => ele.id === item.id)
                // currentObj.yuanWen = item.yuanWen
                // currentObj.signInfo = this.dealAutograph(Base64.encode(str))
              })
              guaranteeSendApi.saveMultipleAutograph(resList).then(res => {
                if (res.code === 200) {
                  this.$msgSuccess('保存成功!')
                  this.selectRows = []
                  this.$refs.queryTable.getList()
                }
              })
            }
          })
        })
      }
    },
    // 保存签名
    saveAutograph() {
      const tempData = {
        id: this.selectRows[0].id,
        yuanmingwen: this.oldAutograph,
        signInfo: this.autographData.miWen,
        bhNo: this.selectRows[0].bhNo
        // id:$params.id,yuanmingwen:$model.yuanmingwen2,signInfo:$model.signOver
      }
      guaranteeSendApi.saveAutograph(tempData).then(res => {
        if (res.code === 200) {
          this.$msgSuccess('保存成功!')
          this.selectRows = []
          this.$refs.queryTable.getList()
          this.autographShow = false
          this.autographData = {
            yuanWen: '',
            miWen: ''
          }
        }
      })
    },
    // 点击签名
    handleAutograph() {
      this.autographData.miWen = this.dealAutograph(this.autographData.yuanWen)
    },
    // 签名
    dealAutograph(orgVal) {
      // const _this = this
      const JITHTTPCLIENT = _JITHTTPCLIENT()
      // const orgVal = _this.autographData.yuanWen;
      const initParam = '<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>' +
        '<authinfo><liblist>' +
        '<lib type=\\"CSP\\" version=\\"1.0\\" dllname=\\"\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"R0FLRVlfU0tGLmRsbA==\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"bXRva2VuX2dtMzAwMF9KSVQuZGxs\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"SERfR01DQUlTLmRsbA==\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw=\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"SklUR01LRVlfU0pLMTQyNC5kbGw=\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"U0tGQVBJLmRsbA==\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '<lib type=\\"SKF\\" version=\\"1.1\\" dllname=\\"U0tGQVBJMjAwNzkuZGxs\\" ><algid val=\\"SHA1\\" sm2_hashalg=\\"sm3\\"/></lib>' +
        '</liblist></authinfo>';
      let ret = 1;
      let message = '';
      if (orgVal) {
        ret = JITHTTPCLIENT.RegisterParam(initParam);
        if (ret !== 0) {
          if (ret === 100) {
            alert('数据格式错误');
          } else if (ret === 500) {
            alert('业务处理中');
          } else {
            ret = JITHTTPCLIENT.GetErrorCode();
            if (ret !== 0) {
              message = JITHTTPCLIENT.GetErrorMessage(ret);
              alert('初始化失败，错误码：' + ret + ' 错误信息：' + message);
            }
          }
          return;
        }
        //
        ret = JITHTTPCLIENT.MOF_SetFlag(1);
        if (ret !== 0) {
          ret = JITHTTPCLIENT.GetErrorCode();
          if (ret !== 0) {
            message = JITHTTPCLIENT.GetErrorMessage(ret);
            alert('设置财政接口标识失败，错误码：' + ret + ' 错误信息：' + message);
          }
          return;
        }
        // 选择正式  1 不弹窗   0 弹窗
        ret = JITHTTPCLIENT.SetCertChooseType(1);
        if (ret !== 0) {
          ret = JITHTTPCLIENT.GetErrorCode();
          if (ret !== 0) {
            message = JITHTTPCLIENT.GetErrorMessage(ret);
            alert('设置证书选择类型失败，错误码：' + ret + ' 错误信息：' + message);
          }
          return;
        }
        //
        ret = JITHTTPCLIENT.SetCert('SC', '', '', '', '', '');
        if (ret !== 0) {
          ret = JITHTTPCLIENT.GetErrorCode();
          if (ret !== 0) {
            message = JITHTTPCLIENT.GetErrorMessage(ret);
            alert('设置证书过滤失败，错误码：' + ret + ' 错误信息：' + message);
          }
          return;
        }
        //
        message = JITHTTPCLIENT.MOF_DetachSignStr('', 1, orgVal, '');
        ret = JITHTTPCLIENT.GetErrorCode();
        if (ret !== 0) {
          message = JITHTTPCLIENT.GetErrorMessage(ret);
          alert('签名失败，错误码：' + ret + ' 错误信息：' + message);
        } else {
          // _this.autographData.miWen = message;
          return message
        }
        return;
      } else {
        alert('输入项为空');
      }
    },
    // 点击生成电子保函
    generateGuarantee() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      }
      // console.log('状态', this.isAddCreditStatus(this.selectRows));
      if (!this.isTodoCreditStatus()) {
        this.$msgError('请选择增信状态为待增信的数据!')
        return
      }
      this.$confirm(`确定对选中的${this.selectRows.length}条数据生成电子保函吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        guaranteeSendApi.generateGuarantee(this.selectRows).then(res => {
          if (res.code === 200) {
            this.$msgSuccess('生成成功!')
            this.selectRows = []
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    // 点击撤销增信
    cancleCredit() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据!')
        return
      }
      if (this.selectRows[0].sendStatus !== '1') {
        this.$msgError('请选择增信状态为增信成功的数据!')
        return
      }
      const { gysshdb, bhNo } = { ...this.selectRows[0] }
      guaranteeSendApi.cancleCredit(gysshdb, bhNo).then(res => {
        if (res.code === 200) {
          this.$msgSuccess('撤销成功!')
          this.selectRows = []
          this.$refs.queryTable.getList()
        }
      })
    },
    // 判断所选数据是否都为增信成功
    isAddCreditStatus(status) {
      return this.selectRows.some(item => {
        item.sendStatus !== status
      })
    },
    // 判断所选数据是否都为增信成功
    isTodoCreditStatus(status) {
      const result = this.selectRows.every(item => item.sendStatus === '0')
      return result
    },
    // 上传业务数据文件
    uploadBusinessData() {
      this.uploadDialogShow = true
    },
    // 上传成功
    uploadSuccess(res) {
      console.log(res);
      if (res.code === '200') {
        this.$msgSuccess('上传成功!')
        this.fileList = []
      } else {
        this.fileList = []
        this.$msgError(res.msg)
        if (res.list.length > 0) {
          this.failDataList = res.list
          this.unploadFailVisible = true
        }
      }
    },
    uploadError(err) {
      this.$msgError(err)
    },
    fileExceed() {
      this.$msgError('一次只上传一个文件')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>