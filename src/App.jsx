import React, { useState } from 'react';
import './App.css'


function App() {

  const [cardList, setCardList] = useState(
    [
      { id: 1, order: 3, text: 'Каточка номер 3' },
      { id: 2, order: 1, text: 'Каточка номер 1' },
      { id: 3, order: 2, text: 'Каточка номер 2' },
      { id: 4, order: 4, text: 'Каточка номер 4' },
    ]
  )


  const [current, setCurrent] = useState(null)

  function dragStartHandler(e, card) {
    setCurrent(card)
  }

  function dragEndHandler(e, card) {
    e.target.style.backgroundColor = 'white'
  }

  function dragOverHandler(e, card) {
    e.preventDefault();
    e.target.style.backgroundColor = 'red'
  }

  function dragHandler(e, card) {
    e.preventDefault();
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: current.order }
      }
      if (c.id === current.id) {
        return { ...c, order: card.order }
      }
      return c
    }));
    e.target.style.backgroundColor = 'white'
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    }
    else {
      return -1
    }
  }


  return (
    <div className="app">
      {
        cardList.sort(sortCards).map(card => (
          <div
            onDragStart={e => dragStartHandler(e, card)}
            onDragLeave={e => dragEndHandler(e, card)}
            onDragEnd={e => dragEndHandler(e, card)}
            onDragOver={e => dragOverHandler(e, card)}
            onDrop={e => dragHandler(e, card)}
            draggable={true}
            className="card">
            {card.text}
          </div>
        ))
      }
    </div>
  );
}

export default App;
