import { useState } from "react";
import styles from "./SignUp.module.css";

//import signup hook
import { useSignUp } from "../../Hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const { error, isPending, signup } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up </h2>
      <label>
        <span> email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span> please enter display name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span> password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isPending && <button className="btn ">SignUp</button>}
      {isPending && (
        <button className="btn " disabled>
          Loading
        </button>
      )}
      {error && <p className={styles["signup-error"]}>{error}</p>}
    </form>
  );
};

export default SignUp;
