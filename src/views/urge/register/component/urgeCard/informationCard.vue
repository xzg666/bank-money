<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="业务信息" name="1">
        <el-form inline label-position="right" label-width="160px">
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="客户姓名">
              <div>唐赛</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="性别">
              <div>男</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="证件类型">
              <div>身份证</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="证件号码">
              <div>42252219930110****</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="单位名称">
              <div>长银担保融资有限公司</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="单位电话">
              <div>0731-88888888</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="单位手机号">
              <div>13333333333</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="实际电话">
              <div>13333333333</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款管理部">
              <div>岳麓区管理部</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="借款人公积金账号">
              <div>33333333</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款账号">
              <div>13333333333</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款类型">
              <div>公积金贷款</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款状态">
              <div>逾期</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款金额(元)">
              <div>600000</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款发放日">
              <div>2020-02-01</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="贷款期数(期)">
              <div>360</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="当期计划还款金额(元)">
              <div>2222.33</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="是否对冲">
              <div>是</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="是否划拨">
              <div>是</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="还款方式">
              <div>等额本息</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="还款账户">
              <div>202113136789230</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="还款银行">
              <div>长沙银行</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期催收">
              <div>待处理</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期建议优先处理方式">
              <div>上门催收</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿催收">
              <div>暂无数据</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿建议优先处理方式">
              <div>暂无数据</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="楼盘名称">
              <div>保利国际</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="购置房地址">
              <div>湖南省长沙市开福区开福北路</div>
            </el-form-item>
          </el-col>
          <el-col :span="24" type="flex" align="middld">
            <el-form-item label="客户打标">
              <el-tag>失信客户</el-tag>
              <el-tag>拟诉讼客户</el-tag>
              <el-button type="text" size="small" style="margin-left:10px" @click="clickTagsDialog">修改客户标签</el-button>
            </el-form-item>
          </el-col>
          <el-row :gutter="24" type="flex" justify="center">
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-edit" @click="clickRalationDialog">联系人维护</el-button>
              <el-button icon="el-icon-edit-outline" @click="clickAddressDialog">地址维护</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 客户标签弹出框       -->
    <el-dialog :visible.sync="tagsDialog" title="修改客户标签" append-to-body width="400px">
      <el-form>
        <el-row>
          <el-form-item label="客户标签">
            <el-select v-model="customTags" multiple placeholder="请选择" style="width:280px">
              <el-option
                v-for="item in customTagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 联系人维护弹出框 -->
    <el-dialog :visible.sync="relationDialog" title="修改客户标签" append-to-body width="80%">
      <free-form :form-list="ralationFormList" :form-data="relationFormData" />
    </el-dialog>
    <!-- 地址维护弹出框 -->
    <el-dialog :visible.sync="addressDialog" title="修改客户标签" append-to-body width="80%">
      <free-form :form-list="addressFormList" :form-data="addressFormData" />
    </el-dialog>
  </div>
</template>

<script>
import FreeForm from '@/components/FreeForm';
export default {
  name: 'BusinessInformationCard',
  components: {
    FreeForm
  },

  directives: {},
  props: {
    form: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      activeNames: ['1'],
      tagsDialog: false,
      relationDialog: false,
      addressDialog: false,
      customTags: [],
      customTagList: [
        { label: '拟诉讼客户', value: 1 },
        { label: '失联客户', value: 2 },
        { label: '失信客户', value: 3 },
        { label: '拒还客户', value: 4 }
      ],
      ralationFormList: [
        { label: '关系' },
        { label: '联系方式' },
        { label: '备注' }
      ],
      addressFormList: [
        { label: '名称' },
        { label: '详细地址' },
        { label: '备注' }
      ],
      relationFormData: {

      },
      addressFormData: {

      }
    };
  },

  mounted() {

  },

  methods: {
    clickTagsDialog() {
      this.tagsDialog = true
    },
    clickRalationDialog() {
      this.relationDialog = true
    },
    clickAddressDialog() {
      this.addressDialog = true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
