import style from '../style/Post.module.css';

const DetailPost = ({ post }) => {
    return (
        <img alt={post.info} src={post.image} />
    );
};

export default DetailPost;

