require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块

// 获取端口
const server_port = process.env.SERVER_PORT;

// 统计static文件下的不同类型文件数量
const countFileTypes = async (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        return { error: "static 文件夹不存在" };
    }

    const fileCounts = {};
    const fileDetails = []; // 存储文件详细信息

    try {
        const files = (await fs.promises.readdir(dirPath)).filter(f => !f.startsWith('.')); // 过滤隐藏文件

        console.log("读取到的文件:", files);

        // 遍历文件，获取扩展名和创建时间
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = await fs.promises.stat(filePath); // 获取文件信息
            const ext = path.extname(file).toLowerCase(); // 获取扩展名
            const createdTime = stats.birthtime; // 获取创建时间

            // console.log(`文件: ${file}, 扩展名: ${ext}, 创建时间: ${createdTime}`);

            if (ext && ext !== '') { // 确保扩展名有效
                fileCounts[ext] = (fileCounts[ext] || 0) + 1;
            }

            fileDetails.push({
                fileName: file,
                extension: ext || "无后缀",
                createdTime: createdTime.toISOString(), // 转换为标准时间格式
                openUrl: `http://localhost:${server_port}/static/${file}`,
            });
        }

        // console.log("最终统计:", fileCounts);
        return { fileCounts, fileDetails };
    } catch (error) {
        // console.error("读取文件夹失败:", error);
        return { error: "读取文件夹失败" };
    }
};

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

router.get("/file-stats", async (ctx) => {
    const staticPath = path.join(__dirname, "../../../../public/static"); // static 文件夹路径
    ctx.body = {
        code: 200,
        data: await countFileTypes(staticPath),
    };
});

// 删除某个文件
router.post("/delete-file", async (ctx) => {
    const { filename } = ctx.request.body;

    if (!filename) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名不能为空" };
        return;
    }

    const staticDir = path.join(__dirname, "../../../../public/static"); // 文件路径

    try {
        const filePath = path.join(staticDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // 删除文件
            ctx.body = { code: 200, message: "文件删除成功" };
        }
    } catch(error) {
        if(error.code === 'ENOENT') {
            ctx.status = 404;
            ctx.body = { code: 404, message: "文件不存在" };
        } else {
            ctx.status = 500;
            ctx.body = { code: 500, message: "文件删除失败" };
        }
    }
});

// 清空 static 文件夹
router.post("/clear-static", async (ctx) => {
    const staticDir = path.join(__dirname, "../../../../public/static"); // 文件路径

    try {
        // 读取 static 文件夹中的所有文件
        const files = await fs.promises.readdir(staticDir);

        if (files.length === 0) {
            ctx.body = {
                code: 200,
                message: "static 文件夹已为空"
            };
            return;
        }

        // 遍历并删除所有文件
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(staticDir, file);
            await fs.promises.unlink(filePath);
        }));

        ctx.body = {
            code: 200,
            message: "static 文件夹已清空"
        };
    } catch (error) {
        console.error("清空 static 文件夹失败:", error);
        ctx.body = {
            code: 500,
            error: "清空 static 文件夹失败"
        };
    }
})

// 获取文件名下的文件内容,使用html返回
router.post('/get-file-content', async (ctx) => {
    const { filename } = ctx.request.body;

    if (!filename) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名不能为空" };
        return;
    }

    const staticDir = path.join(__dirname, "../../../../public/static"); // 文件路径

    try {
        const filePath = path.join(staticDir, filename);
        if (fs.existsSync(filePath
        )) {
            const fileContent = fs.readFileSync(filePath, 'utf8');

            ctx.body = {
                code: 200,
                data: fileContent,
            };
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            ctx.status = 404;
            ctx.body = { code: 404, message: "文件不存在" };
        } else {
            ctx.status = 500;
            ctx.body = { code: 500, message: "读取文件失败" };
        }
    }
});

module.exports = router; // 导出路由