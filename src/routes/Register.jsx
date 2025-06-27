import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router";

const provider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!/[!@#$%]/.test(password)) {
      return "Password must include at least one special character (!@#$%).";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const { name, email, photoURL, password } = form;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      await sendEmailVerification(result.user);

      Swal.fire(
        "Registration Successful!",
        "Verification email sent. Please check your inbox.",
        "success"
      );

      setForm({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        toast.success("Google signup successful!");
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xs mx-auto border p-6 mt-10">
      <legend className="fieldset-legend text-lg font-bold">Register</legend>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label className="label">Photo URL</label>
        <input
          type="url"
          name="photoURL"
          className="input input-bordered"
          placeholder="Photo URL (optional)"
          value={form.photoURL}
          onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn btn-neutral mt-4">
          Register
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignup}
        type="button"
        className="btn btn-outline btn-primary w-full mb-2"
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
        Already have an account?{" "}
        <NavLink to="/login" className="link link-primary">
          Login
        </NavLink>
      </p>
    </fieldset>
  );
};

export default Register;
