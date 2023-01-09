<template>
  <v-container class="pt-15 groupcolor" style="font-size: 18px" v-scroll-reveal="{ delay: 450 }">
    <layoutSite-landingPage-welcome />

    <layoutSite-landingPage-geral />

    <layoutSite-landingPage-funcionalidades />

    <layoutSite-landingPage-whohelp />

    <layoutSite-landingPage-knowMore />

    <layoutSite-landingPage-acessar />
  </v-container>
</template>

<script>
  export default {
    layout: 'new',
    data(){
      return{

      }
    }
  }
</script>

<style>
.groupcolor{
  background-color: #F0EFF3;
}
</style>

