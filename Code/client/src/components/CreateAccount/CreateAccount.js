import React, { useState, useEffect } from "react";
import "./CreateAccount.css";
import useBasicDetails from "../../hooks/useBasicDetails";

const CreateAccount = () => {
  const [accountHolder, setAccountHolder] = useState("");
  const [accountLocation, setAccountLocation] = useState("");
  const [email, setEmail] = useState("");

  const [web3, account, contract, contractAddress] = useBasicDetails();

  useEffect(() => {
    const getContractDetails = async () => {};
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract);
      console.log(account);
      web3.eth.defaultAccount = account;
      getContractDetails();
    }
  }, [web3, account, contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contract.methods);
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      try {
        await contract.methods
          .createAccount(account, accountHolder, accountLocation, email)
          .send({
            from: account,
            to: contract.options.address,
            value: web3.utils.toWei("2", "ether"),
          })
          .then((res) => {
            console.log(res);
            window.location.href = "/accounts";
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="create-account">
      <div className="form-wrapper-container">
        <div className="form-wrapper">
          <h1>REGISTER HERE</h1>
          <h2>
            Your main ethereum wallet will be deducted with 2 ETH by default
            when you open an account and this 2 ETH will be deposited in your
            bank account along with some service fees for transaction.
          </h2>
          <form onSubmit={handleSubmit} className="create-form">
            <h2>
              USERNAME OF THE ACCOUNT
            </h2>
            <input
              className="form-input-field"
              type="text"
              placeholder="Name of the account holder"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
            ></input>

            <h2>
              ETH/METAMASK ADDRESS OF THE ACCOUNT PUBLIC KEY
            </h2>
            <input
              className="form-input-field"
              type="text"
              placeholder="Home Address of account holder"
              value={accountLocation}
              onChange={(e) => setAccountLocation(e.target.value)}
            ></input>
            
            <h2>
              EMAIL OF THE ACCOUNT USER
            </h2>
            <input
              className="form-input-field"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <button className="submit-button" type="submit">
              CREATE A NEW ACCOUNT
            </button>
          </form>
        </div>
      </div>

      <div className="image-wrapper">
        <img src="./assets/2.svg" className="create-account-image" alt="" />
      </div>
    </div>
  );
};

export default CreateAccount;
