<template lang='pug'>
  .example_conteiner
    h1.name_vue|Hello from Vue
    p|My messeg: {{ messege }}
</template>

<script lang="ts">
export default {
  data(){
    return {
      messege: null,
    }
  },
  created(){
    this.messege = this.$store.getters.getMessage
  }
}
</script>

<style lang='scss' scoped>
  .name_vue{
    color: rgba(#6ba, .4)  
  }
  .example_conteiner{
    color: blueviolet;
  }
</style>