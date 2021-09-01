import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
//Help from here https://fullcalendar.io/docs/react
export default class Calender extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2019-04-01" },
          { title: "event 2", date: "2019-04-02" },
        ]}
        dateClick={this.handleDateClick}
      />
    );
  }
  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }
}


// //Few Custom UI 
// <div class="card card-custom">
//  <div class="card-header">
//   <div class="card-title">
//    <h3 class="card-label">
//     Google Calendar
//    </h3>
//   </div>
//   <div class="card-toolbar">
//    <a href="#" class="btn btn-light-primary font-weight-bold">
//    <i class="ki ki-plus "></i> Add Event
//    </a>
//   </div>
//  </div>
//  <div class="card-body">
//   <div id="kt_calendar"></div>
//  </div>
// </div>