import { createSlice } from '@reduxjs/toolkit'

const initialState={
    name:'',
    email:'',
    avatar:'',
    address:'',
    phone:'',
    access_token:'',
    id:'',
    isAdmin: false,
    city:''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser:(state, action)=>{
      const{ name='',email='',avatar='',address='',phone='',access_token='',_id='',isAdmin, city=''}= action.payload
      state.name = name ;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.id = _id;
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.city = city;
    },
    resetUser:(state)=>{
      state.name = '';
      state.email = '';
      state.access_token = '';
      state.avatar='';
      state.id = '';
      state.address='';
      state.phone=''
      state.isAdmin = false
      state.city = ''
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer