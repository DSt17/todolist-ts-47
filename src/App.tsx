import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "./uuid"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type  FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //BLL:
    console.log(v1())
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS, REACT', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')



    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        console.log(tasks);
    }
    const addTask = (title: string) => {
         const newTask: TaskType = {
             id: v1(),
             title: title,
             isDone: false
         }
         setTasks([newTask, ...tasks])
    }



    // UI:
    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }



    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
