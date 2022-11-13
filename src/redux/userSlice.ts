import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../interface';

type UserState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  user: User | null;
};

const initialState: UserState = {
  loading: 'idle',
  user: null,
};

const fetchUser = createAsyncThunk<User>('user/GET_USER', async () => {
  const response = await fetch('https://dummyjson.com/users/1');
  const data: User = await response.json();

  return data;
});

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: state => {
      state.loading = 'idle';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = 'pending';
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.user = action.payload;
    });

    builder.addCase(fetchUser.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export default userSlice.reducer;
