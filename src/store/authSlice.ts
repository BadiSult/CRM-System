import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import tokenInstance, { loginUser,  getProfile, logoutUser } from "../api/todosApi"; 
import { Profile, AuthData } from "../component/typesAut";  

 
 
 
 interface AuthState{
  user: Profile | null;
  isAuth: boolean;
  isLoading: boolean
  error: string | null
 }


const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};


 
 export const login = createAsyncThunk("auth/login", async(userData:AuthData,{rejectWithValue})=>{
  try{
    const response = await loginUser(userData)
    if(!response || !response.accessToken){
      throw new Error("ошибка авторизации")
    }
    localStorage.setItem("accessToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    tokenInstance.setToken(response.accessToken)

    const profileResponse = await getProfile()
    return profileResponse.data
  }catch(err:any){
    return rejectWithValue(err || "ошибка входа")
  }
 })




export const fetchProfile = createAsyncThunk("auth/fetchProfile", async ( ) => {
  try {
    const response = await getProfile();
    return response.data;
  } catch (error: any) {
    return console.log ("Ошибка загрузки профиля");
     
  }
});

 


export const logout = createAsyncThunk("auth/logout", async () => {
  logoutUser();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});




 
 const authSlice = createSlice({
name:"auth",
initialState,
reducers:{},
extraReducers:(builder) => {
  builder
    .addCase(login.pending, (state)=>{
      state.isLoading = true;
      state.isAuth = false;
      state.error  = null;
    })
    .addCase(login.fulfilled, (state, action:PayloadAction<Profile>)=>{
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload
    })
    .addCase(login.rejected, (state, action) =>{
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload as string
    })
    .addCase(fetchProfile.pending, (state) =>{
      state.isLoading = true;
    })
    .addCase(fetchProfile.fulfilled, (state, action:PayloadAction<Profile>) =>{
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload
    })
    .addCase(fetchProfile.rejected,(state, action) =>{
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload as string
    })
    .addCase(logout.fulfilled,(state)=>{
      state.user = null
      state.isAuth = false
    })
}
 })

export default authSlice.reducer;