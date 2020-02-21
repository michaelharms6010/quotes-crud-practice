import React, { useState, useContext } from "react";
import QuoteContext from "../contexts/QuoteContext";
import axios from "axios";

export default function QuoteCard({ quote }) {
  const { quotes, setQuotes } = useContext(QuoteContext);

  //enable editing here. start with a local state to build a new object

  const [editedQuote, setEditedQuote] = useState({ quote: "", speaker: "" });

  const toggleEdit = quote => {
    if (editedQuote.quote) {
      //put request
      axios
        .put(
          `https://quotes-db-mike.herokuapp.com/quotes/${quote.id}`,
          editedQuote
        )
        .then(res => {
          setQuotes([
            ...quotes.filter(item => item.id !== editedQuote.id),
            editedQuote
          ]);
          setEditedQuote({ quote: "", speaker: "" });
        })
        .catch(err => console.log(err));
    } else {
      setEditedQuote(quote);
    }
  };

  const handleChange = e =>
    setEditedQuote({ ...editedQuote, [e.target.name]: e.target.value });

  return (
    <div className="quote-card">
      {editedQuote.quote ? (
        <>
          <textarea
            onChange={handleChange}
            value={editedQuote.quote}
            name="quote"
          />
          <input
            onChange={handleChange}
            value={editedQuote.speaker}
            name="speaker"
          />
        </>
      ) : (
        <>
          <p>{quote.quote}</p>
          <h3>{quote.speaker}</h3>
        </>
      )}
      <button onClick={_ => toggleEdit(quote)}>Edit</button>
    </div>
  );
}
