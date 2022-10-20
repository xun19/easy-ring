<template>
  <div>
    <EasyRing 
      :open="open"
      :ring.sync="ring"
    />

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
    </div>

    <div>
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

<script>
import Msg from '../utils/msg'
import { EasyRingVueComponent as EasyRing } from 'easy-ring'

export default {
  components: {
    EasyRing
  },
  data() {
    return {
      open: false,
      ring: false,
      currentMsgIndex: 0,
      newMsgCount: 0,
      msgList: [],
      intervalCount: 0
    }
  },
  methods:{
    dropdownChange(val) {
      if (!val) {
        this.newMsgCount = 0
        this.msgList = []
      }
      this.ring = false
    }
  },
  mounted() {
    this.$confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound.', '', {
      confirmButtonText: 'OK',
    }).then(() => {
      this.open = true
    }).catch(() => {})

    const msg = new Msg({
      frequency: 0.1
    })
    msg.listening()
    msg.onReceived((newMsg) => {
      this.ring = true
      this.msgList.push(newMsg)
      this.newMsgCount = this.newMsgCount + 1
    }) 

    setInterval(() => {
      this.intervalCount += 1
    }, 1000)
  },
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
