import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { selectedGroupAtom } from '../../../atom';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/SuperBase';
import { TablesInsert } from '../../../types/database.types';

type InsertPost = TablesInsert<'posts'>;

const insertPost = async (post: InsertPost) => {
    const { data, error } = await supabase.from("posts").insert({
        ...post,
        group_id: '2f393125-a3a4-4a76-877c-440741d90d21',
        user_id: '54064548-da58-4ab3-89a1-1f8c1c877927'
    })
        .select()
        .single();
    if (error) {
        throw error;
    } else {
        return data;
    }
}

export default function CommunityScreen() {
    const [title, setTitle] = useState<string>("");
    const [bodyText, setBodyText] = useState<string>("");
    const [group, setGroup] = useAtom(selectedGroupAtom);

    const queryClient = useQueryClient();

    const { data, mutate, isPending, error } = useMutation({
        mutationFn: () =>{ 

            if(!group){
                throw new Error("Please select a group")
            }

            if(!title){
                throw new Error("Title is Required")
            }

            return insertPost({ 
                title, 
                description: bodyText, 
                group_id: group?.id, 
                user_id: '54064548-da58-4ab3-89a1-1f8c1c877927' 
            });
        },
        onSuccess: (data) => {
            console.log(data);

            // Query Might have been affected so we need to refresh it
            queryClient.invalidateQueries({queryKey: ["posts"]});
            goBack();
        },
        onError: (error) => {
            console.log(error);
            Alert.alert("Failed to create post",error.message);
        }
    })

    const goBack = () => {
        setTitle("");
        setBodyText("");
        setGroup(null);
        router.back();
    }

    console.log(data);
    console.log(error);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="close" size={30} color="black" onPress={() => goBack()} />
                <Pressable onPress={() => mutate()} style={{ marginLeft: 'auto' }} disabled={isPending}>
                    <Text style={styles.postText}>{isPending ? "Posting.." : "Post"}</Text>
                </Pressable>
            </View>


            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15 }}>
                    {/* Community Selecter */}
                    <Link href={"groupSelecter"} asChild>
                        <Pressable style={styles.communityContainer}>
                            {group ? (
                                <>
                                    <Image source={{ uri: group.image }} style={{ width: 20, height: 20, borderRadius: 20 }} />
                                    <Text style={{ fontWeight: '600', marginLeft: 3 }}>{group.name}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.rStyles}>r/</Text>
                                    <Text style={{ fontWeight: '600' }}>Select a Community</Text>
                                </>
                            )}
                        </Pressable>
                    </Link>

                    {/* Inputs */}
                    <TextInput
                        placeholder='Title'
                        style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 20 }}
                        value={title}
                        onChangeText={setTitle}
                        multiline
                        scrollEnabled={false}
                    />
                    <TextInput
                        placeholder='body text (optional)'
                        value={bodyText}
                        onChangeText={setBodyText}
                        multiline
                        scrollEnabled={false}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    postText: {
        color: 'white',
        backgroundColor: '#115BCA',
        fontWeight: 'bold',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 10
    },
    rStyles: {
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 1,
        paddingHorizontal: 5,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    communityContainer: {
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginVertical: 10
    }
})