<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="逾期和代偿信息" name="1">
        <el-form inline label-position="right" label-width="130px">
          <el-col :span="6" type="flex" align="middld">
            <el-form-item v-if="selectRows.cslx=='1'" label="逾期拖欠金额(元)">
              <div>￥{{ selectRows.dctqje }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='1'" :span="6" type="flex" align="middld">
            <el-form-item label="逾期本金(元)">
              <div>￥{{ selectRows.bj }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='1'" :span="6" type="flex" align="middld">
            <el-form-item label="逾期利息(元)">
              <div>￥{{ selectRows.lx }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='1'" :span="6" type="flex" align="middld">
            <el-form-item label="逾期罚息(元)">
              <div>￥{{ selectRows.fx }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='1'" :span="6" type="flex" align="middld">
            <el-form-item label="逾期复利(元)">
              <div>￥{{ selectRows.fl }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
            <el-form-item label="代偿拖欠金额(元)">
              <div>￥{{ selectRows.dctqje }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
            <el-form-item label="代偿本金(元)">
              <div>￥{{ selectRows.bj }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
            <el-form-item label="代偿利息(元)">
              <div>￥{{ selectRows.fx }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
            <el-form-item label="代偿罚息(元)">
              <div>￥{{ selectRows.lx }}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="selectRows.cslx=='2'" :span="6" type="flex" align="middld">
            <el-form-item label="代偿复利(元)">
              <div>￥{{ selectRows.fl }}</div>
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
    },
    selectRows: {
      type: Object,
      default: () => { }
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
