import React, { useState, useEffect } from "react";
import bot from "./assets/bot.gif";
import { fetchApi } from "./api/api.js";
import Loader from "./components/Loader/Loader";
import Content from "./components/Content";

const App = () => {
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });

  const [isLoading, setLoading] = useState(false);
  const [jokeType, setType] = useState("");
  const [jokeSetup, setSetup] = useState("");
  const [jokePunchline, setPunchline] = useState("");

  const handleKeyUp = (e) => {
    const { key } = e;
    if (key === "j" || key === "J") handleClick();
  };

  const handleClick = async () => {
    setLoading(true);
    const {
      data: [{ type, setup, punchline }],
    } = await fetchApi();

    setType(type);
    setSetup(setup);
    setPunchline(punchline);
    setLoading(false);

    const textSpeech = (words) => {
      const wordSaid = new SpeechSynthesisUtterance(words);
      synthesis.speak(wordSaid);
    };

    textSpeech(setup);
    textSpeech(punchline);
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          <img src={bot} alt="bot" />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Press button 👇 or "j" to hear a joke 😆</h1>
          <button
            className="btn btn-primary p-3 mt-5"
            onClick={() => {
              if (synthesis.speaking) synthesis.cancel();
              handleClick();
            }}
          >
            TELL ME A JOKE 😃
          </button>

          <Content
            jokeType={jokeType}
            jokeSetup={jokeSetup}
            jokePunchline={jokePunchline}
          />
        </div>
      )}
    </div>
  );
};

export default App;
