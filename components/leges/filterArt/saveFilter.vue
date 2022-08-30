<template>
    <v-card>
        <v-system-bar
            color="primary"
        >
        <v-spacer></v-spacer>
        <v-btn @click="close" x-small icon><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <v-card-text>
            <v-select
                dense outlined
                label="Pasta"
            >
                <template v-slot:append>
                    <v-btn x-small color="success" fab><v-icon>mdi-plus</v-icon></v-btn>
                </template>
            </v-select>
            <v-text-field
                label="Nome"
                placeholder="digite um nome para o filtro"
                dense
                class="mt-n3"
            >
            </v-text-field>
                Artigos: <span v-for="item, i in artsOrder" :key="i">{{item}}<span>, </span></span>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" small text>Cancelar</v-btn>
                <v-btn @click="save" small color="success">Salvar</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                fav: true,
                message: false,
                hints: true,
            }
        },
        props:{
            arts: Array
        },
        computed:{
            artsOrder(){
                return this.arts.sort(this.order)
            }
        },
        methods:{
            save(){
                console.log('salvar')
            },
            close(){
                this.$emit('close')
            },
            order(a, b){
                return a -  b
            
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>