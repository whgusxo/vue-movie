<template>
  <footer>
    <MainLogo />
      <a 
        href="https://www.naver.com" 
        target="_blank">
        (c) {{ new Date().getFullYear()}} whgusxo
      </a>
  </footer>
</template>

<script>
import MainLogo from '~/components/MainLogo'

export default {
  components: {
    MainLogo
  }
}
</script>

<style lang="scss" scoped>
footer{
  padding: 70px 0;
  text-align: center;
  opacity: .3;
  .logo{
    display: block;
    margin-bottom: 4px;
  }
}
</style>