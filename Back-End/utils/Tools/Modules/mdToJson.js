const { JSDOM } = require("jsdom");

const mdToJson = (html) => { 
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const result = [];

    function parseElement(element) {
        if (element.nodeType === 3) {
            return element.textContent.trim(); // 处理文本节点
        }

        let obj = { type: element.tagName.toLowerCase(), content: [] };

        if (element.tagName === "A") obj.href = element.getAttribute("href");
        if (element.tagName === "IMG") obj.src = element.getAttribute("src");

        element.childNodes.forEach((child) => {
            const childContent = parseElement(child);
            if (childContent) obj.content.push(childContent);
        });

        return obj;
    }

    document.body.childNodes.forEach((node) => {
        const parsed = parseElement(node);
        if (parsed) result.push(parsed);
    });

    return result;
}

module.exports = {
    mdToJson,
};