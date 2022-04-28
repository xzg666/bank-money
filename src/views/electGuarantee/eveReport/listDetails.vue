<template>
  <div class="list-details">
    <div class="box-area">
      <div>
        <!-- <ul class="clearfix">
          <h3>保函详情</h3>
          <li v-for="item in formList[0].data">
            <label>{{ item.label }}：</label>
            <span>{{ adapter(item) }}</span>
          </li>
        </ul>
        <ul class="clearfix">
          <h3>开票信息</h3>
          <li v-for="item in formList[1].data">
            <label>{{ item.label }}：</label>
            <span>{{ data[item.prop] }}</span>
          </li>
        </ul>
        <ul class="clearfix">
          <h3>退保信息</h3>
          <li v-for="item in formList[2].data">
            <label>{{ item.label }}：</label>
            <span>{{ data[item.prop] }}</span>
          </li>
        </ul>
        <ul class="clearfix">
          <h3>理赔信息</h3>
          <li v-for="item in formList[3].data">
            <label>{{ item.label }}：</label>
            <span>{{ data[item.prop] }}</span>
          </li>
        </ul> -->
        <ul v-for="(item, index) in formList" :key="index" class="clearfix">
          <h3>{{ item.title }}</h3>
          <li v-for="(citem, cindex) in item.data" :key="cindex">
            <label>{{ citem.label }}{{ citem.unit }}：</label>
            <span>{{ adapter(citem) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListDetails',
  props: {
    formList: {
      // formList的数据格式为： [{label: '姓名', prop: 'name'},{label: '性别', prop: 'sex'}]
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Object,
      default: () => {} // data数据格式为： {name: '龙灿',sex: '女'}
    }
  },
  data() {
    return {};
  },
  methods: {
    adapter(citem) {
      const value = this.data[citem.prop];
      console.log('value', value);
      return citem.dict && value !== '' && value !== null && value !== undefined
        ? citem.dict.find(d => d.dictValue === value).dictLabel
        : value;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-details {
  .box-area {
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        width: 33.33%;
        float: left;
        padding: 0;
        margin: 0;
        list-style: none;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        label {
          display: inline-block;
          text-align: left;
          line-height: 46px;
        }
        span {
          width: 160px;
          display: inline-block;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
          top: 10px;
        }
        .el-input {
          width: 260px;
        }
      }
    }
  }
}
</style>
