<template>
  <div class="home">
    <button @click="openRing">打开铃声</button>
    <div v-for="(msg, index) in msgs" :key="index" @click="read">
      {{msg}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { CommonEasyRing } from 'easy-ring'

export default {
  data: () => ({
    msgs: [],
    frequency: 0.1,
    myCommonEasyRing: null
  }),
  methods: {
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > (1 - this.frequency)) {
          this.msgs.push('收到一条信息（请点击我来关铃）')
          this.myCommonEasyRing.ring()
        }
      }, 1000)
    },
    read() {
      this.myCommonEasyRing.stop()
    },
    openRing() {
      this.myCommonEasyRing.open()
    }
  },
  mounted() {
    this.polling()
    this.myCommonEasyRing = new CommonEasyRing({
      loop: false,
      log: true
    })
  }
}
</script>
