import React, { useState } from 'react';

function Juego() {
  const [jugando, setJugando] = useState(false);
  const [tiempo, setTiempo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [activo1, setActivo1] = useState(false);
  const [activo2, setActivo2] = useState(false);
  const [activo3, setActivo3] = useState(false);
  const [top1, setTop1] = useState(0);
  const [left1, setLeft1] = useState(0);
  const [top2, setTop2] = useState(10);
  const [left2, setLeft2] = useState(50);
  const [top3, setTop3] = useState(25);
  const [left3, setLeft3] = useState(32);
  const [letra1, setLetra1] = useState("");
  const [letra2, setLetra2] = useState("");
  const [letra3, setLetra3] = useState("");
  const [array, setArray] = useState([]);


  


  const comenzar = () => {
    setJugando(true);
    setTimeout(() => {
      setActivo1(true);
      let arr = []
      let l1 = String.fromCharCode(Math.random() * (91 - 65) + 65)
      setLetra1(l1)
      setActivo2(true);
      let l2 = String.fromCharCode(Math.random() * (91 - 65) + 65)
      setLetra2(l2);
      setActivo3(true);
      let l3 = String.fromCharCode(Math.random() * (91 - 65) + 65)
      setLetra3(l3);
      arr.push(l1,l2,l3)
      arr.sort()
      setArray(arr)
      setTop1(Math.floor(Math.random() * 101));
      setLeft1(Math.floor(Math.random() * 101));
      setTop2(Math.floor(Math.random() * 101));
      setLeft2(Math.floor(Math.random() * 101));
      setTop3(Math.floor(Math.random() * 101));
      setLeft3(Math.floor(Math.random() * 101));
      setTiempo(performance.now());
    }, Math.floor(Math.random() * 5000) + 1000);
  };



  const cliqueado1 = () => {
    let timer = performance.now() - tiempo;

    if(  array[0] == letra1   )
    {
        array.shift()
        setActivo1(false);
    }
    
    
    if(!activo2 && !activo3){
        setResultado(`Tardaste ${timer} milisegundos en hacer clic. top=${top1} left=${left1}`);
        setJugando(false);
    }
    
  };

  const cliqueado2 = () => {
    let timer = performance.now() - tiempo;
    if(array[0] == letra2){
        array.shift()
        setActivo2(false);
    }
    
    if(!activo1 && !activo3){
        setResultado(`Tardaste ${timer} milisegundos en hacer clic. top=${top2} left=${left2}`);
        setJugando(false);
    }
  };

  const cliqueado3 = () => {
    let timer = performance.now() - tiempo;
    if(array[0] == letra3){
        array.shift()
        setActivo3(false);
    }
    
    if(!activo1 && !activo2){
        setResultado(`Tardaste ${timer} milisegundos en hacer clic. top=${top3} left=${left3}`);
        setJugando(false);
    }
  };


  return (
    <div>
      {!jugando &&
        (<button onClick={comenzar}>Comenzar</button>)
      }
      {activo1 &&
        (<button name={`${letra1}`} style={{position: 'absolute', top: `${top1}%`, left:`${left1}%` }} onClick={cliqueado1}>{letra1}</button>)
      }
      {
          activo2 &&
          (<button name={`${letra2}`} style={{position: 'absolute', top: `${top2}%`, left:`${left2}%` }} onClick={cliqueado2}>{letra2}</button>)
      }
      {
          activo3 &&
          (<button name={`${letra3}`}  style={{position: 'absolute', top: `${top3}%`, left:`${left3}%` }} onClick={cliqueado3}>{letra3}</button>)

      }
      {resultado && (<p>{resultado}</p>)}
    </div>
  );
}
export default Juego;
