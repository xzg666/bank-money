<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="138px"
    >
      <el-form-item label="借款合同编号" prop="jkhtbh">
        <el-input
          v-model="queryParams.jkhtbh"
          placeholder="请输入借款合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保合同编号" prop="dbhtbh">
        <el-input
          v-model="queryParams.dbhtbh"
          placeholder="请输入担保合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款人姓名" prop="jkrxm">
        <el-input
          v-model="queryParams.jkrxm"
          placeholder="请输入借款人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款人证件号" prop="jkrzjh">
        <el-input
          v-model="queryParams.jkrzjh"
          placeholder="请输入借款人证件号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款管理部名称" prop="dkglbmc">
        <el-input
          v-model="queryParams.dkglbmc"
          placeholder="请输入贷款管理部名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="共同借款人姓名" prop="gtjkrxm">
        <el-input
          v-model="queryParams.gtjkrxm"
          placeholder="请输入共同借款人姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放款日期" prop="fkrq">
        <el-date-picker
          v-model="queryParams.fkrq"
          placeholder="请选择放款日期"
          value-format="yyyy-MM-dd"
          type="date"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="抵押物所属省份" prop="dywsssf">
        <el-input
          v-model="queryParams.dywsssf"
          placeholder="请输入抵押物所属省份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抵押物所属城市" prop="dywsscs">
        <el-input
          v-model="queryParams.dywsscs"
          placeholder="请输入抵押物所属城市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抵押物所属行政区" prop="dywssxzq">
        <el-input
          v-model="queryParams.dywssxzq"
          placeholder="请输入抵押物所属行政区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小区楼盘名称" prop="lpmc">
        <el-input
          v-model="queryParams.lpmc"
          placeholder="请输入小区楼盘名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button>
        <el-button
icon="el-icon-refresh"
size="mini"
@click="resetQuery"
>重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :show-search.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="qzxList"
      @selection-change="handleSelectionChange"
      @row-dblclick="clickRow"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="借款合同编号"
        align="center"
        prop="jkhtbh"
        width="180"
      />
      <el-table-column
        label="担保合同编号"
        align="center"
        prop="dbhtbh"
        width="180"
      />
      <el-table-column
        label="借款人姓名"
        align="center"
        prop="jkrxm"
        width="180"
      />
      <el-table-column
        label="借款人证件号"
        align="center"
        prop="jkrzjh"
        width="180"
      />
      <el-table-column
        label="合同贷款金额"
        align="center"
        prop="htdkje"
        width="180"
      />
      <el-table-column
        label="贷款管理部名称"
        align="center"
        prop="dkglbmc"
        width="180"
      />
      <el-table-column
        label="共同借款人姓名"
        align="center"
        prop="gtjkrxm"
        width="180"
      />
      <el-table-column
        label="放款日期"
        align="center"
        prop="fkrq"
        width="180"
      />
      <el-table-column
        label="房屋坐落"
        align="center"
        prop="fwzl"
        width="180"
      />
      <el-table-column
        label="预抵押权证号"
        align="center"
        prop="ydyqzh"
        width="180"
      />
      <el-table-column
        label="预抵押登记日期"
        align="center"
        prop="ydydjrq"
        width="180"
      >
      </el-table-column>
      <el-table-column label="抵押物权证号" align="center" prop="dywqzh" />
      <el-table-column
        label="抵押权建立日期"
        align="center"
        prop="dyqjlrq"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="抵押物他项权证号"
        align="center"
        prop="dywtxqzh"
        width="180"
      />
      <el-table-column
        label="抵押物所属省份"
        align="center"
        prop="dywsssf"
        width="180"
      />
      <el-table-column
        label="抵押物所属城市"
        align="center"
        prop="dywsscs"
        width="180"
      />
      <el-table-column
        label="抵押物所属行政区"
        align="center"
        prop="dywssxzq"
        width="180"
      />
      <el-table-column
        label="小区楼盘名称"
        align="center"
        prop="lpmc"
        width="180"
      />
      <el-table-column
        label="数据更新时间"
        align="center"
        prop="sjgxsj"
        width="180"
      >
      </el-table-column>
      <el-table-column label="是否同步" align="center" prop="sftb">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.is_tb || [],
              scope.row.sftb
            )
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="数据同步时间"
        align="center"
        prop="sjtbsj"
        width="180"
      >
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-col :span="8">
          <el-form-item label="借款合同编号" prop="jkhtbh">
            <el-input v-model="form.jkhtbh" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="担保合同编号" prop="dbhtbh">
            <el-input v-model="form.dbhtbh" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="借款人姓名" prop="jkrxm">
          <el-input v-model="form.jkrxm" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="借款人证件号" prop="jkrzjh">
          <el-input v-model="form.jkrzjh" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="合同贷款金额" prop="htdkje">
          <el-input v-model="form.htdkje" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="贷款管理部名称" prop="dkglbmc">
          <el-input v-model="form.dkglbmc" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="共同借款人姓名" prop="gtjkrxm">
          <el-input v-model="form.gtjkrxm" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="放款日期" prop="fkrq">
          <el-date-picker
            v-model="form.fkrq"
            clearable
            size="medium"
            type="date"
            value-format="yyyy-MM-dd"
            class="long-width"
            disabled
          >
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="房屋坐落" prop="fwzl">
          <el-input v-model="form.fwzl" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="预抵押权证号" prop="ydyqzh">
          <el-input v-model="form.ydyqzh" placeholder="请输入预抵押权证号" />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="预抵押登记日期" prop="ydydjrq">
          <el-date-picker
            v-model="form.ydydjrq"
            clearable
            size="medium"
            type="date"
            class="long-width"
            value-format="yyyy-MM-dd"
            placeholder="选择预抵押登记日期"
          >
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押物权证号" prop="dywqzh">
          <el-input v-model="form.dywqzh" placeholder="请输入抵押物权证号" />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押权建立日期" prop="dyqjlrq">
          <el-date-picker
            v-model="form.dyqjlrq"
            class="long-width"
            clearable
            size="medium"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择抵押权建立日期"
          >
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押物他项权证号" prop="dywtxqzh">
          <el-input
            v-model="form.dywtxqzh"
            placeholder="请输入抵押物他项权证号"
          />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押物所属省份" prop="dywsssf">
          <el-input v-model="form.dywsssf" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押物所属城市" prop="dywsscs">
          <el-input v-model="form.dywsscs" disabled />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="抵押物所属行政区" prop="dywssxzq">
          <el-input
            v-model="form.dywssxzq"
            disabled
          />
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="小区楼盘名称" prop="lpmc">
          <el-input v-model="form.lpmc" disabled />
        </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listQzx,
  getQzx,
  delQzx,
  addQzx,
  updateQzx,
  exportQzx
} from '@/api/dataBased/index';

export default {
  name: 'Qzx',
  components: {},
  data() {
    return {
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
      // 【请填写功能名称】表格数据
      qzxList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        jkhtbh: null,
        dbhtbh: null,
        jkrxm: null,
        jkrzjh: null,
        htdkje: null,
        dkglbmc: null,
        gtjkrxm: null,
        fkrq: null,
        fwzl: null,
        ydyqzh: null,
        ydydjrq: null,
        dywqzh: null,
        dyqjlrq: null,
        dywtxqzh: null,
        dywsssf: null,
        dywsscs: null,
        dywssxzq: null,
        lpmc: null,
        sjgxsj: null,
        sftb: null,
        sjtbsj: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      istbFormat: []
    };
  },
  created() {
    this.getList();
    // shifou ton
    this.$getDicts('is_tb').then(response => {
      this.istbFormat = response.data;
    });
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listQzx(this.queryParams).then(response => {
        this.qzxList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        jkhtbh: null,
        dbhtbh: null,
        jkrxm: null,
        jkrzjh: null,
        htdkje: null,
        dkglbmc: null,
        gtjkrxm: null,
        fkrq: null,
        fwzl: null,
        ydyqzh: null,
        ydydjrq: null,
        dywqzh: null,
        dyqjlrq: null,
        dywtxqzh: null,
        dywsssf: null,
        dywsscs: null,
        dywssxzq: null,
        lpmc: null,
        sjgxsj: null,
        sftb: null,
        sjtbsj: null
      };
      // this.queryForm = {};
      this.$resetForm('queryForm');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$resetForm('queryForm');
      // this.queryForm = {};
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = '添加【请填写功能名称】';
    // },
    /** 修改按钮操作 */
    clickRow(row) {
      // this.reset();
      const id = row.id || this.ids;
      // if (id != null) {
      // getQzx(id).then(response => {
      this.form = row;
      this.open = true;
      this.title = '修改';
      // });
      // } else {
      //   this.reset();
      //   this.open = true;
      //   this.title = '添加';
      // }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            console.log('this.form', this.form);
            updateQzx(this.form).then(response => {
              this.$message.success('修改成功');
              this.open = false;
              this.getList();
            });
          }
          // else {
          //   addQzx(this.form).then(response => {
          //     this.msgSuccess('新增成功');
          //     this.open = false;
          //     this.getList();
          //   });
          // }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delQzx(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.exportLoading = true;
          return exportQzx(queryParams);
        })
        .then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.long-width {
  width: 100%;
}
</style>
