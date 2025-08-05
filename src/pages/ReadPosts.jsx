import { supabase } from '../client'
import { useState, useEffect } from 'react'

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} =await supabase
                .from('Posts')
                .select()
                .order('created_at', {ascending: false});

            setPosts(data)
        }
        fetchPosts();
    }, [props])

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Post 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        upvotes={post.upvotes}
                        image_url={post.image_url}
                        is_solved={posts.is_solved}
                    />
                ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>
    )
}

export default ReadPosts