<template>
    <div>
        <v-system-bar dark color="primary">
            <v-spacer></v-spacer>
            <v-btn @click="close" icon ><v-icon>mdi-close</v-icon></v-btn>
        </v-system-bar>
        <v-card-title class="pa-0">
            <v-tabs
            v-model="tab"
            >
            <v-tab v-if="questoesId">Questões</v-tab>
            <v-tab v-if="sumulasId">Súmulas</v-tab>
            </v-tabs>
        </v-card-title>
        <v-tabs-items v-model="tab">
            <v-tab-item v-if="questoesId">
                <v-card-text>
                    <template v-for="item, index in questoes">
                        <div :key="index">
                            <p style="text-transform: uppercase; font-size: 18px;" class="font-weight-bold">
                               {{prova(item.prove).cargo}}/{{prova(item.prove).orgao}}/FGV/{{prova(item.prove).year}}
                            </p>
                            <p class="formatText">{{item.answer}}</p>
                            <p class="formatText">{{item.alternative}}</p>
                            <div class="my-8">
                                <v-btn @click="item.resp = 1" small outlined :color="item.resp == 1? 'primary':'grey'">Certo</v-btn>
                                <v-btn @click="item.resp = 0" small outlined :color="item.resp == 0? 'error':'grey'">Errado</v-btn>
                            </div>
                            <v-btn 
                                v-if="!item.msg"
                                @click="resolver(item)" 
                                :disabled="item.resp == null" 
                                tile color="success">Resolver
                            </v-btn>
                            <v-alert 
                                v-else
                                :type="item.resp == item.value ? 'success' : 'error'"
                                outlined
                            >
                                <p>{{item.msg}}</p>
                            </v-alert>
                        </div>
                        <div class="text-center my-5">
                            <v-pagination
                                v-model="pagination.page"
                                :length="totalPages"
                                circle
                            ></v-pagination>
                        </div>
                    </template>
                </v-card-text>
            </v-tab-item>
            <v-tab-item v-if="sumulasId">
                <v-card-text>
                    <v-list>
                        <template v-for="(item, index) in sumulas" >
                            <v-divider v-if="index != 0"></v-divider>
                            <v-list-item :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-chip label dark :color="item.orgao == 'STF' ? 'indigo' : 'error'" x-small>{{item.orgao}}</v-chip> Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}} </v-list-item-title>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                    <div class="pl-1 mt-1"> 
                                        <p class="formatText">{{item.text}}</p>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        
                    </v-list>
                </v-card-text>
            </v-tab-item>        
        </v-tabs-items>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close" text small>Ocultar</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tab: null,
                tabs: ['Questões', 'Súmulas'],
                pagination:{
                    page: 1,
                    perPage: 1,
                },
            }
        },
        props:{
            sumulasId: Array,
            questoesId: Array
        },
        computed:{
            sumulas(){
                const sumulas = this.$store.getters.readSumulas
                let newSumulas = []

                if (Array.isArray(this.sumulasId)){

                       this.sumulasId.forEach (i => 
                        sumulas.forEach(sumula => {
                            if(sumula.id == i)
                            newSumulas.push(sumula)
                        })
                    )

                    return newSumulas

                } else {
                    return newSumulas
                }
                
            },
            questoes(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                if (this.questoesId){
                       this.questoesId.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                let page = this.pagination.page - 1
                let start = page * this.pagination.perPage
                let end = start + this.pagination.perPage
                
                return newQuestoes.slice(start, end)
         
            },
            questoesComplete(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                if (this.questoesId){
                       this.questoesId.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                return newQuestoes.length
            },
            totalPages (){
                let totalPages = Math.ceil(this.questoesComplete/this.pagination.perPage)
                return totalPages
            },
            prova(){
                const proves = this.$store.getters.readProvas
                return (item) => proves.find( p => p.id == item)
            },
        },
        methods:{
            close(){
                this.$emit('fechar')
            },
            resolver(item){
                if(item.resp != null){
                    item.resp == item.value ? item.msg = 'você acertou' : item.msg = 'você errou'
                }
                return
            }
        },
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
    font-size: 16px;
}
</style>
