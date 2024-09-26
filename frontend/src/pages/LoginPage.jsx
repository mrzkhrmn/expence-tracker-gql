import { Link } from "react-router-dom";
import { RadioButton } from "../components/RadioButton";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOG_IN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOG_IN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ variables: { input: formData } });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md bg-gray-100 py-4 px-6 mx-auto mt-52 rounded-md shadow-white shadow-md">
      <h1 className="text-3xl text-center">Log In</h1>
      <h4 className="text-center my-6">
        Welcome Back! Log in to your account.
      </h4>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            placeholder="Enter your username..."
            className="py-2 px-2 rounded-md outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password..."
            className="py-2 px-2 rounded-md outline-none"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-black/90 text-white py-3 rounded-md text-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
        <p className="text-center text-gray-500">
          Don&apos;t you have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-black hover:underline">Sign Up Now!</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
