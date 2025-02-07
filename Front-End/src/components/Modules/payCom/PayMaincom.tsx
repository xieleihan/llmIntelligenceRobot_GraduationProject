import { useState } from "react";

// 导入组件
import FreepagesCom from "./FreepagesCom";
import PremiumpagesCom from "./PremiumpagesCom";

function PayMaincom() {
    // 定义React变量
    const [isWord, setIsWord] = useState('受限制的版本'); // 文字说明,(后端会有一个字段来判断是否设置为受限制的版本或高级无限制版)
    const [isHeaderWord, setIsHeaderWord] = useState(false); // 根据PayHeadercom组件的点击状态来判断是否展示高级版页面付款

    // 从sessionStrong获取username
    const username = sessionStorage.getItem('username');

    return (
        <>
            <div className="PayMaincom">
                <div className="title">😊<div className="word">{username}</div>你好,你当前的订阅状态是{isWord}</div>
                
                {
                    isHeaderWord ? (
                        <PremiumpagesCom />
                    ) : (
                            <FreepagesCom />
                    )
                }
            </div>
        </>
    )
}

export default PayMaincom;