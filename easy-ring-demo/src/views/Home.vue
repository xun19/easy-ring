<template>
  <div class="home">
    <easy-ring 
      :open="open"
      :ring="ring"
      :src="src"
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

export default {
  name: 'Home',
  components: {
    EasyRing
  },
  data: () => ({
    open: false,
    ring: false,
    src: require('@/components/1.wav'),
    msgs: []
  }),
  methods: {
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > 0.98) {
          this.msgs.push('收到一条信息')
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
    this.polling()
  }
}
</script>
