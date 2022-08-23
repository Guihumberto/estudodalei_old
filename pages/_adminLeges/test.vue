<template>
    <div v-if="$store.state.adm">
        <h1>testes</h1>
        <v-btn @click="save()">Salvar</v-btn>
        <v-btn @click="gravar()">Gravar</v-btn>
        <v-btn @click="removeAll()">Exclulir tudo</v-btn>
        {{list.length}}
        <div>
            <p v-for="item, index, in listNew" :key="index">
                {{item.disciplina}}
            </p>
            
    </div>
    <v-card outlined>
        <v-card-text>
            <v-treeview :items="items"></v-treeview>
        </v-card-text>
    </v-card>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                listNew: [],
                items: [
                    {
                    id: 5,
                    name: 'Documents :',
                    children: [
                        {
                            id: 6,
                            name: 'vuetify :',
                            children: [
                                {
                                id: 7,
                                name: 'src :',
                                children: [
                                    { id: 8, name: 'index : ts' },
                                    { id: 9, name: 'bootstrap : ts' },
                                ],
                                },
                            ],
                        },
                        {
                            id: 10,
                            name: 'material2 :',
                            children: [
                                {
                                id: 11,
                                name: 'src :',
                                children: [
                                    { id: 12, name: 'v-btn : ts' },
                                    { id: 13, name: 'v-card : ts' },
                                    { id: 14, name: 'v-window : ts' },
                                ],
                                },
                            ],
                        },
                    ],
                    },
                ]
            }
        },
        computed:{
            list(){
                // let searchL = "Julgado marcado como Lido"
                // let search = searchL.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                //     //retirar caracteres especiais
                // let exp = new RegExp(search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")

                // let listSumula = this.$store.getters.readJuris.filter(i => exp.test(i.info.normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
                
                let listSumula = this.$store.getters.readJuris.filter(i => i.disciplina == 'DA')

                return listSumula
            }
        },
        methods:{
            ...mapActions(['editJuris', 'deleteJurisFB']),
            save(){
                // let nova = []
                // this.list.forEach(el => {
                //     el.info = el.info.replace("Julgado marcado como Lido", "")
                //     el.info = el.info.trim()
                //     nova.push(el)
                // });
                this.listNew = this.list
            },
            gravar(){
                this.listNew.forEach(i => {
                    this.editJuris(i)
                })
            },
            removeAll(){
                this.listNew.forEach(i => {
                    this.deleteJurisFB(i.id)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>