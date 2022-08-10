<template>
    <v-container style="max-width: 1080px">
        <h1 class="my-5 text-h5">Importar Ementas</h1>
        <v-card outlined>
            <v-card-text>
                <v-textarea
                    label="Texto"
                    dense outlined
                    v-model="text"
                ></v-textarea>
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
                <v-col>
                    <v-card outlined class="mt-5" v-if="listContent">
                        <v-card-text>
                            <v-list>
                                <template v-for="item, index in listGeral">
                                    <v-list-item :key="index">
                                        <v-list-item-content>
                                            <v-list-item-title class="text-h5">{{item.disciplina}}</v-list-item-title>
                                            <v-list>
                                                <template v-for="subject, i in item.content">
                                                    <v-divider></v-divider>
                                                    <v-list-item :key="i">
                                                        <v-list-item-icon>
                                                            <v-checkbox></v-checkbox>
                                                        </v-list-item-icon>
                                                        <v-list-item-content class="pb-0">
                                                        <p class="formatText" >
                                                            {{subject}}
                                                        </p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </v-list>
                                           
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
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
                listGeral: []
            }
        },
        methods:{
            importText(){
                if(this.text){
                    const temp = this.text.split("\n$$")
                    this.listContent = {
                        disciplina: temp[0],
                        content: temp[1].replace('\n', ' ').split(".")
                    }
                    this.listContent.content = this.listContent.content.map(i => i.trim())
                    this.listContent.content = this.listContent.content.map(i => i.replace('\n', ''))
                    this.listContent.content = this.listContent.content.map(i => i.replace('\n', ''))
                    this.listContent.content = this.listContent.content.map(i => i.replace('\n', ''))
                    this.listContent.content = this.listContent.content.map(i => i.replace('\n', ''))
                    this.listContent.content = this.listContent.content.filter(i => i)
                    this.listGeral.push(this.listContent)
                    this.text = ''
                    this.listContent = {}
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
}
</style>