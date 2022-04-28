<template>
  <div class="app-container">
    <QueryTable
      ref="queryTable"
      :form-data="formData"
      :query-params="queryParams"
      :get-data="getData"
      :inline='false'
      :form-style="queryFormStyle"
    >
      <template slot="form">
        <el-col :span="6">
          <el-form-item label="催收人员" prop="sysName" >
            <el-select
              clearable
              v-model="queryParams.sysName"
              placeholder="请选择催收人员"
              style="width:100%"
            >
              <el-option
                v-for="item in sysNameDicts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="queryParams.startDate"
              type="date"
              placeholder="请选择开始日期"
              value-format="yyyy-MM-dd 00:00:00"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="queryParams.endDate"
              type="date"
              placeholder="请选择结束日期"
              value-format="yyyy-MM-dd 23:59:59"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </template>
      <template slot="operating">
        <el-row :gutter="10" style="padding-left:65px">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-download"
              size="mini"
              @click="exportFileByCond"
            >导出</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" label="催收人员" prop="sysName" />
        <el-table-column align="center" label="话机ID" prop="mobileId" />
        <el-table-column align="center" label="录音文件" width="350">
          <template slot-scope="scope">
            <audio v-bind:src="scope.row.url + scope.row.fileName" controls="controls"></audio>
          </template>
        </el-table-column>
        <el-table-column align="center" label="生成时间" prop="creatTime" :formatter="formatDate1" />
        <el-table-column align="center" label="主叫号码" prop="callerNo" />
        <el-table-column align="center" label="被叫号码" prop="calledNo" />
        <el-table-column align="center" label="通话起始时间" prop="talkStartTime" :formatter="formatDate1" />
        <el-table-column align="center" label="通话结束时间" prop="talkEndTime" :formatter="formatDate1" />
        <el-table-column align="center" label="通话时长(秒)" prop="talkSpendTime" />
        <el-table-column align="center" label="呼叫类型" prop="callType" :formatter="formatCallType"/>
      </template>
    </QueryTable>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { videoInfoApi } from '@/api/videoInfo';
import {
  listUser
} from '@/api/system/user';
import moment from 'moment';
export default {
  name: 'VideoInfo',
  components: { QueryTable },
  data() {
    return {
      sysNameDicts: [],
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startDate: undefined,
        endDate: undefined,
        callerNo: undefined,
        calledNo: undefined,
        callType: undefined,
        sysName: undefined
      },
      formData: [
        { label: '主叫号码', model: 'callerNo', type: 'input' },
        { label: '被叫号码', model: 'calledNo', type: 'input' },
        { label: '呼叫类型', model: 'callType', type: 'select', dictOptions: [{ dictValue: 'I', dictLabel: '呼入' }, { dictValue: 'O', dictLabel: '呼出' }, { dictValue: 'N', dictLabel: '内呼' }] }
      ],
      getData: videoInfoApi.getVideoInfoList
    }
  },
  created() {
    const params = { pageNum: 1, pageSize: 1000000, deptId: 255 };
    listUser(params).then(response => {
      var sysNameDicts_ = this.sysNameDicts;
      response.rows.forEach(function(item) {
        sysNameDicts_.push({ 'value': item.nickName, 'label': item.nickName });
      })
    }
    );
  },
  methods: {
    formatDate1(row, column) {
      const data = row[column.property]
      if (data == null) {
        return null;
      }
      return moment(data).format('YYYY-MM-DD HH:mm:ss');
    },
    formatCallType(row, column) {
      const data = row[column.property]
      if (data === 'I') {
        return '呼入';
      } else if (data === 'O') {
        return '呼出';
      } else if (data === 'N') {
        return '内呼';
      }
      return null;
    },
    exportFileByCond() {
      videoInfoApi.exportFileByCond(this.queryParams).then(res => {
        if (res.code === 200) {
          this.$download(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
