// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import TopRightIcon from '../assets/icon/top-right.svg';

// 导入React
import { useState } from 'react';

interface HometopComProps {
    onToggleClick: (clickBool: boolean) => void;
}

function HometopCom({ onToggleClick }: HometopComProps) {
    // 定义React变量
    const [clickBool, setClickBool] = useState(false); // 点击状态

    
    
    return (
        <>
            <header className="top">
                <div
                    className="multifunctional"
                    onClick={
                        () => {
                            if (clickBool) {
                                setClickBool(false);
                            } else {
                                setClickBool(true);
                            }
                            onToggleClick(clickBool);
                        }}
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