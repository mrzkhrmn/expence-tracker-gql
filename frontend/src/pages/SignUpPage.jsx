import { Link } from "react-router-dom";
import { RadioButton } from "../components/RadioButton";
import { useState } from "react";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  function handleChange(e) {
    if (e.target.id === "male" || e.target.id === "female") {
      setFormData({ ...formData, gender: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="max-w-md bg-gray-100 py-4 px-6 mx-auto mt-32 rounded-md shadow-white shadow-md">
      <h1 className="text-3xl text-center">Sign Up</h1>
      <h4 className="text-center my-6">Join to keep track of your expences</h4>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your name..."
            className="py-2 px-2 rounded-md outline-none"
            onChange={handleChange}
          />
        </div>
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
        <div className="flex items-center gap-6">
          <RadioButton
            label={"Male"}
            id={"male"}
            value={"male"}
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <RadioButton
            label={"Female"}
            id={"female"}
            value={"female"}
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-black/90 text-white py-3 rounded-md text-lg"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-black hover:underline">Login Here!</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
