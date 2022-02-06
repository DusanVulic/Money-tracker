import { useState, useEffect } from "react";

import { useFirestore } from "../../Hooks/useFirestore";

const TransactionForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      userId,
      name,
      amount,
    });
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name :</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Amount($) :</span>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <button disabled={!name && !amount}>submit</button>
      </form>
    </>
  );
};

export default TransactionForm;
