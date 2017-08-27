import React, { Component } from 'react'
import calendar from './calendar.png'
import office from './office-block.png'
import guitar from './guitar.png'
import waiter from './waiter.png'
import './App.css'
import Cookies from 'universal-cookie'
import { ToastContainer, ToastMessage } from 'react-toastr'
import { Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import EmailValidator from 'email-validator'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    const email = cookies.get('email') ? cookies.get('email') : ''
    this.state = {
      isLoading: false,
      duration: '30 minute',
      time: '9am',
      email,
      date: moment()
    }
    this.addSuccessAlert = this.addSuccessAlert.bind(this)
    this.addErrorAlert = this.addErrorAlert.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleReservationClick = this.handleReservationClick.bind(this)
    this.isWeekday = this.isWeekday.bind(this)
    this.parseNameFromEmail = this.parseNameFromEmail.bind(this)
  }

  addSuccessAlert() {
    this.clearAlert()
    this.refs.container.success('A confirmation email was sent. See you soon!', 'Reservation confirmed', {
      closeButton: true,
    });
  }

  addErrorAlert(msg) {
    this.clearAlert()
    this.refs.container.error(msg, 'Failed to make a reservation', {
      closeButton: true,
    });
  }

  clearAlert() {
    this.refs.container.clear();
  }

  handleDateChange(date) {
    this.setState({ date })
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value })
  }

  handleDurationChange(e) {
    this.setState({ duration: e.target.value })
  }

  handleEmailChange(e) {
    const email = e.target.value
    this.setState({ email })
  }

  handleReservationClick(e) {
    e.preventDefault()
    const email = this.state.email
    const date = this.state.date
    const obj = this
    const firstName = this.parseNameFromEmail(email)

    if (date.length === 0) {
      this.addErrorAlert('Please choose a date')
    } else if (email.length === 0) {
        this.addErrorAlert('Please enter your email')
    } else if (!EmailValidator.validate(email)) {
      this.addErrorAlert('Invalid email')
    } else {
      this.setState({ isLoading: true })
      window.emailjs.send("gmail","reservation_confirmation",{
        email: this.state.email,
        time: this.state.time,
        date: date.format("MM/DD/YY"),
        duration: this.state.duration,
        name: firstName,
      })
      .then(
        function(response) {
          obj.addSuccessAlert()
          obj.setState({ isLoading: false })
          cookies.set('email', email, { path: '/' })
        },
        function(error) {
          obj.addErrorAlert('Please try again')
          obj.setState({ isLoading: false })
        }
      )
    }
  }

  isWeekday(date) {
    const day = date.day()
    return day !== 0 && day !== 6
  }

  parseNameFromEmail(email) {
    const emailName = email.split("@")[0]
    const firstName = emailName.split(".")[0]
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

    return capitalizedFirstName
  }

  render() {
    return (
      <div>
        <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
          />

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
                    <label className="form-label">meeting date</label>
                    <DatePicker
                      className="form-control"
                      minDate={moment()}
                      filterDate={this.isWeekday}
                      selected={this.state.date}
                      onChange={this.handleDateChange}
                    />
                  </div>
                  <div className="form-group">
                    <div><label className="form-label">start time</label></div>
                    <select className="form-control" value={this.state.time} onChange={this.handleTimeChange}>
                      <option value="10am">10:00 AM</option>
                      <option value="10:15am">10:15 AM</option>
                      <option value="10:30am">10:30 AM</option>
                      <option value="10:45am">10:45 AM</option>
                      <option value="11am">11:00 AM</option>
                      <option value="11:15am">11:15 AM</option>
                      <option value="11:30am">11:30 AM</option>
                      <option value="11:45am">11:45 AM</option>
                      <option value="12pm">12:00 PM</option>
                      <option value="12:15pm">12:15 PM</option>
                      <option value="12:30pm">12:30 PM</option>
                      <option value="12:45pm">12:45 PM</option>
                      <option value="1pm">01:00 PM</option>
                      <option value="1:15pm">01:15 PM</option>
                      <option value="1:30pm">01:30 PM</option>
                      <option value="1:45pm">01:45 PM</option>
                      <option value="2pm">02:00 PM</option>
                      <option value="2:15pm">02:15 PM</option>
                      <option value="2:30pm">02:30 PM</option>
                      <option value="2:45pm">02:45 PM</option>
                      <option value="3pm">03:00 PM</option>
                      <option value="3:15pm">03:15 PM</option>
                      <option value="3:30pm">03:30 PM</option>
                      <option value="3:45pm">03:45 PM</option>
                      <option value="4pm">04:00 PM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div><label className="form-label">duration</label></div>
                    <select className="form-control" value={this.state.duration} onChange={this.handleDurationChange}>
                      <option value="30 minute">30 minute meeting</option>
                      <option value="1 hour">1 hour meeting</option>
                      <option value="1.5 hour">1.5 hour meeting</option>
                      <option value="2 hour">2 hour meeting</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <div><label className="form-label">work email</label></div>
                    <input type="email" className="form-control form-email" id="exampleInputEmail3" onChange={this.handleEmailChange} value={this.state.email} placeholder="Work email" required />
                  </div>
                  <div className="form-group">
                    <div><label className="form-label"></label></div>
                    <Button
                      bsStyle="primary"
                      className="reserve-btn"
                      disabled={this.state.isLoading}
                      onClick={!this.state.isLoading ? this.handleReservationClick : null}>
                      <b>{this.state.isLoading ? 'Processing...' : 'Reserve your table'}</b>
                    </Button>
                  </div>
                </div>

              </form>
              <div className="reservation-disclaimer">
                Open 10am - 4pm, Mon to Fri
              </div>
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
                      <div className="perk-header">Comfort</div>
                      <div className="perk-description">A place for you to enjoy getting work done</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="section contact">
              <div className="contact-title">Questions?</div>
              <div className="contact-info">Email hello@almondspace.com</div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App
