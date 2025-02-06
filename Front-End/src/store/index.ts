import { configureStore } from '@reduxjs/toolkit'
// 导入generalStore.ts文件
import generalStore from './generalStore'
// 导入userStore.ts文件
import userStore from './userStore'

// 创建store
const store = configureStore({
  reducer: {
    general: generalStore,
    user: userStore,
  },
})

// 定义RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;