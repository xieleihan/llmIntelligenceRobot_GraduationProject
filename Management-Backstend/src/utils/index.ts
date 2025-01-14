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

export {
    parseTime
};