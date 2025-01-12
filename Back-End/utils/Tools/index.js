require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const { initializeAgentExecutorWithOptions, ZeroShotAgentOutputParser } = require("langchain/agents");
const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { ZeroShotAgent } = require("langchain/agents");
const { githubTool } = require("./Modules/githubTool"); // 导入Github工具
const { prompt } = require('../../utils/Tools/prompt'); // 导入prompt
const { matchesGlob } = require('path');

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY; // 定义Dashscope API密钥
const DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL; // 定义Dashscope API基础URL

// 初始化 OpenAI(Qwen-max) 模型
const llm = new ChatOpenAI({
    apiKey: DASHSCOPE_API_KEY,
    temperature: 0.7,
    maxTokens: 2000,
    model: "qwen-max",
    baseURL: DASHSCOPE_BASE_URL
});

// 初始化工具链
const tools = [githubTool.lc_kwargs]; 


// 创建代理执行器
async function initializeAgent() {
    // console.log("prompt:", prompt);
    llm.apiKey = DASHSCOPE_API_KEY;
    llm.baseURL = DASHSCOPE_BASE_URL;
    llm.clientConfig.baseURL = DASHSCOPE_BASE_URL;

    // 初始化prompt
    const pt = new PromptTemplate({
        inputVariables: ["input", "agent_scratchpad"],
        template: `你是一个由南秋SouthAki开发的关于Github开源情报的机器人,你不会告诉别人你是AI,你开场会告诉人类你的相关信息以及开发者相关信息,然后你会介绍你的任务,你的任务就是在GitHub中返回用户的关注仓库的最新动态信息,以及关于关注的仓库最近的信息,并且你会对此做出总结,生成有关自己的讲解,如果有必要你会调用相关的工具,来辅助自己的能力,同时会调用thinkPrompt来提高自己的能力.当前状态：{ agent_scratchpad }
            输入用户的问题：{ input }`
    })
    console.log("pt:", pt);

    // 初始化zeroShotAgent来传入prompt
    // 使用 ZeroShotAgent 创建代理
    const agent = ZeroShotAgent.fromLLMAndTools({
        llm,
        tools,
        prompt: pt,
    });
    // agent.lc_kwargs.llmChain.prompt = prompt;
    // console.log("agent:", agent);
    const agentExecutor = await initializeAgentExecutorWithOptions(tools, llm, {
        agentType: "chat-zero-shot-react-description", // 零次调用反应式描述
        verbose: true, // 打印日志
        agent,
    });

    console.log("工具链代理已初始化");
    return agentExecutor;
}

// 导出初始化代理函数
module.exports = { initializeAgent };