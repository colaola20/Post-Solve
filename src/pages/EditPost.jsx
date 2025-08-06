import { supabase } from '../client';
import './CreatePost.css'
import {useLocation, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'


const EditPost = () => {

    const location = useLocation();
    const {id} = useParams();

    // Get post data from state or fetch it
    const passedPostData = location.state?.postData;

    const [post, setPost] = useState({
        title: "",
        author: "",
        description: "",
        image_url: ""
    })

    useEffect(() => {
        if (passedPostData) {
            setPost({
                title: passedPostData.title || "",
                author: passedPostData.author || "",
                description: passedPostData.description || "",
                image_url: passedPostData.image_url || ""
            });
        } else {
            fetchPost();
        }
    }, [passedPostData, id]);

    const fetchPost = async () => {
        try {
            const {data, error} = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
            
            if (data) {
                setPost({
                    title: data.title || "",
                    author: data.author || "",
                    description: data.description || "",
                    image_url: data.image_url || ""
                });
            }
        } catch (err) {
            console.error('Failed to fetch post:', err);
        }
    }

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({title: post.title, author: post.author, description: post.description, image_url: post.image_url})
            .eq('id', id);

        window.location = "/post/" + id;
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location="/";
    }

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
                <h1 className="create-post-title">Editing the Post</h1>
            </div>
            <form className="create-post-form" onSubmit={updatePost}>
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
                        disabled={!post.title || !post.author || !post.description}
                    >
                        Update Post
                    </button>
                    <button className="delete" onClick={deletePost}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost