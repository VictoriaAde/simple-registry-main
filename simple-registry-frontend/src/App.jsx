import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./contract";

function App() {
  const [name, setName] = useState("");
  const [retrievedName, setRetrievedName] = useState("");
  const [age, setAge] = useState(0);
  const [retrievedAge, setRetrievedAge] = useState();
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
        const { name, age } = getEntities;

        setLoading(true);
        // console.log(getEntities);
        setRetrievedName(name);
        setRetrievedAge(age);
        setLoading(false);

        console.log("Age updated successfully");
      } catch (err) {
        console.error("Error updating age:", err);
      }
    }
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />{" "}
          <button onClick={setUpdateNameInContract}>Update Name</button>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            name="age"
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
          />
          <button onClick={setUpdateAgeInContract}>Update Age</button>
          <button onClick={getEntitiesInContract}>Update Entities</button>
          <p>Updated Name: {loading ? <p>Loading...</p> : retrievedName}</p>
          <p>Updated Age: {loading ? <p>Loading...</p> : retrievedAge}</p>
        </div>
      </div>
    </>
  );
}

export default App;
