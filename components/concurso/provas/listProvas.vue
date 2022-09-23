<template>
    <v-card outlined class="ma-5 pa-5">
        <v-card-text>
            <v-text-field
                label="Busca"
                dense outlined
                placeholder="pesquisar"
                v-model="search"
                clearable
            ></v-text-field>
        </v-card-text>
        <v-card-text>
            <v-list>
                <template v-for="item, index in listProves">
                    <v-divider v-if="index != 0"></v-divider>
                    <v-list-item :key="index">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{item.id}} - {{item.cargo}} - {{item.year}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{item.orgao}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="d-flex">
                            <!-- <v-btn icon @click="editProve(item)"><v-icon>mdi-file-edit</v-icon></v-btn>
                            <v-btn icon @click="removeProve(item)"><v-icon>mdi-delete</v-icon></v-btn> -->
                            <v-switch 
                                label="Ativar" v-model="item.active" @click="changeActive(item)">
                            </v-switch>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                search: ''
            }
        },
        computed:{
            listProves(){
                let list = this.$store.getters.readProvas.filter( i => i)

                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro =  list.filter(item => exp.test(item.cargo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.orgao ))
                    list = filtro
                }
                
                return list
            },
            lastId(){
                let last = this.listProves.at(-1)
                return last.id++
            }
        },
        methods:{
            ...mapActions(['ediSetProve']),
            changeActive(item){
                this.ediSetProve(item)
            },
            removeProve(item){
                console.log('ok')
            },
            editProve(item){
                console.log('ok')
            },
        },
    }
</script>

<style scoped>

</style>