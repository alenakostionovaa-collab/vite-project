<template>
  <div class="todo">
  <h1>Todo App</h1>
  <div class="wrapper">
  <input v-model="newTodo"
  placeholder="Запиши задачу"
  @keyup.enter="addTodo"/>

  <button class="button" @click="addTodo">отправить</button>
  </div>

  <ul>

    <li   v-for="(todo, index ) in todos" :key="todo.id">
      <input :style="{'accent-color': 'cadetblue'}" id="checkbox" type="checkbox" v-model="todo.completed"/>
      <span :style="{textDecoration:todo.completed ? 'line-through': 'none'}">
       {{ todo.text }}

</span>

<button @click="removeTodo(index)">x</button>

<!--<div :style="{ width: '100%', height: '2px', backgroundColor: 'gray' }"></div>-->
    </li>

  </ul>

  </div>


</template>

<script setup>

import {ref,watch} from 'vue'
const newTodo = ref ('')
const todos = ref ([])
function addTodo(){
if( newTodo.value.trim())
todos.value.push({
  id:Date.now(),
  text:newTodo.value,
  completed:false
})
newTodo.value=''//очистили
}

function removeTodo(index){
todos.value.splice(index,1)
}
const saved = localStorage.getItem('todos')
if (saved){
  todos.value=JSON.parse(saved)
}
watch(todos,(newTodos)=>{
  localStorage.setItem('todos',JSON.stringify(newTodos))
},{deep:true})


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
.checkbox{
color: cadetblue;
}
li{
display: flex;
justify-content: center;
box-sizing: border-box;
gap: 5px;

}
.todo-item {
  display: flex;
  flex-direction: column; /* чтобы контент и линия были сверху/снизу */
  width: 100%;
}
</style>