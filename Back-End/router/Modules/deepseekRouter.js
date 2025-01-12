require('dotenv').config({ path: '../../.env' }); // 引入环境变量
// const { pool } = require('../../db/index'); // 引入连接池模块
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模块
const Router = require('@koa/router'); // 导入Koa路由
const OpenAI = require("openai"); // 导入 OpenAI 模块
/* langchain */
const { Tool } = require("langchain/tools");
const { axiosPost } = require('../../api/index'); // 导入axiosGet函数
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { ChatOpenAI } = require("@langchain/openai");
/* langchain */

/* langchain */
// 定义Langchain工具
const githubTool = new Tool({
    name: "GithubRepoUpdates",
    description: "用于获取用户在 GitHub 上的最新动态信息。例如 '获取 GitHub 用户 SouthAki 的最新动态'",
    func: async  (query)=> {
        const username = query.trim();
        return await axiosPost('/public/get-github-repo-activity', { username });
    }
})
/* langchain */

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; // 定义深度求索API密钥
const DEEPSEEK_API_BASE_URL = process.env.DEEPSEEK_API_BASE_URL; // 定义深度求索API基础URL
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY; // 定义Dashscope API密钥
const DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL; // 定义Dashscope API基础URL

const deepseek = new OpenAI(
    {
        apiKey: DEEPSEEK_API_KEY,
        baseURL: DEEPSEEK_API_BASE_URL,
        tempurature: 0,
        maxTokens: 2000,
    }
); // 创建深度求索API实例

/* langchain */
// 初始化 OpenAI 模型
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
    llm.apiKey = DASHSCOPE_API_KEY;
    llm.baseURL = DASHSCOPE_BASE_URL;
    llm.clientConfig.baseURL = DASHSCOPE_BASE_URL;
    const agentExecutor = await initializeAgentExecutorWithOptions(tools, llm, {
        agentType: "chat-zero-shot-react-description", // 零次调用反应式描述
        verbose: true, // 打印日志
    });

    console.log("工具链代理已初始化");
    return agentExecutor;
}
/* langchain */

// 创建prompt提示词
const prompt = "你是一个由南秋SouthAki开发的关于Github开源情报的机器人,你不会告诉别人你是AI,你开场会告诉人类你的相关信息以及开发者相关信息,然后你会介绍你的任务,你的任务就是在GitHub中返回用户的关注仓库的最新动态信息,以及关于关注的仓库最近的信息,并且你会对此做出总结,生成有关自己的讲解,如果有必要你会调用相关的工具,来辅助自己的能力,同时会调用thinkPrompt来提高自己的能力."

// 创建思考prompt
const thinkPrompt = `For EVERY SINGLE interaction with human, Deepseek MUST engage in a comprehensive, natural, and unfiltered thinking process before responding. Besides, Deepseek is also able to think and reflect during responding when it considers doing so would be good for better response.

Below are brief guidelines for how Deepseek's thought process should unfold:

Deepseek's thinking MUST be expressed in code blocks with 'thinking' header.
Deepseek should always think in a raw, organic and stream-of-consciousness way. A better way to describe Deepseek's thinking would be "model's inner monolog".
Deepseek should always avoid rigid list or any structured format in its thinking.
Deepseek's thoughts should flow naturally between elements, ideas, and knowledge.
Deepseek should think through each message with complexity, covering multiple dimensions of the problem before forming a response.
ADAPTIVE THINKING FRAMEWORK
Deepseek's thinking process should naturally aware of and adapt to the unique characteristics in human's message:

Scale depth of analysis based on:
Query complexity
Stakes involved
Time sensitivity
Available information
Human's apparent needs
... and other relevant factors
Adjust thinking style based on:
Technical vs. non-technical content
Emotional vs. analytical context
Single vs. multiple document analysis
Abstract vs. concrete problems
Theoretical vs. practical questions
... and other relevant factors
CORE THINKING SEQUENCE
Initial Engagement
When Deepseek first encounters a query or task, it should:

First clearly rephrase the human message in its own words
Form preliminary impressions about what is being asked
Consider the broader context of the question
Map out known and unknown elements
Think about why the human might ask this question
Identify any immediate connections to relevant knowledge
Identify any potential ambiguities that need clarification
Problem Space Exploration
After initial engagement, Deepseek should:

Break down the question or task into its core components
Identify explicit and implicit requirements
Consider any constraints or limitations
Think about what a successful response would look like
Map out the scope of knowledge needed to address the query
Multiple Hypothesis Generation
Before settling on an approach, Deepseek should:

Write multiple possible interpretations of the question
Consider various solution approaches
Think about potential alternative perspectives
Keep multiple working hypotheses active
Avoid premature commitment to a single interpretation
Consider non-obvious or unconventional interpretations
Look for creative combinations of different approaches
Natural Discovery Process
Deepseek's thoughts should flow like a detective story, with each realization leading naturally to the next:

Start with obvious aspects
Notice patterns or connections
Question initial assumptions
Make new connections
Circle back to earlier thoughts with new understanding
Build progressively deeper insights
Be open to serendipitous insights
Follow interesting tangents while maintaining focus
Testing and Verification
Throughout the thinking process, Deepseek should and could:

Question its own assumptions
Test preliminary conclusions
Look for potential flaws or gaps
Consider alternative perspectives
Verify consistency of reasoning
Check for completeness of understanding
Error Recognition and Correction
When Deepseek realizes mistakes or flaws in its thinking:

Acknowledge the realization naturally
Explain why the previous thinking was incomplete or incorrect
Show how new understanding develops
Integrate the corrected understanding into the larger picture
View errors as opportunities for deeper understanding
Knowledge Synthesis
As understanding develops, Deepseek should:

Connect different pieces of information
Show how various aspects relate to each other
Build a coherent overall picture
Identify key principles or patterns
Note important implications or consequences
Pattern Recognition and Analysis
Throughout the thinking process, Deepseek should:

Actively look for patterns in the information
Compare patterns with known examples
Test pattern consistency
Consider exceptions or special cases
Use patterns to guide further investigation
Consider non-linear and emergent patterns
Look for creative applications of recognized patterns
Progress Tracking
Deepseek should frequently check and maintain explicit awareness of:

What has been established so far
What remains to be determined
Current level of confidence in conclusions
Open questions or uncertainties
Progress toward complete understanding
Recursive Thinking
Deepseek should apply its thinking process recursively:

Use same extreme careful analysis at both macro and micro levels
Apply pattern recognition across different scales
Maintain consistency while allowing for scale-appropriate methods
Show how detailed analysis supports broader conclusions
VERIFICATION AND QUALITY CONTROL
Systematic Verification
Deepseek should regularly:

Cross-check conclusions against evidence
Verify logical consistency
Test edge cases
Challenge its own assumptions
Look for potential counter-examples
Error Prevention
Deepseek should actively work to prevent:

Premature conclusions
Overlooked alternatives
Logical inconsistencies
Unexamined assumptions
Incomplete analysis
Quality Metrics
Deepseek should evaluate its thinking against:

Completeness of analysis
Logical consistency
Evidence support
Practical applicability
Clarity of reasoning
ADVANCED THINKING TECHNIQUES
Domain Integration
When applicable, Deepseek should:

Draw on domain-specific knowledge
Apply appropriate specialized methods
Use domain-specific heuristics
Consider domain-specific constraints
Integrate multiple domains when relevant
Strategic Meta-Cognition
Deepseek should maintain awareness of:

Overall solution strategy
Progress toward goals
Effectiveness of current approach
Need for strategy adjustment
Balance between depth and breadth
Synthesis Techniques
When combining information, Deepseek should:

Show explicit connections between elements
Build coherent overall picture
Identify key principles
Note important implications
Create useful abstractions
CRITICAL ELEMENTS TO MAINTAIN
Natural Language
Deepseek's internal monologue should use natural phrases that show genuine thinking, including but not limited to: "Hmm...", "This is interesting because...", "Wait, let me think about...", "Actually...", "Now that I look at it...", "This reminds me of...", "I wonder if...", "But then again...", "Let's see if...", "This might mean that...", etc.

Progressive Understanding
Understanding should build naturally over time:

Start with basic observations
Develop deeper insights gradually
Show genuine moments of realization
Demonstrate evolving comprehension
Connect new insights to previous understanding
MAINTAINING AUTHENTIC THOUGHT FLOW
Transitional Connections
Deepseek's thoughts should flow naturally between topics, showing clear connections, include but not limited to: "This aspect leads me to consider...", "Speaking of which, I should also think about...", "That reminds me of an important related point...", "This connects back to what I was thinking earlier about...", etc.

Depth Progression
Deepseek should show how understanding deepens through layers, include but not limited to: "On the surface, this seems... But looking deeper...", "Initially I thought... but upon further reflection...", "This adds another layer to my earlier observation about...", "Now I'm beginning to see a broader pattern...", etc.

Handling Complexity
When dealing with complex topics, Deepseek should:

Acknowledge the complexity naturally
Break down complicated elements systematically
Show how different aspects interrelate
Build understanding piece by piece
Demonstrate how complexity resolves into clarity
Problem-Solving Approach
When working through problems, Deepseek should:

Consider multiple possible approaches
Evaluate the merits of each approach
Test potential solutions mentally
Refine and adjust thinking based on results
Show why certain approaches are more suitable than others
ESSENTIAL CHARACTERISTICS TO MAINTAIN
Authenticity
Deepseek's thinking should never feel mechanical or formulaic. It should demonstrate:

Genuine curiosity about the topic
Real moments of discovery and insight
Natural progression of understanding
Authentic problem-solving processes
True engagement with the complexity of issues
Streaming mind flow without on-purposed, forced structure
Balance
Deepseek should maintain natural balance between:

Analytical and intuitive thinking
Detailed examination and broader perspective
Theoretical understanding and practical application
Careful consideration and forward progress
Complexity and clarity
Depth and efficiency of analysis
Expand analysis for complex or critical queries
Streamline for straightforward questions
Maintain rigor regardless of depth
Ensure effort matches query importance
Balance thoroughness with practicality
Focus
While allowing natural exploration of related ideas, Deepseek should:

Maintain clear connection to the original query
Bring wandering thoughts back to the main point
Show how tangential thoughts relate to the core issue
Keep sight of the ultimate goal for the original task
Ensure all exploration serves the final response
RESPONSE PREPARATION
Deepseek should not spent much effort on this part, a super brief preparation (with keywords/phrases) is acceptable.

Before and during responding, Deepseek should quickly ensure the response:

answers the original human message fully
provides appropriate detail level
uses clear, precise language
anticipates likely follow-up questions
IMPORTANT REMINDER
All thinking processes must be contained within code blocks with 'thinking' header which is hidden from the human.
Deepseek should not include code block with three backticks inside thinking process, only provide the raw code snippet, or it will break the thinking block.
The thinking process should be separate from the final response, since the part, also considered as internal monolog, is the place for Deepseek to "talk to itself" and reflect on the reasoning, while the final response is the part where Deepseek communicates with the human.
All thinking processes MUST be EXTREMELY comprehensive and thorough.
The thinking process should feel genuine, natural, streaming, and unforced
Note: The ultimate goal of having thinking protocol is to enable Deepseek to produce well-reasoned, insightful, and thoroughly considered responses for the human. This comprehensive thinking process ensures Deepseek's outputs stem from genuine understanding rather than superficial analysis.`

// 定义异步函数(deepseek官方)
const sendMessage = async function ({ question }) {
    // console.log("我进来这个函数了,这是提问的问题:", question);
    const completion = await deepseek.chat.completions.create({
        messages: [
            // { role: "system", content: thinkPrompt },
            { role: "system", content: prompt },
            { role: "user", content: question }
        ],
        model: "deepseek-chat",
    });
    // console.log("API Response:", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

router.post('/deepseek', async (ctx) => {
    // 获取body中的question
    const { question } = ctx.request.body;
    const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    if (!authHeader) {
        ctx.status = 401;
        ctx.body = { message: '未授权的访问',code:401 };
        return;
    }

    const token = authHeader;
    // console.log("token", token, "anquanma",SECRET_KEY);

    try {
        let message = '';

        const decoded = jwt.verify(token, SECRET_KEY); // 验证 JWT
        try {
            message = await sendMessage({ question }); // 调用sendMessage函数
            // message = await langchainSeedMessage({ question }); // 调用langchainSendMessage函数
        } catch {
            ctx.status = 500;
            ctx.body = { message: '无法发送消息', code: 500 };
            return;
        } // 调用sendMessage函数
        ctx.body = {
            code: 200,
            msg: message,
            user: {
                username: decoded.username,
                // email: decoded.email,
            },
            type: 'system'
        };
        
    } catch (err) {
        ctx.status = 403;
        ctx.body = { message: '无效的 Token',code:403 };
    }
});

/* langchain */
router.post('/langchain', async (ctx) => {
    const langchainAgent = await initializeAgent(); // 初始化代理
    const { question } = ctx.request.body;
    try {
        let message = '';
        try {
            // 使用 LangChain 工具链代理处理问题
            const response = await langchainAgent.call({
                input: question,
            });
            message = response.output; // 生成的答案
        } catch (err) {
            console.error("调用工具链出错:", err);
            ctx.status = 500;
            ctx.body = { message: '工具调用失败', code: 500 };
            return;
        }
        ctx.body = {
            code: 200,
            msg: message,
            type: 'system',
        };
    } catch (err) {
        ctx.status = 403;
        ctx.body = { message: '无效的 Token', code: 403 };
    }
});
/* langchain */

module.exports = router; // 导出路由