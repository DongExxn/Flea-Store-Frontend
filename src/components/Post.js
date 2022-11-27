import style from '../style/Post.module.css';

const Post = ({ post }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div>
            <div className={style.testImg}>img</div>
            <div>
              <span>{post.name}</span>
            </div>
            <div>
              <span>{post.address}</span>
            </div>
            <div>
              <span>{post.startDate}</span>
              <span>~</span>
              <span>{post.endDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
