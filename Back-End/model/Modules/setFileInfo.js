const { axiosPost } = require('../../api/index');

const setFileInfo = async (filename,content,username) => {
    try {
        const res = await axiosPost('/insertFileInfo', {
            filename,
            content,
            username,
        });
        return res.data;
    } catch {
        throw new Error('插入文件信息失败');
    }
}

module.exports = {
    setFileInfo,
};