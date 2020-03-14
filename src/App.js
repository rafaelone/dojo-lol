import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [names, setNames] = useState([]);
  const [champs, setChamps] = useState([]);
  const [textContents, setTextContents] = useState([]);
  const [results, setResults] = useState([])

  function getNames(arrayNames) {
    const maxLength = arrayNames.length;
    const nomesAleatorios = [];

    for (let i = 0; i < 3; i++) {
      const indexAleatorio = Math.floor(Math.random() * maxLength);
      nomesAleatorios.push(arrayNames[indexAleatorio]);
    }
    return nomesAleatorios;
  }

  function removeAnswer(answer) {
    const letters = answer.split("");
    let response = champs.toUpperCase()
    letters.forEach(letter => {
      response = response.replace(letter, "")
    })
    setChamps(response)
    const position = names.map(name => name.toUpperCase()).indexOf(answer)

    names.splice(position, 1)

    // console.log(names.slice(names.indexOf(answer), 1))
    setNames(names)
    // console.log(names)
    setTextContents("")
    setResults([...results, answer[0] + answer.substr(1).toLowerCase()])
  }

  function shuffle(s) {
    const n = s.length; // Length of the array

    for (let i = 0; i < n - 1; ++i) {
      const j = Math.floor(Math.random() * n); // Get random of [0, n-1]

      const temp = s[i]; // Swap s[i] and s[j]
      s[i] = s[j];
      s[j] = temp;
    }

    const result = s.join(''); // Convert Array to string
    return result; // Return shuffled string
    // Return shuffled string
  }

  function concatNames(names) {
    const concat = names.join('').split('');
    const indexAleatorio = Math.floor(Math.random() * concat.length);

    // console.log(`concat`)
    console.log(concat);
    const embaralhado = shuffle(concat);
    console.log(embaralhado);
    return embaralhado;
  }

  useEffect(() => {
    async function allChampions() {
      const champions = await fetch(`${api}/data/pt_BR/champion.json`);
      const resp = await champions.json();
      setList([...list, resp.data]);
    }
    allChampions();
  }, []);

  useEffect(() => {
    if (list.length) {
      const keys = Object.keys(list[0]);
      const searchNames = getNames(keys);
      setNames(searchNames);
      const embaralha = concatNames(searchNames);
      setChamps(embaralha);

    }
  }, [list]);

  console.log(results)
  console.log(names)
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(names)
          if (
            names
              .map(name => name.toUpperCase())
              .includes(textContents.toUpperCase())
          )
            removeAnswer(textContents.toUpperCase())
          else console.log('nome nao encontrado');
          // getImages()
        }}
      >
        <p style={{ color: 'white' }}>
          {champs.length ? champs.toUpperCase() : 'Parabains'}
        </p>
        <input
          type="text"
          id="textInout"
          onInput={e => {
            setTextContents(e.target.value);
          }}
          value={textContents}
        />
      </form>
      <ul>
        {
          results.map(nome => {
            return (
              <li>
                <img src={`${api}/img/champion/${nome}.png`} />
                <p>{nome}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
