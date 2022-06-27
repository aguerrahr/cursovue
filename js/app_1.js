//Todo esto es hasta curso_06.html
Vue.config.devtools=true;
Vue.component('user',{
    props:['name','lastName'],    
    data: function(){
        return {
            app:{
                name: 'Aprendible'
            }
        }
    },
    template: `<div>
                    <h1>{{ app.name }}</h1>
                    <h2>{{ name }} {{ lastName }}</h2>
                    <input v-model="name"></input>
                    <input v-model="app.name"></input>
                    
                </div>`
});
var app = new Vue({
    el:'#app',
    data:{
        tasks:[
            {"title":"Aprender PHP", completed:true},
            {"title":"Aprender Laravel", completed:false},
            {"title":"Aprender VueJs", completed:true}
        ],
        newTask:""
    },
    methods:{
        addTask: function(){
            if(this.newTask.length <= 1) return alert('La taera no puede estar vacía');
            this.tasks.push({
                title: this.newTask,
                completed: false
            });
            this.newTask = "";
        },
        taskClasses: function(task){
            console.log('css changed');
            return ['glyphicon',task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
        },
        comlpleteTask:function(task){
            task.completed = ! task.completed
        }
    },
    computed:{
        reverseTask:function(){
            return this.newTask.split('').reverse().join('');
        },
        completedTasks:function(){
            return this.tasks.filter(function(task){
                return task.completed;
            }).length;
        },
        incompletedTasks:function(){
            return this.tasks.filter(function(task){
                return !task.completed;
            }).length;
        }
    }
})