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

     <transition-group name="fade" tag="ul">
    <li v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <input type="checkbox" v-model="todo.completed" :style="{ accentColor: 'cadetblue' }" />
      <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
        {{ todo.text }}
      </span>
      <button  class="delet" @click="removeTodo(index)">x</button>
     <button class="delet" @click="editTodo(index)">✎</button>
    </li>
  </transition-group>
</ul>
<!--<div :style="{ width: '100%', height: '2px', backgroundColor: 'gray' }"></div>-->


  </div>


</template>

<script setup>
//import child from './child.vue'
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
function editTodo(index)
{ const todo = todos.value[index]
  const newText = prompt('Измени задачу', todo.text)
 if (newText !== null && newText.trim() !== '')
   { todo.text = newText } }

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
.delet{
  width: 30px;
}
</style>