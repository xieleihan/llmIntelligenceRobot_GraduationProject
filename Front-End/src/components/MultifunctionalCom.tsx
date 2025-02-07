// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import Avater from '../assets/images/avater.png';

// 导入React
import { useState } from 'react';

// 导入组件
import FunctionboxCom from './Modules/FunctionboxCom';

// 路由跳转
import { useNavigate } from "react-router-dom"

// 导入Ant Design Mobile
import { Button,Dialog,Toast } from 'antd-mobile';

// 导入js-cookie
import Cookies from 'js-cookie';

function MultifunctionalCom({ isOpen, handleToggleClickTwo }: { isOpen: boolean, handleToggleClickTwo: (clickBool: boolean) => void }) {
    // 定义React变量
    const [isComOpen, setIsComOpen] = useState(isOpen); // 点击状态

    const handleClick = () => {
        const newState = !isComOpen; // 计算最新状态
        setIsComOpen(newState); // 更新本地状态
        handleToggleClickTwo(newState); // 调用父组件的回调，传递最新状态
    };

    // 初始化导航
    const navigate = useNavigate();

    // 清除cookies(使用js-cookie)
    const clearCookies = () => {
        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => Cookies.remove(cookieName, { path: '/' }));
    };

    return (
        <>
            <section
                className="sideBar"
                style={{
                    width: isComOpen ? '60%' : '0%',
                    overflow: isComOpen ? 'visible' : 'hidden',
                    transition: 'width 0.5s ease, overflow 0.5s ease'
                }}>
                <div className="top">
                    <span className='title'>SouthAki</span>
                    <img onClick={
                        handleClick
                    } src={TopLeftIcon} alt="" />
                </div>
                <div className="container-side">
                    <div
                        className="avaterBox"
                        onClick={
                            () => {
                                navigate('/userinfo');
                            }
                        }
                    >
                        <img className='avater' src={Avater} alt="" />
                        <div className="rightBox">
                            <div className="name">南秋SouthAki</div>
                            <div className="desc">一个人一生只会经历一次夏天剩下都是和它作比较.</div>
                        </div>
                    </div>
                    <div className="functionBox">
                        <FunctionboxCom />
                    </div>
                    <Button onClick={
                        () => {
                            // 清除cookies
                            // clearCookies();
                            // navigate('/login');
                            Dialog.confirm({
                                title: '提示',
                                content: '是否退出登录?',
                                onConfirm: () => {
                                    Toast.show({
                                        content: '退出成功',
                                        duration: 2000
                                    })
                                    setTimeout(() => {
                                        clearCookies();
                                        navigate('/login');
                                    },2000)
                                },
                                onCancel: () => {
                                    console.log('取消退出');
                                    Toast.show({
                                        content: '取消退出',
                                        duration: 2000
                                    })
                                }
                            })
                        }
                    } color='danger' className='exit'>退出</Button>
                </div>
                <div className="copyright">
                    <span>Copyright© 2024 SouthAki</span>
                </div>
            </section>
        </>
    );
}

export default MultifunctionalCom;