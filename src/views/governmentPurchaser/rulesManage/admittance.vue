<!--准入规则-->
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
          <div class="tit">用户注册准入规则</div>
          <div>
            <el-row>
              <el-col :span="2">
                <p class="classfy-tit">规则开关</p>
              </el-col>
              <el-col :span="22">
                <p class="classfy-tit">规则配置</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                同一手机号码注销后再次注册的最大次数为
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                次/年
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div class="tit">额度评估准入规则</div>
          <div class="info-box">
            <el-row>
              <el-col :span="2">
                <p class="classfy-tit">规则开关</p>
              </el-col>
              <el-col :span="22">
                <p class="classfy-tit">规则配置</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                个人年龄必须满
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                周岁且小于
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input>
                </span>
                岁(含)
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                之内已经获取额度同时已经支用的不能再申请额度，但是未支用的
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input>
                </span>
                天后可以更新申请额度
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                之内额度评估被拒绝的，禁止申请额度评估
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                同一账号发起额度评估申请后被拒绝,
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                个月内无法发起第二次申请
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                客户额度评估次数为
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                次/年
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div class="tit">贷款申请准入规则</div>
          <div>
            <el-row>
              <el-col :span="2">
                <p class="classfy-tit">规则开关</p>
              </el-col>
              <el-col :span="22">
                <p class="classfy-tit">规则配置</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                同一账号发起贷款申请后被拒绝，
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                个月内无法发起第二次申请
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-switch v-model="value1"> </el-switch>
              </el-col>
              <el-col :span="22">
                客户贷款申请次数为
                <span class="input-width">
                  <el-input v-model="input" placeholder="请输入"></el-input></span>
                次/年
              </el-col>
            </el-row>
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
      value1: true
    };
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
    margin-bottom: 15px;
  }
  .el-col {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
}
.admittance {
  .info {
    margin-bottom: 20px;
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
