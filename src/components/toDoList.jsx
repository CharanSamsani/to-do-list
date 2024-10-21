import React, { useState, useEffect } from 'react';

function toDoList(){
    
    const [ tasks, setTasks ] = useState([]);
    const [ newTask, setNewTask ] = useState("");

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
        }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") 
        {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    } 

    function moveTaskUp(index) {
        if (index > 0) 
        {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) 
            {
                const updatedTasks = [...tasks];
                [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
                setTasks(updatedTasks);
            }
    }

    return (
    <div className='to-do-list'>
        <h1>TO DO LIST</h1>

        <div>
            <input type='text' 
            placeholder='Enter a task...'
            value={newTask}
            onChange={handleInputChange}/>

            <button
            className='add-btn' onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className='text'>{task}</span>
                    <button className='delete-btn'
                    onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button className='move-btn'
                    onClick={() => moveTaskUp(index)}>
                        ⬆️
                    </button>
                    <button className='move-btn'
                    onClick={() => moveTaskDown(index)}>
                        ⬇️
                    </button>
                </li>
            )}
        </ol>
    </div>)
}

export default toDoList
