<template>
  <div id="printBox">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="业务信息" name="1">
        <el-form inline label-position="right" label-width="130px">
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="客户姓名">
              <div>唐赛</div>
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
            <el-form-item label="性别">
              <div>男</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="姓名全拼">
              <div>TANSAI</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="婚姻状态">
              <div>未婚</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="职业">
              <div>工程师</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="最高学历">
              <div>大学本科</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="毕业院校">
              <div>湖南大学</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="个人月收入">
              <div>￥11900.45</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="家庭月收入">
              <div>￥56789.89</div>
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
            <el-form-item label="单位电话">
              <div>0731-88888888</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="个人手机">
              <div>13333333333</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="身份证地址">
              <div>湖南省长沙市开福区开福北路</div>
            </el-form-item>
          </el-col>
          <el-col :span="24" type="flex" align="middld">
            <el-form-item label="客户打标">
              <el-tag>失信客户</el-tag>
              <el-tag>拟诉讼客户</el-tag>
            </el-form-item>
          </el-col>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'BusinessInformationCard',
  components: {},

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
      activeNames: ['1']
    };
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
