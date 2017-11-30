<template>
  <div id="app">
    <header>
      <new-task-input></new-task-input>
    </header>
    <section>
      <todo-list :tasks="tasks"></todo-list>
    </section>
  </div>
</template>

<script lang="ts">
import TodoList from './components/TodoList'
import {Task} from "./domain/Task";
import {mapState} from "vuex";
import NewTaskInput from "./components/NewTaskInput.vue";

export default {
  name: 'app',
  components: {
    NewTaskInput,
    TodoList
  },
  computed: {
    ...mapState(['tasks'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
