import style from '../style/Post.module.css';

const Post = ({ post }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <img
            alt={post.info ? post.info : post.nickname}
            src={`data:image/jpeg;base64,${
              post.existingImages ? post.existingImages[0] : post.image
            }`}
          />
          <span className={style.title}>
            {post.name ? post.name : post.marketName}
          </span>
          <span className={style.address}>
            {post.address ? post.address : null}
          </span>
          <div className={style.date}>
            <span>{post.startDate ? post.startDate : null}</span>
            <span>~</span>
            <span>{post.endDate ? post.endDate : null}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

