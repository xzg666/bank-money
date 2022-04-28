<!--校验规则-->
<template>
  <div class="app-container">
    <div class="admittance">
      <div class="info">
        <el-card class="box-card">
          <div class="tit">信息</div>
          <ul>
            <li>
              <label>版本名称:</label>
              <div style="display:inline-block">
                <el-input
                  v-model="submitData.ruleVersionName"
                  placeholder="此处可输入版本名称"
                ></el-input>
              </div>
              <!-- <span>{{ detailsData[0].entryTypeName }}</span> -->
            </li>
            <!-- <li>
              <label>参数表类型:</label>
              <span>准入规则</span>
            </li> -->
            <li>
              <label>版本号:</label>
              <div style="display:inline-block">
                <el-input
                  v-model="submitData.ruleVersionNum"
                  placeholder="此处可输入版本号"
                ></el-input>
              </div>
            </li>
            <li>
              <label>操作人:</label>
              <span>{{ detailsData[0].updateByName }}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!--1为普通条目-->

      <div class="info">
        <el-card class="box-card">
          <div class="tit">{{ detailsData[0].entryTypeName }}</div>
          <el-row>
            <el-col :span="2">
              <p class="classfy-tit">规则开关</p>
            </el-col>
            <el-col :span="22">
              <p class="classfy-tit">规则配置</p>
            </el-col>
          </el-row>
          <div v-for="(item2, index2) in splitArr" :key="index2">
            <!-- <p>{{ item2 }}</p> -->
            <!-- {{ item.entryDesc }} -->
            <el-row>
              <el-col :span="2">
                <el-switch
                  v-model="
                    detailsData[0].tdRuleEntryTemplateList[index2]['entryIsUse']
                  "
                >
                </el-switch>
              </el-col>
              <el-col :span="22">
                <div
                  v-for="(item1, index1) in item2"
                  :key="index1"
                  style="display:inline-block;width:auto"
                >
                  <!-- {{ item1 }} -->
                  <div v-if="item1.indexOf('input') != '-1'" style="width:70px">
                    <el-input
                      v-model="codeArr[index2][item1.split(':')[1]]"
                      placeholder="请输入"
                      style="width:100%"
                    ></el-input>
                    <!-- {{ index1 }} -->
                  </div>
                  <div v-if="item1.indexOf('input') == '-1'">
                    {{ item1 }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div class="tit">{{ detailsData[0].entryTypeName }}</div>
          <div class="clearfix">
            <div
              v-for="(reckonItem, reckonIndex) in descCodeArr"
              :key="reckonIndex"
            >
              <!-- <p>{{ item2 }}</p> -->
              <!-- {{ item.entryDesc }} -->
              <!-- <div class="history-box">
              <el-row
                style="text-align:center;background:#1890ff;color:#fff"
                class="no-history"
              >
                <el-col :span="10">
                  增信额度分布
                </el-col>
                <el-col :span="10">
                  拟定基础额度(万元)
                </el-col>
              </el-row>
              <div class="test-item">
                <el-row class="no-history" :gutter="20">
                  <el-col :span="10">
                    <el-input
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-input
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      type="danger"
                      size="mini"
                      :disabled="!isFlag"
                      @click.prevent="removeDomain(domain, index)"
                      >删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div> -->
              <div class="history-box" style="display:inline-block;float:left">
                <div
                  v-for="(reckonItem2, reckonIndex2) in reckonItem"
                  style="display:inline-block;float:left"
                >
                  <div class="history-tit">
                    <span>{{ reckonItem2 }}</span>
                  </div>
                  <!-- {{ reckonItem2 }}
                {{ reckonIndex }} -->
                  <div
                    v-for="(reckonItem2, reckonIndex2) in reckonItem"
                    v-if="reckonItem2 != ''"
                    :key="reckonIndex2"
                  >
                    <div
                      v-for="(domain,
                      indexTest) in reckonData.tdRuleVersionVariableList"
                      :key="indexTest"
                      class="test-item"
                    >
                      <span class="input-box">
                        <el-input
                          v-model="
                            reckonData.tdRuleVersionVariableList[indexTest][
                              'variableValue'
                            ]
                          "
                          placeholder="请输入"
                        ></el-input>
                      </span>
                      <!-- <el-button
                      type="danger"
                      size="mini"
                      style="margin-left:10px"
                      @click.prevent="removeDomain(domain, indexTest)"
                      >删除</el-button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="add-btn">
            <el-button size="mini" @click="addDomain()">添加</el-button>
            <el-button
              type="danger"
              size="mini"
              style="margin-left:10px"
              @click.prevent="deleteDomain()"
              >删除</el-button>
          </div>
        </el-card>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div style="text-align:center">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { queryTemplateConfig } from '@/api/governmentPurchaser/rules';
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
      codeArrCopy: null,
      interData: [],
      interfaceData: {
        tdRuleEntryVariableList: [
          {
            variableValue: ''
          }
        ]
      }
    };
  },
  mounted() {
    this.getDetailsData();
  },
  methods: {
    handleSubmit() {
      debugger;
      this.submitData.tdRuleVersionEntryList = this.detailsData[0].tdRuleEntryTemplateList;

      console.log('interfaceData', interfaceData);
      console.log('this.submitData', this.submitData);
      console.log('codeArr', this.codeArr);
      console.log('this.codeArrCopy ', this.codeArrCopy);
      console.log('this.interData ', this.interData);
    },
    deleteDomain() {
      if (this.reckonData.tdRuleVersionVariableList.length == 1) {
        this.$message.warning('至少保留一项!');
      } else {
        this.reckonData.tdRuleVersionVariableList.pop();
      }
    },

    removeDomain(item, order) {
      debugger;
      if (order != 0) {
        var index = this.reckonData.tdRuleVersionVariableList.indexOf(item);
        if (index !== -1) {
          this.reckonData.tdRuleVersionVariableList.splice(index, 1);
        }
      } else {
        this.$message.warning('至少保留一项!');
      }
    },
    addDomain() {
      this.reckonData.tdRuleVersionVariableList.push({
        variableEngName: this.reckonData.variableEngName,
        variableChName: this.reckonData.variableChName,
        variableDesc: this.reckonData.variableDesc,
        variableValue: this.reckonData.variableValue
      });
    },
    getDetailsData() {
      const params = {
        ruleTypeId: this.$route.query.ruleTypeId
      };
      queryTemplateConfig(params).then(res => {
        debugger;
        this.detailsData = res.data;
        this.interfaceData = this.detailsData[0].tdRuleEntryTemplateList;
        this.interfaceData = this.interfaceData.map(item => {
          if (item.entryShowType === '1') {
            const entryDescs = item.entryDesc.split(/[{}]/g);
            item.tdRuleEntryVariableList.forEach((citem, index) => {
              citem.variableLabel = entryDescs[2 * index];
              citem.variableValue = null;
            });
          } else if (item.entryShowType === '2') {
          } else if (item.entryShowType === '3') {
          }
          return item;
        });
        for (
          let i = 0;
          i < this.detailsData[0].tdRuleEntryTemplateList.length;
          i++
        ) {
          this.descArr.push(
            this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
          );
          if (
            this.detailsData[0].tdRuleEntryTemplateList[i].entryShowType == '1'
          ) {
            // 普通条目
            this.stringPrarams.push(
              this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
            );
          } else if (
            this.detailsData[0].tdRuleEntryTemplateList[i].entryShowType == '2'
          ) {
            // 测算条目
            this.reckonArr.push(this.detailsData[0].tdRuleEntryTemplateList[i]);
            // 普通条目
            this.reckonPrarams.push(
              this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
            );
          }
        }
        const reg = /(?<={)[^0-9]*?(?=})/g;

        this.descCodeArr;
        for (let i = 0; i < this.reckonPrarams.length; i++) {
          this.descCodeArr.push(this.reckonPrarams[i].match(reg));
        }
        const tempobj = {};
        for (let i = 0; i < this.stringPrarams.length; i++) {
          // const keys = this.stringPrarams[i].match(reg);
          this.regularArr.push(this.stringPrarams[i].match(reg));
        }
        this.codeArr = this.regularArr.map(item =>
          item.reduce((t, v) => {
            t[v] = '';
            return t;
          }, {})
        );

        // arr.map(item=> ({code: item[0],po: item[1]}))

        // console.log(obj);
        // console.log('arr1', arr1);
        console.log('this.codeArr', this.codeArr);
        // console.log('arrTest', arrTest);
        console.log(' this.descCodeArr', this.descCodeArr);
        console.log('this.stringPrarams', this.stringPrarams);
        console.log('this.regularArr.', this.regularArr);
        console.log('detailsData', this.detailsData);
        console.log('this.interfaceData', this.interfaceData);
        this.getFommaterDesc();
      });
    },
    isEnglish(value) {
      debugger;
      return /^[a-zA-Z]+$/.test(value);
    },
    getFommaterDesc() {
      debugger;
      const tempList = [];
      debugger;
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
      width: 100px;
      display: inline-block;
      text-align: center;
      border-right: 1px solid #ddd;
    }
  }
  .input-box {
    .el-input {
      width: 100px;
    }
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
