import style from '../style/Post.module.css';

const Post = ({ post }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <img alt={post.info} src={post.image} />
          <span className={style.title}>{post.name}</span>
          <span className={style.address}>{post.address}</span>
          <div className={style.date}>
            <span>{post.startDate}</span>
            <span>~</span>
            <span>{post.endDate}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
