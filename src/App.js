import './index.css';
import UserInfo from './UserInfo.js';
import Home from './Home.js';
import { useState } from 'react';
import { Routes, Route, useParams} from "react-router-dom";


const App = () => {

  const [inputText, setInputText] = useState(""); //state variables for input
  let {inputName} = useParams();

  return (
      <div className="App">
        <Routes>  
          <Route exact path="/" element={<Home inputText = {inputText} setInputText = {setInputText} inputName = {inputName}/>} />
          <Route path={`/users/:inputName`} element={<UserInfo inputName = {inputName}/>} />
        </Routes> 
      </div>
  );
}

export default App;
