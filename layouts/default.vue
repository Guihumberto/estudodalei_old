<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <layoutSite-sideBar />
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{titleWebSite}}</v-toolbar-title>
    </v-app-bar>
    <v-main>
       <nuxt />
    </v-main>
    <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="grey lighten-1 white--text text-center"
      width="100%" center
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
       
        <v-icon>mdi-ghost</v-icon><br>
        www.estudodalei.com.br<br>
        <strong>Estudo Da Lei - Leges Estudo</strong> - {{ new Date().getFullYear() }}<br>
        Desenvolvido e idealizado por João Humberto Silva Ribeiro Júnior <br>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>

  import { mapActions} from 'vuex'

  export default {
     head: {
      titleTemplate: '%s - Legislação',
      title: 'Estudo da Lei',
      bodyAttrs:{
        class: 'estudodaLei'
      },
      htmlAttrs:{
        class: 'legislação',
        id: 'leges'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Estudo da lei - Estudo da Constituição, Lei, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e mais' 
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
      ]
    },
    data(){
      return {
        drawer: false,
        titleWebSite: "Estudo da Lei (beta)",
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }
    },
    methods:{
       ...mapActions(['cargaLawList', 'cargaSumula', 'cargajuris']),
    },
    created(){
      this.cargaLawList()
      this.cargaSumula()
      this.cargajuris()
    }
  }
</script>