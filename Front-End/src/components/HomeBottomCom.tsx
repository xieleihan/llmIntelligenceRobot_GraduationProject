import appendix from '../assets/icon/appendix.svg';
import send from '../assets/icon/send.svg';
import sendHeightLight from '../assets/icon/send-heightlight.svg';

// 导入antd design mobile组件
import { Input,Toast } from 'antd-mobile';

// 导入React
import { useState } from 'react';

// 导入样式文件
import '../style/base.scss';

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

    const handleClickBottom = () => {
        let obj = {
            "type": "user",
            "content": inputValCom,
        }
        // console.log("这是组件内的obj", obj);
        handleClickThree(obj);
    };

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
                        inputValCom === '' ?
                            { backgroundColor: '#dbeafe' } : { backgroundColor: '#4d6bfe' }
                    }
                    onClick={
                        () => {
                            if (inputValCom === '') {
                                Toast.show({
                                    content: '请输入信息',
                                    duration: 2000
                                })
                            } else {
                                // console.log("触发了输入")
                                handleClickBottom();

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
                                setInputValCom('');
                            }
                        }
                    }
                >
                    <img src={inputValCom === '' ? send : sendHeightLight} alt="" />
                </div>
            </div>
        </>
    );
}

export default HomebottomCom;