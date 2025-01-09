import { configureStore } from '@reduxjs/toolkit'
// 导入generalStore.ts文件
import generalStore from './generalStore'

// 创建store
const store = configureStore({
  reducer: {
    general: generalStore,
  },
})

// 定义RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;