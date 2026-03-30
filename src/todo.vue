<script setup>
import { todoStore } from './components/stores/todo';
import { ref, watch, computed } from 'vue';

const store = todoStore(); // подключаем store

const newTodo = ref('');

// Вычисляемое свойство: только невыполненные задачи
const uncompletedTodos = computed(() => {
  return store.todos.filter(todo => todo.completed===false);
});

function addTodo() {
  if (newTodo.value.trim()) {
    store.todos.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    });
  }
  newTodo.value = '';
}

// Удаляем задачу по id
function removeTodo(id) {
  const index = store.todos.findIndex(todo => todo.id === id);
  if (index !== -1) store.todos.splice(index, 1);
}

// Редактируем задачу по id
function editTodo(id) {
  const todo = store.todos.find(todo => todo.id === id);
  if (!todo) return;
  const newText = prompt('Измени задачу', todo.text);
  if (newText !== null && newText.trim() !== '') {
    todo.text = newText;
  }
}

// Загрузка из localStorage
function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    store.$patch({ todos: JSON.parse(saved) });
  }
}
loadTodos();

// при изменении todos
watch(store.todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });
</script>

<template>
  <div class="todo">
    <h1>Todo App</h1>
    <div class="wrapper">
      <input
        v-model="newTodo"
        placeholder="Запиши задачу"
        @keyup.enter="addTodo"
      />
      <button class="button" @click="addTodo">отправить</button>
    </div>

    <ul>
      <transition-group name="fade" tag="ul">
        <li v-for="todo in uncompletedTodos" :key="todo.id" class="todo-item">
          <input
            type="checkbox"
            v-model="todo.completed"
            :style="{ accentColor: 'cadetblue' }"
          />
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.text }}
          </span>
          <button class="btn-delete" @click="removeTodo(todo.id)">x</button>
          <button class="btn-delete" @click="editTodo(todo.id)">✎</button>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<style scoped>
* {
  background-color: darkseagreen;
  border-radius: 5px;
}
.wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.button {
  height: 30px;
  left: 30px;
  font-size: 15px;
  cursor: pointer;
}
input {
  height: 25px;
  font-size: 15px;
}
.checkbox {
  color: cadetblue;
}
li {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  gap: 5px;
  margin-top: 10px;
}
.todo-item {
  display: flex;
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.btn-delete {
  width: 30px;
}
</style>