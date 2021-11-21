import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//Создаем новую сущность
export const AddItemForm = (props: AddItemFormPropsType) => {

    // Вынесли стили для input  в переменную
    const errorInputStyles = {border: "red 3px solid"}
    const errorStyle = {color: "red"}

    // UseState
    let [inputValue, setInputValue] = useState<string>("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const AddItem = () => {
        if (inputValue.trim() !== "") {
            props.addItem(inputValue)
            setInputValue("")
        } else {
            setError(true)
            setInputValue("")
        }
    }
    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.trim() !== "") {
                props.addItem(inputValue)
                setInputValue("")
            } else {
                setError(true)
                setInputValue("")

            }
        }
    }

    const errorMessage = error && <div style={errorStyle}>Title is required!</div>

    return (
        <div>
            <input
                style={error ? errorInputStyles : undefined}
                value={inputValue}
                placeholder="Enter title.."
                onChange={onChangeHandler}
                onKeyPress={onPressKeyHandler}
            />
            <button onClick={AddItem}>+</button>
            {errorMessage}
        </div>
    )
}
