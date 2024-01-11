import './Splash.css';

export default function Spash() {

  const handlePasswordChange = function(e) {
    if (e.target.value === 'ctrl+zzz') {
      console.log('got password');
    }
  }

  return (
    <div className="d-flex flex-column page-container">
      <div className="d-flex flex-column password-container">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handlePasswordChange}/>
      </div>
    </div>
  );
}
