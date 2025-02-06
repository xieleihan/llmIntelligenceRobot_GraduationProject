// 存放用户的信息
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义State类型
interface UserState {
    username: string; // 用户名
}

// 初始化State
const initialState: UserState = {
    username: '',
};

// 创建Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
    },
});

// 导出Action
export const { setUsername } = userSlice.actions;

// 导出Reducer
export default userSlice.reducer;