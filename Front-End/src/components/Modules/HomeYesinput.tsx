// 导入样式
import '../../style/Modules/HomeYesinput.scss';

// 导入React
import { useEffect, useState, useRef } from 'react';

// 导入工具函数
import { parseTime } from '../../utils/common';

// 导入头像
import Avatar from '../../assets/images/avater.png';
import SystemIcon from '../../assets/icon/peacock_flat.png';

// 导入react-markdown
// import ReactMarkdown from "react-markdown";

// 导入Markdown渲染器
import MarkdownRenderer from './base/MarkdownRenderer';

function HomeYesinput(dataArray: any) {
    // 定义React变量
    const [nowTime, setNowTime] = useState(''); // 当前时间
    const messageBoxRef = useRef<HTMLDivElement>(null); // 滚动容器的引用

    // 当组件渲染的时候的时间
    useEffect(() => {
        const date: string = parseTime(new Date().getTime(), '{h}:{i}:{s}') || '';
        // console.log("当前时间", date);
        setNowTime(date);
    }, []);

    // console.log("传递的",dataArray)

    // 当home-yesinput出现滚动条的时候始终保持在最底部
    useEffect(() => {
        if (messageBoxRef.current) {
            // console.log("触发了", messageBoxRef.current, messageBoxRef.current.scrollHeight);
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [dataArray]);

    return (
        <>
            <div className="home-yesinput" ref={messageBoxRef}>
                <div className="messageBox">
                    <div className="time">
                        { nowTime }
                    </div>
                    <div className="message">
                        {
                            dataArray.dataArray.map((item:any, index:any) => (
                                <div key={index} className={item.type}>
                                    <div className="top-item" style={
                                        item.type === 'user' ? { flexDirection: 'row-reverse' } : { justifyContent: 'flex-start' }
                                    }>
                                        <img
                                            className='typeimg'
                                            src={item.type === 'user' ? Avatar : SystemIcon}
                                            alt={item.type}
                                            style={
                                                item.type === 'user' ? { marginLeft: '.3rem' } : { marginRight: '.3rem' }
                                            }
                                        />
                                        <span className='typename'>{ item.type }</span>
                                    </div>
                                    <div
                                        className="messageContent"
                                        style={
                                            item.type === 'user' ? {
                                                justifyContent: 'flex-end',
                                            } : {
                                                justifyContent: 'flex-start',
                                            }
                                        }
                                    >
                                        <span
                                            style={
                                                item.type === 'user' ? {
                                                    borderRadius: '.5rem 0 .5rem .5rem',
                                                } : {
                                                        borderRadius: '0 .5rem .5rem .5rem',
                                                }
                                            }
                                        >
                                            {/* {item.content} */}
                                            <MarkdownRenderer markdownText={item.content} />
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeYesinput;