<template>
    <v-container style="max-width:1080px">
        <v-btn outlined class="mb-5" text @click="$router.go(-1)">voltar</v-btn>
        <h5 class="text-h5 mb-5">Lista de Questões</h5>
        <!-- busca -->
        <v-card class="mb-5">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            label="Disciplina"
                            outlined dense
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            label="Prova"
                            outlined dense
                        ></v-select>
                    </v-col>
                    <v-col cols="12" class="mt-0 pt-0">
                        <v-checkbox
                            label="apenas as questões não vinculadas"
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <!-- questoes -->
        <v-card outlined>
            <v-card-text>
                <template v-for="item, index, in listQuestions.slice(0, showMore)">
                    <div class="mb-5" :key="index">
                        <p>{{item.prove}} / {{item.subject}}</p>
                        <p>{{item.answer}}</p>
                        <p>{{item.alternative}}</p>
                        <concurso-questoes-menuLink :questao="item"/>
                    </div>
                    <v-divider class="my-5"></v-divider>
                </template>
                <v-btn 
                    v-if="listQuestions.length > showMore"
                    outlined color="primary" block @click="showMore +=10">ver mais</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    import concurso from '../_concurso/concurso.vue';
    export default {
  components: { concurso },
        data(){
            return{
                showMore: 10,
                reverse: false
            }
        },
        computed:{
            listQuestions(){
                const list = this.$store.getters.readQuestions
                return list.sort(this.order)
            },
            listDisciplinas(){
                return this.$store.getters.readDisciplinas
            }
        },
        methods:{
            ...mapActions(['cargaQuestions']),
            order(a, b){ 
                if (a.answer > b.answer) {
                    return 1;
                }
                if (a.answer < b.answer) {
                    return -1;
                }
                return 0;
            }
        },
        created(){
            this.cargaQuestions()
        }
    }
</script>

<style lang="scss" scoped>

</style>