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
          <el-button type="primary">共有人信息</el-button>
          <el-button type="primary">打印预览</el-button>
        </template>
        <template slot="table">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <el-table-column
            label="主贷款人姓名"
            prop="zdkrxm"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="主贷款人证件类型" prop="zdkrzjlx" width="150">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.cert_type || [],
                  scope.row.zdkrzjlx
                )
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="贷款管理部"
            prop="roleKey"
            :show-overflow-tooltip="true"
            width="150"
          /> -->
          <el-table-column
            label="主贷款人证件号码"
            prop="zdkrzjhm"
            width="200"
          />
          <el-table-column
            label="共同借款人公积金账号"
            prop="gtjkrgjjzh"
            width="150"
          />
          <el-table-column label="借款合同编号" prop="jkhtbh" width="150" />
          <el-table-column label="共同借款人姓名" prop="gtjkrxm" width="130" />
          <el-table-column label="手机号码" prop="sjhm" width="130" />
          <el-table-column
            label="共同借款人证件类型"
            prop="gtjkrzjlx"
            width="180"
          >
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.cert_type || [],
                  scope.row.gtjkrzjlx
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="共同借款人证件号码"
            prop="gtjkrzjhm"
            width="200"
          />
          <el-table-column label="单位名称" prop="dwmc" width="100" />
          <el-table-column label="单位地址" prop="dwdz" width="120" />
          <el-table-column label="个人月收入" prop="grysr" width="100" />
          <el-table-column label="月缴总额" prop="yjce" width="100" />
          <el-table-column label="个人账户余额" prop="grzhye" width="100" />
          <el-table-column label="参贷关系" prop="cdgx" width="120" />
          <el-table-column label="个人账户状态" prop="grzhzt" width="100">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_person_status || [],
                  scope.row.grzhzt
                )
              }}
            </template>
          </el-table-column>
        </template>
      </query-table>
    </el-card>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { registerBody } from '@/api/urge/register';
export default {
  name: 'Together', // 共有人信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
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
      getData: registerBody.getJointOwnerInfo
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
