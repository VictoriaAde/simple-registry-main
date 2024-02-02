import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./contract";

function App() {
  const [name, setName] = useState("");
  const [retrievedName, setRetrievedName] = useState("");
  const [age, setAge] = useState("");
  const [retrievedAge, setRetrievedAge] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setUpdateNameInContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      try {
        const updatedName = await contract.updateName(name);
        setLoading(true);
        await updatedName.wait();
        setLoading(false);

        console.log("Name updated successfully");
      } catch (err) {
        console.error("Error updating name:", err);
      }
    }
  }

  async function setUpdateAgeInContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      try {
        const updatedAge = await contract.updateAge(age);
        setLoading(true);
        await updatedAge.wait();
        setLoading(false);

        console.log("Age updated successfully");
      } catch (err) {
        console.error("Error updating age:", err);
      }
    }
  }

  async function getEntitiesInContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      try {
        const getEntities = await contract.getEntityDetails();
        const { age, name } = getEntities;

        setLoading(true);
        setRetrievedAge(age);
        setRetrievedName(name);
        setLoading(false);

        console.log(`updated ${age}`);
      } catch (err) {
        console.error("Error updating:", err);
      }
    }
  }

  return (
    <>
      <div>
        <h1>Official Registry</h1>
        <div className="input-div-con">
          <div className="input-div">
            <div>
              <div>
                <label htmlFor="name">Name</label>
              </div>{" "}
              <div>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />{" "}
              </div>
            </div>
            <div>
              <button onClick={setUpdateNameInContract}>Update Name</button>
            </div>{" "}
          </div>
          <div className="input-div">
            <div>
              <div>
                <label htmlFor="age">Age</label>
              </div>{" "}
              <div>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <button onClick={setUpdateAgeInContract}>Update Age</button>
            </div>
          </div>
        </div>
        <div className="get-fullInfo-btn">
          <button onClick={getEntitiesInContract}>Get Full Information</button>
        </div>
        <p className="full-info">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{`${retrievedName}`}</p>
              <p>{`${retrievedAge}`}</p>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default App;
