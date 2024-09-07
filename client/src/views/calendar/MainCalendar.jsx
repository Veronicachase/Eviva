import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuthToken } from '../../utils/tokenVerifier';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { CycleBar } from '../../components/calendarComponents/CycleBar';
import { CycleList, getCycleColor } from '../../components/calendarComponents/CycleList';
import { NoteModal }from '../../components/calendarComponents/NoteModal'; 

export default function MainCalendar() {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const [phase, setPhase] = useState('unknown');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);

  const handlePhaseCalculated = (newPhase) => {
    setPhase(newPhase);
  };

  const handleDateClick = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveNote = (note) => {
    setEvents([...events, {
      title: note,
      start: selectedDate,
      end: selectedDate,
      allDay: true,
    }]);
    setShowModal(false);
  };

  const handleContextMenu = (event, date) => {
    event.preventDefault();
    console.log("Clic derecho en la fecha:", date);
  };

  return (
    <>
      <div className='calendar-container' style={{ height: "50vh", width: "50%", marginTop: "50px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={['month', 'week', 'day']}
          defaultView="month"
          selectable
          onSelectSlot={handleDateClick}
          defaultDate={new Date()}
          style={{ height: 500 }}
        />
        <div>
          <NoteModal
            show={showModal}
            handleClose={handleCloseModal}
            handleSave={handleSaveNote}
          />
        </div>
      </div>
      <div className='mt-5'>
        <CycleBar color={getCycleColor(phase)} />
        <CycleList onPhaseCalculated={handlePhaseCalculated} />
      </div>
    </>
  );
}
