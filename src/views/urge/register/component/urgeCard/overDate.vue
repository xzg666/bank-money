<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="逾期和代偿信息" name="1">
        <el-form inline label-position="right" label-width="130px">
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期拖欠金额(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期本金(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期利息(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期罚息(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="逾期复利(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿拖欠金额(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿本金(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿罚息(元)">
              <div>￥293067.30 </div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿利息(元)">
              <div>￥293067.30</div>
            </el-form-item>
          </el-col>
          <el-col :span="6" type="flex" align="middld">
            <el-form-item label="代偿利息(元)">
              <div>￥11900.45</div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'OverDateCard',
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
