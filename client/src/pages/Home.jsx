import Task from "../components/Task";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Home() {

    const apiUrl = import.meta.env.VITE_API_URL ;

    const {user,setUser, isLoggedIn, setIsLoggedIn, dbTasks, setDbTasks, taskTitle, setTaskTitle, taskStatus, setTaskStatus,demoTasksArray, setDemoTasksArray,demoTaskTitle,setDemoTaskTitle ,demoTaskStatus, setDemoTaskStatus} = useContext(TodoContext);
    const {username} = useParams();

    useEffect(() => {
        async function getTasks(){
            try {
                if(username){
                    const taskUser = await axios.post(`${apiUrl}/users/tasks`, user);
                    setDbTasks(taskUser.data.tasks);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getTasks();
    },[username])

    async function refreshTasks() {
        try {
            const refreshedTasks = await axios.post(`${apiUrl}/users/tasks`, user);
            setDbTasks(refreshedTasks.data.tasks);
        } catch (error) {
            console.error(error);
        }
    }
    // console.log(dbTasks)

    function handleChange(e){
        const {value} = e.target;
        setTaskTitle(value);
    }
    // console.log(taskTitle);

    async function handleSubmit(e){
        e.preventDefault();
        if(isLoggedIn){
            try {
                
                const result = await axios.post(`${apiUrl}/users/tasks/${username}`, {title: taskTitle,status: taskStatus, username:user.username});
                console.log(result);
    
                if(result.status == 201){
                    console.log("Successful");
                    setTaskTitle("");
                    setTaskStatus(false);
                    setUser((prevUser) => (
                        {...prevUser, tasks:result?.response?.data?.tasks}
                    ))
                    refreshTasks();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    //demo functions
    function createDemoTasks(title,status) {
        const newTask = {
            title: title,
            status: status
        }
        setDemoTasksArray((prevArray) => (
            [...prevArray, newTask]
        ))
    }
    function updateDemoTask(title, status) {
    
        const updatedDemoTasksArray = demoTasksArray.map((task) => {
            if (task.title === title) {
                console.log("Found task:", task);
                return { ...task, status: !task.status };
            }
            return task; 
        });
        setDemoTasksArray(updatedDemoTasksArray);
    }

    function deleteDemoTask(title){
        const filteredDemoTaskArray = demoTasksArray.filter((task) => task.title != title);
        setDemoTasksArray(filteredDemoTaskArray);
    }


    function handleDemoOnChange(e){
        const {value} = e.target;
        setDemoTaskTitle(value);
    }

    function handleDemoSubmit(e){
        e.preventDefault();
        createDemoTasks(demoTaskTitle, demoTaskStatus);
    }

  return (
    <>
        <main>
            <div className=" h-80 min-[650px]:h-56 hero-gradient w-full p-8 flex flex-col gap-4 justify-center items-center relative">
                <div className="py-4">
                    <h2 className="text-[#B937FF] font-medium text-[30px] min-[870px]:text-[40px]">When There's TOO much to DO, use TOODO</h2>
                </div>
                {isLoggedIn ? "" : <p className="text-[#999999] font-extralight decoration-[#444444] underline underline-offset-4">Note: You are in guest mode. Your tasks will be cleared. To save them, sign in or sign up.</p>}

                <div className="absolute bottom-0 left-1/2 w-full flex justify-center transform -translate-x-1/2 translate-y-1/2">
                    <form onSubmit={isLoggedIn ? handleSubmit : handleDemoSubmit} className="relative w-4/5 min-[650px]:w-1/2">
                        <input
                            type="text" 
                            placeholder="What's on your mind?"
                            className="w-full py-4 px-4 rounded-full focus:outline-none font-semibold"
                            name="tasks"
                            value={isLoggedIn ? taskTitle : demoTaskTitle}
                            onChange={isLoggedIn ? handleChange : handleDemoOnChange}
                        />
                        <button className="absolute right-2 rounded-full w-11 h-11 top-1/2 transform -translate-y-1/2 bg-[#B937FF] text-white text-[35px]
                        flex justify-center items-center">+</button>
                    </form>
                </div>
            </div>

            {
                isLoggedIn && dbTasks
                 ?
                 <div className="py-16 flex flex-col gap-8 w-4/5 min-[650px]:w-1/2 mx-auto">
                     {dbTasks.length > 0 ?
                        dbTasks.map((task) => (
                            <Task
                                key={task.id}
                                title={task.title}
                                status={task.status}
                                id={task.id}
                                isLoggedIn={isLoggedIn}
                                updateDemoTask={updateDemoTask}
                                deleteDemoTask={deleteDemoTask}
                            />
                        ))
                        :
                        <div className="border-[3px] p-6 rounded-lg border-dashed border-[#5E5E5E] text-[#5E5E5E] mx-auto text-[38px] font-extrabold cursor-default">
                            <p>You don't have any tasks!</p>
                        </div>
                        }
                 </div> 
                 : 
                    demoTasksArray.length > 0 ? 
                        <div className="py-16 flex flex-col gap-8 w-4/5 min-[650px]:w-1/2 mx-auto">
                            {demoTasksArray.map((task,index) => (
                                <Task 
                                    key={index}
                                    title={task.title}
                                    status={task.status}
                                    isLoggedIn={isLoggedIn}
                                    updateDemoTask={updateDemoTask}
                                    deleteDemoTask={deleteDemoTask}
                                />
                            ))}
                        </div> 
                    :
                    <div className="border-[3px] mb-8 rounded-lg border-dashed border-[#5E5E5E] text-[#5E5E5E] p-6 w-4/5 min-[650px]:w-1/2 h-1/2 mx-auto mt-16 text-[38px] font-extrabold cursor-default">
                        <p className="w-1/5">Your Tasks Appear Here</p>
                    </div>
            }
            
        </main>
    </>
  );
}
