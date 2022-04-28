<template>
  <div>
    <el-card>
      <div style="margin-left:25px;">
        <el-row>
          <el-col :span="4">
            <label>姓名:</label>
            <span>{{ name }}</span>
          </el-col>
          <el-col :span="5">
            <label>身份证号:</label>
            <span>{{ certNo }}</span>
          </el-col>
        </el-row>
      </div>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
      >
        <template slot="table">
          <el-table-column
            label="经办人姓名"
            prop="jbrxm"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="经办人手机号码" prop="jbrsjhm" width="130" />
          <el-table-column
            label="单位名称"
            prop="dwmc"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="单位地址" prop="dwdz" width="100" />
          <el-table-column label="单位账户" prop="dwzh" width="120" />
          <el-table-column label="受托银行" prop="styhmc" width="130" />
          <el-table-column label="组织机构代码" prop="zzjgdm" width="180" />
          <el-table-column
            label="法人代表证件号码"
            prop="dwfrdbzjhm"
            width="180"
          />
          <el-table-column label="单位开户日期" prop="dwkhrq" width="180" />
          <el-table-column label="缴存余额" prop="dwzhye" width="130" />
          <el-table-column label="账户状态" prop="dwzhzt" width="130">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_unit_status || [],
                  scope.row.dwzhzt
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="缴存人数" prop="dwjcrs" width="130" />
          <el-table-column label="封存人数" prop="dwfcrs" width="130" />
          <el-table-column label="缴至年月" prop="jzny" width="130" />
          <el-table-column label="单位缴存比例" prop="dwjcbl" width="130" />
          <el-table-column label="个人缴存比例" prop="grjcbl" width="130" />
          <el-table-column label="单位销户日期" prop="dwxhrq" width="130" />
          <el-table-column label="单位销户原因" prop="dwxhyy" width="130">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_unit_cancel_season || [],
                  scope.row.dwxhyy
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="经办人证件号码" prop="jbrzjhm" width="180" />
          <el-table-column label="法人代表姓名" prop="dwfrdbxm" width="130" />
          <el-table-column label="联系电话" prop="lxdh" width="130" />
          <!-- <el-table-column label="月缴存额" prop="yjce" width="130" /> -->
          <!-- <el-table-column label="缴存机构" prop="jcjg" width="130" /> -->
          <!-- <el-table-column label="年度调比次数" prop="ndtbcs" width="130" /> -->
          <!-- <el-table-column label="清册年月" prop="qcny" width="130" /> -->
          <!-- <el-table-column label="绑办卡人数" prop="bbkrs" width="130" /> -->
        </template>
      </query-table>
    </el-card>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { registerBody } from '@/api/urge/register';
export default {
  name: 'Company', // 单位信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    },
    grzh: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      queryFormStyle: {
        'label-width': '110px',
        'label-position': 'left'
      },
      queryParams: {
        // certNo: this.certNo,
        // name: this.name
        pageSize: 10,
        pageNum: 1,
        grzh: this.grzh
      },
      formData: [
        // { label: '姓名', model: 'name', disabled: true, span: 8 },
        // { label: '证件号码', model: 'certNo', disabled: true, span: 8 }
      ],
      getData: registerBody.getCompanyInfo
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
