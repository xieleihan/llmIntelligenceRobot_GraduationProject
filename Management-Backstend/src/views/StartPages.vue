<template>
    <div
        class="main"
        :style="{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
        <div class="container">
            <div class="title">SouthAki的LLM情报机器人</div>
            <p class="desc">管理后台</p>
            <div class="inputBox">
                <div class="left">
                    <img
                        src="../assets/icon/faqRobot.svg"
                        alt=""
                    />
                </div>
                <div class="right">
                    <div class="rightTop">
                        <!-- <el-input v-model="inputUsername" placeholder="请输入管理员账号" class="input" size="small" />
            <el-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password class="input"
              size="small" /> -->
                        <input
                            type="text"
                            v-model="inputUsername"
                            placeholder="请输入管理员账号"
                            class="input"
                        />
                        <div class="passwordBox">
                            <input
                                :type="isOpenPswType"
                                v-model="inputPassword"
                                placeholder="请输入密码"
                                class="input"
                                @keyup.enter="inputEnter($event)"
                            />
                            <img
                                :src="isOpenPswHide"
                                alt=""
                                @click="toggleHidePsw"
                            >
                        </div>
                    </div>
                    <button class="login" @click="login">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref } from 'vue'
// 导入工具
import getRandomNumber from '../utils/getRandomNumber'
import { setCookie } from '../utils'

// 导入图片
import displayPsw from '../assets/icon/displayPsw.svg'
import noDisplayPsw from '../assets/icon/noDisplayPsw.svg'

// 导入网络请求
import { adminLogin } from '../api/request';

// 导入Vue-router
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter();

let isToggling = false;
function toggleHidePsw() {
    if (isToggling) return; // 如果正在切换，直接返回
    isToggling = true;

    isOpenPswHide.value = displayPsw;
    isOpenPswType.value = 'text';

    setTimeout(() => {
        isOpenPswHide.value = noDisplayPsw;
        isOpenPswType.value = 'password';
        isToggling = false; // 重置状态
    }, 2000);
}
interface resItem{
    code: number,
    token: string
}
function login() {
    adminLogin({
        superadminname: inputUsername.value,
        superadminpassword: inputPassword.value,
    })
    // @ts-ignore
        .then((res: resItem) => {
            // console.log(res);
            if (res.code === 200) {
                setCookie('AUTO_TOKEN', res.token, 1/24);
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                    customClass: 'message',
                });
                setTimeout(() => {
                    router.push('/home');
                }, 1000);
            }
        })
        .catch((err:string) => {
            ElMessage({
                message: err,
                type: 'error',
                customClass: 'message',
            });
        });
}

function inputEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        login();
    }
}

const randomNumber = ref(getRandomNumber(1, 5))
// 动态加载背景图片路径
// 静态图
// const bg = new URL(`../assets/images/${randomNumber.value}.jpg`, import.meta.url).href
// 动态图
const bg = new URL(`../assets/images/${randomNumber.value}.gif`, import.meta.url).href

// 定义变量
const inputUsername = ref('')
const inputPassword = ref('')
const isOpenPswHide = ref(noDisplayPsw)
const isOpenPswType = ref('password')
</script>

<style lang="scss" scoped>
@import '../style/base.scss';

.main {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        width: 50%;
        height: 50%;
        background-color: rgba($color: #fff, $alpha: .8);
        border-radius: $radius;
        padding: .3rem .4rem;

        .title {
            font-size: .2rem;
            font-weight: bold;
            text-align: center;
        }

        .desc {
            font-size: .1rem;
            text-align: center;
        }

        .inputBox {
            width: 100%;
            height: 80%;
            padding: .1rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                width: 50%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .right {
                width: 50%;
                height: 100%;
                padding-left: .1rem;
                border-left: .1px solid #ccc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                .rightTop {
                    width: 100%;
                    height: 100%;

                    .passwordBox {
                        position: relative;

                        img {
                            width: .15rem;
                            height: .15rem;
                            position: absolute;
                            right: 10%;
                            top: 50%;
                            transform: translateY(-50%);
                        }

                        .input {
                            margin-bottom: 0;
                        }
                    }

                    .input {
                        width: 100%;
                        height: .25rem;
                        font-size: .1rem;
                        margin-bottom: .1rem;
                        padding: 0 .1rem;
                        border: .1px solid #ccc;
                        border-radius: $radius;
                    }
                }

                .login {
                    width: 100%;
                    height: .3rem;
                    background-color: $googleBlue;
                    border-radius: $radius;
                    color: white;
                    transition: all .5s;

                    &:hover {
                        background-color: $hoverInput;
                    }
                }
            }
        }
    }
}

</style>