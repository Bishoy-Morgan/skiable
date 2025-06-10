import Lottie from 'lottie-react';
import bellAnimation from './bell-alert.json';


const PriceAlertAnimation = () => (
    <div className="flex justify-center ">
        <Lottie animationData={bellAnimation} style={{ width: 180, height: 180 }} loop />
    </div>
);

export default PriceAlertAnimation;