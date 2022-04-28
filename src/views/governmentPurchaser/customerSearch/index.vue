<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      row-key="gysshdb"
    >
      <!-- <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="editCustomerTags"
            >修改客户标签</el-button>
          </el-col>
        </el-row>
      </template>-->
      <template slot="table">
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="统一社会信用代码"
          prop="gysshdb"
        ></el-table-column>
        <el-table-column
          align="center"
          width="170"
          label="供应商名称"
          show-overflow-tooltip
          prop="gysmc"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          label="客户星级"
          prop="khxjpd"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="优惠费率(%)"
          prop="xyfl"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="卖场注册手机号码"
          prop="mczcsjh"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="增信时长(月)"
          prop="zxzscM"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="增信年限(年)"
          prop="zxLevel"
        ></el-table-column>
        <el-table-column
          align="center"
          label="卖场星级"
          prop="storeStar"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          show-overflow-tooltip
          label="是否违约"
          prop="isContract"
        >
          <template slot-scope="scope">{{
            $selectDictLabel(
              $store.getters.dictData.yes_no || [],
              scope.row.isContract
            )
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="是否警示"
          prop="isWarning"
        >
          <template slot-scope="scope">{{
            $selectDictLabel(
              $store.getters.dictData.yes_no || [],
              scope.row.isWarning
            )
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="分支机构"
          prop="fzOrg"
        ></el-table-column>
      </template>
    </query-table>

    <el-dialog
      :visible.sync="tagsShow"
      width="50%"
      append-to-body
      title="修改标签"
    >
      <el-form label-width="100px" inline>
        <el-form-item label="是否违约">
          <el-select v-model="dialogData.isContract">
            <el-option
              v-for="item in $store.getters.dictData.yes_no || []"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否警示">
          <el-select v-model="dialogData.isWarning">
            <el-option
              v-for="item in $store.getters.dictData.yes_no || []"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button
          icon="el-icon-circle-close"
          size="mini"
          @click="tagsShow = false"
          >取消</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          size="mini"
          @click="saveTags"
          >保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { customerSearchApi } from '@/api/governmentPurchaser';
export default {
  name: 'CustomerSearch',

  components: { QueryTable },

  data() {
    return {
      queryParams: {
        pageNum: 0,
        pageSize: 0,
        zxsxrq: undefined,
        zxgqrq: undefined,
        gysmc: undefined,
        sendStatus: undefined,
        fzOrg: undefined,
        blrq: undefined,
        zxType: undefined
      },
      selectRows: [],
      getData: customerSearchApi.getPageList,
      tagsShow: false,
      dialogData: {}
    };
  },
  computed: {
    formData: function() {
      return [
        {
          label: '分支机构',
          type: 'select',
          model: 'fzOrg',
          dictOptions: [
            { dictLabel: '长沙', dictValue: '长沙' },
            { dictLabel: '株洲', dictValue: '株洲' },
            { dictLabel: '湘潭', dictValue: '湘潭' },
            { dictLabel: '湘西', dictValue: '湘西' },
            { dictLabel: '郴州', dictValue: '郴州' }
          ]
        },
        // { label: '增信状态', type: 'select', model: 'sendStatus', dictOptions: this.$store.getters.dictData.addCredit_status || [] },
        // { label: '增信类型', type: 'select', model: 'zxType', dictOptions: this.$store.getters.dictData.addCredit_type || [] },
        {
          label: '供应商星级',
          type: 'select',
          model: 'khxjpd',
          dictOptions: this.$store.getters.dictData.supplier_level || []
        },
        // { label: '增信状态', type: 'select', model: 'sendStatus', dictOptions: this.$store.getters.dictData.addCredit_status || [] },
        { label: '供应商名称', model: 'gysmc' },
        { label: '社会信用代码', model: 'gysshdb' }
      ];
    }
  },
  // created() {
  //   this.queryParams.pageNum = 1;
  //   this.queryParams.pageSize = 10;
  // },

  methods: {
    editCustomerTags() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据!');
        return;
      }
      this.tagsShow = true;
      const { isContract, isWarning, gysshdb } = this.selectRows[0];
      this.dialogData = { isContract, isWarning, gysshdb };
    },
    saveTags() {
      this.$confirm('确定保存客户标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        customerSearchApi.editTags(this.dialogData).then(res => {
          if (res.code === 200) {
            this.$msgSuccess('保存成功!');
            this.tagsShow = false;
            this.$refs.QueryTable.getList();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
