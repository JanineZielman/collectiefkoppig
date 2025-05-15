import { useState } from 'react';

const NewsletterSignup = () => {
  const [status, setStatus] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get("EmailAddress")
  
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
  
      if (response.ok) {
        setStatus("success")
      } else {
        const error = await response.json()
        console.error("Error:", error)
        setStatus("error")
      }
    } catch (error) {
      console.error("Network error:", error)
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        name="EmailAddress"
        placeholder="Jouw e-mailadres"
        required
        className="input"
      />
      <button type="submit" className="button" disabled={status === 'loading'}>
        {status === 'loading' ? 'Aanmelden...' : 'Aanmelden'}
      </button>

      {status === 'success' && <p className="success">Je bent aangemeld!</p>}
      {status === 'error' && <p className="error">Er ging iets mis. Probeer opnieuw.</p>}
    </form>
  );
};

export default NewsletterSignup;
