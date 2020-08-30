<template>
    <div>
        <!-- Login -->
        <div id="login" v-if="isPage == 'login'">
            <Login v-on:checkLogin="checkLogin" v-on:getTasks="getTasks"  v-on:changePage="changePage" v-on:getUsername="getUsername"></Login>
        </div>

        <!-- Register -->
        <div id="register" v-if="isPage == 'register'" >
            <Register v-on:changePage="changePage"></Register>
        </div>

        <div v-if="isPage == 'dashboard'">
            <!-- Navbar -->
            <div  id="navbar">
                <Navbar v-on:checkLogin="checkLogin" v-bind:username="nameUser"></Navbar>
            </div>
            <!-- List Tasks -->
            <div class="list2">
                <div class="kotak-besar">
                    <ListTasks  v-on:getTasks="getTasks" v-for="category in categories" :key="category.id" v-bind:tasks="tasks" v-bind:category="category.name"></ListTasks>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import ListTasks from "./components/ListTasks";
import Navbar from "./components/Navbar";
import Home from "./components/Home";



export default {
    name: "App",
    data() {
        return {
            tasks: [],
            isPage: 'login',
            categories: [ 
                { id: 1, name:"backlog"}, 
                {id: 2, name:"todo"}, 
                {id: 3, name:"doing",},
                {id: 4, name:"done"}
            ],
            isLogin: false,
            nameUser: ''
            
        }
    },
    components: {
        
        Login,
        Register,
        ListTasks,
        Navbar,
        Home
    },
    methods:{
        getUsername(username){
            this.nameUser = username
        },
        checkLogin(){
            const token = localStorage.getItem('token')
            if(token){
                // this.isLogin = true
                this.changePage('dashboard')
                this.getTasks()
            } else {
                this.changePage('login')
            }
        },
        changePage(newPage){
            this.isPage = newPage;
        },
        getTasks(){
            axios({
                methods: 'GET',
                url: 'https://kanabanichlas.herokuapp.com/tasks/',
                headers: {
                    token : localStorage.getItem('token')
                }

            })
                .then(({data}) => {
                    this.tasks = data
                })
                .catch(console.log)

        }
    },
    created() {
        
        this.checkLogin()

    }
}
</script>

<style>

</style>