import React, { useState, useEffect, useMemo, useCallback } from 'react';
import List from "./oldcomponents/list"
import Example from "./oldcomponents/example"
import './App.css';

function App() {
  const [championList, setChampionList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const list = localStorage.getItem('champions');
    if (list) {
      setChampionList(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    if (setChampionList.length) {
      localStorage.setItem('champions', JSON.stringify(championList));
    }
  }, [championList]);

  const callGoogle = useEffect(() => {
    async function funcao() {
      const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      const data = await response.json()
      return data
    }
    funcao().then(res => {
      console.log(res)
    })
  }, [])

  const conta = useMemo(() => {
    return Math.random()
  }, [])

  function onSubmit(e) {
    e.preventDefault();
    setChampionList([...championList, name]);
    setName('');
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
      {championList.map(champion => (
        <List name={champion} />
      ))}
      <Example name="teste" />
      {conta}
      {callGoogle}
    </div>
  );
}

export default App;
