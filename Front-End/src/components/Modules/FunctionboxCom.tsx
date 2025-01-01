// 导入antd design mobile icon
import { SetOutline, RightOutline, MessageOutline } from 'antd-mobile-icons'

function FunctionboxCom() {
    return (
        <>
            <div className="item">
                <div className="item-left">
                    <MessageOutline />
                    <span>联系我们</span>
                </div>
                <div className="item-right">
                    <RightOutline />
                </div>
            </div>
            <div className="item">
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