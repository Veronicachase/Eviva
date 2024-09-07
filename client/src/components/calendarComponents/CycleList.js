
import { useState, useEffect } from 'react';
import { current } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios'



export function CycleList({ onPhaseCalculated }){
const [ phase, setPhase ] =useState("")
const apiUrl=("const apiUrl = import.meta.env.VITE_API_URL;")

const calculateCyclePhase = (startDate, endDate, currentDate) => {
    const daysSinceStart = moment(currentDate).diff(moment(startDate), 'days');
    const periodLength = moment(endDate).diff(moment(startDate), 'days');

    if (currentDate <= endDate) {
      return 'menstrual';
    } else if (daysSinceStart >= 12 && daysSinceStart <= 16) {
      return 'ovulation';
    } else if (daysSinceStart > 16 && daysSinceStart < 28) {
      return 'luteal';
    } else {
      return 'unknown';
    }
  };

  useEffect(() => {
    const fetchCycleData = async () => {
      
      try {
        const response = await axios.get(`${apiUrl}/calendar/:calendarId`);
        const { startDate, endDate } = response.data; 
        const newPhase = calculateCyclePhase(startDate, endDate, moment());
        setPhase(newPhase);
        onPhaseCalculated(newPhase); 
      } catch (error) {
        console.error("Error fetching cycle data", error);
      }
    };

    fetchCycleData();
  }, []);
  return null;
}

export const getCycleColor = (phase) => {
    switch(phase) {
      case 'menstrual':
        return '#E61980';
      case 'follicular':
        return '#009EFF';
      case 'ovulation':
        return '#00FFC6';
      case 'luteal':
        return '#FFC700';
      default:
        return 'gray'; 
    }
  };

// hacer cáculo del ciclo, usando la  ultima fecha de periodo


