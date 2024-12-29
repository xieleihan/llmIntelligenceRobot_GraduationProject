import '../style/register.scss';
import '../style/returnBtn.scss';

import { useEffect, useState } from 'react';
import { Button, Toast, Input, Mask } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'

// 导入图标信息
import ReturnBtn from '../assets/icon/left-heightlight.svg';

// 路由跳转
import { useNavigate, useOutletContext, Outlet } from "react-router-dom"

// 导入API
import { get, post } from '../api/index'

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
    const [isVerifyPagesOpen, setIfVerifyPagesOpen] = useState(true); // 是否打开验证页面
    const [visible, setVisible] = useState(false); // 是否显示密码
    const [confirmVisible, setConfirmVisible] = useState(false); // 是否显示确认密码
    const [isContinueSend, setIsContinueSend] = useState(true); // 是否继续发送验证码
    const [sendText, setSendText] = useState('发送验证码'); // 发送验证码文本
    const [svgContent, setSvgContent] = useState(""); // 存储后端传递的 SVG 字符串
    const [verifyEmailCode, setVerifyEmailCode] = useState(''); // 邮箱验证码
    const [verifySvgCode, setVerifySvgCode] = useState(''); // 图片验证码
    const [visibleMask, setVisibleMask] = useState(false); // 定义mask

    // 定义正则表达式
    const usernameReg = /[^\w_]/g; // 用户名正则
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 邮箱正则
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; // 密码正则

    // 从父组件获取回调函数
    const { handleDataFromChild } = useOutletContext<OutletContextType>();

    // 初始化导航
    const navigate = useNavigate()

    // 生命周期
    useEffect(() => {
        getSvgCode();
    }, []);

    // 定义切换验证码函数
    function getSvgCode() {
        get('/createSvgCode', {})
            .then((response) => {
                setSvgContent(response.data)
            })
            .catch((error) => {
                console.error('获取数据失败:', error);
            });
    }

    // 定义发送验证码函数
    function sendEmailCode() {
        get('/api/email/send', { email: email })
            .then(() => {
                Toast.show({
                    content: '验证码已发送',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.error('发送验证码失败:', error);
            });
    }

    // 定义发送到后端的函数
    function register() {
        post('/public/register', {
            username: username,
            useremail: email,
            userpassword: password,
            email_code: verifyEmailCode,
            svgCode: verifySvgCode
        })
            .then((response) => {
                const str = JSON.stringify(response)
                const obj = JSON.parse(str)
                if (obj.code === 200) {
                    Toast.show({
                        content: '注册成功',
                        duration: 2000
                    })
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    Toast.show({
                        content: obj.message,
                        duration: 2000
                    })
                }
            })
            .catch((error) => {
                Toast.show({
                    content: error.response.data.error,
                    duration: 2000
                })
            })
    }

    return (
        <>
            {
                isVerifyPagesOpen ?
                    (
                        <div className="register">
                            <div
                                className="returnBtn"
                                onClick={() => {
                                    navigate('/')
                                    // 向父组件传递数据
                                    handleDataFromChild(true)
                                }}
                            >
                                <img src={ReturnBtn} alt="" />
                            </div>

                            <div className='container'>
                                <div className='title'>注册</div>
                                <p className='info'>Register</p>
                                <p className='desc'>探索未知之境</p>
                                <Input
                                    onChange={
                                        (value) => {
                                            setUsername(value)
                                        }
                                    }
                                    className='inputVal'
                                    type="text"
                                    placeholder="请输入用户名"
                                    value={username}
                                    clearable
                                />
                                <Input
                                    className='inputVal'
                                    type="email"
                                    placeholder="请输入邮箱"
                                    onChange={
                                        (value) => {
                                            setEmail(value)
                                        }
                                    }
                                    value={email}
                                    clearable
                                />
                                <div className="passwordInput">
                                    <Input
                                        className="inputVal"
                                        placeholder='请输入密码'
                                        type={visible ? 'text' : 'password'}
                                        onChange={
                                            (value) => {
                                                setPassword(value)
                                            }
                                        }
                                        value={password}
                                    />
                                    <div className="img">
                                        {!visible ? (
                                            <EyeInvisibleOutline onClick={
                                                () => {
                                                    setVisible(true)
                                                    const closeLook = setTimeout(() => {
                                                        setVisible(false)
                                                        clearTimeout(closeLook)
                                                    }, 2000)

                                                }
                                            } />
                                        ) : (
                                            <EyeOutline onClick={() => setVisible(false)} />
                                        )}
                                    </div>
                                </div>
                                <div className="passwordInput">
                                    <Input
                                        className="inputVal"
                                        placeholder='请确认输入密码'
                                        type={confirmVisible ? 'text' : 'password'}
                                        onChange={
                                            (value) => {
                                                setConfirmPassword(value)
                                            }
                                        }
                                        value={confirmPassword}
                                    />
                                    <div className="img">
                                        {!confirmVisible ? (
                                            <EyeInvisibleOutline onClick={
                                                () => {
                                                    setConfirmVisible(true)
                                                    const closeLook = setTimeout(() => {
                                                        setConfirmVisible(false)
                                                        clearTimeout(closeLook)
                                                    }, 2000)

                                                }
                                            } />
                                        ) : (
                                            <EyeOutline onClick={() => setConfirmVisible(false)} />
                                        )}
                                    </div>
                                </div>
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
                                    <span>我已阅读<a className='link' onClick={() => {
                                        setVisibleMask(true)
                                        navigate('useragreement')
                                    }}>《用户协议》</a>和<a className='link' onClick={() => {
                                        setVisibleMask(true)
                                        navigate('privacyPolicy')
                                    }}>《隐私政策》</a></span>
                                </div>
                                <Button block color='primary' size='large'
                                    onClick={
                                        () => {
                                            // 优先判断输入框输入
                                            if (username === '' || email === '' || password === '' || confirmPassword === '') {
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
                                            } else if (usernameReg.test(username)) {
                                                Toast.show({
                                                    content: '用户名只能由字母、数字、下划线组成',
                                                    duration: 2000
                                                })
                                            } else if (!emailReg.test(email)) {
                                                Toast.show({
                                                    content: '邮箱格式错误',
                                                    duration: 2000
                                                })
                                            } else if (!passwordReg.test(password)) {
                                                Toast.show({
                                                    content: '密码必须包含字母和数字，长度在6-20之间',
                                                    duration: 2000
                                                })
                                            } else {
                                                setIfVerifyPagesOpen(false)
                                            }
                                        }
                                    }
                                    className='registerBtn'>
                                    下一步
                                </Button>
                                <p className='goToLoginPages' onClick={
                                    () => {
                                        navigate('/login')
                                    }
                                }>已有账户,点击跳转登录</p>
                            </div>
                            <Mask visible={visibleMask} onMaskClick={() => {
                                setVisibleMask(false)
                                navigate('/register')
                            }}>
                                <div className='maskContent'>
                                    <Outlet />
                                </div>
                            </Mask>
                        </div>
                    ) :
                    (
                        <div className="register">
                            <div
                                className="returnBtn"
                                onClick={() => {
                                    setIfVerifyPagesOpen(true)
                                }}
                            >
                                <img src={ReturnBtn} alt="" />
                            </div>

                            <div className='container'>
                                <div className='title'>注册</div>
                                <p className='info'>Register</p>
                                <p className='desc'>探索未知之境</p>

                                <div className='secoundPagesInput'>
                                    <p className='emailCodeTitle'>邮箱验证码:</p>
                                    <div className="secoundPagesInputBox">
                                        <Input
                                            type="text"
                                            clearable
                                            maxLength={6}
                                            className='inputVal secondInput'
                                            onChange={
                                                (value) => {
                                                    setVerifyEmailCode(value)
                                                }
                                            }
                                        />
                                        <span
                                            className='sendCode'
                                            style={isContinueSend ? { color: '#307def' } : { color: '#ccc' }}
                                            onClick={() => {
                                                sendEmailCode()
                                                setIsContinueSend(false)
                                                if (isContinueSend) {
                                                    Toast.show({
                                                        content: '验证码已发送',
                                                        duration: 2000
                                                    })
                                                    // 设置定时器,180秒后可以再次发送验证码
                                                    let time = 180
                                                    const timeText = setInterval(() => {
                                                        time--
                                                        setSendText(`${time}秒后重新发送`)
                                                        if (time === 0) {
                                                            setSendText(`请重新发送`)
                                                            clearInterval(timeText)
                                                        }
                                                    }, 1000)
                                                    const timer = setTimeout(() => {
                                                        setIsContinueSend(true)
                                                        clearTimeout(timer)
                                                    }, 180000)
                                                }
                                            }}
                                        >{sendText}</span>
                                    </div>
                                </div>

                                <div className='secoundPagesInput'>
                                    <p className='emailCodeTitle'>图片验证码:</p>
                                    <div className="secoundPagesInputBox" style={{ padding: 0 }}>
                                        <Input
                                            type="text"
                                            clearable
                                            maxLength={4}
                                            className='inputVal secondInput'
                                            onChange={
                                                (value) => {
                                                    setVerifySvgCode(value)
                                                }
                                            }
                                        />
                                        <div
                                            className="svgImg"
                                            dangerouslySetInnerHTML={{
                                                __html: svgContent
                                            }}
                                            onClick={
                                                () => {
                                                    getSvgCode()
                                                }
                                            }
                                        >

                                        </div>
                                    </div>
                                </div>


                                <Button block color='primary' size='large'
                                    className='registerBtn'
                                    onClick={
                                        () => {
                                            register()
                                        }
                                    }
                                >
                                    注册
                                </Button>
                                <p className='goToLoginPages'
                                    onClick={
                                        () => {
                                            navigate('/login')
                                        }
                                    }
                                >
                                    已有账户,点击跳转登录
                                </p>
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default Register;