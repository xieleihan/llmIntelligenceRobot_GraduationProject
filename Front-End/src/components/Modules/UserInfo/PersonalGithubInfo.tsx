// 导入样式
import '../../../style/Modules/Multifunctional/PersonalGithubInfo.scss';

// 热力图 <img src="https://raw.githubusercontent.com/xieleihan/xieleihan/refs/heads/main/profile-3d-contrib/profile-gitblock.svg" align="center" alt="Stats" />
// <img src="https://github-readme-stats.vercel.app/api?username=xieleihan&count_private=true&show_icons=true&line_height=46" align="center" alt="Stats" />
// <img src="https://github-contribution-stats.vercel.app/api/?username=xieleihan" align="center" alt="Stats" />

function PersonalGithubInfo() {
    return (
        <>
            <div className='personalGithubInfo'>
                <div className="title">Github信息</div>
                <div className="item">
                    <img className='img' src="https://raw.githubusercontent.com/xieleihan/xieleihan/refs/heads/main/profile-3d-contrib/profile-gitblock.svg" alt="Stats" />
                </div>
            </div>
        </>
    );
}

export default PersonalGithubInfo;