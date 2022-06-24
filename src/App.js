import './App.css';
import Header from './components/Header';
import ValidateUEN from './components/ValidateUEN';
import CheckWeather from './components/CheckWeather';
import { useState } from 'react'

function App() {
  const [showValidateUEN, setShowUEN] = useState(false)
  const [showCheckWeather, setShowWeather] = useState(false)

  //UEN toggle
  const toggleUen = () =>{
    setShowUEN(!showValidateUEN)
  }

  //Weather toggle
  const toggleWeather = () => {
    setShowWeather(!showCheckWeather)
  }

  return (
    <div className="container">
      <Header title='oneST' 
              onUen={toggleUen}
              UEN = {showValidateUEN} 
              onWeather={toggleWeather}
              Weather = {showCheckWeather} />
      
      {showValidateUEN && <ValidateUEN />}
      {showCheckWeather && <CheckWeather />}
      {(!showCheckWeather && !showValidateUEN) ? 
          <p>Click on the buttons in green to open the 
             respective components to Check UEN or Check Weather.</p>: ''}
      <footer>
        <p>Copyright &copy; Steffano 2022</p>
      </footer>
    </div>
  );
}

export default App;
