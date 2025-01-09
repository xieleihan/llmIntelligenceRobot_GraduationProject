const os = require('os'); // 导入操作系统模块

/**
 * 获取服务端的CPU和内存占用情况(GET)
 * @returns {Object} 服务端的CPU和内存占用情况
 */
const getServerState = async () => {
    const totalMemory = os.totalmem(); // 获取总内存
    const freeMemory = os.freemem(); // 获取空闲内存
    const usedMemory = totalMemory - freeMemory; // 获取已使用内存

    const cpuUsage = os.cpus().map((cpu, index) => {
        const total = cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;
        const usage = ((total - cpu.times.idle) / total) * 100;
        return {
            core: index,
            usage: usage.toFixed(2)
        };
    });

    // CPU占用情况(全部核心)
    const total = cpuUsage.reduce((acc, cur) => acc + parseFloat(cur.usage), 0);

    return {
        memory: {
            total: (totalMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            used: (usedMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            free: (freeMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
        },
        cpu: {
            cpuUsage:cpuUsage,
            total: total.toFixed(2) + '%'
        }
    };
};

// 导出服务端状态获取函数
module.exports = {
    getServerState
};