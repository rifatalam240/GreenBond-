import React from "react";
import { Typewriter } from "react-simple-typewriter";

const quotes = [
  {
    text: "To plant a garden is to believe in tomorrow.",
    author: "Audrey Hepburn",
  },
  {
    text: "The love of gardening is a seed once sown that never dies.",
    author: "Gertrude Jekyll",
  },
  {
    text: "Gardening adds years to your life and life to your years.",
    author: "Unknown",
  },
  {
    text: "A society grows great when old men plant trees whose shade they know they shall never sit in.",
    author: "Greek Proverb",
  },
  {
    text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.",
    author: "Alfred Austin",
  },
  {
    text: "He who plants a tree plants hope And nurtures a future where life may groww",

    author: "Lucy Larcom",
  },
];

const GardeningQuotes = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-6 text-left text-green-700">🌼 Gardening <span className="text-red-800">Quotes</span></h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote, idx) => (
          <div
            key={idx}
            className="card bg-green-50 shadow border border-green-100 max-w-xl mx-auto"
          >
            <div className="card-body items-center text-center">
              <blockquote className="italic text-lg mb-2 text-green-500 min-h-[60px]">
                <Typewriter
                  words={[quote.text, quote.text]}
                  cursor
                  cursorStyle="|"
                  typeSpeed={40}
                  deleteSpeed={30}
                  delaySpeed={2000}
                />
              </blockquote>
              <span className="text-green-700 font-semibold">
                — {quote.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardeningQuotes;
