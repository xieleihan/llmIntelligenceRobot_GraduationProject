require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const { initializeAgentExecutorWithOptions, ZeroShotAgentOutputParser } = require("langchain/agents");
const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { LLMChain } = require("langchain/chains");
const { ZeroShotAgent } = require("langchain/agents");
const { githubTool } = require("./Modules/githubTool"); // 导入Github工具
const { prompt } = require('../../utils/Tools/prompt'); // 导入prompt

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

// 创建代理执行器
async function initializeAgent() {
    // console.log("prompt:", prompt);
    llm.apiKey = DASHSCOPE_API_KEY;
    llm.baseURL = DASHSCOPE_BASE_URL;
    llm.clientConfig.baseURL = DASHSCOPE_BASE_URL;
    
    // 初始化工具链
    // const tools = [githubTool.lc_kwargs]; 
    const tools = [githubTool];
    console.log("tools:", tools);
    // 初始化prompt
    const pt = new PromptTemplate({
        template: `你是一个由南秋SouthAki开发的关于Github开源情报的机器人。你不会告诉别人你是AI，你开场会告诉人类你的相关信息以及开发者相关信息。
        你的任务是：
        1. 在GitHub中返回用户的关注仓库的最新动态信息；
        2. 包括最近的更新、发布的版本、提交的代码变更等；
        3. 并为用户总结这些信息。

        你有以下工具可以调用：
            - GithubRepoUpdates: 用于获取用户在 GitHub 上的最新动态信息。例如 '获取 GitHub 用户 SouthAki 的最新动态'

        你的回答应该严格遵循以下格式：
            Question: [用户的问题]
            Thought: [你对问题的思考,当思考超过3次后,你需要给出一个回答]
            Action: the action to take, should be one of [["GithubRepoUpdates"]]
            Action Input: [工具的输入参数]
            Observation: [工具返回的结果,如果需要的话才返回]
            Thought: [进一步的思考]
            Final Answer: [最终回答用户的问题]
        输入用户的问题：{input}
        `,
        
        inputVariables: ["input"],
    })
    // console.log("pt:", pt);

    // 创建自定义 OutputParser（可选）
    class CustomOutputParser extends ZeroShotAgentOutputParser {
        async parse(output) {
            try {
                // 如果包含 "Final Answer"，提取其后的内容
                if (output.includes("Final Answer:")) {
                    return {
                        type: "return",
                        returnValue: output.split("Final Answer:")[1].trim(), // 提取最终答案
                    };
                }
                // 如果是以自然语言返回的,返回对象的text的值
                return {
                    type: "Final Answer:",
                    returnValue: output.text,
                };

                // 如果不包含 "Final Answer"，抛出格式化错误
                // throw new Error("Output format is invalid. Missing 'Final Answer:'");
            } catch (err) {
                console.error("Output parsing failed:", err);
                throw err;
            }
        }
    }

    // 初始化zeroShotAgent来传入prompt
    // 使用 ZeroShotAgent 创建代理

    const agent = ZeroShotAgent.fromLLMAndTools(llm,
        tools, {
            prompt: pt,
            outputParser: new CustomOutputParser(),
    });
    console.log("绑定的 PromptTemplate:", agent.llmChain.prompt.template);
    agent.llmChain.prompt.template = pt.template;

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