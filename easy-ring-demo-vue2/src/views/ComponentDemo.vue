<template>
  <div class="home">
    <button @click="openRing">打开铃声</button>
    <div v-for="(msg, index) in msgs" :key="index" @click="read">
      {{msg}}
    </div>
    <!-- <EasyRing
      :open="open"
      :ring.sync="ring"
      :loop="false"
      defaultMusic="LITTLE_STAR"
    /> -->
    <EasyRing
      :open="open"
      :ring.sync="ring"
      :loop="false"
      defaultMusic="LITTLE_STAR"
      musicText="1 2 3 4 5 6 7"
      :src="testAudio"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { EasyRingVueComponent as EasyRing } from 'easy-ring'
import testAudio from '@/assets/test.wav'

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
    testAudio,
  }),
  methods: {
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > (1 - this.frequency)) {
          this.msgs.push('收到一条信息（请点击我来关铃）')
          this.ring = true
        }
      }, 1000)
    },
    read() {
      this.ring = false
    },
    openRing() {
      this.open = true
    }
  },
  mounted() {
    // console.log(REasyRing)
    // console.log(CommonEasyRing, EasyRingVue)
    this.polling()
  }
}
</script>
