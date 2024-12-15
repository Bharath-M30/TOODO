import { useState, createContext } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    tasks: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dbTasks, setDbTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState(false);

  const [demoTasksArray, setDemoTasksArray] = useState([]);
  const [demoTaskTitle, setDemoTaskTitle] = useState("")
  const [demoTaskStatus, setDemoTaskStatus] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        dbTasks,
        setDbTasks,
        user,
        setUser,
        taskTitle,
        setTaskTitle,
        taskStatus,
        setTaskStatus,
        demoTasksArray,
        setDemoTasksArray,
        demoTaskTitle,
        setDemoTaskTitle,
        demoTaskStatus,
        setDemoTaskStatus
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
