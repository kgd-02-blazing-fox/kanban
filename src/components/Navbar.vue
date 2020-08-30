<template>

    <div>
        
        <div class="navbar" >
            <div class="kiri-navbar">
                <p class="mykanban-title">MyKanban</p>
            </div>
            <div class="kanan-navbar">  

                <!-- <a href="" class="link">Home</a>
                <a href="" class="link">About</a>
                <a href="" class="link">Contact</a>
                <a href="" class="link">Dashboards</a>  <span style="color: rgba(107, 107, 105, 0.5);">|</span> -->
                <a href="" style="font-size:20px; text-transform:capitalize; font-weight:bold; color:#333; cursor:not-allowed">Halo {{ username }} !!!</a>  <span style="color: rgba(107, 107, 105, 0.5);">|</span>
                <a @click.prevent="removeToken" href="" class="logout">Logout</a>
            </div>
        </div>
    </div>
  
</template>

<script>
import GoogleLogin from 'vue-google-login';


export default {
    name: "Navbar",
    methods: {
        removeToken(){

            try{
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            } catch(err){
                console.log('Bukan Login with Google')
            }

            
            localStorage.removeItem('token')
            this.$emit("checkLogin")

        }
    },
    components: {
        GoogleLogin
    },
    props: {
        username: String
    }
}
</script>

<style>

</style>