import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        toast.success("Google login successful!");
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        navigate("/");

        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xs mx-auto border p-6 mt-10">
      <legend className="fieldset-legend text-lg font-bold">Login</legend>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input input-bordered"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          className="input input-bordered"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </form>

      <div className="divider">OR</div>
      <button
        className="btn btn-outline btn-primary w-full mb-2"
        onClick={handleGoogleLogin}
        type="button"
      >
        <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 48 48">
          <g>
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.91-6.91C36.68 2.13 30.7 0 24 0 14.82 0 6.71 5.1 2.69 12.44l8.06 6.26C12.7 13.13 17.9 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.91-2.18 5.38-4.66 7.04l7.19 5.6C43.98 37.13 46.1 31.34 46.1 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.75 28.7c-1.09-3.22-1.09-6.68 0-9.9l-8.06-6.26C.89 16.13 0 19.01 0 22c0 2.99.89 5.87 2.69 8.46l8.06-6.26z"
            />
            <path
              fill="#EA4335"
              d="M24 44c6.7 0 12.68-2.13 17.15-5.89l-7.19-5.6c-2.01 1.35-4.58 2.14-7.46 2.14-6.1 0-11.3-3.63-13.25-8.7l-8.06 6.26C6.71 42.9 14.82 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </g>
        </svg>
        Continue with Google
      </button>

      <p className="mt-2 text-sm text-center">
        Don't have an account?{" "}
        <NavLink to="/signup" className="link link-primary">
          Register
        </NavLink>
      </p>
    </fieldset>
  );
};

export default Login;
