import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import 'moment/locale/pt-br';
import "../assets/calendarStyles.scss";
import EventInfoModal from './EventInfoModal.jsx';

moment.locale("pt-br");
dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

const localizer = momentLocalizer(moment);

export default function BigCalendarComponent(props) {
    const { confirmedReservations} = props;
    const [openModal, setOpenModal] = React.useState(false);
    const [clickedReservation, setClickedReservation] = React.useState(null);


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

    function onSelectEvent(e) {
        console.log('event on select', e);
        setClickedReservation(e);
        setOpenModal(true);
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
            onSelectEvent={onSelectEvent}
            style={{ height: "80vh", width: "90vw", marginTop: "40px" }}
            />
            <EventInfoModal reservation={clickedReservation} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}