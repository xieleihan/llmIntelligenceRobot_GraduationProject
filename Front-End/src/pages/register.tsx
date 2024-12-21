import '../style/register.scss';

import { useState } from 'react';
import { Button, Toast } from 'antd-mobile'

// 导入图标信息
import ReturnBtn from '../assets/icon/left-heightlight.svg';

// 路由跳转
import { useNavigate, useOutletContext } from "react-router-dom"

// Define the type for the context
interface OutletContextType {
    handleDataFromChild: (data: boolean) => void;
}

function Register() {

    // 定义React变量
    const [username, setUsername] = useState(''); // 用户名
    const [email, setEmail] = useState(''); // 邮箱
    const [password, setPassword] = useState(''); // 密码
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [confirmProtocol, setConfirmProtocol] = useState(false); // 确认用户协议

    // 定义正则表达式
    const usernameReg = /^[a-zA-Z0-9_]{1,}$/; // 用户名正则
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 邮箱正则
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; // 密码正则

    // 从父组件获取回调函数
    const { handleDataFromChild } = useOutletContext<OutletContextType>();

    // 初始化导航
    const navigate = useNavigate()

    return (
        <>
            <div className="register">
                <div
                    className="returnBtn"
                    onClick={() => { 
                        navigate('/')
                        // 向父组件传递数据
                        handleDataFromChild(true)
                    }}
                >
                    <img src={ ReturnBtn } alt="" />
                </div>

                <div className='container'>
                    <div className='title'>注册</div>
                    <p className='info'>Register</p>
                    <p className='desc'>探索未知之境</p>
                    <input
                        onInput={
                            (e) => {
                                setUsername(e.currentTarget.value)
                            }
                        }
                        className='inputVal'
                        type="text"
                        placeholder="请输入用户名"
                    />
                    <input
                        className='inputVal'
                        type="email"
                        placeholder="请输入邮箱"
                        onInput={
                            (e) => {
                                setEmail(e.currentTarget.value)
                            }
                        }
                    />
                    <input
                        className='inputVal'
                        type="password"
                        placeholder="请输入密码"
                        onInput={
                            (e) => {
                                setPassword(e.currentTarget.value)
                            }
                        }
                    />
                    <input
                        className='inputVal'
                        type="password"
                        placeholder="请确认密码"
                        onInput={
                            (e) => {
                                setConfirmPassword(e.currentTarget.value)
                            }
                        }
                    />
                    <div className='radioBox'>
                        <input
                            type="checkbox"
                            checked={confirmProtocol}
                            onChange={
                                () => {
                                    setConfirmProtocol(!confirmProtocol)
                                }
                            }
                        />
                        <span>我已阅读<a className='link' href='#'>《用户协议》</a>和<a className='link' href='#'>《隐私政策》</a></span>
                    </div>
                    <Button block color='primary' size='large'
                        onClick={
                            () => {
                                // 优先判断输入框输入
                                if(username === '' || email === '' || password === '' ||    confirmPassword === '') {
                                    Toast.show({
                                        content: '请填写完整信息',
                                        duration: 2000
                                    })
                                } else if (password !== confirmPassword) {
                                    Toast.show({
                                        content: '两次密码不一致',
                                        duration: 2000
                                    })
                                } else if (confirmProtocol === false) {
                                    Toast.show({
                                        content: '请先同意用户协议',
                                        duration: 2000
                                    })
                                }else if(usernameReg.test(username)) {
                                    Toast.show({
                                        content: '用户名只能由字母、数字、下划线组成',
                                        duration: 2000
                                    })
                                } else if (!emailReg.test(email)) {
                                    Toast.show({
                                        content: '邮箱格式错误',
                                        duration: 2000
                                    })
                                }else if (!passwordReg.test(password)) {
                                    Toast.show({
                                        content: '密码必须包含字母和数字，长度在6-20之间',
                                        duration: 2000
                                    })
                                }

                            }
                        }
                        className='registerBtn'>
                        下一步
                    </Button>
                    <p className='goToLoginPages'>已有账户,点击跳转登录</p>
                </div>
            </div>
        </>
    );
}

export default Register;