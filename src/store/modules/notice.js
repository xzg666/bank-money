import { noticeApi } from '@/api/noticeCenter'

const notice = {
  state: {
    totalNum: 0,
    todoNum: 0
  },
  mutations: {
    CHANGE_TOTAL(state, data) {
      state.totalNum = data.notice
      state.todoNum = data.handle
    }
  },
  actions: {
    changeTotal({ commit }) {
      noticeApi.getNoticeNum().then(res => {
        if (res.code === 200) {
          commit('CHANGE_TOTAL', res.data)
        }
      })
    }
  }
}
export default notice