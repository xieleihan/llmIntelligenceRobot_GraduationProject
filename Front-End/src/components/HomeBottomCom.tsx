import appendix from '../assets/icon/appendix.svg';
import send from '../assets/icon/send.svg';

import { Input } from 'antd-mobile';

function HomebottomCom() {
    return (
        <>
            <div className='inputBox'>
                <img className='icon' src={appendix} alt="" />
                <Input
                    placeholder='请输入聊天内容'
                    className='input'
                    clearable
                />
                <div className="send">
                    <img src={send} alt="" />
                </div>
            </div>
        </>
    );
}

export default HomebottomCom;