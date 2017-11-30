<template>
  <input class="new-todo"
         autofocus autocomplete="off"
         placeholder="What needs to be done?"
         v-model="taskTitle"
         @keyup.enter="addTask">
</template>

<script lang="ts">
  import {Actions} from "../store/actions";

  export default {
    name: 'NewTaskInput',
    data() {
      return { taskTitle: "" }
    },
    methods: {
      addTask() {
        const value = this.taskTitle && this.taskTitle.trim();
        this.$store.dispatch({
          type: Actions.AddTask,
          title: value
        })
      }
    }
  }
</script>
