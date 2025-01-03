// 导入样式
import '../../../style/Modules/Multifunctional/AuthorizationPages.scss';

// 导入组件
import { NavBar, NoticeBar } from 'antd-mobile';

function AuthorizationPages() {

    // 定义返回函数
    const back = () => {
        // console.log('返回');
    }

    // 定义长文本
    const demoLongText = '打造全世界人人都能受益的通用人工智能';

    return (
        <>
            <div className="authorizationPages">
                <NavBar onBack={back}>标题</NavBar>
                <NoticeBar content={demoLongText} color='alert' />
            </div>
        </>
    );
}

export default AuthorizationPages;