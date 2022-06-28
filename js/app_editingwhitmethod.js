Vue.config.devtools=true;
Vue.component('tasks',{    
    template: `
        <section class="todoapp">
            <header class="header">
                <h1>Tareas</h1>
                <input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo" placeholder="Qué deseas hacer?">
            </header>
            <section>                        
                <ul class="todo-list">
                    <li class="todo" is="task" v-for="task in tasks"  :task="task"></li>                    
                </ul>
            </section>
            <footer class="footer" v-show="tasks.length">
                <span class="todo-count">Completas: {{ completed }} | Incompletas: {{ incompleted }}</span>            
            </footer>
        </section>
    `,
    data: function(){
        return {
            newTask:"",
            tasks:[
                {"title":"Aprender PHP", completed:true},
                {"title":"Aprender Laravel", completed:false},
                {"title":"Aprender VueJs", completed:false  }
            ]            
        }
    },
    methods:{
        add: function(){
            if(this.newTask.length <= 1) return alert('La taera no puede estar vacía');
            this.tasks.push({
                title: this.newTask,
                completed: false
            });
            this.newTask = "";
        }       
    },
    computed:{      
        completed:function(){
            return this.tasks.filter(function(task){
                return task.completed;
            }).length;
        },
        incompleted:function(){
            return this.tasks.filter(function(task){
                return !task.completed;
            }).length;
        }      
    }   
    
});
//si coloca los cambios
Vue.component('task',{
    props:['task'],
    template:`<li :class="classes">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="task.completed" />
            <input v-show="editing" v-model="task.title" @keyup.enter="doneEdit()">
            <label v-text="task.title" @dblclick="edit()" v-show= "!editing" ></label>
            <button class="destroy" @click="remove()"></button>
        </div>        
        
    </li>`,   
    data: function(){
        return {
            editing: false
        }
    },
    methods:{
        edit:function(){
            this.editing = true;
        },
        doneEdit:function(){
            this.editing = false;
        },
        remove: function(){
            var tasks = this.$parent.tasks;
            tasks.splice(tasks.indexOf(this.task), 1);
        }
    },
    computed:{
        classes: function(){
            return {completed: this.task.completed}
        },
    }    
});
var app = new Vue({el:'#app'});