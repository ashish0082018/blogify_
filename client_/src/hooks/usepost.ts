// import { setallPost } from "@/redux/postSlice";
// import axios from "axios"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

// const useGetPost = () => {
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         const fetchpost = async () => {
//             try {
//                 const response = await axios.get("https://blogify-6ym8.onrender.com/api/v1/post/allposts");
//                 if (response.data.success) {
//                     dispatch(setallPost(response.data.allpost));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchpost();
        
//         // Remove setallPost from dependencies - it never changes
//     }, [dispatch]); // Only dispatch as dependency
// }

// export default useGetPost

// useGetPost.ts
import { setallPost } from "@/redux/postSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetPost = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchpost = async () => {
            try {
                const { data } = await axios.get("https://blogify-6ym8.onrender.com/api/v1/post/allposts");
                
                // Ensure we always get an array
                const posts = data.success ? data.allpost : [];
                dispatch(setallPost(Array.isArray(posts) ? posts : []));
                
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                dispatch(setallPost([])); // Set empty array on error
            }
        }
        
        fetchpost();
    }, [dispatch]);
}

export default useGetPost;