import { createSlice } from "@reduxjs/toolkit";
// faltan los thunks con los fetchs 
const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDate: null,
    symptoms: {},
    moods: {},
    periodData: {}, 
    phases: {}, 
    sexs: {},
    notes: {},
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    addSymptom: (state, action) => {
      const { date, symptom } = action.payload;
      if (!state.symptoms[date]) {
        state.symptoms[date] = [];
      }
      state.symptoms[date].push(symptom);
    },

    addMood: (state, action) => {
      const { date, mood } = action.payload;
      if (!state.moods[date]) {
        state.moods[date] = [];
      }
      state.moods[date].push(mood);
    },

    addPeriodData: (state, action) => {
      const { date, initialDate, finalDate } = action.payload;
      if (!state.periodData[date]) {
        state.periodData[date] = {};
      }
      state.periodData[date].initialDate = initialDate;
      state.periodData[date].finalDate = finalDate;
    },

    addPhase: (state, action) => {
      const { date, phase } = action.payload;
      if (!state.phases[date]) {
        state.phases[date] = "";
      }
      state.phases[date] = phase; 
    },

    addSexs: (state, action) => {
      const { date, sex } = action.payload;
      if (!state.sexs[date]) {
        state.sexs[date] = [];
      }
      state.sexs[date].push(sex);
    },

    addNote: (state, action) => {
      const { date, note } = action.payload;
      if (!state.notes[date]) {
        state.notes[date] = [];
      }
      state.notes[date].push(note);
    }
  }
});

export const {
  setSelectedDate,
  addSymptom,
  addMood,
  addPeriodData,
  addPhase,
  addSexs,
  addNote,
} = calendarSlice.actions;

export default calendarSlice.reducer;
