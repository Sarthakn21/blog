import Post from '../models/post.js'; // Assuming you have a Post model

const getPost = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const createPost = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.username;

    try {
        const post = new Post({ title, content, author });
        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
export { getPost, createPost }
