// 导入样式文件
import '../style/login.scss';
import '../style/returnBtn.scss';

import { useEffect, useState } from 'react';

// 导入组件
import { Button, Toast, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'

// 导入图标信息
import ReturnBtn from '../assets/icon/left-heightlight.svg';

// 路由跳转
import { useNavigate, useOutletContext } from "react-router-dom"

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

    // 从父组件获取回调函数
    const { handleDataFromChild }= useOutletContext<OutletContextType>();

    // 初始化导航
    const navigate = useNavigate()

    return (
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
                <div className='title'>注册</div>
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
            </div>
        </div>
    )
}

export default Login;