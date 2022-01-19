import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type filterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    //id таски для удал     //ключ массива()
    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    //тайтл новой задчи  //ключ массива()
    function addTask(TaskTitle: string, todoListID: string) {
        dispatch(addTaskAC(TaskTitle, todoListID))
    }

    //Функия для изменения isDone у таски ( //id таски для chenge  //БУЛЕВО ЧЕКБОКСА  //ключ массива)
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }

//Создаем фунуцию для изменения тайтла у таски
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, todoListID, title))
    }

    //Меняем настройки фильтра сущности тудулиста
    function changeFilter(filter: filterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }

    //Создаем функцию для изменения тайтла
    function changeTodolistTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
    }

//----Функции удаляющие и добовляющие сущности тудулистов-----------
    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }


//UI--------------------------------------------------------------------------------------------------------------------
    // СОЗДАЕМ ОТРИСОВКУ НАШИХ ТУДУЛИСТОВ, МАПАЕМ СУЩНОСТИ, ФИЛТРУЕМ ПО ФИЛЬТРУ, ДАННЫЕ ИЗ ОБЪЕКТА СУЩНОСТИ ПЕРЕДАЕМ В <Todolist ..../> И ПЕРЕДАЕМ НА ОТРИСТОВКУ НУЖНЫЙ МАССИВ

    const todoListComponents = todolists.map(tl => {
        //ФИЛЬТРУЕМ СПИСОК ТАСК( ЗАДАЧ) ДЛЯ ОТРИСОВКИ
        let taskForRenderTodoList: Array<TaskType> = tasks[tl.id]  // ПО УМОЛЧАНИЮ ДОЛЖЕН ПОПАСТЬ МАССИВ ТАСОК (в tasks) ИМЕННО ЭТОГО todolist-а...
        if (tl.filter === "active") {     //...У ЭТОГО tl МЫ ПРОВЕРИМ ЗНАЧ.ФИЛЬТ. И ЕСЛИ ОН "active"...
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== true)//... ТО МЫ МОЖЕМ ЕГО ОТФИЛЬТРОВАТЬ
        }
        if (tl.filter === "completed") {
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== false)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <Todolist
                        // key={tl.id} //ВЕШАЕТСЯ НА ВСЕ ЭЛЕМЕНТЫ СПИСКА. ЭТО ДЛЯ React         Берем из сущности тудулиста ВО ВРЕМЯ МАПА => ПЕРЕНЕСЛИ key внешнему элементу т.к. ретурнеттся теперь масси гридов а не тудулистов
                        id={tl.id} //  Берем из сущности тудулиста ДЛЯ ПОНИМАНИЯ С КАКОЙ СУЩН РАБОТАЕМ(УДАЛЯЕМ, ДОБАВЛЯЕМ И ТД) ВО ВРЕМЯ МАПА !!! id нужен реакту для быстрой перерисовки и тд..
                        title={tl.title}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                        tasks={taskForRenderTodoList} //Таски которые необходимототбразить в тудулисте согласно фильтра
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        filter={tl.filter}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                        removeTodoList={removeTodoList}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })


// ОТРИСОВЫВАЕМ НАШ ТУДУЛИСТ( В НАШЕМ СЛУЧАЕ МАССИВ ТУДУЛИСТОВ В ПРИМЕРЕ ИХ ИЗНАЧАЛЬНО 2  (СУЩНОСТИ) )
    return (
        <div className="App">
            <AppBar position={"sticky"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "27px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
