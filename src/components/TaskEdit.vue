<template>
  <div>
    <div>
      <div class="container d-flex justify-content-center mt-5">
        <div class="container-fluid">
          <div class="col-sm d-flex flex-column">
            <h3 class="formTitle d-flex justify-content-center">edit task</h3>
          </div>
          <div class="register container d-flex justify-content-center">
            <div class="col-lg">
              <div>
                <form class="form-group" @submit.prevent="newTask">
                  <br />
                  <div >
                    <label for="newContent">edit task</label>
                    <input class="form-control" type="text" v-model="newContent" required />
                    <br />
                  </div>
                  <div>
                    <label for="newStatus">task status</label>
                    <select class="form-control" v-model="newStatus" required>
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
  </div>
</template>

<script>
export default {
  name: "TaskEdit",
  data() {
    return {
      newContent: "",
      newStatus: "",
    };
  },
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
          const payload = {
            alertMsg: "Task Edited",
          };
          this.$emit("succesEditTask", payload);
        })
        .catch((err) => {
          const payload = {
            alertMsg: "Failed to Edit Task",
          };
          this.$emit("failedEditTask", payload);
        })
        .finally((_) => {
          this.newContent = "";
          this.newStatus = "";
        });
    },
    cancelAdd() {
      this.$emit("cancelAdd");
    },
  },
  props: ["spesificTaskData"],
  watch:{
    spesificTaskData(){
      this.newContent = this.spesificTaskData.content
    }
  }
};
</script>

<style>
</style>