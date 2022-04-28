<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="流程标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入流程标题"
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
      <el-form-item label="借款人证件类型()" prop="jkrzjlx">
        <el-input
          v-model="queryParams.jkrzjlx"
          placeholder="请输入借款人证件类型()"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款人身份证码" prop="jkrsfz">
        <el-input
          v-model="queryParams.jkrsfz"
          placeholder="请输入借款人身份证码"
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
      <el-form-item label="共同借款人证件类型" prop="gtjkrzjlx">
        <el-input
          v-model="queryParams.gtjkrzjlx"
          placeholder="请输入共同借款人证件类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="共同借款人证件号码" prop="gtjkrsfz">
        <el-input
          v-model="queryParams.gtjkrsfz"
          placeholder="请输入共同借款人证件号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="楼盘名称" prop="lpmc">
        <el-input
          v-model="queryParams.lpmc"
          placeholder="请输入楼盘名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="htbh">
        <el-input
          v-model="queryParams.htbh"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房屋坐落" prop="fwzl">
        <el-input
          v-model="queryParams.fwzl"
          placeholder="请输入房屋坐落"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在区域" prop="szqy">
        <el-input
          v-model="queryParams.szqy"
          placeholder="请输入所在区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房屋总价" prop="fwzj">
        <el-input
          v-model="queryParams.fwzj"
          placeholder="请输入房屋总价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="首付款金额" prop="sfkje">
        <el-input
          v-model="queryParams.sfkje"
          placeholder="请输入首付款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="首付款比例" prop="sfkbl">
        <el-input
          v-model="queryParams.sfkbl"
          placeholder="请输入首付款比例"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房屋建筑面积" prop="fwjcmj">
        <el-input
          v-model="queryParams.fwjcmj"
          placeholder="请输入房屋建筑面积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购房次数(1：首套房；2：二套房)" prop="gfcs">
        <el-input
          v-model="queryParams.gfcs"
          placeholder="请输入购房次数(1：首套房；2：二套房)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抵押类型(1：本房抵押；2：他房抵押)" prop="dylx">
        <el-input
          v-model="queryParams.dylx"
          placeholder="请输入抵押类型(1：本房抵押；2：他房抵押)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款金额" prop="dkje">
        <el-input
          v-model="queryParams.dkje"
          placeholder="请输入贷款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款期限" prop="dkqx">
        <el-input
          v-model="queryParams.dkqx"
          placeholder="请输入贷款期限"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年利率" prop="nll">
        <el-input
          v-model="queryParams.nll"
          placeholder="请输入年利率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="还款方式:1.等额本息 2：等额本金" prop="hkfs">
        <el-input
          v-model="queryParams.hkfs"
          placeholder="请输入还款方式:1.等额本息 2：等额本金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每月还款金额" prop="myhkje">
        <el-input
          v-model="queryParams.myhkje"
          placeholder="请输入每月还款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="其他月均负债" prop="qtyjfz">
        <el-input
          v-model="queryParams.qtyjfz"
          placeholder="请输入其他月均负债"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="家庭平均月收入" prop="jtpjysr">
        <el-input
          v-model="queryParams.jtpjysr"
          placeholder="请输入家庭平均月收入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负债比例" prop="fzbl">
        <el-input
          v-model="queryParams.fzbl"
          placeholder="请输入负债比例"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="委托银行" prop="wtyh">
        <el-input
          v-model="queryParams.wtyh"
          placeholder="请输入委托银行"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
        prop="blywd"
      >
        <el-input
          v-model="queryParams.blywd"
          placeholder="请输入办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公积金贷款资格审核时间" prop="gjjdkzgshsj">
        <el-input
          v-model="queryParams.gjjdkzgshsj"
          placeholder="请输入公积金贷款资格审核时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
        prop="ywzt"
      >
        <el-input
          v-model="queryParams.ywzt"
          placeholder="请输入业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务放款时间" prop="cwfksj">
        <el-input
          v-model="queryParams.cwfksj"
          placeholder="请输入财务放款时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务放款备注" prop="cwfkbz">
        <el-input
          v-model="queryParams.cwfkbz"
          placeholder="请输入财务放款备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="委贷实际放款时间" prop="wdsjfksj">
        <el-input
          v-model="queryParams.wdsjfksj"
          placeholder="请输入委贷实际放款时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="委贷实际放款备注" prop="wdsjfkzb">
        <el-input
          v-model="queryParams.wdsjfkzb"
          placeholder="请输入委贷实际放款备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款结清时间" prop="jkjqsj">
        <el-input
          v-model="queryParams.jkjqsj"
          placeholder="请输入借款结清时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款结清备注" prop="jkjqzh">
        <el-input
          v-model="queryParams.jkjqzh"
          placeholder="请输入借款结清备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款解押时间" prop="jkjysj">
        <el-input
          v-model="queryParams.jkjysj"
          placeholder="请输入借款解押时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借款结清备注" prop="jkjybz">
        <el-input
          v-model="queryParams.jkjybz"
          placeholder="请输入借款结清备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公积金入押时间" prop="gjjrysj">
        <el-input
          v-model="queryParams.gjjrysj"
          placeholder="请输入公积金入押时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公积金入押备注" prop="gjjrybz">
        <el-input
          v-model="queryParams.gjjrybz"
          placeholder="请输入公积金入押备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回款时间" prop="hksj">
        <el-input
          v-model="queryParams.hksj"
          placeholder="请输入回款时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回款备注" prop="hkbz">
        <el-input
          v-model="queryParams.hkbz"
          placeholder="请输入回款备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否按时放款(1:是，0：否)" prop="sfasfk">
        <el-input
          v-model="queryParams.sfasfk"
          placeholder="请输入是否按时放款(1:是，0：否)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务监控天数" prop="ywjkts">
        <el-input
          v-model="queryParams.ywjkts"
          placeholder="请输入业务监控天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="cjsj">
        <el-input
          v-model="queryParams.cjsj"
          placeholder="请输入创建时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办理业务员账号id" prop="blywyzh">
        <el-input
          v-model="queryParams.blywyzh"
          placeholder="请输入办理业务员账号id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办理业务员名称" prop="blywymc">
        <el-input
          v-model="queryParams.blywymc"
          placeholder="请输入办理业务员名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
        prop="ztzt"
      >
        <el-input
          v-model="queryParams.ztzt"
          placeholder="请输入整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
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
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:info:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:info:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:info:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:info:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          >导出</el-button>
      </el-col>
      <right-toolbar
        :show-search.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="infoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="委贷业务Id" align="center" prop="wdywId" />
      <el-table-column label="流程标题" align="center" prop="title" />
      <el-table-column label="借款人姓名" align="center" prop="jkrxm" />
      <el-table-column label="借款人证件类型()" align="center" prop="jkrzjlx" />
      <el-table-column label="借款人身份证码" align="center" prop="jkrsfz" />
      <el-table-column label="共同借款人姓名" align="center" prop="gtjkrxm" />
      <el-table-column
        label="共同借款人证件类型"
        align="center"
        prop="gtjkrzjlx"
      />
      <el-table-column
        label="共同借款人证件号码"
        align="center"
        prop="gtjkrsfz"
      />
      <el-table-column label="楼盘名称" align="center" prop="lpmc" />
      <el-table-column label="合同编号" align="center" prop="htbh" />
      <el-table-column label="房屋坐落" align="center" prop="fwzl" />
      <el-table-column label="所在区域" align="center" prop="szqy" />
      <el-table-column label="房屋总价" align="center" prop="fwzj" />
      <el-table-column label="首付款金额" align="center" prop="sfkje" />
      <el-table-column label="首付款比例" align="center" prop="sfkbl" />
      <el-table-column label="房屋建筑面积" align="center" prop="fwjcmj" />
      <el-table-column
        label="购房次数(1：首套房；2：二套房)"
        align="center"
        prop="gfcs"
      />
      <el-table-column
        label="抵押类型(1：本房抵押；2：他房抵押)"
        align="center"
        prop="dylx"
      />
      <el-table-column label="贷款金额" align="center" prop="dkje" />
      <el-table-column label="贷款期限" align="center" prop="dkqx" />
      <el-table-column label="年利率" align="center" prop="nll" />
      <el-table-column
        label="还款方式:1.等额本息 2：等额本金"
        align="center"
        prop="hkfs"
      />
      <el-table-column label="每月还款金额" align="center" prop="myhkje" />
      <el-table-column label="其他月均负债" align="center" prop="qtyjfz" />
      <el-table-column label="家庭平均月收入" align="center" prop="jtpjysr" />
      <el-table-column label="负债比例" align="center" prop="fzbl" />
      <el-table-column label="委托银行" align="center" prop="wtyh" />
      <el-table-column
        label="办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
        align="center"
        prop="blywd"
      />
      <el-table-column
        label="公积金贷款资格审核时间"
        align="center"
        prop="gjjdkzgshsj"
      />
      <el-table-column
        label="业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
        align="center"
        prop="ywzt"
      />
      <el-table-column label="财务放款时间" align="center" prop="cwfksj" />
      <el-table-column label="财务放款备注" align="center" prop="cwfkbz" />
      <el-table-column
        label="委贷实际放款时间"
        align="center"
        prop="wdsjfksj"
      />
      <el-table-column
        label="委贷实际放款备注"
        align="center"
        prop="wdsjfkzb"
      />
      <el-table-column label="借款结清时间" align="center" prop="jkjqsj" />
      <el-table-column label="借款结清备注" align="center" prop="jkjqzh" />
      <el-table-column label="借款解押时间" align="center" prop="jkjysj" />
      <el-table-column label="借款结清备注" align="center" prop="jkjybz" />
      <el-table-column label="公积金入押时间" align="center" prop="gjjrysj" />
      <el-table-column label="公积金入押备注" align="center" prop="gjjrybz" />
      <el-table-column label="回款时间" align="center" prop="hksj" />
      <el-table-column label="回款备注" align="center" prop="hkbz" />
      <el-table-column
        label="是否按时放款(1:是，0：否)"
        align="center"
        prop="sfasfk"
      />
      <el-table-column label="业务监控天数" align="center" prop="ywjkts" />
      <el-table-column label="创建时间" align="center" prop="cjsj" />
      <el-table-column label="办理业务员账号id" align="center" prop="blywyzh" />
      <el-table-column label="办理业务员名称" align="center" prop="blywymc" />
      <el-table-column
        label="整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
        align="center"
        prop="ztzt"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['system:info:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button>
          <el-button
            v-hasPermi="['system:info:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button>
        </template>
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="流程标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入流程标题" />
        </el-form-item>
        <el-form-item label="借款人姓名" prop="jkrxm">
          <el-input v-model="form.jkrxm" placeholder="请输入借款人姓名" />
        </el-form-item>
        <el-form-item label="借款人证件类型()" prop="jkrzjlx">
          <el-input
            v-model="form.jkrzjlx"
            placeholder="请输入借款人证件类型()"
          />
        </el-form-item>
        <el-form-item label="借款人身份证码" prop="jkrsfz">
          <el-input v-model="form.jkrsfz" placeholder="请输入借款人身份证码" />
        </el-form-item>
        <el-form-item label="共同借款人姓名" prop="gtjkrxm">
          <el-input v-model="form.gtjkrxm" placeholder="请输入共同借款人姓名" />
        </el-form-item>
        <el-form-item label="共同借款人证件类型" prop="gtjkrzjlx">
          <el-input
            v-model="form.gtjkrzjlx"
            placeholder="请输入共同借款人证件类型"
          />
        </el-form-item>
        <el-form-item label="共同借款人证件号码" prop="gtjkrsfz">
          <el-input
            v-model="form.gtjkrsfz"
            placeholder="请输入共同借款人证件号码"
          />
        </el-form-item>
        <el-form-item label="楼盘名称" prop="lpmc">
          <el-input v-model="form.lpmc" placeholder="请输入楼盘名称" />
        </el-form-item>
        <el-form-item label="合同编号" prop="htbh">
          <el-input v-model="form.htbh" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="房屋坐落" prop="fwzl">
          <el-input v-model="form.fwzl" placeholder="请输入房屋坐落" />
        </el-form-item>
        <el-form-item label="所在区域" prop="szqy">
          <el-input v-model="form.szqy" placeholder="请输入所在区域" />
        </el-form-item>
        <el-form-item label="房屋总价" prop="fwzj">
          <el-input v-model="form.fwzj" placeholder="请输入房屋总价" />
        </el-form-item>
        <el-form-item label="首付款金额" prop="sfkje">
          <el-input v-model="form.sfkje" placeholder="请输入首付款金额" />
        </el-form-item>
        <el-form-item label="首付款比例" prop="sfkbl">
          <el-input v-model="form.sfkbl" placeholder="请输入首付款比例" />
        </el-form-item>
        <el-form-item label="房屋建筑面积" prop="fwjcmj">
          <el-input v-model="form.fwjcmj" placeholder="请输入房屋建筑面积" />
        </el-form-item>
        <el-form-item label="购房次数(1：首套房；2：二套房)" prop="gfcs">
          <el-input
            v-model="form.gfcs"
            placeholder="请输入购房次数(1：首套房；2：二套房)"
          />
        </el-form-item>
        <el-form-item label="抵押类型(1：本房抵押；2：他房抵押)" prop="dylx">
          <el-input
            v-model="form.dylx"
            placeholder="请输入抵押类型(1：本房抵押；2：他房抵押)"
          />
        </el-form-item>
        <el-form-item label="贷款金额" prop="dkje">
          <el-input v-model="form.dkje" placeholder="请输入贷款金额" />
        </el-form-item>
        <el-form-item label="贷款期限" prop="dkqx">
          <el-input v-model="form.dkqx" placeholder="请输入贷款期限" />
        </el-form-item>
        <el-form-item label="年利率" prop="nll">
          <el-input v-model="form.nll" placeholder="请输入年利率" />
        </el-form-item>
        <el-form-item label="还款方式:1.等额本息 2：等额本金" prop="hkfs">
          <el-input
            v-model="form.hkfs"
            placeholder="请输入还款方式:1.等额本息 2：等额本金"
          />
        </el-form-item>
        <el-form-item label="每月还款金额" prop="myhkje">
          <el-input v-model="form.myhkje" placeholder="请输入每月还款金额" />
        </el-form-item>
        <el-form-item label="其他月均负债" prop="qtyjfz">
          <el-input v-model="form.qtyjfz" placeholder="请输入其他月均负债" />
        </el-form-item>
        <el-form-item label="家庭平均月收入" prop="jtpjysr">
          <el-input v-model="form.jtpjysr" placeholder="请输入家庭平均月收入" />
        </el-form-item>
        <el-form-item label="负债比例" prop="fzbl">
          <el-input v-model="form.fzbl" placeholder="请输入负债比例" />
        </el-form-item>
        <el-form-item label="委托银行" prop="wtyh">
          <el-input v-model="form.wtyh" placeholder="请输入委托银行" />
        </el-form-item>
        <el-form-item
          label="办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
          prop="blywd"
        >
          <el-input
            v-model="form.blywd"
            placeholder="请输入办理业务点(芙蓉区、开福区、岳麓区、雨花区、长沙县、天心区、望城、刘阳、宁乡、铁路分中心)"
          />
        </el-form-item>
        <el-form-item label="公积金贷款资格审核时间" prop="gjjdkzgshsj">
          <el-input
            v-model="form.gjjdkzgshsj"
            placeholder="请输入公积金贷款资格审核时间"
          />
        </el-form-item>
        <el-form-item
          label="业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
          prop="ywzt"
        >
          <el-input
            v-model="form.ywzt"
            placeholder="请输入业务状态(1.贷款资格审核【业务申请】，2.待业务审核，3.业务审核中【业务审核】，4.委贷已放款，5.委贷已实际放款【委贷放款】6.结清，7.解押，8.入押，9.公积金已放款，10.已回款【回款完成】，审核失败【办理失败】)"
          />
        </el-form-item>
        <el-form-item label="财务放款时间" prop="cwfksj">
          <el-input v-model="form.cwfksj" placeholder="请输入财务放款时间" />
        </el-form-item>
        <el-form-item label="财务放款备注" prop="cwfkbz">
          <el-input v-model="form.cwfkbz" placeholder="请输入财务放款备注" />
        </el-form-item>
        <el-form-item label="委贷实际放款时间" prop="wdsjfksj">
          <el-input
            v-model="form.wdsjfksj"
            placeholder="请输入委贷实际放款时间"
          />
        </el-form-item>
        <el-form-item label="委贷实际放款备注" prop="wdsjfkzb">
          <el-input
            v-model="form.wdsjfkzb"
            placeholder="请输入委贷实际放款备注"
          />
        </el-form-item>
        <el-form-item label="借款结清时间" prop="jkjqsj">
          <el-input v-model="form.jkjqsj" placeholder="请输入借款结清时间" />
        </el-form-item>
        <el-form-item label="借款结清备注" prop="jkjqzh">
          <el-input v-model="form.jkjqzh" placeholder="请输入借款结清备注" />
        </el-form-item>
        <el-form-item label="借款解押时间" prop="jkjysj">
          <el-input v-model="form.jkjysj" placeholder="请输入借款解押时间" />
        </el-form-item>
        <el-form-item label="借款结清备注" prop="jkjybz">
          <el-input v-model="form.jkjybz" placeholder="请输入借款结清备注" />
        </el-form-item>
        <el-form-item label="公积金入押时间" prop="gjjrysj">
          <el-input v-model="form.gjjrysj" placeholder="请输入公积金入押时间" />
        </el-form-item>
        <el-form-item label="公积金入押备注" prop="gjjrybz">
          <el-input v-model="form.gjjrybz" placeholder="请输入公积金入押备注" />
        </el-form-item>
        <el-form-item label="回款时间" prop="hksj">
          <el-input v-model="form.hksj" placeholder="请输入回款时间" />
        </el-form-item>
        <el-form-item label="回款备注" prop="hkbz">
          <el-input v-model="form.hkbz" placeholder="请输入回款备注" />
        </el-form-item>
        <el-form-item label="是否按时放款(1:是，0：否)" prop="sfasfk">
          <el-input
            v-model="form.sfasfk"
            placeholder="请输入是否按时放款(1:是，0：否)"
          />
        </el-form-item>
        <el-form-item label="业务监控天数" prop="ywjkts">
          <el-input v-model="form.ywjkts" placeholder="请输入业务监控天数" />
        </el-form-item>
        <el-form-item label="创建时间" prop="cjsj">
          <el-input v-model="form.cjsj" placeholder="请输入创建时间" />
        </el-form-item>
        <el-form-item label="办理业务员账号id" prop="blywyzh">
          <el-input
            v-model="form.blywyzh"
            placeholder="请输入办理业务员账号id"
          />
        </el-form-item>
        <el-form-item label="办理业务员名称" prop="blywymc">
          <el-input v-model="form.blywymc" placeholder="请输入办理业务员名称" />
        </el-form-item>
        <el-form-item
          label="整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
          prop="ztzt"
        >
          <el-input
            v-model="form.ztzt"
            placeholder="请输入整体状态(【业务申请】，【业务审核】，【委贷放款】【回收完成】，【办理失败】)"
          />
        </el-form-item>
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
  listInfo,
  getInfo,
  delInfo,
  addInfo,
  updateInfo,
  exportInfo
} from '@/api/committe/info';

export default {
  name: 'Compublic',
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
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        jkrxm: null,
        jkrzjlx: null,
        jkrsfz: null,
        gtjkrxm: null,
        gtjkrzjlx: null,
        gtjkrsfz: null,
        lpmc: null,
        htbh: null,
        fwzl: null,
        szqy: null,
        fwzj: null,
        sfkje: null,
        sfkbl: null,
        fwjcmj: null,
        gfcs: null,
        dylx: null,
        dkje: null,
        dkqx: null,
        nll: null,
        hkfs: null,
        myhkje: null,
        qtyjfz: null,
        jtpjysr: null,
        fzbl: null,
        wtyh: null,
        blywd: null,
        gjjdkzgshsj: null,
        ywzt: null,
        cwfksj: null,
        cwfkbz: null,
        wdsjfksj: null,
        wdsjfkzb: null,
        jkjqsj: null,
        jkjqzh: null,
        jkjysj: null,
        jkjybz: null,
        gjjrysj: null,
        gjjrybz: null,
        hksj: null,
        hkbz: null,
        sfasfk: null,
        ywjkts: null,
        cjsj: null,
        blywyzh: null,
        blywymc: null,
        ztzt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
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
        wdywId: null,
        title: null,
        jkrxm: null,
        jkrzjlx: null,
        jkrsfz: null,
        gtjkrxm: null,
        gtjkrzjlx: null,
        gtjkrsfz: null,
        lpmc: null,
        htbh: null,
        fwzl: null,
        szqy: null,
        fwzj: null,
        sfkje: null,
        sfkbl: null,
        fwjcmj: null,
        gfcs: null,
        dylx: null,
        dkje: null,
        dkqx: null,
        nll: null,
        hkfs: null,
        myhkje: null,
        qtyjfz: null,
        jtpjysr: null,
        fzbl: null,
        wtyh: null,
        blywd: null,
        gjjdkzgshsj: null,
        ywzt: null,
        cwfksj: null,
        cwfkbz: null,
        wdsjfksj: null,
        wdsjfkzb: null,
        jkjqsj: null,
        jkjqzh: null,
        jkjysj: null,
        jkjybz: null,
        gjjrysj: null,
        gjjrybz: null,
        hksj: null,
        hkbz: null,
        sfasfk: null,
        ywjkts: null,
        cjsj: null,
        blywyzh: null,
        blywymc: null,
        ztzt: null
      };
      this.resetForm('form');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.wdywId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加【请填写功能名称】';
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const wdywId = row.wdywId || this.ids;
      getInfo(wdywId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = '修改【请填写功能名称】';
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.wdywId != null) {
            updateInfo(this.form).then(response => {
              this.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addInfo(this.form).then(response => {
              this.msgSuccess('新增成功');
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const wdywIds = row.wdywId || this.ids;
      this.$confirm(
        '是否确认删除【请填写功能名称】编号为"' + wdywIds + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delInfo(wdywIds);
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
          return exportInfo(queryParams);
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
