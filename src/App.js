import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {Button, Card, CardHeader} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [hasMetamask, setHasMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setHasMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatUnits(balance);

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  }

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHasMetamask(false);
      } else {
        setHasMetamask(true);
      }
      await checkMetamaskAvailability();
    }
  }, [])

  return (
    <div className="App">
      {/* Calling all values which we
       have stored in usestate */}

      <Card className="text-center">
        <Card.Header>
          <strong>Address: </strong>
          {accountAddress}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {accountBalance}
          </Card.Text>
          <Button
            onClick={connectWallet}
            variant="primary"
          >
            Connect to wallet
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
