<template>
    <div class="main-container">
        <div class="add-form">
            <div class="form-content">
                <div class="form-header">
                    <h4 class="form-title">Add Task</h4>
                </div>
                <div class="form-body">
                    <form action="" @submit.prevent="addTask" id="add-form">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="name" class="form-control" v-model="title" placeholder="Title">
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-block btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddTaskForm',
    data() {
        return {
            title: ""
        }
    },
    methods: {
        addTask() {
            axios.post('http://localhost:3000/', {
                title: this.title
            }, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({task}) => {
                    this.$emit("getAllTasks");
                })
                .catch(err => {
                    console.log(err);
                })
            this.$emit("changePage", 'dashboard');
        }
    }
}
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 10px - 17px);
}
.add-form {
	width: 350px;
}
.add-form .form-content {
	padding: 20px;
	border-radius: 5px;
	border: none;
}
.add-form .form-header {
	border-bottom: none;
	position: relative;
	justify-content: center;
}
.add-form h4 {
	color: #636363;
	text-align: center;
	font-size: 26px;
	margin-top: 0;
}
.add-form .form-content {
	color: #999;
	border-radius: 1px;
	margin-bottom: 15px;
	background: #fff;
	border: 1px solid #f3f3f3;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	padding: 25px;
}
.add-form .form-group {
	margin-bottom: 20px;
}
.add-form .form-control {
	min-height: 38px;
	padding-left: 5px;
	box-shadow: none !important;
	border-width: 0 0 1px 0;
	border-radius: 0;
}
.add-form .form-control:focus {
	border-color: #ccc;
}
.add-form .btn, .add-form .btn:active {        
	font-size: 16px;
	font-weight: bold;
	background: #19aa8d !important;
	border-radius: 3px;
	border: none;
	min-width: 140px;
}
.add-form .btn:hover, .add-form .btn:focus {
	background: #179b81 !important;
}
</style>