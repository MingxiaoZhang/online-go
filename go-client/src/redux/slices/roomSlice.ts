import { createSlice } from '@reduxjs/toolkit';
import { Piece } from '../../enum';
import { Room } from '../../types';

interface RoomState {
    roomData: {[roomId: string]: Room};
  }

const initialState = {
  rooms: []
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action) => {
        state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomSlice.actions;
export default roomSlice.reducer;
