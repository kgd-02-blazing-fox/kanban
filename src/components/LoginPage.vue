<template>
  <div id="login" class="container-fluid mt-5">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="border col-md-5" style="padding: 30px; border-radius: 40px;">
                    <h2 class="justify-content-center text-center">Login to Kanban</h2><br>
                    <form @submit.prevent="$_LoginPage_login">
                        <div class="form-group">
                            <label for="login-email">Email address</label>
                            <input type="email" class="form-control" v-model="email" placeholder="Johndoe@mail.com"
                                required>
                        </div><br>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" class="form-control" v-model="password" required>
                        </div>
                        <div class="row"
                            style="display: flex; flex-direction: column; margin: auto; align-items: center;">
                            <p id="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
                            <button type="submit" class="btn btn-primary" style="width: 100px;">Login</button><br>
                            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="$_LoginPage_onSignIn"></GoogleLogin> <br>
                        </div>
                    </form>
                    <div class="col-md-12 text-center">
                        <p class="text-secondary">Doesn't have account yet? <span
                                class="text-primary" @click.prevent="$_LoginPage_goToRegisterPage">Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import GoogleLogin from 'vue-google-login';
export default {
    name:"LoginPage",
    data() {
        return {
            email:"",
            password:"",
            errorMessage:"",
            params: {
                client_id: "124739969343-r3avc3i2o4poa4ttkh439jhcedgjik59.apps.googleusercontent.com"
            },
            renderParams: {
                width: 150,
                height: 30,
                longtitle: true
            },
        }
    },
    methods:{
        $_LoginPage_login() {
            axios({
                method:"POST",
                url:"https://kanban-laurentius-server.herokuapp.com/login",
                data:{
                    email:this.email,
                    password:this.password,
                }
            })
            .then(response=>{
                localStorage.setItem("access_token",response.data.access_token)
                this.$emit("movePage","MainPage")
            })
            .catch(err=>{
                this.errorMessage = err.response.data.message
            })
        },
        $_LoginPage_onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                method:"POST",
                url:"https://kanban-laurentius-server.herokuapp.com/Glogin",
                headers:{
                    'google_token':id_token
                }
            })
            .then(response=>{
                localStorage.setItem("access_token",response.data.access_token)
                this.$emit("movePage","MainPage")
                })
            .catch(err=>{
                this.errorMessage = err.response.data.message
                })
        },
        $_LoginPage_goToRegisterPage() {
            this.$emit("movePage","RegisterPage")
        }
    }, 
    components: {
        GoogleLogin
    }
}
</script>

<style scoped>
    
</style>