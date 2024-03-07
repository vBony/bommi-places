import { defineStore } from 'pinia'
import router from '@/router'

export const useUserStore = defineStore('user', {
    state: () => {
        return { 
            user: {
                emp_id: null,
                emp_first_name: null,
                emp_last_name: null,
                emp_email: null,
                emp_password: null,
                emp_phone_number: null,
                emp_birthdate: null,
                emp_cpf: null,
            },

            token: "",
            prefix: 'bommi_'
        }
    },

    getters: {
        getUser(state) {
            let user = localStorage.getItem(this.prefix+'user')

            if(user) {
                return JSON.parse(user)
            }else{
                router.replace('/login')
            }
        },

        getToken(state){
            let token = localStorage.getItem(this.prefix+'token')

            if(token) {
                return token
            }else{
                router.replace('/login')
            }
        }
    },

    actions: {
        setUser(userDestiny:object) {
            Object.assign(this.user, userDestiny);
            localStorage.setItem(this.prefix+'user', JSON.stringify(this.user))

            console.log(JSON.stringify(this.user))
        },

        setToken(token:string){
            this.token = token
            localStorage.setItem(this.prefix+'token', this.token)
        }
    },
})