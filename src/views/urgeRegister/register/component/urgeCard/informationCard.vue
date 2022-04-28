<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="业务信息" name="1">
        <!-- 打印的内容，默认不显示 -->
        <div v-show="printBoxShow" id="printBox">
          <el-form label-position="right" label-width="140px">
            <el-row :gutter="24">
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="客户姓名">
                  <div>{{ customBaseInfo.custName }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="性别">
                  <div>{{ $selectDictLabel($store.getters.dictData.sys_user_sex ||[], customBaseInfo.sex) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="证件类型">
                  <div>{{ $selectDictLabel($store.getters.dictData.cert_type || [],customBaseInfo.certType) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="证件号码">
                  <div style="width:100%">{{ customBaseInfo.certNo }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="单位名称">
                  <div>{{ customBaseInfo.workName }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="单位手机号">
                  <div>{{ customBaseInfo.workTel }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="实际电话"></el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款管理部">
                  <div>{{ $selectDictLabel($store.getters.dictData.dkglb || [],customLoanInfo.dkglb) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="公积金账号">
                  <div>{{ customLoanInfo.grzh }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款账号">
                  <div>{{ customLoanInfo.dkzh }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款类型">
                  <div>{{ $selectDictLabel($store.getters.dictData.loan_type || [], customLoanInfo.dklx) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款状态">
                  <div>{{ customLoanInfo.dkzt }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款金额(元)">
                  <div>{{ customLoanInfo.htdkje }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款发放日">
                  <!-- <div>{{ customLoanInfo.dkffrq }}</div> -->
                  <div>{{ customLoanInfo.dkffrq ? $parseTime(new Date(customLoanInfo.dkffrq)) : '' }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="贷款期数(期)">
                  <div>{{ customLoanInfo.dkqs }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="计划还款金额(元)">
                  <div>{{ customLoanInfo.dqjhhkje }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="是否对冲">
                  <div></div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="是否划拨">
                  <div>{{ $selectDictLabel($store.getters.dictData.yes_no || [],customLoanInfo.sfhb) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="还款方式">
                  <div>{{ $selectDictLabel($store.getters.dictData.repayment_type || [],customLoanInfo.dkhkfs) }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="还款账户">
                  <div>{{ customLoanInfo.hkzh }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="还款银行">
                  <div style="overflow:hidden">{{ customLoanInfo.hkyh }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="逾期催收">
                  <div>{{ selectRows.cslx=='1' ? '是' : '否' }}</div>
                </el-form-item>
              </el-col>
              <el-col v-if="selectRows.cslx=='1' " :span="8" type="flex" align="middld">
                <el-form-item label="优先处理方式">
                  <div>{{ proposalData.yqcsyxjyfs }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="代偿催收">
                  <div>{{ selectRows.cslx=='2' ? '是' : '否' }}</div>
                </el-form-item>
              </el-col>
              <el-col v-if="selectRows.cslx=='2'" :span="8" type="flex" align="middld">
                <el-form-item label="优先处理方式">
                  <div>{{ proposalData.dccsyxjyfs }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8" type="flex" align="middld">
                <el-form-item label="楼盘名称">
                  <div>{{ customLoanInfo.lpxmmc }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="16" type="flex" align="middld">
                <el-form-item label="购置房地址">
                  <div>{{ customLoanInfo.fwzl }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="实际地址">
                <el-input v-model="customBaseInfo.actualAddress"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="24" type="flex" align="middld">
                <el-form-item label="客户打标">
                  <el-tag
                    v-for="item in customLabelList"
                    :key="item"
                  >{{ $selectDictLabel(customTagList || [],item) }}</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-form label-position="right" label-width="120px">
          <el-row :gutter="24">
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="客户姓名">
                <div>{{ customBaseInfo.custName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="性别">
                <div>{{ $selectDictLabel($store.getters.dictData.sys_user_sex ||[], customBaseInfo.sex) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="证件类型">
                <div>{{ $selectDictLabel($store.getters.dictData.cert_type || [],customBaseInfo.certType) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="证件号码">
                <div style="width:100%">{{ customBaseInfo.certNo }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="单位名称">
                <div>{{ customBaseInfo.workName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="单位手机号">
                <div>{{ customBaseInfo.workTel }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="实际电话">
                <div>
                  {{ customBaseInfo.actualTel }}
                  <!--                  <el-button-->
                  <!--                    id="ignoreEditButton"-->
                  <!--                    type="primary"-->
                  <!--                    size="mini"-->
                  <!--                    @click="clickRalationDialog"-->
                  <!--                  >修改</el-button>-->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款管理部">
                <div>{{ $selectDictLabel($store.getters.dictData.dkglb || [],customLoanInfo.dkglb) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="公积金账号">
                <div>{{ customLoanInfo.grzh }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款账号">
                <div>{{ customLoanInfo.dkzh }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款类型">
                <div>{{ $selectDictLabel($store.getters.dictData.loan_type || [], customLoanInfo.dklx) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款状态">
                <div>{{ customLoanInfo.dkzt }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款金额(元)">
                <div>{{ customLoanInfo.htdkje }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款发放日">
                <!-- <div>{{ customLoanInfo.dkffrq }}</div> -->
                <div>{{ customLoanInfo.dkffrq ? $parseTime(new Date(customLoanInfo.dkffrq)) : '' }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="贷款期数(期)">
                <div>{{ customLoanInfo.dkqs }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="计划还款金额(元)">
                <div>{{ customLoanInfo.dqjhhkje }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="是否对冲">
                <div></div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="是否划拨">
                <div>{{ $selectDictLabel($store.getters.dictData.yes_no || [],customLoanInfo.sfhb) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="还款方式">
                <div>{{ $selectDictLabel($store.getters.dictData.repayment_type || [],customLoanInfo.dkhkfs) }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="还款账户">
                <div>{{ customLoanInfo.hkzh }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" type="flex" align="middld">
              <el-form-item label="还款银行">
                <div style="overflow:hidden">{{ customLoanInfo.hkyh }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="逾期催收">
                <div>{{ selectRows.cslx=='1' ? '是' : '否' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="selectRows.cslx=='1' " :span="6" type="flex" align="middld">
              <el-form-item label="优先处理方式">
                <div>{{ proposalData.yqcsyxjyfs }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="代偿催收">
                <div>{{ selectRows.cslx=='2' ? '是' : '否' }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
              <el-form-item label="优先处理方式">
                <div>{{ proposalData.dccsyxjyfs }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6" type="flex" align="middld">
              <el-form-item label="楼盘名称">
                <div>{{ customLoanInfo.lpxmmc }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" type="flex" align="middld">
              <el-form-item label="购置房地址">
                <div>{{ customLoanInfo.fwzl }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="实际地址">
              <!--              <el-input v-model="customBaseInfo.actualAddress"></el-input>-->
              <div>{{ customBaseInfo.actualAddress }}</div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="24" type="flex" align="middld">
              <el-form-item label="客户打标">
                <el-tag
                  v-for="item in customLabelList"
                  :key="item"
                >{{ $selectDictLabel(customTagList || [],item) }}</el-tag>
                <el-button
                  type="text"
                  size="small"
                  style="margin-left:10px"
                  @click="clickTagsDialog"
                >修改客户标签</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row id="ignoreBox" :gutter="24" type="flex" justify="center">
            <el-col :span="10">
              <!--              <el-button type="primary" icon="el-icon-edit" @click="changeActualAddress">修改客户实际地址</el-button>-->
              <el-button icon="el-icon-edit-outline" @click="clickRalationDialog">联系电话维护</el-button>
              <el-button icon="el-icon-edit-outline" @click="clickAddressDialog">地址维护</el-button>
              <el-button type="primary" icon="el-icon-edit" @click="clickPrint">打印</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 客户标签弹出框       -->
    <el-dialog :visible.sync="tagsDialog" title="修改客户标签" append-to-body width="400px">
      <el-form>
        <el-row>
          <el-form-item label="客户标签">
            <el-select v-model="selectCustomTags" multiple placeholder="请选择" style="width:280px">
              <el-option
                v-for="item in customTagList"
                :key="item.value"
                :label="item.dictLabel"
                :value="item.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="small" @click="customLabelSave">确定</el-button>
          <el-button size="small">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 联系人维护弹出框 -->
    <el-dialog :visible.sync="relationDialog" title="联系人维护" append-to-body width="80%">
      <!-- <free-form :form-list="ralationFormList" :form-data="relationFormData" /> -->
      <relationship-select
        :cert-no="selectRows.zjhm"
        :cust-id="customBaseInfo.id"
        :form-data="relationDialogData"
        @realtionSuccess="realtionSuccess"
        @realtionClose="relationDialog=false"
      ></relationship-select>
    </el-dialog>
    <!-- 地址维护弹出框 -->
    <el-dialog :visible.sync="addressDialog" title="客户地址维护" append-to-body width="80%">
      <address-select
        :form-data="addressDialogData"
        @cancelAddressSelect="addressDialog=false"
        @AddressSelectSuccess="AddressSelectSuccess"
      ></address-select>
    </el-dialog>
  </div>
</template>

<script>
// import FreeForm from '@/components/FreeForm';
import AddressSelect from '@/components/AddressSelect';
import RelationshipSelect from '@/components/RelationshipSelect';
import { registerBody } from '@/api/urge/register';
import { customInformationApi } from '@/api/customInformation';
import print from 'print-js'
export default {
  name: 'BusinessInformationCard',
  components: {
    // FreeForm,
    AddressSelect,
    RelationshipSelect
  },

  directives: {},
  props: {
    form: {
      type: Array,
      default() {
        return []
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },

  data() {
    return {
      printBoxShow: false,
      activeNames: ['1'],
      tagsDialog: false,
      relationDialog: false,
      addressDialog: false,
      selectCustomTags: [],
      customBaseInfo: {},
      customLoanInfo: {},
      // 建议处理方式数据
      proposalData: {},
      // 客户已有标签列表
      customLabelList: [],
      // 客户已有标签id
      customLabelId: '',
      addressDialogData: [
        {
          certNo: '',
          custRelationship: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          address: '',
          remark: ''
        }
      ],
      relationDialogData: [
        {
          certNo: '',
          custRelationship: '',
          tel: '',
          remark: ''
        }
      ],
      actualData: {},
      actualTel: '',
      // customTagList: [
      //   { label: '拟诉讼客户', value: 1 },
      //   { label: '失联客户', value: 2 },
      //   { label: '失信客户', value: 3 },
      //   { label: '拒还客户', value: 4 }
      // ],
      ralationFormList: [
        { label: '关系' },
        { label: '联系方式' },
        { label: '备注' }
      ],
      addressFormList: [
        { label: '名称' },
        { label: '详细地址' },
        { label: '备注' }
      ],
      relationFormData: {

      },
      addressFormData: {

      }
    };
  },
  computed: {
    customTagList: function () {
      return this.$store.getters.dictData.custom_label || []
    }
  },
  mounted() {
    // this.getActualTel()
    this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
    this.getLoanInfo(this.selectRows.id)
    this.getProposal(1)
  },

  methods: {
    // 获取客户基本信息
    getCustomBaseInfo(obj) {
      // obj.isRelated = true
      customInformationApi.getCustomInfoList(obj).then(res => {
        if (res.code === 200 && res.rows) {
          this.customBaseInfo = res.rows[0] || {}
          if (res.rows.length > 0) this.getCustomLabel(res.rows[0].id)
        }
      })
    },
    // 获取客户贷款信息
    getLoanInfo(glid) {
      registerBody.getTaksStatusByTaskId(glid).then(res => {
        if (res.code === 200 && res.data) {
          this.customLoanInfo = res.data || {}
        }
      })
    },
    // 查询客户实际电话，页面直接查询客户信息实际电话字段返回
    getActualTel() {
      registerBody.getActualTel(this.selectRows.zjhm).then(res => {
        if (res.code === 200 && res.data.length) {
          this.actualTel = res.data.find(item => item.isDefault === '1').tel
        }
      })
    },
    // 获取建议处理方式
    getProposal(id) {
      registerBody.getProposal(id).then(res => {
        if (res.code === 200) {
          this.proposalData = res.data
        }
      })
    },
    // 获取客户标签
    getCustomLabel(custId) {
      registerBody.getCustomLabel({ custId }).then(res => {
        if (res.code === 200 && res.rows.length) {
          this.customLabelId = res.rows[0].custLabelId
          this.customLabelList = res.rows[0].custLabelVal.split(',')
          this.selectCustomTags = res.rows[0].custLabelVal.split(',')
        }
      })
    },
    // 保存客户标签
    customLabelSave() {
      const labelString = this.selectCustomTags.toString()
      const data = {
        custId: this.customBaseInfo.id,
        ywlx: this.selectRows.ywlx,
        custLabelVal: labelString
      }
      if (this.customLabelList.length) {
        // 有客户标签记录 调修改接口
        data.custLabelId = this.customLabelId
        registerBody.updateCustomLabel({ ...data }).then(res => {
          if (res.code === 200) {
            this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
            this.$msgSuccess('标签修改成功')
            this.tagsDialog = false
          }
        })
      } else {
        registerBody.addCustomLabel({ ...data }).then(res => {
          if (res.code === 200) {
            this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
            this.$msgSuccess('标签修改成功')
            this.tagsDialog = false
          }
        })
      }
    },
    clickTagsDialog() {
      this.tagsDialog = true
    },
    clickRalationDialog() {
      // 初始化 维护联系电话列表
      customInformationApi.getCustonContactsInfoByCertNo(this.selectRows.zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              delete item.params
            })
            this.relationDialogData = res.data
          }
        }
      })
      this.relationDialog = true
    },
    // 打印
    clickPrint() {
      this.printBoxShow = true
      const _this = this
      const style = '@page {margin:5mm 10mm};'// 打印时去掉眉页眉尾
      // 打印为什么要去掉眉页眉尾？因为眉页title时打印当前页面的title，相当于是获取html中title标签里面的内容，但是比如我打印的内容只是一个弹框里面的内容，是没有title的，这时候就会出现undefined，为了避免出现这种情况，就可以隐藏眉页眉尾
      this.$nextTick(() => {
        print({
          printable: 'printBox', // 标签元素id
          type: 'html',
          header: '',
          targetStyles: ['*'],
          // ignoreElements: ['ignoreBox', 'ignoreEditButton'],
          maxWidth: 1200,
          onPrintDialogClose: function () {
            _this.printBoxShow = false
          },
          // ignoreBox
          style
        });
      });
      // 各个配置项
      // printable:要打印的id。
      // type:可以是 html 、pdf、 json 等。
      // properties:是打印json时所需要的数据属性。
      // gridHeaderStyle和gridStyle都是打印json时可选的样式。
      // repeatTableHeader:在打印JSON数据时使用。设置为时false，数据表标题将仅在第一页显示。
      // scanStyles:设置为false时，库将不处理应用于正在打印的html的样式。使用css参数时很有用，此时自己设置的原来想要打印的样式就会失效，在打印预览时可以看到效果
      // targetStyles: [’*’],这样设置继承了页面要打印元素原有的css属性。
      // style:传入自定义样式的字符串，使用在要打印的html页面 也就是纸上的样子。
      // ignoreElements：传入要打印的div中的子元素id，使其不打印。非常好用
    },
    // 联系人修改确认
    realtionSuccess() {
      this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
      // this.getActualTel()
      this.relationDialog = false
    },
    // 修改客户实际地址
    changeActualAddress() {
      this.$confirm('确定修改用户实际地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { actualAddress, id } = this.customBaseInfo
        registerBody.changeActualAddress({ actualAddress, id }).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
          } else {
            this.$msgError(res.msg)
          }
        })
      }).catch(() => { });
    },
    clickAddressDialog() {
      // 查询客户已有的地址数据
      customInformationApi.getAddressInfoByCertNo(this.selectRows.zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              delete item.params
            })
            this.addressDialogData = res.data
          }
        }
      })
      this.addressDialog = true
    },
    // 地址弹出框保存
    AddressSelectSuccess() {
      this.getCustomBaseInfo({ certNo: this.selectRows.zjhm })
      this.addressDialog = false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
