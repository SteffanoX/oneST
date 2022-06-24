import { useState, useEffect } from 'react'
import Select from 'react-select'

const CheckWeather = ({currentWeather}) => {
  const [location, setLocation] = useState('')
  const [locWeather, setLocwea] = useState('')
  const [forecast_validity, setForecastValidity] = useState('')
  const [resultsCol, setResCol] = useState('black')
  const weatherAPI = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"

  useEffect(() => {
    const GetLoc = () => {
      fetch(weatherAPI).then(res => {
        if(res.status >= 400){
          throw new Error("Server error!")
        }
        return res.json()
        }).then(data => {
          let objects = data.items[0].forecasts
          let area_list = []
          for(var i=0; i<objects.length; i++){
            let area = objects[i].area.toString()
            let ddl_record = {'label': area, 'value': area}
            area_list.push(ddl_record)
          }
          setLocation(area_list)
      }, err => {setLocwea('Server Error!'); setForecastValidity('');setResCol('red')})
    }
    GetLoc()
  }, []);

  const SelLocation = (e) => {
    let selected_loc = e.value

    const GetWeather = () => {
      let weatherDict = {}
      fetch(weatherAPI).then(res => {
        if(res.status >= 400) throw new Error('Server error')
        return res.json()
      }).then(data => {
        let forecastObjects = data.items[0].forecasts
        let start = data.items[0].valid_period.start
        let end = data.items[0].valid_period.end
        for(var i=0; i<forecastObjects.length; i++){
          weatherDict[forecastObjects[i].area.toString()] = forecastObjects[i].forecast.toString() 
        }
        if(weatherDict[selected_loc]){
          let results = selected_loc + ': ' + weatherDict[selected_loc] + ' for the next 2 hours.'
          let validity = 'Forecast Valid from ' + start + ' to ' + end
          setLocwea(results)
          setForecastValidity(validity)
          setResCol('green')
        }else{
          setLocwea('Weather data not available now')
          setResCol('red')
          setForecastValidity('')
        }
        
      }, err => {setLocwea('Server Error!'); setResCol('red'); setForecastValidity('');})
    }
    GetWeather()

  }
  
  return (
    <>
    <h3>Check Weather</h3>
        <div className="form-control">
            <label>Choose Location: </label>
            <Select options={location}
                    onChange={(e) => SelLocation(e)}
                    />
        </div>
    <div className='form-Control'>
        <label></label><br/>
        <p style={{color:resultsCol}}>{locWeather}</p><br/>
        <p>{forecast_validity}</p>
    </div>
    <br/>
    <br/>
    </>
  )
}

export default CheckWeather