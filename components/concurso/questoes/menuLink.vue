<template>
    <div>
        <v-btn-toggle mandatory dense>
             <concurso-questoes-vincular :questao="questao"/>
            <concurso-questoes-doutrina :questao="questao"/>
            <concurso-questoes-editar :questao="questao"/>
            <v-btn @click="deleteQuestion(questao.id)">apagar</v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        props:{
            questao: Object
        },
        methods:{
            ...mapActions(['removeQuestion']),
            deleteQuestion(item){
                this.removeQuestion(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Questão removida.', color:'success'})
            }
        }
    }
</script>

<style scoped>

</style>