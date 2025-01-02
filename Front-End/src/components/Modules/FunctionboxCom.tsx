// 导入antd design mobile icon
import { SetOutline, RightOutline, MessageOutline } from 'antd-mobile-icons'

// 路由跳转
import { useNavigate } from "react-router-dom"

function FunctionboxCom() {
    // 初始化导航
    const navigate = useNavigate();

    return (
        <>
            <div
                className="item"
                onClick={
                    () => {
                        navigate('/contact');
                    }
                }
            >
                <div className="item-left">
                    <MessageOutline />
                    <span>联系我们</span>
                </div>
                <div className="item-right">
                    <RightOutline />
                </div>
            </div>
            <div
                className="item"
                onClick={
                    () => {
                        navigate('/setting');
                    }
                }
            >
                <div className="item-left">
                    <SetOutline />
                    <span>设置</span>
                </div>
                <div className="item-right">
                    <RightOutline />
                </div>
            </div>
        </>
    );
}

export default FunctionboxCom;