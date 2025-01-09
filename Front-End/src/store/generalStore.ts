// generalStore Redux Store 存储的是通用信息,在该项目中的任何位置都可能会用到

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义State类型
interface GeneralState {
    ipInfo: string; // IP信息
    addressInfo: string // 地址信息
}

// 初始化State
const initialState: GeneralState = {
    ipInfo: '',
    addressInfo: ''
};

// 创建Slice
const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIpInfo(state, action: PayloadAction<string>) {
            state.ipInfo = action.payload;
        },
        setAddressInfo(state, action: PayloadAction<string>) {
            state.addressInfo = action.payload;
        },
    },
});

// 导出Action
export const { setIpInfo,setAddressInfo } = generalSlice.actions;

// 导出Reducer
export default generalSlice.reducer;