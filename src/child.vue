<script setup>
import { todoStore } from './components/stores/todo';
import { computed, watch } from 'vue';

const store = todoStore(); // тот же самый store

const radTodo = computed(() => {
  return store.todos.filter(todo => todo.completed);
});

watch(store.todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });
</script>

<template>
  <div>
    <h2>Список задач</h2>
    <ul>
      <li v-for="todo in radTodo" :key="todo.id">
        {{ todo.text }}
        <button class="btn-sand" @click="todo.completed = false">!</button>
      </li>
    </ul>
  </div>
</template>
