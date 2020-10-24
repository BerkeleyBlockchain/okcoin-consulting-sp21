import logo from './logo.svg';
import './App.css';

function App() {

  const ethereum = window.ethereum;

  if (typeof ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  
    const getAccount = async () => {
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log(accounts[0]);
    }

    getAccount();
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
