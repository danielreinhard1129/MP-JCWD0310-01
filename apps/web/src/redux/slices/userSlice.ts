import { IUser } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: 0,
  fullName: "",
  email: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role
    },

    logoutAction: (state) => {
      state.id = 0;
      state.fullName = "";
      state.email = "";
      state.role=""
    },
  },
});
export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
