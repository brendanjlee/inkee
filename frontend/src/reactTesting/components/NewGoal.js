import React from "react";
import { useState } from "react";

const NewGoal = (props) => {
  // let enteredText = ''; // This only sets a variable. Use states
  const [enteredText, setEnteredText] = useState('');

  // used for the event listener 
  const addGoalHandler = (event) => {
    event.preventDefault(); 
    
    // will get generated every time the form is submitted
    // How do we pass new goal into the parent component? -> callback from parent to child
    const newGoal = {
      id: Math.random().toString(),
      text: enteredText
    };    

    props.onAddGoal(newGoal); // executes the function pointed by onAddGoal()
    console.log(`@addGoalHandler: ${newGoal.id}`);

    setEnteredText('');
  }

  // For capturiing user input with the onChange() handler
  const textChangeHandler = event => {
    //enteredText = event.target.value;
    setEnteredText(event.target.value); // update the state
  };

  // add eventlisterns by onSomething
  // pass in a function (it just points to it for now)
  return (
    <form className='new-goal' onSubmit={addGoalHandler}>
      <input type='text' value={enteredText} onChange={textChangeHandler}/>
      <button type='submit'>Add Goal</button>
    </form>
  );
}

export default NewGoal 