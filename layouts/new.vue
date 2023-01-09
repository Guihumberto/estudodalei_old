<template>
  <v-app id="inspire">
    <layoutSite-landingPage-header />
    <v-main>
          <nuxt />
      </v-main>
      <layoutSite-landingPage-footer />
  </v-app>
</template>

<script>
  export default {
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
.titlebar{
  font-size: 32px;
  color: indigo;
  font-weight: 700;
}

</style>
