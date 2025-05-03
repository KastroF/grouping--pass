
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const emailFromUrl = decodeURIComponent(path.slice(1)); // Supprime le premier "/" et décode
    setEmail(emailFromUrl);

    console.log("l'email", emailFromUrl)

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      setTimeout(() => setMessage(""), 8000);
      return;
    }

    try {
      // Exemple d'envoi vers ton serveur (à adapter à ton backend)
      const res = await fetch("https://grouping.glitch.me/api/user/updateemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Mot de passe mis à jour avec succès !");
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage("❌ Erreur : " + data.message);
      }
    } catch (err) {
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Nouveau mot de passe</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Confirmer le mot de passe</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: 10, boxSizing: "border-box", 
        backgroundColor: "rgb(24, 61, 135)", border: "none", color: "#fff", width: '100%' }}>Envoyer</button>
      </form>
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
}

export default App;
