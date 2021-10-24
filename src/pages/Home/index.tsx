import React, { useEffect, useState } from 'react';
import { useWallets } from '../../hooks/wallets';

// import { Container } from './styles';

const Home: React.FC = () => {
  const {
    wallets,
    createWallet,
    deleteWallet,
    selectedWallet,
    selectWallet,
    createAccount,
    deleteAccount,
  } = useWallets();

  useEffect(() => {
    console.log(wallets);
  }, [wallets]);

  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <div>
      <input placeholder="name" value={name} onChange={event => setName(event.target.value)} />
      <input placeholder="balance" value={balance} type="number" onChange={event => setBalance(Number(event.target.value))} />
      <button type="button" onClick={() => createWallet({
        name
      })}>submit</button>
      
      <input placeholder="name" value={name} onChange={event => setName(event.target.value)} />
      <input placeholder="balance" value={balance} type="number" onChange={event => setBalance(Number(event.target.value))} />
      <button type="button" onClick={() => createAccount({
        name,
        balance
      })}>submit</button>

      {
        wallets ? wallets.map(wallet =>
          (
            <p key={wallet.id} onClick={() => selectWallet(wallet)}>
              {wallet.name} - {wallet.currentBalance}<br/>
              {wallet.accounts.map(account => <p>------ {account.name} - {account.balance}</p>)}
            </p>
          )) : (<></>)
      }

      <p style={{ marginTop: "20px" }}>selected: {selectedWallet.name} - {selectedWallet.currentBalance}</p>
      {selectedWallet.accounts && selectedWallet.accounts.map(account => (<p>------------- {account.name} - {account.balance}</p>))}

    </div>
  );
}

export default Home;