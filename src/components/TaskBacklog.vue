<template>
  <div class="backlog container col-sm-5 col-md-5 col-lg-4 col-xl">
    <div class="d-flex justify-content-center">
      <div>BACKLOG</div>
    </div>
    <div>
      <div class="bodyContent" id="backlogContent">
        <div class="content container-lg-12" v-for=" task in filteredTask" :key="task.id">
          <div class="user container-fluid d-flex justify-content-between">
            {{task.user}}
            <div>
              <a href="#" @click="getTask(task.id)">
                <i class="fas fa-pen-square"></i>
              </a>
              <a href="#" @click="deleteTask(task.id)">
                <i class="fas fa-trash-alt"></i>
              </a>
            </div>
          </div>
          <div class="maincontent container-fluid">{{task.content}}</div>
          <div class="container-fluid d-flex justify-content-end">
            <a href="#">
              <i class="fas fa-arrow-alt-circle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskBacklog",
  props: ["unfilteredTask"],
  data() {
    return {
      taskBacklog: this.unfilteredTask,
    };
  },
  methods:{
    getTask(id){

    },
    deleteTask(id){

    }
  },
  computed: {
    filteredTask() {
      return this.taskBacklog.filter(taskBacklog => taskBacklog.status.includes("backlog"));
    },
  },
};
</script>

<style>
</style>