// 导入样式文件
import '../style/login.scss';
import '../style/returnBtn.scss';

// 导入react组件
import { useEffect, useState } from 'react';

// 导入ant-design mobile组件
import { Button, Toast, Input, Mask } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'

// 导入图标信息
import ReturnBtn from '../assets/icon/left-heightlight.svg';

// 路由跳转
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"

// 导入API
import { get, post } from '../api/index'

// Define the type for the context
interface OutletContextType {
    handleDataFromChild: (data: boolean) => void;
}

function Login() {
    // 定义React变量
    const [email, setEmail] = useState(''); // 邮箱
    const [password, setPassword] = useState(''); // 密码
    const [visible, setVisible] = useState(false); // 是否显示密码
    const [svgContent, setSvgContent] = useState(""); // 存储后端传递的 SVG 字符串
    const [verifySvgCode, setVerifySvgCode] = useState(''); // 图片验证码
    const [confirmProtocol, setConfirmProtocol] = useState(false); // 确认用户协议
    const [visibleMask, setVisibleMask] = useState(false); // 定义mask

    // 从父组件获取回调函数
    const { handleDataFromChild }= useOutletContext<OutletContextType>();

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

    // 登录函数
    function login() {
        if (email === '' || password === '' || verifySvgCode === '') {
            Toast.show({
                content: '请填写完整信息',
                duration: 2000
            })
            return
        } else {
            post('/login', {
                email: email,
                password: password,
                verifySvgCode: verifySvgCode
            })
                .then((response) => {
                    if (response.data === '登录成功') {
                        Toast.show({
                            content: '登录成功',
                            duration: 2000
                        })
                        setTimeout(() => {
                            navigate('/home')
                        }, 2500);
                    } else {
                        Toast.show({
                            content: response.data,
                            duration: 2000
                        });
                    }
                })
                .catch((error) => {
                    console.error('获取数据失败:', error);
                });
        }
    }

    return (
        <>
            <div className="login">
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

                <div className="container">
                    <div className='title'>登录</div>
                    <p className='info'>Logn in</p>
                    <p className='desc'>探索未知之境</p>
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
                    <div className="inputVal svgCode">
                        <Input
                            className='code'
                            placeholder='请输入图片验证码'
                            onChange={
                                (value) => {
                                    setVerifySvgCode(value)
                                }
                            }
                            value={verifySvgCode}
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
                    <Button
                        block color='primary' size='large'
                        onClick={
                            () => {
                                login();
                            }
                        }
                    >
                        登录
                    </Button>
                </div>
                <Mask visible={visibleMask} onMaskClick={() => {
                    setVisibleMask(false)
                    navigate('/login')
                }}>
                    <div className='maskContent'>
                        <Outlet />
                    </div>
                </Mask>
            </div>
        </>
    )
}

export default Login;