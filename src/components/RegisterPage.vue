<template>
    <div id="register" class="container-fluid mt-5">
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="border col-md-5" style="padding: 30px; border-radius: 40px;">
                        <h2 class="justify-content-center text-center">Register a new account</h2> <br>
                        <form id="form-register" @submit.prevent="$_RegisterPage_register">
                            <div class="form-group">
                                <label for="register-name">Full name</label>
                                <input type="text" class="form-control" id="register-name" placeholder="John Doe"
                                    v-model="name" required>
                            </div>
                            <div class="form-group">
                                <label for="register-email">Email address</label>
                                <input type="email" class="form-control" id="register-email"
                                    placeholder="Johndoe@mail.com" v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label for="register-password">Password</label>
                                <input type="password" class="form-control" id="register-password" v-model="password" required>
                            </div>
                            <div class="form-group">
                                <label for="register-organization">Organization</label>
                                <input type="organization" class="form-control" id="register-organization" v-model="organization">
                            </div>
                            <div style="text-align: center;">
                                <p id="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        <div class="col-md-12 mt-4 text-center">
                            <p class="text-secondary">Already have an account? <span
                                    class="text-primary" @click.prevent="$_RegisterPage_goToLoginPage">Login</span></p>
                        </div>
                    </div>
                </div>
            <div class="container-fluid" style="height: 195px;"> </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name:"RegisterPage",
    data() {
        return {
            name:"",
            email:"",
            password:"",
            organization:"Hacktiv8",
            errorMessage:""
        }
    },
    methods:{
        $_RegisterPage_register() {
            axios({
                method:"POST",
                url:"https://kanban-laurentius-server.herokuapp.com/register",
                data:{
                    name:this.name,
                    email:this.email,
                    password:this.password,
                    organization:this.organization
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
        $_RegisterPage_goToLoginPage() {
            this.$emit("movePage","LoginPage")
        }
    }
}
</script>

<style>

</style>