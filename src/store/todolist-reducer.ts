import {filterValuesType, TodoListType} from "../App";
import {v1} from "uuid";



type removeTodoListAT = {
    type:"REMOVE-TODOLIST"
    id: string
}
type addTodoListAT = {
    type: "ADD-TODOLIST"
    title:string
}
export type changeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export  type changeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: filterValuesType
}

export type ActionType = removeTodoListAT | addTodoListAT | changeTodoListTitleAT |changeTodoListFilterAT

export const todolistReducer =
    (todoLists:Array<TodoListType>,action:ActionType):Array<TodoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const todolistId3 = v1()
            const newTodoList:TodoListType = {id: todolistId3, title: action.title, filter: "all"}
            return [...todoLists,newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl,title:action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        default:
            return todoLists

    }
}

export const RemoveTodoListAC = (id: string):removeTodoListAT => {
return {
    type:"REMOVE-TODOLIST",
    id: id
}
}

export const AddTodoListAC = ( title:string):addTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title:title
    }
}

export const ChangeTodoListTitleAC = ( id: string, title:string):changeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: id,
        title: title
    }
}

export const ChangeTodoListFilterAC = ( id: string, filter: filterValuesType):changeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}