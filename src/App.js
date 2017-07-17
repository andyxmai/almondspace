import React, { Component } from 'react'
import calendar from './calendar.png'
import coffee from './coffee.png'
import guitar from './guitar.png'
import placeholder from './placeholder.png'
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
                <div>The Ideal Space for Meetings</div>
              </div>
              <p className="hero-intro">
                We created an experience that lets you focus solely on the people you are meeting. And nothing else.
              </p>
            </div>
            <div className="reservation">
              <div className="pricing">
                <div>
                  <div className="price-amount"><span className="price-dollar-sign">$</span><span>8</span></div>
                  <div className="price-description">first 30 min</div>
                </div>
                <div className="price-plus">+</div>
                <div>
                  <div className="price-amount"><span className="price-dollar-sign">$</span>5</div>
                  <div className="price-description">each addl 30 min</div>
                </div>
              </div>
              <div className="reserve-button">
                <a href="sms:2024680722&body=I'd like to reserve a table!"><button type="button" className="btn btn-primary"><b>Reserve your table</b></button></a>
              </div>
            </div>
            <div className="address-group icon-text">
              <div>
                <img src={placeholder} className="pin-icon" alt="pin" />
              </div>
              <div className="address">
                <div>496 Hamilton Ave</div>
                <div>Palo Alto, CA 94301</div>
              </div>
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
                      <div className="perk-header">Service</div>
                      <div className="perk-description">No more waiting in line to order and pick up your drink</div>
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
