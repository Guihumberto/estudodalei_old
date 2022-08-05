import { auth } from "@/plugins/firebase.js"
export const strict = false

export const state = () => ({
    lawsList: [],
    textLaw: [],
    otherTextLaw: [],
    nameLaw: [],
    nameOtherLaw: [],
    sumulas: [],
    juris: [],
    user:{},
    dataUser:{}
})

export const getters = {
    readLawsList(state){
        return state.lawsList
    },
    readTextLaw(state){
        return state.textLaw
    },
    readOtherTextLaw(state){
        return state.otherTextLaw
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
    }
}

export const mutations = {
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
    }
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
        console.log("apagado");
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
    }
}