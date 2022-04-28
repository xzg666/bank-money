<template>
  <div class="info-details app-container">
    <el-card class="box-card">
      <div class="info-name">姓名</div>
      <el-row class="basic-info">
        <!-- <el-col v-for="(item, index) in detailItem" :key="index" :span="8">
          <label v-if="item.label != '额度占用：'">{{ item.label }}</label>
          <label v-if="item.label == '额度占用：'">{{ item.label }}</label>
          <span v-if="item.label != '额度占用：'">{{ item.data }}</span>
          <span v-if="item.label == '额度占用：'" class="proccess-bar">
            <div class="proccess">
              <el-progress :percentage="50"></el-progress>
            </div>
          </span>
        </el-col> -->
        <el-col :span="8">
          <label>身份证号码：</label>
          <span>{{ detailsData.idCard }}</span>
        </el-col>
        <el-col :span="8">
          <label>供应商名称：</label>
          <span>{{ detailsData.supplierName }}</span>
        </el-col>
        <el-col :span="8">
          <label>统一社会信用代码：</label>
          <span>{{ detailsData.socialCreditCode }}</span>
        </el-col>
        <el-col :span="8">
          <label>额度申请时间：</label>
          <span>{{ detailsData.socialCreditCode }}</span>
        </el-col>
        <el-col :span="8">
          <label>额度占用：</label>
          <span v-if="detailsData.zyed" class="proccess-bar">
            <div class="proccess">
              <el-progress :percentage="detailsData.zyed"></el-progress>
            </div>
          </span>
        </el-col>
        <el-col :span="8">
          <label>供应商类型：</label>
          <span>{{ detailsData.gyslx }}</span>
        </el-col>
        <el-col :span="8">
          <label>渠道：</label>
          <span>{{ detailsData.qudao }}</span>
        </el-col>
        <el-col :span="8">
          <label>分支机构：</label>
          <span>{{ detailsData.fzOrg }}</span>
        </el-col>
        <el-col :span="8">
          <label>业务状态：</label>
          <span>{{ detailsData.bussinessStatus }}</span>
        </el-col>
      </el-row>
    </el-card>
    <div style="margin-top:20px">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div>
              <basic-info :details-data="detailsData"></basic-info>
            </div>
          </el-tab-pane>
          <el-tab-pane label="业务信息" name="second">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import basicInfo from './basicInfo';
import { infoDetail } from '@/api/governmentPurchaser/info';
export default {
  components: {
    basicInfo
  },
  data() {
    return {
      tableData: [],
      detailItem: [
        { label: '身份证号码：', data: '111111' },
        { label: '供应商名称：', data: 'A' },
        { label: '统一社会信用代码：', data: 'A' },
        { label: '额度申请时间：', data: 'A' },
        { label: '额度占用：', data: 'A' },
        { label: '供应商类型：', data: 'A' },
        { label: '渠道：', data: 'A' },
        { label: '分支机构：', data: 'A' },
        { label: '业务状态：', data: 'A' }
      ],
      activeName: 'first',
      detailsData: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDetail() {
      const id = this.$route.query.id;
      infoDetail(id).then(res => {
        this.detailsData = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.info-details {
  .info-name {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin: 10px 0;
  }
  .proccess-bar {
    position: relative;
  }
  .proccess {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    /* height: 30px; */
    top: 0;
  }
  .basic-info {
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
