<template>
    <div>
        <v-btn-toggle mandatory dense>
            <concurso-questoes-vincular :questao="questao"/>
            <v-btn>apagar</v-btn>
            <v-btn>editar</v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
    export default {
        props:{
            questao: Object
        }
    }
</script>

<style scoped>

</style>