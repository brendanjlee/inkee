import React from "react";
import { useState } from "react";  // react Hook for functional components
import CompoList from "./components/testComponent";
import NewGoal from "./components/NewGoal";

function TestPage() {
  // testing with props
  const goalsList = [{id: 'cg1', text: 'Finish CS 490'},
                    {id: 'cg2', text: 'Start STAT 417'}];

  // Create an initial state -> array of goals
  const [courseGoals, setCourseGoals] = useState([{id: 'cg1', text: 'Finish CS 490'},
                                                  {id: 'cg2', text: 'Start STAT 417'}]); // extract out of useState

  const addNewGoalHandler = (newGoal) => {
    //setCourseGoals(courseGoals.concat(newGoal)); // concats it to the list created by use state
    // you can do the same thing with a function (bulletproof appraoch)
    setCourseGoals((prevCourseGoals) => {
      return prevCourseGoals.concat(newGoal);
    })
  }

  return (
    <div>
      <div className='input'>
        <h3> Testing with input </h3>
        <NewGoal onAddGoal={addNewGoalHandler /* send in a pointer to addNewGoalHandler() */}/>
        <h3>Prop a list into page</h3>
        <CompoList stuff={courseGoals} />
      </div>
    </div>
  ); 
}

export default TestPage