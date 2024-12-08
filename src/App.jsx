// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

function App() {
  // setting a button
  const [language, setLanguage] = useState();
  const [defaultCategory, setDefaultCategory] = useState("any");
  // const [flag, setFlags] = useState();
  const [jokeType, setJokeType] = useState();
  const [randomJoke, setRandomJoke] = useState();
  // const [count, setCount] = useState(0);

  function fetchJoke() {
    // Fetching Joke API
    axios
      .get(
        `https://v2.jokeapi.dev/joke/${defaultCategory}?${jokeType}&${language}`,
        {
          params: {
            any: defaultCategory,
            lang: language,
            type:
              jokeType === "single"
                ? "single"
                : jokeType === "twotype"
                ? "twotype"
                : jokeType === "single" && "twotype"
                ? "any"
                : "any",
          },
        }
      )
      .then((response) => {
        // getting the response
        //two part joke
        console.log(response.data.setup);
        console.log(response.data.delivery);
        // single joke
        console.log(response.data.joke);

        const singleType = response.data.joke;
        const twoType = response.data.setup
          ? `${response.data.setup} ${response.data.delivery}`
          : undefined;

        const jokeCheck = singleType ? singleType : twoType;

        setRandomJoke(jokeCheck);
      });
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <div className="h-screen overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="flex flex-col items-center mt-10">
          Random Joke Generator
        </h1>
        <div className="flex flex-col items-center justify-center h-full">
          <label>
            <input type="checkbox" onClick={() => setJokeType("single")} />
            Single
          </label>
          <label>
            <input type="checkbox" onClick={() => setJokeType("twopart")} />
            Two Part
          </label>

          <p className="container px-4 mx-auto text-3xl text-center">
            {randomJoke}
          </p>
          <button
            onClick={fetchJoke}
            className="px-4 py-2 mt-5 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
            Press me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
