import { supabase } from '../client'
import { useState } from 'react'


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
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>

                <label htmlFor="image_url">Image URL</label><br />
                <input type="text" id="image_url" name="image_url" onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost