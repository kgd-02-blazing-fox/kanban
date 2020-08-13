<template>
    <div>
        <section class="inner-section">
            <Login v-if="currentPage === 'login'" @changePage="changePage"></Login>
            <Register v-if="currentPage === 'register'" @changePage="changePage"></Register>
            <AddTaskForm v-if="currentPage === 'addForm'" @getAllTasks="getAllTasks" @changePage="changePage"></AddTaskForm>
        </section>
    </div>
</template>

<script>
import Login from './components/Login';
import Register from './components/Register';
import AddTaskForm from './components/AddTask';
import axios from 'axios';
export default {
    name: 'App',
    data() {
        return {
            currentPage: 'login',
            categoryTitles: ['Backlog', 'To-do', 'In Progress', 'Done'],
            tasks: []
        };
    },
    components: {
        Login,
        Register,
        AddTask
    },
    methods: {
        getAllTasks() {
            axios.get('http://localhost:3000/todos', {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({ data }) => {
                    this.tasks = data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changePage(message) {
            this.currentPage = message;
        }
    },
    created() {
        this.getAllTasks();
    }
};
</script>

<style scoped>
.ui {
  height: calc(100vh - 49.6px);
  display: flex;
  justify-content: center;
  background-color: #0079bf;
  color: #eee;
}
.categories {
  display: flex;
  overflow-x: auto;
  justify-content: space-around;
  align-items: center;
}
.categories > * {
  flex: 0 0 auto;
  margin: 10px;
  /* margin-left: 10px;
  margin-top: 10px; */
}
.categories::after {
  content: "";
  flex: 0 0 10px;
}
</style>