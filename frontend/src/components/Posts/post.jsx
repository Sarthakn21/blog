import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
const Post = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 15;
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleOpenAddPostModal = () => setShowAddPostModal(true);
    const handleCloseAddPostModal = () => setShowAddPostModal(false);
    const { isLoggedIn, loginUser, logoutUser } = useContext(GlobalContext);

    const fetchMorePosts = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/post/?page=${page}&limit=${limit}`, {
                withCredentials: true,
            });
            const newPosts = response.data;
            setPosts((prevPosts) => prevPosts.concat(newPosts));
            if (newPosts.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            logoutUser();
            navigate('/signin')
            console.error('Error fetching posts:', error.message);
        }
    };

    useEffect(() => {
        if (posts.length === 0) {
            console.log('useEffect is called');
            fetchMorePosts(currentPage);
        }
    }, []);

    const nextItems = () => {
        console.log('next item is called');
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchMorePosts(nextPage);
    };
    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/post', {
                title,
                content,
            },
                {
                    withCredentials: true,
                });
            console.log('Post creation response:', response.data);
            handleCloseAddPostModal();
            setTitle('');
            setContent('');
            fetchMorePosts(1);
        } catch (error) {
            logoutUser();
            console.error('Error creating post:', error);
        }
    };
    const handleCloseModal = (event) => {
        if (showAddPostModal && !event.target.closest('.modal-content')) {
            handleCloseAddPostModal();
        }
    };

    return (<>
        <div>
            <button
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOpenAddPostModal}>
                Add Post
            </button>
            <div
                className={`fixed inset-0 z-50 flex justify-center items-center bg-opacity-75 ${showAddPostModal ? 'block' : 'hidden'}`}
            >
                <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                    <button
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleCloseAddPostModal}
                    >
                        X
                    </button>
                    <h2 className="text-xl font-bold text-center mb-4">Create Post</h2>
                    <form onSubmit={handlePostSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label className="block text-gray-700 font-bold mt-2 py-2" htmlFor="content">
                                content
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="content"
                                type="text"
                                placeholder="Enter post title"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <button
                                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center bg-slate-100">
            <InfiniteScroll
                dataLength={posts.length}
                next={nextItems}
                hasMore={hasMore}
                loader={<h4>Loading more posts...</h4>}
                endMessage={<p>No more posts to load</p>}
            >
                <div className="post-container grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4"
                        >
                            <h3 className="font-bold text-blue-700">{post.title}</h3>

                            <p className="mb-4">{post.content}</p>
                            <div className="flex md:flex-col justify-between text-sm gap-5">
                                <p>{post.author}</p>
                                <p>
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    </>
    );
};

export default Post;
