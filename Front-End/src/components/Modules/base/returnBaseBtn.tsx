// 导入样式
import '../../../style/Modules/base/returnBaseBtn.scss';

// 路由跳转
import { useNavigate } from "react-router-dom"

// 导入React
import { useState,useEffect } from "react";

// 导入antd design mobile icon
import { LeftOutline } from 'antd-mobile-icons';
import LeftSvg from '../../../assets/icon/left-heightlight.svg';

interface ReturnBasebtnProps { 
    buttonConfig: {
        backgroundColor: string,
        goToUrlStr: string,
        iconColor: boolean
    }
}

function ReturnBasebtn({ buttonConfig }: ReturnBasebtnProps) {
    // 初始化导航
    const navigate = useNavigate();

    // 定义React变量
    const [goToUrlStr, setGoToUrlStr] = useState(''); // 跳转的URL
    const [backgroundColor, setBackgroundColor] = useState(''); // 背景颜色
    const [iconColor, setIconColor] = useState(false); // 图标颜色(true:高亮,false:不高亮)

    // 生命周期
    useEffect(() => {
        setGoToUrlStr(buttonConfig.goToUrlStr);
        setBackgroundColor(buttonConfig.backgroundColor);
        setIconColor(buttonConfig.iconColor);
    }, [buttonConfig])

    return (
        <>
            <div
                className="returnBaseBtn"
                onClick={() => {
                    navigate(goToUrlStr);
                }}
                style={{
                    backgroundColor: backgroundColor
                }}
            >
                {
                    iconColor ?
                        <img src={LeftSvg} alt="" />
                        :
                        <LeftOutline />
                }
            </div>
        </>
    );
}

export default ReturnBasebtn;