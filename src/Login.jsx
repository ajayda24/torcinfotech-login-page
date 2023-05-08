/* eslint-disable react/prop-types */
import { useState } from "react";
import loginVector from "./assets/login-vector.png";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { CgSpinner } from "react-icons/cg";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://textile.torcdeveloper.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="bg-[url('./assets/background.jpg')] min-w-full min-h-screen  bg-no-repeat bg-cover  flex justify-center items-center  px-2 md:px-10">
      <div className="w-full h-[60%] md:h-[90vh] bg-white/90 shadow-2xl p-2 md:p-8 flex justify-evenly items-center">
        <div className="w-96 h-full bg-white shadow-inner flex-2 p-5 md:p-10">
          <h2 className="text-2xl font-bold font-sans">Login</h2>
          <p className="text-slate-400 font-medium text-sm">
            Doesn&apos;t have an account yet?{" "}
            <a href="/signup" className="text-primary underline">
              Sign Up
            </a>
          </p>
          <div className="form-control w-full  mt-1">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered input-primary w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text font-medium">Password</span>
              <a
                href="/forgot-password"
                className="label-text font-medium underline text-primary"
              >
                Forgot Password?
              </a>
            </label>
            <input
              type="password"
              placeholder="Enter 6 character or more"
              className="input input-bordered input-primary w-full "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-1">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Remember me</span>
            </label>
          </div>
          <button className="btn btn-primary w-full mt-5" onClick={submitLogin}>
            {isLoading ? (
              <div className="flex justify-center items-center gap-3">
                <p>Loading</p> <CgSpinner className="animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <div className="divider opacity-80">or login with</div>
          <div className="flex w-full justify-around gap-3">
            <button className="btn flex-1 btn-outline btn-error flex justify-center items-center gap-1 sm:gap-3 capitalize">
              <FcGoogle size={"1.2rem"} /> <p>Google</p>
            </button>
            <button className="btn flex-1 btn-outline btn-primary flex justify-center items-center gap-1 sm:gap-3 capitalize">
              <GrFacebookOption size={"1.2rem"} /> <p>Facebook</p>
            </button>
          </div>
        </div>
        <img
          src={loginVector}
          alt="login-vector"
          className="flex-3 md:max-w-sm lg:max-w-2xl hidden md:block"
        />
      </div>
    </div>
  );
}
