import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {supabase} from '../client'
import './Post.css'

const Post = (props) => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [isSolved, setIsSolved] = useState(props.is_solved);

    const isDetailedView = props.variant === 'detail';

    useEffect(() => {
        const fetchPost = async () => {
            if (id && isDetailedView) {
                try {
                    const {data, error} = await supabase
                        .from('Posts')
                        .select('*')
                        .eq('id', id)
                        .single();
                    
                    if (error) {
                        console.error('Error fetching post:', error);
                        return;
                    }
                    
                    if (data) {
                        setPost(data);
                        setUpvotes(data.upvotes);
                        setIsSolved(data.is_solved);
                    }
                } catch (err) {
                    console.error('Failed to fetch post:', err);
                }
            } else {
                setUpvotes(props.upvotes || 0);
                setIsSolved(props.is_solved || false);
            }
        };
        fetchPost();
    },  [id, isDetailedView, props.upvotes, props.is_solved])

    const postData = isDetailedView ? post : props;

    const updateUpvotes = async (event) => {
        event.preventDefault();
        const postId = isDetailedView ? id : props.id;
        await supabase
            .from('Posts')
            .update({upvotes: upvotes+1})
            .eq('id', postId);

        setUpvotes((upvotes) => upvotes +1)
    }

    const canMarkSolved = props.currentUser ?
        (props.currentUser.id === props.author_id) :
        true;

    const toggleSolved = async () => {
        if (props.currentUser && !canMarkSolved) {
            alert("Only the author can mark this post as solved!");
            return;
        }

        const postId = isDetailedView ? id : props.id;
        await supabase  
            .from('Posts')
            .update({is_solved: !isSolved})
            .eq('id', postId);

        setIsSolved(!isSolved);
    }
    if (isDetailedView && !post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`Post ${isDetailedView ? 'Post--detail' : 'Post--summary'}`}>
            {/* Header - shown in both views */}
            <div className="post-header">
                <h1 className="title">{postData?.title}</h1>
                <div className="post-meta">
                    <span className="creation-time">
                        {postData?.created_at && new Date(postData.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Summary View */}
            {!isDetailedView ? (
                <div className="post-summary">
                    <div className="post-stats">
                        <span className="upvote-count" onClick={updateUpvotes}>👍 {upvotes}</span>
                    </div>
                    
                    
                    {/* Link to detailed view */}
                    <button 
                        className="read-more-btn"
                        onClick={() => window.location.href = `/post/${postData.id}`}
                    >
                        Read More →
                    </button>
                </div>
            ) : (
                /* Detailed View */
                <div className="post-detail">
                    <div className="post-meta">
                        <h3 className="author">by {postData.author}</h3>
                    </div>
                    <div className="post-status">
                        <span className="upvote-count" onClick={updateUpvotes}>👍 {upvotes}</span>
                        <h3 className={`is_solved ${isSolved ? 'solved' : 'unsolved'}`}>
                            {isSolved ? "✅ Problem Solved" : "❓ Problem Unsolved"}
                        </h3>
                    </div>

                    {/* Image */}
                    {postData.image_url && (
                        <div className="post-image-container">
                            <img 
                                src={postData.image_url} 
                                alt={postData.title}
                                className="post-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Full description */}
                    <div className="post-content">
                        <p className="description">{postData.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="post-actions">
                        {canMarkSolved && (
                            <button 
                                className={`solve-toggle ${isSolved ? 'solved' : 'unsolved'}`}
                                onClick={toggleSolved}
                            >
                                {isSolved ? "Mark as Unsolved" : "Mark as Solved"}
                            </button>
                        )}
                        
                        {props.currentUser && !canMarkSolved && (
                            <span className="auth-note">
                                Only the author can mark as solved
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post