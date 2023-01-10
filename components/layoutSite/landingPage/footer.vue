<template>
  <v-container style="background-color: #F0EFF3">
    <v-card flat class="my-16" color="transparent">
        <v-card-text class="text-center">
            <p class="footer">Desenvolvido e idealizado por <br> <span class="indigo--text font-weight-bold" style="font-size: 20px">João Humberto Silva Ribeiro Júnior</span> </p>
            <v-btn class="mt-n6 withUppercase" text href="https://www.instagram.com/estudodalei.com.br/"> <v-icon small class="mt-1 mr-1">mdi-instagram</v-icon> estudodalei.com.br</v-btn>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.v-btn.withUppercase{
    text-transform: lowercase !important;
}

</style>
