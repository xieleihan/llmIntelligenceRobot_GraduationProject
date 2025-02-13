<template>
    <div class="userFeedback">
        <div class="left">
            <div
                class="item"
                v-for="(item) in userMsg"
                :key="item.uuid"
                @click="setContentMsg(item)"
            >
                <div class="lleft">
                    <div class="avater">
                        <el-icon v-if="item.avater === ''">
                            <UserFilled />
                        </el-icon>
                        <img
                            v-else="item.avater !==''"
                            :src="item.avater"
                            alt=""
                        >
                    </div>
                </div>
                <div class="lright">
                    <div class="username">{{ item.username }}</div>
                    <div class="time">{{ item.time }}</div>
                    <div class="desc">{{ item.desc }}</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="toptop">
                    <div class="top-left">
                        <div class="avater">
                            <el-icon v-if="avater === '' && contentMsg && !contentMsg.avater">
                                <UserFilled />
                            </el-icon>
                            <img
                                v-else-if="contentMsg"
                                :src="contentMsg.avater"
                                alt=""
                            >
                        </div>
                        <div
                            class="username"
                            v-if="contentMsg && !contentMsg.username"
                        >系统信息</div>
                        <div
                            class="username"
                            v-if="contentMsg && contentMsg.username"
                        >{{ contentMsg.username }}</div>
                        <div class="label">
                            <el-tag
                                v-if="contentMsg && contentMsg.id === 3"
                                type="success"
                                size="small"
                            >P2 -低优先级</el-tag>
                            <el-tag
                                v-if="contentMsg && contentMsg.id === 2"
                                type="warning"
                                size="small"
                            >P1 -升级优先度</el-tag>
                            <el-tag
                                v-if="contentMsg && contentMsg.id === 1"
                                type="danger"
                                size="small"
                            >P0 -紧急修复反馈</el-tag>
                        </div>
                    </div>
                    <div class="top-right">
                        <el-icon>
                            <More />
                        </el-icon>
                    </div>
                </div>
                <section class="content">
                    <div
                        v-show="!contentMsg"
                        class="noArrayData"
                    >
                        <p class="noData">
                            <el-icon>
                                <SuccessFilled />
                            </el-icon>
                            你暂时没有新的消息
                        </p>
                    </div>
                    <ContentMsg
                        v-if="contentMsg"
                        :contentMsg="contentMsg"
                    />
                </section>
            </div>
            <div class="bottom">
                <textarea
                    @input="setValue"
                    maxlength="200"
                    class="textarea"
                    name=""
                    id=""
                    placeholder="请输入回复内容"
                ></textarea>
                <div class="box">
                    <span v-if="contentMsg">字符限制:<span>{{ inputValue.length }}</span>/200</span>
                    <el-button
                        v-if="contentMsg"
                        type="primary"
                    >发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { onMounted, ref } from 'vue';

// 导入组件
import ContentMsg from './ContentMsg.vue';

interface UserMessage {
    id: number,
    avater: string;
    username: string;
    time: string;
    desc: string;
    uuid: string;
}

const avater = ref('/src/assets/images/avater.jpg'); // 头像
const userMsg = ref<UserMessage[]>([]); // 用户信息
const contentMsg = ref<UserMessage | null>(null); // 内容信息
const inputValue = ref(''); // 输入的内容

onMounted(() => {
    userMsg.value = [
        {
            "id": 3,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 2,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张1",
            "time": "11:10:10",
            "desc": "这个系统真的1用，希望能够继续保持下去",
            "uuid": "12156"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
        {
            "id": 1,
            "avater": 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            "username": "张三",
            "time": "10:10:10",
            "desc": "这个系统真的很好用，希望能够继续保持下去",
            "uuid": "123456"
        },
    ]
})

// 设置内容组件的内容
function setContentMsg(item: UserMessage) {
    contentMsg.value = item;
    // console.log(contentMsg.value)
}

// 设置输入的内容
function setValue(e: any) {
    inputValue.value = e.target.value;
    // console.log(inputValue.value)
}
</script>

<style scoped lang="scss">
@import '../../../style/base.scss';

.userFeedback {
    width: 100%;
    height: 100%;
    display: flex;

    .left,
    .right {
        height: 100%;

    }

    ::v-deep(.left) {
        width: 20%;
        border-right: .01rem solid #ccc;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;

        // 隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }

        .item {
            &:hover {
                color: white;
                background-color: $googleBlue;
            }

            width: 100%;
            height: .5rem;
            border-bottom: .01rem solid #ccc;
            display: flex;

            .lleft {
                width: 30%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 0;

                .avater {
                    width: 80%;
                    aspect-ratio: 1/1;
                    background-color: #ccc;
                    border-radius: 50%;
                    overflow: hidden;

                    .el-icon {
                        width: 100%;
                        height: 100%;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .lright {
                width: calc(100% - 30%);
                height: 100%;
                position: relative;
                padding: .08rem .04rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .time {
                    position: absolute;
                    top: .08rem;
                    right: .08rem;
                    font-size: .08rem;
                    color: #ccc;
                }

                .username {
                    font-size: .1rem;
                    font-weight: bold;
                    width: 60%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .desc {
                    font-size: .08rem;
                    width: 70%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    .right {
        width: calc(100% - 20%);

        .top,
        .bottom {
            width: 100%;
        }

        .top {
            height: 80%;
            border-bottom: .01rem solid #ccc;

            ::v-deep(.toptop) {
                width: 100%;
                height: 10%;
                border-bottom: .01rem solid #ccc;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .1rem;

                .top-left {
                    height: 100%;
                    display: flex;
                    align-items: center;

                    .avater {
                        height: 70%;
                        aspect-ratio: 1/1;
                        border-radius: 50%;
                        overflow: hidden;
                        background-color: #ccc;
                        margin-right: .06rem;

                        .el-icon {
                            width: 100%;
                            height: 100%;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .username{
                        font-weight: bold;
                        margin-right: .1rem;
                    }
                    .label{
                        width: 2rem;
                        height: 100%;
                        overflow-x: scroll;
                        // background-color: orange;
                        display: flex;
                        align-items: center;
                        cursor: default;
                        // 隐藏滚动条
                        &::-webkit-scrollbar{
                            display: none;
                        }
                        .el-tag{
                            height: 70%;
                            width: fit-content;
                            font-size: .1rem;
                            border-radius: .05rem;
                        }
                    }
                }
            }

            .content{
                width: 100%;
                height: calc(100% - 5%);
                .noArrayData{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: url(../../../assets//images/4.gif) no-repeat center center;
                    background-size: cover;
                    .noData{
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }

        .bottom {
            height: 20%;
            padding: .1rem;
            display: flex;
            flex-direction: column;
            .textarea {
                width: 100%;
                outline: none;
                border: none;
                height: 67%;
                resize: none;
                border-bottom: .01rem solid #ccc;
                margin-bottom: .05rem;
            }
            .box{
                width: 100%;
                height: calc(100% - 67%);
                display: flex;
                justify-content: space-between;
                align-items: center;

                // padding-right: .5rem;
            }
        }

        ::v-deep(.el-button) {
            width: .4rem;
            height: .2rem;
            padding: .01rem;
            font-size: .1rem;
            display: flex;

            span {
                font-size: .1rem;
                line-height: .1rem;
            }
        }
    }
}
</style>