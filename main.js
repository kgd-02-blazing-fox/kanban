new Vue({
  el: "#app",
  data: {
    msg: "HELLO VUE",
    name: "ARIS",
    organization: "HACKTIV8",
    date: "date",
    position: "welcome",
    isLogin: false,
    backlogTasks: [
      {
        id: 1,
        user: "aris",
        content: "new app research"
      }
    ],
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
    deleteTask(id) {
      console.log(id);
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
  },
  created() {
    console.log('CREATED');
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
      let today = day + " " + calender
      return today
    }
  }
})