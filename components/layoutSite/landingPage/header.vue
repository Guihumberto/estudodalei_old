<template>
  <v-container>
    <v-app-bar
        app
        elevation="6"
        color="white"
        light
        elevate-on-scroll
      >
      <v-toolbar flat max-width="1810" class="mx-auto">
        <v-tollbar-title class="titlebar d-sm-none d-md-flex">Estudo da Lei</v-tollbar-title>
        <v-spacer />
        <v-list class="d-flex align-center" dense>
            <v-list-item
              class="d-none d-sm-flex d-md-flex"
              v-for="item, i in sections"
              :key="i"
              :to="item.to">
              <v-list-item-icon class="mr-1">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
            <v-btn class="ml-5" outlined color="indigo" to="/login">Entrar</v-btn>
        </v-list>
      </v-toolbar>
    </v-app-bar>
  </v-container>
</template>

<script>
  export default {
    data(){
      return{
        sections:[
          {name: "Início", icon:"mdi-home", to:"/"},
          {name: "Leis", icon:"mdi-bookshelf", to:"/laws"},
          {name: "Súmulas", icon:"mdi-scale-balance", to:"/sumulas"},
          {name: "Julgados", icon:"mdi-gavel", to:"/juris"},
          {name: "Planejamento", icon:"mdi-format-list-checks", to:"/plan"},
        ]
      }
    }
  }
</script>

<style scoped>


</style>
