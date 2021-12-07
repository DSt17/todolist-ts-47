import React, {ChangeEvent} from "react";
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTodolistTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export function Todolist(props: todolistProsType) {
    const onAddNewTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const filteredAll = () => props.changeFilter("all", props.id)
    const filteredActive = () => props.changeFilter("active", props.id)
    const filteredCompleted = () => props.changeFilter("completed", props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div className={"borderTodolistBlock"}>
            <Typography align={"center"}
                        variant={'h6'}
                        style={{fontWeight: "bold"}}>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={onAddNewTask}/>
            <List>
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
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return <ListItem
                            disableGutters
                            divider
                            style={{
                                padding: "0px",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                            className={t.isDone ? "opacity" : ""} key={t.id}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={OnChangeCheckboxStatus}
                            />
                            <EditableSpan title={t.title} setNewTitle={changeTile}/>
                            <IconButton onClick={onClickRemoveTask}>
                                <Delete fontSize={'small'}/>
                            </IconButton>
                        </ListItem>
                    })
                }
            </List>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={filteredAll}>All</Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={filteredActive}>Active</Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={filteredCompleted}>Completed
                </Button>

            </div>
        </div>

    )
}