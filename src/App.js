import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const Api_key="66a930e68a0cfef78e7b11fe6038179e";

class App extends React.Component {
  state={
    temperature :undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined
    
  }

  getWeather = async(e)=>{
    e.preventDefault();
    const city =e.target.elements.city.value;
    const country =e.target.elements.country.value;
    const api_Call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${Api_key}`);

    const data =await api_Call.json();
    if(city && country){
      //console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please fill up the input field!!"
      })
    }
  
  }
render(){
  return (
    <div>
      <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
  
}

export default App;


