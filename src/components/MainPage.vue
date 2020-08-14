<template>
    <div>
        <!-- kanban-nav -->
        <div class="container-fluid px-0" id="kanban-nav">    
            <nav class="navbar navbar-expand-sm">
                <div class="container">
                    <span class="navbar-brand" style="pointer-events: none; font-size: 1.5em;" id="kanban-nav-title">
                        <img src="../assets/post-it-note-icon-9.jpg" width="30"> Kanban</span>
                    <div class="justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link disabled" id="nav-home">Hello {{userName}} @ {{userOrganization}}</a>
                        </li>
                        <li class="nav-item text-right">
                            <a class="nav-link" id="kanban-nav-logout" @click="$_MainPage_logout">Logout</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
        <!-- kanban-main -->
        <div class="container-fluid pt-4" id="kanban-main">
            <div class="row " style="min-height: 75vh;">
                <!--KANBAN CATEGORIES START/END HERE-->
                <KanbanCategories 
                    v-for="(category,index) in categories" 
                    :key="index" 
                    :category="category"
                    :categories="categories"
                    :tasks="tasks"
                    @refetchTasks="$_MainPage_fetchTask"
                >
                </KanbanCategories>
            </div>
        </div>

        <!-- kanban-footer -->
        <div class="container-fluid text-right" id="kanban-footer">
            <div class="container p-3">
                <p>@Hacktiv8 2020-P1 <br> Laurentius Edrick <br>
                    <span id="kanban-footer-attributions">
                        Attributions:
                        <a href="https://icon-library.net/icon/post-it-note-icon-9.html" target="_blank">Post It Note Icon</a> | 
                        <a href="https://thenounproject.com/ArtZ91/collection/handwritten/" target="_blank">Handwritten Icon</a>
                    </span>
                </p>
            </div>
        </div>
    </div>


</template>

<script>
import axios from "axios"
import KanbanCategories from "../components/KanbanCategories.vue"
import GoogleLogin from 'vue-google-login';
export default {
    name:"MainPage",
    data() {
        return {
            categories: ["backlog", "to-do", "reviewed", "done"],
            tasks:[],
            userName:"",
            userOrganization:""
        }
    },
    methods:{
        $_MainPage_fetchUser() {
            if (localStorage.getItem("access_token")) {
               axios({
                method:"GET",
                url:"https://kanban-laurentius-server.herokuapp.com/user",
                headers:{
                    "access_token":localStorage.getItem("access_token")
                    }
                })
                .then(response=>{
                    this.userName = response.data.name
                    this.userEmail = response.data.email
                    this.userOrganization = response.data.organization
                })
                .catch(err=>{
                    console.log(err)
                }) 
            }
        },
        $_MainPage_fetchTask() {
            if (localStorage.getItem("access_token")) {
               axios({
                method:"GET",
                url:"https://kanban-laurentius-server.herokuapp.com/tasks",
                headers:{
                    "access_token":localStorage.getItem("access_token")
                    }
                })
                .then(response=>{
                    this.tasks = response.data
                })
                .catch(err=>{
                    console.log(err)
                }) 
            }
        },
        $_MainPage_logout() {
            localStorage.removeItem("access_token")
            this.$emit("movePage","LoginPage")
            const auth2 = gapi.auth2.getAuthInstance();
            auth2
                .signOut()
        },
    },
    components:{
        KanbanCategories
    },
    created() {
        this.$_MainPage_fetchTask()
        this.$_MainPage_fetchUser()
    }
}
</script>

<style>

</style>