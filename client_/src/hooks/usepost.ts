import { setallPost } from "@/redux/postSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetPost = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchpost = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/post/allposts");
                if (response.data.success) {
                    dispatch(setallPost(response.data.allpost));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchpost();
        
        // Remove setallPost from dependencies - it never changes
    }, [dispatch]); // Only dispatch as dependency
}

export default useGetPost