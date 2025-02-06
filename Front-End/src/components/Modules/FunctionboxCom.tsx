// 导入antd design mobile icon
import { SetOutline, RightOutline, MessageOutline } from 'antd-mobile-icons'

// 导入图片
import Authorization from '../../assets/icon/authotization.svg';
import File from '../../assets/icon/file.svg';

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
                        navigate('/file');
                    }
                }
            >
                <div className="item-left">
                    <img src={File} alt="" />
                    <span>情报文档</span>
                </div>
                <div className="item-right">
                    <RightOutline />
                </div>
            </div>
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
            <div
                className="item"
                onClick={
                    () => {
                        navigate('/authorization');
                    }
                }
            >
                <div className="item-left">
                    <img src={Authorization} alt="" />
                    <span>授权许可</span>
                </div>
                <div className="item-right">
                    <RightOutline />
                </div>
            </div>
        </>
    );
}

export default FunctionboxCom;