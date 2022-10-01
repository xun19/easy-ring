<template>
  <div class="msg">
    <el-dropdown trigger="click" @visible-change="dropdownChange">
      <div>
        <el-badge :value="newMsgCount" class="item" v-if="newMsgCount">
          <i style="font-size: 30px;" class="el-icon-message"></i>
        </el-badge>
        <i style="font-size: 30px;" class="el-icon-message" v-else></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(m, i) in msgList" :key="i">
            收到一条新信息！| Receive a new message!（ id = {{m.id}}）
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div>
      <template v-if="newMsgCount === 0">
        正在接收消息... | Waiting message...({{intervalCount}}s)
      </template>
      <template v-else>
        你收到了新消息！ | You receive new messages!
      </template>
    </div>
  </div>
</template>

<script>
import Msg from '../utils/msg'
import { CommonEasyRing } from 'easy-ring'

export default {
  data() {
    return {
      currentMsgIndex: 0,
      newMsgCount: 0,
      msgList: [],
      myEasyRing: null,
      intervalCount: 0
    }
  },
  methods:{
    dropdownChange(val) {
      if (!val) {
        this.newMsgCount = 0
        this.msgList = []
      }
      this.myEasyRing.stop()
    }
  },
  mounted() {
    this.myEasyRing = new CommonEasyRing()

    this.$confirm('We need your consent to turn on sound.', '', {
      confirmButtonText: 'OK',
    }).then(() => {
      this.myEasyRing.open()
      // TODO: 需要强制切换一下？
    }).catch(() => {})

    const msg = new Msg({
      frequency: 0.1
    })
    msg.listening()
    msg.onReceived((newMsg) => {
      this.myEasyRing.ring()
      this.msgList.push(newMsg)
      this.newMsgCount = this.newMsgCount + 1
    }) 

    setInterval(() => {
      this.intervalCount += 1
    }, 1000)
  },
  beforeDestroy(){
    this.myEasyRing.stop() // TODO: 如果没打开，关闭会有问题
    this.myEasyRing.close() // TODO: 关闭还会响
    msg.stopListening()
  }
}
</script>

<style>
.msg {
  cursor: pointer;
}
.el-dropdown-menu__item {
  padding-right: 130px!important;
}
</style>
