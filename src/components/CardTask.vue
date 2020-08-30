<template>
    <div>
        <div class="task" v-if="!showform">
            <p class="task-title" @click="showformupdate" >{{task.name}}</p>

            <div style="display:flex; flex-direction: row;">
                <p class="button-next" v-if="task.category != 'backlog'" @click="toLeft"><i class="fa fa-arrow-circle-left fa-1x" style="margin-right:10px;"></i></p>
                
                <p class="button-next" v-if="task.category != 'done'" @click="toRight"><i class="fa fa-arrow-circle-right fa-1x"></i></p>
            </div>
        </div>

        <div v-if="showform">
            <div class="task" >
                <input style="padding:15px; border:0; cursor:text;" type="text" v-model="task.name" class="task-title"  placeholder="Edit name here!">
            </div>

            <div class="row text-center mb-4">
                <div class="col-sm-6">
                    <p @click="updateform" class="button-add">Update</p>
                </div>
                <div class="col-sm-6">
                    <p @click="deleteformupdate" class="button-add"><i class="fa fa-trash fa-1x" style="color: white; margin-right: 10px;"></i>Delete</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "CardTask",
    data(){
        return {
            showform: false,
            dataid: this.task.id
        }
    },
    props: {
        task: Object
    },
    methods: {
        showformupdate(){
            this.showform = true
        },
        deleteformupdate(){
            axios({
                method: 'DELETE',
                url: `https://kanabanichlas.herokuapp.com/tasks/${this.dataid}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({data}) => {
                    this.$emit("getTasks")
                })
                .catch(console.log)
            

            
            this.showform = false
        },
        updateform(){
            axios({
                method: 'PUT',
                url: `https://kanabanichlas.herokuapp.com/tasks/${this.dataid}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: this.task.name
                }
            })
                .then(({data}) => {
                    this.$emit("getTasks")
                })
                .catch(console.log)
            
            this.showform = false
        },
        toRight(){
            let newCategory = ''
            switch (this.task.category){
                case 'backlog' : 
                    newCategory = 'todo'
                    break;
                case 'todo' : 
                    newCategory = 'doing'
                    break;
                case 'doing':
                    newCategory = 'done'
                    break
            }

            axios({
                method: 'PUT',
                url: `https://kanabanichlas.herokuapp.com/tasks/${this.dataid}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    category: newCategory
                }

            })
                .then(({data}) => {
                    console.log(data)
                    this.$emit('getTasks')
                })
                .catch(console.log)


        },
        toLeft(){
            let newCategory = ''
            switch (this.task.category){
                case 'done' : 
                    newCategory = 'doing'
                    break;
                case 'doing':
                    newCategory = 'todo'
                    break
                case 'todo' : 
                    newCategory = 'backlog'
                    break;
                
            }

            axios({
                method: 'PUT',
                url: `https://kanabanichlas.herokuapp.com/tasks/${this.dataid}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    category: newCategory
                }

            })
                .then(({data}) => {
                    this.$emit('getTasks')
                })
                .catch(console.log)

        }
    }

}
</script>

<style>

</style>