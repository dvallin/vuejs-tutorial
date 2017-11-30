<template>
  <div class="todo-list-item">
    <label>{{task.title}}</label>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TodoListItem',
    props: ['task']
  }
</script>
