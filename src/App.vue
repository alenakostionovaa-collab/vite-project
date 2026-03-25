<template>
  <div class="todo">
  <h1>Todo App</h1>
  <div class="wrapper">
  <input v-model="newTodo"
  placeholder="Запиши задачу"
  @keyup.enter="addTodo"/> <!--чтобы не переходя на кнопку  -->

  <button class="button" @click="addTodo">отправить</button>
  </div>
  <ul>
    <li v-for="(todo, index ) in todos" :key="index">
{{ todo }}
<button @click="removeTodo(index)">x</button>
    </li>
  </ul>
  </div>
</template>

<script setup>
import { remove } from '@vue/shared';
import {ref} from 'vue'
const newTodo = ref ('')
const todos = ref ([])
function addTodo(){
if( newTodo.value.trim())
todos.value.push(newTodo.value)
newTodo.value=''//очистили
}

function removeTodo(index){
todos.value.splice(index,1)
}
</script>
<style scoped>
*{
  background-color: darkseagreen;
  border-radius: 5px;


}
.wrapper {
  display: flex;
  justify-content: center;         /* располагает input и кнопку в ряд */
  gap: 10px;             /* расстояние между ними */
  margin-bottom: 20px;   /* отступ снизу от списка */
}

.button{
  height: 30px;
  left: 30px;
 font-size: 15px;
 cursor: pointer;
}
input{
  height: 25px;
 font-size: 15px;
}

</style>