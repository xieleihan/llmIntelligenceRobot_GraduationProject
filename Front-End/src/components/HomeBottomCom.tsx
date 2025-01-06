import appendix from '../assets/icon/appendix.svg';
import send from '../assets/icon/send.svg';
import sendHeightLight from '../assets/icon/send-heightlight.svg';
import stop from '../assets/icon/stop.svg';

// 导入antd design mobile组件
import { Input,Toast } from 'antd-mobile';

// 导入React
import { useState } from 'react';

// 导入样式文件
import '../style/base.scss';

// 导入接口
import { sendMsg } from '../api/request';

interface HomebottomComProps { 
    handleClickThree: ({
        type,
        content
    }: {
        type: string;
        content: string;
    }) => void;
}

function HomebottomCom({ handleClickThree }: HomebottomComProps) {
    // 定义React变量
    const [inputValCom, setInputValCom] = useState(''); // 输入框内容
    const [isOpenHover, setIsOpenHover] = useState(false); // 是否打开hover (true:打开, false:关闭) 

    const handleClickBottom = () => {
        let obj = {
            "type": "user",
            "content": inputValCom,
        }
        // console.log("这是组件内的obj", obj);
        handleClickThree(obj);
    };

    // 返回的回调函数
    const deepseekReturn = (message:string) => {
        let obj = {
            "type": "system",
            "content": message,
        }
        handleClickThree(obj);
    }

    return (
        <>
            <div className='inputBox'>
                <img className='icon' src={appendix} alt="" />
                <Input
                    placeholder='请输入聊天内容'
                    className='input'
                    clearable
                    value={inputValCom}
                    onChange={
                        (value) => {
                            setInputValCom(value);
                        }
                    }
                />
                <div
                    className="send"
                    style={
                        inputValCom === '' || isOpenHover ?
                            { backgroundColor: '#dbeafe' } : { backgroundColor: '#4d6bfe' }
                    }
                    onClick={
                        async () => {
                            if (inputValCom === '') {
                                Toast.show({
                                    content: '请输入信息',
                                    duration: 2000
                                })
                            } else {
                                // console.log("触发了输入")
                                handleClickBottom();
                                // 在写入数据之后清空输入框
                                setInputValCom('');
                                // 往组件发送一个开启hover的信号
                                setIsOpenHover(true);

                                // 正则将输入框的符号转译(<,>,&,",',`)
                                let reg = /<|>|&|"|'/g;
                                // val是将要发送给后端的数据
                                let val = inputValCom.replace(reg, function (match) {
                                    switch (match) {
                                        case '<':
                                            return '&lt;';
                                        case '>':
                                            return '&gt;';
                                        case '&':
                                            return '&amp;';
                                        case '"':
                                            return '&quot;';
                                        case "'":
                                            return '&#39;';
                                        default:
                                            return '';
                                    }
                                });
                                // 给请求加上请求头
                                const deepseek = await sendMsg({
                                    "question": val
                                });
                                // console.log("deepseek", deepseek);
                                let str = JSON.stringify(deepseek);
                                let obj = JSON.parse(str);
                                deepseekReturn(obj.msg);
                                // 等到数据写入之后关闭hover
                                setIsOpenHover(false);
                            }
                        }
                    }
                >
                    {
                        !isOpenHover ?
                            <img src={inputValCom === '' ? send : sendHeightLight} alt="" /> :
                            <img src={stop} alt="" />
                    }
                </div>
            </div>
        </>
    );
}

export default HomebottomCom;