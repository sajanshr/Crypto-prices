import './Crypto.css';
import React, {useState, useEffect} from 'react';

const CRYPTO_PRICES_API_BASE_URL = 
'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10';


function Crypto() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    const url = new URL(CRYPTO_PRICES_API_BASE_URL);
    url.searchParams.set('page', page);
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      const coinData = {
        hasNext: data.length === 10,
        coins: data.map(coin => ({
          name: coin.name,
          price: coin.current_price,
          marketCap: coin.market_cap
        }))
      };
      const {coins, hasNext} = coinData;
      setCoins(coins);
      setHasNext(hasNext); 
    })
    .catch(error => {
      console.log('Error fetching crypto data:', error);
    });
  };
  fetchData();
}, [page]);

  return (
    <>
      <table>
        <caption>Cypto Prices</caption>
        <thead>
          <tr>
          <th scope='col'>Coin</th>
          <th scope='col'>Prices</th>
          <th scope='col'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.name}>
              <th scope='row'>{coin.name}</th>
              <td>{coin.price}</td>
              <td>{coin.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button disabled={page <= 0} onClick={() => setPage(page - 1)}>
        Back
      </button>

      <button disabled={!hasNext} onClick={() => setPage(page + 1)}>
        Next
      </button>

    </>
  );
}

export default Crypto;
