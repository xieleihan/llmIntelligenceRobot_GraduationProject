require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
const { marked } = require("marked"); // 导入marked模块
const { JSDOM } = require("jsdom"); // 导入jsdom模块
const { create } = require('xmlbuilder2'); // 导入xmlbuilder2模块

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const server_port = process.env.SERVER_PORT; // 定义POST

// 接收Markdown内容转换成XML并保存
router.post('/save-xml', async (ctx) => {
    const { filename, content } = ctx.request.body;

    // 校验参数
    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        // Markdown 转 HTML
        const htmlContent = await marked.parse(content);

        // HTML 转 XML
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        const xmlObj = { document: {} };
        const convertElement = (node) => {
            if (node.nodeType === 3) {
                return node.textContent.trim() ? node.textContent : null;
            }
            if (node.nodeType !== 1) return null;

            const obj = { [node.tagName.toLowerCase()]: {} };
            if (node.attributes.length) {
                obj[node.tagName.toLowerCase()].$ = {};
                for (let attr of node.attributes) {
                    obj[node.tagName.toLowerCase()].$[attr.name] = attr.value;
                }
            }

            let children = [];
            for (let child of node.childNodes) {
                let converted = convertElement(child);
                if (converted) children.push(converted);
            }
            if (children.length) {
                obj[node.tagName.toLowerCase()]._ = children;
            }
            return obj;
        };

        xmlObj.document = convertElement(document.body) || {};

        // 生成 XML 字符串
        const xmlString = create(xmlObj).end({ prettyPrint: true });

        // 保存到 static 目录
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        const xmlPath = path.join(staticDir, `${filename}.xml`);
        fs.writeFileSync(xmlPath, xmlString);

        ctx.body = {
            code: 200,
            message: "XML 生成成功",
            url: `http://localhost:${server_port}/static/${filename}.xml`,
        };
    } catch (error) {
        console.error("XML 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "XML 生成失败" };
    }
})

module.exports = router;