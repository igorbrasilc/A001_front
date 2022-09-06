import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import 'moment/locale/pt-br';
import "../assets/calendarStyles.scss";

moment.locale("pt-br");
dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

const localizer = momentLocalizer(moment);

export default function BigCalendarComponent(props) {
    const { confirmedReservations} = props;

    function formatPropsToEvents(reservations) {
        return reservations.map(reservation => {
            return {
                id: reservation.id,
                start: calculateTime(reservation.reservationDate, reservation.reservationHour, reservation.durationInHours, 'start'),
                end: calculateTime(reservation.reservationDate, reservation.reservationHour, reservation.durationInHours, 'end'),
                title: reservation.description
            } 
        }
        )
    }

    const events = formatPropsToEvents(confirmedReservations);

    function calculateTime(dateRaw, hour, duration, intention) {
        const date = dayjs(dateRaw, 'DD/MM/YYYY');
        const splittedHour = hour.split(':');
        const dateWithHour = date.add(splittedHour[0], 'h');
        const splittedDuration = duration.split(':');
        const dateWithMinutes = dateWithHour.add(splittedHour[1], 'm');
        
        if (intention === 'start') return dateWithMinutes.toDate();

        const endDateHour = dateWithMinutes.add(splittedDuration[0], 'h');
        const endDateMinutes = endDateHour.add(splittedDuration[1], 'm');

        if (intention === 'end') return endDateMinutes.toDate();
    }

    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            defaultDate={dayjs()}
            defaultView="month"
            dayLayoutAlgorithm="no-overlap"
            style={{ height: "80vh", width: "90vw", marginTop: "40px" }}
            />
        </div>
    )
}