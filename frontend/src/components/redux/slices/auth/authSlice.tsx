import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";
import toast from "react-hot-toast";
import { AnyARecord } from "dns";

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  verifiedUsers: 0,
  suspendedUsers: 0,
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({userData, thunkAPI}: any) => {
    try {
      return await authService.register( userData );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({userData, thunkAPI}: any) => {
//     try {
//       return await authService.login( userData );
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.renderToString;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ userData }: any, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error("Login error:", message); // Log the error
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Logout User
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.renderToString;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.renderToString;
    return thunkAPI.rejectWithValue(message);
  }
});

// Login Status
export const loginStatus = createAsyncThunk(
  "auth/loginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.loginStatus();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({userData, thunkAPI}: any) => {
    try {
      return await authService.updateUser(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Send Verification Email
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify User
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async ({verificationToken, thunkAPI}: any) => {
    try {
      return await authService.verifyUser({verificationToken});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({userData, thunkAPI}: any) => {
    try {
      return await authService.changePassword({userData});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({userData, thunkAPI}: any) => {
    try {
      return await authService.forgotPassword( userData );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userData, resetToken }: any, thunkAPI) => {
    try {
      return await authService.resetPassword(userData, resetToken);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Users
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({id, thunkAPI}: any) => {
    try {
      return await authService.deleteUser(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upgrade User
export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async ({userData, thunkAPI}: any) => {
    try {
      return await authService.upgradeUser({userData});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Send login code
export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async ({ email, thunkAPI }: any) => {
    try {
      return await authService.sendLoginCode({email});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.renderToString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// loginWithCode
export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async ({ code, email }: any, thunkAPI) => {
    try {
      return await authService.loginWithCode(code, email);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// loginWithCode
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async ({userToken, thunkAPI}: any) => {
    try {
      return await authService.loginWithGoogle({userToken});
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET: (state: any) => {
      state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    // CALC_VERIFIED_USER(state: any, action: any) {
    //   const array: any = [];
    //   state.users.map((user: any) => {
    //     const { isVerified } = user;
    //     return array.push(isVerified);
    //   });
    //   let count = 0;
    //   array.forEach((item: any) => {
    //     if (item === true) {
    //       count += 1;
    //     }
    //   });
    //   state.verifiedUsers = count;
    // },
    // CALC_SUSPENDED_USER(state: any, action: any) {
    //   const array: any = [];
    //   state.users.map((user: any) => {
    //     const { role } = user;
    //     return array.push(role);
    //   });
    //   let count = 0;
    //   array.forEach((item: any) => {
    //     if (item === "suspended") {
    //       count += 1;
    //     }
    //   });
    //   state.suspendedUsers = count;
    // },
    CALC_VERIFIED_USER(state) {
      const array: boolean[] = state.users.map((user: any) => user.isVerified);
      state.verifiedUsers = array.filter((item) => item === true).length;
    },
    CALC_SUSPENDED_USER(state) {
      const array: string[] = state.users.map((user: any) => user.role);
      state.suspendedUsers = array.filter((item) => item === "suspended").length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration successful");
      })
      .addCase(registerUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login successful");
      })
      .addCase(loginUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
        if (action?.payload?.includes("New broswer or device detected")) {
          state.twoFactor = true;
        }
      })

      // Logout user
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success("Logout successful");
      })
      .addCase(logout.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // LoginStatus
      .addCase(loginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStatus.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
      })
      .addCase(loginStatus.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("User updated");
      })
      .addCase(updateUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Send Verification User
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Verification Link Sent");
      })
      .addCase(sendVerificationEmail.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Verify User
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("User verified");
      })
      .addCase(verifyUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Password changed");
      })
      .addCase(changePassword.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(forgotPassword.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get All Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Users
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Upgrade Users
      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Send Login Code
      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendLoginCode.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendLoginCode.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // loginWithCode
      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCode.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.twoFactor = false;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(loginWithCode.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // loginWithGoogle
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login Successful");
      })
      .addCase(loginWithGoogle.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      });
  },
});

export const { RESET, CALC_SUSPENDED_USER, CALC_VERIFIED_USER } =
  authSlice.actions;

// For useSelector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectUser = (state: any) => state.auth.user;
export const selectAllUsers = (state: any) => state.auth.users;

export default authSlice.reducer;
