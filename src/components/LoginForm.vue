<template>
  <div id="login" class="container-fluid mt-5">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="border col-md-5" style="padding: 30px; border-radius: 40px;">
                    <h2 class="justify-content-center text-center">Login to Kanban</h2><br>
                    <form @submit.prevent="login">
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
                            <button type="submit" class="btn btn-primary" style="width: 100px;">Login</button><br>
                            <div class="g-signin2" id="google-signin-button"></div><br>
                        </div>
                    </form>
                    <div class="col-md-12 text-center">
                        <p class="text-secondary">Doesn't have account yet? <span onclick=""
                                class="text-primary" @click.prevent="signOut">Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"LoginForm",
    data() {
        return {
            email:"",
            password:""
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
        })
    },
    methods:{
        login() {
            axios({
                method:"POST",
                url:"http://localhost:3000/login",
                data:{
                    email:this.email,
                    password:this.password,
                }
            })
            .then(response=>{
                localStorage.setItem("access_token",response.data.access_token)
                //emit "refreshpage"
                })
            .catch(err=>console.log(err))
        },
        onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                method:"POST",
                url:"http://localhost:3000/Glogin",
                headers:{
                    'google_token':id_token
                }
            })
            .then(response=>{
                localStorage.setItem("access_token",response.data.access_token)
                //emit "refreshpage"
                })
            .catch(err=>console.log(err))
        },
        registerPage() {
            //move to register page here
            //emit refresh page
        },
        signOut() {
            localStorage.removeItem("access_token")
            const auth2 = gapi.auth2.getAuthInstance();
            auth2
                .signOut()
        }
    }
}
</script>

<style>

</style>