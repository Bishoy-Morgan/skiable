import Lottie from 'lottie-react';
import calendarAnimation from './calendar.json';

const CalendarAnimation = () => (
    <div className="flex justify-center">
        <Lottie animationData={calendarAnimation} style={{ width: 450, height: 180 }} loop />
    </div>
);

export default CalendarAnimation;