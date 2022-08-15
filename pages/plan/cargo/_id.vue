<template>
    <v-container style="max-width: 1080px">
        <h1 class="mb-5 text-h5">cargo - prioridades</h1>
        <v-btn small text class="px-0 mb-5" text @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card outlined>
            <v-card-title class="primary lighten-4">Prioridades</v-card-title>
            <v-card flat class="my-3">
                <v-card-text v-if="plan.geral">
                    <h5 class="text-h5 mb-5">Conhecimentos Gerais</h5>
                    <v-treeview 
                        transition
                        hoverable
                        v-model="plan.geral"
                        selection-type="leaf"
                        selectable
                        :items="ementa.geral">
                    </v-treeview>
                </v-card-text>
                <v-card-text v-if="plan.especifica">
                    <h5  class="text-h5 mb-5">Conhecimentos Específicos</h5>
                    <v-treeview 
                        transition
                        hoverable
                        v-model="plan.especifica"
                        selection-type="leaf"
                        selectable
                        :items="ementa.especifica">
                    </v-treeview>
                </v-card-text>
            </v-card>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{

            }
        },
        computed:{
            idConcurso(){
                let ids = this.$route.params.id.split('concursocargo')
                return ids
            },
            ementa(){
                let ementa = this.$store.getters.readEmenta
                ementa.geral = ementa.filter(i => i.type == 1)
                ementa.especifica = ementa.filter(i => i.type == 2)
                return ementa
            },
            user(){
                return this.$store.getters.readUser
            },
            plan(){
                let list = this.$store.getters.readPlan
                let listExport ={geral: [], especifica: []}

                list.forEach(type => {
                    Object.keys(type).forEach( el =>{
                        if(el == 'geral'){
                            listExport.geral = type.geral
                        } else if(el == 'especifica'){
                            listExport.especifica = type.especifica
                        }
                    })
                })
                
                return listExport
            }
        },
        methods:{
            ...mapActions(['cargaEmenta', 'cargaPrioritys']),
            ementaCarregar(){
                this.cargaEmenta([this.idConcurso[0], this.idConcurso[1]])
            },
            cargaPlan(){
                if(this.user.uid){
                    let data = {uid: this.user.uid, concurso: this.idConcurso[0], cargo: this.idConcurso[1]}
                    this.cargaPrioritys(data)
                }
            }
        },
        created(){
            this.ementaCarregar()
            this.cargaPlan()
        }
    }
</script>

<style scoped>

</style>