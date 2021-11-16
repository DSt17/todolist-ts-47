import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

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
    addTask: (addedTitle: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: filterValuesType
    id: string
    removeTodoList: (todoListID: string) => void
}


export function Todolist(props: todolistProsType) {

    let [inputValue, setInputValue] = useState("")
    let [error, setError] = useState<boolean>(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.trim() !== "") {
                props.addTask(inputValue, props.id)
                setInputValue("")
            } else {
                setError(true)
                setInputValue("")

            }
        }
    }
    const onAddNewTask = () => {
        if (inputValue.trim() !== "") {
            props.addTask(inputValue, props.id)
            setInputValue("")
        } else {
            setError(true)
            setInputValue("")
        }

    }
    const filteredAll = () => props.changeFilter("all", props.id)
    const filteredActive = () => props.changeFilter("active", props.id)
    const filteredCompleted = () => props.changeFilter("completed", props.id)


    return (
        <div className={"borderTodolistBlock"}>
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={inputValue}
                    placeholder={"Enter your tasks..."}
                    onChange={onChangeHandler}
                    onKeyPress={onPressKeyHandler}
                />
                <button onClick={onAddNewTask}>+</button>
                {error ? <div className={"error-message"}>Title is required!</div> : null}
            </div>

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


                        return <li className={t.isDone ? "opacity" : ""} key={t.id}>
                            <input type={"checkbox"}
                                   onChange={OnChangeCheckboxStatus}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
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