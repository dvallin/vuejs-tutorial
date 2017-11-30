<template>
  <div id="app">
    <todo-list :tasks="tasks"></todo-list>
  </div>
</template>

<script lang="ts">
import TodoList from './components/TodoList'
import {Task} from "./domain/Task";

export default {
  name: 'app',
  components: {
    TodoList
  },
  data() {
    return {
      tasks: [new Task("new task"), new Task("old task")]
    }
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
