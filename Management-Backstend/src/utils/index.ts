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

export {
    parseTime,
    getNowTime
};