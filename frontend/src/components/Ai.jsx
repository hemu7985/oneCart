import React, { useContext, useState, useEffect } from "react";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const openingSound = new Audio(open);

  // ✅ Speak function
  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  // ✅ Initialize SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  } else {
    console.log("Speech recognition not supported");
  }

  // ✅ Setup recognition handlers in useEffect
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("opening search");
        setShowSearch(true);
        navigate("/collections");
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("closing search");
        setShowSearch(false);
      } else if (
        transcript.includes("collection") ||
        transcript.includes("collections") ||
        transcript.includes("product")
      ) {
        speak("opening collection page");
        navigate("/collections");
      } else if (transcript.includes("about")) {
        speak("opening about page");
        navigate("/about");
        setShowSearch(false);
      } else if (transcript.includes("home")) {
        speak("opening home page");
        navigate("/");
        setShowSearch(false);
      } else if (
        transcript.includes("cart") ||
        transcript.includes("kaat") ||
        transcript.includes("caat")
      ) {
        speak("opening your cart");
        navigate("/cart");
        setShowSearch(false);
      } else if (transcript.includes("contact")) {
        speak("opening contact page");
        navigate("/contact");
        setShowSearch(false);
      } else if (
        transcript.includes("order") ||
        transcript.includes("orders") ||
        transcript.includes("my order")
      ) {
        speak("opening your orders page");
        navigate("/order");
        setShowSearch(false);
      } else {
        toast.error("Try Again");
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      toast.error("Speech recognition error: " + e.error);
      setActiveAi(false);
    };

    recognition.onend = () => {
      setActiveAi(false);
    };
  }, [recognition, showSearch, navigate, setShowSearch]);

  // ✅ On click start listening
  const startListening = () => {
    if (recognition) {
      recognition.start();
      openingSound.play();
      setActiveAi(true);
    } else {
      toast.error("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startListening}
    >
      <img
        src={ai}
        alt="AI assistant"
        className={`w-[60px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125"
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: `${
            activeAi
              ? "drop-shadow(0px 0px 30px #00d2fc)"
              : "drop-shadow(0px 0px 20px black)"
          }`,
        }}
      />
    </div>
  );
}

export default Ai;
