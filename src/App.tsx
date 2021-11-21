import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./TodoList";
import {AddItemForm} from "./AddItemForm";


export type filterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
//BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    //СОЗДАЕМ СУЩНОСТЬ ТУДУЛИСТОВ (структура данных в которых будем хранить наши тудулисты)
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React JS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Meet", isDone: true},
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false}
        ]
    })

    //id таски для удал     //ключ массива()
    function removeTask(taskID: string, todoListID: string) {  //пропуск все таск кроме той что удаляем
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }

    //тайтл новой задчи  //ключ массива()
    function addTask(TaskTitle: string, todoListID: string) {
        let newTask: TaskType = {id: v1(), title: TaskTitle, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    //id таски для chenge     //БУЛЕВО ЧЕКБОКСА       //ключ массива
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(
                el => el.id === taskID ? {...el, isDone: isDone} : el)
        })
    }



//Создаем фунуцию для изменения тайтла у таски
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(
                el => el.id === taskID ? {...el, title: title} :  el)
        })
    }


    //Меняем настройки фильтра сущности тудулиста
    function changeFilter(filter: filterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }


    //Создаем функцию для изменения тайтла

    const changeTodolistTitle = (title: string,todoListID: string ) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

//----Функции удаляющие и добовляющие сущности тудулистов-----------
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        // В объектк с тасками тоже удаляем таски сущности удаляемого тудулиста
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {id: v1(), title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }


//UI--------------------------------------------------------------------------------------------------------------------
    // СОЗДАЕМ ОТРИСОВКУ НАШИХ ТУДУЛИСТОВ, МАПАЕМ СУЩНОСТИ, ФИЛТРУЕМ ПО ФИЛЬТРУ, ДАННЫЕ ИЗ ОБЪЕКТА СУЩНОСТИ ПЕРЕДАЕМ В <Todolist ..../> И ПЕРЕДАЕМ НА ОТРИСТОВКУ НУЖНЫЙ МАССИВ

    const todoListComponents = todoLists.map(tl => {
        //ФИЛЬТРУЕМ СПИСОК ТАСК( ЗАДАЧ) ДЛЯ ОТРИСОВКИ
        let taskForRenderTodoList: Array<TaskType> = tasks[tl.id] // ПО УМОЛЧАНИЮ ДОЛЖЕН ПОПАСТЬ МАССИВ ТАСОК (в tasks) ИМЕННО ЭТОГО todolist-а...
        if (tl.filter === "active") {     //...У ЭТОГО tl МЫ ПРОВЕРИМ ЗНАЧ.ФИЛЬТ. И ЕСЛИ ОН "active"...
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== true)//... ТО МЫ МОЖЕМ ЕГО ОТФИЛЬТРОВАТЬ
        }
        if (tl.filter === "completed") {
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== false)
        }
        return (
            <Todolist
                key={tl.id} //ВЕШАЕТСЯ НА ВСЕ ЭЛЕМЕНТЫ СПИСКА. ЭТО ДЛЯ React         Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                id={tl.id} //  Берем из сущности тудулиста ДЛЯ ПОНИМАНИЯ С КАКОЙ СУЩН РАБОТАЕМ(УДАЛЯЕМ, ДОБАВЛЯЕМ И ТД) ВО ВРЕМЯ МАПА
                title={tl.title}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                tasks={taskForRenderTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeTaskStatus}
                filter={tl.filter}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                removeTodoList={removeTodoList}
                changeTodolistTitle ={changeTodolistTitle}
                changeTaskTitle = {changeTaskTitle}
            />
        )
    })

// ОТРИСОВЫВАЕМ НАШ ТУДУЛИСТ( В НАШЕМ СЛУЧАЕ МАССИВ ТУДУЛИСТОВ В ПРИМЕРЕ ИХ ИЗНАЧАЛЬНО 2  (СУЩНОСТИ) )
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;
