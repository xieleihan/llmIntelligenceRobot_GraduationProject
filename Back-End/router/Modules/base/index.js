// 保存各种文件的模块
const saveMd = require('./Modules/saveMd');
const savePdf = require('./Modules/savePdf');
const saveHtml = require('./Modules/saveHtml');
const saveXml = require('./Modules/saveXml');
const saveJson = require('./Modules/saveJson');
const saveDocx = require('./Modules/saveDocx');
const saveTxt = require('./Modules/saveTxt');

// 获取文件信息的模块
const getSaveNumber = require('./Modules/getSaveNumber');

// 将对应的文件转回HTML格式的模块
const xmlToHtml = require('./Modules/xmlToHtml');
const jsonToHtml = require('./Modules/jsonToHtml');
const docxToHtml = require('./Modules/docxToHtml'); // 暂时不可用
const txtToHtml = require('./Modules/txtToHtml');
const mdToHtml = require('./Modules/mdToHtml');
const pdfToHtml = require('./Modules/pdfToHtml');

// 导出全部引入的模块
module.exports = {
    saveMd,
    savePdf,
    saveHtml,
    saveXml,
    saveJson,
    saveDocx,
    saveTxt,
    getSaveNumber,
    xmlToHtml,
    jsonToHtml,
    docxToHtml,
    txtToHtml,
    mdToHtml,
    pdfToHtml
}