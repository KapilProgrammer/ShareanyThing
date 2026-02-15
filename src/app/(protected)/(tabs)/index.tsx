import { Text, View, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { supabase } from "../../../lib/SuperBase";
import { useState,useEffect } from "react";
import {Tables} from "../../../types/database.types"
import {useQuery} from "@tanstack/react-query"
import { featchPosts } from "../../services/postService";


export default function HomeScreen() {

    const {data: posts, isLoading,error} = useQuery({
        queryKey:["posts"],
        queryFn: () => featchPosts()
    });

    if(isLoading){
        return <ActivityIndicator />;
    }
    if(error){
        <Text>Error fetching posts</Text>
    }
    return (
        <View>
            <FlatList 
                data={posts}
                renderItem={({item}) => <PostListItem post={item} />}        
            />
        </View>
    )
}

