import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import 'moment/locale/pt-br';
import "../assets/calendarStyles.scss";

moment.locale("pt-br");
dayjs.locale('pt-br');

const localizer = momentLocalizer(moment);

export default function BigCalendarComponent(props) {
    const {pendingReservations, confirmedReservations} = props;
    console.log(pendingReservations);

    function formatPropsToEvents(reservations) {
        return reservations.map(reservation => {
            return {
                start: dayjs(reservation.reservationDate, "DD/MM/YYYY").toDate(),
                end: dayjs(reservation.reservationDate).add(5, 'hours').toDate(),
                title: reservation.description
            } 
        }
        )
    }

    const events = formatPropsToEvents(pendingReservations);
    console.log(events);

    // const events = [
    //     {
    //         start: dayjs().toDate(),
    //         end: dayjs()
    //           .add(5, "hours")
    //           .toDate(),
    //         title: "Some title"
    //       }
    // ];

    return (
        <div>
    <Calendar
      localizer={localizer}
      events={events}
      defaultDate={dayjs()}
      defaultView="week"
      style={{ height: "80vh", width: "100vw", marginTop: "40px" }}
    />
  </div>
    )
}