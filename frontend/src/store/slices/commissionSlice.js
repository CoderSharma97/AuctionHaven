import axios from "axios";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state, action) {
      state.loading = true;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      `${backendUrl}/api/v1/commission/proof`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;