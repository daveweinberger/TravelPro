import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';
import '../styles/Calendar.css';

const Calendar = ({ trips, selectedDate, onDateSelect }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDayOfWeek = getDay(monthStart);
  const emptyDays = Array(startDayOfWeek).fill(null);

  const getEventsForDate = (date) => {
    const events = [];
    trips.forEach(trip => {
      trip.events.forEach(event => {
        if (isSameDay(event.date, date)) {
          events.push({ ...event, trip });
        }
      });
    });
    return events;
  };

  const getIconForType = (type) => {
    const icons = {
      flight: '✈️',
      hotel: '🏨',
      activity: '🎫',
      dining: '🍽️',
      planning: '📋',
      gap: '⚠️'
    };
    return icons[type] || '📎';
  };

  const hasAlert = (date) => {
    const events = getEventsForDate(date);
    return events.some(e => e.alert || e.type === 'gap');
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{format(selectedDate, 'MMMM yyyy')}</h2>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}
          
          {daysInMonth.map(day => {
            const events = getEventsForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const alert = hasAlert(day);
            
            return (
              <div
                key={day.toString()}
                className={`calendar-day ${isSelected ? 'selected' : ''} ${alert ? 'alert' : ''} ${events.length > 0 ? 'has-events' : ''}`}
                onClick={() => onDateSelect(day)}
              >
                <div className="day-number">
                  {format(day, 'd')}
                  {alert && <span className="alert-indicator">⚠️</span>}
                </div>
                <div className="day-events">
                  {events.slice(0, 3).map((event, idx) => (
                    <div key={idx} className="event-icon" title={event.title}>
                      {event.trip.flag}
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="event-more">+{events.length - 3}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
