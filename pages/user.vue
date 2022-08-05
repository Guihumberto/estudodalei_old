<template>
    <v-container>
        <h1>Área do Usuário</h1>

        <v-card class="mt-1" outlined>
            <v-card-text>
                <v-icon v-for="item in 20" :key="item">mdi-hammer</v-icon>
                <v-alert>
                    em construção ....
                    <p>aguarde mais um pouco para conhecer a área mais produtiva para suas revisões!</p>
                    <p>estamos ansiosos para mostrar este recurso!</p>
                </v-alert>
                <v-btn outlined to="/">home</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>