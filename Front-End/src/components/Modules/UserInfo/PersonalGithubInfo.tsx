// 导入样式
import '../../../style/Modules/Multifunctional/PersonalGithubInfo.scss';

// 导入React
import { useState,useEffect } from 'react';

// 使用React Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';

// 导入请求代码
import { getGithubRepos, getGithubStarredRepos } from '../../../api/request';


// 热力图 <img src="https://raw.githubusercontent.com/xieleihan/xieleihan/refs/heads/main/profile-3d-contrib/profile-gitblock.svg" align="center" alt="Stats" />
// <img src="https://github-readme-stats.vercel.app/api?username=xieleihan&count_private=true&show_icons=true&line_height=46" align="center" alt="Stats" />
// <img src="https://github-contribution-stats.vercel.app/api/?username=xieleihan" align="center" alt="Stats" />

function PersonalGithubInfo() {
    // 定义React变量
    const [githubUsername, setGithubUsername] = useState('正在加载中...'); // Github用户名
    const [following, setFollowing] = useState(0); // 关注数
    const [githubRepo, setGithubRepo] = useState(0); // 仓库数
    const [githubStarRepo, setGithubStarRepo] = useState(0); // 星标仓库数
    const [commitNumber, setCommitNumber] = useState(0); // 提交数

    // 使用Redux
    const username = useSelector((state: RootState) => state.user.username); // 获取用户名

    // 将username写入Github用户名
    // console.log("当前用户的Github用户名:", username);
    
    // 逐渐挂载的时候执行
    useEffect(() => {
        setGithubUsername(username);

        // 获取用户仓库信息
        getGithubRepos({username: username}).then(res => {
            let str = JSON.stringify(res);
            let obj = JSON.parse(str);
            let repo = obj.repos.length;
            setGithubRepo(repo);
        }).catch(err => {
            console.log('获取用户仓库信息失败:', err);
        });

        // 获取用户关注的仓库信息
        getGithubStarredRepos({username: username}).then(res => {
            let str = JSON.stringify(res);
            let obj = JSON.parse(str);
            let starRepo = obj.repos.length;
            setGithubStarRepo(starRepo);
        }).catch(err => {
            console.log('获取用户关注的仓库信息失败:', err);
        });
    },[])

    return (
        <>
            <div className='personalGithubInfo'>
                <div className="title">Github信息</div>
                <div className="item">
                    <img className='img' src="https://raw.githubusercontent.com/xieleihan/xieleihan/refs/heads/main/profile-3d-contrib/profile-gitblock.svg" alt="Stats" />
                </div>
                <div className="item">
                    <p>用户名:<span className='span'>{githubUsername}</span>Following:<span className='span'>{following}</span></p>
                </div>
                <div className="item">
                    <p>Repo:<span className='span'>{githubRepo}</span>StarRepo:<span className='span'>{githubStarRepo}</span>Commit:<span className='span'>{ commitNumber }</span></p>
                </div>
            </div>
        </>
    );
}

export default PersonalGithubInfo;