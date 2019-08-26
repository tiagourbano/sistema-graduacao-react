import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// import './index.scss';

export default function Belts() {
  const [belts, setBelts] = useState([]);

  useEffect(() => {
    async function getBelts() {
      try {
        const belts = await api.get('/belts');
        setBelts(belts.data);
      } catch (error) {
        console.error(error);
      }
    }

    getBelts();
  }, []);

  return (
    <div className="Belts">
      <h1>Faixas</h1>
      <div>
        <ul>
          {
            belts.map((belt, key) =>
              <li key={key}>
                <Link to={`/golpes/${belt._id}`}>{belt.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
}
