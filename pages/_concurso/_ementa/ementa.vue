<template>
    <v-container style="max-width: 1080px">
        <h1 class="text-h5  mb-5">Conteúdo</h1>
        <v-card outlined class="mb-5 ">
            <v-card-title class="white--text primary lighten-2 mb-5 py-2">Importar Conteúdo</v-card-title>
            <v-card-text>
                O que é?
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste nam libero harum vitae 
                   non tempore id sapiente doloremque culpa soluta consequuntur sunt voluptatum recusandae dolorum
                   incidunt at, in quasi!
                </p>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title class="grey lighten-2 mb-5 py-2">
                Nome cargo - Ementa Verticalizada
            </v-card-title>
            <v-card-text>
                <v-card outlined class="my-3">
                    <v-card-text>
                        <h5 class="text-h5 mb-5">Conhecimentos Gerais</h5>
                        <v-treeview :items="ementa.geral"></v-treeview>
                    </v-card-text>
                    <v-card-text>
                        <h5  class="text-h5 mb-5">Conhecimentos Específicos</h5>
                        <v-treeview :items="ementa.especifica"></v-treeview>
                    </v-card-text>
                </v-card>
            </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                idConcurso: this.$route.params.concurso,
                idCargo: this.$route.params.ementa
            }
        },
        computed:{
        ementa(){
                let ementa = this.$store.getters.readEmenta
                ementa.geral = ementa.filter(i => i.type == 1)
                ementa.especifica = ementa.filter(i => i.type == 2)
                return ementa
            }
        },
        methods:{
            ...mapActions(['cargaEmenta']),
            ementaCarregar(){
                console.log(this.idCargo)
                this.cargaEmenta([this.idConcurso, this.idCargo])
            }
        },
        fetch(){
            this.ementaCarregar()
        }
        }
</script>

<style lang="scss" scoped>

</style>