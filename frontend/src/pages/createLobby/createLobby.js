import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// Components
import CreateHeader from "../header/header";
import './createLobby.css'

function CreateLobby() {
  return (
    <div className='root'>
      <CreateHeader />
      <div className='content'>
        <h2>Lobby</h2>
        <form className='lobby-creation-div' action='http://localhost:3000/games' method='POST'>
          <div className="form-group">
              <label for="numRounds">Rounds:</label>
              <select id="numRounds" name="numRounds">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
          </div> 
          <div className="form-group">
            <label for="drawingTime">Drawing Time:</label>
            <select id="drawingTime" name="drawingTime">
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">70</option>
              <option value="90">70</option>
              <option value="120">70</option>
              <option value="180">70</option>
            </select>
          </div>
          <div className='wordlist-container'>
            <h2>Word List Placeholder</h2>
          </div> 
          <Link to='/prestartLobby'>
              <Button variant='primary'>Start Game</Button>{' '}
            </Link>
            <button>send</button>
        </form>
      </div>
    </div>
  );
}

export default CreateLobby