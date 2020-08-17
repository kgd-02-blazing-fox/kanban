<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#" @click.stop.prevent="redirect">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#" v-if="currentRoute === 'dashboard'" @click.stop.prevent="changeRoute('addForm')">Add Task</a>
                </li>
            </ul>
            <div class="navbar-nav ml-auto">
                <a href="#" class="nav-item nav-link" v-if="currentRoute !== 'dashboard' && currentRoute !== 'addForm'" @click.stop.prevent="changeRoute('login')">Login</a>
                <a href="#" class="nav-item nav-link" v-if="currentRoute !== 'dashboard' && currentRoute !== 'addForm'" @click.stop.prevent="changeRoute('register')">Register</a>
                <a href="#" class="nav-item nav-link" v-if="currentRoute === 'dashboard' || currentRoute === 'addForm'" @click.stop.prevent="changeRoute('logout')">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: {
        currentRoute: String
    },
    methods: {
        changeRoute(message) {
            if(message === 'logout') {
                localStorage.removeItem('access_token');
                this.$emit("changePage", 'login');
            } else {
                this.$emit("changePage", message);
            }
        },
        redirect() {
            if(localStorage.getItem('access_token')) {
                this.$emit("changePage", 'dashboard');
            } else {
                this.$emit("changePage", 'login');
            }
        }
    }
}
</script>

<style>
</style>