import { useState } from "react";
import { motion } from "framer-motion";

export const TransactionPage = () => {
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  console.log(formData);
  return (
    <motion.div
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg  mx-auto text-white"
    >
      <h2 className="text-3xl text-center text-white font-semibold">
        Update this Transaction
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 my-4">
          <label
            htmlFor="description"
            className="uppercase text-gray-500 font-bold"
          >
            Transaction
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-gray-600 py-3 px-2 outline-none rounded-md"
            onChange={handleChange}
            defaultValue={formData.description}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="paymentType"
              className="uppercase text-gray-500 font-bold"
            >
              Payment Type
            </label>
            <select
              name="paymentType"
              id="paymentType"
              className="bg-gray-600 py-3 px-2 outline-none rounded-md"
              onChange={handleChange}
              defaultValue={formData.paymentType}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="category"
              className="uppercase text-gray-500 font-bold"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="bg-gray-600 py-3 px-2 outline-none rounded-md"
              onChange={handleChange}
              defaultValue={formData.category}
            >
              <option value="saving">Saving</option>
              <option value="expense">Expense</option>
              <option value="investment">Investment</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="amount"
              className="uppercase text-gray-500 font-bold"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={0}
              className="bg-gray-600 py-3 px-2 outline-none rounded-md"
              onChange={handleChange}
              defaultValue={formData.amount}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1  w-full">
            <label
              htmlFor="location"
              className="uppercase text-gray-500 font-bold"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="bg-gray-600 py-3 px-2 outline-none rounded-md"
              onChange={handleChange}
              defaultValue={formData.location}
            />
          </div>
          <div className="flex flex-col gap-1 my-4 w-full">
            <label htmlFor="date" className="uppercase text-gray-500 font-bold">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="bg-gray-600 py-3 px-2 outline-none rounded-md"
              onChange={handleChange}
              defaultValue={formData.date}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-center bg-gray-100 text-black py-2 rounded-md text-lg mt-2"
        >
          Update Transaction
        </button>
      </form>
    </motion.div>
  );
};
