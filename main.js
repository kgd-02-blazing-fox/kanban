new Vue({
  el: "#app",
  data: {
    msg: "HELLO VUE",
    name: "",
    organization: "",
    date: "date",
    position: "welcome",
    registerName: "",
    registerEmail: "",
    registerOrganization: "",
    registerPassword: "",
    loginEmail: "",
    loginPassword: "",
    alertMsg: "",
    isLogin: false,
    alertOn: false,
    organizationTasks: [],
    backlogTasks: [],
    productTasks: [
      {
        id: 2,
        user: "budi",
        content: "frameworking"
      }
    ],
    developmentTasks: [
      {
        id: 3,
        user: "randy",
        content: "building client page"
      }
    ],
    doneTasks: [
      {
        id: 1,
        user: "aris",
        content: "presentation"
      }
    ],
  },
  methods: {
    fetchOrganizationTask() {
      axios({
        method: "GET",
        url: "http://localhost:3000/tasks",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log("PANGGIL");
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(_ => {
          console.log("");
        })
    },
    fetchBacklog() {
      this.backlogTasks = [
        {
          id: 1,
          user: "aris",
          content: "new app research"
        },
        {
          id: 1,
          user: "aris",
          content: "market research"
        },
        {
          id: 1,
          user: "aris",
          content: "vue research"
        },
        {
          id: 1,
          user: "aris",
          content: "independence day"
        }
      ]
    },
    fetchProduct() {

    },
    fetchDevelopment() {

    },
    fetchDone() {

    },
    deleteTask(id) {
      const confirmation = confirm("are you sure?")
      if (confirmation) {
        console.log(confirmation);
      } else {
        console.log(confirmation);
      }
    },
    getTask(id) {
      console.log(id);
    },
    showLogin() {
      this.position = "login"
    },
    showRegister() {
      this.position = "register"
    },
    showWelcome() {
      this.position = "welcome"
    },
    register() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          name: this.registerName,
          email: this.registerEmail,
          organization: this.registerOrganization,
          password: this.registerPassword,
        }
      })
        .then(response => {
          this.alertOn = true
          this.alertMsg = "REGISTER SUCCESS!"
          setTimeout(_ => {
            this.alertOn = false
            this.alertMsg = ""
          }, 3000)
          this.showLogin()
        })
        .catch(err => {
          this.alertOn = true
          this.alertMsg = "REGISTER FAILED, EMAIL ALREADY REGISTERED"
          setTimeout(_ => {
            this.alertOn = false
            this.alertMsg = ""
          }, 3000)
          this.showRegister()
        })
        .finally(_ => {
          this.registerName = ""
          this.registerEmail = ""
          this.registerPassword = ""
        })
    },
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword,
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.fetchOrganizationTask()
          this.name = response.data.name
          this.organization = response.data.organization
          this.isLogin = true
          this.alertOn = true
          this.alertMsg = `Welcome to KANBAN! ${response.data.name}`
          setTimeout(_ => {
            this.alertOn = false
            this.alertMsg = ""
          }, 3000)
          console.log('WELCOME ', response.data.name, response.data.organization);
        })
        .catch(err => {
          console.log(err);
          this.alertOn = true
          this.alertMsg = "EMAIL/PASSWORD INVALID"
          setTimeout(_ => {
            this.alertOn = false
            this.alertMsg = ""
          }, 3000)
        })
        .finally(_ => {
          this.loginEmail = ""
          this.loginPassword = ""
        })
    },
    logout() {
      this.alertOn = true
      this.alertMsg = "LOGGED OUT!"
      setTimeout(_ => {
        this.alertOn = false
        this.alertMsg = ""
      }, 3000)
      localStorage.removeItem('access_token')
      this.name = ""
      this.organization = ""
      this.isLogin = false
      this.showWelcome()
    }
  },
  created() {
    console.log('CREATED');
    this.fetchBacklog()
    if (localStorage.getItem('access_token')) {
      console.log('USER LOGGED IN');
      this.isLogin = true
    } else {
      console.log('LOGGED OUT');
      this.isLogin = false
    }
  },
  computed: {
    getDate() {
      let day;
      switch (new Date().getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      let calender = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
      let today = day + ", " + calender
      return today
    },
    getTime() {
      let d = new Date()
      let s = d.getSeconds()
      let m = d.getMinutes()
      let h = d.getHours()
      let time = h + ":" + m + ":" + s
      return time
    },

  }
})