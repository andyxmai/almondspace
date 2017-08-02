import React, { Component } from 'react'
import calendar from './calendar.png'
import office from './office-block.png'
import guitar from './guitar.png'
import waiter from './waiter.png'
import './App.css'
import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'react-bootstrap-time-picker'
import Cookies from 'universal-cookie';

const navbarStyle = {
  backgroundColor: 'white',
  borderBottom: '1px solid #EEEEEE',
}

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    const email = cookies.get('email') ? cookies.get('email') : ''
    this.state = {
      date: new Date().toISOString(),
      time: 9 * 3600,
      formattedTime: '9:00',
      email: email,
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleReservationClick = this.handleReservationClick.bind(this)
  }

  handleDateChange(value, formattedValue) {
    this.setState({ date: value })
  }

  handleTimeChange(time) {
    const hour = Math.floor(time / 3600)
    const minute = (time % 3600) / 60
    const formattedTime = `${hour}:${minute}`
    this.setState({ time, formattedTime })
  }

  handleEmailChange(e) {
    console.log(e.target.value);
    const email = e.target.value
    this.setState({ email })
  }

  handleReservationClick() {
    console.log(this.state);
    cookies.set('email', this.state.email, { path: '/' })
  }

  render() {
    return (
      <div>
        
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <h1 className="navbar-brand"><b><span className="logo-almond">almond</span><span className="logo-space">space</span></b></h1>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="main">
            <div className="hero">
              <div className="hero-header">
                <div>Repurposed space crafted for meetings</div>
              </div>
              <p className="hero-intro">
                We created an experience that lets you brainstorm, collaborate, and unwind with coworkers.
              </p>
            </div>
            <div className="reservation">
              <form className="form-inline">

                <div className="row">
                  <div className="form-group">
                    <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange} />
                    </div>
                  <div className="form-group">
                    <TimePicker start="9:00" end="16:00" step={15} onChange={this.handleTimeChange} value={this.state.time} />
                  </div>
                  <div className="form-group">
                    <select className="form-control">
                      <option>30 minute meeting</option>
                      <option>1 hour meeting</option>
                      <option>1.5 hour meeting</option>
                      <option>2 hour meeting</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <input type="email" className="form-control form-email" id="exampleInputEmail3" onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary reserve-btn" onClick={this.handleReservationClick}><b>Reserve your table</b></button>
                  </div>
                </div>

              </form>
            </div>

            <div className="map">
              <iframe className="map-frame" frameBorder="0"
                title="map"
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJL4mjMTm7j4ARSrl1ZnMUS80&zoom=16&key=AIzaSyCDzFQUy2Ip5qA7YbLAJCK9yNd4MMZt9GE" allowFullScreen></iframe>
            </div>

            <div className="why-almondspace section">
              <div className="section-title">Why AlmondSpace?</div>

              <div className="row  perk-row">
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={calendar} className="perk-icon" alt="schedule" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Reservations</div>
                      <div className="perk-description">Book your table and guarantee your seating</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={waiter} className="perk-icon" alt="service" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Service</div>
                      <div className="perk-description">Unlimited coffee and tea served while you are here</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row perk-row">
                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={office} className="perk-icon" alt="convenience" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Convenience</div>
                      <div className="perk-description">Prime location just steps from your office</div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="icon-text perk-icon-text">
                    <div>
                      <img src={guitar} className="perk-icon" alt="ambiance" />
                    </div>
                    <div className="perk">
                      <div className="perk-header">Ambiance</div>
                      <div className="perk-description">A place to meet without disrupting other coworkers</div>
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
