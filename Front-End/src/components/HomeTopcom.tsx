// 导入图片资源
import TopLeftIcon from '../assets/icon/top-left.svg';
import TopRightIcon from '../assets/icon/top-right.svg';

function HometopCom() {
    return (
        <>
            <header className="top">
                <div className="multifunctional">
                    <img src={TopLeftIcon} alt="" />
                </div>
                <div className='signature'>SouthAki</div>
                <div className="newChat">
                    <img src={TopRightIcon} alt="" />
                </div>
            </header>
        </>
    );
}

export default HometopCom;