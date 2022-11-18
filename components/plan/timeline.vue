<template>
    <v-container style="max-width: 600px;">
        {{task}}
      <v-timeline
        dense
        cli1pped
      >
        <v-timeline-item
          fill-dot
          class="white--text mb-12"
          color="orange"
          large
        >
          <template v-slot:icon>
            <span>JH</span>
          </template>
          <v-text-field
            v-model="input"
            hide-details
            flat outlined
            label="Insira com comentário..."
            solo
            @keydown.enter="comment"
          >
            <template v-slot:append>
              <v-btn
                class="mx-0"
                outlined
                @click="comment"
              >
                Enviar
              </v-btn>
            </template>
          </v-text-field>
        </v-timeline-item>
  
        <v-slide-x-transition
          group
        >
          <v-timeline-item
            v-for="event in timeline"
            :key="event.id"
            class="mb-4"
            color="pink"
            small
          >
            <v-row justify="space-between">
              <v-col
                cols="7"
                v-text="event.text"
              ></v-col>
              <v-col
                class="text-right"
                cols="5"
                v-text="event.time"
              ></v-col>
            </v-row>
          </v-timeline-item>
        </v-slide-x-transition>
  
        <v-timeline-item
          class="mb-6"
          hide-dot
        >
          <span>Fim</span>
        </v-timeline-item>
  
      </v-timeline>
    </v-container>
  </template>
  <script>
  export default {
    data: () => ({
      events: [],
      input: null,
      nonce: 0,
    }),
    props:{
        task: Object
    },
    computed: {
      timeline () {
        return this.events.slice().reverse()
      },
    },

    methods: {
      comment () {
        const time = (new Date()).toTimeString()
        this.events.push({
          id: this.nonce++,
          text: this.input,
          time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
            return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
          }),
        })

        this.input = null
      },
    },
  }
</script>