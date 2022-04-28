<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }"
    />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import mqtt from 'mqtt'
import { getUserName } from '@/utils/auth';

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      client: undefined
    };
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  created() {
    const options = {
      connectTimeout: 20000,
      clientId: `clientId_${new Date().getTime()}`,
      username: 'admin',
      password: 'admin',
      clean: true
    }
    this.client = mqtt.connect('wss://www.hncydb.com/cydb-ws/', options)
    this.mqttMSG()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    mqttMSG() {
      // mqtt连接
      this.client.on('connect', (e) => {
        console.log('连接成功:')
        this.client.subscribe(getUserName(), { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })
      // 接收消息处理
      this.client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息', JSON.parse(message.toString()))
        const messageData = JSON.parse(message.toString())
        this.$notify({
          title: '提示',
          message: `${this.$selectDictLabel(this.$store.getters.dictData.tx_busi_type || [], messageData.txBusiType)}消息`,
          onClick: () => {
            if (messageData.txType === 0) {
              this.$router.push(`/noticeCenter/message`)
            } else {
              this.$router.push(`/noticeCenter/toDeal`)
            }
          }
        });
        this.$store.dispatch('changeTotal')
      })
      // 断开发起重连
      this.client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      this.client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
