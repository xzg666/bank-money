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
              <div style="display:inline-block">
                <el-input
                  v-model="detailsData.ruleVersionName"
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
                  v-model="detailsData.ruleVersionNum"
                  placeholder="此处可输入版本号"
                ></el-input>
              </div>
            </li>
            <li>
              <label>生效日期:</label>
              <div style="display:inline-block">
                <el-date-picker
                  v-model="detailsData.ruleVersionEffectiveDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
            </li>
            <li>
              <label>失效日期:</label>
              <div style="display:inline-block">
                <el-date-picker
                  v-model="detailsData.ruleVersionExpirationDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
            </li>
            <li>
              <label>操作人:</label>
              <span>{{ detailsData.updateByName }}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!--1为普通条目-->

      <div v-for="(item, detailsIndex) in detailsData" :key="detailsIndex">
        <div class="info">
          <el-card
            v-if="
              detailsData.tdRuleVersionEntryTypeList.length > 0 &&
                stringPrarams2.length > 0
            "
            class="box-card"
          >
            <div class="tit">{{ detailsData[detailsIndex].entryTypeName }}</div>
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
                  <el-switch v-model="item.entryIsUse"> </el-switch>
                </el-col>
                <el-col :span="22">
                  <span
                    v-for="(citem, cindex) in item.tdRuleVersionVariableList"
                    :key="cindex"
                  >
                    <label style="display:inline-block">{{
                      citem.variableLabel
                    }}</label>
                    <span
                      style="display:inline-block;width:80px;margin: 0px 10px;"
                    >
                      <el-input
                        v-model="citem.variableValue"
                        placeholder="请输入"
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
        <!-- <template v-for="(reckonItem, reckonIndex) in reckonArr">
          <div
            v-if="detailsData[detailsIndex].tdRuleEntryTemplateList.length > 0"
            :key="reckonIndex"
            class="info"
          >
            <el-card v-show="reckonItem.entryShowType == '2'" class="box-card">
              <div class="clearfix">
                <div class="tit">
                  {{ detailsData[detailsIndex].entryTypeName }}
                </div>
                <div
                  class="history-box"
                  style="display:inline-block;float:left"
                >
                  <div>

                    <div
                      v-for="(colItem,
                      colIndex) in reckonItem.tdRuleEntryVariableList"
                      :key="colIndex"
                      style="display:inline-block;float:left"
                    >
                      <div class="history-tit">
                        <span>{{ colItem.variableEngName }} </span>
                      </div>
                      <template
                        v-if="
                          colItem.variableValue && colItem.variableValue.length
                        "
                      >
                        <div
                          v-for="(rowItem, rowIndex) in colItem.variableValue"
                          :key="rowIndex"
                          class="test-item"
                        >
                          <span class="input-box">
                            <el-input
                              v-model="colItem.variableValue[rowIndex]"
                              placeholder="请输入"
                            ></el-input>
                          </span>
                          <el-button
                            v-if="
                              colIndex ===
                                reckonItem.tdRuleEntryVariableList.length - 1
                            "
                            type="danger"
                            size="mini"
                            style="margin-left:10px"
                            :disabled="colItem.variableValue.length === 1"
                            @click.prevent="
                              deleteDomain(
                                reckonItem.tdRuleEntryVariableList,
                                rowIndex
                              )
                            "
                            >删除</el-button>
                        </div>
                      </template>
                    </div>

                    <div class="add-btn">
                      <el-button
                        size="mini"
                        @click="addDomain(reckonItem.tdRuleEntryVariableList)"
                        >添加</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </template> -->

        <div class="table-box">
          <el-table :data="tableData">
            <el-table-column
              v-for="(_item, index) in yuanData.tdRuleVersionEntryTypeList[0]
                .tdRuleEntryVariableList"
              :key="index"
              :prop="_item.variableEngName"
              :label="_item.variableEngName"
              width="180"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="tableData[scope.$index][_item.variableEngName]"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="buton-box">
            <el-button @click="addRow">增加一行</el-button>
          </div>
        </div>
      </div>
      <div class="info">
        <el-card class="box-card">
          <div style="text-align:center">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="returnFunc">取消</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryTemplateConfig,
  add_updata_rules,
  queryRuleDetail
} from '@/api/governmentPurchaser/rules';
export default {
  data() {
    return {
      tableData: [],
      yuanData: [],
      cloumnObj: {},

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
    addRow() {
      this.tableData.push(JSON.parse(JSON.stringify(this.cloumnObj)));
    },

    handleSubmit() {
      // return
      // debugger;
      const totalArr = [];
      // totalArr = this.stringPrarams2.concat(this.reckonArr);
      console.log('this.reckonArr', this.reckonArr);
      if (this.reckonArr[0].entryShowType == '1') {
        this.submitData.tdRuleVersionEntryList = this.stringPrarams2;
        for (
          let i = 0;
          i < this.submitData.tdRuleVersionEntryList.length;
          i++
        ) {
          this.submitData.tdRuleVersionEntryList[
            i
          ].tdRuleVersionVariableList = this.submitData.tdRuleVersionEntryList[
            i
          ].tdRuleEntryVariableList;
          delete this.submitData.tdRuleVersionEntryList[i]
            .tdRuleEntryVariableList;
        }
        this.submitData.ruleTypeId = this.detailsData[0].ruleTypeId;
        this.submitData.busTypeId = this.$route.query.busId;
        this.submitData.tdRuleVersionEntryList.forEach(item => {
          delete item.entryVariableId;
          delete item.entryTemplateId;
          item.tdRuleVersionVariableList.forEach(citem => {
            delete citem.entryVariableId;
            delete citem.entryTemplateId;
          });
        });
        for (
          let k = 0;
          k < this.submitData.tdRuleVersionEntryList.length;
          k++
        ) {
          if (this.submitData.tdRuleVersionEntryList[k].entryIsUse == true) {
            this.submitData.tdRuleVersionEntryList[k].entryIsUse = '1';
          }
          if (this.submitData.tdRuleVersionEntryList[k].entryIsUse == false) {
            this.submitData.tdRuleVersionEntryList[k].entryIsUse = '0';
          }
        }
      } else {
        this.tableData.map(item => {
          const tempObj = JSON.parse(
            JSON.stringify(this.yuanData[0].tdRuleEntryTemplateList[0])
          );
          tempObj.tdRuleEntryVariableList.map(ele => {
            ele.variableValue = item[ele.variableEngName];
          });
          this.yuanData[0].tdRuleEntryTemplateList.push(tempObj);
        });
        const finalData = JSON.parse(JSON.stringify(this.yuanData));
        finalData[0].tdRuleVersionEntryList =
          finalData[0].tdRuleEntryTemplateList;
        finalData[0].tdRuleVersionEntryList.map(item => {
          item.tdRuleVersionVariableList = item.tdRuleEntryVariableList;
          item.tdRuleVersionVariableList.map(ele => {
            delete ele.entryTemplateId;
            delete ele.entryVariableId;
          });
          delete item.tdRuleEntryVariableList;
        });
        delete finalData[0].tdRuleEntryTemplateList;

        console.log('最终数据----', finalData);
        this.submitData.tdRuleVersionEntryList =
          finalData[0].tdRuleVersionEntryList;
      }
      add_updata_rules(this.submitData).then(res => {
        debugger;
        if (res.code == 200) {
          this.$message.success('新增成功!');
          // this.$router.go(-1);
          this.$router.push({
            path: '/governmentPurchaser/rulesManage/rulesIndex',
            query: {
              busId: this.$route.query.busId
            }
          });
        }
      });
    },
    returnFunc() {
      this.$router.push({
        path: '/governmentPurchaser/rulesManage/rulesIndex',
        query: {
          busId: this.$route.query.busId
        }
      });
    },
    deleteDomain(list, index) {
      list.forEach(item => {
        item.variableValue.splice(index, 1);
      });
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

    addDomain(list) {
      list.forEach(item => {
        if (Array.isArray(item.variableValue)) {
          item.variableValue.push('');
        } else {
          this.$set(item, 'variableValue', ['']);
        }
      });
      debugger;
      return;
      this.reckonArr.push({
        // entryTemplateId:'',
        // entryVariableId:'',
        tdRuleEntryVariableList: [
          {
            variableChName:
              reckonItem[0].tdRuleEntryVariableList[0].variableChName,
            variableDesc: reckonItem[0].tdRuleEntryVariableList[0].variableDesc,
            variableEngName:
              reckonItem[0].tdRuleEntryVariableList[0].variableEngName,
            variableValue: '',
            variableOrder:
              reckonItem[0].tdRuleEntryVariableList[0].variableOrder
          }
        ],
        entryShowType: reckonItem[0].entryShowType
      });
    },
    getDetailsData() {
      const params = {
        ruleVersionId: this.$route.query.ruleVersionId
      };
      queryRuleDetail(params).then(res => {
        debugger;
        this.detailsData = res.data;
        this.yuanData = res.data;
        // const tempObj = {};
        // res.data[0].tdRuleEntryTemplateList[0].tdRuleEntryVariableList.map(
        //   item => {
        //     tempObj[item.variableEngName] = '';
        //   }
        // );
        // this.cloumnObj = tempObj;
        // cloumnObj
        // { 'min': '', 'max': '', 'quota': '' }
        this.tableData = [
          { min: '11', max: '22', quota: '33' },
          { min: '11', max: '22', quota: '44' }
        ];
        this.interfaceData = this.detailsData.tdRuleVersionEntryTypeList[0].tdRuleVersionEntryList;
        // 普通条目
        this.stringPrarams2 = [];
        // 测算条目
        this.reckonArr = [];
        this.interfaceData.forEach(item => {
          if (item.entryShowType === '1') {
            const entryDescs = item.entryDesc.split(/[{}]/g);
            item.tdRuleEntryVariableList.forEach((citem, index) => {
              citem.variableLabel = entryDescs[2 * index];
            });
            if (entryDescs.length % 2 === 1) {
              item.tdRuleEntryVariableList[
                item.tdRuleEntryVariableList.length - 1
              ].variableLabel1 = entryDescs.slice(-1)[0];
            }
            item.entryIsUse = true;
            this.stringPrarams2.push(item);
            console.log(' this.stringPrarams2', this.stringPrarams2);
          } else if (item.entryShowType === '2') {
            this.reckonArr.push(item);
            console.log('reckonArr', this.reckonArr);
          }
        });

        //   this.interfaceData = this.interfaceData.map(item => {
        //     if (item.entryShowType === '1') {
        //       const entryDescs = item.entryDesc.split(/[{}]/g);
        //       item.tdRuleEntryVariableList.forEach((citem, index) => {
        //         citem.variableLabel = entryDescs[2 * index];
        //         citem.variableValue = null;
        //       });
        //       this.stringPrarams2.push(item);
        //     } else if (item.entryShowType === '2') {
        //     } else if (item.entryShowType === '3') {
        //     }
        //     return item;

        //     // 普通条目
        //     // const stringPrarams = [];
        //     // // 测算条目
        //     // const reckonArr = [];

        //     // interfaceData.forEach(item => {
        //     //   if (item.entryShowType === '1') {
        //     //     const entryDescs = item.entryDesc.split(/[{}]/g);
        //     //     item.tdRuleEntryVariableList.forEach((citem, index) => {
        //     //       citem.variableLabel = entryDescs[2 * index];
        //     //     });
        //     //     stringPrarams.push(item);
        //     //   } else if (item.entryShowType === '2') {
        //     //     this.reckonArr.push(item);
        //     //   }
        //     // });
        //   });
        //   for (
        //     let i = 0;
        //     i < this.detailsData[0].tdRuleEntryTemplateList.length;
        //     i++
        //   ) {
        //     this.descArr.push(
        //       this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
        //     );
        //     if (
        //       this.detailsData[0].tdRuleEntryTemplateList[i].entryShowType == '1'
        //     ) {
        //       // 普通条目
        //       this.stringPrarams.push(
        //         this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
        //       );
        //     } else if (
        //       this.detailsData[0].tdRuleEntryTemplateList[i].entryShowType == '2'
        //     ) {
        //       // 测算条目
        //       this.reckonArr.push(this.detailsData[0].tdRuleEntryTemplateList[i]);
        //       // 普通条目
        //       this.reckonPrarams.push(
        //         this.detailsData[0].tdRuleEntryTemplateList[i].entryDesc
        //       );
        //     }
        //   }
        //   const reg = /(?<={)[^0-9]*?(?=})/g;

        //   this.descCodeArr;
        //   for (let i = 0; i < this.reckonPrarams.length; i++) {
        //     this.descCodeArr.push(this.reckonPrarams[i].match(reg));
        //   }
        //   const tempobj = {};
        //   for (let i = 0; i < this.stringPrarams.length; i++) {
        //     // const keys = this.stringPrarams[i].match(reg);
        //     this.regularArr.push(this.stringPrarams[i].match(reg));
        //   }
        //   this.codeArr = this.regularArr.map(item =>
        //     item.reduce((t, v) => {
        //       t[v] = '';
        //       return t;
        //     }, {})
        //   );

        //   // arr.map(item=> ({code: item[0],po: item[1]}))

        //   // console.log(obj);
        //   // console.log('arr1', arr1);
        //   console.log('this.codeArr', this.codeArr);
        //   // console.log('arrTest', arrTest);
        //   console.log(' this.descCodeArr', this.descCodeArr);
        //   console.log('this.stringPrarams', this.stringPrarams);
        //   console.log('this.regularArr.', this.regularArr);
        //   console.log('detailsData', this.detailsData);
        //   console.log('this.interfaceData', this.interfaceData);
        //   this.getFommaterDesc();
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
          margin-bottom: 15px;
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
