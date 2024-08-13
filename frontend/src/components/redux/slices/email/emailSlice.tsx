import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emailService } from "./emailService";
import toast from "react-hot-toast";

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: "",
};

// Send Automated Emails
export const sendAutomatedEmail = createAsyncThunk(
  "auth/sendAutomatedEmail",
  async ({emailData, thunkAPI}: any) => {
    try {
      return await emailService.sendAutomatedEmail({emailData});
    } catch (error: any) {
      const message =
        ((error.response as any) &&
          (error.response.data as any) &&
          (error.response.data.message as any)) ||
        (error.message as any) ||
        (error.renderToString as any);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSent = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Automated Email
      .addCase(sendAutomatedEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = true;
        state.emailSent = true;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendAutomatedEmail.rejected, (state: any, action: any) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
