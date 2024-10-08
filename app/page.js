import axios from 'axios';
import { useState, useEffect } from 'react';

export default function BinLookup() {
  const [bin, setBin] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchBinData = async () => {
      const response = await axios.get(`/api/bin/${bin}`);
      setData(response.data);
    };
    fetchBinData();
  }, [bin]);

  const handleInputChange = (event) => {
    setBin(event.target.value);
  };

  return (
    <div>
      <h1>Bin Lookup</h1>
      <input type="text" value={bin} onChange={handleInputChange} />
      {data && (
        <div>
          <h2>Bin Data</h2>
          <p>Bank: {data.bank}</p>
          <p>Country: {data.country}</p>
          <p>Flag: {data.flag}</p>
          <p>Vendor: {data.vendor}</p>
          <p>Type: {data.type}</p>
          <p>Level: {data.level}</p>
          <p>Prepaid: {data.prepaid}</p>
        </div>
      )}
    </div>
  );
}
