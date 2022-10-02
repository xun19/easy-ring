<template>
  <div class="msg">
    <!-- <span style="color:black;">{{msgList}}</span> -->
    <el-dropdown trigger="click" size="large" @visible-change="dropdownChange">
      <el-badge :value="newMsgCount" class="item" v-if="newMsgCount">
        <el-icon :size="30" color="#000000" >
          <Message />
        </el-icon>
      </el-badge>
      <el-icon :size="30" color="#000000" v-else >
          <Message />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(m, i) in msgList" :key="i" @click="showMsgDetail(i)">
            <!-- <template v-if="!m.hasRead"> -->
              <!-- <el-badge value="未读(unread)"> -->
              收到一条新信息！| Receive a new message!（ id = {{m.id}}）
              <!-- </el-badge> -->
            <!-- </template> -->
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div style="color:black;">
      <template v-if="newMsgCount === 0">
        正在接收消息... | Waiting message...({{intervalCount}}s)
      </template>
      <template v-else>
        <div style="display: flex;justify-content:center;flex-wrap: wrap;">
          <div style="flex-basis: 100%;">你收到了新消息！ | You receive new messages!</div>
          <div style="margin-top: 30px;">(点击图标查看消息、并停止声音 | Click the icon to view the message and stop the sound.)</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Msg from '../utils/msg'
import { CommonEasyRing } from 'easy-ring'
import { ElMessageBox } from 'element-plus'

// 最近出现的warn，必须把生命周期方法放在最前面
onUnmounted(() => {
  myEasyRing.stop() // TODO: 没法正确关闭的这个错误，还会影响easy-ring组件的loop？是因为音频元素没获取到（不是没生成）【感觉这块得弄成异步x】
  myEasyRing.close() // TODO: 关闭还会响
  msg.stopListening()
})
  

const myEasyRing = new CommonEasyRing()

ElMessageBox.alert('我们需要您同意开启声音 ｜ We need your consent to turn on sound.', '', {
  confirmButtonText: 'OK',
  callback: (action) => {
      if (action === 'confirm') {
        myEasyRing.open()
        // TODO: 需要强制切换一下？
      }
  },
})

const newMsgCount = ref(0)
const dropdownChange = (val) => {
  if (!val) {
    newMsgCount.value = 0
    msgList.value = []
  }
  myEasyRing.stop()
}

const msgList = ref([])
const msg = new Msg({
  frequency: 0.1
})
msg.listening()
msg.onReceived((newMsg) => {
  myEasyRing.ring()
  msgList.value.push(newMsg)
  newMsgCount.value += 1
})

const intervalCount = ref(0)
setInterval(() => {
  intervalCount.value += 1
}, 1000)
</script>

<style>
.msg {
  cursor: pointer;
}
.el-dropdown-menu__item {
  padding-right: 130px!important;
}
</style>
