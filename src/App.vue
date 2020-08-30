<template>
    <LoginPage 
        v-if="currentPage==='LoginPage'" 
        @movePage="$_App_moveCurrentPage"
    ></LoginPage>

    <RegisterPage 
        v-else-if="currentPage==='RegisterPage'"
        @movePage="$_App_moveCurrentPage"
    ></RegisterPage>

    <MainPage 
        v-else-if="currentPage==='MainPage'"
        @movePage="$_App_moveCurrentPage"
    ></MainPage>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import MainPage from "./components/MainPage.vue";
import axios from "axios"
export default {
    name:"App",
    data() {
        return {
            currentPage:"",
            task:[]
        }
    },
    methods:{
        $_App_moveCurrentPage(page) {
            this.currentPage = page
        },
        $_App_setHomePage() {
            if (localStorage.getItem("access_token")) {
                this.currentPage = "MainPage"
            } else {
                this.currentPage = "LoginPage"
            }
        }
    },
    created() {
        this.$_App_setHomePage()
    },
    components:{
        LoginPage,
        RegisterPage,
        MainPage,
        // Kanban
    }
}
</script>

<style scoped>

</style>