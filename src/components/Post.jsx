import {useState} from 'react'
import {supabase} from '../client'
import './Post'

const Post = (props) => {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [isSolved, setIsSolved] = useState(props.is_solved);

    const isDetailedView = props.variant === 'detail';

    const updateUpvotes = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({upvotes: upvotes+1})
            .eq('id', props.id);

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

        await supabase  
            .from('Posts')
            .update({is_solved: !isSolved})
            .eq('id', props.id);

        setIsSolved(!isSolved);
    }

    return (
        <div className={`Post ${isDetailedView ? 'Post--detail' : 'Post--summary'}`}>
            {/* Header - shown in both views */}
            <div className="post-header">
                <h1 className="title">{props.title}</h1>
                <div className="post-meta">
                    <span className="creation-time">
                        {new Date(props.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Summary View */}
            {!isDetailedView ? (
                <div className="post-summary">
                    <div className="post-stats">
                        <span className="upvote-count">👍 {upvotes}</span>
                    </div>
                    
                    
                    {/* Link to detailed view */}
                    <button 
                        className="read-more-btn"
                        onClick={() => window.location.href = `/post/${props.id}`}
                    >
                        Read More →
                    </button>
                </div>
            ) : (
                /* Detailed View */
                <div className="post-detail">
                    <div className="post-meta">
                        <h3 className="author">by {props.author}</h3>
                        <span className="creation-time">
                            {new Date(props.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="post-status">
                        <span className="upvote-count">👍 {upvotes}</span>
                        <h3 className={`is_solved ${isSolved ? 'solved' : 'unsolved'}`}>
                            {isSolved ? "✅ Problem Solved" : "❓ Problem Unsolved"}
                        </h3>
                    </div>

                    {/* Image */}
                    {props.image && (
                        <div className="post-image-container">
                            <img 
                                src={props.image} 
                                alt={props.title}
                                className="post-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Full description */}
                    <div className="post-content">
                        <p className="description">{props.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="post-actions">
                        <button className="upvotes" onClick={updateUpvotes}>
                            👍 Upvotes: {upvotes}
                        </button>
                        
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