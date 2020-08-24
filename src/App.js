import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api'


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(...repositories, response.data);
    })

  }, []);


  async function handleAddRepository() {
    await api.post('repositories', {
        title:`technology repositories ${Date.now()}`,
        url:"https://github.com/ataidelopes",
        techs:["Reactjs", "ReactNative", "Node", "Java" ]
    }).then(response =>{
      setRepositories([...repositories, response.data]);
    }).catch(() => {
      console.log('erro ao tentar inserir o repositorio');
    });
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(() =>{
      setRepositories([...repositories.filter(item => item.id !== id)]);
    }).catch(() =>{
      console.log('erro ao tentar remover o repositório');
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
