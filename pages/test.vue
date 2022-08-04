<template>
    <div>
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
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                listNew: []
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