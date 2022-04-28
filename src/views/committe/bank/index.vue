<!-- 银行业务回款页面 -->
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      :inline="false"
      pagination
      @row-dblclick="clickRow"
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <el-button
          v-hasPermi="['gjjWdbusi:wdBankInfo:upload']"
          size="mini"
          plain
          type="primary"
          @click="uploadFilesFunc"
          >上传还款明细单</el-button>
        <el-button
size="mini"
plain
type="primary"
@click="handleRecord"
>业务详情</el-button>
        <!-- <el-button
size="mini"
plain
type="primary"
@click="handleProcess"
>发起审核</el-button> -->
        <!-- <el-button
          v-if="isShBtn"
          v-hasPermi="['gjjwd:info:cwbjl']"
          size="mini"
          plain
          type="primary"
          @click="registerFunc"
          >登记</el-button> -->
        <el-button
          v-hasPermi="['gjjwd:info:cwbjl']"
          size="mini"
          plain
          type="primary"
          @click="registerFunc"
          >登记</el-button>
        <!-- <el-button
size="mini"
plain
type="primary"
@click="handleABatch"
>批量登记</el-button> -->
        <el-button
          v-hasPermi="['loan:templateDefInfoMana:downMb']"
          size="mini"
          plain
          type="primary"
          @click="downloadTemplate"
          >下载模板</el-button>
      </template>
      <template slot="table">
        <el-table-column
          label="业务状态"
          width="120"
          align="center"
          prop="ztzt"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.all_status || [],
                scope.row.ztzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="节点状态" prop="ywzt" width="150">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_fk_node_satus || [],
                scope.row.ywzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="jkrxm" />
        <el-table-column label="贷款金额(元)" prop="dkje" width="180" />
        <el-table-column label="身份证号码" prop="jkrsfz" width="180" />
        <el-table-column
          label="受理机构"
          width="120"
          align="center"
          prop="blywd"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.accpt_org || [],
                scope.row.blywd
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="卡号" prop="kh" width="180" />
        <el-table-column label="电话" prop="dh" width="150" />
        <el-table-column label="放款日期" prop="fkrq" width="120" />
        <el-table-column label="手续费(元)" prop="sxf" width="120" />
        <el-table-column label="借据号" prop="jjh" width="150" />
        <el-table-column label="还款日期" prop="hkrq" width="120" />
        <el-table-column label="还款本金(元)" prop="hkbj" width="120" />
        <el-table-column label="还本利息(元)" prop="hklx" width="120" />
        <el-table-column label="本息合计(元)" prop="bxhj" width="120" />

        <el-table-column label="3天预警" prop="warningStatus6">
          <template slot-scope="scope">
            <!-- {{
              $selectDictLabel(
                $store.getters.dictData.funds_type || [],
                scope.row.warningStatus11
              )
            }}-->
            <span v-if="scope.row.warningStatus6 == '1'">预警</span>
          </template>
        </el-table-column>
        <el-table-column label="当前预警天数" prop="dqsc" width="180" />
        <el-table-column
          label="银行回款至长银日期"
          prop="yhhkzcysj"
          width="180"
        />

        <!-- <el-table-column label="操作" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="clickLedger(scope.row.id)">
              查看台账
            </el-button>
          </template>
        </el-table-column> -->
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!--批量登记---->
    <el-dialog
      title="批量登记"
      :visible.sync="openBatch"
      width="80%"
      :close-on-click-modal="false"
      class="addDialog"
      append-to-body
    >
      <!--长银放款登记--->
      <!-- <div class="area">
        <div class="title">
          长银放款登记
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="cyfkForm"
              :model="addInfoCyfk"
              label-width="180px"
              label-position="right"
              :inline="true"
              :rules="hkqrRules"
            >
              <div v-if="ywztStatu == '9'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="长银放款支银行时间：" prop="hksj">
                      <el-date-picker
                        v-model="addInfoHkqr.hksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：" prop="hkbz">
                      <el-input
                        v-model="addInfoFksj.gjjfkbz"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div
                  v-for="(item, index) in multipleSelection"
                  :key="index"
                  class="fileRow"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="借款合同编号：">
                        <span>{{ item.htbh }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="附件：" :required="true">
                        <el-upload
                          class="upload-demo"
                          :action="uploadImgUrl"
                          :headers="headers"
                          name="files"
                          :on-preview="handlePreviewCyfk"
                          :on-remove="
                            (file, fileList) =>
                              handleRemoveCyfk(index, file, fileList)
                          "
                          :on-success="
                            (res, file, fileList) =>
                              handlesuccessCyfk(
                                index,
                                item,
                                res,
                                file,
                                fileList
                              )
                          "
                          :before-remove="beforeRemoveCyfk"
                          :on-exceed="handleExceedCyfk"
                          :file-list="fileListCyfk"
                        >
                          <el-button
size="small"
type="primary"
>点击上传</el-button>
                        </el-upload>
                        <p
                          v-for="(item, index) in fileListCyfk"
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

      <!--银行回款登记--->
      <div class="area">
        <div class="title">
          银行回款登记
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="yhhkRef"
              :model="yhhkForm"
              label-width="180px"
              label-position="right"
              :inline="true"
              :rules="yhhkRules"
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
                    <el-form-item label="备注：">
                      <el-input
                        v-model="yhhkForm.yhhkzcybz"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div
                  v-for="(item, index) in multipleSelection"
                  :key="index"
                  class="fileRow"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="借据号：">
                        <span>{{ item.jjh }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="附件：">
                        <el-upload
                          class="upload-demo"
                          :action="uploadFileUrl"
                          :headers="headers"
                          name="files"
                          :on-preview="handlePreviewCyfk"
                          :on-remove="
                            (file, fileList) =>
                              handleRemoveYhhk(index, file, fileList)
                          "
                          :on-success="
                            (res, file, fileList) =>
                              handlesuccessYhhk(
                                index,
                                item,
                                res,
                                file,
                                fileList
                              )
                          "
                          :before-remove="beforeRemoveYhhk"
                          :on-exceed="handleExceedYhhk"
                          :file-list="fileListYhhk"
                        >
                          <el-button
size="small"
type="primary"
>点击上传</el-button>
                        </el-upload>
                        <!-- <p>{{ fileListGjjRyName }}</p> -->
                        <!-- <p
                          v-for="(item, index) in fileListYhhk"
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
    </el-dialog>

    <!--上传附件按钮---->
    <el-dialog
      title="上传还款明细单"
      :visible.sync="openFile"
      width="30%"
      :close-on-click-modal="false"
      class="addDialog"
      append-to-body
    >
      <div>
        <el-upload
          ref="uploadFiles"
          class="upload-demo"
          :action="uploadFileUrl"
          :headers="headers"
          name="files"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileListHk"
        >
          <el-button size="small" type="primary">选择文件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFile">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { bankList, uploadFile_api, bankProcess_api } from '@/api/committe/bank';
import { getToken } from '@/utils/auth';
import { batchRegister_api, template_api } from '@/api/committe/index';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';
export default {
  name: 'Bank',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      fileListHk: [],
      fileListHkPre: [],
      openFile: false,
      uploadFileUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      isShBtn: false,
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hzflx: '1'
      },
      getData: bankList,
      id: '',
      ids: [],
      fileListArr: {},
      // 批量登记弹窗
      openBatch: false,
      addInfoWdzgTwo: {
        gjjdkzgshbz: '',
        gjjdkzgshsj: ''
      },
      addInfoCyfk: {},
      addInfoYhhk: {},
      wdzgRulesTwo: {},
      btnLoad: false,
      hkqrRules: {},
      ywztStatu: '',
      filePath: '',
      selectRows: [],
      ywzt: '',
      ywztArr: [],
      jkrxmArr: [],
      processData: [],
      // 借据号
      jjhArr: [],
      multipleSelection: [],
      // 批量登记的附件上传
      fileListLoanData: [],
      yhhkForm: {
        yhhkzcybz: '',
        yhhkzcysj: ''
      },
      yhhkRules: {
        // yhhkzcybz: [{ required: true, message: '请输入', trigger: 'blur' }],
        yhhkzcysj: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      sfzhm: '',
      templateId: '',
      isSelf: false,
      jqhTemplateArr: [],
      templateNo: [],
      yhhkzcysj: [],
      isCw: '',
      ztztArr: []
    };
  },
  computed: {
    formData: function(params) {
      return [
        { label: '姓名', model: 'jkrxm' },
        { label: '身份证号码', model: 'jkrsfz' },
        { label: '借据号', model: 'jjh' },
        { label: '贷款金额(元)', model: 'dkje' },
        {
          label: '节点状态',
          model: 'ywzt',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_fk_node_satus || []
        }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    // this.getTime();
  },

  mounted() {
    // 贷款类型：
    // this.$getDicts('wd_bank_down').then(response => {
    //   this.templateId = response.data[0].dictValue;
    // });
    // 合作方类型
    // this.$getDicts('partner_type').then(response => {
    //   this.templateId = response.data[0].dictValue;
    // });
    this.getTemplate();
    // if (this.id == '') {
    //   this.isShBtn = false;
    // }
  },
  // life cycle end
  methods: {
    // 获取函件模板
    getTemplate() {
      const params = {
        templateNo: 'yhhkxx'
      };
      template_api(params).then(res => {
        console.log(res);
        // const result = res.data;
        // for (let i = 0; i < result.length; i++) {
        this.templateNo = res.data.templateNo;
        // }
        console.log('this.jqhTemplateArr', this.jqhTemplateArr);
      });
    },
    // 下载模板
    downloadTemplate() {
      const address =
        process.env.VUE_APP_BASE_API +
        '/loan/templateDefInfoMana/downloadTemplateFileByTemplateNo?templateNo=yhhkxx';
      window.open(address);
    },
    onSubmit() {
      this.$refs.yhhkRef.validate(async valid => {
        if (valid) {
          const arr = [];
          arr.push(this.fileListLoanData);
          const batchArr = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            batchArr.push({
              ywId: this.multipleSelection[i].ywId,
              ywzt: this.multipleSelection[i].ywzt,
              uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
              yhhkzcybz: this.yhhkForm.yhhkzcybz,
              yhhkzcysj: this.yhhkForm.yhhkzcysj,
              hzflx: '1'
            });
            var params = {};
            params = batchArr;
            if (params[i].uploadFiles.length == 0) {
              delete params[i].uploadFiles;
            }
          }

          batchRegister_api(params).then(response => {
            if (response.code === 200) {
              this.$message.success('操作成功!');
              this.fileListArr = {};
              this.openBatch = false;
              this.$refs.queryTable.getList();
            }
          });
        }
      });
    },
    onSave() {},

    uploadFilesFunc() {
      this.openFile = true;
      this.fileListHk = [];
    },
    handleProcess() {
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        // this.getUseCapital();
        // console.log('this.multipleSelection', this.multipleSelection);

        // if (!this.ywztArr.some(item => item !== '13')) {
        this.btnLoad = true;
        this.$confirm(
          '确定要对借款人' + '【' + this.jkrxmArr + '】' + '发起流程审核吗',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // for (let i = 0; i < this.multipleSelection.length; i++) {
            // if (this.multipleSelection[i].dkje > this.curMoney) {
            //   this.$message.warning(
            //     '当前资金池余额为:' + this.curMoney + '!,不能发起审核!'
            //   );
            //   this.btnLoad = false;
            // } else {
            if (this.ywztArr[0] == '12') {
              this.$message.warning('放款正在审核中，不能登记!');
            } else {
              const params = {
                jjh: this.jjhArr
              };
              bankProcess_api(params).then(res => {
                this.$message.success('发起成功!');
                this.$refs.queryTable.getList();
                this.btnLoad = false;
              });
            }

            //   }
            // }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
            this.btnLoad = false;
          });
      }
      // else {
      //   this.$message.warning('长银已放款至银行状态才能发起流程!');
      //   this.btnLoad = false;
      // }
    },
    registerShFunc() {
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        // this.getUseCapital();
        // console.log('this.multipleSelection', this.multipleSelection);

        // if (!this.ywztArr.some(item => item !== '13')) {
        this.btnLoad = true;
        if (this.isAllEqual(this.ywztArr)) {
          if (this.ywztArr[0] == '12') {
            this.isShBtn = true;
            this.$confirm(
              '您选择的业务放款审核中，如是，请点击确认！',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )
              .then(() => {
                const batchArr = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                  batchArr.push({
                    ywId: this.multipleSelection[i].ywId,
                    ywzt: this.multipleSelection[i].ywzt,
                    hzflx: '1'
                  });
                }
                var params = {};
                params = batchArr;
                batchRegister_api(params).then(response => {
                  if (response.code === 200) {
                    this.$message.success('操作成功!');
                    this.fileListArr = {};
                    this.openBatch = false;
                    this.$refs.queryTable.getList();
                    this.reload();
                    // this.$router.go(-1);
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
                this.btnLoad = false;
              });
          }
        } else {
          this.$message.warning(
            '您选择的业务节点状态不一致，不能进行批量登记！'
          );
          this.btnLoad = false;
        }
        // else {
        //   this.$message.warning('长银已放款至银行状态才能发起流程!');
        //   this.btnLoad = false;
        // }
      }
    },
    registerFunc() {
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        // this.getUseCapital();
        // console.log('this.multipleSelection', this.multipleSelection);

        // if (!this.ywztArr.some(item => item !== '13')) {
        this.btnLoad = true;

        if (this.isAllEqual(this.ywztArr) && this.isAllEqual(this.ztztArr)) {
          if (this.ztztArr[0] != 'pzwc') {
            if (this.ywztArr[0] == '12') {
              this.$confirm(
                '您选择的业务放款审核中，如是，请点击确认！',
                '提示',
                {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }
              )
                .then(() => {
                  const batchArr = [];
                  for (let i = 0; i < this.multipleSelection.length; i++) {
                    batchArr.push({
                      ywId: this.multipleSelection[i].ywId,
                      ywzt: this.multipleSelection[i].ywzt,
                      hzflx: '1'
                    });
                  }
                  var params = {};
                  params = batchArr;
                  batchRegister_api(params).then(response => {
                    if (response.code === 200) {
                      this.$message.success('操作成功!');
                      this.fileListArr = {};
                      this.openBatch = false;
                      this.$refs.queryTable.getList();
                      this.reload();
                      // this.$router.go(-1);
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                  this.btnLoad = false;
                });
            }

            if (this.ywztArr[0] == '13') {
              this.$confirm(
                '您选择的业务是否已放款，如是，请点击确认！',
                '提示',
                {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }
              )
                .then(() => {
                  const batchArr = [];
                  for (let i = 0; i < this.multipleSelection.length; i++) {
                    batchArr.push({
                      ywId: this.multipleSelection[i].ywId,
                      ywzt: this.multipleSelection[i].ywzt,
                      hzflx: '1'
                    });
                  }
                  var params = {};
                  params = batchArr;
                  batchRegister_api(params).then(response => {
                    if (response.code === 200) {
                      this.$message.success('操作成功!');
                      this.fileListArr = {};
                      this.openBatch = false;
                      this.$refs.queryTable.getList();
                      this.reload();
                      // this.$router.go(-1);
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                  this.btnLoad = false;
                });
            }

            if (this.ywztArr[0] == '14') {
              this.$confirm(
                '您选择的业务是否已回款，如是，请点击确认！',
                '提示',
                {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }
              )
                .then(() => {
                  const batchArr = [];
                  for (let i = 0; i < this.multipleSelection.length; i++) {
                    batchArr.push({
                      ywId: this.multipleSelection[i].ywId,
                      ywzt: this.multipleSelection[i].ywzt,
                      hzflx: '1'
                    });
                  }
                  var params = {};
                  params = batchArr;
                  batchRegister_api(params).then(response => {
                    if (response.code === 200) {
                      this.$message.success('操作成功!');
                      this.fileListArr = {};
                      this.openBatch = false;
                      this.$refs.queryTable.getList();
                      this.reload();
                      // this.$router.go(-1);
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                  this.btnLoad = false;
                });
            }
          } else {
            this.$message({
              type: 'warning',
              message: '业务已完成'
            });
          }

          //   else {
          //     if (this.ywztArr[0] == '13') {
          //       if (this.isCw == 'cw') {
          //         this.isShBtn = false;
          //         this.$confirm(
          //           '您选择的业务是否已放款，如是，请点击确认！',
          //           '提示',
          //           {
          //             confirmButtonText: '确定',
          //             cancelButtonText: '取消',
          //             type: 'warning'
          //           }
          //         )
          //           .then(() => {
          //             const batchArr = [];
          //             for (let i = 0; i < this.multipleSelection.length; i++) {
          //               batchArr.push({
          //                 ywId: this.multipleSelection[i].ywId,
          //                 ywzt: this.multipleSelection[i].ywzt,
          //                 hzflx: '1'
          //               });
          //             }
          //             var params = {};
          //             params = batchArr;
          //             batchRegister_api(params).then(response => {
          //               if (response.code === 200) {
          //                 this.$message.success('操作成功!');
          //                 this.fileListArr = {};
          //                 this.openBatch = false;
          //                 this.$refs.queryTable.getList();
          //                 this.reload();
          //                 // this.$router.go(-1);
          //               }
          //             });
          //           })
          //           .catch(() => {
          //             this.$message({
          //               type: 'info',
          //               message: '已取消'
          //             });
          //             this.btnLoad = false;
          //           });
          //       } else {
          //         this.$message.warning('您没有权限进行登记！');
          //         this.btnLoad = false;
          //       }
          //     }
          //     if (this.ywztArr[0] == '14') {
          //       if (this.isCw == 'cw') {
          //         this.isShBtn = false;
          //         this.$confirm(
          //           '您选择的业务是否已回款，如是，请点击确认！',
          //           '提示',
          //           {
          //             confirmButtonText: '确定',
          //             cancelButtonText: '取消',
          //             type: 'warning'
          //           }
          //         )
          //           .then(() => {
          //             const batchArr = [];
          //             for (let i = 0; i < this.multipleSelection.length; i++) {
          //               batchArr.push({
          //                 ywId: this.multipleSelection[i].ywId,
          //                 ywzt: this.multipleSelection[i].ywzt,
          //                 hzflx: '1'
          //               });
          //             }
          //             var params = {};
          //             params = batchArr;
          //             batchRegister_api(params).then(response => {
          //               if (response.code === 200) {
          //                 this.$message.success('操作成功!');
          //                 this.fileListArr = {};
          //                 this.openBatch = false;
          //                 this.$refs.queryTable.getList();
          //                 this.reload();
          //                 // this.$router.go(-1);
          //               }
          //             });
          //           })
          //           .catch(() => {
          //             this.$message({
          //               type: 'info',
          //               message: '已取消'
          //             });
          //             this.btnLoad = false;
          //           });
          //       } else {
          //         this.$message.warning('您没有权限进行登记！');
          //         this.btnLoad = false;
          //       }
          //     }
          //   }
          // } else {
          //   this.$message.warning(
          //     '您选择的业务节点状态不一致，不能进行批量登记！'
          //   );
          // }

          // else {
          //   this.$message.warning('长银已放款至银行状态才能发起流程!');
          //   this.btnLoad = false;
          // }
        } else {
          this.$message.warning(
            '您选择的业务节点状态不一致，不能进行批量登记！'
          );
        }
      }
    },
    closeFile() {
      this.openFile = false;
      this.fileListHk = [];
    },
    submitUpload() {
      // this.$refs.uploadFiles.submit();
      // this.fileListHk = [];
      const params = {
        filePath: this.filePath
      };

      uploadFile_api(params).then(res => {
        console.log(res);
        let arr = [];
        const num = res.msg;
        console.log('num', num);
        arr = num.split('_');
        const params1 = arr[0];
        const params2 = arr[1];
        if (res.code == 200 && params1 == '00') {
          this.$message.success('上传成功!');
          this.$refs.queryTable.getList();
          this.openFile = false;
          this.fileListHk = [];
        } else if (res.code == 200 && params1 == '01') {
          this.openFile = false;
          this.$message.warning(params2 + '已存在，请勿重复提交');
          this.fileListHk = [];
        } else {
          this.fileListHk = [];
        }
      });
    },
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== array[0];
        });
      } else {
        return true;
      }
    },
    handleRecord() {
      if (this.id == '' || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        // if (
        //   (this.ywzt == '13' && this.multipleSelection[0].yhhkzcysj != '') ||
        //   this.multipleSelection[0].yhhkzcysj != undefined
        // ) {
        Cookies.set('cardNo', this.sfzhm);
        this.$router.push({
          path: '/committe/recycle/register',
          query: {
            id: this.id
          }
        });
        // } else {
        //   this.$message.warning('长银已放款至银行状态才能登记!');
        // }
      }
    },
    clickRow(row) {
      console.log('row', row);

      // if (
      //   this.ywzt ||
      //   (row.ywzt == '13' && row.yhhkzcysj != '') ||
      //   row.yhhkzcysj != undefined
      // ) {
      Cookies.set('cardNo', row.sfzhm);
      Cookies.set('ywblyUser', row.cjrzh);
      this.$router.push({
        path: '/committe/recycle/register',
        query: {
          id: row.ywId
        }
      });
      // } else {
      //   this.$message.warning('长银已放款至银行状态才能登记!');
      // }
    },
    // 显示批量登记弹窗
    handleABatch() {
      // this.openBatch = true;
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        if (this.isAllEqual(this.ywztArr)) {
          if (this.ywztArr[0] == '13') {
            if (this.isSelf) {
              this.multipleSelection.map((item, index) => {
                this.$set(this.fileListArr, `fileListLoanData_${index}`, []);
              });
              this.openBatch = true;
            } else {
              this.$message.warning('只有本人发起的进件才能批量登记！');
            }
          } else {
            this.$message.warning('长银已放款至银行状态才能登记!');
          }
        } else {
          this.$message.warning(
            '您选择的业务节点状态不一致，不能进行批量登记！'
          );
          this.openWd = false;
          // this.btnLoad = false;
        }
      }
    },
    // 银行回款
    handlesuccessYhhk(index, rows, res, file, fileList) {
      this.fileListArr[`fileListLoanData_${index}`].push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '15',
        glid: rows.ywId,
        uid: file.uid
      });
    },
    handleRemoveYhhk(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
    },
    handlePreviewYhhk(file) {
      console.log(file);
    },
    handleExceedYhhk(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveYhhk(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 长银放款
    handlesuccessCyfk(index, rows, res, file, fileList) {
      this.fileListArr[`fileListLoanData_${index}`].push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: rows.ywId,
        uid: file.uid
      });
    },
    handleRemoveCyfk(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
    },
    handlePreviewCyfk(file) {
      console.log(file);
    },
    handleExceedCyfk(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveCyfk(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传附件按钮
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.filePath = response.data[0].filePath;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // getTime() {
    //   const date = new Date();
    //   const y = date.getFullYear();
    //   const m = (date.getMonth() + 1).toString().padStart(2, 0);
    //   const d = date
    //     .getDate()
    //     .toString()
    //     .padStart(2, 0);
    //   const time = y + '-' + m + '-' + d;
    //   this.queryParams.startDate = time;
    //   this.queryParams.endDate = time;
    // },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.ywId);
      this.id = this.ids[0];
      this.ywztArr = val.map(item => item.ywzt);
      this.ywzt = this.ywztArr[0];
      this.ztztArr = val.map(item => item.ztzt);
      this.jkrxmArr = val.map(item => item.jkrxm);
      this.jjhArr = val.map(item => item.jjh);
      let cardArr = [];
      cardArr = val.map(item => item.sfzhm);
      this.sfzhm = cardArr[0];
      const blywyzhArr = val.map(item => item.cjrzh);
      this.blywyzh = blywyzhArr[0];
      let cwArr = [];
      cwArr = val.map(item => item.flag);
      this.isCw = cwArr[0];
      const userName = getUserName();
      if (this.isAllEqual(blywyzhArr)) {
        if (userName == blywyzhArr[0]) {
          this.isSelf = true;
        } else {
          this.isSelf = false;
        }
      } else {
        this.isSelf = false;
      }
    }
    // 判断数组中的值是否相等
  }
};
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.title {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 15px;
  text-align: left;
  margin-bottom: 20px;
}
.area .el-row {
  margin-bottom: 0px;
}
</style>
