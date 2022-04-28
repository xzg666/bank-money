<!--额度测算-->
<template>
  <div class="app-container">
    <div class="admittance">
      <div class="info">
        <el-card class="box-card">
          <div class="tit">版本信息</div>
          <ul>
            <li>
              <label>参数表名称:</label>
              <div style="display:inline-block">
                <el-input
                  v-model="input"
                  placeholder="此处可输入参数表名称"
                ></el-input>
              </div>
            </li>
            <li>
              <label>参数表类型:</label>
              <span>准入规则</span>
            </li>
            <li>
              <label>版本号:</label>
              <span>V0001</span>
            </li>
            <li>
              <label>操作人:</label>
              <span>王芳</span>
            </li>
          </ul>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="评估额度计算规则" name="1">
                <table cellspacing="1" cellpadding="0">
                  <tr>
                    <th colspan="10">判定条件</th>
                    <!-- <td>&nbsp;</td> -->
                  </tr>
                  <tr>
                    <td rowspan="3">客户在平台无历史交易订单额</td>
                    <td colspan="8">3<=增信额度<10</td>
                    <td>1万</td>
                  </tr>
                  <tr>
                    <td colspan="8">10<=增信额度<30</td>
                    <td>2万</td>
                  </tr>
                  <tr>
                    <td colspan="8">30<=增信额度</td>
                    <td>3万</td>
                  </tr>
                  <tr>
                    <td rowspan="10">客户在平台有历史交易订单额</td>
                    <td rowspan="5">货物类和服务类</td>
                    <td rowspan="3">
                      剔除异常订单进行交易额计算，若近1年交易额不超过近半年交易额的120%
                    </td>
                    <td rowspan="5">资金周转一次所需时间3个月</td>
                    <td rowspan="3">
                      周转次数2次/半年
                    </td>
                    <td rowspan="10">
                      成立时间折扣率1<1年:0.9,1年<=1<2年:1,2年<=1<3:1.05,3年<=1:1.1
                    </td>
                    <td rowspan="5">(额度)折扣率0.8</td>
                    <td rowspan="3">
                      A=近半年交易额/2(近半年的周转次数)*供应商种类折扣率0.8*成立时间折扣率
                    </td>
                    <td rowspan="3">A(B)<=5万</td>
                    <td rowspan="3">5万</td>
                    <td>&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td>&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td rowspan="2">
                      剔除异常订单进行交易额计算，若近1年交易额超过近半年交易额的120%
                    </td>
                    <td rowspan="2">
                      周转次数4次/年
                    </td>
                    <td rowspan="2">
                      B=近1年交易额/4(1年的周转次数)*供应商种类折扣率0.8*成立时间折扣率
                    </td>
                    <td rowspan="4">5万<'A'(B)<300万</td>
                    <td rowspan="4">A(B)</td>
                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td rowspan="5">工程类</td>
                    <td rowspan="3">
                      剔除异常订单进行交易额计算，若近1年交易额不超过近半年交易额的120%
                    </td>
                    <td rowspan="5">资金周转一次所需时间6个月</td>
                    <td rowspan="3">
                      周转次数1次/半年
                    </td>
                    <td rowspan="5">(额度)折扣率0.8</td>
                    <td rowspan="3">
                      A=近半年交易额/1(近半年的周转次数)*供应商种类折扣率0.8*成立时间折扣率
                    </td>

                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td rowspan="3">300万<=A(B)>9</td>
                    <td rowspan="3">300万</td>
                    <td>&nbsp;&nbsp;&nbsp;</br></td>
                  </tr>
                  <tr>
                    <td rowspan="2">
                      剔除异常订单进行交易额计算，若近1年交易额超过近半年交易额的120%
                    </td>
                    <td rowspan="2">
                      周转次数2次/年
                    </td>
                    <td rowspan="2">
                      B=近1年交易额/2(1年的周转次数)*供应商种类折扣率0.8*成立时间折扣率
                    </td>
                  </tr>
                  <tr></tr>
                </table>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card history-box">
          <div class="tit">
无历史交易订单额</div>
          <div>
             <el-row style="text-align:center;background:#1890ff;color:#fff" class="no-history">
               <el-col :span="12">
                 增信额度分布
               </el-col>
               <el-col :span="12">
                 拟定基础额度(万元)
               </el-col>
             </el-row>
             <div>
             <el-row  class="no-history">
               <el-col :span="12">
                 <el-input v-model="input" placeholder="请输入内容"></el-input>
               </el-col>
               <el-col :span="12">
                 <el-input v-model="input" placeholder="请输入内容"></el-input>
               </el-col>
               <span>
                 <el-button
                  type="danger"
                  size="mini"
                  :disabled="!isFlag"
                  @click.prevent="removeDomain(domain, index)"
                  >删除</el-button>
                </span>
             </el-row>
             </div>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div style="text-align:center">
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      input:'',
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 15px 10px 20px 20px;
}
.box-card {
  .el-row {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
  .el-col {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
}
.history-box{
  .el-col {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    border-right: 1px solid #ddd;
  }
}
.no-history{
  width: 500px;
  height: 35px;
  line-height: 35px;
}
.admittance {
  .info {
    margin-bottom: 20px;
    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      width: 100%;
      text-align: center;
      th {
        border: 1px solid #ccc;
        border-collapse: collapse;
      }
      td {
        border: 1px solid #ccc;
        border-collapse: collapse;
      }
    }
    .tit {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }
    p {
      margin: 0;
    }
    .input-width {
      width: 8%;
      display: inline-block;
    }
    .classfy-tit {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
    }
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      flex: 1;
      padding: 0;
      margin: 0;
      list-style: none;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      label {
        display: inline-block;
        // margin-right: 10px;
      }
    }
  }
}
</style>
