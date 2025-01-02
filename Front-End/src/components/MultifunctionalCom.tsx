// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import Avater from '../assets/images/avater.png';

// 导入React
import { useState } from 'react';

// 导入组件
import FunctionboxCom from './Modules/FunctionboxCom';

// 路由跳转
import { useNavigate } from "react-router-dom"

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
                </div>
                <div className="copyright">
                    <span>Copyright© 2024 SouthAki</span>
                </div>
            </section>
        </>
    );
}

export default MultifunctionalCom;