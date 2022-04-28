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
                  v-model="formData.ruleVersionName"
                  :disabled="disabled"
                  placeholder="此处可输入版本名称"
                ></el-input>
              </div>
            </li>
            <li>
              <label>版本号:</label>
              <div style="display:inline-block">
                <el-input
                  v-model="formData.ruleVersionNum"
                  :disabled="disabled"
                  placeholder="此处可输入版本号"
                ></el-input>
              </div>
            </li>
            <li>
              <label>生效日期:</label>
              <div style="display:inline-block">
                <el-date-picker
                  v-model="formData.ruleVersionEffectiveDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="disabled"
                ></el-date-picker>
              </div>
            </li>
            <li>
              <label>失效日期:</label>
              <div style="display:inline-block">
                <el-date-picker
                  v-model="formData.ruleVersionExpirationDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="disabled"
                ></el-date-picker>
              </div>
            </li>
            <li>
              <label>操作人:</label>
              <span>{{ formData.updateByName }}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!-- 1为普通条目
            <div v-if="commonList.length" class="info">
        <el-card class="box-card">
          <div class="tit">{{ detailsData.entryTypeName }}</div>
          <el-row>
            <el-col :span="2">
              <p class="classfy-tit">规则开关</p>
            </el-col>
            <el-col :span="22">
              <p class="classfy-tit">规则配置</p>
            </el-col>
          </el-row>
          <div v-for="(item, index) in commonList" :key="index">
            <el-row>
              <el-col :span="2">
                <el-switch
                  v-model="item.entryIsUse"
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
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
                      :disabled="disabled"
                      placeholder="请输入"
                    ></el-input>
                  </span>
                  <label
                    v-if="citem.variableLabelLast"
                    style="display:inline-block"
                    >{{ citem.variableLabelLast }}</label>
                </span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      2测算条目
      <div v-if="calculateList.length" class="table-box">
        <div
          class="tit"
          style="font-size: 18px;
    height: 50px;
    line-height: 50px;"
        >
          {{ detailsData.entryTypeName || calculateList[0].entryName }}
        </div>
        <div>
          <el-table :data="calculateList">
            <el-table-column
              v-for="(item, index) in calculateList[0]
                .tdRuleVersionVariableList"
              :key="index"
              :label="item.variableEngName"
              width="180"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="
                    scope.row.tdRuleVersionVariableList[index].variableValue
                  "
                  :disabled="disabled"
                ></el-input>
              </template>
              <el-input
                v-model="item.variableValue"
                :disabled="disabled"
              ></el-input>
            </el-table-column>
            <el-table-column v-if="!disabled" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteRow(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!disabled" class="buton-box" style="margin-top:10px">
            <el-button size="middle" @click="addRow">新增</el-button>
          </div>
        </div>
      </div>-->

      <div v-for="(ele, _index) in detailsData" :key="_index">
        <div class="tit">{{ ele.entryTypeName }}</div>
        <!--1为普通条目-->
        <div v-if="ele.commonList.length" class="info">
          <el-card class="box-card">
            <el-row>
              <el-col :span="2">
                <p class="classfy-tit">规则开关</p>
              </el-col>
              <el-col :span="22">
                <p class="classfy-tit">规则配置</p>
              </el-col>
            </el-row>
            <div v-for="(item, index) in ele.commonList" :key="index">
              <el-row>
                <el-col :span="2">
                  <el-switch
                    v-model="item.entryIsUse"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-col>
                <el-col :span="22">
                  <span
                    v-for="(citem, cindex) in item.tdRuleVersionVariableList"
                    :key="cindex"
                  >
                    <label style="display:inline-block">
                      {{ citem.variableLabel }}
                    </label>
                    <span
                      style="display:inline-block;width:80px;margin: 0px 10px;"
                    >
                      <el-input
                        v-model="citem.variableValue"
                        :disabled="disabled"
                        placeholder="请输入"
                      ></el-input>
                    </span>
                    <label
                      v-if="citem.variableLabelLast"
                      style="display:inline-block"
                      >{{ citem.variableLabelLast }}</label>
                  </span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <!-- 2测算条目 -->
        <div v-if="ele.tableList.length" class="table-box">
          <!-- <div
            class="tit"
            style="font-size: 18px;
    height: 50px;
    line-height: 50px;"
          >{{ ele.entryTypeName || calculateList[0].entryName }}</div> -->
          <div>
            <div
              v-for="(tableItem, tableIndex) in ele.tableList"
              :key="tableIndex"
              class="table-item"
            >
              <el-table :data="calculateList[_index][tableIndex]">
                <el-table-column
                  v-for="(item, index) in tableItem.tdRuleVersionVariableList"
                  :key="index"
                  :label="item.variableEngName"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="
                        scope.row.tdRuleVersionVariableList[index].variableValue
                      "
                      :disabled="disabled"
                    ></el-input>
                  </template>
                  <el-input
                    v-model="item.variableValue"
                    :disabled="disabled"
                  ></el-input>
                </el-table-column>
                <el-table-column v-if="!disabled" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="
                        deleteRow(_index, tableIndex, scope.$index, scope.row)
                      "
                      >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="!disabled" class="buton-box" style="margin-top:10px">
                <el-button
size="middle"
@click="addRow(_index, tableIndex)"
>新增</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info" style="margin-top:20px">
      <el-card class="box-card">
        <div style="text-align:center">
          <el-button
v-if="!disabled"
type="primary"
@click="handleSubmit"
>提交</el-button>
          <el-button @click="handleCancel">返回</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detailsData: {},
      formData: {},
      calculateList: [],
      calculateRowData: []
    };
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      /** 查看规则 */
      this.$emit('init', this);
    },
    handleSubmit() {
      let tdRuleVersionEntryList = [];
      this.calculateList.map((cardItem, cardIndex) => {
        // 合并普通条目
        const cardData = this.detailsData[cardIndex];
        tdRuleVersionEntryList = tdRuleVersionEntryList.concat(
          cardData.tdRuleVersionEntryList.filter(
            item => item.entryShowType === '1'
          )
        );
        cardItem.map((tableItem, tableIndex) => {
          // 合并测算条目
          tdRuleVersionEntryList = tdRuleVersionEntryList.concat(tableItem);
          // tableItem.map((rowItem, rowIndex) => {
          //   // 对应的大表数据
          //   // 第一条为接口返回的数据，已实现双向绑定
          //   if (rowIndex !== 0) {
          //     cardData.tdRuleVersionEntryList.push(rowItem)
          //   }
          //   // 对应的table,需要先排除普通条目
          //   // const tableDataList = cardData.tdRuleVersionEntryList.filter(item => item.entryShowType === '2')
          //   // // 复制表格
          //   // const tableItemData = JSON.parse(JSON.stringify(tableDataList[tableIndex]))
          //   // tableItemData.tdRuleVersionVariableList.map(variableItem => {
          //   //   variableItem.variableValue = ''
          //   // })
          // })
        });
      });
      console.log(this.detailsData);
      this.$emit('submit', this, tdRuleVersionEntryList);
    },
    handleCancel() {
      this.$router.push({
        path: '/governmentPurchaser/rulesManage/rulesIndex',
        query: {
          busId: this.$route.query.busId
        }
      });
    },
    addRow(cardIndex, tableIndex) {
      const tempObj = JSON.parse(
        JSON.stringify(this.calculateList[cardIndex][tableIndex][0])
      );
      tempObj.tdRuleVersionVariableList.map(item => {
        item.variableValue = '';
      });
      this.calculateList[cardIndex][tableIndex].push(
        JSON.parse(JSON.stringify(tempObj))
      );
    },
    deleteRow(cardIndex, tableIndex, index) {
      if (index === 0) {
        this.$message.warning('至少保留一项!');
      } else {
        this.calculateList[cardIndex][tableIndex].splice(index, 1);
      }
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
  .tit {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }
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
      }
    }
  }
}
.add-btn {
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  margin-top: 10px;
  .el-button {
    width: 100px;
  }
}
</style>
