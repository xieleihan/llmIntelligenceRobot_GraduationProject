require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

function jsonToHtml(json) {
    let html = '<div class="json-content">';
    for (const key in json) {
        if (typeof json[key] === "object") {
            html += `<div class="${key}">${jsonToHtml(json[key])}</div>`; // 递归处理嵌套对象
        } else {
            html += `<p><strong>${key}:</strong> ${json[key]}</p>`;
        }
    }
    html += "</div>";
    return html;
}

router.post("/json-to-html", async (ctx) => {
    try {
        const { jsonString } = ctx.request.body; // 获取请求体中的 jsonString
        if (!jsonString) {
            ctx.body = { error: "缺少 jsonString 参数" };
            return;
        }

        // **解析 JSON 字符串**
        const jsonData = JSON.parse(jsonString);

        // **转换为 HTML**
        const htmlResult = jsonToHtml(jsonData);

        ctx.body = { result: htmlResult, code: 200 };
    } catch (error) {
        ctx.body = { error: "JSON 解析失败", details: error.message };
    }
});


module.exports = router;