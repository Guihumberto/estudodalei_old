<template>
    <v-card flat>
        <v-card-text>
             <h3 class="description mb-5"> 
                <v-icon class="tag mr-1 indigo mb-4"></v-icon>
                <span class="black--text text-h4 mb-5">Saiba mais</span> 
                <v-expansion-panels>
                    <v-expansion-panel
                    v-for="(item,i) in items"
                    :key="i"
                    >
                    <v-expansion-panel-header>
                        <h3 class="text-h5">{{item.title}}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="subtitle-1">{{item.text}}</p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </h3>
        </v-card-text>
    </v-card>
</template> 

<script>
    export default {
        data(){
            return{
                items:[
                    {id: 1, title: 'Legislação - Lei', text: 'Atualmente, o Estudo da Lei possui 36 leis em sua base, essa quantidade pode ser aumentada de acordo com a necessidade dos nossos usuários/alunos. Basta pedir e nós incluímos. É possível favoritar as leis para vizualizar apenas aquilo que é de seu interesse (necessário estar logado)'},
                    {id: 2, title: 'Busca', text: 'A barra de busca ao entrar na lei funciona de duas formas: é possível buscar por qualquer termo dentro da lei ou digitar o número do artigo. Nesta última é possível filtrar vários artigos, o resultado é a visualização dos artigos escolhidos. Uma excelente ferramenta para metas de consultoria.'},
                    {id: 3, title: 'Índice', text: 'Ao lado da barra de busca, dentro da área de leitura da lei, existe o botão de ÍNDICE. Se a lei estiver estrutura em tópicos (Livro, Título, Capítulo, seção, etc.) será possível ter acesso com um click no botão ao lado do índice escolhido.'},
                    {id: 4, title: 'Conjugar Normas', text: 'Sabe quando uma norma indica um artigo de outra norma e você precisa sair da leitura da lei para buscar o que aquele dspositivo diz? (se você não faz essa busca pode estar deixando de acertar uma questão). Esta função vai te ajudar bastente! Bastar escolher a norma referenciada e ela será incluída acima da leitura atual na cor azul. A função pode ser acessada no botão ADD ao a lado do índice.'},
                    {id: 5, title: 'Conjugar Normas 2', text: 'Essa função pode ser acessar em qualquer lugar da aplicação no botão de menu no canto superior direto da tela, na barra de menu. Por padrão ele vai abrir a CF/88, mas pode ser carregada qualquer outra lei da base.'},
                ]
            }
        }
    }
</script>

<style scoped>
.tag{
    height: 30px;
    width: 20px;
}
</style>