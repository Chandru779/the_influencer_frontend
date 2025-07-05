"use client";
import { useEffect, useState } from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSubmit = async () => {
    if (inputText.trim()) {
      try {
        const response = await fetch("http://localhost:4000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        });

        const details = await response.json();
        if (details.status == 201) {
          setInputText("");
          setNotes([details.data, ...notes]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/notes");
        const data = await response.json();
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="h-screen md:w-[40%] md:mx-auto relative flex flex-col gap-3">
      <div className="flex flex-shrink-0 h-16 items-center border border-gray-100">
        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <BsEmojiSmile size={24} className="text-[#03045e]" />
        </button>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value.slice(0, 100))}
          className="flex-grow rounded-lg resize-none focus:outline-none flex items-center placeholder:text-gray-400 "
          placeholder="Drop short and true fact ..."
          maxLength={100}
          rows={1}
        />

        <button
          onClick={handleSubmit}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <GrSend size={24} className="text-[#03045e]" />
        </button>

        {showEmojis && (
          <div className="absolute top-full mt-2 left-0 bg-white border rounded-lg p-2 shadow-lg">
            <div className="flex gap-2">
              {"🚀 ⭐ 🎉 👍 ❤️ 💫".split(" ").map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText((prev) => prev + emoji);
                    setShowEmojis(false);
                  }}
                  className="hover:bg-gray-100 p-2 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-full relative overflow-y-auto">
        <section className="h-full absolute overflow-y-auto flex flex-col gap-2 px-2 py-1">
          {notes?.length > 0 &&
            notes.map((note) => (
              <div key={note._id} className="p-4 rounded-lg shadow-lg">
                <p className="text-lg mb-4">{note.text}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 hover:text-blue-500">
                    <FaArrowCircleUp size={20} />
                    <span>Upvote</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-red-500">
                    <FaArrowCircleDown size={20} />
                    <span>Downvote</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-yellow-500">
                    <IoWarning size={20} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
