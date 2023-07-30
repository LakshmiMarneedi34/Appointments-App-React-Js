// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isActive: false,
  }

  isToogleFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isActive} = this.state

    if (isActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ' '

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isActive} = this.state
    const filterClassName = isActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointment = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="inner-container">
          <div className="row-container">
            <div className="input-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="title"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className="title"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="appointment-container">
            <h1 className="appointment-name">Appointments</h1>
            <button
              className={`filter-style ${filterClassName}`}
              type="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointment.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                isToogleFavorite={this.isToogleFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
