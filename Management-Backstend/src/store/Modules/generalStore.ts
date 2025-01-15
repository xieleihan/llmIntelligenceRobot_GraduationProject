// 导入定义存储模块
import { defineStore } from 'pinia'

// 导出通用模块数据
export const useGeneralStore = defineStore({
    // 模块ID
    id: 'generalStore',

    // 存储数据对象
    state: () => {
        return {
            form: {
                ip: '', // IP地址
                address: '', // 地址
            }
        }
    },

    // 读取数据的选项
    getters: {
        // 获取IP地址
        getIp(state) {
            return state.form.ip;
        },

        // 获取地址
        getAddress(state) {
            return state.form.address;
        }
    },

    // 设置state状态
    actions: {
        // 设置IP地址
        setIp(ip:string) {
            this.form.ip = ip;
        },

        // 设置地址
        setAddress(address:string) {
            this.form.address = address;
        }
    }
});