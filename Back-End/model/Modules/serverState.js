const os = require('os'); // 导入操作系统模块

let lastCPUTimes = os.cpus().map(cpu => cpu.times);  // 初始时的CPU数据
/**
 * 获取服务端的CPU和内存占用情况(GET)
 * @returns {Object} 服务端的CPU和内存占用情况
 */
const getServerState = async () => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const cpuUsage = os.cpus().map((cpu, index) => {
        const lastCPU = lastCPUTimes[index];
        const total = cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;
        const lastTotal = lastCPU.user + lastCPU.nice + lastCPU.sys + lastCPU.idle + lastCPU.irq;

        const usage = ((total - lastTotal - (cpu.times.idle - lastCPU.idle)) / (total - lastTotal)) * 100;

        lastCPUTimes[index] = cpu.times;  // 更新当前的CPU状态
        return {
            core: index,
            usage: usage.toFixed(2)
        };
    });

    const memoryUsage = (usedMemory / totalMemory) * 100;

    return {
        memory: {
            total: (totalMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            used: (usedMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            free: (freeMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            usage: memoryUsage.toFixed(2) + '%'
        },
        cpu: {
            cpuUsage: cpuUsage,
            total: cpuUsage.reduce((acc, cur) => acc + parseFloat(cur.usage), 0).toFixed(2) + '%'
        }
    };
};

// 导出服务端状态获取函数
module.exports = {
    getServerState
};