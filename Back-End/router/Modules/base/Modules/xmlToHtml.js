require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const xml2js = require('xml2js'); // 导入xml2js

// 创建XML解析器
const parser = new xml2js.Parser({
    explicitArray: false, // 让单个元素解析为对象，而不是数组
});

// 创建 XML 生成器
const builder = new xml2js.Builder();

// 解析XML
async function parseXml(xmlData) {
    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                console.error('XML 解析失败:', err);
                reject(err);
                return;
            }
            const htmlContent = xmlToHtml(result);
            resolve(htmlContent);
        });
    });
}

function stringToXml(text) {
    // 定义 XML 结构
    const obj = {
        document: {
            body: text // 把字符串作为 XML 的 body 内容
        }
    };

    // 生成 XML
    return builder.buildObject(obj);
}

// 将 XML 结构转换成 HTML
function xmlToHtml(obj) {
    let html = '<div class="xml-content">';
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // 处理对象或数组
            html += `<div class="${key}">${xmlToHtml(obj[key])}</div>`;
        } else {
            // 直接输出文本内容
            html += `<p><strong>${key}:</strong> ${obj[key]}</p>`;
        }
    }
    html += '</div>';
    return html;
}

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

router.post("/xml-to-html", async (ctx) => {
    const { xml } = ctx.request.body; // 获取请求体中的xml字段
    if (!xml) {
        ctx.body = { error: "缺少xml字段" };
        return;
    }

    try {
        const result = await parseXml(stringToXml(xml)); // 解析XML并转换成HTML
        ctx.body = { result, code: 200 }; // 返回解析后的HTML
    } catch (error) {
        ctx.body = { error: "解析XML失败", code: 500 };
    }
});

module.exports = router;