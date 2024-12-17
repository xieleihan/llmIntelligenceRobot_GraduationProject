// 时间格式化
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

// 解析日期
function parseDate(time: string | number | Date, sp: string = '-'): string {
    const date = new Date(time);
    return date.getFullYear().toString();
}

// 本地存储封装
function setStorage(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

function getStorage(key: string): string | null {
    return window.localStorage.getItem(key);
}

function removeStorage(key: string): void {
    window.localStorage.removeItem(key);
}

// 获取 URL 参数
function getQuery(query: string, val: string = ''): string {
    const search = window.location.search;
    let q = val;
    if (search.includes(query + "=")) {
        q = search.split(query + "=")[1];
        if (q.includes('&')) {
            q = q.split("&")[0];
        }
        if (q.includes('?')) {
            q = q.split("?")[0];
        }
        if (q.includes(':')) {
            q = q.split(":")[0];
        }
    }
    return q;
}

// 根据国家码判断服务器
function judgeHostCountry(): string {
    const country = getQuery('country', 'cn').toLowerCase();
    let hostCountry = 'cn';
    if (!country || country === 'cn') {
        hostCountry = 'cn';
    } else if (country === 'jp') {
        hostCountry = 'jp';
    } else {
        hostCountry = 'us';
    }
    return hostCountry;
}

// 判断操作系统
function judgeUserAgent(): string {
    if (/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)) {
        return "ios";
    } else if (/(Android)/i.test(window.navigator.userAgent)) {
        return "android";
    }
    return "pc";
}

// 判断是否为微信浏览器
function judgeIsWechat(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    return /MicroMessenger/i.test(ua);
}

// 判断浏览器类型
function judgeBrowser(): string[] {
    let browser: string[] = [];
    const a = window.navigator.userAgent;
    if (a.indexOf('MiuiBrowser') !== -1) { // 小米浏览器
        browser = a.match(/(MiuiBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('HuaweiBrowser') !== -1) { // 华为浏览器
        browser = a.match(/(HuaweiBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('UCBrowser') !== -1) { // UC浏览器
        browser = a.match(/(UCBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('Quark') !== -1) { // 夸克
        browser = a.match(/(Quark)\/(\S+)/) || [];
    } else if (a.indexOf('MQQBrowser') !== -1) { // QQ浏览器
        browser = a.match(/(MQQBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('baiduboxapp') !== -1) { // 百度
        browser = a.match(/(baiduboxapp)\/(\S+)/) || [];
    } else if (a.indexOf('SogouMobileBrowser') !== -1) { // 搜狗
        browser = a.match(/(SogouMobileBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('SamsungBrowser') !== -1) { // 三星浏览器
        browser = a.match(/(SamsungBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('OPR') !== -1) { // 欧朋浏览器
        browser = a.match(/(OPR)\/(\S+)/) || [];
    } else if (a.indexOf('EdgA') !== -1) { // edge手机端
        browser = a.match(/(EdgA)\/(\S+)/) || [];
    } else if (a.indexOf('Edg') !== -1) { // edge
        browser = a.match(/(Edg)\/(\S+)/) || [];
    } else if (a.indexOf('Firefox') !== -1) { // 火狐浏览器
        browser = a.match(/(Firefox)\/(\S+)/) || [];
    } else if (a.indexOf('VivoBrowser') !== -1) { // vivo浏览器
        browser = a.match(/(VivoBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('HeyTapBrowser') !== -1) { // oppo浏览器
        browser = a.match(/(HeyTapBrowser)\/(\S+)/) || [];
    } else if (a.indexOf('Chrome') !== -1) { // Chrome
        browser = a.match(/(Chrome)\/(\S+)/) || [];
    } else if (judgeUserAgent() === 'ios' && a.indexOf('Safari') !== -1) { // safari
        browser = a.match(/(Safari)\/(\S+)/) || [];
    } else {
        browser = ['', 'others', ''];
    }
    return browser;
}

// 节流，duration 时间内只执行一次 fn
function throttleFun(fn: (...args: any[]) => void, duration: number): (...args: any[]) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, duration);
    };
}

// 防抖，最后一次延时 duration 时间后执行 fn
function debounceFun(fn: (...args: any[]) => void, duration: number): (...args: any[]) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (...args: any[]) {
        clearTimeout(timer as NodeJS.Timeout);
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, duration);
    };
}

export {
    parseTime,
    setStorage,
    getStorage,
    removeStorage,
    getQuery,
    judgeUserAgent,
    judgeIsWechat,
    judgeBrowser,
    judgeHostCountry,
    throttleFun,
    debounceFun,
}
