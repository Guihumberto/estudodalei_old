<template>
    <div>
        <v-dialog
        v-model="dialogPix"
        width="600"
      >
        <v-card>
            <v-app-bar
                
                color="#43a047"
                dark
                shrink-on-scroll
                prominent
                src="https://picsum.photos/1920/1080?random"
                fade-img-on-scroll
                scroll-target="#scrolling-techniques-5"
                scroll-threshold="500"
                >
                <template v-slot:img="{ props }">
                    <v-img
                    v-bind="props"
                    gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
                    ></v-img>
                </template>
                Ajude a manter o Estudo da Lei no ar!
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="dialogPix = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-app-bar>
          <v-card-text class="mt-5">          
            <p>
                O site estudo da lei é uma iniciativa de democratização dos estudos, dando possibilidade a todos 
                que possuem este nobre objetivo de passar em concurso público a ter acesso a melhor forma de estudar
                atualmente: estudo da lei + resolução de questões.
            </p> 
            <p class="pa-2 warning lighten-1 text--white">
                Se você puder e não for lhe fazer falta, considere fazer uma contribuição.
            </p>
            <v-row class="mt-5 justify-space-around">  
                Pix e-mail:
                <h3 class="text-h5">leges.estudo@gmail.com</h3>
                <v-btn color="primary" @click="copyPix()">copiar</v-btn>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <p>Humberto Júnior</p>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialogPix: true,
            }
        },
        methods:{
            copyPix(){
                const text = "leges.estudo@gmail.com"
                navigator.clipboard.writeText(text);
                this.$store.dispatch("snackbars/setSnackbars", {text:'Chave Pix Copiada', color:'success'})
            }
        }
    }
</script>

<style scoped>

</style>