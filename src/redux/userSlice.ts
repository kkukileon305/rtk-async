import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../interface';

type UserState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  userInfo: User | null;
};

const initialState: UserState = {
  loading: 'idle',
  userInfo: null,
};

export const fetchUser = createAsyncThunk<User, number>('user/GET_USER', async (userId: number) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  const data: User = await response.json();

  return data;
});

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: state => {
      state.loading = 'idle';
      state.userInfo = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = 'pending';
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.userInfo = action.payload;
    });

    builder.addCase(fetchUser.rejected, state => {
      state.loading = 'failed';
      state.userInfo = null;
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
