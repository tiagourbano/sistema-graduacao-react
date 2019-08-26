import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../history';

// import { Container } from './styles';

export default function Blows({ match }) {
  const [blows, setBlows] = useState({
    description: '',
    belt: {
      name: null
    }
  });

  useEffect(() => {
    async function getBlows() {
      try {
        const blowsResponse = await api.get('/blows/' + match.params.faixaId);

        if (blowsResponse.data === "") {
          history.push('/faixas');
        } else {
          setBlows(blowsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getBlows();
  }, [match.params.faixaId]);

  return (
    <div className="Blows">
      <h1>Golpes</h1>
      <h3>{blows.belt.name}</h3>
      <div>
        {
          blows.description.split('\r\n\r\n').map((blow, id) => <span key={id}>{blow}<br /><br /></span>)
        }
      </div>

      <h3>Vídeos:</h3>
      <iframe
        title={blows.belt.name}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/wWuoxubOqJU"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  );
}
