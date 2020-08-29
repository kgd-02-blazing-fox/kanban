<template>
    <div>
        <!-- Login -->
        <div class="login" id="login">
            <div class="kiri" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height:450px ; width: 400px; background-color: rgb(240, 240, 240); border-radius:10px">
                <h3 class="judul-form">Member Login</h3>
                <form class="text-center" v-on:submit.prevent="setToken">
                    <div class="form-group">
                      
                      <input v-model="email" type="email" class="input-form" id="email"  placeholder="Email Address" autocomplete="off">
                    </div>
                    <div class="form-group">
                      
                      <input v-model="password" type="password" class="input-form" id="password" placeholder="Password">
                    </div>

                    <p class="button-forget-pass"><i class="fa fa-arrow-circle-right"></i>  Forget Password</p>
                    <br>

                    <button type="submit" class="button-form">Login</button>

                    <br> <br> OR <br>
                    <button @click="goToLogin" class="button-form" style="margin-top: 20px;">Go To Register</button>
                    
                  </form>

            </div>
            <div class="kanan" style=" height:300px ; width:500px; display: flex; flex-direction: column; align-items: center; padding-top: 40px; padding-left:20px; padding-right:20px ;background-image: url('/img/1.jpg'); background-size: cover;">
                <h3 class="judul-form">Selamat Datang</h3>
                <p class="paragraf">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita omnis et quo esse culpa aliquid? Provident voluptatum fugit optio mollitia ut, ipsam officiis soluta repellendus quas deleniti molestiae iure. Adipisci.</p>
                <br>
                <p class="paragraf">Anda mau login via google ?</p>
                <br><br>

                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import GoogleLogin from 'vue-google-login';



export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      params: {
        client_id: "688088739708-lc9507toc9ln91lrl8u6l1j1mgoabadp.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    
    goToLogin(){
      this.$emit("changePage", "register")
    },
    setToken(){
      axios({
        method: 'POST',
        url: 'https://kanabanichlas.herokuapp.com/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data})=>{
          localStorage.setItem('token', data.token)
          this.$emit("checkLogin")
          this.$emit('getTasks')
          this.$emit('getUsername', this.email)
        })
        .catch(console.log)

        
    },
    onSuccess(googleUser) {

        axios({
          method: 'POST',
          url: 'https://kanabanichlas.herokuapp.com/login/google',
          headers: {
            id_token: googleUser.getAuthResponse().id_token
          }

        }) 
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            this.$emit("checkLogin")
            this.$emit('getTasks')

          })
          .catch(console.log)
    },
    onFailure(error){
      console.log(error)
    }
  },
  components: {
    GoogleLogin
  }


}
</script>

<style>

</style>