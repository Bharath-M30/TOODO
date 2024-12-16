import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";

export default function Task({title, status, id, isLoggedIn, updateDemoTask, deleteDemoTask}) {

    const apiUrl = import.meta.env.VITE_API_URL || "https://toodo-backend.onrender.com";
    const {dbTasks, setDbTasks} = useContext(TodoContext);

    async function updateTask(id, status) {
        try {
            const updatedTasks = dbTasks.map((task) =>
                task.id === id ? { ...task, status } : task
            );
            setDbTasks(updatedTasks);

            const result = await axios.put(`${apiUrl}/users/tasks`, { id, status });
            console.log(result);
 
            if (result.status === 200) {
                console.log("Task updated successfully");
            }
        } catch (error) {
            console.error(error);

            const revertedTasks = dbTasks.map((task) =>
                task.id === id ? { ...task, status: !status } : task
            );
            setDbTasks(revertedTasks);
        }
    }
    
    async function deleteTask(id){
        try {
            const updatedTasks = dbTasks.filter((task) => task.id !== id);
            setDbTasks(updatedTasks);

            const result = await axios.delete(`${apiUrl}/users/tasks`, { data: {id} });
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-[#1E1E1E] w-full flex items-center justify-between py-4 px-8 min-[650px]:py-6 min-[650px]:px-12 rounded-lg">
            <p className={`text-[#B937FF] max-[650px]:w-3/4 max-[650px]:pr-4 overflow-scroll font-semibold text-xl ${status ? 'line-through decoration-4': ''}`}>{title}</p>
            <div className="flex gap-4">
                <button onClick={isLoggedIn ? () => updateTask(id, !status) : () => updateDemoTask(title, status)}><FaCheckCircle style={{color: `${status ? 'green' : 'white'}`, fontSize: "25px"}} /></button>
                <button onClick={isLoggedIn ? () => deleteTask(id) : () => deleteDemoTask(title)}><MdDelete style={{color: "red", fontSize: "25px"}}/></button>
            </div>
        </div>
    )
}