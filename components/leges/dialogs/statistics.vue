<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="1080"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
              small outlined
              class="ml-2 mr-0"
              v-bind="attrs"
              v-on="on">
              <v-icon >mdi-finance</v-icon>
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="mb-5 text-h5 grey lighten-2">
            <v-icon class="mr-1" color="primary">
                mdi-finance
            </v-icon>
            Estatísticas
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <h1 class="text-h6">
             {{ law[3] }} <br>
             {{ law[4] }}
            </h1>
           <strong>Total de Questões: {{totaldeQuestoes}}</strong> 
          </v-card-text>
          <v-card-text class="mt-5" v-if="!isEmpty" >
            <v-list width="400" class="mx-auto">
                <v-list-item class="primary white--text">
                    <v-list-item-content>
                        <v-list-item-title>Artigo</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        Nº de Questões 
                    </v-list-item-action>
                </v-list-item>
                <template v-for="item, index in listArts">
                    <v-divider></v-divider>
                    <v-list-item :key="index" @click="gotoArt(index)">
                        <v-list-item-content>
                            <v-list-item-title>{{index}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                           {{somaQuestions(item)}}
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
            <div v-if="artigos[0]">
                Seleção de artigos:
                <v-chip-group>
                    <v-chip 
                            color="success"
                            v-for="item, i in artigos" :key="i"
                            @click="gotoArt(item)"
                            close
                            @click:close="gotoArt(item)"
                        >
                        {{item}}</v-chip>
                </v-chip-group>
            </div>
          </v-card-text>

          <v-card-text v-else>
            <v-alert type="error" outlined>
                Não há questões cadastradas nesta lei!
            </v-alert>
          </v-card-text>
         
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Fechar
            </v-btn>
            <v-btn
              v-if="artigos[0]"
              color="primary"
              @click="filterActivePush"
            >
              Filtrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  
    import jspdf from 'jspdf'
  
    export default {
      data () {
        return {
          dialog: false,
          artigos: []
        }
      },
      props:{
          textLaw: false,
          law: false,
      },
      computed:{
        listArts(){
            let list = this.textLaw.filter( i => i.idQuestions)

            const groupBy = (key, arr) => arr
                .reduce(
                    (cache, product) => {
                        const property = product[key]
                        if(property in cache) {
                            return { ...cache, [property]: cache[property].concat(product)}
                        }
                        return {...cache, [property]: [product]}

                    }, {}
                )
                    console.log(groupBy('art', list))
            return groupBy('art', list)
        },
        isEmpty(){
            return Object.keys(this.listArts).length === 0;
        },
        totaldeQuestoes(){
            let law = this.textLaw.filter( i => i.idQuestions)
            let total = 0

            law.forEach(element => {
               total += element.idQuestions.length
            });
            return total
        }
      },
      methods:{
         somaQuestions(item){
            let total = 0
            item.forEach(element => {
               total += element.idQuestions.length
            });
            return total
         },
         gotoArt(index){
            let item = parseInt(index)
            if(this.artigos.find(i => i == item)){
                this.artigos = this.artigos.filter(i => i != item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Artigo retirado.', color:'error'})
            } else {
                this.artigos.push(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Artigo inserido.', color:'success'})
            }
            console.log(this.artigos)
         },
         filterActivePush(){
            if(this.artigos[0]){
                this.$emit('filterArtsPush', this.artigos)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Filtro na tela.', color:'success'})
                this.dialog = false
            }
      },
      }
    }
  </script>
  
  <style scoped>
      .formatText{
      text-align: justify;
      hyphens: auto;
  }
  </style>