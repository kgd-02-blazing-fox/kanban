<template>
  <div>
    <div class="container d-flex justify-content-center mt-5">
      <div class="container-fluid">
        <div class="col-sm d-flex flex-column">
          <h3 class="formTitle d-flex justify-content-center">register</h3>
        </div>
        <div class="register container d-flex justify-content-center">
          <div class="col-lg">
            <div>
              <form class="form-group" @submit.prevent="register">
                <br />
                <div>
                  <label for="registerName">name</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="your name?"
                    v-model="registerName"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label for="registerEmail">email</label>
                  <input
                    class="form-control"
                    type="email"
                    placeholder="your email?"
                    v-model="registerEmail"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label for="registerOrganization">your organization</label>
                  <select class="form-control" v-model="registerOrganization">
                    <option value disabled selected>your oranization?</option>
                    <option value="Hacktiv8 Student">Hacktiv8 Student</option>
                    <option value="Hacktiv8 Instructor">Hacktiv8 Instructor</option>
                    <option value="Hacktiv8 Developer">Hacktiv8 Developer</option>
                  </select>
                  <br />
                </div>
                <div>
                  <label for="registerPassword">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    placeholder="your super secret password"
                    v-model="registerPassword"
                    required
                  />
                  <br />
                </div>
                <div>
                  <button type="submit" class="btn btn-warning">Submit</button>
                  <button @click="backWelcome" class="btn btn-warning">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanAPI from "../config/KanbanAPI";

export default {
  name: "RegisterForm",
  data() {
    return {
      registerName: "",
      registerEmail: "",
      registerOrganization: "",
      registerPassword: "",
    };
  },
  methods: {
    register(){
      KanbanAPI({
        method: 'post',
        url: 'register',
        data: {
          name: this.registerName,
          email: this.registerEmail,
          organization: this.registerOrganization,
          password: this.registerPassword,
        }
      })
        .then(response => {
          const payload = {
            data: response.data,
            alertOn: true,
            alertMsg: "REGISTER SUCCESS!"
          }
          this.$emit("successRegister", payload)
        })
        .catch(err => {
          const payload = {
            alertOn: true,
            alertMsg: "EMAIL ALREADY REGISTERED"
          }
          this.$emit("failRegister", payload)
        })
        .finally(_ => {
          this.registerName = ""
          this.registerEmail = ""
          this.registerPassword = ""
        })
    },
    backWelcome(){
      this.$emit('backWelcome')
    }
  },
  created() {
    console.log("REGISTER FORM MOUNTED");
  },
};
</script>

<style>
</style>