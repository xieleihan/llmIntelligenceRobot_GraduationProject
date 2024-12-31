// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import Avater from '../assets/images/avater.png';

// 导入React
import { useState } from 'react';

function MultifunctionalCom({ isOpen,handleToggleClickTwo }: { isOpen: boolean, handleToggleClickTwo: (clickBool: boolean) => void }) {
    // 定义React变量
    const [isComOpen, setIsComOpen] = useState(isOpen); // 点击状态

    const handleClick = () => {
        const newState = !isComOpen; // 计算最新状态
        setIsComOpen(newState); // 更新本地状态
        handleToggleClickTwo(newState); // 调用父组件的回调，传递最新状态
    };

    return (
        <>
            <section className="sideBar">
                <div className="top">
                    <span className='title'>SouthAki</span>
                    <img onClick={
                        handleClick
                    } src={TopLeftIcon} alt="" />
                </div>
                <div className="container">
                    <div className="avaterBox">
                        <img className='avater' src={Avater} alt="" />
                        <div className="rightBox">
                            <div className="name">南秋SouthAki</div>
                            <div className="desc">一个人一生只会经历一次夏天剩下都是和它作比较.</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MultifunctionalCom;