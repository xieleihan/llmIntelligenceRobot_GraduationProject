const { axiosPost } = require('../../api/index');

const setFileInfo = async (filename,content,username) => {
    console.log('filename:', filename, 'content:', content, 'username:', username);
    axiosPost('/protected/insertFileInfo', {
        "filename":filename,
        "content":content,
        "username":username,
    });
}

module.exports = {
    setFileInfo,
};