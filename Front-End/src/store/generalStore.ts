import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义State类型
interface GeneralState {
    ipInfo: string; // IP信息
    // addressInfo : string // 地址信息
}

// 初始化State
const initialState: GeneralState = {
    ipInfo: '',
    // addressInfo: ''
};

// 创建Slice
const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIpInfo(state, action: PayloadAction<string>) {
      state.ipInfo = action.payload;
    },
  },
});

// 导出Action
export const { setIpInfo } = generalSlice.actions;

// 导出Reducer
export default generalSlice.reducer;