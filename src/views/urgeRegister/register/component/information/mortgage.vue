<template>
  <div>
    <el-card>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
        :show-export="true"
        button-span="6"
      >
        <template slot="operating">
          <el-button type="primary">打印预览</el-button>
        </template>
        <template slot="table">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <el-table-column
            label="借款人姓名"
            prop="jkrxm"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="借款人证件类型" prop="jkrzjlx" width="130">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.cert_type || [],
                  scope.row.jkrzjlx
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="借款人证件号"
            prop="jkrzjh"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="个人账号" prop="grzh" width="100" />
          <el-table-column label="借款合同编号" prop="jkhtbh" width="120" />
          <el-table-column label="抵押物房屋坐落" prop="dywfwzl" width="150" />
          <el-table-column label="建筑面积" prop="jzmj" width="130" />
          <el-table-column label="房屋单价" prop="fwzj" width="130" />
          <el-table-column label="抵押物权证号" prop="dywqzh" width="130" />
          <el-table-column
            label="抵押物他项权证号"
            prop="dywtxqzh"
            width="150"
          />
          <!-- <el-table-column label="抵押物产权人" prop="dywcqr" width="100" />
          <el-table-column label="贷款所购房" prop="dksgf" width="120" /> -->
          <el-table-column label="抵押人姓名" prop="dyrxm" width="100" />
        </template>
      </query-table>
    </el-card>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { registerBody } from '@/api/urge/register';
export default {
  name: 'Mortgage', // 抵押物信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    dbhtbh: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right'
      },
      queryParams: {
        zjhm: this.certNo,
        pageSize: 10,
        pageNum: 1
      },
      formData: [],
      getData: registerBody.getCollateralInfoInfo
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
