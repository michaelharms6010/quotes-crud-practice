import React, {useState, useEffect, useContext} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { QuoteContext} from "../contexts/QuoteContext";
import AddQuoteForm from "./AddQuoteForm";

export default function QuotesList () {
    const { quotes, setQuotes } = useContext(QuoteContext);
    const [editing, setEditing] = useState(0);
    const [edited, setEdited] = useState({
        speaker: "",
        quote: ""
    })



    useEffect( _ => {
        axiosWithAuth().get("https://quotes-db-mike.herokuapp.com/quotes")
            .then(res => setQuotes(res.data))
            .catch(err => console.log(err))

    }, [])

    const toggleEdit = quote => {
        if (editing !== quote.id) {
            setEdited(quote)
            setEditing(quote.id)
        } else {

            axiosWithAuth().put(`https://quotes-db-mike.herokuapp.com/quotes/${quote.id}`, edited)
                .then(res => {
                    setQuotes([...quotes.filter(item => item.id !== quote.id), res.data])
                    setEditing(0);
                })
                .catch(err=> console.log(err))
            
        }
    }

    const handleChange = e => setEdited({...edited, [e.target.name]: e.target.value});


    const deleteQuote = id => {
        axiosWithAuth().delete(`https://quotes-db-mike.herokuapp.com/quotes/${id}`)
            .then(res => setQuotes(quotes.filter(item => item.id !== id)))
            .catch(err => console.log(err));
    } 


    return(
        <div className="quotes-list">
            {quotes.sort((a,b) => a.id-b.id ).map(item => {
                return (
                
                
                    
                <div className="quote-card" key={item.id}>
                    {editing === item.id 
                    ?  <>
                        <input 
                            name="speaker"
                            value={edited.speaker}
                            onChange={handleChange} />
                        <input 
                            name="quote"
                            value={edited.quote}
                            onChange={handleChange} />
                    </>
                    : <>
                        <h3>{item.speaker}</h3>
                        <p>{item.quote}</p> 
                    </>}
                    <button onClick={_ => toggleEdit(item)}>{editing===item.id ? "Submit": "Edit Quote"} </button>
                    <button onClick={ _ => deleteQuote(item.id)}>Delete Quote</button>
                </div>
               
            )
            })}
            <AddQuoteForm />
        </div>

    )
}