import axios from "axios";



export const handleSubmitComment = async (postId, content, option, setComments) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인한 뒤에 이용할 수 있습니다.");
        return;
    }

    try {
        const response = await axios.post(`http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/comment`,
            { postId: postId, content: content, option: option }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setComments((prevComments) => [response.data, ...prevComments]);

    } catch (error) {
        console.error("Error", error);
        alert("댓글 작성에 실패했습니다.");
    }
};

export const handleLikeComment = async (commentId, index, comments, setComments) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인한 뒤에 이용할 수 있습니다.");
        return;
    }

    try {
        const response = await axios.post(
            `http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/comment/like`,
            { commentId: commentId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data)
        const updatedComments = [...comments];
        updatedComments[index] = {
            ...updatedComments[index],
            like: response.data,
        };

        setComments(updatedComments);
        console.log(updatedComments)
    } catch (error) {
        console.error("Error", error);
        alert("댓글 좋아요 변경에 실패했습니다.");
    }
};

export const handleLikePost = async (postId, index, posts, setPosts) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }


    try {
        const response = await axios.post(
            `http://ec2-43-200-178-68.ap-northeast-2.compute.amazonaws.com:8080/post/like`,
            { postId: postId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedPosts = [...posts];
        updatedPosts[index] = {
            ...updatedPosts[index],
            like: response.data,
        };

        setPosts(updatedPosts);
        console.log(response.data)
    } catch (error) {
        console.error("Error", error);
        alert("글 좋아요 변경에 실패했습니다.");
    }
};