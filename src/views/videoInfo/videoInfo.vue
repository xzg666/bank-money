<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="开始时间" prop="talkStartTime">
            <el-date-picker clearable size="small"
                            v-model="queryParams.talkStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder=""
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间" prop="talkEndTime">
            <el-date-picker clearable size="small"
                            v-model="queryParams.talkEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder=""
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主叫号码" prop="callerNo">
            <el-input
              v-model="queryParams.callerNo"
              placeholder=""
              clearable
              style="width: 220px"
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="被叫号码" prop="calledNo">
            <el-input
              v-model="queryParams.calledNo"
              placeholder=""
              clearable
              size="small"
              style="width: 220px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="呼叫类型" prop="callType">
            <el-select v-model="queryParams.callType" placeholder="" clearable size="small" style="width: 220px">
              <el-option
                v-for="dict in callType"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="催收人员" prop="sysName">
            <el-select v-model="queryParams.sysName" placeholder="" size="small" style="width: 220px">
              <el-option
                v-for="sysName in sysNames"
                :key="sysName"
                :label="sysName"
                :value="sysName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-button
        type="warning"
        plain
        icon="el-icon-download"
        size="mini"
        :loading="exportLoading"
        @click="handleExport"
        v-hasPermi="['system:info:export']"
      >导出
      </el-button>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList">
      <el-table-column label="催收人员" align="center" prop="sysName" width="100"/>
      <el-table-column label="话机ID" align="center" prop="mobileId" width="180"/>
      <el-table-column label="录音文件" align="center" width="400">
        <template slot-scope="scope">
          <audio :src="scope.row.url" controls="controls" style="width:400px;"></audio>
        </template>
      </el-table-column>
      <el-table-column label="生成时间" align="center" prop="creatTime" width="180">
        <template slot-scope="scope">
          <span>{{ $parseTime(scope.row.creatTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主叫号码" align="center" prop="callerNo" width="180"/>
      <el-table-column label="被叫号码" align="center" prop="calledNo" width="180"/>
      <el-table-column label="通话起始时间" align="center" prop="talkStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ $parseTime(scope.row.talkStartTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通话结束时间" align="center" prop="talkEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ $parseTime(scope.row.talkEndTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通话时长(秒)" align="center" prop="talkSpendTime"/>
      <el-table-column label="呼叫类型" width="150" align="center">
        <template slot-scope="scope">
          {{ $selectDictLabel(callType, scope.row.callType) }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listInfo, exportInfo, getSysNameList } from '@/api/videoInfo/info';

export default {
  name: 'Info',
  components: {},
  data() {
    return {
      // 催收人员列表
      sysNames: [],
      // 呼叫类型
      callType: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 录音文件记录表格数据
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mobileId: null,
        url: null,
        fileName: null,
        fileType: null,
        creatTime: null,
        callerNo: null,
        calledNo: null,
        talkStartTime: null,
        talkEndTime: null,
        talkSpendTime: null,
        hangupType: null,
        callType: null,
        sysId: null,
        sysName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.$getDicts('video_info_callType').then((response) => {
      this.callType = response.data;
    });
    getSysNameList().then((response) => {
      this.sysNames = response.data;
    });
    this.getList();
  },
  methods: {
    /** 查询录音文件记录列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageSize: 10 };
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有录音文件记录数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true;
        return exportInfo(queryParams);
      }).then(response => {
        window.location.href = process.env.VUE_APP_BASE_API + '/common/download?fileName=' + encodeURI(response.msg) + '&delete=' + true;
        this.exportLoading = false
      }).catch((exception) => {
        this.exportLoading = false;
        console.log(exception);
      });
    }
  }
};
</script>
