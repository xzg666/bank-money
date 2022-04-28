<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getPageList"
      :inline="false"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px;margin-top:20px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              :icon="exportIcon"
              :disabled="exportIcon == 'el-icon-loading'"
              @click="clickExport"
              >导出</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="供应商名称"
          prop="gysmc"
        ></el-table-column>
        <el-table-column
          align="center"
          width="170"
          label="客户合同编号"
          prop="khbh"
        ></el-table-column>
        <el-table-column
          align="center"
          width="170"
          label="保函编号"
          prop="bhNo"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="增信额度(元)"
          prop="zxed"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="办理日期"
          prop="blrq"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="推送时间"
          prop="sendDate"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="增信成功时间"
          prop="zxSucDate"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="撤销增信时间"
          prop="canelZxDate"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="增信生效日期"
          prop="zxsxrq"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="增信失效日期"
          prop="zxgqrq"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="收费金额(元)"
          prop="sfje"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="合作方"
          prop="hzf"
        ></el-table-column> -->
        <el-table-column
          align="center"
          width="150"
          label="卖场注册手机号"
          prop="mczcsjh"
        ></el-table-column>
        <el-table-column align="center" label="增信状态" prop="send_status">
          <template slot-scope="scope">{{
            $selectDictLabel(
              $store.getters.dictData.addCredit_status || [],
              scope.row.sendStatus
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
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { guaranteeSendApi, detailSearchApi } from '@/api/electGuarantee';
export default {
  name: 'DetailSearch',

  components: { QueryTable },

  directives: {},

  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        timeType: undefined,
        zxsxrq: undefined,
        zxgqrq: undefined,
        gysmc: undefined,
        sendStatus: undefined,
        fzOrg: undefined,
        blrq: undefined
      },
      selectRows: [],
      exportIcon: 'el-icon-download'
      // getData: guaranteeSendApi.getPageList
    };
  },
  computed: {
    formData: function() {
      return [
        {
          label: '时间范围',
          type: 'select',
          model: 'timeType',
          dictOptions: [
            { dictLabel: '增信生效时间', dictValue: '1' },
            { dictLabel: '办理时间', dictValue: '2' },
            { dictLabel: '推送时间', dictValue: '3' },
            { dictLabel: '增信成功时间', dictValue: '4' },
            { dictLabel: '撤销增信时间', dictValue: '5' }
          ]
        },
        { label: '开始时间', type: 'date', model: 'startTime' },
        { label: '结束时间', type: 'date', model: 'endTime' },
        { label: '供应商名称', model: 'gysmc' },
        {
          label: '增信状态',
          type: 'select',
          model: 'sendStatus',
          dictOptions: this.$store.getters.dictData.addCredit_status || []
        },
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
        }
      ];
    }
  },
  mounted() {},

  methods: {
    getPageList(data) {
      // 处理页面请求参数
      const paramsData = {};
      paramsData.gysmc = data.gysmc;
      paramsData.sendStatus = data.sendStatus;
      paramsData.fzOrg = data.fzOrg;
      paramsData.pageNum = data.pageNum;
      paramsData.pageSize = data.pageSize;
      if (data.timeType === '1') {
        paramsData.zxyxStart = data.startTime;
        paramsData.zxyxEnd = data.endTime;
      } else if (data.timeType === '2') {
        paramsData.blrqStart = data.startTime;
        paramsData.blrqEnd = data.endTime;
      } else if (data.timeType === '3') {
        paramsData.sendStartDate = data.startTime + ' 00:00:00';
        paramsData.sendEndDate = data.endTime + ' 23:59:59';
      } else if (data.timeType === '4') {
        paramsData.zxSucStartDate = data.startTime + ' 00:00:00';
        paramsData.zxSucEndDate = data.endTime + ' 23:59:59';
      } else if (data.timeType === '5') {
        paramsData.canelZxStartDate = data.startTime + ' 00:00:00';
        paramsData.canelZxEndDate = data.endTime + ' 23:59:59';
      }
      return guaranteeSendApi.getPageList(paramsData);
    },
    clickExport() {
      const exportObj = Object.assign({}, this.queryParams);
      if (exportObj.timeType === '1') {
        exportObj.zxyxStart = exportObj.startTime;
        exportObj.zxyxEnd = exportObj.endTime;
      } else if (exportObj.timeType === '2') {
        exportObj.blrqStart = exportObj.startTime;
        exportObj.blrqEnd = exportObj.endTime;
      } else if (exportObj.timeType === '3') {
        exportObj.sendStartDate = exportObj.startTime + ' 00:00:00';
        exportObj.sendEndDate = exportObj.endTime + ' 23:59:59';
      } else if (exportObj.timeType === '4') {
        exportObj.zxSucStartDate = exportObj.startTime + ' 00:00:00';
        exportObj.zxSucEndDate = exportObj.endTime + ' 23:59:59';
      } else if (exportObj.timeType === '5') {
        exportObj.canelZxStartDate = exportObj.startTime + ' 00:00:00';
        exportObj.canelZxEndDate = exportObj.endTime + ' 23:59:59';
      }
      delete exportObj.startTime;
      delete exportObj.endTime;
      delete exportObj.pageSize;
      delete exportObj.pageNum;
      for (const key in exportObj) {
        if (exportObj[key]) {
          this.exportDetail(exportObj);
          return;
        } else {
          this.$confirm('您确定要导出数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.exportDetail(exportObj);
          });
        }
      }
    },
    exportDetail(Obj) {
      this.exportIcon = 'el-icon-loading';
      detailSearchApi.exportDetail(Obj).then(res => {
        if (res.code === 200) {
          this.$download(res.msg);
        }
        this.exportIcon = 'el-icon-download';
      });
    },
    getSelectRowsIdList(arr) {
      const tempList = [];
      let str = '';
      arr.map(item => {
        tempList.push(item.id);
      });
      str = tempList.toString();
      return str;
    }
  }
};
</script>

<style lang="scss" scoped></style>
