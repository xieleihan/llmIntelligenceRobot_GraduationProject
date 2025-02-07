// 导入React
import { useState } from 'react';

function PayHeadercom() {
    // 定义React变量
    const [isMaskChange, setIsMaskChange] = useState(false); // 点击状态
    const [isMaskSpan, setIsMaskSpan] = useState(false); // 点击后文字状态(后端有一个字段判断是否展示这个)

    return (
        <>
            <header className='header'>
                <div className="free" onClick={() => {
                    setIsMaskChange(false);
                }}>
                    <div className='title'>Free</div>
                    <div className='china-title'>免费版</div>
                    <div className="price"><span>$</span><span className='no'>19.99</span></div>
                    {
                        isMaskChange ? (
                            null
                        ) : <div className="mask">
                            <div className="maskContent">
                                <span>当前订阅状态</span>
                            </div>
                        </div>
                    }
                </div>
                <div className="payment" onClick={() => {
                    setIsMaskChange(true);
                }}>
                    <div className='title'>Premium</div>
                    <div className='china-title'>高级版</div>
                    <div className="price"><span>$</span>19.99</div>
                    {
                        isMaskChange ? (
                            <div className="mask">
                                {
                                    isMaskSpan ? (
                                        <div className="maskContent">
                                            <span>当前订阅状态</span>
                                        </div>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }
                </div>
            </header>
        </>
    )
}

export default PayHeadercom;