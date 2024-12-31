// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import TopRightIcon from '../assets/icon/top-right.svg';

// 导入React
import { useState } from 'react';

interface HometopComProps {
    onToggleClick: (clickBool: boolean) => void;
    isTopOpen: boolean;
}

function HometopCom({ onToggleClick,isTopOpen }: HometopComProps) {
    // 定义React变量
    const [clickBool, setClickBool] = useState(isTopOpen); // 点击状态

    const handleClick = () => {
        let newState = !clickBool;// 计算最新状态
        if (!newState) { 
            newState = true;
        }
        setClickBool(newState); // 更新本地状态
        onToggleClick(newState); // 调用父组件的回调，传递最新状态
    };
    
    return (
        <>
            <header className="top">
                <div
                    className="multifunctional"
                    onClick={
                        handleClick
                    }
                >
                    <img src={TopLeftIcon} alt="" />
                </div>
                <div className='signature'>SouthAki</div>
                <div className="newChat">
                    <img src={TopRightIcon} alt="" />
                </div>
            </header>
        </>
    );
}

export default HometopCom;