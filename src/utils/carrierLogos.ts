import type { StaticImageData } from 'next/image';

import qatar from '@/public/images/airlines/Qatar_Airways_logo_PNG5.png'
import airArabia from '@/public/images/airlines/Air_Arabia_logo_PNG6.png'
import airChina from '@/public/images/airlines/Air_China_logo_PNG2.png'
import airIndia from '@/public/images/airlines/Air_India_logo_PNG1.png'
import alsaka from '@/public/images/airlines/Alaska-Airlines-Logo-PNG1.png'
import america from '@/public/images/airlines/American_Airlines_logo_PNG7.png'
import delta from '@/public/images/airlines/Delta_air_lines_logo_PNG1.png'
import emirates from '@/public/images/airlines/Emirates_logo_PNG1.png'
import lufthansa from '@/public/images/airlines/Lufthansa_logo_PNG3.png'
import saudi from '@/public/images/airlines/Saudi_Arabian_Airlines_logo_PNG6.png'
import singapore from '@/public/images/airlines/Singapore_Airlines_logo_PNG2.png'
import spirit from '@/public/images/airlines/Spirit_Airlines_logo_PNG1.png'
import swiss from '@/public/images/airlines/Swiss_International_Air_Lines_logo_PNG2.png'
import turkish from '@/public/images/airlines/Turkish_Airlines_logo_PNG6.png'
import united from '@/public/images/airlines/United_airlines_logo_PNG2.png'
import wizz from '@/public/images/airlines/Wizzair_logo_PNG2.png'
import euroflyer from '@/public/images/airlines/BA_Connect_Logo_PNG4.png'
import france from '@/public/images/airlines/Air_France_logo_PNG6.png'
import british from '@/public/images/airlines/British_airways_logo_PNG2.png'
import jetstar from '@/public/images/airlines/Jetstar_logo_PNG5.png'
import jetblue from '@/public/images/airlines/JetBlue_Airways_logo_PNG1.png'
import aeroflot from '@/public/images/airlines/Aeroflot_logo_PNG1.png'





export const carrierLogos: Record<string, StaticImageData> = {
    'Qatar Airways': qatar,
    'Emirates': emirates,
    'Lufthansa': lufthansa,
    'Turkish Airlines': turkish,
    'Singapore Airlines': singapore,
    'Air Arabia': airArabia,
    'Air China': airChina,
    'Air India': airIndia,
    'Alaska Airlines': alsaka,
    'American Airlines': america,
    'Delta Air Lines': delta,
    'Saudi Arabian Airlines': saudi,
    'Spirit Airlines': spirit,
    'Swiss International Air Lines': swiss,
    'United Airlines': united,
    'Wizz Air': wizz,
    'BA Euroflyer': euroflyer,
    'Air France': france,
    'British Airways': british,
    'Jetstar': jetstar,
    'jetBlue': jetblue,
    'Aeroflot': aeroflot,
};
