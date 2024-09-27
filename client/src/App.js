import React, { useState } from 'react'
import "./App.css"
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});


const App = () => {
  const [formData, setFormData] = useState({language: "", message: ""});
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false); 
  const [translation, setTranslation] = useState('Translated Text');



  const translate = async () => {
    const { language, message } = formData;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Translate this into ${language}: ${message}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
  });

    const translatedText = response.choices[0].message.content;
    console.log(translatedText);
    setTranslation(translatedText);

  }


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
    console.log(formData);
    setError('');
  }

  const handleOnSubmit = (e) => {

    e.preventDefault(); 

    if (!formData.message) {
      setError('Please Enter Text');
      return; 
    } else if (!formData.language){
      setError('Please Select a Language');
      return; 
    }
    translate();
  }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(translation)
    .then( () => displayNotification())
    .catch((err) => console.error("failed to copy:", err));
  }

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);

    }, 3000);
  }

  return (
    <div className = "container">

      <h1>TranslateNow</h1>

      <form onSubmit = {handleOnSubmit}>
        <div className='choices'>

          <div className="langLabel">
            <label htmlFor="languages">Select Language: </label>
          </div>
          

          <div className="customSelect">
            <input list ="languageslist" name = "language" id="languages" onChange={handleInputChange} />
            <datalist id = "languageslist" className="customDatalist">
              <option value="">Select a language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Chinese (Simplified)">Chinese (Simplified)</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Bengali">Bengali</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Ukranian">Ukranian</option>
              <option value="Urdu">Urdu</option>
              <option value="Turkish">Turkish</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Italian">Italian</option>
              <option value="Thai">Thai</option>
              <option value="Dutch">Dutch</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Persian (Farsi)">Persian (Farsi)</option>
              <option value="Polish">Polish</option>
              <option value="Filipino (Tagalog)">Filipino (Tagalog)</option>
              <option value="Swahili">Swahili</option>
              <option value="Greek">Greek</option>
              <option value="Romanian">Romanian</option>

            </datalist>
          </div>

        </div>

        <textarea name = "message" placeholder="Type your message here" onChange={handleInputChange}></textarea>

        { error && <div className="error">{error}</div>}

        <button type='submit'>Translate</button>

      </form>

      <div className="translation">
        <div className="copy-btn" onClick={handleCopy}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>

        </div>
        {translation}
        </div>

      <div className={`notification ${showNotification ? "active" : ""}`}>
        Copied to clipboard!
      </div>

    </div>
  );
};

export default App
