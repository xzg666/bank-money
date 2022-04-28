<template>
  <div class="app-container wdyw">
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
      @row-click="handleSelectCacle"
    >
      <template slot="operating">
        <div style="margin-top:20px">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            >首次进件</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            :disabled="single"
            @click="handleRecord"
            >登记办理时间</el-button>
          <!-- <el-button
                v-hasPermi="['system:info:edit']"
                type="primary"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
              >修改</el-button>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  icon="el-icon-reading"
                  :disabled="single"
                  @click="handleDetail"
                >查看详情</el-button>
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    :disabled="single"
                    icon="el-icon-document"
                    @click="handleLog"
          >操作日志</el-button>-->
          <el-button
            type="primary"
            plain
            size="mini"
            :loading="btnLoad"
            @click="handleProcess"
            >发起审核</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleApply"
            >资金申请</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleABatch"
            >批量登记</el-button>
          <el-button
type="primary"
plain
size="mini"
@click="handlePrint"
>结清函打印</el-button>
        </div>
        <!-- <el-button
          v-hasPermi="['system:info:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button>
        <el-button
          v-hasPermi="['system:info:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >导出</el-button>-->
        <!-- <el-button
          size="mini"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="goAdd"
        >删除</el-button>-->
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
        <el-table-column
          label="节点状态"
          width="200"
          align="center"
          prop="ywzt"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wdywzt || [],
                scope.row.ywzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="借款合同编号"
          width="120"
          align="center"
          prop="htbh"
        />
        <!-- <el-table-column label="流程标题" align="center" prop="title" /> -->
        <el-table-column
          label="借款人姓名"
          width="200"
          align="center"
          prop="jkrxm"
        />
        <el-table-column
          label="借款人证件号码"
          width="170"
          align="center"
          prop="jkrsfz"
        />
        <!-- <el-table-column
          label="楼盘名称"
          width="120"
          align="center"
          prop="lpmc"
        />-->

        <el-table-column
          label="贷款金额(元)"
          width="120"
          align="center"
          prop="dkje"
        />
        <el-table-column
          label="结清函编号"
          width="150"
          align="center"
          prop="jqhbh"
        />
        <el-table-column
          label="资金占用时长(天)"
          width="120"
          align="center"
          prop="zjzysc"
        />
        <!-- <el-table-column
          label="贷款期限(年)"
          width="120"
          align="center"
          prop="dkqx"
        />-->
        <el-table-column
          label="合作方类型"
          width="120"
          align="center"
          prop="hzflx"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.partner_type || [],
                scope.row.hzflx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="合作方" width="120" align="center" prop="hzflx">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.partners || [],
                scope.row.hzf
              )
            }}
          </template>
        </el-table-column>
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

        <!-- <el-table-column label="预警类型" width="120" align="center" prop="exeStatus">
          <template slot-scope="scope">
            {{
            $selectDictLabel(
            $store.getters.dictData.wd_warning || [],
            scope.row.txFs
            )
            }}
          </template>
        </el-table-column>-->
        <el-table-column
          label="60日资金回笼异常"
          width="130"
          align="center"
          prop="warningStatus1"
        >
          <template slot-scope="scope">
            <!-- {{
              $selectDictLabel(
                $store.getters.dictData.funds_type || [],
                scope.row.warningStatus11
              )
            }}-->
            <span v-if="scope.row.warningStatus1 == '1'">60日未结清异常</span>
          </template>
        </el-table-column>
        <el-table-column
          label="80日资金回笼异常"
          width="130"
          align="center"
          prop="warningStatus11"
        >
          <template slot-scope="scope">
            <!-- {{
              $selectDictLabel(
                $store.getters.dictData.funds_type || [],
                scope.row.warningStatus111
              )
            }}-->
            <span v-if="scope.row.warningStatus11 == '1'">80日未结清异常</span>
          </template>
        </el-table-column>
        <el-table-column
          label="90日资金回笼异常"
          width="130"
          align="center"
          prop="warningStatus111"
        >
          <template slot-scope="scope">
            <!-- {{
              $selectDictLabel(
                $store.getters.dictData.funds_type || [],
                scope.row.warningStatus1
              )
            }}-->
            <span v-if="scope.row.warningStatus111 == '1'">90日未结清异常</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商贷结清异常"
          width="120"
          align="center"
          prop="warningStatus2"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.remind_way || [],
                scope.row.warningStatus2
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="商贷解押异常"
          width="120"
          align="center"
          prop="warningStatus3"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.remind_way || [],
                scope.row.warningStatus3
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="公积金入押异常"
          width="120"
          align="center"
          prop="warningStatus4"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.remind_way || [],
                scope.row.warningStatus4
              )
            }}
          </template>
        </el-table-column>

        <el-table-column
          label="是否按时放款"
          width="120"
          align="center"
          prop="sfasfk"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.is_lending || [],
                scope.row.sfasfk
              )
            }}
          </template>
        </el-table-column>

        <el-table-column
          label="回款时间"
          width="120"
          align="center"
          prop="hksj"
        />

        <el-table-column
          label="创建时间"
          width="150"
          align="center"
          prop="cjsj"
        />

        <el-table-column
          label="婚姻状态"
          width="150"
          align="center"
          prop="hyzk"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.marriage_type || [],
                scope.row.hyzk
              )
            }}
          </template>
        </el-table-column>

        <el-table-column
          label="共同借款人姓名"
          width="120"
          align="center"
          prop="gtjkrxm"
        />

        <el-table-column
          label="共同借款人身份证号码"
          width="170"
          align="center"
          prop="gtjkrsfz"
        />

        <el-table-column
          label="办理业务员名称"
          width="120"
          align="center"
          prop="blywymc"
        />

        <el-table-column
          label="房屋坐落"
          width="150"
          align="center"
          prop="fwzl"
        />
        <el-table-column
          label="房屋总价(元)"
          width="120"
          align="center"
          prop="fwzj"
        />
        <el-table-column
          label="建筑面积(平方米)"
          width="150"
          align="center"
          prop="fwjcmj"
        />

        <el-table-column
          label="客户收款账号"
          width="150"
          align="center"
          prop="khskzh"
        />

        <el-table-column
          label="业务ID"
          width="200"
          align="center"
          prop="ywId"
        />
        <!-- <el-table-column
          label="借款人证件类型"
          width="150"
          align="center"
          prop="jkrzjlx"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.cert_type || [],
                scope.row.jkrzjlx
              )
            }}
          </template>
        </el-table-column>-->

        <!-- <el-table-column
          label="共同借款人证件类型"
          width="150"
          align="center"
          prop="gtjkrzjlx"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.cert_type || [],
                scope.row.gtjkrzjlx
              )
            }}
          </template>
        </el-table-column>-->

        <!-- <el-table-column
          label="所在区域"
          width="120"
          align="center"
          prop="szqy"
        />-->

        <!-- <el-table-column
          label="首付款金额(元)"
          width="120"
          align="center"
          prop="sfkje"
        />
        <el-table-column
          label="首付款比例(%)"
          width="120"
          align="center"
          prop="sfkbl"
        />-->

        <!-- <el-table-column
          label="合作方"
          width="120"
          align="center"
          prop="warningStatus2"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.partners || [],
                scope.row.hzf
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="合作方类型"
          width="120"
          align="center"
          prop="warningStatus2"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.partner_type || [],
                scope.row.hzflx
              )
            }}
          </template>
        </el-table-column>-->

        <!-- <el-table-column
          label="购房次数"
          width="120"
          align="center"
          prop="gfcs"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.num_house_dict || [],
                scope.row.gfcs
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="抵押类型"
          width="120"
          align="center"
          prop="dylx"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.mortgage_type_dict || [],
                scope.row.dylx
              )
            }}
        </template>-->
        <!-- </el-table-column> -->

        <!-- <el-table-column
          label="年利率(%)"
          width="120"
          align="center"
          prop="nll"
        />
        <el-table-column
          label="还款方式"
          width="120"
          align="center"
          prop="hkfs"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.repayment_type || [],
                scope.row.hkfs
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="每月还款金额(元)"
          width="120"
          align="center"
          prop="myhkje"
        />
        <el-table-column
          label="其他月均负债(元)"
          width="120"
          align="center"
          prop="qtyjfz"
        />
        <el-table-column
          label="家庭平均月收入(元)"
          width="150"
          align="center"
          prop="jtpjysr"
        />
        <el-table-column
          label="负债比例(%)"
          width="120"
          align="center"
          prop="fzbl"
        />
        <el-table-column
          label="委托银行"
          width="120"
          align="center"
          prop="wtyh"
        />-->

        <!-- <el-table-column
          label="公积金贷款资格审核时间"
          width="180"
          align="center"
          prop="gjjdkzgshsj"
        />

        <el-table-column
          label="财务放款时间"
          width="120"
          align="center"
          prop="cwfksj"
        />
        <el-table-column
          label="财务放款备注"
          width="120"
          align="center"
          prop="cwfkbz"
        />
        <el-table-column
          label="委贷实际放款时间"
          width="150"
          align="center"
          prop="wdsjfksj"
        />
        <el-table-column
          label="委贷实际放款备注"
          width="150"
          align="center"
          prop="wdsjfkzb"
        />
        <el-table-column
          label="借款结清时间"
          width="120"
          align="center"
          prop="jkjqsj"
        />
        <el-table-column
          label="借款结清备注"
          width="120"
          align="center"
          prop="jkjqzh"
        />
        <el-table-column
          label="借款解押时间"
          width="120"
          align="center"
          prop="jkjysj"
        />
        <el-table-column
          label="借款结清备注"
          width="120"
          align="center"
          prop="jkjybz"
        />
        <el-table-column
          label="公积金入押时间"
          width="120"
          align="center"
          prop="gjjrysj"
        />
        <el-table-column
          label="公积金入押备注"
          width="120"
          align="center"
          prop="gjjrybz"
        />

        <el-table-column
          label="回款备注"
          width="120"
          align="center"
          prop="hkbz"
        />

        <el-table-column
          label="业务监控天数"
          width="120"
          align="center"
          prop="ywjkts"
        />

        <el-table-column
          label="办理业务员账号id"
          width="170"
          align="center"
          prop="blywyzh"
        />-->
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!--新增-->
    <el-dialog
      :title="dialogTit"
      :visible.sync="open"
      width="90%"
      class="addDialog"
      append-to-body
    >
      <!-- <div style="font-size:16px;padding-left:15px;margin:20px 0px">
        附件上传
      </div>-->
      <div style="padding-left:25px" class="file-area">
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
                      imageUrlFront && imageUrlFrontId
                        ? process.env.VUE_APP_BASE_API +
                          '/gjjwd/info/download?fileId=' +
                          imageUrlFrontData.fileId
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
                      imageUrlRevese && imageUrlReveseId
                        ? process.env.VUE_APP_BASE_API +
                          '/gjjwd/info/download?fileId=' +
                          imageUrlReveseData.fileId
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
          <el-row></el-row>
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
                  multiple
                  :on-preview="handlePreviewWater"
                  :on-remove="handleRemoveWater"
                  :on-success="handlesuccessWater"
                  :before-remove="beforeRemoveWater"
                  :limit="5"
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
                    v-if="dialogTit == '修改'"
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
                  multiple
                  :on-preview="handlePreviewIndent"
                  :on-remove="handleRemoveIndent"
                  :on-success="handlesuccessIndent"
                  :before-remove="beforeRemoveIndent"
                  :limit="5"
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
                    v-if="dialogTit == '修改'"
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
                  multiple
                  :on-preview="handlePreviewService"
                  :on-remove="handleRemoveService"
                  :on-success="handlesuccessService"
                  :before-remove="beforeRemoveService"
                  :limit="5"
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
                    v-if="dialogTit == '修改'"
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
                  multiple
                  :on-preview="handlePreviewApply"
                  :on-remove="handleRemoveApply"
                  :on-success="handlesuccessApply"
                  :before-remove="beforeRemoveApply"
                  :limit="5"
                  :on-exceed="handleExceedApply"
                  :file-list="fileListApply"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- <p v-if="dialogTit == '修改'" class="file-tit">
                  {{ fileListApplyName
                  }}<span @click="delFileFunc('fyzfpz')">删除</span>
                </p>-->
                <div v-for="(item, index) in fileListApplyData" :key="index">
                  <p class="file-tit" @click="downloadFunc('fyzfpz', index)">
                    {{ item.fileName }}
                  </p>
                  <span
                    v-if="dialogTit == '修改'"
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
                  multiple
                  :on-preview="handlePreviewProvident"
                  :on-remove="handleRemoveProvident"
                  :on-success="handlesuccessProvident"
                  :before-remove="beforeRemoveProvident"
                  :limit="5"
                  :on-exceed="handleExceedProvident"
                  :file-list="fileListProvident"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div
                  v-for="(item, index) in fileListProvidentData"
                  :key="index"
                >
                  <p class="file-tit" @click="downloadFunc('gjjspb', index)">
                    {{ item.fileName }}
                  </p>
                  <span
                    v-if="dialogTit == '修改'"
                    style="color: red;cursor: pointer;"
                    @click="delFileFunc('gjj', index)"
                    >删除</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <data-form
        ref="dataForm"
        :form-list="addFormList"
        :form-data="addFormData"
        :rules-data="rulesForm"
        :is-block="isBlockBasic"
        @addSubmit="addSubmit"
        @processSubmit="processSubmit"
      ></data-form>

      <!-- <div>
           <el-button size="small" type="primary">发起审核</el-button>
      </div>-->
      <div class="area">
        <div class="title">委贷资格审核</div>
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
                      ></el-date-picker>
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
    </el-dialog>

    <!-- 操作日志对话框 -->
    <el-dialog
      title="操作日志"
      :visible.sync="openOprate"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <el-table :data="dialogTableData">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="操作内容" prop="operateContent">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wdywzt || [],
                scope.row.operateContent
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="operateUser" />
        <el-table-column label="操作时间" prop="operateTime" width="180" />
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryOprateParams.pageNum"
        :limit.sync="queryOprateParams.pageSize"
        @pagination="getOprateList"
      />
    </el-dialog>

    <!-- 查看详情对话框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="openDetails"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <div class="basic-info">
        <el-row>
          <el-col :span="6">
            <label>身份证正面：</label>
            <span
              v-if="imageUrlFrontData.fileName"
              class="file-tit file-name"
              @click="downloadFunc('sfzzm')"
            >
              <i class="el-icon-download"></i>
              {{ imageUrlFrontData.fileName }}
            </span>
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
              {{ imageUrlReveseData.fileName }}
            </span>
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
              {{ item.fileName }}
            </span>
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
              {{ item.fileName }}
            </span>
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
              {{ item.fileName }}
            </span>
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
              {{ item.fileName }}
            </span>
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
              {{ item.fileName }}
            </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <label>受理机构：</label>
            <span>
              {{
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
            <span>
              {{
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
          </el-col>-->
          <el-col :span="6">
            <label>共同借款人证件号码：</label>
            <span>{{ detailData.gtjkrsfz }}</span>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="6">
            <label>楼盘名称：</label>
            <span>{{ detailData.lpmc }}</span>
          </el-col>-->
          <!-- <el-col :span="6">
            <label>合同备案号：</label>
            <span>{{ detailData.htbh }}</span>
          </el-col>-->
          <el-col :span="6">
            <label>房屋坐落：</label>
            <span>{{ detailData.fwzl }}</span>
          </el-col>
          <!-- <el-col :span="6">
            <label>所在区域：</label>
            <span>{{ detailData.szqy }}</span>
          </el-col>-->
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
          </el-col>-->
          <el-col :span="6">
            <label>建筑面积(平方米)：</label>
            <span>{{ detailData.fwjcmj }}</span>
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
          </el-col>-->
          <el-col :span="6">
            <label>贷款金额(元)：</label>
            <span>{{ detailData.dkje }}</span>
          </el-col>
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
          </el-col>-->
          <el-col :span="6">
            <label>贷款类型：</label>
            <span>
              {{
                $selectDictLabel(
                  $store.getters.dictData.loan_type || [],
                  detailData.dklx
                )
              }}
            </span>
          </el-col>
          <el-col :span="6">
            <label>合作方类型：</label>
            <span>
              {{
                $selectDictLabel(
                  $store.getters.dictData.partner_type || [],
                  detailData.hzflx
                )
              }}
            </span>
          </el-col>
          <el-col :span="6">
            <label>合作方：</label>
            <span>
              {{
                $selectDictLabel(
                  $store.getters.dictData.partners || [],
                  detailData.hzf
                )
              }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <label>节点状态：</label>
            <span>
              {{
                $selectDictLabel(
                  $store.getters.dictData.wdywzt || [],
                  detailData.ywzt
                )
              }}
            </span>
          </el-col>
          <el-col :span="6">
            <label>业务状态：</label>
            <span>
              {{
                $selectDictLabel(
                  $store.getters.dictData.all_status || [],
                  detailData.ztzt
                )
              }}
            </span>
          </el-col>
          <el-col :span="6">
            <label>是否按时放款：</label>
            <span>
              {{
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
          <!-- <el-col :span="6">
            <label>公积金审批时间：</label>
            <span>{{ detailData.gjjdkzgshsj }}</span>
          </el-col>
          <el-col :span="6">
            <label>公积金审核备注：</label>
            <span>{{ detailData.gjjdkzgshbz }}</span>
          </el-col>-->
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
        </el-row>-->
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
        </el-row>-->
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
        </el-row>-->
        <el-row>
          <!-- <el-col :span="6">
            <label>回款备注：</label>
            <span>{{ detailData.hkbz }}</span>
          </el-col>-->

          <el-col :span="6">
            <label>创建时间：</label>
            <span>{{ detailData.cjsj }}</span>
          </el-col>
          <el-col :span="6">
            <label>办理业务员账号id：</label>
            <span>{{ detailData.blywyzh }}</span>
          </el-col>
          <el-col :span="6">
            <label>办理业务员名称：</label>
            <span>{{ detailData.blywymc }}</span>
          </el-col>
        </el-row>
      </div>

      <div v-show="ywztStatu > 1" class="area">
        <div class="title">委贷资格审核</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="formWdzg"
              :model="detailData"
              label-width="150px"
              label-position="right"
              :inline="true"
            >
              <!--委贷资格审核-->
              <div v-if="ywztStatu != '1' || ywztStatu != '2'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公积金审批时间：" prop="gjjdkzgshsj">
                      <el-date-picker
                        v-model="detailData.gjjdkzgshsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.gjjdkzgshbz"
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
      </div>

      <div v-show="ywztStatu > 4" class="area">
        <div class="title">委贷业务放款</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="ywfkForm"
              :model="detailData"
              label-width="120px"
              label-position="right"
              :inline="true"
            >
              <!--委贷业务放款-->
              <div v-if="$route.query.ywzt == '4'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="实际放款时间：" prop="wdsjfksj">
                      <el-date-picker
                        v-model="detailData.wdsjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.wdsjfkzb"
                        placeholder="请输入"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附件：" style="margin-left:15px">
                      <el-upload
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewLoan"
                        :on-remove="handleRemoveLoan"
                        :before-remove="beforeRemoveLoan"
                        :limit="1"
                        :on-exceed="handleExceedLoan"
                        :file-list="fileListLoan"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <!-- <p>{{ fileListWaterName }}</p> -->
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="12">
                    <el-form-item label="预计结清时间：" prop="yjjqsj">
                      <el-date-picker
                        v-model="detailData.yjjqsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>-->
                </el-row>
              </div>
              <div v-else-if="ywztStatu > 4">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="实际放款时间：" prop="wdsjfksj">
                      <el-date-picker
                        v-model="detailData.wdsjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.wdsjfkzb"
                        type="textarea"
                        placeholder="请输入"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!-- <p>{{ fileListWdywtName }}</p> -->
                    <el-form-item label="附件：" prop="jkjqzh">
                      <span
                        v-if="fileListWdywtName"
                        class="file-name"
                        @click="downloadFunc('wdywfk')"
                      >
                        <i class="el-icon-download"></i>
                        {{ fileListWdywtName }}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="预计结清时间：" prop="yjjqsj">
                    <el-date-picker
                      v-model="addInfoYwfk.yjjqsj"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                </el-row>-->
              </div>
              <div v-if="$route.query.ywzt == '4'">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商业结清登记--->
      <div v-show="ywztStatu > 5" class="area">
        <div class="title">商贷结清登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="sdjqForm"
              :model="detailData"
              label-width="130px"
              label-position="right"
              :inline="true"
            >
              <div v-if="ywztStatu > 5">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借款结清时间：" prop="jkjqsj">
                      <el-date-picker
                        v-model="detailData.jkjqsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.jkjqzh"
                        type="textarea"
                        placeholder="请输入"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="附件：">
                      <span
                        v-if="fileListSdjqName"
                        class="file-name"
                        @click="downloadFunc('sdjq')"
                      >
                        <i class="el-icon-download"></i>
                        {{ fileListSdjqName }}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商贷解押登记--->
      <div v-show="ywztStatu > 6" class="area">
        <div class="title">商贷解押登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="sdjyForm"
              :model="addInfoSdjy"
              label-width="130px"
              label-position="right"
              :inline="true"
            >
              <div v-if="ywztStatu > 6">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借款解押时间：" prop="jkjysj">
                      <el-date-picker
                        v-model="detailData.jkjysj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.jkjybz"
                        type="textarea"
                        placeholder="请输入"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!-- <p>{{ fileListSdjyName }}</p> -->

                    <el-form-item label="附件：">
                      <span
                        v-if="fileListSdjyName"
                        class="file-name"
                        @click="downloadFunc('sdjy')"
                      >
                        <i class="el-icon-download"></i>
                        {{ fileListSdjyName }}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--公积金入押登记--->
      <div v-show="ywztStatu > 7" class="area">
        <div class="title">公积金中心入押登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="gjjForm"
              :model="detailData"
              label-width="120px"
              label-position="right"
              :inline="true"
            >
              <!--商贷结清登记-->

              <div v-if="ywztStatu > 7">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入押时间：" prop="gjjrysj">
                      <el-date-picker
                        v-model="detailData.gjjrysj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.gjjrybz"
                        type="textarea"
                        placeholder="请输入"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!-- <p>{{ fileListGjjRyName }}</p> -->
                    <el-form-item label="附件：" prop="jkjqzh">
                      <span
                        v-if="fileListSdjyName"
                        class="file-name"
                        @click="downloadFunc('gjj')"
                      >
                        <i class="el-icon-download"></i>
                        {{ fileListGjjRyName }}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--放款时间登记--->
      <div v-show="ywztStatu > 8" class="area">
        <div class="title">公积金放款时间登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="fksjForm"
              :model="detailData"
              label-width="130px"
              label-position="right"
              :inline="true"
            >
              <div v-if="ywztStatu > 8">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="放款时间：" prop="gjjfksj">
                      <el-date-picker
                        v-model="detailData.gjjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.gjjfkbz"
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
      </div>

      <!--回款确认登记--->
      <div v-show="9 <= ywztStatu" class="area">
        <div class="title">回款确认登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="hkqrForm"
              :model="addInfoHkqr"
              label-width="130px"
              label-position="right"
              :inline="true"
            >
              <div v-if="ywztStatu > 9">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="回款时间：" prop="hksj">
                      <el-date-picker
                        v-model="detailData.hksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="detailData.hkbz"
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
      </div>
    </el-dialog>

    <!--批量登记---->
    <el-dialog
      title="批量登记"
      :visible.sync="openBatch"
      width="80%"
      :close-on-click-modal="false"
      class="addDialog"
      append-to-body
    >
      <div v-show="2 == ywztStatu || (1 == ywztStatu && openWd)" class="area">
        <div class="title">
          委贷资格审核
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="formWdzgTwo"
              :model="addInfoWdzgTwo"
              :rules="wdzgRulesTwo"
              label-width="150px"
              label-position="right"
              :inline="true"
            >
              <!--委贷资格审核-->
              <div v-if="ywztStatu == '2' || (1 == ywztStatu && openWd)">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公积金审批时间：" prop="gjjdkzgshsj">
                      <el-date-picker
                        v-model="addInfoWdzgTwo.gjjdkzgshsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoWdzgTwo.gjjdkzgshbz"
                        type="textarea"
                        placeholder="请输入"
                        width="400px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="ywztStatu == '2' || (1 == ywztStatu && openWd)">
                <el-button
type="primary"
:loading="btnLoad"
@click="onSubmit"
>提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <div v-if="ywztStatu == '3'" style="font-size:18px">
        您已提交业务审核流程！
      </div>
      <div v-if="ywztStatu == '10'" style="font-size:18px">流程已完成！</div>
      <div v-show="4 == ywztStatu" class="area">
        <div class="title">委贷业务放款</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="ywfkForm"
              :model="addInfoYwfk"
              :rules="ywfkRules"
              label-width="150px"
              label-position="right"
              :inline="true"
            >
              <!--委贷业务放款-->
              <div v-if="ywztStatu == '4'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="实际放款时间：" prop="wdsjfksj">
                      <el-date-picker
                        v-model="addInfoYwfk.wdsjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="wdsjfksjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoYwfk.wdsjfkzb"
                        placeholder="请输入"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- <el-col :span="12">
                    <el-form-item
                      label="委贷业务放款资料："
                      style="margin-left:15px"
                      :required="true"
                    >
                      <el-upload
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewLoan"
                        :on-remove="handleRemoveLoan"
                        :on-success="handlesuccessLoan"
                        :before-remove="beforeRemoveLoan"
                        :limit="3"
                        :on-exceed="handleExceedLoan"
                        :file-list="fileListLoan"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <p
                        v-for="(item, index) in fileListIndentData"
                        v-if="fileListIndentName"
                        :key="index"
                        class="file-tit file-name"
                        @click="downloadFunc('wdht', index)"
                      >
                        {{ item.fileName }}
                      </p>
                    </el-form-item>
                  </el-col>-->
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
                        <el-form-item
                          label="委贷业务放款资料："
                          style="margin-left:15px"
                          :required="true"
                        >
                          <el-upload
                            class="upload-demo"
                            :action="uploadImgUrl"
                            :headers="headers"
                            name="files"
                            :on-preview="handlePreviewLoan"
                            :on-remove="
                              (file, fileList) =>
                                handleRemoveLoan(index, file, fileList)
                            "
                            :on-success="
                              (res, file, fileList) =>
                                handlesuccessLoan(
                                  index,
                                  item,
                                  res,
                                  file,
                                  fileList
                                )
                            "
                            :before-remove="beforeRemoveLoan"
                            :on-exceed="handleExceedLoan"
                            :file-list="fileListLoan"
                          >
                            <el-button
size="small"
type="primary"
>点击上传</el-button>
                          </el-upload>
                          <p
                            v-for="(item, index) in fileListIndentData"
                            v-if="fileListIndentName"
                            :key="index"
                            class="file-tit file-name"
                            @click="downloadFunc('wdht', index)"
                          >
                            {{ item.fileName }}
                          </p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-row>
              </div>
              <div v-if="ywztStatu == '4'">
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="openBatch = false">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商业结清登记--->
      <div v-show="5 == ywztStatu" class="area">
        <div class="title">商贷结清登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="sdjqForm"
              :model="addInfoSdjq"
              label-width="130px"
              label-position="right"
              :inline="true"
              :rules="sdjqRules"
            >
              <!--商贷结清登记-->
              <div v-if="ywztStatu == '5'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="借款结清时间：" prop="jkjqsj">
                      <el-date-picker
                        v-model="addInfoSdjq.jkjqsj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="jkjqsjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoSdjq.jkjqzh"
                        type="textarea"
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
                      <el-form-item
                        label="商贷结清资料："
                        style="margin-left:15px"
                        :required="true"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="uploadImgUrl"
                          :headers="headers"
                          name="files"
                          :on-preview="handlePreviewJkdj"
                          :on-remove="
                            (file, fileList) =>
                              handleRemoveJkdj(index, file, fileList)
                          "
                          :on-success="
                            (res, file, fileList) =>
                              handlesuccessJkdj(
                                index,
                                item,
                                res,
                                file,
                                fileList
                              )
                          "
                          :before-remove="beforeRemoveJkdj"
                          :on-exceed="handleExceedJkdj"
                          :file-list="fileListJkdj"
                        >
                          <el-button
size="small"
type="primary"
>点击上传</el-button>
                        </el-upload>
                        <p
                          v-for="(item, index) in fileListSdjqData"
                          v-if="fileListSdjqName"
                          :key="index"
                          class="file-tit file-name"
                          @click="downloadFunc('sdjq', index)"
                        >
                          {{ item.fileName }}
                        </p>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <div v-if="ywztStatu == '5'">
                  <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                  <el-button @click="openBatch = false">取消</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商贷解押登记--->
      <div v-show="6 == ywztStatu" class="area">
        <div class="title">商贷解押登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="sdjyForm"
              :model="addInfoSdjy"
              label-width="130px"
              label-position="right"
              :inline="true"
              :rules="sdjyRules"
            >
              <div v-if="ywztStatu == '6'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="借款解押时间：" prop="jkjysj">
                      <el-date-picker
                        v-model="addInfoSdjy.jkjysj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="jkjysjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoSdjy.jkjybz"
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
                      <el-form-item
                        label="商贷解押资料："
                        style="margin-left:15px"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="uploadImgUrl"
                          :headers="headers"
                          name="files"
                          :on-preview="handlePreviewJkjy"
                          :on-remove="
                            (file, fileList) =>
                              handleRemoveJkjy(index, file, fileList)
                          "
                          :on-success="
                            (res, file, fileList) =>
                              handlesuccessJkjy(
                                index,
                                item,
                                res,
                                file,
                                fileList
                              )
                          "
                          :before-remove="beforeRemoveJkjy"
                          :on-exceed="handleExceedJkjy"
                          :file-list="fileListJkjy"
                        >
                          <el-button
size="small"
type="primary"
>点击上传</el-button>
                        </el-upload>
                        <p
                          v-for="(item, index) in fileListSdjyData"
                          v-if="fileListSdjyName"
                          :key="index"
                          class="file-tit file-name"
                          @click="downloadFunc('sdjy', index)"
                        >
                          {{ item.fileName }}
                        </p>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div v-if="ywztStatu == '6'">
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="openBatch = false">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--公积金入押登记--->
      <div v-show="7 == ywztStatu" class="area">
        <div class="title">公积金中心入押登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="gjjForm"
              :model="addInfoGjj"
              label-width="140px"
              label-position="right"
              :inline="true"
              :rules="gjjRules"
            >
              <!--商贷结清登记-->
              <div v-if="ywztStatu == '7'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="入押时间：" prop="gjjrysj">
                      <el-date-picker
                        v-model="addInfoGjj.gjjrysj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="gjjrysjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoGjj.gjjrybz"
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
                      <el-form-item label="公积金入押资料：">
                        <el-upload
                          class="upload-demo"
                          :action="uploadImgUrl"
                          :headers="headers"
                          name="files"
                          :on-preview="handlePreviewGjj"
                          :on-remove="
                            (file, fileList) =>
                              handleRemoveGjj(index, file, fileList)
                          "
                          :on-success="
                            (res, file, fileList) =>
                              handlesuccessGjj(index, item, res, file, fileList)
                          "
                          :before-remove="beforeRemoveGjj"
                          :on-exceed="handleExceedGjj"
                          :file-list="fileListGjj"
                        >
                          <el-button
size="small"
type="primary"
>点击上传</el-button>
                        </el-upload>

                        <p
                          v-for="(item, index) in fileListGjjRyData"
                          v-if="fileListGjjRyName"
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

              <div v-if="ywztStatu == '7'">
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="openBatch = false">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--放款时间登记--->
      <div v-show="8 == ywztStatu" class="area">
        <div class="title">公积金放款时间登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="fksjForm"
              :model="addInfoFksj"
              label-width="130px"
              label-position="right"
              :inline="true"
              :rules="fksjRules"
            >
              <div v-if="ywztStatu == '8'">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="放款时间：">
                      <el-date-picker
                        v-model="addInfoFksj.gjjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="gjjfksjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoFksj.gjjfkbz"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div v-if="ywztStatu == '8'" style="margin-top:40px">
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="openBatch = false">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--回款确认登记--->
      <div v-show="9 == ywztStatu" class="area">
        <div class="title">回款确认登记</div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="hkqrForm"
              :model="addInfoHkqr"
              label-width="130px"
              label-position="right"
              :inline="true"
              :rules="hkqrRules"
            >
              <div v-if="ywztStatu == '9'">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="回款时间：" prop="hksj">
                      <el-date-picker
                        v-model="addInfoHkqr.hksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="hksjPicker"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-input
                        v-model="addInfoHkqr.hkbz"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div v-if="ywztStatu == '9'" style="margin-top:40px">
                <!-- <el-button type="primary" @click="onSave">保存</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="openBatch = false">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--长银放款登记--->
      <!-- <div v-show="10 == ywztStatu && isBank" class="area">
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
                  v-if="hzfTypeArr[0] == '1'"
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

              <div v-if="ywztStatu == '10' && hzfTypeArr[0] == '1'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div> -->

      <!--银行回款登记--->
      <!-- <div v-show="11 == ywztStatu && isBank" class="area">
        <div class="title">
          银行回款登记
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="yhhkForm"
              :model="addInfoYhhk"
              label-width="180px"
              label-position="right"
              :inline="true"
              :rules="hkqrRules"
            >
              <div v-if="ywztStatu == '9'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="银行回款至长银时间：" prop="hksj">
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
                  v-if="hzfTypeArr[0] == '1'"
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
                        <p
                          v-for="(item, index) in fileListYhhk"
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

              <div v-if="ywztStatu == '11' && hzfTypeArr[0] == '1'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div> -->
    </el-dialog>

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="受理机构" prop="title">
          <el-input v-model="form.title" placeholder="请输入受理机构" />
        </el-form-item>
        <el-form-item label="受理人姓名" prop="title">
          <el-input v-model="form.title" placeholder="请输入受理人姓名" />
        </el-form-item>
        <el-form-item label="借款人姓名" prop="jkrxm">
          <el-input v-model="form.jkrxm" placeholder="请输入借款人姓名" />
        </el-form-item>
        <el-form-item label="借款人证件类型()" prop="jkrzjlx">
          <el-input
            v-model="form.jkrzjlx"
            placeholder="请输入借款人证件类型()"
          />
        </el-form-item>
        <el-form-item label="借款人身份证码" prop="jkrsfz">
          <el-input v-model="form.jkrsfz" placeholder="请输入借款人身份证码" />
        </el-form-item>
        <el-form-item label="共同借款人姓名" prop="gtjkrxm">
          <el-input v-model="form.gtjkrxm" placeholder="请输入共同借款人姓名" />
        </el-form-item>
        <el-form-item label="共同借款人证件类型" prop="gtjkrzjlx">
          <el-input
            v-model="form.gtjkrzjlx"
            placeholder="请输入共同借款人证件类型"
          />
        </el-form-item>
        <el-form-item label="共同借款人证件号码" prop="gtjkrsfz">
          <el-input
            v-model="form.gtjkrsfz"
            placeholder="请输入共同借款人证件号码"
          />
        </el-form-item>
        <el-form-item label="楼盘名称" prop="lpmc">
          <el-input v-model="form.lpmc" placeholder="请输入楼盘名称" />
        </el-form-item>
        <el-form-item label="合同编号" prop="htbh">
          <el-input v-model="form.htbh" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="房屋坐落" prop="fwzl">
          <el-input v-model="form.fwzl" placeholder="请输入房屋坐落" />
        </el-form-item>
        <el-form-item label="所在区域" prop="szqy">
          <el-input v-model="form.szqy" placeholder="请输入所在区域" />
        </el-form-item>
        <el-form-item label="房屋总价" prop="fwzj">
          <el-input v-model="form.fwzj" placeholder="请输入房屋总价" />
        </el-form-item>
        <el-form-item label="首付款金额" prop="sfkje">
          <el-input v-model="form.sfkje" placeholder="请输入首付款金额" />
        </el-form-item>
        <el-form-item label="首付款比例" prop="sfkbl">
          <el-input v-model="form.sfkbl" placeholder="请输入首付款比例" />
        </el-form-item>
        <el-form-item label="房屋建筑面积" prop="fwjcmj">
          <el-input v-model="form.fwjcmj" placeholder="请输入房屋建筑面积" />
        </el-form-item>
        <el-form-item label="购房次数(1：首套房；2：二套房)" prop="gfcs">
          <el-input
            v-model="form.gfcs"
            placeholder="请输入购房次数(1：首套房；2：二套房)"
          />
        </el-form-item>
        <el-form-item label="抵押类型(1：本房抵押；2：他房抵押)" prop="dylx">
          <el-input
            v-model="form.dylx"
            placeholder="请输入抵押类型(1：本房抵押；2：他房抵押)"
          />
        </el-form-item>
        <el-form-item label="贷款金额" prop="dkje">
          <el-input v-model="form.dkje" placeholder="请输入贷款金额" />
        </el-form-item>
        <el-form-item label="贷款期限" prop="dkqx">
          <el-input v-model="form.dkqx" placeholder="请输入贷款期限" />
        </el-form-item>
        <el-form-item label="年利率" prop="nll">
          <el-input v-model="form.nll" placeholder="请输入年利率" />
        </el-form-item>
        <el-form-item label="还款方式:1.等额本息 2：等额本金" prop="hkfs">
          <el-input
            v-model="form.hkfs"
            placeholder="请输入还款方式:1.等额本息 2：等额本金"
          />
        </el-form-item>
        <el-form-item label="每月还款金额" prop="myhkje">
          <el-input v-model="form.myhkje" placeholder="请输入每月还款金额" />
        </el-form-item>
        <el-form-item label="其他月均负债" prop="qtyjfz">
          <el-input v-model="form.qtyjfz" placeholder="请输入其他月均负债" />
        </el-form-item>
        <el-form-item label="家庭平均月收入" prop="jtpjysr">
          <el-input v-model="form.jtpjysr" placeholder="请输入家庭平均月收入" />
        </el-form-item>
        <el-form-item label="负债比例" prop="fzbl">
          <el-input v-model="form.fzbl" placeholder="请输入负债比例" />
        </el-form-item>
        <el-form-item label="委托银行" prop="wtyh">
          <el-input v-model="form.wtyh" placeholder="请输入委托银行" />
        </el-form-item>
        <el-form-item
          label="办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
          prop="blywd"
        >
          <el-input
            v-model="form.blywd"
            placeholder="请输入办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
          />
        </el-form-item>
        <el-form-item label="公积金贷款资格审核时间" prop="gjjdkzgshsj">
          <el-input
            v-model="form.gjjdkzgshsj"
            placeholder="请输入公积金贷款资格审核时间"
          />
        </el-form-item>
        <el-form-item
          label="业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
          prop="ywzt"
        >
          <el-input
            v-model="form.ywzt"
            placeholder="请输入业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
          />
        </el-form-item>
        <el-form-item label="财务放款时间" prop="cwfksj">
          <el-input v-model="form.cwfksj" placeholder="请输入财务放款时间" />
        </el-form-item>
        <el-form-item label="财务放款备注" prop="cwfkbz">
          <el-input v-model="form.cwfkbz" placeholder="请输入财务放款备注" />
        </el-form-item>
        <el-form-item label="委贷实际放款时间" prop="wdsjfksj">
          <el-input
            v-model="form.wdsjfksj"
            placeholder="请输入委贷实际放款时间"
          />
        </el-form-item>
        <el-form-item label="委贷实际放款备注" prop="wdsjfkzb">
          <el-input
            v-model="form.wdsjfkzb"
            placeholder="请输入委贷实际放款备注"
          />
        </el-form-item>
        <el-form-item label="借款结清时间" prop="jkjqsj">
          <el-input v-model="form.jkjqsj" placeholder="请输入借款结清时间" />
        </el-form-item>
        <el-form-item label="借款结清备注" prop="jkjqzh">
          <el-input v-model="form.jkjqzh" placeholder="请输入借款结清备注" />
        </el-form-item>
        <el-form-item label="借款解押时间" prop="jkjysj">
          <el-input v-model="form.jkjysj" placeholder="请输入借款解押时间" />
        </el-form-item>
        <el-form-item label="借款结清备注" prop="jkjybz">
          <el-input v-model="form.jkjybz" placeholder="请输入借款结清备注" />
        </el-form-item>
        <el-form-item label="公积金入押时间" prop="gjjrysj">
          <el-input v-model="form.gjjrysj" placeholder="请输入公积金入押时间" />
        </el-form-item>
        <el-form-item label="公积金入押备注" prop="gjjrybz">
          <el-input v-model="form.gjjrybz" placeholder="请输入公积金入押备注" />
        </el-form-item>
        <el-form-item label="回款时间" prop="hksj">
          <el-input v-model="form.hksj" placeholder="请输入回款时间" />
        </el-form-item>
        <el-form-item label="回款备注" prop="hkbz">
          <el-input v-model="form.hkbz" placeholder="请输入回款备注" />
        </el-form-item>
        <el-form-item label="是否按时放款(1:是，0：否)" prop="sfasfk">
          <el-input
            v-model="form.sfasfk"
            placeholder="请输入是否按时放款(1:是，0：否)"
          />
        </el-form-item>
        <el-form-item label="业务监控天数" prop="ywjkts">
          <el-input v-model="form.ywjkts" placeholder="请输入业务监控天数" />
        </el-form-item>
        <el-form-item label="创建时间" prop="cjsj">
          <el-input v-model="form.cjsj" placeholder="请输入创建时间" />
        </el-form-item>
        <el-form-item label="办理业务员账号id" prop="blywyzh">
          <el-input
            v-model="form.blywyzh"
            placeholder="请输入办理业务员账号id"
          />
        </el-form-item>
        <el-form-item label="办理业务员名称" prop="blywymc">
          <el-input v-model="form.blywymc" placeholder="请输入办理业务员名称" />
        </el-form-item>
        <el-form-item
          label="整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
          prop="ztzt"
        >
          <el-input
            v-model="form.ztzt"
            placeholder="请输入整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->

    <!--资金申请-->
    <apply-page v-if="applyShow" ref="applyForm"></apply-page>
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
  process_api,
  preview_api,
  addProcess_api,
  batchRegister_api,
  template_api,
  letter_api,
  printJqh_api
} from '@/api/committe/index';
import { recordList } from '@/api/committe/record';
import Editor from '@/components/Editor';
import QueryTable from '@/components/QueryTable';
// import DataForm from '@/components/DataForm';
import DataForm from '././DataFormAdd';
import ApplyPage from './apply';
import { getToken } from '@/utils/auth';
import { useCapital, begainProcess } from '@/api/committe/apply';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';

import tableMixin from '@/components/QueryTable/mixins/tableMixin';

export default {
  name: 'Compublic',
  components: {
    Editor,
    QueryTable,
    DataForm,
    ApplyPage
  },
  inject: ['reload'],
  data() {
    return {
      fileListArr: {},
      hzfTypeArr: [],
      arr2: [],
      fileListLoanData: [],
      isBank: false,
      fileListJkdj: {},
      fileListJkdjData: [],
      letterArr: [],
      openBatch: false,
      openWd: false,
      addInfoWdzg: {
        gjjdkzgshbz: '',
        gjjdkzgshsj: ''
      },
      addInfoWdzgTwo: {
        gjjdkzgshbz: '',
        gjjdkzgshsj: ''
      },
      addInfoYwfk: {
        wdsjfksj: '',
        wdsjfkzb: ''
      },
      addInfoSdjq: {
        jkjqsj: '',
        jkjqzh: ''
      },
      addInfoSdjy: {
        jkjysj: '',
        jkjybz: ''
      },
      addInfoGjj: {
        gjjrysj: '',
        gjjrybz: ''
      },
      addInfoFksj: {
        gjjfksj: '',
        gjjfkbz: ''
      },
      addInfoHkqr: {
        hksj: '',
        hkbz: ''
      },
      blywyzh: '',
      warningStatus111: '',
      hzflxOptions: [],
      hzfOptions: [],
      btnLoad: false,
      applyShow: false,
      dklx: '',
      dkje: '',
      wdzgshForm: [],
      arrUpdata: [],
      ywztArr: [],
      fileListRevese: [],
      fileListFront: [],
      jkrxmArr: [],
      ywztStatu: '',
      single: '1',
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
      ywfkRules: {
        wdsjfksj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // wdsjfkzb: [{ required: true, message: '请输入', trigger: 'blur' }]
        // yjjqsj: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      wdzgRulesTwo: {
        gjjdkzgshsj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // gjjdkzgshbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      sdjqRules: {
        jkjqsj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // jkjqzh: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      sdjyRules: {
        jkjysj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // jkjybz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      gjjRules: {
        gjjrysj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // gjjrybz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      fksjRules: {
        gjjfksj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // gjjfkbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      hkqrRules: {
        hksj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // hkbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      rulesForm: {
        hjid: [{ required: true, message: '请选择', trigger: 'change' }],
        jqhbh: [{ required: true, message: '请输入', trigger: 'blur' }],
        blywd: [{ required: true, message: '请选择', trigger: 'change' }],
        slsj: [{ required: true, message: '请选择', trigger: 'change' }],
        jkrzjlx: [{ required: true, message: '请选择', trigger: 'change' }],
        hzf: [{ required: true, message: '请选择', trigger: 'change' }],
        hzflx: [{ required: true, message: '请选择', trigger: 'change' }],
        hyzk: [{ required: true, message: '请选择', trigger: 'change' }],
        jkrsfz: [{ required: true, message: '请输入', trigger: 'blur' }],
        khhjzh: [{ required: true, message: '请输入', trigger: 'blur' }],
        khskzh: [
          {
            required: true,
            // message: '请输入',
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
              }
            }
          }
        ],
        jkrxm: [{ required: true, message: '请输入', trigger: 'blur' }],
        // gtjkrxm: [{ required: true, message: '请输入', trigger: 'blur' }],
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
      imageUrlFrontId: '',
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
      addFormData: {
        hzf: '',
        hzflx: ''
      },
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
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      uploadImgUrl2:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/byFilePathDownload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      getData: listLog,
      selectRows: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: false,
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
        gtjkrzjlx: '',
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
      zjFirstApply: false,
      curMoney: '',
      hzfBoole: true,
      templateShow: false,
      jqhTemplateArr: [],
      jqhbhArr: [],
      hjidArr: [],
      isSelf: false,
      templateNo: '',
      wdsjfksjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].gjjdkzgshsj != '') {
            return date < new Date(this.multipleSelection[0].gjjdkzgshsj);
          }
        }
      },
      jkjqsjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].wdsjfksj != '') {
            return date < new Date(this.multipleSelection[0].wdsjfksj);
          }
        }
      },
      jkjysjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].jkjqsj != '') {
            return date < new Date(this.multipleSelection[0].jkjqsj);
          }
        }
      },
      gjjrysjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].jkjysj != '') {
            return date < new Date(this.multipleSelection[0].jkjysj);
          }
        }
      },
      gjjfksjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].gjjrysj != '') {
            return date < new Date(this.multipleSelection[0].gjjrysj);
          }
        }
      },
      hksjPicker: {
        disabledDate: date => {
          if (this.multipleSelection[0].gjjfksj != '') {
            return date < new Date(this.multipleSelection[0].gjjfksj);
          }
        }
      }
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
        {
          label: '借款合同编号',
          model: 'htbh'
        },
        {
          label: '贷款金额(元)',
          model: 'dkje'
        },
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
        // {
        //   label: '受理机构',
        //   model: 'blywd',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.accpt_org || []
        // },
        // {
        //   label: '资金回笼异常',
        //   model: 'warningStatus1',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.wd_warning || []
        // },
        // {
        //   label: '入押异常',
        //   model: 'warningStatus2',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.wd_warning || []
        // },
        {
          label: '预警类型',
          model: 'exeStatus',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_warning || []
        },
        {
          label: '提醒方式',
          model: 'txFs',
          type: 'select',
          dictOptions: this.$store.getters.dictData.remind_way || []
        },
        {
          label: '合作方类型',
          model: 'hzflx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.partner_type || []
        },
        {
          label: '合作方',
          model: 'hzf',
          type: 'select',
          dictOptions: this.$store.getters.dictData.partners || []
        },
        {
          label: '节点状态',
          model: 'ywzt',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wdywzt || []
        },
        {
          label: '结清函编号',
          model: 'jqhbh',
          type: 'select',
          dictOptions: this.letterArr || []
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
      ];
    }
  },
  watch: {
    'addFormData.hzflx': function(value) {
      // console.log('addFormData', addFormData)
      console.log(value);
      this.addFormData.hzf = '';
      if (value) {
        if (value == '1') {
          console.log('this.addFormData', this.addFormData);
          this.hzfOptions.map(item => {
            this.templateShow = false;
            if (item.dictValue == '3') {
              item.disabled = true;
            } else {
              item.disabled = false;
            }
          });
        } else {
          if (value == '2') {
            this.templateShow = true;
            this.hzfOptions.map(item => {
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
    this.getTemplate();
    this.getLetter();
  },
  create() {
    // 贷款类型：
    this.$getDicts('loan_type').then(response => {
      this.dklxOptions = response.data;
    });
    // 还款方式：
    this.$getDicts('repayment_type').then(response => {
      this.hkfsOptions = response.data;
    });
    // 抵押类型：
    this.$getConfigKey('mortgage_type_dict').then(response => {
      this.dylxPassword = response.msg;
    });
    // 购房次数：
    this.$getDicts('num_house_dict').then(response => {
      this.gfcsOptions = response.data;
    });
    // 证件类型：
    this.$getDicts('repayment_type').then(response => {
      this.zjlxOptions = response.data;
    });
    // 抵押类型：
    this.$getConfigKey('cert_type').then(response => {
      this.dylxOptions = response.msg;
    });
    // 受理机构  accpt_org
    this.$getConfigKey('accpt_org ').then(response => {
      this.sljgOptions = response.msg;
    });
  },
  methods: {
    handlePrint() {
      // jkhtbhArr
      if (
        this.jqhbhArr[0] == '' ||
        this.jqhbhArr[0] == undefined ||
        this.jqhbhArr.length == 0
      ) {
        this.$message.warning('请选择有结清函编号的列表!');
      } else {
        console.log(this.jqhbhArr);
        if (this.isAllEqual(this.jqhbhArr)) {
          if (this.ywzt == '10') {
            const params = {
              // jqhbh: this.jqhbhArr[0],
              // hjid: this.hjidArr[0],
              // hjid:'wddkjqh',
              hjid: this.jqhTemplateArr[0].dictValue,
              hjbh: this.jqhTemplateArr[0].dictLabel
            };
            const urlPath =
              process.env.VUE_APP_BASE_API +
              '/gjjwd/info/crateJqHj?' +
              'jqhbh=' +
              this.jqhbhArr[0] +
              '&hjid=' +
              this.hjidArr[0];
            window.open(urlPath, '_blank');
            // printJqh_api(params).then(res => {
            //
            // });
          } else {
            this.$message.warning('回款完成才能结清函打印!');
          }
        } else {
          this.$message.success('借款合同编号一致才能结清函打印!');
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
        fileMimetype: '9',
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
    // 回款确认
    handlesuccessHkqr(index, rows, res, file, fileList) {
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
    handleRemoveHkqr(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
    },
    handlePreviewHkqr(file) {
      console.log(file);
    },
    handleExceedHkqr(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveHkqr(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 公积金中心
    handlesuccessGjj(index, rows, res, file, fileList) {
      this.fileListArr[`fileListLoanData_${index}`].push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '11',
        glid: rows.ywId,
        uid: file.uid
      });
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
    beforeRemoveGjj(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
    },
    // 借款解押登记
    handlesuccessJkjy(index, rows, res, file, fileList) {
      this.fileListArr[`fileListLoanData_${index}`].push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '10',
        glid: rows.ywId,
        uid: file.uid
      });
    },
    handleRemoveJkjy(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
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
    // 借款结清登记
    handlesuccessJkdj(index, rows, res, file, fileList) {
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
    handleRemoveJkdj(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
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
    handlesuccessLoan(index, rows, res, file, fileList) {
      this.fileListArr[`fileListLoanData_${index}`].push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '8',
        glid: rows.ywId,
        uid: file.uid
      });
    },
    handleRemoveLoan(index, file, fileList) {
      let _index = '';
      console.log(file, fileList);
      this.fileListArr[`fileListLoanData_${index}`].map((item, index) => {
        if (item.uid === file.uid) _index = index;
      });
      this.fileListArr[`fileListLoanData_${index}`].splice(_index, 1);
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
    onSave() {
      const ywzt = this.ywztStatu;
      const wdywId = this.$route.query.id;
      if (ywzt == '2') {
        this.$refs.formWdzg.validate(async valid => {
          if (valid) {
            const params = {
              gjjdkzgshsj: this.addInfoWdzg.gjjdkzgshsj,
              gjjdkzgshbz: this.addInfoWdzg.gjjdkzgshbz,
              ywId: wdywId,
              uploadfiles: []
            };
            update_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功!');
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
            const params = {
              wdsjfksj: this.addInfoYwfk.wdsjfksj,
              wdsjfkzb: this.addInfoYwfk.wdsjfkzb,
              uploadFiles: arr,
              ywId: wdywId,
              sfasfk: '1'
            };

            if (
              params.uploadFiles[0] == null ||
              params.uploadFiles[0] == undefined
            ) {
              params.uploadFiles = [];
            }

            if (
              this.fileListLoanData == undefined &&
              this.fileListWdywtName == '' &&
              this.fileListIndentData.length == 0
            ) {
              this.$message.warning('请上传委贷业务放款资料!');
            } else {
              if (
                this.fileListWdywtName != '' ||
                this.fileListLoanData != undefined ||
                this.fileListIndentData.length != 0
              ) {
                update_info(params).then(response => {
                  if (response.code === 200) {
                    this.$message.success('保存成功!');
                    this.reload();
                  }
                });
              } else {
                this.$message.warning('请上传委贷业务放款资料!');
              }
            }
          }
        });
      }

      if (ywzt == '5') {
        this.$refs.sdjqForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListJkdjData);
            const params = {
              jkjqsj: this.addInfoSdjq.jkjqsj,
              jkjqzh: this.addInfoSdjq.jkjqzh,
              uploadFiles: this.fileListJkdjData || this.fileListSdjqData,
              ywId: wdywId
            };
            if (
              params.uploadFiles[0] == null ||
              params.uploadFiles[0] == undefined
            ) {
              // params.uploadFiles = [];
            }

            if (
              this.fileListJkdjData.length == 0 &&
              this.fileListSdjqName == '' &&
              this.fileListSdjqData.length == 0
            ) {
              this.$message.warning('请上传商贷结清资料!');
            } else {
              if (
                this.fileListSdjqName != '' ||
                this.fileListJkdjData.length == 0 ||
                this.fileListSdjqData.length != 0
              ) {
                update_info(params).then(response => {
                  if (response.code === 200) {
                    this.$message.success('保存成功!');
                    this.reload();
                  }
                });
              } else {
                this.$message.warning('请上传商贷结清资料!');
              }
            }

            // update_info(params).then(response => {
            //   if (response.code === 200) {
            //     this.$message.success('保存成功!');
            //     this.reload();
            //   }
            // });
          }
        });
      }

      if (ywzt == '6') {
        this.$refs.sdjyForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListJkjyData);
            const params = {
              jkjysj: this.addInfoSdjy.jkjysj,
              jkjybz: this.addInfoSdjy.jkjybz,
              uploadFiles: arr,
              ywId: wdywId
            };
            if (
              params.uploadFiles[0] == null ||
              params.uploadFiles[0] == undefined
            ) {
              params.uploadFiles = [];
            }
            update_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功!');
                this.reload();
              }
            });
          }
        });
      }

      if (ywzt == '7') {
        this.$refs.gjjForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListGjjData);
            const params = {
              gjjrysj: this.addInfoGjj.gjjrysj,
              gjjrybz: this.addInfoGjj.gjjrybz,
              uploadFiles: arr,
              ywId: wdywId
            };
            if (
              params.uploadFiles[0] == null ||
              params.uploadFiles[0] == undefined
            ) {
              params.uploadFiles = [];
            }
            update_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功!');
                this.reload();
              }
            });
          }
        });
      }

      if (ywzt == '8') {
        this.$refs.fksjForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListGjjData);
            const params = {
              gjjfksj: this.addInfoFksj.gjjfksj,
              gjjfkbz: this.addInfoFksj.gjjfkbz,
              ywId: wdywId,
              uploadfiles: []
            };
            update_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功!');
                this.reload();
              }
            });
          }
        });
      }

      if (ywzt == '9') {
        this.$refs.hkqrForm.validate(async valid => {
          if (valid) {
            const params = {
              hksj: this.addInfoHkqr.hksj,
              hkbz: this.addInfoHkqr.hkbz,
              ywId: wdywId,
              uploadfiles: []
            };
            update_info(params).then(response => {
              if (response.code === 200) {
                this.$message.success('保存成功!');
                this.reload();
              }
            });
          }
        });
      }
    },
    onSubmit() {
      const ywzt = this.ywztStatu;
      const wdywId = this.$route.query.id;
      const weywIdArr = [];
      weywIdArr.push(wdywId);
      if (ywzt == '2' || ywzt == '1') {
        if (
          this.addInfoWdzgTwo.gjjdkzgshsj != '' &&
          this.addInfoWdzgTwo.gjjdkzgshbz != ''
        ) {
          this.$refs.formWdzgTwo.validate(async valid => {
            if (valid) {
              // this.btnLoad = true;
              // const params = {
              //   gjjdkzgshsj: this.addInfoWdzg.gjjdkzgshsj,
              //   gjjdkzgshbz: this.addInfoWdzg.gjjdkzgshbz,
              //   ywId: wdywId,
              //   ywzt: ywzt
              // };
              // const params2 = {
              //   action: 'tjsq',
              //   actionName: '提交申请',
              //   flowKey: 'WDSH',
              //   ywIds: weywIdArr
              // };
              const arr = [];
              // arr.push(this.fileListLoanData);
              const batchArr = [];
              for (let i = 0; i < this.multipleSelection.length; i++) {
                batchArr.push({
                  ywId: this.multipleSelection[i].ywId,
                  ywzt: '1',
                  dklx: this.multipleSelection[i].dklx,
                  gjjdkzgshsj: this.addInfoWdzgTwo.gjjdkzgshsj,
                  gjjdkzgshbz: this.addInfoWdzgTwo.gjjdkzgshbz
                });
                var params = {};
                params = batchArr;
                // if (params[i].uploadFiles.length == 0) {
                //   delete params[i].uploadFiles;
                // }
              }
              // if (this.curMoney > this.dkjeMoney) {
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
              // } else {
              //   this.$message.warning(
              //     '当前资金池余额为:' + this.curMoney + '!,不能发起审核!'
              //   );
              //   this.btnLoad = false;
              // }
            }
          });
        } else {
          this.$message.warning('请完整填写表单!');
        }
      }
      if (ywzt == '4') {
        // const wdywId = this.$route.query.id;

        this.$refs.ywfkForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            var wdFile = true;
            for (let i = 0; i < this.multipleSelection.length; i++) {
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                wdsjfksj: this.addInfoYwfk.wdsjfksj,
                wdsjfkzb: this.addInfoYwfk.wdsjfkzb,
                sfasfk: '1',
                dkje: this.multipleSelection[i].dkje
              });
              var params = {};
              params = batchArr;
              if (params[i].uploadFiles.length == 0) {
                // 没有上传附件
                wdFile = false;
              } else {
                wdFile = true;
              }
            }

            if (!wdFile) {
              this.$message.warning('请上传委贷业务放款资料!');
            } else {
              batchRegister_api(params).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功!');
                  this.fileListArr = {};
                  this.openBatch = false;
                  this.$refs.queryTable.getList();
                  // this.$router.go(-1);
                }
              });
            }
          }
          // const params = {
          //   ywId: this.addInfoYwfk.wdsjfksj,
          //   wdsjfkzb: this.addInfoYwfk.wdsjfkzb,
          //   // yjjqsj: this.addInfoYwfk.yjjqsj,
          //   ywId: wdywId,
          //   ywzt: ywzt,
          //   dklx: this.$route.query.dklx,
          //   dkje: this.dkjeMoney,
          //   uploadFiles: arr,
          //   sfasfk: '1'
          // };
          // }
        });
      }
      // 借款结清登记
      if (ywzt == '5') {
        this.$refs.sdjqForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            var jkjqFile = true;
            for (let i = 0; i < this.multipleSelection.length; i++) {
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                jkjqsj: this.addInfoSdjq.jkjqsj,
                jkjqzh: this.addInfoSdjq.jkjqzh
              });
              var params = {};
              params = batchArr;
              if (params[i].uploadFiles.length == 0) {
                // 没有上传附件
                jkjqFile = false;
              } else {
                jkjqFile = true;
              }
            }

            if (!jkjqFile) {
              this.$message.warning('请上传商贷结清资料!');
            } else {
              console.log('提交');
              batchRegister_api(params).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功!');
                  this.fileListArr = {};
                  this.openBatch = false;
                  this.$refs.queryTable.getList();
                  // this.$router.go(-1);
                }
              });
            }

            // const params = {
            //   jkjqsj: this.addInfoSdjq.jkjqsj,
            //   jkjqzh: this.addInfoSdjq.jkjqzh,
            //   ywId: wdywId,
            //   ywzt: ywzt,
            //   uploadFiles: this.fileListJkdjData
            //   // dklx: '05'
            // };

            // const files = Object.keys(this.fileListJkdjData);

            // if (
            //   this.fileListJkdjData.length == 0 &&
            //   this.fileListSdjqName == '' &&
            //   this.fileListSdjqData.length == 0
            // ) {
            //   this.$message.warning('请上传商贷结清资料!');
            // } else {
            //   if (
            //     this.fileListSdjqName != '' ||
            //     this.fileListJkdjData.length == 0 ||
            //     this.fileListSdjqData.length != 0
            //   ) {
            //     register_info(params).then(response => {
            //       if (response.code === 200) {
            //         this.$message.success('操作成功!');
            //         this.$router.go(-1);
            //       }
            //     });
            //   } else {
            //     this.$message.warning('请上传商贷结清资料!');
            //   }
            // }
            //   if (
            //     params.uploadFiles[0] == null ||
            //     files.length == 0 ||
            //     this.fileListJkdjData == undefined
            //   ) {
            //     delete params.uploadFiles;
            //   }
            //   register_info(params).then(response => {
            //     if (response.code === 200) {
            //       this.$message.success('操作成功!');
            //       this.$router.go(-1);
            //     }
            //   });
          }
        });
      }
      // 借款解押登记
      if (ywzt == '6') {
        this.$refs.sdjyForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                jkjysj: this.addInfoSdjy.jkjysj,
                jkjybz: this.addInfoSdjy.jkjybz
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
                // this.$router.go(-1);
              }
            });

            // const arr = [];
            // arr.push(this.fileListJkjyData);
            // const params = {
            //   jkjysj: this.addInfoSdjy.jkjysj,
            //   jkjybz: this.addInfoSdjy.jkjybz,
            //   ywId: wdywId,
            //   ywzt: ywzt,
            //   uploadFiles: arr
            //   // dklx: '05'
            // };

            // const files = Object.keys(this.fileListJkjyData);
            // if (
            //   params.uploadFiles[0] == null ||
            //   files.length == 0 ||
            //   this.fileListJkjyData == undefined
            // ) {
            //   delete params.uploadFiles;
            // }
            // register_info(params).then(response => {
            //   if (response.code === 200) {
            //     this.$message.success('操作成功!');
            //     this.$router.go(-1);
            //   }
            // });
          }
        });
      }
      // 公积金中心入押登记
      if (ywzt == '7') {
        this.$refs.gjjForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                gjjrysj: this.addInfoGjj.gjjrysj,
                gjjrybz: this.addInfoGjj.gjjrybz
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
            // const arr = [];
            // arr.push(this.fileListGjjData);
            // const params = {
            //   gjjrysj: this.addInfoGjj.gjjrysj,
            //   gjjrybz: this.addInfoGjj.gjjrybz,
            //   ywId: wdywId,
            //   ywzt: ywzt,
            //   uploadFiles: arr
            //   // dklx: '05'
            // };

            // const files = Object.keys(this.fileListGjjData);
            // if (
            //   params.uploadFiles[0] == null ||
            //   files.length == 0 ||
            //   this.fileListGjjData == undefined
            // ) {
            //   delete params.uploadFiles;
            // }
            // register_info(params).then(response => {
            //   if (response.code === 200) {
            //     this.$message.success('操作成功!');
            //     this.$router.go(-1);
            //   }
            // });
          }
        });
      }
      // 放款时间
      if (ywzt == '8') {
        this.$refs.fksjForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                // uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                gjjfksj: this.addInfoFksj.gjjfksj,
                gjjfkbz: this.addInfoFksj.gjjfkbz
              });
              var params = {};
              params = batchArr;
              // if (params[i].uploadFiles.length == 0) {
              //   delete params[i].uploadFiles;
              // }
            }

            batchRegister_api(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.fileListArr = {};
                this.openBatch = false;
                this.$refs.queryTable.getList();
              }
            });
            //   const params = {
            //     gjjfksj: this.addInfoFksj.gjjfksj,
            //     gjjfkbz: this.addInfoFksj.gjjfkbz,
            //     ywId: wdywId,
            //     ywzt: ywzt
            //     // dklx: '05'
            //   };
            //   register_info(params).then(response => {
            //     if (response.code === 200) {
            //       this.$message.success('操作成功!');
            //       this.$router.go(-1);
            //     }
            //   });
          }
        });
      }

      // 回款时间
      if (ywzt == '9') {
        const wdywId = this.$route.query.id;
        this.$refs.hkqrForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);
            const batchArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              const warningStatus = Cookies.get('warningStatus111');
              batchArr.push({
                ywId: this.multipleSelection[i].ywId,
                ywzt: this.multipleSelection[i].ywzt,
                // uploadFiles: this.fileListArr[`fileListLoanData_${i}`],
                dklx: this.multipleSelection[i].dklx,
                hksj: this.addInfoHkqr.hksj,
                hkbz: this.addInfoHkqr.hkbz,
                dkje: this.multipleSelection[i].dkje,
                warning_status_111: warningStatus
              });
              var params = {};
              params = batchArr;
              // if (params[i].uploadFiles.length == 0) {
              //   delete params[i].uploadFiles;
              // }
            }

            batchRegister_api(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.fileListArr = {};
                this.openBatch = false;
                this.$refs.queryTable.getList();
              }
            });
            // const warningStatus = Cookies.get('warningStatus111');
            // const params = {
            //   hksj: this.addInfoHkqr.hksj,
            //   hkbz: this.addInfoHkqr.hkbz,
            //   ywId: wdywId,
            //   ywzt: ywzt,
            //   dklx: this.$route.query.dklx,
            //   dkje: this.dkjeMoney,
            //   warning_status_111: warningStatus
            //   // dklx: '05'
            // };
            // register_info(params).then(response => {
            //   if (response.code === 200) {
            //     this.$message.success('操作成功!');
            //     this.$router.go(-1);
            //   }
            // });
          }
        });
      }
    },
    // 判断数组中的值是否相等
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== array[0];
        });
      } else {
        return true;
      }
    },
    // 显示批量登记弹窗
    handleABatch() {
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        // this.getUseCapital();
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].hzflx == '1') {
            this.isBank = true;
          } else {
            this.isBank = false;
          }
        }
        if (
          (this.multipleSelection[0].gjjdkzgshsj != '' &&
            this.multipleSelection[0].gjjdkzgshsj != undefined) ||
          (this.multipleSelection[0].gjjdkzgshbz != '' &&
            this.multipleSelection[0].gjjdkzgshbz != undefined)
        ) {
          this.addInfoWdzgTwo.gjjdkzgshsj = this.multipleSelection[0].gjjdkzgshsj;
          this.addInfoWdzgTwo.gjjdkzgshbz = this.multipleSelection[0].gjjdkzgshbz;
        } else {
          this.addInfoWdzgTwo.gjjdkzgshsj = '';
          this.addInfoWdzgTwo.gjjdkzgshbz = '';
        }
        console.log('this.multipleSelection', this.multipleSelection);

        if (this.isAllEqual(this.ywztArr)) {
          if (this.ywztArr[0] == '3') {
            this.$message.warning(
              '您选择的业务正在流程审核中，暂不能进行批量登记！'
            );
            this.openWd = false;
          } else if (this.ywztArr[0] == '12') {
            this.$message.warning('您选择的业务已登记回款时间，请勿重复登记');
            this.openWd = false;
          } else if (this.ywztArr[0] == '13') {
            this.$message.warning('您选择的业务已登记回款时间，请勿重复登记');
            this.openWd = false;
          } else if (this.ywztArr[0] == '14') {
            this.$message.warning('您选择的业务已登记回款时间，请勿重复登记');
            this.openWd = false;
          } else if (this.ywztArr[0] == '15') {
            this.$message.warning('您选择的业务已登记回款时间，请勿重复登记');
            this.openWd = false;
          } else if (this.ywztArr[0] == '10') {
            this.$message.warning('您选择的业务已登记回款时间，请勿重复登记！');
            this.openWd = false;
          } else if (
            this.ywztArr[0] == '1' &&
            this.multipleSelection[0].gjjdkzgshsj == '' &&
            this.multipleSelection[0].gjjdkzgshsj == undefined
          ) {
            // this.$message.warning(
            //   '您选择的业务正在资格审核中，暂不能进行登记操作！'
            // );
            this.openWd = true;
          } else {
            if (this.isSelf) {
              this.ywztStatu = this.ywztArr[0];
              this.multipleSelection.map((item, index) => {
                this.$set(this.fileListArr, `fileListLoanData_${index}`, []);
              });
              this.openBatch = true;
              this.openWd = true;
            } else {
              this.$message.warning('只有本人发起的进件才能批量登记！');
            }
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
    getDictDatas() {
      this.hzflxOptions = this.$store.getters.dictData.partner_type;
      this.hzfOptions = this.$store.getters.dictData.partners;
    },
    // 资金申请
    handleApply() {
      this.applyShow = true;
      this.$refs.applyForm.dialogVisible = true;
      this.$refs.applyForm.resetForm();
    },
    getUseCapital() {
      useCapital(4).then(res => {
        this.curMoney = res.data.quota;
      });
    },
    // 发起审核
    processSubmit() {
      if (this.addFormData) {
        this.$refs.dataForm.validateFormFunc(msg => {
          if (msg) {
            if (
              this.wdzgshForm.gjjdkzgshsj == '' ||
              this.wdzgshForm.gjjdkzgshsj == undefined
              // this.wdzgshForm.gjjdkzgshbz == undefined ||
              // this.wdzgshForm.gjjdkzgshbz == ''
            ) {
              this.$message.warning('请填写委贷资格审核表单!');
            } else {
              if (this.addFormData.hyzk != '0') {
                if (
                  this.addFormData.gtjkrxm != '' &&
                  this.addFormData.gtjkrxm != undefined &&
                  this.addFormData.gtjkrsfz != '' &&
                  this.addFormData.gtjkrsfz != undefined
                ) {
                  this.$refs.dataForm.btnLoad = true;
                  for (let i = 0; i < this.arr2.length; i++) {
                    if (this.arr2[i].fileMimetype == '1') {
                      this.file1 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '2') {
                      this.file2 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '3') {
                      this.file3 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '4') {
                      this.file4 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '5') {
                      this.file5 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '6') {
                      this.file6 = true;
                      this.arr2[i].glid = this.id;
                    }
                    if (this.arr2[i].fileMimetype == '7') {
                      this.file7 = true;
                      this.arr2[i].glid = this.id;
                    }
                  }
                  this.addFormData.uploadFiles = this.arr2;
                  this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                  this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                  if (
                    this.file1 &&
                    this.file2 &&
                    this.file3 &&
                    this.file5 &&
                    this.file6 &&
                    this.file7
                  ) {
                    if (this.curMoney > this.addFormData.dkje) {
                      addProcess_api(this.addFormData).then(res => {
                        if (res.code === 200) {
                          this.$message.success('发起成功!');
                          this.$refs.dataForm.btnLoad = false;
                          this.open = false;
                          this.file1 = false;
                          this.file2 = false;
                          this.file3 = false;
                          this.file4 = false;
                          this.file5 = false;
                          this.file6 = false;
                          this.file7 = false;
                          this.$refs.queryTable.getList();
                          this.reload();
                        }
                        if (res.code == '-1') {
                          this.$message.warning(
                            '已首次申请，不能再次进行首次申请!'
                          );
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
                } else {
                  this.$message.warning('请填写共同借款人姓名和身份证号码!');
                }
              } else {
                // this.$refs.dataForm.btnLoad = true;
                for (let i = 0; i < this.arr2.length; i++) {
                  if (this.arr2[i].fileMimetype == '1') {
                    this.file1 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '2') {
                    this.file2 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '3') {
                    this.file3 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '4') {
                    this.file4 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '5') {
                    this.file5 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '6') {
                    this.file6 = true;
                    this.arr2[i].glid = this.id;
                  }
                  if (this.arr2[i].fileMimetype == '7') {
                    this.file7 = true;
                    this.arr2[i].glid = this.id;
                  }
                }
                this.addFormData.uploadFiles = this.arr2;
                this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                if (
                  this.file1 &&
                  this.file2 &&
                  this.file3 &&
                  this.file5 &&
                  this.file6 &&
                  this.file7
                ) {
                  if (this.curMoney > this.addFormData.dkje) {
                    addProcess_api(this.addFormData).then(res => {
                      if (res.code === 200) {
                        this.$message.success('发起成功!');
                        this.$refs.dataForm.btnLoad = false;
                        this.open = false;
                        this.file1 = false;
                        this.file2 = false;
                        this.file3 = false;
                        this.file4 = false;
                        this.file5 = false;
                        this.file6 = false;
                        this.file7 = false;
                        this.$refs.queryTable.getList();
                        this.reload();
                      }
                      if (res.code == '-1') {
                        this.$message.warning(
                          '已首次申请，不能再次进行首次申请!'
                        );
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
          } else {
            this.$message.warning('请先填写完整!');
          }
        });
      } else {
        this.$message.warning('请先保存!');
      }
    },
    clickRow(row) {
      Cookies.set('ywblyUser', row.blywyzh);
      Cookies.set('warningStatus111', row.warningStatus111);

      // if (this.ywzt == '11' || row.ywzt == '11') {
      //   this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      // } else if (this.ywzt == '12' || row.ywzt == '12') {
      //   this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      // } else if (this.ywzt == '13' || row.ywzt == '13') {
      //   this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      // } else if (this.ywzt == '14' || row.ywzt == '14') {
      //   this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      // } else if (this.ywzt == '15' || row.ywzt == '15') {
      //   this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      // } else {
      this.$router.push({
        path: '/add',
        query: {
          id: row.ywId,
          dklx: row.dklx
        }
      });
      // }
    },
    // select(selection, row) {
    //   if (selection.length > 1) {
    //     const del_row = selection.shift();
    //     this.$refs.queryParams.toggleRowSelection(del_row, false);
    //   }
    // },
    // selectAll(selection) {
    //   if (selection.length > 1) {
    //     selection.length = 1;
    //   }
    // },
    // 发起流程
    handleProcess() {
      if (this.id == '' || this.ids.length == 0 || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        this.getUseCapital();
        console.log('this.multipleSelection', this.multipleSelection);

        if (!this.ywztArr.some(item => item !== '2')) {
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
              for (let i = 0; i < this.multipleSelection.length; i++) {
                if (this.multipleSelection[i].dkje > this.curMoney) {
                  this.$message.warning(
                    '当前资金池余额为:' + this.curMoney + '!,不能发起审核!'
                  );
                  this.btnLoad = false;
                } else {
                  const params = {
                    action: 'tjsq',
                    actionName: '提交申请',
                    flowKey: 'WDSH',
                    ywIds: this.ids
                  };
                  process_api(params).then(res => {
                    this.$message.success('发起成功!');
                    this.$refs.queryTable.getList();
                    this.btnLoad = false;
                  });
                }
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
              this.btnLoad = false;
            });
        } else {
          this.$message.warning('待业务审核状态才能发起流程!');
          this.btnLoad = false;
        }
      }
    },
    delFileFunc(type, index) {
      if (type == 'sfzzm') {
        var fileId = this.imageUrlFrontData.fileId;
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
    getOprateList() {
      // const wdywId = this.id;
      const params = {
        pageNum: this.queryOprateParams.pageNum,
        pageSize: this.queryOprateParams.pageSize,
        wdywId: this.id
      };
      oprate_api(params).then(res => {
        this.dialogTableData = res.rows;
        this.total = res.total;
      });
    },
    // 获取附件信息
    getFileInfo() {
      const params = {
        glid: this.id
      };
      const wdywId = this.id;
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
                fileId: datas[i].id,
                glid: wdywId
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
                fileId: datas[i].id,
                glid: wdywId
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
                fileId: datas[i].id,
                glid: wdywId
              });
            }
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
                fileId: datas[i].id,
                glid: wdywId
              });
            }
          }
          // 服务合同
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '5') {
              this.fileListServiceName = datas[i].fileName;
              this.fileListServiceData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '5',
                fileId: datas[i].id,
                glid: wdywId
              };
            }
          }
          // 费用支付凭证
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '6') {
              this.fileListApplyName = datas[i].fileName;
              this.fileListApplyData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '6',
                fileId: datas[i].id,
                glid: wdywId
              };
            }
          }
          // 公积金审批表
          if (datas[i].fileMimetype != null) {
            if (datas[i].fileMimetype == '7') {
              this.fileListProvidentName = datas[i].fileName;
              this.fileListProvidentData = {
                fileName: datas[i].fileName,
                filePath: datas[i].filePath,
                filePostfix: datas[i].filePostfix,
                fileSize: datas[i].fileSize,
                fileMimetype: '7',
                fileId: datas[i].id,
                glid: wdywId
              };
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
                fileId: datas[i].id,
                glid: wdywId
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
                fileId: datas[i].id,
                glid: wdywId
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
                fileId: datas[i].id,
                glid: wdywId
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
                fileId: datas[i].id,
                glid: wdywId
              };
            }
          }
        }
      });
    },
    /** 查询【请填写功能名称】列表 */
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // getList() {
    //   listLog(this.queryParams).then(response => {
    //     this.getData = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },
    // 确认登记按钮
    addSubmit() {
      // var arr = [];
      // const files1 = Object.keys(this.imageUrlFrontData);
      // if (files1.length != 0) {
      //   arr.push(this.imageUrlFrontData);
      // }

      // const files2 = Object.keys(this.imageUrlReveseData);
      // if (files2.length != 0) {
      //   arr.push(this.imageUrlReveseData);
      // }

      // const files3 = Object.keys(this.fileListWatertData);
      // if (files3.length != 0) {
      //   arr.push(this.fileListWatertData);
      // }

      // const files4 = Object.keys(this.fileListIndentData);
      // if (files4.length != 0) {
      //   arr.push(this.fileListIndentData);
      // }

      // const files5 = Object.keys(this.fileListServiceData);
      // if (files5.length != 0) {
      //   arr.push(this.fileListServiceData);
      // }

      // const files6 = Object.keys(this.fileListApplyData);
      // if (files6.length != 0) {
      //   arr.push(this.fileListApplyData);
      // }

      // const files7 = Object.keys(this.fileListProvidentData);
      // if (files7.length != 0) {
      //   arr.push(this.fileListProvidentData);
      // }

      // arr.push(this.imageUrlReveseData);
      // arr.push(this.fileListProvidentData);
      // arr.push(this.fileListWatertData);
      // arr.push(this.fileListIndentData);
      // arr.push(this.fileListServiceData);
      // arr.push(this.fileListApplyData);

      if (this.dialogTit == '新增') {
        // this.$confirm('请确认附件是否无误，一旦保存后附件将不能修改!', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // })
        //   .then(() => {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].fileMimetype == '1') {
            this.file1 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '2') {
            this.file2 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '3') {
            this.file3 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '4') {
            this.file4 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '5') {
            this.file5 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '6') {
            this.file6 = true;
            this.arr2[i].glid = this.id;
          }
          if (this.arr2[i].fileMimetype == '7') {
            this.file7 = true;
            this.arr2[i].glid = this.id;
          }
        }
        this.$refs.dataForm.validateFormFunc(msg => {
          if (msg) {
            this.addFormData.uploadFiles = this.arr2;
            if (this.addFormData.hyzk != '0') {
              if (
                this.addFormData.gtjkrxm != '' &&
                this.addFormData.gtjkrxm != undefined &&
                this.addFormData.gtjkrsfz != '' &&
                this.addFormData.gtjkrsfz != undefined
              ) {
                // this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                // this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                if (
                  this.file1 &&
                  this.file2 &&
                  this.file3 &&
                  this.file5 &&
                  this.file6 &&
                  this.file7
                ) {
                  if (this.addFormData.hzflx == '2') {
                    if (
                      this.addFormData.jqhbh != '' &&
                      this.addFormData.jqhbh != undefined &&
                      this.addFormData.hjid != '' &&
                      this.addFormData.hjid != undefined
                    ) {
                      addLog(this.addFormData).then(response => {
                        if (response.code === 200) {
                          this.$message.success('新增成功!');
                          this.open = false;
                          this.file1 = false;
                          this.file2 = false;
                          this.file3 = false;
                          this.file4 = false;
                          this.file5 = false;
                          this.file6 = false;
                          this.file7 = false;
                          this.$refs.queryTable.getList();
                          this.reload();
                        }
                      });
                    } else {
                      this.$message.warning('请填写!');
                    }
                  } else {
                    if (this.addFormData.hzflx == '2') {
                      if (
                        this.addFormData.jqhbh != '' &&
                        this.addFormData.jqhbh != undefined &&
                        this.addFormData.hjid != '' &&
                        this.addFormData.hjid != undefined
                      ) {
                        addLog(this.addFormData).then(response => {
                          if (response.code === 200) {
                            this.$message.success('新增成功!');
                            this.open = false;
                            this.file1 = false;
                            this.file2 = false;
                            this.file3 = false;
                            this.file4 = false;
                            this.file5 = false;
                            this.file6 = false;
                            this.file7 = false;
                            this.$refs.queryTable.getList();
                            this.reload();
                          }
                        });
                      } else {
                        this.$message.warning('请填写!');
                      }
                    } else {
                      // this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                      // this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                      addLog(this.addFormData).then(response => {
                        if (response.code === 200) {
                          this.$message.success('新增成功!');
                          this.open = false;
                          this.file1 = false;
                          this.file2 = false;
                          this.file3 = false;
                          this.file4 = false;
                          this.file5 = false;
                          this.file6 = false;
                          this.file7 = false;
                          this.$refs.queryTable.getList();
                          this.reload();
                        }
                      });
                    }
                  }
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
                console.log(this.file1);
                if (this.addFormData.hzflx == '2') {
                  if (
                    this.addFormData.jqhbh != '' &&
                    this.addFormData.jqhbh != undefined &&
                    this.addFormData.hjid != '' &&
                    this.addFormData.hjid != undefined
                  ) {
                    this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                    this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                    addLog(this.addFormData).then(response => {
                      if (response.code === 200) {
                        this.$message.success('新增成功!');
                        this.open = false;
                        this.file1 = false;
                        this.file2 = false;
                        this.file3 = false;
                        this.file4 = false;
                        this.file5 = false;
                        this.file6 = false;
                        this.file7 = false;
                        this.$refs.queryTable.getList();
                        this.reload();
                      }
                    });
                  } else {
                    this.$message.warning('请填写!');
                  }
                } else {
                  this.addFormData.gjjdkzgshsj = this.wdzgshForm.gjjdkzgshsj;
                  this.addFormData.gjjdkzgshbz = this.wdzgshForm.gjjdkzgshbz;
                  addLog(this.addFormData).then(response => {
                    if (response.code === 200) {
                      this.$message.success('新增成功!');
                      this.open = false;
                      this.file1 = false;
                      this.file2 = false;
                      this.file3 = false;
                      this.file4 = false;
                      this.file5 = false;
                      this.file6 = false;
                      this.file7 = false;
                      this.$refs.queryTable.getList();
                      this.reload();
                    }
                  });
                }
              } else {
                this.$message.warning('请上传附件!');
                this.$refs.dataForm.btnLoad = false;
              }
            }
          } else {
            this.$message.warning('请填写完整！');
          }
        });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
      } else if (this.dialogTit == '修改') {
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
              update_info(this.addFormData).then(response => {
                if (response.code === 200) {
                  this.$message.success('修改成功!');
                  this.open = false;
                  this.$refs.queryTable.getList();
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
            this.$message.success('请填写完整!');
          }
        });

        // this.addFormData.jkrzjlx = this.$selectDictLabel(
        //   this.$store.getters.dictData.loan_type || [],
        //   response.data.jkrzjlx
        // );
        // if (this.$refs.dataFoem.validateFormFunc()) {
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.jkrzjlx)) {
        //   this.addFormData.jkrzjlx = this.formDataEdit.jkrzjlx;
        //   console.log('this.addFormData.jkrzjlx', this.addFormData.jkrzjlx);
        //   console.log('this.formDataEdit.jkrzjlx', this.formDataEdit.jkrzjlx);
        // }
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.gtjkrzjlx)) {
        //   this.addFormData.gtjkrzjlx = this.formDataEdit.gtjkrzjlx;
        // }
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.gfcs)) {
        //   this.addFormData.gfcs = this.formDataEdit.gfcs;
        // }
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.dylx)) {
        //   this.addFormData.dylx = this.formDataEdit.dylx;
        // }
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.hkfs)) {
        //   this.addFormData.hkfs = this.formDataEdit.hkfs;
        // }
        // if (!/^[\u4e00-\u9fa5]{1,}$/.test(this.formDataEdit.dklx)) {
        //   this.addFormData.dklx = this.formDataEdit.dklx;
        // }
        // console.log(this.addFormData);
        // console.log(this.formDataEdit);
        // update_info(this.addFormData).then(response => {
        //   if (response.code === 200) {
        //     this.$message.success('修改成功!');
        //     this.open = false;
        //     this.$refs.queryTable.getList();
        //   }
        // });
        // }
      }
    },
    // 表单重置
    reset() {
      this.form = {
        wdywId: null,
        title: null,
        jkrxm: null,
        jkrzjlx: null,
        jkrsfz: null,
        gtjkrxm: null,
        // gtjkrzjlx: null,
        gtjkrsfz: null,
        // lpmc: null,
        // htbh: null,
        fwzl: null,
        // szqy: null,
        fwzj: null,
        // sfkje: null,
        // sfkbl: null,
        fwjcmj: null,
        // gfcs: null,
        // dylx: null,
        dkje: null,
        // dkqx: null,
        // nll: null,
        // hkfs: null,
        // myhkje: null,
        // qtyjfz: null,
        // jtpjysr: null,
        // fzbl: null,
        // wtyh: null,
        blywd: null,
        gjjdkzgshsj: null,
        ywzt: null,
        cwfksj: null,
        cwfkbz: null,
        wdsjfksj: null,
        wdsjfkzb: null,
        jkjqsj: null,
        jkjqzh: null,
        jkjysj: null,
        jkjybz: null,
        gjjrysj: null,
        gjjrybz: null,
        hksj: null,
        hkbz: null,
        sfasfk: null,
        ywjkts: null,
        cjsj: null,
        blywyzh: null,
        blywymc: null,
        ztzt: null
      };
      // this.resetForm('form');
    },
    certTypeOptions() {
      return this.$store.getters.dictData.cert_type || [];
    },
    handleSelectCacle(row, column, event) {},
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.hzfTypeArr = val.map(item => item.hzflx);
      this.ids = val.map(item => item.ywId);
      this.jkrxmArr = val.map(item => item.jkrxm);
      this.id = this.ids[0];
      this.ywztArr = val.map(item => item.ywzt);
      this.ywzt = this.ywztArr[0];
      const dklxArr = val.map(item => item.dklx);
      this.dklx = dklxArr[0];
      const dkjeArr = val.map(item => item.dkje);
      this.dkje = dkjeArr[0];
      const blywyzhArr = val.map(item => item.blywyzh);
      this.blywyzh = blywyzhArr[0];
      const warningStatusArr = val.map(item => item.warningStatus111);
      this.warningStatus111 = warningStatusArr[0];
      this.single = val.length !== 1;
      this.jqhbhArr = val.map(item => item.jqhbh);
      this.hjidArr = val.map(item => item.hjid);
      console.log('ids', this.ids);
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
    },
    // 获取结清函编号
    getLetter() {
      letter_api().then(res => {
        const result = res.data;
        for (let i = 0; i < result.length; i++) {
          this.letterArr.push({
            dictValue: result[i],
            dictLabel: result[i]
          });
        }
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
          // this.templateNo=result[0].templateNo
          this.jqhTemplateArr.push({
            dictValue: result[i].templateNo,
            dictLabel: result[i].templateName
          });
        }
        console.log('this.jqhTemplateArr', this.jqhTemplateArr);
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.getDictDatas();
      this.dialogTit = '新增';
      // this.addFormList.dklx = '05';
      this.arr2 = [];
      this.arrUpdata = [];
      this.addFormData = {
        hzflx: '',
        hzf: ''
      };
      this.imageUrlFront = '';
      this.imageUrlFrontId = '';
      this.imageUrlFrontData = {};
      this.imageUrlFrontName = '';
      this.fileListFront = [];
      this.fileListRevese = [];
      this.imageUrlRevese = '';
      this.imageUrlReveseData = {};
      this.imageUrlReveseId = '';
      this.imageUrlReveseName = '';
      this.fileListWaterName = '';
      this.fileListIndentName = '';
      this.fileListServiceName = '';
      this.fileListApplyName = '';
      this.fileListProvidentName = '';
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
      this.wdzgshForm = [];
      this.getUseCapital();
      // this.wdzgshForm.gjjdkzgshsj = "";
      // this.wdzgshForm.gjjdkzgshbz = "";
    },
    handleRecord() {
      //  else if (this.ywzt == '11') {
      //     this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      //   } else if (this.ywzt == '12') {
      //     this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      //   } else if (this.ywzt == '13') {
      //     this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      //   } else if (this.ywzt == '14') {
      //     this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      //   } else if (this.ywzt == '15') {
      //     this.$message.warning('您选择的业务已登记回款时间，请勿重复登记!');
      //   }
      if (this.id == '' || this.id == undefined) {
        this.$message.warning('请先选中列表!');
      } else {
        if (this.ywzt == '3') {
          this.$message.warning(
            '您选择的业务正在流程审核中，不能进行登记操作！'
          );
        } else {
          Cookies.set('ywblyUser', this.blywyzh);
          Cookies.set('warningStatus111', this.warningStatus111);
          this.$router.push({
            path: '/add',
            query: {
              id: this.id,
              dklx: this.dklx
            }
          });
        }
      }
    },
    // 操作日志
    handleLog() {
      const wdywId = this.id;
      if (wdywId == '' || wdywId == undefined) {
        this.$message.warning('请先选中列表');
      } else {
        this.openOprate = true;
        const params = {
          pageNum: this.queryOprateParams.pageNum,
          pageSize: this.queryOprateParams.pageSize,
          wdywId: wdywId
        };
        oprate_api(params).then(res => {
          this.dialogTableData = res.rows;
          this.total = res.total;
        });
      }
    },
    // 查看详情
    // handleDetail() {
    //   const wdywId = this.id;
    //   if (wdywId == '' || wdywId == undefined) {
    //     this.$message.warning('请先选中列表');
    //   } else {
    //     this.openDetails = true;
    //     getLog(wdywId).then(res => {
    //       this.detailData = res.data;
    //       this.ywztStatu = res.data.ywzt;
    //     });
    //     const params = {
    //       glid: wdywId
    //     };
    //     this.fileListWaterData = [];
    //     this.fileListIndentData = [];
    //     this.fileListServiceData = [];
    //     this.fileListApplyData = [];
    //     this.fileListProvidentData = [];
    //     getFile_api(params).then(res => {
    //       const datas = res.rows;
    //       for (let i = 0; i < datas.length; i++) {
    //         // 身份证正面
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '1') {
    //             this.imageUrlFront = datas[i].filePath;
    //             this.imageUrlFrontId = datas[i].id;
    //             this.imageUrlFrontData = {
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '1',
    //               fileId: datas[i].id
    //             };
    //           }
    //         }
    //         // 身份证反面
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '2') {
    //             this.imageUrlRevese = datas[i].filePath;
    //             this.imageUrlReveseId = datas[i].id;
    //             this.imageUrlReveseData = {
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '2',
    //               fileId: datas[i].id
    //             };
    //           }
    //         }
    //         // 银行还款流水
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '3') {
    //             this.fileListWaterName = datas[i].fileName;
    //             this.fileListWaterData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '3',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }
    //         // 委贷合同
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '4') {
    //             this.fileListIndentName = datas[i].fileName;
    //             this.fileListIndentData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '4',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }
    //         // 服务合同
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '5') {
    //             this.fileListServiceName = datas[i].fileName;
    //             this.fileListServiceData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '5',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }
    //         // 费用支付凭证
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '6') {
    //             this.fileListApplyName = datas[i].fileName;
    //             this.fileListApplyData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '6',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }
    //         // 公积金审批表
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '7') {
    //             this.fileListProvidentName = datas[i].fileName;
    //             this.fileListProvidentData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '7',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }

    //         // 委贷业务放款
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '8') {
    //             this.fileListWdywtName = datas[i].fileName;
    //             this.fileListWdywData = {
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '8',
    //               fileId: datas[i].id
    //             };
    //           }
    //         }

    //         // 商贷结清登记
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '9') {
    //             this.fileListSdjqName = datas[i].fileName;
    //             this.fileListSdjqData = {
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '9',
    //               fileId: datas[i].id
    //             };
    //           }
    //         }

    //         // 商贷解押登记
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '10') {
    //             this.fileListSdjyName = datas[i].fileName;
    //             this.fileListSdjyData = {
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '10',
    //               fileId: datas[i].id
    //             };
    //           }
    //         }

    //         // 公积金中心入押登记
    //         if (datas[i].fileMimetype != null) {
    //           if (datas[i].fileMimetype == '11') {
    //             this.fileListGjjRyName = datas[i].fileName;
    //             this.fileListGjjRyData.push({
    //               fileName: datas[i].fileName,
    //               filePath: datas[i].filePath,
    //               filePostfix: datas[i].filePostfix,
    //               fileSize: datas[i].fileSize,
    //               fileMimetype: '11',
    //               fileId: datas[i].id
    //             });
    //           }
    //         }
    //       }
    //     });
    //   }
    // },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.dialogTit = '修改';
      // this.arr2 = [];
      this.arrUpdata = [];
      console.log('附件的总数:', this.arr2);

      const wdywId = this.id;
      if (wdywId == '' || wdywId == undefined) {
        this.$message.warning('请先选中列表');
      } else {
        if (this.ywzt != '1') {
          this.$message.warning('业务申请状态才能修改');
        } else {
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
        }
      }
      // this.reset();
      // const wdywId = row.wdywId || this.ids;
      // getInfo(wdywId).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = '修改【请填写功能名称】';
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.wdywId != null) {
            updateInfo(this.form).then(response => {
              this.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addInfo(this.form).then(response => {
              this.msgSuccess('新增成功');
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const wdywIds = row.ywId || this.ids;
      this.$confirm(
        '是否确认删除【请填写功能名称】编号为"' + wdywIds + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delInfo(wdywIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.exportLoading = true;
          return exportInfo(queryParams);
        })
        .then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    // 保存附件
    // 身份证反面面
    handleAvatarSuccessRevese(res, file) {
      if (this.dialogTit == '修改') {
        this.imageUrlReveseId = '';
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '2',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '2',
          uid: file.uid
        });
      }
      this.imageUrlRevese = URL.createObjectURL(file.raw);
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
        if (this.arr2[i].uid == file.uid) {
          // delete this.arr2[i];
          this.arr2.splice(i, 1);
        }
      }
    },
    // 身份证正面
    handleAvatarSuccessFront(res, file) {
      if (this.dialogTit == '修改') {
        this.imageUrlFrontId = '';
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '1',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '1',
          uid: file.uid
        });
      }
      this.imageUrlFront = URL.createObjectURL(file.raw);
    },
    handleFrontRemove(file, fileList) {
      for (let i = 0; i < this.arr2.length; i++) {
        if (this.arr2[i].uid == file.uid) {
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
      if (this.dialogTit == '修改') {
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '7',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '7',
          uid: file.uid
        });
      }
    },
    handleRemoveProvident(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].uid == file.uid) {
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
      const path = encodeURIComponent(file.response.data[0].filePath);
      const url =
        process.env.VUE_APP_BASE_API +
        '/gjjwd/info/byFilePathDownload?' +
        'filePath=' +
        path;
      location.href = url;
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
        if (this.dialogTit == '修改') {
          this.arrUpdata.push({
            fileName: res.data[0].fileName,
            filePath: res.data[0].filePath,
            filePostfix: res.data[0].filePostfix,
            fileSize: res.data[0].fileSize,
            fileMimetype: '3',
            glid: this.id
          });
        } else {
          this.arr2.push({
            fileName: res.data[0].fileName,
            filePath: res.data[0].filePath,
            filePostfix: res.data[0].filePostfix,
            fileSize: res.data[0].fileSize,
            fileMimetype: '3',
            uid: file.uid
          });
        }
        this.fileListWatertData.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '3'
        });
      }
      console.log('银行还款流水', this.arr2);
    },
    handleRemoveWater(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].uid == file.uid) {
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
      // let filePath=file.response.data[0].filePath;
      // let path=encodeURIComponent(file.response.data[0].filePath)
      // let path= filePath.replace("/", ",");
      // let params={
      //   filePath:path
      // }
      // preview_api(params).then(res=>{
      //

      // })
      const path = encodeURIComponent(file.response.data[0].filePath);
      const url =
        process.env.VUE_APP_BASE_API +
        '/gjjwd/info/byFilePathDownload?' +
        'filePath=' +
        path;
      location.href = url;
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

      if (this.dialogTit == '修改') {
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '4',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '4',
          uid: file.uid
        });
      }
    },
    handleRemoveIndent(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].uid == file.uid) {
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
      const path = encodeURIComponent(file.response.data[0].filePath);
      const url =
        process.env.VUE_APP_BASE_API +
        '/gjjwd/info/byFilePathDownload?' +
        'filePath=' +
        path;
      location.href = url;
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

      if (this.dialogTit == '修改') {
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '5',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '5',
          uid: file.uid
        });
      }
    },
    handleRemoveService(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].uid == file.uid) {
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
      const path = encodeURIComponent(file.response.data[0].filePath);
      const url =
        process.env.VUE_APP_BASE_API +
        '/gjjwd/info/byFilePathDownload?' +
        'filePath=' +
        path;
      location.href = url;
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

      if (this.dialogTit == '修改') {
        this.arrUpdata.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '6',
          glid: this.id
        });
      } else {
        this.arr2.push({
          fileName: res.data[0].fileName,
          filePath: res.data[0].filePath,
          filePostfix: res.data[0].filePostfix,
          fileSize: res.data[0].fileSize,
          fileMimetype: '6',
          uid: file.uid
        });
      }
    },
    handleRemoveApply(file, fileList) {
      console.log(file, fileList);
      if (this.dialogTit == '新增') {
        for (let i = 0; i < this.arr2.length; i++) {
          if (this.arr2[i].uid == file.uid) {
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
      const path = encodeURIComponent(file.response.data[0].filePath);
      const url =
        process.env.VUE_APP_BASE_API +
        '/gjjwd/info/byFilePathDownload?' +
        'filePath=' +
        path;
      location.href = url;
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
.fileRow {
  height: 80px;
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
    height: 40px;
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
.title {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 15px;
  text-align: left;
}
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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
.wdyw .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  font-weight: bold;
}
.addDialog {
  padding: 20px;
  padding-bottom: 35px;
}
.addDialog .el-dialog__body {
  padding-bottom: 80px;
}
.addDialog .saveBtn {
  position: absolute;
  bottom: -265px;
}
.addDialog .processBtn {
  position: absolute;
  bottom: -265px;
  margin-left: 200px;
}
</style>
<style>
.area .el-textarea__inner {
  width: 320px;
}
</style>
