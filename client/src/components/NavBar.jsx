import { useLocation, useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { IoMdContact } from "react-icons/io";

export default function NavBar() {

    const location = useLocation();
    const navigate = useNavigate();
    const {user, isLoggedIn, setIsLoggedIn} = useContext(TodoContext);

    const isAuthPage = location.pathname.includes("signin") || location.pathname.includes("signup");

    const userDisplayName = user.username.slice(0,1).toUpperCase() + user.username.slice(1) || "Guest";

    // console.log(userDisplayName)

    function onLogout() {
        setIsLoggedIn((prevState) => !prevState);
        navigate("/");
    }

    return (
        <nav className="py-4 pl-8 pr-4 min-[650px]:py-4 min-[650px]:px-12 flex items-center justify-between bg-[#1E1E1E] text-[#B937FF] font-extrabold">
            <h1 className="text-[30px] cursor-pointer" onClick={() => navigate(`${ isLoggedIn ? `/users/${user.username}` : "/"}`)}>TOODO</h1>

            {
                isAuthPage ? 
                (
                    <button className="underline underline-offset-4 flex items-center" onClick={() => navigate("/")}><IoIosArrowBack style={{fontSize: "30px"}} /> Back to home page</button>
                ) : 
                (
                    isLoggedIn ? 

                    <div className="text-[#B937FF] flex gap-2 min-[650px]:gap-4 items-center">
                        <p>{userDisplayName}</p>
                        <IoMdContact style={{fontSize: "2rem"}} />
                        <button className="min-[650px]:ml-4 underline underline-offset-4 text-[#B937FF]" onClick={onLogout}>Logout</button>
                    </div> :
                    <div className="flex max-[650px]:transform-mobile gap-4 min-[650px]:gap-8">
                        <button className="bg-[#B937FF] text-white py-1 px-6 rounded-2xl" onClick={() => navigate("/signin")}>SIGN IN</button>
                        <button className="underline underline-offset-4" onClick={() => navigate("/signup")}>Sign Up</button>
                    </div>
                )
            }
        </nav>
    )
}

