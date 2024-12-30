// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import Avater from '../assets/images/avater.png';

function MultifunctionalCom() {
    return (
        <>
            <section className="sideBar">
                <div className="top">
                    <span className='title'>SouthAki</span>
                    <img src={TopLeftIcon} alt="" />
                </div>
                <div className="container">
                    <div className="avaterBox">
                        <img className='avater' src={Avater} alt="" />
                        <div className="rightBox">
                            <div className="name">南秋SouthAki</div>
                            <div className="desc">一个人一生只会经历一次夏天剩下都是和它作比较.</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MultifunctionalCom;