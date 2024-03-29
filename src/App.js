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
import Slider from 'react-slick'


const ToastMessageFactory = React.createFactory(ToastMessage.animation)
const cookies = new Cookies()

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

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
                <div>The meeting space that’s always available</div>
              </div>
              <div className="hero-intro">
                <div>Take the conference room conflicts out of your office.</div>
                <div>Focus on being creative and productive instead.</div>
              </div>
            </div>

            <br />

            <div className="reservation-disclaimer">
              Open 10am - 4pm, Mon to Fri
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
                      <div className="perk-header">Availability</div>
                      <div className="perk-description">No more office drama over conference room spaces</div>
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

            {/*<div className="section">
              <div className="section-title">Pricing</div>
              <div className="pricing-description"> If at anytime during your first month using our service you are dissatisfied, we will offer a FULL REFUND</div>
              <div className="pricing row">
                <div className="col-sm-6">
                  <div className="pricing-box">
                    <div className="pricing-individual">Individual</div>
                    <div className="pricing-price">$250<span className="pricing-price-unit">/table/mo</span></div>
                    <hr />
                    <ul className="pricing-features">
                      <li className="pricing-feature">Membership for 1 person</li>
                      <li className="pricing-feature">Guaranteed seating</li>
                      <li className="pricing-feature">Premium coffee and tea</li>
                      <li className="pricing-feature">Fast wifi</li>
                      <li className="pricing-feature">1 guest per visit</li>
                    </ul>
                    <Button
                      href="mailto:hello@almondspace.com?subject=Individual%20Free%20Trial&body=I%20would%20like%20to%20start%20the%20individual%20trial!"
                      bsStyle="primary"
                      className="reserve-btn">
                      <b>Contact us</b>
                    </Button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="pricing-box">
                    <div className="pricing-company">Company</div>
                    <div className="pricing-price">$500<span className="pricing-price-unit">/table/mo</span></div>
                    <hr />
                    <ul className="pricing-features">
                      <li className="pricing-feature"><b>All Individual features +</b></li>
                      <li className="pricing-feature">Membership for all company employees</li>
                      <li className="pricing-feature">Unlimited guests per visit</li>
                      <li className="pricing-feature">Calendar integration</li>
                      <li className="pricing-feature">Use of space for private events</li>
                    </ul>
                    <Button
                      href="mailto:hello@almondspace.com?subject=Company%20Free%20Trial&body=I%20would%20like%20to%20start%20the%20company%20trial!"
                      bsStyle="primary"
                      className="reserve-btn">
                      <b>Contact us</b>
                    </Button>
                  </div>
                </div>
              </div>
              <div>Day pass available for $30</div>
            </div> */}

            <div className="section">
              <div className="section-title">See the space</div>
              <div className="">
                <Slider {...sliderSettings}>
                  <div><img src="https://preview.ibb.co/jPGbE5/left.jpg" className="slider-picture" alt="front" /></div>
                  <div><img src="https://preview.ibb.co/dV6bE5/front.jpg" className="slider-picture" alt="left" /></div>
                  <div><img src="https://preview.ibb.co/fDi1gk/right.jpg" className="slider-picture" alt="right" /></div>
                </Slider>
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
