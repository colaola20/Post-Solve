import { supabase } from '../client'
import { useState, useEffect } from 'react'
import Post from '../components/Post'
import './ReadPosts.css'

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState('newest')

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

    const sortPosts = (posts, sortType) => {
        const sortedPosts = [...posts];

        switch (sortType) {
            case 'newest':
                return sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case 'oldest':
                return sortedPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case 'most-upvotes':
                return sortedPosts.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
            case 'least-upvotes':
                return sortedPosts.sort((a, b) => (a.upvotes || 0) - (b.upvotes || 0));
            case 'solved':
                return sortedPosts.sort((a, b) => {
                    if (a.is_solved && !b.is_solved) return -1;
                    if (!a.is_solved && b.is_solved) return 1;
                    return new Date(b.created_at) - new Date(a.created_at); // Secondary sort by date
                });
            case 'unsolved':
                return sortedPosts.sort((a, b) => {
                    if (!a.is_solved && b.is_solved) return -1;
                    if (a.is_solved && !b.is_solved) return 1;
                    return new Date(b.created_at) - new Date(a.created_at); // Secondary sort by date
                });
            default:
                return sortedPosts;
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const sortedPosts = sortPosts(posts, sortBy)

    return (
        <div className="ReadPosts">
            <div className="sort-controls">
                <label htlmFor="sort-select" className="sort-label">
                    Sort by:
                </label>
                <select
                id="sort-select"
                className="sort-dropdown"
                value={sortBy}
                onChange={handleSortChange}
                >
                    <option value="newest">📅 Newest First</option>
                    <option value="oldest">📅 Oldest First</option>
                    <option value="most-upvotes">👍 Most Upvoted</option>
                    <option value="least-upvotes">👎 Least Upvoted</option>
                    <option value="solved">✅ Solved First</option>
                    <option value="unsolved">❓ Unsolved First</option>
                </select>
                <span className="post-count">
                    {posts.length} posts {posts.length !== 1 ? 's' : ''} found
                </span>
            </div>
            <div className="posts-list">
                {
                    sortedPosts && sortedPosts.length > 0 ?
                    sortedPosts.map((post,index) => 
                        <Post 
                            key={post.id}
                            id={post.id} 
                            title={post.title}
                            author={post.author}
                            description={post.description}
                            upvotes={post.upvotes}
                            image_url={post.image_url}
                            is_solved={post.is_solved}
                            created_at={post.created_at}
                            variant="summary"
                        />
                    ) : <h2>{'No Posts Yet 😞'}</h2>
                }
            </div>
        </div>
    )
}

export default ReadPosts