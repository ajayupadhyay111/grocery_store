import React from "react";
import { useAppContext } from "../context/appContext";
import { GoEyeClosed } from "react-icons/go";
import { BsEye } from "react-icons/bs";
const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(false);
  const { setShowUserLogin } = useAppContext();

  function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function validateStrongPassword(password: string): boolean {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const regex = /^(?=.*[a-z]).{6,}$/; //for development
    return regex.test(password);
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setMessage("Write the valid email");
    }
    if (!validateStrongPassword(password)) {
      setMessage(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    console.log("Email ", email);
    console.log("Password ", password);
    setShowUserLogin(false);
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setMessage("Write the valid email");
    }
    if (!validateStrongPassword(password)) {
      setMessage(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    console.log("Name ", name);
    console.log("Email ", email);
    console.log("Password ", password);
    setShowUserLogin(false);
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="w-screen h-screen fixed inset-0 bg-black/20 flex items-center justify-center z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <div className="relative">
            <input
              onChange={(e) => {
                setMessage("");
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type={hidePassword ? "password" : "text"}
              required
            />
            <span className="absolute top-4.5 right-2 text-gray-500">
              {hidePassword ? (
                <GoEyeClosed onClick={() => setHidePassword(false)} />
              ) : (
                <BsEye onClick={() => setHidePassword(true)} />
              )}
            </span>
          </div>
          <p className="text-red-600 mt-2 select-none cursor-pointer">
            {message}
          </p>
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button
          onClick={state === "register" ? handleSignUp : handleLogin}
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
