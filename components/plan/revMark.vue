<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text color="warning"
            v-bind="attrs"
            v-on="on"
          >
          marcados para revisão
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2 mb-5">
            <v-icon class="mr-1">mdi-message-draw</v-icon>
            Lista de Marcados para Revisão
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
  
          <v-card-text>
            <v-list
                two-line
            >
                <v-subheader>Tarefas</v-subheader>

                <v-list-item-group
                    v-model="selected" multiple
                    active-class="pink--text"
                >
                    <template v-for="item, i in listMarkRev">
                        <v-list-item 
                            :key="item.description"
                            @click="addListAddRev(item)"
                        >
                            <template v-slot:default="{ active }">
                                <v-list-item-content>
                                    <v-list-item-title>{{item.description}}</v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{item.disciplina}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                                    <v-icon
                                    v-if="!active"
                                    color="grey lighten-1"
                                    >
                                    mdi-check
                                    </v-icon>

                                    <v-icon
                                    v-else
                                    color="yellow darken-3"
                                    >
                                    mdi-check-bold
                                    </v-icon>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                        <v-divider
                            v-if="i < listMarkRev.length - 1"
                            :key="i"
                        ></v-divider>
                    </template>
                </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Fechar
            </v-btn>
            <v-btn
              color="primary"
              outlined
              :disabled="!listAddRev.length"
              @click="sendAddRev()"
            >
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
import { mapActions } from 'vuex';

  export default {
    data () {
      return {
        dialog: false,
        selected: [],
        listAddRev: []
      }
    },
    computed:{
        listMarkRev(){
            const list = this.$store.getters.readListAddRev.filter(i => i.addRev)
            return list
        }
    },
    methods:{
        ...mapActions(['cargaListAddRev']),
        isExistTask(item){
            let task = this.listAddRev.find(i => i.id == item.id)
            return !!task
        },
        addListAddRev(item){
            if(!this.isExistTask(item)){
                this.listAddRev.push(item)
            }else{
                this.removeListAddRev(item)
            }
        },
        removeListAddRev(item){
            this.listAddRev = this.listAddRev.filter(i => i.id != item.id)
        },
        sendAddRev(){
            this.dialog = false
            this.$emit('listRev', this.listAddRev)
            this.listAddRev = []
        }
    },
    created(){
        this.cargaListAddRev()
    }
  }
</script>