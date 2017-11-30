<template>
  <b-list-group>
    <b-list-group-item class="task" v-for="task in tasks" :key="task.title">
      <todo-list-item :task="task"></todo-list-item>
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
  import TodoListItem from './TodoListItem'
  export default {
    name: 'TodoList',
    props: ['tasks'],
    components: {
      TodoListItem
    }
  }
</script>
