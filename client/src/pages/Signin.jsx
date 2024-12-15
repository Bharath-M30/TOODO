import { useLocation, useNavigate } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";

export default function Signin() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [signInMessage, setSignInMessage] = useState(""); 
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(TodoContext);

  useEffect(() => {
    setUser({username: "", password: "", email: "",tasks: ""});
  }, [location.pathname]);

  //handling form inputs
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  // console.log(user);

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

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSignInMessage("");
      return;
    } else {
      setErrors({});
    }

    try {
      const result = await axios.post(`${apiUrl}/signin`, user, {withCredentials:true});
      console.log(result);
      if(result.request.status == 200){
        console.log(user)
        setSignInMessage("Login Successful!");
        setIsLoggedIn((prevState) => !prevState);
        setTimeout(() => {
          navigate(`/users/${user.username}`);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="min-h-screen hero-gradient flex justify-center items-center">
      <form onSubmit={handleSubmit} className="px-16 py-8 min-w-80 min-[650px]:min-w-96 text-[#B937FF] bg-[#1E1E1E] border-[#101010] border-2 rounded-xl flex flex-col gap-8 justify-center items-center">
        <h3 className="text-3xl font-bold">Sign In</h3>
        <div className="text-left min-w-full">
          <label className="block left-0 mb-2" htmlFor="username">
            Username
          </label>
          <input
            placeholder="Enter your username"
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

          <label className="block left-0 mb-2" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Enter your password"
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

        <button className="bg-[#B937FF] py-2 px-8 text-white rounded-full focus:outline-[#B937FF]">
          Sign In
        </button>

        {signInMessage == "Login Successful!" && <p className="text-xs text-green-600">{signInMessage}</p>}

        <p className="text-white">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-bold"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
