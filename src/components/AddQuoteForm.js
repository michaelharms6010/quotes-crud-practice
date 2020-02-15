import React, {useState} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {QuoteContext} from "../contexts/QuoteContext";

export default function AddQuoteForm() {
    const {quotes, setQuotes} = React.useContext(QuoteContext);
    const [newQuote, setNewQuote] = useState({
        quote: "",
        speaker: ""
    })

    const handleChange = e => {
        setNewQuote({
            ...newQuote,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post("https://quotes-db-mike.herokuapp.com/quotes", newQuote)
            .then(res => {
                setQuotes([...quotes, res.data[0]])
                setNewQuote({
                    quote: "",
                    speaker: ""
                })
            })
            .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                name="quote"
                value={newQuote.quote}
                onChange={handleChange} 
                placeholder="Quote"/>
            <input
                name="speaker"
                value={newQuote.speaker}
                onChange={handleChange} 
                placeholder="Speaker" />
            <button type="submit">Submit</button>
        </form>

    )


}