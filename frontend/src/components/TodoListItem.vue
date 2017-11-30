<template>
  <div class="todo-list-item">
    <input type="checkbox" v-model="isComplete"/>
    <label>{{task.title}}</label>
  </div>
</template>

<script lang="ts">
  import {TaskState} from "../domain/Task";
  import {Actions} from "../store/actions";

  export default {
    name: 'TodoListItem',
    props: ['task'],

    data() {
      return { isComplete: this.task.state === TaskState.Done }
    },
    watch: {
      isComplete: 'handleCompleteClick'
    },
    methods: {
      handleCompleteClick() {
        this.$store.dispatch({
          type: Actions.SetTaskComplete,
          complete: this.isComplete,
          title: this.task.title
        });
      }
    }
  }
</script>
