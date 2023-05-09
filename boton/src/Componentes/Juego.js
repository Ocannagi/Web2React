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
  let array = []


  const comenzar = () => {
    setJugando(true);
    setTimeout(() => {
      setActivo1(true);
      let l1 = Math.random() * (91 - 65) + 65
      setLetra1(String.fromCharCode(l1))
      setActivo2(true);
      let l2 = Math.random() * (91 - 65) + 65
      setLetra2(String.fromCharCode(l2));
      setActivo3(true);
      let l3 = Math.random() * (91 - 65) + 65
      setLetra3(String.fromCharCode(l3));

      array.push(l1)
      array.push(l2)
      array.push(l3)
      array.sort()
      console.log(array)


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
    if(  array[0] == l1   )
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
    if(array[0] == l2){
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
    if(array[0] == l3){
        array.shift()
        setActivo2(false);
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
        (<button  style={{position: 'absolute', top: `${top1}%`, left:`${left1}%` }} onClick={cliqueado1}>{letra1}</button>)
      }
      {
          activo2 &&
          (<button  style={{position: 'absolute', top: `${top2}%`, left:`${left2}%` }} onClick={cliqueado2}>{letra2}</button>)
      }
      {
          activo3 &&
          (<button  style={{position: 'absolute', top: `${top3}%`, left:`${left3}%` }} onClick={cliqueado3}>{letra3}</button>)
      }
      {resultado && (<p>{resultado}</p>)}
    </div>
  );
}
export default Juego;
