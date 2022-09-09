<template>
    <v-container class="mt-5 leges" style="max-width: 1080px"> 
    <v-btn small text class="px-0 mb-5" @click="$router.go(-1)">
        <v-icon small>mdi-arrow-left</v-icon>
        voltar
    </v-btn>
    <v-card class="mb-5" outlined v-if="nameLaw[0]">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                     <v-card-title>
                        <p class="formatText mb-n3">{{nameLaw[3]}}</p>
                    </v-card-title>
                    <div class="pl-4">
                        Normativo: {{nameLaw[4]}} <br>
                        {{nameLaw[0].split('-').reverse().join('/')}}
                    </div>
                </v-col>
                <v-col class="pt-8" cols="12" sm="6">
                    <p class="formatText pl-4">{{nameLaw[1]}}</p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <!-- barra de loading -->
    <v-card v-else>
        <v-skeleton-loader
            class="mx-auto"
            type="card"
        ></v-skeleton-loader>
    </v-card>
    <!-- menus -->
    <v-row align-content-space-between class="mb-2" id="upRead">
        <v-col class="mb-n3" cols="12" sm="6">
            <v-text-field
                dense
                outlined
                label="Busca"
                append-icon="mdi-magnify"
                v-model.trim="search"
                @keydown.enter="filterJustArt(search.replace(/[^0-9]/g,''))"
                :messages="search && !artsFilterActive && textLaw.size ? `dispositivos encontrados ${textLaw.size}` : ''"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
            <v-btn-toggle>
                <v-btn @click="font.fontSize++" small icon><v-icon small>mdi-format-annotation-plus</v-icon></v-btn>
                <v-btn @click="font.fontSize--" small icon><v-icon small>mdi-format-annotation-minus</v-icon></v-btn>
                <v-btn @click="font.spacement++" small icon><v-icon small>mdi-format-paragraph-spacing</v-icon></v-btn>
                <v-btn @click="font.spacement--" small icon><v-icon small>mdi-format-vertical-align-center</v-icon></v-btn>
                <v-btn small icon><v-icon small>mdi-format-font</v-icon></v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="4">
            <v-btn-toggle>
                <leges-dialogs-otherLaws title="conjugar normas" @listOtherLaws="OtherLaws($event)" />
                <leges-dialogs-estrutura :estrutura="estruturaList" @indice="searchIndice($event)" />
                <leges-dialogs-print v-show="false" :law="nameLaw" :textLaw="textLaw.textComplete" />
                <leges-dialogs-anexos :law="nameLaw"  @filterArtsPush="filterArtsPush($event)" />
            </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="2" class="mt-n3" v-if="!artsFilterActive">
            <v-select
            class="pt-4"
            v-if="dispositiveBtn"
            :items="dispositivosPerPage"
            :label="`Dispositivos por página: ${pagination.perPage}`"
            dense
            v-model="pagination.perPage"
            v-show="!search"
            ></v-select>
            <v-btn 
                @click="dispositiveBtnAuto" 
                v-show="!search" v-else x-small text>
                Dispositivo por página: {{pagination.perPage}} 
                <v-icon small>mdi-chevron-down</v-icon> 
            </v-btn>
        </v-col>
        <!-- busca de artigos e salvar filtro -->
        <v-col class="mt-n6" cols="12">
            <div v-if="search.replace(/[^0-9]/g,'')">
                <v-chip 
                    @click="filterJustArt(search.replace(/[^0-9]/g,''))"
                    >
                    Art. {{search.replace(/[^0-9]/g,'')}}
                </v-chip>
            </div>
            <div>
                <v-chip-group
                    mandatory
                    active-class="primary--text"
                    v-if="artsFilterActive"
                >
                    <v-chip 
                        @click="pageFilter(false)" 
                        class="transparent pr-0 chipClearArrow" v-if="artsFilter.length == 1"
                        exact-active-class="0"
                    >
                        <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
                    </v-chip>
                    <v-chip
                        v-for=" tag in artsFilter" :key="tag"
                        @click:close="artFilterRemove(tag)"
                        close
                        >
                            art. {{tag}}
                    </v-chip>
                    <v-btn 
                        class="withUppercase" 
                        @click="clearAllArtsFilter()" v-if="artsFilter.length > 1" text color="error">
                        Limpar Filtro
                    </v-btn>
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-y
                        v-if="artsFilter.length > 1"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                class="withUppercase"  
                                text color="primary">
                                Salvar Filtro
                            </v-btn>
                        </template>
                        <leges-filterArt-saveFilter :law="nameLaw" :arts="artsFilter" @close="menu = false" />
                    </v-menu>   
                    <v-chip 
                        @click="pageFilter(true)" 
                        class="transparent pl-0 chipClearArrow" v-if="artsFilter.length == 1">
                            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                    </v-chip>
                </v-chip-group>
            </div>
        </v-col>
        <v-col cols="12">
            <h5 class="ml-2 overline">apenas com:</h5>
            <div class="d-flex ml-1">
                <v-checkbox
                    label="Favoritos"
                    dense
                    class="mr-1"
                    v-model="filters.favs"
                ></v-checkbox>
                <!-- <v-checkbox
                    label="Comentários"
                    dense
                    class="mr-1"
                    v-model="filters.comments"
                    v-show="false"
                ></v-checkbox>
                <v-checkbox
                    label="Questões"
                    dense
                    class="mr-1 d-none d-sm-flex"
                    v-model="filters.questions"
                    v-show="false"
                ></v-checkbox>
                <v-checkbox
                    label="Jurisprudência"
                    dense
                    class="mr-1 d-none d-sm-flex"
                    v-model="filters.juris"
                    v-show="false"
                ></v-checkbox> -->
            </div>
        </v-col>
    </v-row>
    <!-- Pagination top -->
    <div class="text-right">
        <v-btn class="mr-0 pr-0" small color="error" v-show="artIndice" text @click="clearSearchIndice">fechar buscar por índice</v-btn>
    </div>
    <div class="text-center mb-2 py-5" v-if="!search && !artsFilterActive">
        <v-pagination
        v-model="pagination.page"
        :length="totalPages"
        :total-visible="7"
        ></v-pagination>
    </div>
    <!--termo nao encontrado -->
    <v-card v-if="textLaw == 99"
        outlined min-height="20vw" class="my-5">
        <v-card-text>
            <v-alert
                type="error"
                outlined
            >
                Termo pesquisado não encontrado na norma... refaça a busca!
            </v-alert>
        </v-card-text>
    </v-card>
    <!-- text law -->
    <v-card outlined v-else-if="textLaw.text.length">
        <!-- other law -->
        <v-card-text v-if="listOhterLaw" class="primary lighten-5">
            <v-card-title class="mb-2 py-1 primary text-button white--text">{{nameOtherLaw.nickname}} - {{nameOtherLaw.nro}}
                <v-spacer></v-spacer>
                <v-btn icon dark @click="viewOtherLaw = !viewOtherLaw"> <v-icon>{{viewOtherLaw ? 'mdi-minus-box-outline': 'mdi-plus-box-outline'}}</v-icon> </v-btn>
                <v-btn icon dark @click="listOhterLaw = 0"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-card-title>
            <v-expand-transition>
                <div class="pa-2" v-show="viewOtherLaw">
                    <div v-for="(item, index) in listOhterLaw" :key="index" :style="{ fontSize: font.fontSize + 'px'}">
                        <p :style="{lineHeight: font.spacement }"  class="formatText"
                            :title="`art. ${item.art}`"
                            v-html="item.textLaw.startsWith('Art') ?  `<b>${item.textLaw.substr(0, 4)}</b> ${item.textLaw.substr(4)}` : item.textLaw">
                        </p>
                    </div>
                </div>
            </v-expand-transition>
        </v-card-text>
        <v-divider v-show="listOhterLaw"></v-divider>
        <!-- law page -->
        <v-card-title v-show="listOhterLaw" class="py-1 grey lighten-2 text-button">{{nameLaw[3]}} - {{nameLaw[4]}}</v-card-title>
        <v-card-text class="mt-5">
            <div>
                <div v-for="(item, index) in textLaw.text" :key="index" :style="{ fontSize: font.fontSize + 'px'}">
                    <div v-if="item.estrutura">
                        <p v-show="!artsFilterActive || artIndice" class="font-weight-medium text-center" v-text="item.textLaw"></p>
                    </div>
                    <div v-else class="mb-2" :id="index">
                        <!-- MENU jurisprudencia e questoes -->
                        <div class="d-flex">
                            <div v-if="item.sumulas || item.idQuestions" class="d-flex">
                                <v-expand-transition>
                                    <div v-show="menuExpanse">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    v-if="Array.isArray(item.idQuestions)"
                                                    v-bind="attrs"
                                                    v-on="on" 
                                                    title="Qtd de Questões" 
                                                    :href="`#${index}`"
                                                    @click="item.show = true, idTabIntegration = 3" 
                                                    x-small outlined color="success">{{item.idQuestions.length}}
                                                </v-btn>
                                            </template>
                                            <span>Questões</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    v-if="Array.isArray(item.sumulas)" 
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    title="Qtd de Jurisprudência" 
                                                    :href="`#${index}`"
                                                    @click="item.show = true, idTabIntegration = 1" 
                                                    x-small outlined color="warning">{{item.sumulas.length}}
                                                </v-btn>
                                            </template>
                                            <span>Súmulas</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    v-if="Array.isArray(item.idJuris)" 
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    title="Qtd de Julgados" 
                                                    :href="`#${index}`"
                                                    @click="item.show = true, idTabIntegration = 2" 
                                                    x-small outlined color="orange">{{item.idJuris.length}}
                                                </v-btn>
                                            </template>
                                            <span>Julgados</span>
                                        </v-tooltip>
                                    </div>
                                </v-expand-transition>
                            </div>    
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs"
                                        class="mt-1"
                                        v-on="on"
                                        title="Comentários" 
                                        :href="`#${index}`"
                                        @click="item.show = true, idTabIntegration = 0" 
                                        x-small icon color="grey"> 
                                        <v-icon>mdi-comment-processing-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Comentários</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        class="mt-1"
                                        @click="favDispositive(item.id)"
                                        v-bind="attrs"
                                        v-on="on"
                                        x-small icon 
                                        :color="findListFavDispositive(item.id) ? 'warning' : 'grey'"> 
                                        <v-icon v-text="findListFavDispositive(item.id) ? 'mdi-star' : 'mdi-star-outline'"></v-icon>
                                    </v-btn>
                                </template>
                                <span>Favoritar</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-if="item.sumulas || item.idQuestions"
                                        class="mt-1"
                                        v-bind="attrs"
                                        v-on="on"
                                        title="fechar" 
                                        @click="menuExpanse = !menuExpanse" 
                                        x-small icon color="grey"> 
                                        <v-icon v-text="menuExpanse ? 'mdi-close' : 'mdi-chevron-right'"></v-icon>
                                    </v-btn>
                                </template>
                                <span v-text="menuExpanse ? 'Fechar' : 'Exapndir' "></span>
                            </v-tooltip>
                        </div>
                       <!-- texto da lei -->
                        <p 
                            :style="{lineHeight: font.spacement }"  class="formatText" 
                            :title="`art. ${item.art}`"
                            v-html="search ? markSearch(item.textLaw) : item.textLaw">
                        </p>
                        <!-- materias congregados -->
                        <v-expand-transition>
                            <v-card outlined v-if="item.show">
                               <box-add 
                                :idTabIntegration = "idTabIntegration"
                                :questoesId="item.idQuestions" 
                                :sumulasId="item.sumulas" 
                                :jurisId="item.idJuris" 
                                :idDispositive="item.id"
                                @fechar="item.show = false" />
                            </v-card>
                        </v-expand-transition>
                    </div>
                </div>
            </div>
            <div class="text-center" v-if="artIndice">
                <v-btn @click="qtdArtIndice += 10" outlined>mostrar mais <v-icon class="ml-1 mr-n2">mdi-plus</v-icon></v-btn>
            </div>
            <div class="text-center" v-show="qtdArtIndice <= textLaw.size" v-if="search && !artsFilterActive">
                <v-btn @click="qtdArtIndice += 10" outlined>mostrar mais <v-icon class="ml-1 mr-n2">mdi-plus</v-icon></v-btn>
            </div>
        </v-card-text>     
    </v-card>
    <!-- load -->
    <v-card v-else>
        <v-skeleton-loader
            class="mx-auto"
            type="article, actions"
        ></v-skeleton-loader>
        <v-skeleton-loader
            class="mx-auto"
            type="article, actions"
        ></v-skeleton-loader>
    </v-card>
    <!-- Pagination Botton -->
    <div class="text-center mt-2 mb-16 py-5" v-if="!search && !artsFilterActive">
        <v-pagination
            v-model="pagination.page"
            :length="totalPages"
            :total-visible="7"
        ></v-pagination>
    </div>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    import boxAdd from '../../components/leges/box/boxAdd.vue';

    export default {
        components: { boxAdd },
        data(){
            return{
                menu: false,
                menuExpanse: true,
                idTabIntegration: 0, 
                dispositiveBtn: false,
                // id: this.$route.query.id,
                title: this.$route.params.law,
                dispositivosPerPage: [15, 30, 50],
                artsFilter: [],
                artsFilterActive: false,
                search: '',
                listOhterLaw: '',
                nameOtherLaw: '',
                viewOtherLaw: true,
                pagination:{
                    page: 1,
                    perPage: 15,
                },
                font:{
                    fontSize: 18,
                    spacement: 2.0,
                    fontStyle: '',
                },
                boxAdd: false,
                artIndice: '',
                qtdArtIndice: 10,
                filters:{
                    favs: false, 
                    comments: false,
                    questions: false, 
                    juris: false
                },
                listFavDispositive: []
            }
        },
        watch:{
            'pagination.page': 'pageTop'
        },
        computed:{
            textLaw(){
                const textTemp = this.$store.getters.readTextLaw

                if(this.artIndice){
                    
                    let indice = textTemp.findIndex(i => i.textLaw == this.artIndice)
                    return { text: textTemp.slice(indice, indice + this.qtdArtIndice), size: textTemp.length}
                }
                else if(this.artsFilterActive){
                    let filtro = this.$store.getters.readTextLaw
                    let novoFiltro = []

                    if(this.artsFilter){
                        filtro = filtro.forEach(item => {
                            this.artsFilter.forEach( art => {
                                if(art == item.art){
                                    novoFiltro.push(item)
                                }
                            })
                        })
                    }

                    return {text: novoFiltro}

                } else if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro =  this.$store.getters.readTextLaw.filter(item => exp.test(item.textLaw.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))

                    return filtro.length
                            ? {text: filtro.slice(0, 0 + this.qtdArtIndice), size: filtro.length}
                            : 99
                
                } else if(this.filters.favs){

                    let textLaw = this.$store.getters.readTextLaw
                    let listNew = []

                    textLaw.forEach( i => {
                        this.listFavDispositive.forEach( l => {
                            if(l == i.id){
                                listNew.push(i)
                            }
                        })
                    })

                    textLaw = listNew

                    let page = this.pagination.page - 1
                    let start = page * this.pagination.perPage
                    let end = start + this.pagination.perPage
                    return {
                            totalDispositivos: textLaw.length,
                            text: textLaw.slice(start, end),
                            textComplete: textLaw
                           }
                } else {
                    let page = this.pagination.page - 1
                    let start = page * this.pagination.perPage
                    let end = start + this.pagination.perPage
                    return {
                            totalDispositivos: this.$store.getters.readTextLaw.length,
                            text: textTemp.slice(start, end),
                            textComplete: this.$store.getters.readTextLaw
                           }
                }
            },
            estruturaList(){
                const list = this.$store.getters.readTextLaw || []
                return list.filter(i => i.estrutura)
            },
            nameLaw(){
                return this.$store.getters.readNameLaw
            },
            totalPages (){
                let totalPages = Math.ceil(this.textLaw.totalDispositivos/this.pagination.perPage)
                return totalPages
            },
            lastArt(){
                const law = this.$store.getters.readTextLaw
                const lastArt = law[law.length -1]
                return lastArt.art
            },
            user(){
                const user = this.$store.getters.readUser
                return user.uid
            },
        },
        methods:{
            ...mapActions(['cargaTextLaw', 'cargaNameLaw', 'saveFavDispositve', 'cargaFavDispositive', 'removeFavDispositive']),
            dispositiveBtnAuto(){
                this.dispositiveBtn = true
                setTimeout(() => {
                    this.dispositiveBtn = false
                }, "3000")
            },
            filterJustArt(art){     
                if(art <= this.lastArt){
                    this.artIndice = ''
                    this.search = ''
                    let findArt = this.artsFilter.find( x => x == art ) 
                    if(!findArt){
                        art > 0 ? this.artsFilter.push(art) : this.$store.dispatch("snackbars/setSnackbars", {text:'artigo inválido', color:'error'})
                    }
                    
                    if(this.artsFilter.length > 0) {
                        this.artsFilterActive = true
                    } else {
                        this.artsFilterActive = false
                    } 
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'artigo não existe', color:'error'})
                }
            },  
            pageFilter(item){
                let art = this.artsFilter[0]
                if(item) {
                    art == this.lastArt ? art : art++  
                  
                } else {
                  art == 1 ? art : art--
                }   
                this.artsFilter = []
                this.artsFilter.push(art)
                console.log(art);
            },
            artFilterRemove(art){
                let artRemove = this.artsFilter.findIndex( i => i == art)
                this.artsFilter.splice(artRemove, 1)
                
                if(!this.artsFilter.length > 0) {
                    this.artsFilterActive = false
                }
            },
            clearAllArtsFilter(){
                this.artsFilter = []
                this.artsFilterActive = false
            },
            OtherLaws(event){
               this.nameOtherLaw = event[0]
               this.listOhterLaw = event[1]
            },
            searchIndice(art){
                console.log(art);
                this.artsFilterActive = true
                this.artIndice = art
            },
            clearSearchIndice(){
                this.artIndice = ''
                this.artsFilterActive = false
            },
            markSearch(item){
                let termoPesquisado = this.search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                let pattern = new RegExp(termoPesquisado,"gi");

                return item.replace(pattern, match => `<mark>${match}</mark>`);
            },
            filterArtsPush(item){
                console.log("heloo bdksadksa", item)
                if(item){
                    this.artsFilterActive = true
                    item.forEach( i => {
                        this.filterJustArt(i)
                    })
                }
            },
            pageTop(){
                window.location.href = "#upRead";
            },
            findListFavDispositive(item){
                let find = this.listFavDispositive.find(i => i == item)
                return !!find
            },
            favDispositive(item){
                    if(this.findListFavDispositive(item)){
                        let dataLaw = {}
                        dataLaw = {
                            idLaw: this.title,
                            dispositive: item
                        }
                        this.listFavDispositive.splice(item, 1)
                        this.removeFavDispositive(dataLaw)
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Dispositivo removido da lista de Favoritos', color:'error'})
                        
                    } else {
                        let dataLawFav = {}
                        dataLawFav = {
                            idLaw: this.title,
                            dispositive: item
                        }
                        this.saveFavDispositve(dataLawFav)
                        this.listFavDispositive.push(item)
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Dispositivo incluído na lista de Favoritos', color:'success'})
                    }

                    
            },
            cargaLazy(){
                this.cargaFavDispositive(this.title)
                setTimeout(() => {
                    this.listFavDispositive = this.$store.getters.readFavDispositive
                }, 2000)
            }
        },
        created(){
            this.cargaTextLaw(this.title)
            this.cargaNameLaw(this.title)
            this.cargaFavDispositive(this.title)
            this.cargaLazy()
        }
    }
</script>

<style lang="scss" scoped>

html {
    scroll-behavior: smooth;
}
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
}

.v-chip.chipClearArrow{
    color: #36344D !important;

}
.v-btn.withUppercase{
    text-transform: none !important;
}
</style>