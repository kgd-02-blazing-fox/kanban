<template>
  <div class="d-flex justify-content-center">
    <div class="infos container row">
      <div class="col row d-flex align-items-center">
        <div class="col-1 d-flex justify-content-end">
          <i class="fas fa-user"></i>
        </div>
        <div class="col">
          <b>{{UserName}}</b>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="fas fa-bezier-curve"></i>
        </div>
        <div class="col">
          <b>{{UserOrganization}}</b>
        </div>
      </div>
      <div class="col row d-flex align-items-center">
        <div class="col-1 d-flex justify-content-end">
          <i class="fas fa-clock"></i>
        </div>
        <div class="col">
          <b>{{getTime}}</b>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <i class="fas fa-calendar-day"></i>
        </div>
        <div class="col">
          <b>{{getDate}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infos",
  data() {
    return {
      UserName: localStorage.getItem("name"),
      UserOrganization: localStorage.getItem("organization"),
    };
  },
  methods: {},
  props:[],
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
      let calender = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
      let today = day + ", " + calender;
      return today;
    },
    getTime() {
      let d = new Date();
      let s = d.getSeconds();
      let m = d.getMinutes();
      let h = d.getHours();
      let time = h + ":" + m + ":" + s;
      return time;
    },
  },
};
</script>

<style>
</style>