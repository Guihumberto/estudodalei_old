<template>
    <v-card flat>
            <v-card-title class="text-v-card-title mb-5">
                Lista de Questões 
                <v-btn small color="primary" class="ml-2" to="../questoes/listQuestions">ver</v-btn>
            </v-card-title>
            <v-card outlined>
                <v-card-text>
                    <v-select
                        label="Assunto"
                        dense outlined
                        :items="subjects"
                        item-value="id"
                        item-text="name"
                        v-model="subject"
                    ></v-select>
                    <v-textarea
                        label="Questão"
                        dense outlined
                        height="20vw"
                        v-model="questions"
                    ></v-textarea>
                </v-card-text>
            </v-card>
            <v-card outlined class="mt-5">
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="importSave()">Listar</v-btn>
                </v-card-title>
                <v-card-text >
                    {{_questions.banca}} / {{_questions.year}} / {{_questions.name}}  / {{_questions.orgao}}<br><br>
                    {{_questions.answer}} <br><br>
                    {{_questions.alternatives}} <br><br>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text v-if="questionGravar.length">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="clearFields()">Limpar Tudo</v-btn>
                        <v-btn color="primary" @click="saveBD()">Salvar BD</v-btn>
                    </v-card-title>
                    <div class="mb-5" v-for="item, index in questionGravar" :key="index">
                        <p>{{item.prove}} / {{item.subject}}</p>
                        <p>{{item.answer}}</p>
                        <p>{{item.alternative}}</p>
                        <v-btn small @click="item.value = 1" :outlined="item.value == 0" color="success">Certo</v-btn>
                        <v-btn small @click="item.value = 0" :outlined="item.value == 1" color="error">Errado</v-btn>
                    </div>
                </v-card-text>
            </v-card>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    const shortid = require('shortid');

    export default {
        name: 'questions',
        data(){
            return{
                questions: '',
                subject: 0,
                bancas:[
                    {id: 1, name: 'FGV'},
                    {id: 2, name: 'CESPE'},
                    {id: 3, name: 'FCC'},
                ],
                provas:[
                    {
                        id: 1, 
                        orgao: 'OAB', 
                        cargo: 'XXXIV Exame',
                        year: 2022,
                        banca: 1, 
                    },
                    {
                        id: 2, 
                        orgao: 'OAB', 
                        cargo: 'XXXV Exame',
                        year: 2022,
                        banca: 1, 
                    }
                ],
                subjects:[
                    {id: 1, name:'Direito Administrativo', sigla: 'DA'},
                    {id: 2, name:'Direito Constitucional', sigla: 'DC'},
                    {id: 3, name:'Direito Tributário', sigla: 'DT'},
                    {id: 4, name: 'D. Previdenciário', sigla: 'PREV'},
                    {id: 5, name: 'D. Empresarial', sigla: 'DE'},
                    {id: 6, name: 'D. Civil', sigla: 'CC'},
                    {id: 7, name: 'D. Penal', sigla: 'DP'},
                    {id: 8, name: 'D. Financeiro', sigla: 'DF'},
                    {id: 9, name: 'D. Ambiental', sigla: 'AMB'},
                    {id: 10, name: 'D. Trabalho', sigla: 'TRAB'},
                ],
                questionsProve: [
                    {id: 1, answer: '', alternative: '', value: 0, subject:1, prove: 1}
                ],
                questionGravar: []
            }
        },
        computed:{
            _questions(){
                let bancaAnoExame
                let answer
                let alternatives
                let newAlt = []
                let name
                let year

                if(this.questions){
                    let list = this.questions.split('\n')
                    list = list.map(i => i.replace('\n', ''))
                    list = list.filter(i => i)
                    list = list.map(i => i.trim())
                    
                    bancaAnoExame = list[0]
                    bancaAnoExame = bancaAnoExame.split('/')
                    name = bancaAnoExame[bancaAnoExame.length - 1]
                    year = bancaAnoExame[bancaAnoExame.length - 2]

                    let divider = list.findIndex(i => i == 'A')

                    answer = list.slice(1, divider).join('\n')

                    alternatives = list.slice(divider, list.length)

                    alternatives.forEach( i => {
                        if(i == 'A' || i == 'B' || i == 'C' || i == 'D'){
                            let index = alternatives.findIndex(ind => ind == i)
                            let novaAlt = alternatives[++index]
                            newAlt.push(novaAlt)
                        }
                    })
                }
                    return {
                        banca: 'FGV',
                        orgao: 'OAB',
                        name, 
                        year,
                        answer, 
                        alternatives: newAlt

                    }
                
            }
        },
        methods:{
            ...mapActions(['setQuestions']),
            provaSearch(name){
                let result = this.provas.filter(i => i.cargo == name)
                return result.length
                ? result[0].id
                : 0
            },
            importSave(){      
                let prove = this.provaSearch(this._questions.name)

                this._questions.alternatives.forEach(i => {
                    let question = {}
                    question = {
                        id: shortid.generate(), 
                        answer: this._questions.answer.replace('\n', ''), 
                        alternative: i.replace('\n', ''), 
                        value: 0, 
                        subject: this.subject, 
                        prove: prove
                    }
                    this.questionGravar.push(question)
                })
            },
            saveBD(){
                if(this.questionGravar.length && this.subjects){
                    let n = 1
                    let allCorreto = this.questionGravar.filter(i => i.value == 0 )
                    let allErrado = this.questionGravar.filter(i => i.value == 1)

                    if(allCorreto.length == 4 || allErrado == 4){
                            this.$store.dispatch("snackbars/setSnackbars", {text:'Escolha uma certa ou uma errada', color:'error'})
                    } else {
                        this.questionGravar.forEach(i => {
                            this.setQuestions(i)
                            n++
                            this.$store.dispatch("snackbars/setSnackbars", {text:`Gravou ${n - 1} `, color:'success'})
                            this.clearFields()
                        })
                    }

                } else {
                    if(!this.subjects){
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Falta a Disciplina', color:'error'})
                    }
                    if(!this.questionGravar.length){
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Faltam as questoes', color:'error'})
                    }
                }
            },
            clearFields(){
                this.questions = ''
                this.questionGravar = []
            }
        }
    }
</script>

<style scoped>

</style>