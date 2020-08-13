<template>
  <div>
    <div class="container d-flex justify-content-center mt-5">
      <div class="container-fluid">
        <div class="col-sm d-flex flex-column">
          <h3 class="formTitle d-flex justify-content-center">new task</h3>
        </div>
        <div class="register container d-flex justify-content-center">
          <div class="col-lg">
            <div>
              <form class="form-group" @submit.prevent="newTask">
                <br />
                <div>
                  <label for="newContent">new task</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="what is the task?"
                    v-model="newContent"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label for="newStatus">task status</label>
                  <select class="form-control" v-model="newStatus">
                    <option value disabled selected>the task status</option>
                    <option value="backlog">Backlog</option>
                    <option value="product">Product</option>
                    <option value="development">Development</option>
                    <option value="done">Done</option>
                  </select>
                  <br />
                </div>
                <div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button @click="cancelAdd" class="btn btn-primary">back</button>
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
  name: "TaskNew",
  data() {
    return {
      newContent: "",
      newStatus: "",
    };
  },
  props: [],
  methods: {
    newTask() {
      KanbanAPI({
        method: "POST",
        url: "tasks",
        data: {
          content: this.newContent,
          status: this.newStatus,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          console.log(response.data);
          const payload = {
            alertMsg: "Task Added",
          };
          this.$emit("succesAddTask", payload)
        })
        .catch((err) => {
          const payload = {
            alertMsg: "Failed to Add Task",
          };
          this.$emit("failedAddTask", payload)
        })
        .finally(_=>{
          this.newContent = ""
          this.newStatus = ""
        })
    },
    cancelAdd(){
      this.$emit("cancelAdd")
    }
  },
};
</script>

<style>
</style>