import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosInstance from "./api/axios";
import Select from "react-select";
function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest lowercase alphabet",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axiosInstance.post("/bfhl", parsedInput, {
        withCredentials: false,
      });
      setResponse(result.data);
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map((option) => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <p>{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>Enter data</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{
            display: "block",
            width: "500px",
            marginBottom: "10px",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button
          type="submit"
          className="btn"
          style={{
            width: "500px",
            backgroundColor: "blue",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
          placeholder="Select response fields"
        />
      )}
      {renderResponse()}
    </div>
  );
}
export default App;
