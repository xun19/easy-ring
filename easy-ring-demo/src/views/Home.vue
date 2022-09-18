<template>
  <div class="home">
    <easy-ring 
      :open="open"
      :ring="ring"
    />
    <button @click="openRing">打开铃声</button>
    <div v-for="(msg, index) in msgs" :key="index" @click="read">
      {{msg}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EasyRing from 'easy-ring'
import CommonEasyRing from '../common-easy-ring-class'

export default {
  name: 'Home',
  components: {
    EasyRing
  },
  data: () => ({
    open: false,
    ring: false,
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
          // this.ring = true
          this.myCommonEasyRing.ring()
        }
      }, 1000)
    },
    read() {
      // this.ring = false
      this.myCommonEasyRing.stop()
    },
    openRing() {
      // this.open = true
      this.myCommonEasyRing.open()
    }
  },
  mounted() {
    this.polling()
    this.myCommonEasyRing = new CommonEasyRing()
  }
}
</script>
