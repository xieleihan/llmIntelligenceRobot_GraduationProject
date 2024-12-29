import '../style/home.scss';

// 导入组件
import HometopCom from '../components/HomeTopcom';

function HomeView() {
    return (
        <>
            <div className="home">
                <HometopCom />
                <main className="container"></main>
                <section className="bottom">
                    
                </section>
                <footer className='footer'>AI也会犯错,请核查重要内容.</footer>
            </div>
        </>
    );
}

export default HomeView;