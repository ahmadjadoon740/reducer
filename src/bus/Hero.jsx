import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  if (action.type === "EMPTY") {
    return {
      ...state,
      error: true,
      success: false,
      message: "Input cannot be empty",
    };
  }

  if (action.type === "SUBMIT") {
    return {
      ...state,
      data: [...state.data, action.payload],
      error: false,
      success: true,
      message: "Submitted successfully",
    };
  }

  if (action.type === "RESET") {
    return {
      ...state,
      error: false,
      success: false,
      message: "",
    };
  }

  return state;
};

const initialState = {
  data: [],
  success: false,
  error: false,
  message: "",
};

const Hero = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [main, setMain] = useState("");

  const handleInput = (e) => {
    setMain(e.target.value);
  };

  const handleSubmit = () => {
    if (main.trim() === "") {
      dispatch({ type: "EMPTY" });
    } else {
      dispatch({ type: "SUBMIT", payload: main });
      setMain(""); // Clear input after submit
    }

    setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 3000);
  };

  return (
    <>
      <div className="container mx-auto mt-30 shadow-yellow-300 border-2 rounded-2xl border-amber-500 p-4">
        <input
          type="text"
          name="main"
          placeholder="Enter an Email OR Phone Number"
          value={main}
          onChange={handleInput}
          className={`w-full p-3 border-2 mb-4 rounded outline-0 ${
            state.error ? "border-red-500" : "border-gray-400"
          }`}
        />
        {state.message && (
          <p
            className={`mt-2 ${
              state.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full p-3 border-2 rounded bg-amber-500 text-white font-semibold   "
        >
          Submit
        </button>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-5 mx-auto">
        {state.data.map((item, index) => (
          <div
            key={index}
            className="border-2 p-4 rounded-2xl border-amber-400 shadow-sm  bg-amber-200"
          >
            <h2 className="text-lg font-medium  text-gray-600">{item}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hero;
