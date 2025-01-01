import '../style/Modules/ErrorPages.scss';

// 导入图片资源
import ErrorImg from '../assets/icon/Error404.svg';

// 导入工具函数中的关于格式化时间部分
import { parseTime } from '../utils/common';

// 导入react
import { useEffect, useState } from 'react';

// 路由跳转
import { useNavigate } from "react-router-dom"

function ErrorPages() {
    // 定义React变量
    const [nowTime, setNowTime] = useState('');

    // 初始化导航
    const navigate = useNavigate();

    // 获取当前时间计时器方式
    useEffect(() => {
        const timer = setInterval(() => {
            const time:string = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}') || '';
            setNowTime(time);
        }, 1000);
            
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <>
            <div className="errorPages">
                <img
                    className='img'
                    src={ErrorImg}
                    alt=""
                />
                <p className='desc'>你来到了无人问津的荒漠</p>
                <button
                    className='returnBtn-error'
                    onClick={
                        () => {
                            navigate('/home');
                        }
                    }
                >点击我回到首页</button>
                <footer className='nowTime'>
                    <span>
                        当前时间是:
                        <span>
                            { nowTime }
                        </span>
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ErrorPages;