import './index.css';
import { useNavigate } from 'react-router-dom';

const Home = ({inputText, setInputText}) => {

    const navigate = useNavigate(); //effect for navigation

    const handleClick = () => { //event handler for clicking on the wrapper
        if (inputText) { 
            navigate(`/users/${inputText}`); //navigate to searched repo (show skeleton first, then the actual thing when it loads)
        }
    }

    const handleKeyDown = (event) => { //event handler for pressing enter, alternative way of navigating to profile
        if (event.key === 'Enter') {
            navigate(`/users/${inputText}`); //navigate to searched repo
        }
    }

    const handleChange = (e) => { //update input value when input value is changed
        setInputText(e.target.value);
    }

    return (
        <div className='Wrapper' onKeyDown={handleKeyDown}>
            <div className='Clickfield' onClick={handleClick}>
              <h1>Github Profile Explorer</h1> 
            </div>
              <input className='Input' type="text" value = {inputText} placeholder="Type username" onChange={handleChange} />
        </div>
    );
};

export default Home;