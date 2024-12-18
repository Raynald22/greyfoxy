import React, { useState, useEffect } from "react";
import "./Game.css"; // Import the CSS file for styling

function Game() {
  const [isTextComplete, setIsTextComplete] = useState(false); // State to track text animation completion
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to show popup
  const [showPressEnterText, setShowPressEnterText] = useState(false); // State to show "Press Enter" text
  const [dialogText, setDialogText] = useState("Welcome..I'm Kookie ^^. Nice to meet u. May I know your name..?"); // Dialog text
  const [isCharacterVisible, setIsCharacterVisible] = useState(false); // State to control character visibility
  const [isDialogVisible, setIsDialogVisible] = useState(false); // State to control dialog visibility
  const [hasSubmittedName, setHasSubmittedName] = useState(false); // State to track if the name has been submitted

  // Array of compliments
  const compliments = [
    "Ahh I see, ${userName} is a beautiful name.. I bet the person is pretty like her name..:>",
    "${userName}, what a lovely name! I can tell you're as wonderful as your name!",
    "Wow, ${userName} sounds like the name of someone with a heart of gold!",
    "What a stunning name, ${userName}! I bet your smile is as bright as your name!",
    "${userName}, such a graceful name! I can already tell you're as kind as your name!",
    "Oh, ${userName}, that’s such a gorgeous name! I’m sure you’re a star!",
    "${userName}, you’ve got the name of someone destined for greatness!",
    "${userName} – a name that radiates beauty and charm!"
  ];

  // Function to handle the name submission
  const handleNameSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    setIsPopupVisible(false); // Hide the popup after submission
    setHasSubmittedName(true); // Set hasSubmittedName to true
    // Randomly pick a compliment and display it
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setDialogText(randomCompliment.replace("${userName}", userName)); // Change the dialog text after name is submitted
    localStorage.setItem("userName", userName); // Save the user's name in localStorage
  };

  // Function to handle Esc key press (to cancel)
  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setIsPopupVisible(false); // Close the popup when Escape is pressed
      setShowPressEnterText(false); // Hide "Press Enter" message when Esc is pressed
    }
  };

  // Show the popup after the text is complete
  useEffect(() => {
    if (isTextComplete && !hasSubmittedName) {
      setShowPressEnterText(true); // Show "Press Enter" message when text is complete and the name is not submitted
    }
  }, [isTextComplete, hasSubmittedName]);

  // Handle key press event for Enter and Esc
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !hasSubmittedName) {
      setIsPopupVisible(true); // Show the popup when Enter is pressed and the name has not been submitted
      setShowPressEnterText(false); // Hide "Press Enter" after popup is triggered
    }
    handleEscPress(event); // Call handleEscPress to handle Escape key
  };

  // Add the event listener when the component mounts and remove it when it unmounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Clear the userName from the state and localStorage on refresh or when the page is closed
  useEffect(() => {
    // Optionally, you could use sessionStorage or handle this globally depending on your app's requirement
    window.onbeforeunload = () => {
      localStorage.removeItem("userName"); // Clears the name when the user refreshes or closes the page
    };
  }, []);

  // Timeout to display character and dialog after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCharacterVisible(true); // Make the character visible after a delay
      setIsDialogVisible(true); // Make the dialog visible after a delay
    }, 2000); // Delay in milliseconds (2 seconds)

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  return (
    <div className="game-container">
      {/* Background Image */}
      <div className="game-background"></div>

      {/* Foreground Content */}
      <div className="game-content">
        {/* Textbox */}
        {isDialogVisible && (
          <div className="textbox-container">
            <p className="textbox-text" onAnimationEnd={() => setIsTextComplete(true)}>
              {dialogText}
            </p>
          </div>
        )}

        {/* Character Image */}
        {isCharacterVisible && (
          <div className="character-container">
            <img src="/character.png" alt="Character" className="character" />
          </div>
        )}
      </div>

      {/* Show "Press Enter" text at the bottom left */}
      {showPressEnterText && !hasSubmittedName && (
        <div className="press-enter-text">
          Press Enter to continue...
        </div>
      )}

      {/* Popup Dialog for User Name Input */}
      {isPopupVisible && !hasSubmittedName && (
        <div className="popup-container">
          <div className="popup-content">
            <h3>What's your name?</h3>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
