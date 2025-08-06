import { supabase } from '../client'
import { useState } from 'react'
import './CreatePost.css'


const CreatePost = () => {
    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({title: post.title, author: post.author, description: post.description, image_url: post.image_url})
            .select();

        window.location="/";
    }

    const [post, setPost] = useState({title: "", author: "", description: "", image_url: ""});

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div className="create-post-page">
            <div className="create-post-header">
                <h1 className="create-post-title">Create New Post</h1>
                <p className="create-post-subtitle">Share your problem and get help from the community</p>
            </div>
            <form className="create-post-form">
                <div className="form-group">
                    <label className="form-label">
                        Title <span className="required">*</span>
                    </label>
                    <input 
                        className="form-input" 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={post.title}
                        onChange={handleChange} 
                        placeholder="Enter post title..." 
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="author">
                        Author <span className="required">*</span>
                    </label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="author" 
                        name="author" 
                        value={post.author}
                        onChange={handleChange} 
                        placeholder="Enter your name..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description <span className="required">*</span>
                    </label>
                    <textarea 
                        className="form-textarea"
                        id="description" 
                        name="description" 
                        value={post.description}
                        onChange={handleChange}
                        placeholder="Describe your problem in detail..."
                        rows="6"
                        required
                    />
                    <div className={`character-counter ${post.description.length > 500 ? 'warning' : ''} ${post.description.length > 1000 ? 'error' : ''}`}>
                        {post.description.length}/1000 characters
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="image_url">
                        Image URL (optional)
                    </label>
                    <input 
                        className="form-input"
                        type="url" 
                        id="image_url" 
                        name="image_url" 
                        value={post.image_url}
                        onChange={handleChange} 
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-actions">
                    <button className="btn btn-secondary" type="button" onClick={() => window.location="/"}>
                        Cancel
                    </button>
                    <button 
                        className="btn btn-primary" 
                        type="submit" 
                        onClick={createPost}
                        disabled={!post.title || !post.author || !post.description}
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost