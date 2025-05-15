import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // success | error | loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        'https://emailoctopus.com/api/1.6/lists/aeec21a4-2b45-11f0-bb95-6f11fbd0eac1/members',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: 'eo_fe72670eae0f6cbda06b4935d8e7f4d6c2ee65ec4e996bafdb2f600abd1e3c0a',
            email_address: email,
            tags: ['newsletter'],
            status: 'SUBSCRIBED',
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        console.error('Error:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Request failed:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        placeholder="Jouw e-mailadres"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
