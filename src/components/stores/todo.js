import { defineStore } from "pinia";//создание глобального хранилища
import {ref} from 'vue';


export const todoStore= defineStore('todoStore', ()=> {
    const todos = ref([]);

    const addTodo = (text) => {
        todos.value.push({
        id:Date.now(),
        text,
        completed:false
        });
    }

    return {todos, addTodo}
}
)


