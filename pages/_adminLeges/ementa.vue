<template>
    <v-container style="max-width: 1080px">
        <h1 class="my-5 text-h5">Importar Ementas</h1>
        <v-card outlined>
            <v-card-text>
                <v-select
                    label="Concurso"
                    dense outlined
                    :items="listConcurso"
                    item-text="name"
                    item-value="id"
                    v-model="nameConcurso"
                ></v-select>
                <v-select
                    label="Cargo"
                    dense outlined
                    :items="selectedConcurso.cargos"
                    item-text="name"
                    item-value="name"
                    v-if="nameConcurso"
                ></v-select>
                <v-textarea
                    label="Texto"
                    dense outlined
                    v-model="text"
                ></v-textarea>
                <v-radio-group v-model="radioGroup" row>
                    <v-radio
                        v-for="item, index in type"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></v-radio>
                </v-radio-group>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        @click="importText()"
                        outlined color="success">Importar</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
        <v-expand-transition>
            <v-row>
                <v-col cols="12">
                    <v-card outlined class="mt-5" v-if="listContent">
                        <v-card-text>
                            <v-expansion-panels
                                v-model="panel"
                                :disabled="disabled"
                                multiple
                                >
                                <v-expansion-panel v-for="item, index in listGeral" :key="index">
                                    <v-expansion-panel-header class="text-h5"> {{item.disciplina}} - {{item.content.length}}</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-list>
                                                <template v-for="subject, i in item.content">
                                                    <v-divider></v-divider>
                                                    <v-list-item :key="i">
                                                        <v-list-item-content class="pb-0">
                                                            <v-list-item-title class="formatText" >
                                                                {{subject.topic}} - {{subject.subject.length}}
                                                            </v-list-item-title>
                                                            <v-list>
                                                                <v-list-item v-for="sub, x in subject.subject" :key="x">
                                                                    <v-list-item-icon>
                                                                        <v-checkbox></v-checkbox>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        {{sub}}
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </v-list>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    
                </v-col>
            </v-row>
        </v-expand-transition>

    </v-container>
</template>

<script>

    export default {
        data(){
            return{
                text: '',
                listContent: '',
                listGeral: [],
                panel: [0, 1],
                disabled: false,
                radioGroup: '',
                type:[
                    {id: 1, name: "Conhecimentos Gerais"},
                    {id: 2, name: "Conhecimentos Específico"}
                ],
                nameConcurso: ''
            }
        },
        methods:{
            importText(){
                if(this.text){
                    let temp = []
                    temp.push(this.text.split(':')[0])
                    temp.push(this.text.substring( temp[0].length +1 ))
                    this.listContent = {
                        disciplina: temp[0],
                    }
                    let content = temp[1].replace('/\n*/', ' ').split(". ")
                    content = content.map(i => i.trim())
                    content = content.map(i => i.replace('/\n*/', ' '))
                    content = content.filter(i => i)
                    
                    let listTemp = []
                    content.forEach(topic =>{
                        let temp = []
                        if(topic.indexOf(':') != -1){
                             temp.push(topic.split(':')[0])
                             temp.push(topic.substring( temp[0].length +1 ).replace('/\n/', ' '))
                        }else{
                            temp.push(topic)
                        }
                        
                        let agregador = temp[0].replace('\n', ' ')
                        let subjects = ''
                        if(temp[1]){
                            subjects = temp[1].split(';').map(i => i.replace('/\n/', ' '))
                        }

                        // funcao para apagar todas apagar todas as ocorrencias \n
        
                        let org = {topic: agregador, subject: subjects }
                        listTemp.push(org)  
                    })

                    this.listContent.content = listTemp

                    this.listGeral.push(this.listContent)
                    this.text = ''
                    this.listContent = {}
                }
            }
        },
        computed:{
            listConcurso(){
                return this.$store.getters.readConcursosList
            },
            selectedConcurso(){
                if(this.nameConcurso){
                    let concurso = this.listConcurso.find(i => i.id = this.nameConcurso)
                    return concurso
                }
            }
        }
    }
import { CompatSource } from 'webpack-sources'
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
}
</style>