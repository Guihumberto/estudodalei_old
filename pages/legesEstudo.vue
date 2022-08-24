<template>
    <v-container style="max-width: 1080px" class="font-face">
            <v-app-bar flat color="transparent" class="mx-n5">
                <div class="d-flex">
                    <v-icon color="indigo" large class="mr-1">mdi-sun-compass</v-icon>
                    <h5 to="/" class="text-h5 leges">Estudo da Lei</h5>
                </div>
                <v-spacer></v-spacer>
                <v-btn to="/" text>Início</v-btn>
                <v-btn to="/sumulas" text class="mx-2">Súmulas</v-btn>
                <v-btn to="/juris" text>Julgados</v-btn>
                <v-btn to="/login" text class="ml-2 mr-0" rounded color="indigo" outlined>Login</v-btn>
            </v-app-bar>
        <v-card flat class="my-16 pt-16">
            <v-row class="mt-16">
                <v-col cols="12" sm="6" class="my-auto">
                    <h1 class="text-h3 title">Estudo da Lei</h1>
                    <p class="mt-5 text-h5 description">Estude a legislação integrada a questões e jurisprudência de forma única.</p>
                    <v-btn to="/" class="px-14" dark x-large color="indigo">ACESSAR</v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-img src="/landingPage/hero-illustration.svg"></v-img>
                </v-col>
            </v-row>
        </v-card>
        <v-card flat>
            <v-card-text>
                <v-img
                    contain
                    src="/landingPage/telaLeges.png"
                    max-height="500"
                ></v-img>
            </v-card-text>
        </v-card>
        <v-card flat class="my-16">
            <v-card-title class="description"> <span class="tag mr-3 indigo"></span> O que é o Estudo da Lei?</v-card-title>
            <v-card-text class="text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit libero ad similique consequatur 
                    error tenetur nam pariatur dolorum inventore dolor laborum, omnis corporis dolore iste nobis ratione eveniet ducimus iure!
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit libero ad similique consequatur 
                    error tenetur nam pariatur dolorum inventore dolor laborum, omnis corporis dolore iste nobis ratione eveniet ducimus iure!
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit libero ad similique consequatur 
                    error tenetur nam pariatur dolorum inventore dolor laborum, omnis corporis dolore iste nobis ratione eveniet ducimus iure!
                </p>
            </v-card-text>
         </v-card>
        <funcionalidades />
        <v-card flat class="my-16">
            <v-card-text class="text-center">
                <p class="footer">Desenvolvido e idealizado por <span class="indigo--text font-weight-bold">João Humberto Silva Ribeiro Júnior</span> </p>
                <v-btn class="mt-n6" text href="https://www.instagram.com/humbertojhj/"> <v-icon class="mr-1">mdi-instagram</v-icon> @humbertojhj</v-btn>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>
    export default {
        layout: 'landingPage',
        data(){
            return{

            }
        }
        
    }
</script>

<style scoped>
.colorBanner{
    background: rgb(252,250,255);
    background: -moz-linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    background: -webkit-linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    background: linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfaff",endColorstr="#f2f5f9",GradientType=1);
}
.font-face {
    font-family: 'Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

.leges{
    font-weight: 500;
}
.title {
    font-weight: 700;
}
.description {
    font-size: 2.2rem;
    line-height: 3rem;
    font-weight: 400;
}
.text{
    font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
    display: block;
    font-size: 1.8rem;
    line-height: 2.5rem;
}

.tag{
    height: 50px;
    width: 20px;
}

.footer {
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: 400;
}

</style>