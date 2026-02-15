import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";
import { featchPostsById } from "../../services/postService";
import { useQuery } from "@tanstack/react-query";

export default function DetailedPost() {
    const {id} = useLocalSearchParams<{id : string}>();
    const {data,isLoading,error} =  useQuery({
        queryKey: ["posts",id],
        queryFn: () => featchPostsById(id)
    });
    // const detailPost = posts.find((post) => post.id === id)

    if(isLoading){
        return <ActivityIndicator />
    }

    if(error || !data){
        return <Text>Post Not Found</Text>;
    }

    // console.log(detailPost);
    
    // if(!detailPost){
    //     return (
    //         <Text>Post Not Found !!</Text>
    //     )
    // }

    return (
        <View>
            <PostListItem post={data} isDetailedPost />
        </View>
    )
}