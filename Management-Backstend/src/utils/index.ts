const userAgent = navigator.userAgent;

// 格式化时间
function parseTime(time: string | number | Date, cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}'): string | null {
    if (arguments.length === 0 || !time) {
        return null
    }

    let date: Date;
    if (typeof time === 'object') {
        date = time as Date;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }

    const formatObj: Record<string, number> = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };

    const time_str = cFormat.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key as keyof typeof formatObj];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        } else if ('ymd'.indexOf(key) < 0) {
            return value.toString().padStart(2, '0');
        }
        return value.toString();
    });

    return time_str;
}

// 返回当前时间的早上下午晚上
function getNowTime() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 6) {
        return '凌晨';
    } else if (hour < 9) {
        return '早上';
    } else if (hour < 12) {
        return '上午';
    } else if (hour < 14) {
        return '中午';
    } else if (hour < 17) {
        return '下午';
    } else if (hour < 19) {
        return '傍晚';
    } else if (hour < 22) {
        return '晚上';
    } else {
        return '深夜';
    }
}

/**
 * 防抖函数(实时性高的,在n秒内执行该事件,但是在n秒重复触发,则重新计时)
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return { Function } 防抖后的结果
 */
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean = false
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let context: any;
    let args: Parameters<T>;
    let timestamp: number;
    let result: ReturnType<T> | undefined;

    const later = () => {
        const last = Date.now() - timestamp;

        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;

            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = null;
                    args = null!;
                }
            }
        }
    };

    return function (this: any, ...newArgs: Parameters<T>) {
        context = this;
        args = newArgs;
        timestamp = Date.now();
        const callNow = immediate && !timeout;

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }

        if (callNow) {
            result = func.apply(context, args);
            context = null;
            args = null!;
        }

        return result;
    };
}

/**
 * 设置cookie的函数
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date}`;
}

/**
 * 获取指定名称的 cookie 值
 * @param name cookie 名称
 * @returns cookie 的值，如果没有则返回空字符串
 */
function getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
}

/**
 * 获取浏览器类型和版本
 * @returns {Object} 返回浏览器类型和版本
 */
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let version = "Unknown";

    if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
        const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
        version = chromeMatch ? chromeMatch[1] : "Unknown";
    } else if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
        const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
        version = firefoxMatch ? firefoxMatch[1] : "Unknown";
    } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
        const safariMatch = ua.match(/Version\/([\d.]+)/);
        version = safariMatch ? safariMatch[1] : "Unknown";
    } else if (ua.indexOf("Edge") > -1) {
        browserName = "Edge";
        const edgeMatch = ua.match(/Edge\/([\d.]+)/);
        version = edgeMatch ? edgeMatch[1] : "Unknown";
    } else if (ua.indexOf("MSIE") > -1) {
        browserName = "Internet Explorer";
        const ieMatch = ua.match(/MSIE ([\d.]+)/);
        version = ieMatch ? ieMatch[1] : "Unknown";
    }

    return { browserName, version };
}

/**
 * 获取用户操作系统信息
 * @returns {string} 返回操作系统
 */
function getOperatingSystem() {
    const platform = navigator.platform;
    let os = "Unknown";

    if (platform.indexOf("Win") > -1) {
        os = "Windows";
    } else if (platform.indexOf("Mac") > -1) {
        os = "MacOS";
    } else if (platform.indexOf("Linux") > -1) {
        os = "Linux";
    } else if (platform.indexOf("Android") > -1) {
        os = "Android";
    } else if (platform.indexOf("iOS") > -1) {
        os = "iOS";
    }

    return os;
}

/**
 * 获取用户屏幕分辨率
 * @returns {Object} 返回屏幕信息
 */
function getScreenInfo() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;

    return { screenWidth, screenHeight, colorDepth };
}

/**
 * 获取用户的视口大小
 * @returns {Object} 返回视口信息
 */
function getViewportSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return { width, height };
}

/**
 * 获取用户是否是移动端
 * @returns {Object} 返回用户的设备信息
 */
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
        return "Mobile";
    } else {
        return "Desktop";
    }
}

/**
 * 获取用户语言
 * @returns {string} 返回用户的语言
 */
function getLanguage() {
    return navigator.language;
}

/**
 * 整体返回设备信息
 * @returns {Object} 返回设备信息
 */
function getDeviceInfo() {
    return {
        browserInfo: getBrowserInfo(),
        operatingSystem: getOperatingSystem(),
        screenInfo: getScreenInfo(),
        viewportSize: getViewportSize(),
        deviceType: getDeviceType(),
        language: getLanguage()
    }
}

export {
    parseTime,
    getNowTime,
    debounce,
    setCookie,
    getCookie,
    getDeviceInfo,
};