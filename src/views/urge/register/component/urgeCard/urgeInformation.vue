<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="短信催收" name="first">
        <message />
      </el-tab-pane>
      <el-tab-pane label="电话催收" name="second">
        <tele-phone />
      </el-tab-pane>
      <el-tab-pane label="上门催收" name="third">
        <scence />
      </el-tab-pane>
      <el-tab-pane label="发函催收" name="five">
        <send-file />
      </el-tab-pane>
      <el-tab-pane label="面谈催收" name="six">
        <talk />
      </el-tab-pane>
      <el-tab-pane label="其他催收" name="seven">
        <other />
      </el-tab-pane>
      <el-tab-pane label="诉讼催收" name="eight">
        <prosecution />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Message from './urgeInformationTabs/message.vue';
import Other from './urgeInformationTabs/other.vue';
import Prosecution from './urgeInformationTabs/prosecution.vue';
import Scence from './urgeInformationTabs/scence.vue';
import SendFile from './urgeInformationTabs/sendFile.vue';
import Talk from './urgeInformationTabs/talk.vue';
import TelePhone from './urgeInformationTabs/telePhone.vue';
export default {
  name: 'Informationcard',
  components: { Message, TelePhone, Scence, SendFile, Talk, Other, Prosecution },
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
      activeName: 'first'
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
