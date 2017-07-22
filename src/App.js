import React, { Component } from 'react'
import calendar from './calendar.png'
import coffee from './coffee.png'
import guitar from './guitar.png'
import waiter from './waiter.png'
import './App.css'

const navbarStyle = {
  backgroundColor: 'white',
  borderBottom: '1px solid #EEEEEE',
}

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded" style={navbarStyle}>
          <h1 className="navbar-brand mb-0"><b><span className="logo-almond">almond</span><span className="logo-space">space</span></b></h1>
        </nav>
        <div className="container-fluid">
          <div className="main">
            <div className="hero">
              <div className="hero-header">
                <div>Repurposed space crafted for meetings</div>
              </div>
              <p className="hero-intro">
                We created an experience that lets you focus solely on the people you are meeting. And nothing else.
              </p>
            </div>
            <div className="reservation">
              <div className="pricing">
                <div className="price-amount">
                  <span className="price-dollar-sign">$</span>
                  <span>6</span>
                  <span className="price-unit"> / 30 min</span>
                </div>
                <div className="price-disclaimer">
                  minimum 30 min · prorated after first 30 min
                </div>
              </div>
              <div className="reserve-button">
                <a href="sms:6503089561&body=I'd like to reserve a table!"><button type="button" className="btn btn-primary reserve-btn"><b>Reserve your table</b></button></a>
              </div>
              <div className="reserve-text">
                <div className="reserve-text-title">
                  To reserve your table, text
                </div>
                <div>
                  (650) 308-9561
                </div>
              </div>
            </div>
            <div className="map">
              <iframe className="map-frame" frameborder="0"
                title="map"
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJL4mjMTm7j4ARSrl1ZnMUS80&zoom=16&key=AIzaSyCDzFQUy2Ip5qA7YbLAJCK9yNd4MMZt9GE" allowfullscreen></iframe>
            </div>
            <div className="why-almondspace">
              <div className="section-title">Why AlmondSpace?</div>

              <div className="row  perk-row">
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={waiter} className="perk-icon" alt="service" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Convenience</div>
                      <div className="perk-description">No more waiting in line to order and have awkward small talk</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={calendar} className="perk-icon" alt="schedule" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Availability</div>
                      <div className="perk-description">Reservations are available to guarantee your seating</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row perk-row">
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={guitar} className="perk-icon" alt="ambiance" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Ambiance</div>
                      <div className="perk-description">Our space is engineered to reduce background noise</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={coffee} className="perk-icon" alt="grubs" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Grubs</div>
                      <div className="perk-description">Unlimited coffee, tea, tasty snacks, and almonds!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
