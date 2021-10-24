import React, { useEffect, useState } from 'react';
import { useWallets } from '../../hooks/wallets';

// import { Container } from './styles';

const Home: React.FC = () => {
  const {
    wallets,
    createWallet,
    selectedWallet,
    selectWallet,
    createAccount,
    createTransaction,
    deleteTransaction,
  } = useWallets();

  useEffect(() => {
    createWallet({
      name: "CARTEIRA",
    });
  }, []);

  useEffect(() => {
    console.log(wallets);
    !selectedWallet.id && wallets[0] && selectWallet(wallets[0]);
  }, [wallets]);

  useEffect(() => {
    selectedWallet.id && !selectedWallet.accounts[0] && createAccount({
      balance: 200,
      name: "CONTA",
    });
    console.log(wallets);
  }, [selectedWallet])

  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountId, setAccountId] = useState("");

  return (
    <div>
      <input placeholder="name" value={name} onChange={event => setName(event.target.value)} />
      <input placeholder="balance" value={balance} type="number" onChange={event => setBalance(Number(event.target.value))} />
      <button type="button" onClick={() => createTransaction(selectedWallet.accounts[0].id, {
        date: new Date(),
        group: "",
        type: 'income',
        value: balance,
      })}>submit</button>

      {
        wallets ? wallets.map(wallet =>
          (
            <p key={wallet.id} onClick={() => selectWallet(wallet)}>
              {wallet.name} - {wallet.currentBalance}
            </p>
          )) : (<></>)
      }

      <p style={{ marginTop: "20px" }}>selected: {selectedWallet.name} - {selectedWallet.currentBalance}</p>
      {selectedWallet.accounts && selectedWallet.accounts.map(account => (<p onClick={() => setAccountId(account.id)}>------------- {account.name} - {account.balance}<br/>{account.transactions.map(transaction => <p onClick={() => deleteTransaction(account.id, transaction.id)}>--------------------------{transaction.type} - {transaction.value}</p>)}</p>))}

    </div>
  );
}

export default Home;