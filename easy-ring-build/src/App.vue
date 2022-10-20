<template>
  <div id="app">
      <div class="home">
        <easy-ring 
          v-if="false"
          :open="open"
          :ring="ring"
        />
        <button @click="openRing">打开铃声</button>
        <div v-for="(msg, index) in msgs" :key="index" @click="read">
          {{msg}}
        </div>
        <EasyRingVue 
          v-if="false"
          :open="open"
          :ring.sync="ring"
          :loop="false"
        />
      </div>
  </div>
</template>

<script>
import EasyRing from './components/Xring.vue'
// import CommonEasyRing from './components/common-easy-ring'
// import EasyRingVue from './components/easy-ring-vue'
import { CommonEasyRing, EasyRingVue } from 'easy-ring'

export default {
  name: 'Home',
  components: {
    EasyRing,
    EasyRingVue
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
          this.ring = true
          this.myCommonEasyRing.ring()
        }
      }, 1000)
    },
    read() {
      this.ring = false
      this.myCommonEasyRing.stop()
    },
    openRing() {
      this.open = true
      this.myCommonEasyRing.open()
    }
  },
  mounted() {
    console.log(CommonEasyRing, EasyRingVue)
    this.polling()
    this.myCommonEasyRing = new CommonEasyRing()
  }
}
</script>
