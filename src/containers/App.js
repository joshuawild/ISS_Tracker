import React, { Component } from 'react';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Map from '../components/Map'

class App extends Component {
    constructor(){
        super()
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }

    intervalID;

    componentDidMount() {
        this.getData();
        this.intervalID = setInterval(this.getData.bind(this), 3000);
    }

    componentWillUnmount() {
      /*
        stop getData() from continuing to run even
        after unmounting this component
      */
      clearInterval(this.intervalID);
    }

    getData = () => {
      fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(iss_position => this.setState({latitude: iss_position.iss_position.latitude, longitude: iss_position.iss_position.longitude }))
    }

    render() {
        const { latitude, longitude } = this.state;
        
        const location = {
          address: 'International Space Station',
          lat: parseFloat(latitude, 10),
          lng: parseFloat(longitude, 10)
        };

        return !latitude.length ?
            <article className='vh-100 dt w-100'>
            <div className="dtc v-mid tc ph3 ph4-l">
              <h1 className="f6 f2-m f-subheadline-l fw6 tc">Loading</h1>
            </div>
          </article> : 
           (
                <div className='tc'>
                    <h1 className='F2'>ISS Tracker</h1>
                    <Scroll>
                    <ErrorBoundry>
                      <Map location={location} zoomLevel={4} />
                    </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }

    }

export default App;
