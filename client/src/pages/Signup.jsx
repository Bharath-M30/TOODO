import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";


export default function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [signUpMessage, setSignUpMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(TodoContext);

  useEffect(() => {
    setUser({username: "", password: "", email: ""});
  }, [location.pathname]);

  //handling form inputs
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  //validating inputs
  function validate() {
    const newErrors = {};
    if (!user.username.trim()) {
      newErrors.username = "Username is required!";
    }

    if (!user.password) {
      newErrors.password = "Password is required!";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must contain atleast 6 characters";
    }

    if (!user.email) {
      newErrors.email = "Email is required!";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  }

  async function handleSignup(event) {
    event.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({});
    }

    //send to server
    try {
      const result = await axios.post(`${apiUrl}/signup`, user);
      console.log(result);
      if (result.status == 201) {
        setUser({username: "",email:"", password: ""});
        setSignUpMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: error.response.data.message,
      }));
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="px-16 py-8 min-w-80 min-[650px]:min-w-96 text-[#B937FF] bg-[#1E1E1E] border-[#101010] border-2 rounded-xl flex flex-col gap-8 justify-center items-center"
      >
        <h3 className="text-3xl font-bold">Sign Up</h3>
        <div className="text-left min-w-full">
          <label className="block left-0 mb-2" htmlFor="username">
            Username
          </label>
          <input
            placeholder="Set your username"
            className="mb-4 w-full py-2 px-2 rounded font-normal text-[#1E1E1E] focus:outline-[#B937FF]"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            type="text"
          />

          {errors.username && (
            <p className="text-red-600 text-xs mx-auto">{errors.username}</p>
          )}

          <label className="block left-0 mb-2" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Enter your email"
            className="mb-4 w-full py-2 px-2 rounded font-normal text-[#1E1E1E] focus:outline-[#B937FF]"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mx-auto">{errors.email}</p>
          )}

          <label className="block left-0 mb-2" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Set your password"
            className=" w-full py-2 px-2 rounded font-normal text-[#1E1E1E] focus:outline-[#B937FF]"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mx-auto mt-4">
              {errors.password}
            </p>
          )}
        </div>

        {signUpMessage == "Account created successfully!" && <p className="text-xs text-green-600">{signUpMessage}</p>}

        <button className="bg-[#B937FF] py-2 px-8 text-white rounded-full focus:outline-[#B937FF]">
          Sign Up
        </button>

        {errors.message && (
          <p className="text-red-600 text-xs mx-auto mt-4">{errors.message}</p>
        )}

        <p className="text-white">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-bold"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
