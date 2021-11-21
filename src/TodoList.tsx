import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type todolistProsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: filterValuesType, todoListID: string) => void
    addTask: (TaskTitle: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: filterValuesType
    id: string
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle : (title: string,todoListID: string ) => void
    changeTaskTitle : (taskID: string, title: string, todoListID: string) =>void
}

export function Todolist(props: todolistProsType) {
    const onAddNewTask = (title:string) => {
            props.addTask(title, props.id)
    }
    const filteredAll = () => props.changeFilter("all", props.id)
    const filteredActive = () => props.changeFilter("active", props.id)
    const filteredCompleted = () => props.changeFilter("completed", props.id)
    const changeTodolisTitle = (title:string) => {
        props.changeTodolistTitle(title,props.id)
    }

    return (
        <div className={"borderTodolistBlock"}>
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodolisTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={onAddNewTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        //ЭТИ ФУНУЦИИ СОЗДАЕМ ВНУТРИ МАПА Т.К. ОНИ ВЕШАЮТЬСЯ НА КАЖДЫЙ ЭЛЕМЕНТ ТАСКИ
                        const onClickRemoveTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const OnChangeCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, (e.currentTarget.checked), props.id)
                        }
                        const changeTile = (title: string) => {
                           props.changeTaskTitle(t.id,title,props.id )
                        }
                        return <li className={t.isDone ? "opacity" : ""} key={t.id}>
                            <input type={"checkbox"}
                                   onChange={OnChangeCheckboxStatus}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title} setNewTitle={changeTile}/>
                            <button onClick={onClickRemoveTask}>X</button>
                        </li>
                    })
                }
            </ul>

            <div className={"filtered-button-position"}>
                <button className={props.filter === "all" ? "filtered-button" : ""} onClick={filteredAll}>All</button>
                <button className={props.filter === "active" ? "filtered-button" : ""} onClick={filteredActive}>Active
                </button>
                <button className={props.filter === "completed" ? "filtered-button" : ""}
                        onClick={filteredCompleted}>Completed
                </button>
            </div>
        </div>

    )
}