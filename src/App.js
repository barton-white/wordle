import './App.css';
import {ReactComponent as DeleteIcon} from './backspace.svg';
import { useState, useEffect } from 'react';


function Row({string = false, turn, rowKey, answer, input}) {
  if(string){
    string = string.split('');
  }
  answer = answer.split('');
  if(turn === rowKey) {
    string = input.split('');
  }
  let currentRow = [];

  //function mapChars(char,index) {
  for(let i=0;i<5;i++) {
    let classes = ['cell'];
    if(turn > rowKey){
      if(answer[i] === string[i]){
        classes.push('right');
      } else if(answer.includes(string[i])){
        classes.push('almost');
      } else {
        classes.push('wrong');
      }
    }
    classes = classes.join(' ');
    currentRow.push(<span key={i} className={classes}>{string[i]}</span>);
  }
  //console.log(currentRow);
  return(
    <div className="row">
    {currentRow}
    </div>
  );
}

function Keyboard(theKeys, input){
  //let theKeys = 'qwertyuiop.asdfghjkl.zxcvbnm'.split('');
  //console.log(theKeys);
  theKeys = theKeys.theKeys;
  let keyMarkup = [];

  for(let i=0;i<theKeys.length;i++){
    if((theKeys[i] === '.')){
      keyMarkup.push(<br key={i} />);
    } else if (theKeys[i] === 'Delete'){
      keyMarkup.push(<button key={i} className="wide" value={theKeys[i]}><DeleteIcon /></button>);
    } else if (theKeys[i] === 'Enter'){
      keyMarkup.push(<button key={i} className="wide" value={theKeys[i]}><small>Enter</small></button>);
    } else  {
      keyMarkup.push(<button key={i} value={theKeys[i]}>{theKeys[i]}</button>);
    }
    
  }

  return <div className="keyboard">
    {keyMarkup}
  </div>
}


function App() {
  const[words,setWords] = useState(Array(6).fill(null));
  const[turns,setTurn] = useState(0);
  const[input,changeInput] = useState("");
  const[win,setWin] = useState(false);
  // const[words,setWords] = useState([input]);
  // const[turns,setTurn] = useState(0);
  const answer = 'farts';
  let theKeys = 'qwertyuiop.asdfghjkl.zxcvbnm'.split('');
  theKeys.splice(21,0,'Enter');
  theKeys.push('Delete');
  
  let theRows = [];

  for(let i=0;i<6;i++){
    let currentWord = (words[i])?words[i]:false;
    theRows.push(<Row string={currentWord} key={i} rowKey={i} turn={turns} answer={answer} input={input} />)
  }
  
  function handleInput(e){
    if(!win){
      if(e.key === "Backspace"){
        changeInput(input.substr(0,input.length-1));
      } else if(e.key === "Enter"){
        playWord();
      } else if (e.key.match(/^[a-z]$/)){
        if(input.length < 5){
          changeInput(input+e.key);
        }
      }
    }
    console.log(input);
  }

  useEffect(function(){
   document.body.onkeyup = handleInput;
  });

  function playWord(){
    if(input.length === 5){
      if(input === answer) setWin(true);
      setWords([...words.slice(0,turns),input]);
      setTurn(turns+1);
      changeInput('');
    }
  }

  return (
    <div className="App">
      <div className="main-container">{theRows}</div>
      <Keyboard theKeys={theKeys} />
    </div>
  );
}

export default App;
