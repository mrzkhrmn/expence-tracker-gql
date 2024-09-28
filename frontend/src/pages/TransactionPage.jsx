import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_TRANSACTION,
  GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transaction.query";
import { useParams } from "react-router-dom";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

export const TransactionPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_TRANSACTION, {
    variables: { transactionId: id },
  });
  const [formData, setFormData] = useState({
    description: data?.transaction.description || "",
    paymentType: data?.transaction.paymentType || "",
    category: data?.transaction.category || "",
    amount: data?.transaction.amount || "",
    location: data?.transaction.location || "",
    date: data?.transaction.date || "",
  });

  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    { refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }] }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    try {
      await updateTransaction({
        variables: { input: { ...formData, transactionId: id, amount } },
      });
      toast.success("Transaction updated!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.transaction.description,
        paymentType: data?.transaction.paymentType,
        category: data?.transaction.category,
        amount: data?.transaction.amount,
        location: data?.transaction.location,
        date: new Date(+data?.transaction.date).toISOString().substring(0, 10),
      });
    }
  }, [data]);

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
            value={formData.description}
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
              value={formData.paymentType}
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
              value={formData.category}
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
              value={formData.amount}
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
              value={formData.location}
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
              value={formData.date}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-center bg-gray-100 text-black py-2 rounded-md text-lg mt-2"
          disabled={updateLoading}
        >
          {updateLoading ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </motion.div>
  );
};
