<template>
  <div class="aboutme d-flex align-center ">
    <v-container>
      <v-card flat color="transparent" class="text-center">
          <v-card-text>
              <v-btn dark x-large to="/laws" color="indigo">ACESAR AGORA</v-btn>
          </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.aboutme {
  height: 30vw;
  background: url("https://s3-us-west-2.amazonaws.com/files.bradengelhardt.com/brad-bg-main.jpg")
    no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
}

</style>
