import { useState } from 'react';
import Post from '../../components/Post';
import style from '../../style/Favortie.module.css';
import dummyData from '../Favorite/dummyData';

const MarketList = () => {
    const [posts, setPosts] = useState(dummyData);

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                {posts?.map((post, index) => (
                    <div key={index} className={style.card}>
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketList;
