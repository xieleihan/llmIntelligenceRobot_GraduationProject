// 导入定义存储模块
import { defineStore } from 'pinia'

// 定义Form结构
interface formItem {
    ipinfo: {
        type: string,
        text: string,
        cnip: string,
    },
    ipdata: {
        info1: string,
        info2: string,
        info3: string,
        isp: string,
    },
    adcode: {
        o: string,
        p: string,
        c: string,
        n: string,
        r: string,
        a: string,
        i: boolean,
    }
}

// 导出通用模块数据
export const useGeneralStore = defineStore({
    // 模块ID
    id: 'generalStore',

    // 存储数据对象
    state: () => {
        return {
            form: {
                ipinfo: {
                    type: '', // 类型 (ipv4, ipv6)
                    text: '', // IP地址
                    cnip:'', // 是否中国IP
                },
                ipdata: {
                    info1: '',// 省份
                    info2: '',// 城市
                    info3: '',// 区域
                    isp: '',// 运营商
                },
                adcode: {
                    o: "", // 原始数据
                    p: "", // 省份
                    c: "", // 城市
                    n: "", // 省份-城市
                    r: "", // 省份-城市
                    a: "", // 邮编
                    i: true, // 是否是国内
                }
            }
        }
    },

    // 读取数据的选项
    getters: {
        // 获取from数据
        getForm(state) {
            return state.form;
        }
    },

    // 设置state状态
    actions: {
        // 设置from数据
        setForm(data:formItem) {
            this.form = data;
        }
    }
});