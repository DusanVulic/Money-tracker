import styles from "./Home.module.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import TransactionForm from "./TransactionForm";
import { useCollection } from "../../Hooks/useCollection";
import TransactionList from "./TransactionList";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["userId", "==", user.uid],

    ["createdAt", "desc"]
  );

  return (
    <>
      <div className={styles.title}>
        <h3>dear {user.displayName}...these are your transactions</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          transaction list
          {documents && <TransactionList transactions={documents} />}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm userId={user.uid} />
        </div>
      </div>
    </>
  );
};

export default Home;
