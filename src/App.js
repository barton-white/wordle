import './App.css';
import {ReactComponent as DeleteIcon} from './backspace.svg';
import { useState, useEffect } from 'react';
const Answers = require('./answers.json');
//const index = Math.floor(Answers.answers.length*Math.random());
const date = new Date();
let index = Number(String(date.getFullYear()+(date.getMonth()+1) + date.getDay()))%Answers.answers.length;

// fetch('./dictionaries/a-processed.json')
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

function Row({string = false, turn, rowKey, answer, input, status, }) {
  let myClass = 'row';
  const current = (turn === rowKey);

  if(current) {
    myClass += ' current';
    if(status === 'wrong') {
      myClass += ' row_wrong';
    } else if(status === 'win'){
      myClass += ' row_anim';
    }
  }
  if(turn - 1=== rowKey && status === 'valid'){
    myClass += ' row_anim';
  }
  
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
    if(turn > rowKey || (current && status === 'win')){
      if(answer[i] === string[i]){
        classes.push('right');
      } else if(answer.includes(string[i])){
        let currentClass = checkAlmost(answer,string,string[i],i);

        classes.push(currentClass);
      } else {
        classes.push('wrong');
      }
    }

    // if(!string[i] in prevKeys){
    //    prevKeys[string[i]] = classes[1];
    // }
   
    classes = classes.join(' ');

    currentRow.push(<span key={i} className={classes}>{string[i]}</span>);
  }
  //console.log(currentRow);
  return(
    <div className={myClass}>
    {currentRow}
    </div>
  );
}

function letterCount(arr){
  let output = arr.reduce(function(a,b){
    return(
      a[b] ? a[b]++ : (a[b]=1),
      a
    );
  },{});
  return output;
}
function checkAlmost(ans,inp,letter,num){
  let answerCount = letterCount(ans);
  let inputCount = letterCount(inp);
  let currentClass = 'almost';
  let correctIndex = false;
  for(let i=0;i<5;i++){
    if(ans[i] === inp[i]) correctIndex = i;
  }
  let wrongSpot = (num > correctIndex || num < correctIndex);
  
  if(inputCount[letter] - answerCount[letter] === 1){
    if(wrongSpot && num === inp.lastIndexOf(letter)) currentClass = 'wrong';
  } else if(inputCount[letter] - answerCount[letter] === 2){
    if(wrongSpot && num !== ans.indexOf(letter)) currentClass = 'wrong';
  }

  return currentClass;
}

function Keyboard({prevKeys, handleInput, answerStatus}){
  let theKeys = 'qwertyuiop.asdfghjkl.zxcvbnm'.toUpperCase().split('');
  theKeys.splice(21,0,'Enter');
  theKeys.push('Delete');

  //theKeys = theKeys.theKeys;
  let keyMarkup = [];

  for(let i=0;i<theKeys.length;i++){
    if((theKeys[i] === '.')){
      keyMarkup.push(<br key={i} />);
    } else if (theKeys[i] === 'Delete'){
      keyMarkup.push(<button key={i} onClick={() => handleInput(false,'Backspace')} className="wide" value={theKeys[i]}><DeleteIcon /></button>);
    } else if (theKeys[i] === 'Enter'){
      keyMarkup.push(<button key={i} className="wide" onClick={() => handleInput(false,'Enter')} value={theKeys[i]}><small>Enter</small></button>);
    } else  {
      let currentState = '';
      //console.log(prevKeys);
      if(theKeys[i] in prevKeys) currentState = prevKeys[theKeys[i]];
      keyMarkup.push(<button key={i} onClick={() => handleInput(false,theKeys[i])} className={currentState} value={theKeys[i]}>{theKeys[i]}</button>);
    }
    
  }

  return <div className="keyboard">
    {keyMarkup}
  </div>
}
async function getDict(letter){
  const url = './dictionaries/'+letter+'-processed.json';
 // console.log(url)
  try{
    let data = await fetch(url);
    return await data.json();
  } catch(e){
    console.log(e);
  }
}

function App() {
  const[words,setWords] = useState(Array(6).fill(null));
  const[turns,setTurn] = useState(0);
  const[input,changeInput] = useState("");
  const[answerStatus,setAnswerStatus] = useState('normal');
  const[prevKeys,setPrevKeys] = useState({});

  const answer = Answers.answers[index];
 
  let theRows = [];

  for(let i=0;i<6;i++){
    let currentWord = (words[i])?words[i]:false;
    theRows.push(<Row string={currentWord} key={i} rowKey={i} turn={turns} answer={answer} input={input} status={answerStatus} setPrevKeys={(k,c) => setPrevKeys(prevKeys[k] = c)}/>)
  }
  
  async function handleInput(e,manual=false){
    console.log(manual);
    let theKey = (!manual)?e.key:manual;
    if(answerStatus === 'normal' || answerStatus === 'wrong'){
      if(theKey === "Backspace"){
        changeInput(input.substr(0,input.length-1));
      } else if(theKey === "Enter"){
        await playWord();
      } else if (theKey.match(/^[a-zA-Z]$/)){
        if(input.length < 5){
          changeInput(input+theKey.toUpperCase());
        }
      }
    }
    //console.log(input);
  }

  useEffect(function(){
   document.body.onkeyup = handleInput;
  });

  async function playWord(){
    //console.log("R" in prevKeys);
    if(input.length === 5){
      if(input === answer){
        setAnswerStatus('win');
        
      } else {
        let firstLetter = input.charAt(0);
        setAnswerStatus('freeze');
        let dict = await getDict(firstLetter);

        //spellcheck
        let wrong = true;
        console.log(input);
        if(input.charAt(0) in dict === true){
          //console.log('1');
          if(input.charAt(1) in dict[input.charAt(0)] === true) {
            //console.log('2');
            if(input.charAt(2) in dict[input.charAt(0)][input.charAt(1)] === true) {
              //console.log('3');
              if(input.charAt(3) in dict[input.charAt(0)][input.charAt(1)][input.charAt(2)] === true) {
                //console.log('4');
                if(input.charAt(4) in dict[input.charAt(0)][input.charAt(1)][input.charAt(2)][input.charAt(3)] === true){
                  //console.log('5');
                  wrong = false;
                  //setAnswerStatus('normal');
                  //if is word
                  setWords([...words.slice(0,turns),input]);
                  setTurn(turns+1);
                  setPrevKeys(function(prevKeys){
                    let splitInput = input.split('');
                    let splitAnswer = answer.split('');

                    for(let i=0;i<5;i++){
                      if(splitInput[i] in prevKeys === false || prevKeys[splitInput[i]] === 'almost'){
                        let status = 'wrong';
                        if(splitAnswer.indexOf(splitInput[i]) === i){
                          status = 'right';
                        } else if(splitAnswer.includes(splitInput[i])){
                          status = checkAlmost(splitAnswer,splitInput,splitInput[i],i);
                        }
                        prevKeys[splitInput[i]] = status;
                      }
                    }

                    return prevKeys;
                  });
                  changeInput('');
                }
              }
            }
          }
        } //end spell check

        if(wrong){
          setAnswerStatus('wrong');
        } else {
          
          setAnswerStatus('valid')
        }
        setTimeout(function(){
          setAnswerStatus('normal');
        },(wrong)?800:1800);
        
      }
    }
  }

  return (
    <div className={"App "+ answerStatus}>
      <div className="main-container">{theRows}</div>
      <Keyboard prevKeys={prevKeys} handleInput={handleInput} answerStatus={answerStatus} />
    </div>
  );
}

export default App;
