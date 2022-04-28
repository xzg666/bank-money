<!--校验规则-->
<template>
  <div class="app-container">
    <div class="admittance">
      <div class="info">
        <el-card class="box-card info-box">
          <div class="tit">信息</div>
          <ul>
            <li>
              <label>版本名称:</label>
              <span>{{ detailsData.ruleVersionName }}</span>
            </li>
            <!-- <li>
              <label>参数表类型:</label>
              <span>准入规则</span>
            </li> -->
            <li>
              <label>版本号:</label>
              <span>{{ detailsData.ruleVersionNum }}</span>
            </li>
            <li>
              <label>生效日期:</label>
              <span>{{ detailsData.ruleVersionEffectiveDate }}</span>
            </li>
            <li>
              <label>失效日期:</label>
              <span>{{ detailsData.ruleVersionExpirationDate }}</span>
            </li>
            <li>
              <label>操作人:</label>
              <span>{{ detailsData.updateByName }}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!--1为普通条目-->

      <div class="info">
        <el-card class="box-card">
          <div class="tit">
            {{
              detailsData.tdRuleVersionEntryTypeList[0]
                .tdRuleVersionEntryList[0].entryName
            }}
          </div>
          <el-row>
            <el-col :span="2">
              <p class="classfy-tit">规则开关</p>
            </el-col>
            <el-col :span="22">
              <p class="classfy-tit">规则配置</p>
            </el-col>
          </el-row>
          <div v-for="(item, index) in stringPrarams2" :key="index">
            <el-row>
              <el-col :span="2">
                <el-switch v-model="item.entryIsUse" disabled> </el-switch>
              </el-col>
              <el-col :span="22">
                <span
                  v-for="(citem, cindex) in item.tdRuleVersionVariableList"
                  :key="cindex"
                >
                  <label>{{ citem.variableLabel }}</label>
                  <span
                    style="display:inline-block;width:80px;margin: 0px 10px;"
                  >
                    <el-input
                      v-model="citem.variableValue"
                      placeholder="请输入"
                      disabled="true"
                    ></el-input>
                  </span>
                  <label
                    v-if="citem.variableLabel1"
                    style="display:inline-block"
                    >{{ citem.variableLabel1 }}</label>

                  <!-- <div v-if="item1.indexOf('input') == '-1'">
                    {{ item1 }}
                  </div> -->
                </span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div class="tit">
            {{
              detailsData.tdRuleVersionEntryTypeList[0]
                .tdRuleVersionEntryList[0].entryName
            }}
          </div>
          <div class="clearfix">
            <div class="history-box" style="display:inline-block;float:left">
              <div
                v-for="(reckonItem, reckonIndex) in reckonArr"
                style="margin-bottom:15px"
              >
                <!-- {{ reckonItem.tdRuleEntryVariableList }} -->
                <div class="history-tit">
                  <span>{{
                      reckonItem.tdRuleVersionVariableList[0].variableEngName
                    }}
                  </span>
                </div>
                <div
                  v-for="(citem,
                  cindex) in reckonItem.tdRuleVersionVariableList"
                  :key="cindex"
                >
                  <div class="test-item">
                    <span class="input-box">
                      <el-input
                        v-model="citem.variableValue"
                        placeholder="请输入"
                      ></el-input>
                    </span>
                    <!-- <el-button
                  type="danger"
                  size="mini"
                  style="margin-left:10px"
                  @click.prevent="deleteDomain(reckonItem,reckonIndex,citem,cindex)"
                >删除</el-button> -->
                  </div>
                </div>
                <!-- <div class="add-btn">
            <el-button
              size="mini"
              @click="addDomain(reckonItem)"
            >添加</el-button>

          </div> -->
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div style="text-align:center">
            <!-- <el-button
          type="primary"
          @click="handleSubmit"
        >提交</el-button> -->
            <el-button @click="returnFunc">取消</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryRuleDetail,
  add_updata_rules
} from '@/api/governmentPurchaser/rules';
export default {
  data() {
    return {
      value1: true,
      detailsData: [],
      stringPrarams: [],
      regularArr: [],
      splitArr: [],
      input: '',
      reckonArr: [],
      isFlag: false,
      descArr: [],
      descCodeArr: [],
      reckonPrarams: [],
      reckonData: {
        tdRuleVersionVariableList: [
          {
            variableEngName: '',
            variableChName: '',
            variableDesc: '',
            variableValue: ''
          }
        ]
      },
      submitData: {
        tdRuleVersionEntryList: [
          {
            tdRuleEntryVariableList: [
              {
                variableValue: ''
              }
            ]
          }
        ]
      },
      codeArr: {
        // code: '',
        // kk: '',
        // cc: '',
        // dd: ''
      },
      keyName: [],
      keyNum: [],
      reckonArr: [],
      codeArrCopy: null,
      interData: [],
      stringPrarams2: [],
      interfaceData: {
        tdRuleEntryVariableList: [
          {
            variableValue: ''
          }
        ]
      },
      obj1: [
        {
          value: ''
        }
      ]
    };
  },
  mounted() {
    this.getDetailsData();
  },
  methods: {
    handleSubmit() {
      let totalArr = [];
      totalArr = this.stringPrarams2.concat(this.reckonArr);
      // this.interfaceData = this.detailsData.tdRuleVersionEntryTypeList[0].tdRuleVersionEntryList;
      this.detailsData.tdRuleVersionEntryList = totalArr;
      // for (let i = 0; i < this.detailsData.tdRuleVersionEntryList.length; i++) {
      //   this.detailsData.tdRuleVersionEntryList[
      //     i
      //   ].tdRuleVersionVariableList = this.detailsData.tdRuleVersionEntryList[
      //     i
      //   ].tdRuleEntryVariableList;
      //   delete this.detailsData.tdRuleVersionEntryList[i]
      //     .tdRuleEntryVariableList;
      // }
      this.detailsData.ruleTypeId = this.detailsData.ruleTypeId;
      this.detailsData.busTypeId = '';

      // this.detailsData.tdRuleVersionEntryList=this.detailsData.tdRuleVersionEntryTypeList[0].tdRuleVersionEntryList
      // delete this.detailsData.tdRuleVersionEntryTypeList
      const data = this.detailsData.tdRuleVersionEntryTypeList[0];
      data.tdRuleVersionEntryList.forEach(item => {
        delete item.versionEntryId;
        delete item.versionVariableId;
        item.tdRuleVersionVariableList.forEach(citem => {
          delete citem.versionEntryId;
          delete citem.versionVariableId;
        });
      });
      delete this.detailsData.tdRuleVersionEntryTypeList;
      for (let k = 0; k < this.detailsData.tdRuleVersionEntryList.length; k++) {
        if (this.detailsData.tdRuleVersionEntryList[k].entryIsUse == true) {
          this.detailsData.tdRuleVersionEntryList[k].entryIsUse = '1';
        }
        if (this.detailsData.tdRuleVersionEntryList[k].entryIsUse == false) {
          this.detailsData.tdRuleVersionEntryList[k].entryIsUse = '0';
        }
      }
      add_updata_rules(this.detailsData).then(res => {
        if (res.code == 200) {
          this.$message.warning('修改成功!');
          this.$router.go(-1);
        }
      });
    },
    deleteDomain(reckonItem, reckonIndex, citem, index) {
      if (index == 0) {
        this.$message.warning('至少保留一项!');
      } else {
        // reckonItem.tdRuleEntryVariableList.pop();
        reckonItem.tdRuleVersionVariableList.pop();
      }
    },

    removeDomain(item, order) {
      if (order != 0) {
        var index = this.reckonData.tdRuleVersionVariableList.indexOf(item);
        if (index !== -1) {
          this.reckonData.tdRuleVersionVariableList.splice(index, 1);
        }
      } else {
        this.$message.warning('至少保留一项!');
      }
    },
    returnFunc() {
      this.$router.push({
        path: '/governmentPurchaser/rulesManage/rulesIndex',
        query: {
          busId: this.$route.query.busId
        }
      });
    },
    addDomain(reckonItem) {
      // this.obj1.push({
      //   value: ''
      // });
      reckonItem.tdRuleVersionVariableList.push({
        // entryTemplateId:'',
        // entryVariableId:'',
        variableChName: reckonItem.tdRuleVersionVariableList[0].variableChName,
        variableDesc: reckonItem.tdRuleVersionVariableList[0].variableDesc,
        variableEngName:
          reckonItem.tdRuleVersionVariableList[0].variableEngName,
        variableValue: '',
        variableOrder: reckonItem.tdRuleVersionVariableList[0].variableOrder
      });
    },
    getDetailsData() {
      const params = {
        ruleVersionId: this.$route.query.ruleVersionId
      };
      queryRuleDetail(params).then(res => {
        this.detailsData = res.data;
        this.interfaceData = this.detailsData.tdRuleVersionEntryTypeList[0].tdRuleVersionEntryList;
        // 普通条目
        this.stringPrarams2 = [];
        // 测算条目
        this.reckonArr = [];
        this.interfaceData.forEach(item => {
          if (item.entryShowType === '1') {
            const entryDescs = item.entryDesc.split(/[{}]/g);
            item.tdRuleVersionVariableList.forEach((citem, index) => {
              citem.variableLabel = entryDescs[2 * index];
            });
            if (entryDescs.length % 2 === 1) {
              item.tdRuleVersionVariableList[
                item.tdRuleVersionVariableList.length - 1
              ].variableLabel1 = entryDescs.slice(-1)[0];
            }
            this.stringPrarams2.push(item);
            console.log(' this.stringPrarams2', this.stringPrarams2);
          } else if (item.entryShowType === '2') {
            this.reckonArr.push(item);
            console.log('reckonArr', this.reckonArr);
          }
        });
        for (let k = 0; k < this.interfaceData.length; k++) {
          if (this.interfaceData[k].entryIsUse == '1') {
            this.interfaceData[k].entryIsUse = true;
          }
          if (this.interfaceData[k].entryIsUse == 0) {
            this.interfaceData[k].entryIsUse = false;
          }
        }
      });
    },
    isEnglish(value) {
      return /^[a-zA-Z]+$/.test(value);
    },
    getFommaterDesc() {
      const tempList = [];
      for (let i = 0; i < this.stringPrarams.length; i++) {
        // str.replace(/{([^}]*)}/g, (s, s1) => `-----input:${s1}-----`)
        //   .split('-----');
        // this.splitArr.push(this.stringPrarams[i].split(/[{}]/g).slice(0, -1));
        tempList.push(
          this.stringPrarams[i]
            .replace(/{([^}]*)}/g, (s, s1) => `-----input:${s1}-----`)
            .split('-----')
        );
        // const key = '';
        // this.codeArr[key] = '';
      }
      this.splitArr = tempList;
      console.log('tempList', tempList);
      console.log('this.splitArr', this.splitArr);
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
    margin-bottom: 15px;
  }
  .el-col {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
}
.history-box {
  // width: 600px;
  // .test-item {
  //   width: 500px;
  // }
  .el-col {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    border-right: 1px solid #ddd;
  }
  .el-row {
    margin-bottom: 0;
  }
  .history-tit {
    height: 35px;
    line-height: 35px;
    background: #1890ff;
    color: #fff;
    display: inline-block;
    // width: 400px;
    span {
      width: 300px;
      display: inline-block;
      text-align: center;
      border-right: 1px solid #ddd;
    }
  }
  .input-box {
    .el-input {
      width: 300px;
    }
  }
}
.admittance {
  .info {
    margin-bottom: 20px;
    .info-box {
      ul {
        li {
          width: 33.33%;
          display: inline-block;
          // margin-bottom: 15px;
        }
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
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding: 0;
      margin: 0;
      list-style: none;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      label {
        display: inline-block;

        text-align: left;
        // margin-right: 10px;
      }
    }
  }
}
.add-btn {
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  // text-align: center;
  margin-top: 10px;
  .el-button {
    width: 100px;
  }
}
// .clearfix {
//   &:after {
//     visibility: hidden;
//     display: block;
//     font-size: 0;
//     content: ' ';
//     clear: both;
//     height: 0;
//   }
// }
</style>
