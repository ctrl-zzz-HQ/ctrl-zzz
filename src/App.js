import './App.css';

function App() {

  const handlePasswordChange = function(e) {
    if (e.target.value === 'ctrl+zzz') {
      console.log('got password');
    }
  }

  return (
    <div className="App d-flex flex-column outer-container">
      <div className="d-flex flex-column password-container">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handlePasswordChange}/>
      </div>
    </div>
  );
}

export default App;
