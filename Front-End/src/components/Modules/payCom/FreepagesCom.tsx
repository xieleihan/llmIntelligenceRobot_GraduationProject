// 导入样式
import '../../../style/Modules/Multifunctional/Modules/FreepagesCom.scss';

// 导入图片
import no from '../../../assets/icon/受限制.svg';

function FreepagesCom() {
    return (
        <>
            <div className="freepagesCom">
                <img className='icon' src={no} alt="" />
                <p className='desc'>你只被允许有限的调用,<br />且调用次数10次后,限制使用.</p>
            </div>
        </>
    )
}

export default FreepagesCom;