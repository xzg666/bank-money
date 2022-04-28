<template>
  <div class="app-container">
    <!--基本信息-->
    <div v-if="isSelf">
      <div v-if="ywztStatu == '1'" class="area">
        <div class="title">
          业务信息
        </div>
        <div>
          <edit v-if="ywztStatu == '1'"></edit>
          <!-- <details-info  v-if="$route.query.ywzt!='1'">></details-info> -->
        </div>
      </div>
      <div v-show="2 == ywztStatu" class="area">
        <div class="title">
          委贷资格审核
        </div>
        <div class="basic-info">
          <div style="padding-left:25px">
            <el-form
              ref="formWdzg"
              :model="addInfoWdzg"
              :rules="wdzgRules"
              label-width="150px"
              label-position="right"
              :inline="true"
            >
              <!--委贷资格审核-->
              <div v-if="ywztStatu == '2'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公积金审批时间：" prop="gjjdkzgshsj">
                      <el-date-picker
                        v-model="addInfoWdzg.gjjdkzgshsj"
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
                        v-model="addInfoWdzg.gjjdkzgshbz"
                        type="textarea"
                        placeholder="请输入"
                        width="400px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-if="ywztStatu == '2'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button
type="primary"
:loading="btnLoad"
@click="onSubmit"
>发起审核</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <div v-if="ywztStatu == '3'" style="font-size:18px">
        您已提交业务审核流程！
      </div>
      <div v-if="ywztStatu == '10'" style="font-size:18px">
        流程已完成！
      </div>
      <!-- <div v-if="ywztStatu > 11 && hzfType == '1'" style="font-size:18px">
        银行贷款流程已完成！
      </div> -->
      <div v-show="4 == ywztStatu" class="area">
        <div class="title">
          委贷业务放款
        </div>
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
                      >
                      </el-date-picker>
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
                  <el-col :span="24">
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
                      <!-- <p>{{ fileListWdywtName }}</p> -->
                      <!-- <p v-for></p> -->
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

                  <!-- <el-col :span="12">
                  <el-form-item label="预计结清时间：" prop="yjjqsj">
                    <el-date-picker
                      v-model="addInfoYwfk.yjjqsj"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col> -->
                </el-row>
              </div>
              <div v-if="ywztStatu == '4'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商业结清登记--->
      <div v-show="5 == ywztStatu" class="area">
        <div class="title">
          商贷结清登记
        </div>
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
                      >
                      </el-date-picker>
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
                <el-row>
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
                        :on-remove="handleRemoveJkdj"
                        :on-success="handlesuccessJkdj"
                        :before-remove="beforeRemoveJkdj"
                        :limit="3"
                        :on-exceed="handleExceedJkdj"
                        :file-list="fileListJkdj"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <!-- <p>{{ fileListSdjqName }}</p> -->
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
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--商贷解押登记--->
      <div v-show="6 == ywztStatu" class="area">
        <div class="title">
          商贷解押登记
        </div>
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
                      >
                      </el-date-picker>
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
                <el-row>
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
                        :on-remove="handleRemoveJkjy"
                        :on-success="handlesuccessJkjy"
                        :before-remove="beforeRemoveJkjy"
                        :limit="3"
                        :on-exceed="handleExceedJkjy"
                        :file-list="fileListJkjy"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <!-- <p>{{ fileListSdjyName }}</p> -->
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

              <div v-if="ywztStatu == '6'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--公积金入押登记--->
      <div v-show="7 == ywztStatu" class="area">
        <div class="title">
          公积金中心入押登记
        </div>
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
                      >
                      </el-date-picker>
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
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公积金入押资料：">
                      <el-upload
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewGjj"
                        :on-remove="handleRemoveGjj"
                        :on-success="handlesuccessGjj"
                        :before-remove="beforeRemoveGjj"
                        :limit="3"
                        :on-exceed="handleExceedGjj"
                        :file-list="fileListGjj"
                      >
                        <el-button
size="small"
type="primary"
>点击上传</el-button>
                      </el-upload>
                      <!-- <p>{{ fileListGjjRyName }}</p> -->
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

              <div v-if="ywztStatu == '7'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--放款时间登记--->
      <div v-show="8 == ywztStatu" class="area">
        <div class="title">
          公积金放款时间登记
        </div>
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
                  <el-col :span="12">
                    <el-form-item label="放款时间：" prop="gjjfksj">
                      <el-date-picker
                        v-model="addInfoFksj.gjjfksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="gjjfksjPicker"
                      >
                      </el-date-picker>
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

              <div v-if="ywztStatu == '8'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--回款确认登记--->
      <div v-show="9 == ywztStatu" class="area">
        <div class="title">
          回款确认登记
        </div>
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
                  <el-col :span="12">
                    <el-form-item label="回款时间：" prop="hksj">
                      <el-date-picker
                        v-model="addInfoHkqr.hksj"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="hksjPicker"
                      >
                      </el-date-picker>
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
                <!-- <el-row v-if="hzfType == '1'">
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
                        :limit="3"
                        :file-list="fileListHkqr"
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
                </el-row> -->
              </div>

              <div v-if="ywztStatu == '9'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!--长银放款登记--->
      <!-- <div v-show="9 == ywztStatu && hzfType == '1'" class="area">
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
                <el-row v-if="hzfType == '1'">
                  <el-col :span="12">
                    <el-form-item label="附件：" :required="true">
                      <el-upload
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewCyfk"
                        :on-remove="handleRemoveCyfk"
                        :on-success="handlesuccessCyfk"
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

              <div v-if="ywztStatu == '10'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div> -->

      <!--银行回款登记--->
      <!-- <div v-show="9 == ywztStatu && hzfType == '1'" class="area">
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
                <el-row v-if="hzfType == '1'">
                  <el-col :span="12">
                    <el-form-item label="附件：" :required="true">
                      <el-upload
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :headers="headers"
                        name="files"
                        :on-preview="handlePreviewYhhk"
                        :on-remove="handleRemoveYhhk"
                        :on-success="handlesuccessYhhk"
                        :file-list="fileListGjj"
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

              <div v-if="ywztStatu == '11'">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="returnFunc()">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="isSelf == false" style="font-size:18px">
      只有本人发起的进件才能修改登记！
    </div>
    <div v-if="ywztStatu == '11' && isSelf == true" style="font-size:18px">
      银行回款登记请到银行业务回款页面进行登记！
    </div>
    <div v-if="ywztStatu == '12' && isSelf == true" style="font-size:18px">
      银行回款登记请到银行业务回款页面进行登记！
    </div>
    <div v-if="ywztStatu == '13' && isSelf == true" style="font-size:18px">
      银行回款登记请到银行业务回款页面进行登记！
    </div>
    <div v-if="ywztStatu == '14' && isSelf == true" style="font-size:18px">
      银行回款登记请到银行业务回款页面进行登记！
    </div>
    <div v-if="ywztStatu == '15' && isSelf == true" style="font-size:18px">
      银行回款登记请到银行业务回款页面进行登记！
    </div>
  </div>
</template>

<script>
import DataForm from '@/components/DataForm';
import Edit from './Edit';
import detailsInfo from './detailsInfo';
import {
  addLog,
  saveFile_api,
  getLog,
  getFile_api,
  update_info,
  register_info,
  download_info,
  addProcess_api,
  process_api
} from '@/api/committe/index';
import { getToken } from '@/utils/auth';
import { getUserName } from '@/utils/auth';
import { useCapital, begainProcess } from '@/api/committe/apply';
import Cookies from 'js-cookie';
export default {
  name: 'UpdataAdd',
  components: {
    DataForm,
    Edit,
    detailsInfo
  },
  inject: ['reload'],
  data() {
    return {
      curMoney: '',
      btnLoad: false,
      isSelf: false,
      fileListWaterData: [],
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
        gjjdkzgshsj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // gjjdkzgshbz: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      ywfkRules: {
        wdsjfksj: [{ required: true, message: '请选择', trigger: 'blur' }]
        // wdsjfkzb: [{ required: true, message: '请输入', trigger: 'blur' }]
        // yjjqsj: [{ required: true, message: '请选择', trigger: 'blur' }]
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
      fileListWdywtName: '',
      fileListWdywData: [],
      fileListSdjqName: '',
      fileListSdjqData: [],
      fileListSdjyName: '',
      fileListSdjyData: [],
      fileListGjjRyName: '',
      fileListGjjRyData: [],
      fileListRes: {},
      ywztStatu: '',
      fileListLoan: {},
      fileListJkdj: {},
      fileListJkdjData: [],
      fileListJkjy: [],
      fileListJkjyData: [],
      fileListGjjData: [],
      addInfo: {},
      addInfoWdzg: {
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
      detailData: {},
      DkData: {},
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
      fileListLoanData: [],
      // 费用支付凭证
      fileLisApply: {},
      fileListApplyData: [],
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      gjjShow: false,
      ywStatus: '',
      dkjeMoney: '',
      hzfType: '',
      fileListHkqr: [],
      fileListCyfk: [],
      fileListYhhk: [],
      wdsjfksjPicker: {
        disabledDate: date => {
          if (this.detailData.gjjdkzgshsj != '') {
            return date < new Date(this.detailData.gjjdkzgshsj);
          }
        }
      },
      jkjqsjPicker: {
        disabledDate: date => {
          if (this.detailData.wdsjfksj != '') {
            return date < new Date(this.detailData.wdsjfksj);
          }
        }
      },
      jkjysjPicker: {
        disabledDate: date => {
          if (this.detailData.jkjqsj != '') {
            return date < new Date(this.detailData.jkjqsj);
          }
        }
      },
      gjjrysjPicker: {
        disabledDate: date => {
          if (this.detailData.jkjysj != '') {
            return date < new Date(this.detailData.jkjysj);
          }
        }
      },
      gjjfksjPicker: {
        disabledDate: date => {
          if (this.detailData.gjjrysj != '') {
            return date < new Date(this.detailData.gjjrysj);
          }
        }
      },
      hksjPicker: {
        disabledDate: date => {
          if (this.detailData.gjjfksj != '') {
            return date < new Date(this.detailData.gjjfksj);
          }
        }
      }
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
        {
          label: '共同借款人证件类型',
          model: 'gtjkrzjlx',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.cert_type || []
        },
        { label: '共同借款人证件号码', model: 'gtjkrsfz', show: true },
        { label: '楼盘名称', model: 'lpmc', show: true },
        { label: '合同备案号', model: 'htbh', show: true },
        { label: '房屋坐落', model: 'fwzl', show: true },
        { label: '所在区域', model: 'szqy', show: true },
        { label: '房屋总价', model: 'fwzj', show: true },
        { label: '首付款', model: 'sfkje', show: true },
        { label: '首付款比例', model: 'sfkbl', show: true },
        { label: '建筑面积', model: 'fwjcmj', show: true },
        {
          label: '购房次数',
          model: 'gfcs',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.num_house_dict || []
        },
        {
          label: '抵押类型',
          model: 'dylx',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.mortgage_type_dict || []
        },
        { label: '贷款金额', model: 'dkje', show: true },
        { label: '贷款期限', model: 'dkqx', show: true },
        { label: '年利率', model: 'nll', show: true },
        {
          label: '还款方式',
          model: 'hkfs',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.repayment_type || []
        },
        { label: '每月还款金额', model: 'myhkje', show: true },
        { label: '其他月均负债', model: 'qtyjfz', show: true },
        { label: '家庭月平均收入', model: 'jtpjysr', show: true },
        { label: '负债比', model: 'fzbl', show: true },
        { label: '委托银行', model: 'wtyh', show: true },
        {
          label: '贷款类型',
          model: 'dklx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.loan_type || [],
          show: true
        },
        {
          label: '合作方',
          model: 'hzf',
          type: 'select',
          show: true,
          dictOptions: this.$store.getters.dictData.partners || []
        },
        {
          label: '合作方类型',
          model: 'hzflx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.partner_type || []
        }
      ];
    }
  },
  mounted() {
    // this.ywztStatu = Number(this.ywztStatu);
    this.getUseCapital();
    const userName = getUserName();
    const blywy = Cookies.get('ywblyUser');
    if (userName == blywy) {
      this.isSelf = true;
    } else {
      this.isSelf = false;
    }
    console.log(this.ywztStatu);
    const wdywId = this.$route.query.id;
    const ywzt = this.ywztStatu;
    if (
      this.addInfoYwfk.wdsjfksj != '' ||
      this.addInfoYwfk.wdsjfksj != undefined
    ) {
      this.getTime();
    }

    getLog(wdywId).then(res => {
      this.detailData = res.data;
      this.ywUser = res.data.blywyzh;
      this.ywztStatu = res.data.ywzt;
      this.dkjeMoney = res.data.dkje;
      this.hzfType = res.data.hzflx;
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
          if (datas[i].fileMimetype == '8') {
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
    // this.isUserName();
  },
  creadted() {},
  methods: {
    getUnixTime(dateStr) {
      var newstr = dateStr.replace(/-/g, '/');
      var date = new Date(newstr);
      var time_str = date.getTime().toString();
      return time_str.substr(0, 10);
    },
    getUseCapital() {
      useCapital(4).then(res => {
        this.curMoney = res.data.quota;
      });
    },
    getTime() {
      const date = new Date();
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, 0);
      const d = date
        .getDate()
        .toString()
        .padStart(2, 0);
      const time = y + '-' + m + '-' + d;
      this.addInfoYwfk.wdsjfksj = time;
    },
    // 下载附件
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
    },
    returnFunc() {
      this.$router.go(-1);
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
              uploadfiles: [],
              ywzt: ywzt
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
              uploadFiles: this.fileListLoanData,
              ywId: wdywId,
              sfasfk: '1',
              ywzt: ywzt
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
              ywId: wdywId,
              ywzt: ywzt
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
              uploadFiles: this.fileListJkjyData,
              ywId: wdywId,
              ywzt: ywzt
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
              uploadFiles: this.fileListGjjData,
              ywId: wdywId,
              ywzt: ywzt
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
              uploadfiles: this.fileListGjjData,
              ywzt: ywzt
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
            //   const arr = [];
            //   arr.push(this.fileListHkqr);
            //   if (this.hzfType == '1') {
            //     var params = {
            //       hksj: this.addInfoHkqr.hksj,
            //       hkbz: this.addInfoHkqr.hkbz,
            //       ywId: wdywId,
            //       uploadFiles: this.fileListHkqr,
            //       ywzt: ywzt
            //     };
            //   } else {
            //     var params = {
            //       hksj: this.addInfoHkqr.hksj,
            //       hkbz: this.addInfoHkqr.hkbz,
            //       ywId: wdywId,
            //       uploadfiles: [],
            //       ywzt: ywzt
            //     };
            //   }

            //   if (
            //     params.uploadFiles[0] == null ||
            //     params.uploadFiles[0] == undefined
            //   ) {

            //   }

            //   if (this.fileListHkqr.length == 0 && this.hzfType == '1') {
            //     this.$message.warning('请上传附件!');
            //   } else {
            //     update_info(params).then(response => {
            //       if (response.code === 200) {
            //         this.$message.success('保存成功!');
            //         this.reload();
            //       }
            //     });
            //   }
            // }
            const params = {
              hksj: this.addInfoHkqr.hksj,
              hkbz: this.addInfoHkqr.hkbz,
              ywId: wdywId,
              uploadfiles: [],
              ywzt: ywzt
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

      // if (ywzt == '10') {
      //   this.$refs.cyfkForm.validate(async valid => {
      //     if (valid) {
      //       const arr = [];
      //       arr.push(this.fileListHkqr);
      //       if (this.hzfType == '1') {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           uploadFiles: this.fileListHkqr,
      //           ywzt: ywzt
      //         };
      //       } else {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           uploadfiles: [],
      //           ywzt: ywzt
      //         };
      //       }

      //       if (
      //         params.uploadFiles[0] == null ||
      //         params.uploadFiles[0] == undefined
      //       ) {
      //         // params.uploadFiles = [];
      //       }

      //       if (this.fileListHkqr.length == 0 && this.hzfType == '1') {
      //         this.$message.warning('请上传附件!');
      //       } else {
      //         update_info(params).then(response => {
      //           if (response.code === 200) {
      //             this.$message.success('保存成功!');
      //             this.reload();
      //           }
      //         });
      //       }
      //     }
      //   });
      // }

      // if (ywzt == '11') {
      //   this.$refs.yhhkForm.validate(async valid => {
      //     if (valid) {
      //       const arr = [];
      //       arr.push(this.fileListHkqr);
      //       if (this.hzfType == '1') {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           uploadFiles: this.fileListHkqr,
      //           ywzt: ywzt
      //         };
      //       } else {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           uploadfiles: [],
      //           ywzt: ywzt
      //         };
      //       }

      //       if (
      //         params.uploadFiles[0] == null ||
      //         params.uploadFiles[0] == undefined
      //       ) {
      //         // params.uploadFiles = [];
      //       }

      //       if (this.fileListHkqr.length == 0 && this.hzfType == '1') {
      //         this.$message.warning('请上传附件!');
      //       } else {
      //         update_info(params).then(response => {
      //           if (response.code === 200) {
      //             this.$message.success('保存成功!');
      //             this.reload();
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
    },
    onSubmit() {
      const ywzt = this.ywztStatu;
      const wdywId = this.$route.query.id;
      const weywIdArr = [];
      weywIdArr.push(wdywId);
      if (ywzt == '2') {
        if (
          this.addInfoWdzg.gjjdkzgshsj != '' &&
          this.addInfoWdzg.gjjdkzgshbz != ''
        ) {
          this.$refs.formWdzg.validate(async valid => {
            if (valid) {
              this.btnLoad = true;
              const params = {
                gjjdkzgshsj: this.addInfoWdzg.gjjdkzgshsj,
                gjjdkzgshbz: this.addInfoWdzg.gjjdkzgshbz,
                ywId: wdywId,
                ywzt: ywzt
              };
              // const params2 = {
              //   action: 'tjsq',
              //   actionName: '提交申请',
              //   flowKey: 'WDSH',
              //   ywIds: weywIdArr
              // };
              if (this.curMoney > this.dkjeMoney) {
                addProcess_api(params).then(res => {
                  if (res.code === 200) {
                    this.$message.success('提交成功!');
                    this.btnLoad = false;
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$message.warning(
                  '当前资金池余额为:' + this.curMoney + '!,不能发起审核!'
                );
                this.btnLoad = false;
              }
            }
          });
        } else {
          this.$message.success('请完整填写表单!');
        }
      }
      if (ywzt == '4') {
        const wdywId = this.$route.query.id;

        this.$refs.ywfkForm.validate(async valid => {
          if (valid) {
            const arr = [];
            arr.push(this.fileListLoanData);

            // const data1 = this.getUnixTime(this.addInfoYwfk.wdsjfksj);
            // const data2 = this.getUnixTime(this.addInfoYwfk.yjjqsj);
            // if (data2 < data1) {
            //   this.$message.success('预计清算时间不能小于实际放款时间');
            // } else {
            const params = {
              wdsjfksj: this.addInfoYwfk.wdsjfksj,
              wdsjfkzb: this.addInfoYwfk.wdsjfkzb,
              // yjjqsj: this.addInfoYwfk.yjjqsj,
              ywId: wdywId,
              ywzt: ywzt,
              dklx: this.$route.query.dklx,
              dkje: this.dkjeMoney,
              uploadFiles: this.fileListLoanData,
              sfasfk: '1'
            };

            if (
              params.uploadFiles[0] == null ||
              params.uploadFiles[0] == undefined
            ) {
              delete params.uploadFiles;
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
                register_info(params).then(response => {
                  if (response.code === 200) {
                    this.$message.success('操作成功!');
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$message.warning('请上传委贷业务放款资料!');
              }
            }
          }
          // }
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
              uploadFiles: this.fileListJkdjData
              // dklx: '05'
            };

            const files = Object.keys(this.fileListJkdjData);

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
                register_info(params).then(response => {
                  if (response.code === 200) {
                    this.$message.success('操作成功!');
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$message.warning('请上传商贷结清资料!');
              }
            }
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
            arr.push(this.fileListJkjyData);
            const params = {
              jkjysj: this.addInfoSdjy.jkjysj,
              jkjybz: this.addInfoSdjy.jkjybz,
              ywId: wdywId,
              ywzt: ywzt,
              uploadFiles: this.fileListJkjyData
              // dklx: '05'
            };

            const files = Object.keys(this.fileListJkjyData);
            if (
              params.uploadFiles[0] == null ||
              files.length == 0 ||
              this.fileListJkjyData == undefined
            ) {
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
              uploadFiles: this.fileListGjjData
              // dklx: '05'
            };

            const files = Object.keys(this.fileListGjjData);
            if (
              params.uploadFiles[0] == null ||
              files.length == 0 ||
              this.fileListGjjData == undefined
            ) {
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
        const wdywId = this.$route.query.id;
        this.$refs.hkqrForm.validate(async valid => {
          if (valid) {
            // const warningStatus = Cookies.get('warningStatus111');
            // const arr = [];
            // arr.push(this.fileListHkqr);
            // if (this.hzfType == '1') {
            //   var params = {
            //     hksj: this.addInfoHkqr.hksj,
            //     hkbz: this.addInfoHkqr.hkbz,
            //     ywId: wdywId,
            //     ywzt: ywzt,
            //     dklx: this.$route.query.dklx,
            //     dkje: this.dkjeMoney,
            //     warning_status_111: warningStatus,
            //     uploadFiles: this.fileListHkqr
            //   };
            // } else {
            //   var params = {
            //     hksj: this.addInfoHkqr.hksj,
            //     hkbz: this.addInfoHkqr.hkbz,
            //     ywId: wdywId,
            //     ywzt: ywzt,
            //     dklx: this.$route.query.dklx,
            //     dkje: this.dkjeMoney,
            //     warning_status_111: warningStatus
            //   };
            // }

            // if (
            //   params.uploadFiles[0] == null ||
            //   params.uploadFiles[0] == undefined
            // ) {
            //   // params.uploadFiles = [];
            // }

            // if (this.fileListHkqr.length == 0 && this.hzfType == '1') {
            //   this.$message.warning('请上传附件!');
            // } else {
            //   register_info(params).then(response => {
            //     if (response.code === 200) {
            //       this.$message.success('操作成功!');
            //       this.$router.go(-1);
            //     }
            //   });
            // }
            const warningStatus = Cookies.get('warningStatus111');
            const params = {
              hksj: this.addInfoHkqr.hksj,
              hkbz: this.addInfoHkqr.hkbz,
              ywId: wdywId,
              ywzt: ywzt,
              dklx: this.$route.query.dklx,
              dkje: this.dkjeMoney,
              warning_status_111: warningStatus
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

      // 长银放款登记
      // if (ywzt == '10') {
      //   const wdywId = this.$route.query.id;
      //   this.$refs.cyfkForm.validate(async valid => {
      //     if (valid) {
      //       const warningStatus = Cookies.get('warningStatus111');
      //       const arr = [];
      //       arr.push(this.fileListCyfk);
      //       if (this.hzfType == '1') {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           ywzt: ywzt,
      //           dklx: this.$route.query.dklx,
      //           dkje: this.dkjeMoney,
      //           warning_status_111: warningStatus,
      //           uploadFiles: this.fileListCyfk
      //         };
      //       } else {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           ywzt: ywzt,
      //           dklx: this.$route.query.dklx,
      //           dkje: this.dkjeMoney,
      //           warning_status_111: warningStatus
      //         };
      //       }

      //       if (
      //         params.uploadFiles[0] == null ||
      //         params.uploadFiles[0] == undefined
      //       ) {
      //         // params.uploadFiles = [];
      //       }

      //       if (this.fileListCyfk.length == 0 && this.hzfType == '1') {
      //         this.$message.warning('请上传附件!');
      //       } else {
      //         register_info(params).then(response => {
      //           if (response.code === 200) {
      //             this.$message.success('操作成功!');
      //             this.$router.go(-1);
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
      // 银行回款登记
      // if (ywzt == '11') {
      //   const wdywId = this.$route.query.id;
      //   this.$refs.yhhkForm.validate(async valid => {
      //     if (valid) {
      //       const warningStatus = Cookies.get('warningStatus111');
      //       const arr = [];
      //       arr.push(this.fileListYhhk);
      //       if (this.hzfType == '1') {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           ywzt: ywzt,
      //           dklx: this.$route.query.dklx,
      //           dkje: this.dkjeMoney,
      //           warning_status_111: warningStatus,
      //           uploadFiles: this.fileListYhhk
      //         };
      //       } else {
      //         var params = {
      //           hksj: this.addInfoHkqr.hksj,
      //           hkbz: this.addInfoHkqr.hkbz,
      //           ywId: wdywId,
      //           ywzt: ywzt,
      //           dklx: this.$route.query.dklx,
      //           dkje: this.dkjeMoney,
      //           warning_status_111: warningStatus
      //         };
      //       }

      //       if (
      //         params.uploadFiles[0] == null ||
      //         params.uploadFiles[0] == undefined
      //       ) {
      //         // params.uploadFiles = [];
      //       }

      //       if (this.fileListYhhk.length == 0 && this.hzfType == '1') {
      //         this.$message.warning('请上传附件!');
      //       } else {
      //         register_info(params).then(response => {
      //           if (response.code === 200) {
      //             this.$message.success('操作成功!');
      //             this.$router.go(-1);
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
    },
    // 回款确认登记
    handlesuccessHkqr(res, file, fileList) {
      this.fileListHkqr.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      });
    },
    handleRemoveHkqr(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewHkqr(file) {
      console.log(file);
    },
    // 长银放款登记
    handlesuccessCyfk(res, file, fileList) {
      this.fileListCyfk.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      });
    },
    handleRemoveCyfk(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewCyfk(file) {
      console.log(file);
    },
    // 银行回款登记
    handlesuccessYhhk(res, file, fileList) {
      this.fileListYhhk.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      });
    },
    handleRemoveYhhk(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewYhhk(file) {
      console.log(file);
    },
    handlesuccessLoan(res, file, fileList) {
      this.fileListLoanData.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '8',
        glid: this.$route.query.id
      });
    },
    handleRemoveLoan(file, fileList) {
      delete this.fileListLoanData;
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
      this.fileListJkdjData.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      });
      this.fileListSdjqData.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '9',
        glid: this.$route.query.id
      });
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
      this.fileListJkjyData.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '10',
        glid: this.$route.query.id
      });
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
      this.fileListGjjData.push({
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize,
        fileMimetype: '11',
        glid: this.$route.query.id
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
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
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
  width: 70px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
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
.area .el-textarea__inner {
  width: 320px;
}
.register .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  font-weight: bold;
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
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
