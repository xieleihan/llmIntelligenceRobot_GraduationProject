const saveMd = require('./Modules/saveMd');
const savePdf = require('./Modules/savePdf');
const saveHtml = require('./Modules/saveHtml');
const saveXml = require('./Modules/saveXml');
const saveJson = require('./Modules/saveJson');
const saveDocx = require('./Modules/saveDocx');
const saveTxt = require('./Modules/saveTxt');
const getSaveNumber = require('./Modules/getSaveNumber');

// 导出全部引入的模块
module.exports = {
    saveMd,
    savePdf,
    saveHtml,
    saveXml,
    saveJson,
    saveDocx,
    saveTxt,
    getSaveNumber
}