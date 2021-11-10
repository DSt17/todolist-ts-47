import React, {ChangeEvent, KeyboardEvent,  useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const jsxTaskElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type='checkbox' checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>)
    })

    const addTask = () => {
        if(title){
            props.addTask(title)
            setTitle("")
        }
    }
    const setAll = () => props.changeFilter('all')
    const setActive = () => props.changeFilter('active')
    const setCompleted = () => props.changeFilter('completed')
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask()
        }}

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder='Enter your task...'
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {jsxTaskElements}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAll}>All</button>
                <button
                    className={activeBtnClass}
                    onClick={setActive}>Active</button>
                <button
                    className={completedBtnClass}
                    onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;