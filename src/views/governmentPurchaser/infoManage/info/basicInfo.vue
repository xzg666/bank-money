<template>
  <div class="basic-info">
    <div class="box-area">
      <div class="info-name">法人信息</div>
      <ul>
        <li>
          <label>法定代表人:</label>
          <span>{{ detailsData.legalPerson }}</span>
        </li>
        <li>
          <label>性别:</label>
          <span>{{
            $selectDictLabel(
              $store.getters.dictData.sys_user_sex || [],
              detailsData.sex
            )
          }}</span>
        </li>
        <li>
          <label>国籍:</label>
          <span>{{ detailsData.nationality }}</span>
        </li>
        <li>
          <label>职业:</label>
          <span>{{ detailsData.job }}</span>
        </li>
        <li>
          <label>身份证号码:</label>
          <span>{{ detailsData.idCard }}</span>
        </li>
        <li>
          <label>常住地区:</label>
          <span>{{ detailsData.addressDistrict }}</span>
        </li>
        <li>
          <label>详细地址:</label>
          <span>{{ detailsData.addressDetail }}</span>
        </li>
        <li>
          <label>紧急联系人:</label>
          <span>{{ detailsData.urgentPerson }}</span>
        </li>
        <li>
          <label>紧急联系人电话:</label>
          <span>{{ detailsData.urgentPhone }}</span>
        </li>
        <li>
          <label>授信额度:</label>
          <span>{{ detailsData.avaamt }}</span>
        </li>
        <li>
          <label>额度有效期:</label>
          <span>{{ detailsData.avaamt }}</span>
        </li>
        <li>
          <label>在保余额:</label>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="box-area">
      <div class="info-name">企业信息</div>
      <ul>
        <li>
          <label>供应商名称:</label>
          <span>{{ detailsData.supplierName }}</span>
        </li>
        <li>
          <label>统一社会信用代码:</label>
          <span>{{ detailsData.socialCreditCode }}</span>
        </li>
        <li>
          <label>供应商类型:</label>
          <span>{{ detailsData.gyslx }}</span>
        </li>
        <li>
          <label>所属行业:</label>
          <span>{{ detailsData.industry4 }}</span>
        </li>
      </ul>
    </div>
    <div class="box-area">
      <div class="info-name">交易信息</div>
      <ul>
        <li>
          <label>客户在平台有无历史交易订单额:</label>
          <!-- <span>{{ detailsData.industry4 }}</span> -->
        </li>
        <li>
          <label>近半年交易额:</label>
          <span>{{ detailsData.industry4 }}</span>
        </li>
        <li>
          <label>近一年交易额:</label>
          <span></span>
        </li>
        <li>
          <label>近半年周转次数:</label>
          <span></span>
        </li>
        <li>
          <label>近一年周转次数:</label>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="box-area">
      <div class="info-name">风险信息</div>
      <ul>
        <li>
          <label>当前借款笔数:</label>
          <span></span>
        </li>
        <li>
          <label>逾期总笔数:</label>
          <span></span>
        </li>
        <li>
          <label>代偿总笔数:</label>
          <span></span>
        </li>
        <li>
          <label>银行利息逾期笔数:</label>
          <span></span>
        </li>
        <li>
          <label>银行利息代偿笔数:</label>
          <span></span>
        </li>
        <li>
          <label>担保费逾期笔数:</label>
          <span></span>
        </li>
        <li>
          <label>担保费代偿笔数:</label>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="box-area">
      <div class="info-name">证照附件</div>
      <div>
        <img :src="detailsData.idCardImagePositivePath" />
        <img :src="detailsData.idCardImageReversePath" />
        <img :src="detailsData.businessLicenseImagePath" />
      </div>
    </div>
    <div class="box-area">
      <div class="info-name">贷后用途材料附件</div>
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="贷前准入" name="first">
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="上传日期">
                </el-table-column>
                <el-table-column prop="name" label="发票收据">
                </el-table-column>
                <el-table-column prop="address" label="合同订单">
                </el-table-column>
                <el-table-column prop="name" label="交易流水">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="贷后管理" name="second">贷后管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailsData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {
    console.log('组件', this.detailsData);
  }
};
</script>

<style lang="scss" scoped>
.box-area {
  margin-bottom: 20px;
  .info-name {
    font-size: 18px;
    font-weight: bold;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      width: 33.33%;
      display: inline-block;
      padding: 0;
      margin: 0;
      list-style: none;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
      label {
        display: inline-block;
        text-align: left;
        line-height: 46px;
      }
      span {
        width: 160px;
        display: inline-block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        top: 10px;
      }
      .el-input {
        width: 260px;
      }
    }
  }
}
</style>
