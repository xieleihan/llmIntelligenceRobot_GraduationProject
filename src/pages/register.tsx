import '../style/register.scss';

// 导入图标信息
import ReturnBtn from '../assets/icon/left-heightlight.svg';

function register() {
    return (
        <>
            <div className="register">
                <div className="returnBtn">
                    <img src={ ReturnBtn } alt="" />
                </div>

                <div className='container'>
                    <div className='title'>注册</div>
                    <p className='info'>Register</p>
                    <p className='desc'>探索未知之境</p>
                    <input className='inputVal' type="text" placeholder="请输入用户名" />
                    <input className='inputVal' type="email" placeholder="请输入邮箱" />
                    <input className='inputVal' type="password" placeholder="请输入密码" />
                    <button className='registerBtn'>注册</button>
                </div>
            </div>
        </>
    );
}

export default register;