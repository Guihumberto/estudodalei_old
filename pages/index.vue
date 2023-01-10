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
    head: {
            title: 'Estudo da Lei - Lei Seca',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                hid: 'description',
                name: 'description',
                content: 'Leges Estudo - Estudo da lei - Constituição Federal, Lei, lei seca, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e lei com questões e lei com jurisprudência'
                },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
            ]
        },
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

