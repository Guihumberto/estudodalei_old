import { auth } from "@/plugins/firebase.js"
export const strict = false

export const state = () => ({
    adm: false,
    lawsList: [],
    textLaw: [],
    otherTextLaw: [],
    nameLaw: [],
    nameOtherLaw: [],
    sumulas: [],
    juris: [],
    user: {},
    dataUser:[],
    favLaw:[],
    favJuris:[],
    favSumulas:[],
    disciplinas: [
        {id: 2, name: 'D. Constitucional', sigla: 'DC'},
        {id: 3, name: 'D. Tributário', sigla: 'DT'},
        {id: 1, name: 'D. Administrativo', sigla: 'DA'},
        {id: 4, name: 'D. Previdenciário', sigla: 'PREV'},
        {id: 5, name: 'D. Empresarial', sigla: 'DE'},
        {id: 6, name: 'D. Civil', sigla: 'CC'},
        {id: 7, name: 'D. Penal', sigla: 'DP'},
        {id: 8, name: 'D. Financeiro', sigla: 'DF'},
        {id: 9, name: 'D. Ambiental', sigla: 'AMB'},
        {id: 10, name: 'D. Trabalho', sigla: 'TRAB'},
        {id: 11, name: 'Processo CIvil', sigla: 'TRAB'},
        {id: 12, name: 'Processo Penal', sigla: 'TRAB'},
        {id: 13, name: 'Processo trabalho', sigla: 'TRAB'},
    ],
    provas:[
        {
            id: 1, 
            orgao: 'OAB', 
            cargo: 'XXXIV Exame',
            year: 2022,
            banca: 1, 
        },
        {
            id: 2, 
            orgao: 'OAB', 
            cargo: 'XXXV Exame',
            year: 2022,
            banca: 1, 
        }
    ],
    concursos: [],
    ementa: [],
    plan: [],
    planComplete: [],
    lawComplement: [],
    questions:[]
})

export const getters = {
    readAdmin(state){
        return state.adm
    },
    readDisciplinas(state){
        return state.disciplinas
    },
    readProvas(state){
        return state.provas
    },
    readLawsList(state){
        return state.lawsList
    },
    readTextLaw(state){
        return state.textLaw
    },
    readOtherTextLaw(state){
        return state.otherTextLaw
    },
    readLawComplement(state){
        return state.lawComplement
    },
    readNameLaw(state){
        return state.nameLaw
    },
    readNameOtherLaw(state){
        return state.nameOtherLaw
    },
    readSumulas(state){
        return state.sumulas
    },
    readJuris(state){
        return state.juris
    },
    readUser(state){
        return state.user
    },
    readFavLaw(state){
        return state.favLaw
    },
    readFavJuris(state){
        return state.favJuris
    },
    readFavSumulas(state){
        return state.favSumulas
    },
    readPreferencesUser(state){
        return state.dataUser
    },
    readConcursosList(state){
        return state.concursos
    },
    readEmenta(state){
        return state.ementa
    },
    readPlan(state){
        return state.plan
    },
    readPlanComplete(state){
        return state.planComplete
    },
    readQuestions(state){
        return state.questions
    },
}

export const mutations = {
    setAdm(state){
        state.adm = true
    },
    setCreateLaw(state, payload) {
        state.lawsList.push(payload)
    },
    setCreateTextLaw(state, payload) {
        state.textLaw.push(payload)
    },
    setLawsList(state, payload){
        state.lawsList = payload
    },
    setNameLaw (state, payload){
        state.nameLaw = payload
    },
    setNameOtherLaw (state, payload){
        state.nameOtherLaw = payload
    },
    setTextLaw(state, payload){
        let newText = []
        const text = Array.from(payload)
         text.forEach(i =>{
            i.show = false
            newText.push(i)
        })
        state.textLaw = newText
    },
    setOtherTextLaw(state, payload){
        state.otherTextLaw = payload
    },
    setLawComplement(state, payload){
        state.lawComplement = payload
    },
    setSumulas(state, payload){
        state.sumulas = payload
    },
    deleteSumula(state, payload) {
        state.sumulas = state.sumulas.filter( item => item.id != payload)
    },
    editSumula(state, payload){
        const x = state.sumulas.map(item => item.id == payload.id ? payload : item)
        state.sumulas = x
    },
    setJuris(state, payload){
        state.juris = payload
    },
    editJuris(state, payload){
        const x = state.juris.map(item => item.id == payload.id ? payload : item)
        state.juris = x
    },
    deleteJuris(state, payload) {
        state.juris = state.juris.filter( item => item.id != payload)
    },
    newUser(state, payload) {
        state.user = payload
    },
    setLogout(state){
        state.user = ""
        state.favLaw = []
        state.dataUser = []
        state.favJuris = []
        state.favSumulas = []
    },
    cargaFavLaw(state, payload){
        state.favLaw = payload
    },
    setFavLaw(state, payload){
        state.favLaw.push(payload)
    },
    deleteFavLaw(state, payload) {
        state.favLaw = state.favLaw.filter( item => item != payload)
    },
    setUserPreference(state, payload){
        state.dataUser = payload
    },
    setconcursoList(state, payload){
        state.concursos = payload
    },
    setFavJuris(state, payload){
        state.favJuris.push(payload)
    },
    setFavSumulas(state, payload){
        state.favSumulas.push(payload)
    },
    deleteBookJuris(state, payload) {
        state.favJuris = state.favJuris.filter( item => item != payload)
    },
    deleteBookSumulas(state, payload) {
        state.favSumulas = state.favSumulas.filter( item => item != payload)
    },
    setCargaFavJuris(state, payload){
        state.favJuris = payload
    },
    setCargaFavSumulas(state, payload){
        state.favSumulas = payload
    },
    setEmenta(state, payload){
        state.ementa = payload
    },
    clearEmenta(state){
        state.ementa = []
    },
    setPlan(state, payload){
        state.plan = payload
    },
    setPlanComplete(state, payload){
        state.planComplete = payload
    },
    setQuestions(state, payload){
        let newText = []
        const text = Array.from(payload)
         text.forEach(i =>{
            i.resp = null
            i.msg = false
            newText.push(i)
        })
         state.questions = newText
    },
    editQuestao(state, payload){
        const x = state.questions.map(item => item.id == payload.id ? payload : item)
        state.questions = x
    },
}

export const actions = {
    async cargaAPI({ commit }){
        if (localStorage.getItem('usuario')) {
            commit('setUser', JSON.parse(localStorage.getItem('usuario')))
          } else {
            commit('setUser', null)
          }
        try {
            const res = await fetch('https://cotec-api-default-rtdb.firebaseio.com/projects.json')
            const dataDB = await res.json()
            const arrayProjects = []

            for (let id in dataDB){
                arrayProjects.push(dataDB[id])
            }
            commit('load', arrayProjects)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaLawList({ commit }){
        try {
            const res = await fetch('https://leges-estudo-default-rtdb.firebaseio.com/laws.json')
            const dataDB = await res.json()
            const lawsList = []

            for (let id in dataDB){
                lawsList.push(dataDB[id])
            }
            commit('setLawsList', lawsList)     
        } catch (error) {
            console.log(error)
        }
    },
    async setLaw({ commit }, law) {
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${law.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(law)
            })

            const dataDB = await res.json()
            commit('setCreateLaw', law)
        } catch(error){
            console.log(error)
        } 
    },
    async setTextLaw({ commit }, lawText) {
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${lawText[0]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lawText[1])
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async cargaNameLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setNameLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaNameOtherLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setNameOtherLaw', textLaw)    
        } catch (error) {
            console.log(error)
        }
    },
    async cargaTextLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setTextLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaOtherTextLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setOtherTextLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async setSumula({ commit }, sumulas){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas/${sumulas.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sumulas)
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async cargaSumula({ commit }){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas.json`)
            const dataDB = await res.json()
            const sumulas = []

            for (let id in dataDB){
                sumulas.push(dataDB[id])
            }
            commit('setSumulas', sumulas)     
        } catch (error) {
            console.log(error)
        }
    },
    async saveSumulaDispositivo({ commit }, dipositivo){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${dipositivo[0]}/${dipositivo[1]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dipositivo[2])
            })

            const dataDB = await res.json()
        } catch(error){
            console.log(error)
        } 
    },
    async sendMsgFB({ commit }, mail){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/msg/${mail.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mail)
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async deleteSumulaFB({ commit }, id){
        try {
            await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas/${id}.json`, {
                method: 'DELETE',
            })
            commit('deleteSumula', id)
        } catch (error) {
            console.log(error)
        }
    },
    async editSumulaFB({commit}, sumula){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas/${sumula.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(sumula)
            })

            const dataDB = await res.json()
            commit('editSumula', sumula)
        } catch (error) {
            console.log(error)
        }
    },
    async setJuris({ commit }, juris){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/juris/${juris.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(juris)
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async cargajuris({ commit }){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/juris.json`)
            const dataDB = await res.json()
            const sumulas = []

            for (let id in dataDB){
                sumulas.push(dataDB[id])
            }
            commit('setJuris', sumulas)     
        } catch (error) {
            console.log(error)
        }
    },
    async editJuris({commit}, sumula){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/juris/${sumula.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(sumula)
            })

            const dataDB = await res.json()
            commit('editJuris', sumula)
        } catch (error) {
            console.log(error)
        }
    },
    async deleteJurisFB({ commit }, id){
        try {
            await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/juris/${id}.json`, {
                method: 'DELETE',
            })
            commit('deleteJuris', id)
        } catch (error) {
            console.log(error)
        }
    },
    async setUser({ commit }){
        try {
            await auth.onAuthStateChanged(function(user) {
                if (user) {
                    const userLogin = {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photo: user.photoURL
                    }
                  if(user.email == 'juninho.joao28@gmail.com'){
                    commit('setAdm')
                  }
                  commit('newUser', userLogin)
                }
            })
        } catch(error) {
            console.log(error)
        }
        
    },
    logout({commit}){
        commit('setLogout')
        auth.signOut()
        this.$router.push( '/' )
    },
    async addFavLaw({commit}, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favLaw/${data[1]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data[1])
            })

            const dataDB = await res.json()
            commit('setFavLaw', data[1])
        } catch(error){
            console.log(error)
        } 
    },
    async removeFavLaw({commit}, data){
        try {
            await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favLaw/${data[1]}.json`, {
                method: 'DELETE',
            })
            commit('deleteFavLaw', data[1])
        } catch (error) {
            console.log(error)
        }
    },
    async cargaUserPreferences({commit}, uid){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${uid}/favLaw.json`)
            const dataDB = await res.json()
            const sumulas = []

            for (let id in dataDB){
                sumulas.push(dataDB[id])
            }
            commit('setUserPreference', sumulas)  
            commit('cargaFavLaw', sumulas)  
        } catch (error) {
            console.log(error)
        }
    },
    async setConcurso({ commit }, concurso) {
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/concursos/${concurso.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(concurso)
            })

            const dataDB = await res.json()
            // commit('setCreateconcurso', concurso)
            console.log("concurso salvo");
        } catch(error){
            console.log(error)
        } 
    },
    async cargaConcursosList({ commit }){
        try {
            const res = await fetch('https://leges-estudo-default-rtdb.firebaseio.com/concursos.json')
            const dataDB = await res.json()
            const concursoList = []

            for (let id in dataDB){
                concursoList.push(dataDB[id])
            }
            commit('setconcursoList', concursoList)     
        } catch (error) {
            console.log(error)
        }
    },
    async addBookJuris({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favJuris/${data[1]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data[1])
            })

            const dataDB = await res.json()
            commit('setFavJuris', data[1])
        } catch(error){
            console.log(error)
        } 
    },
    async removeBookJuris({ commit }, data){
        try {
            await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favJuris/${data[1]}.json`, {
                method: 'DELETE',
            })
            commit('deleteBookJuris', data[1])
        } catch (error) {
            console.log(error)
        }
    },
    async addBookSumulas({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favSumulas/${data[1]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data[1])
            })

            const dataDB = await res.json()
            commit('setFavSumulas', data[1])
        } catch(error){
            console.log(error)
        } 
    },
    async removeBookSumulas({ commit }, data){
        try {
            await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data[0]}/favSumulas/${data[1]}.json`, {
                method: 'DELETE',
            })
            commit('deleteBookSumulas', data[1])
        } catch (error) {
            console.log(error)
        }
    },
    async cargaUsersFavLists({ commit }, uid){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${uid}/favJuris.json`)
            const dataDB = await res.json()
            const usersFavsLists = []

            for (let id in dataDB){
                usersFavsLists.push(dataDB[id])
            }
            commit('setCargaFavJuris', usersFavsLists)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaSumulasFavLists({ commit }, uid){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${uid}/favSumulas.json`)
            const dataDB = await res.json()
            const usersFavsLists = []

            for (let id in dataDB){
                usersFavsLists.push(dataDB[id])
            }
            commit('setCargaFavSumulas', usersFavsLists)     
        } catch (error) {
            console.log(error)
        }
    },
    async saveEmenta({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/ementa/${id[0]}/${id[1]}/${id[2].id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id[2])
            })

            const dataDB = await res.json()
            // commit('setCreateconcurso', concurso)
            console.log("ementa salvo");
        } catch(error){
            console.log(error)
        } 
    },
    async cargaEmenta({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/ementa/${data[0]}/${data[1]}.json`)
            const dataDB = await res.json()
            const concursoList = []

            for (let id in dataDB){
                concursoList.push(dataDB[id])
            }
            commit('setEmenta', concursoList)     
        } catch (error) {
            console.log(error)
        }
    },
    async setPrioritys({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data.uid}/plan/${data.concurso}/${data.cargo}/priority.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.priority)
            })

            const dataDB = await res.json()
            // commit('setCreateconcurso', concurso)

        } catch(error){
            console.log(error)
        } 
    },
    async cargaPrioritys({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${data.uid}/plan/${data.concurso}/${data.cargo}.json`)
            const dataDB = await res.json()
            const concursoList = []

            for (let id in dataDB){
                concursoList.push(dataDB[id])
            }
            commit('setPlan', concursoList)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaPlan({ commit }, uid){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/users/${uid}/plan.json`)
            const dataDB = await res.json()
            const concursoList = []

            for (let id in dataDB){
                concursoList.push(dataDB[id])
            }
            commit('setPlanComplete', concursoList)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaLawComplement({ commit}, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setLawComplement', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaQuestions({ commit }){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/questions.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setQuestions', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async setQuestions({ commit }, data){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/questions/${data.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const dataDB = await res.json()
            // commit('setCreateconcurso', concurso)

        } catch(error){
            console.log(error)
        } 
    },
    async linkQuestionDispositive({ commit }, disp){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${disp.idLaw}/${disp.idDispositivo}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(disp.dispositive)
            })

            const dataDB = await res.json()
        } catch(error){
            console.log(error)
        } 
    },
    async editSetQuestao({commit}, questao){
        console.log('questao editada')
        console.log(questao)
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/questions/${questao.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(questao)
            })
            const dataDB = await res.json()
            commit('editQuestao', questao)
        } catch (error) {
            console.log(error)
        }
    },
    async saveJurisDispositivo({ commit }, disp){
        console.log(disp)
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${disp.idLaw}/${disp.idDispositivo}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(disp.dispositive)
            })

            const dataDB = await res.json()
        } catch(error){
            console.log(error)
        } 
    },
}