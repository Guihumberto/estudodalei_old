<template>
    <v-container>
        <h1>Área do Usuário</h1>
        <v-card class="mt-1" outlined>
            <v-card-text>
                <v-alert type="error" outlined prominent>
                    <p>Esta seção está em fase de construção. Não se preocupe caso ocorra algum erro, 
                        estamos trabalhando no recurso mais produtivo para seus estudos.</p>
                     <v-icon color="error" v-for="item in 20" :key="item">mdi-hammer</v-icon>
                </v-alert>
                <v-btn outlined to="/">home</v-btn>
            </v-card-text>
        </v-card>
        <v-card outlined class="mt-5">
            <v-toolbar
            color="cyan"
            dark
            flat
            >
            <v-toolbar-title>Favoritos e Pasta de Revisão</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <template v-slot:extension>
                    <v-tabs
                    v-model="tab"
                    align-with-title
                    class="ml-n15"
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>

                        <v-tab
                            v-for="item in items"
                            :key="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item"
            >
                <v-card flat>
                <v-card-text v-text="text"></v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'Súmulas', 'Jurisprudências', 'Pastas',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
     middleware: "auth",
  }
</script>

<style lang="scss" scoped>

</style>