<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-show="loading"
      v-model="drawer"
      app
      color="#f2f5f9"
    >
    <layoutSite-sideBar />
    </v-navigation-drawer>

    <v-app-bar app flat color="grey lighten-2" v-show="loading">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{titleWebSite}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <layoutSite-menuPopOver v-if="user.name" :user="user" @logout="closeLogin()" />
      <v-btn v-else to="/login" small color="primary" outlined> <v-icon small class="mr-1">mdi-account</v-icon> Login</v-btn>
    </v-app-bar>

    <v-main>
       <layoutSite-loadingInit v-if="!loading" />
       <nuxt v-else />
       <v-snackbar 
          v-for="(snack, i) in snacks.filter((s)=> s.showing)" :key="i + Math.random()"
          v-model="snack.showing"
          :timeout="snack.timeout"
          :color="snack.color"
          :style="`bottom: ${i * 60 + 8}px`"
        >
          <v-btn slot="action" icon small @click="snack.showing = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        {{snack.text}}
      </v-snackbar>
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
      <v-card-text v-show="false">
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

  import { mapGetters, mapActions} from 'vuex'

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
        snack: false,
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }
    },
    computed:{
      ...mapGetters({snacks:"snackbars/readSnackbars"}),
      user(){
        const user = this.$store.getters.readUser
        return user
        ? user
        : false
      },
      loading(){
        const load = this.$store.getters.readJuris
        return !!load.length
      }
    },
    methods:{
       ...mapActions(['cargaLawList', 'cargaSumula', 'cargajuris', 'setUser', 'logout', 'cargaUserPreferences', 'cargaConcursosList']),
       closeLogin(){
        this.logout()
        this.$store.dispatch("snackbars/setSnackbars", {text:'Sessão encerrada', color:'error'})
        this.drawer = false
      },
    },
    created(){
      this.setUser()
      this.cargaLawList()
      this.cargaSumula()
      this.cargajuris()
      this.cargaConcursosList()
      setTimeout( () => {
        this.cargaUserPreferences(this.user.uid)
      }, 2000)
    }
  }
</script>