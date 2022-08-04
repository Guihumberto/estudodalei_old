<template>
    <v-card class="ml-3 mt-2" outlined color="primary lighten-4">
        <v-card-text>
            <v-row>
                <v-col cols="3" sm="2" md="1">
                    <v-avatar size="74" tile>
                        <v-img  
                            :src="sumulas.img">
                        </v-img>
                    </v-avatar>
                </v-col>
                <v-col cols="9" sm="10" md="7" class="my-auto">
                        <p class="mb-0 formatText" v-text="sumulas.text"></p>
                </v-col>
                <v-col cols="12" sm="12" md="3" class="my-auto text-right d-flex">
                    <v-btn class="mr-1" color="teal" dark to="/sumulas">SÚMULAS</v-btn>
                    <v-btn color="teal" dark to="/juris">JURISPRUDÊNCIAS</v-btn>
                </v-col>
            </v-row>    
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                sumulas:{
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGN84swpzETpMy9e4znR7lQvcZT1gxjEQKvQ&usqp=CAU',
                    text: 'Busca avançada nas Súmulas e Jurisprudências do STJ e STF por ramos do direito e subdivididos por assunto.',
                    alert: '**As jurisprudências estão sendo atualizadas diariamente.'
                }
            }
        }        
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
}
</style>