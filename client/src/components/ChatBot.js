import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AiOutlineMessage } from "react-icons/ai"; // Import an icon for the chat

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat window

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... It might take up to few seconds.");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=
          AIzaSyDVsL2Hl9ViljLqq943XXMgL_ZIKr9Ln98
        `,
        
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setQuestion(""); // Clear the question after submission
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !generatingAnswer) {
      e.preventDefault(); // Prevent newline in the textarea
      generateAnswer(e); // Call the generateAnswer function
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Floating chat icon */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <AiOutlineMessage size={30} />
      </button>

      {/* Chatbot window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-6 w-80 h-[500px] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all duration-500">
          <form
            onSubmit={generateAnswer}
            className="w-full text-center rounded-lg"
          >
            <h1 className="text-2xl font-bold text-blue-500 mb-4">
              Chat AI
            </h1>
            <textarea
              required
              className="border border-gray-300 rounded w-full my-2 p-3 min-h-fit transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown} // Call handleKeyDown on key press
              placeholder="Ask anything"
            ></textarea>
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-all duration-300 ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? "Generating..." : "Send"}
            </button>
          </form>

          {/* Answer display */}
          <div className="overflow-y-auto mt-4 p-2 h-64 bg-gray-100 rounded-md">
            <ReactMarkdown className="text-left">{answer}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
