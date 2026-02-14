import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { selectedGroupAtom } from '../../../atom';
import { useState } from 'react';
import { useAtom } from 'jotai';

export default function CommunityScreen() {
    const [title, setTitle] = useState<string>("");
    const [bodyText, setBodyText] = useState<string>("");

    const [group,setGroup] = useAtom(selectedGroupAtom);

    const goBack = () => {
        setTitle("");
        setBodyText("");
        setGroup(null);
        router.back();
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="close" size={30} color="black" onPress={() => goBack()} />
                <Pressable onPress={() => router.back()} style={{ marginLeft: 'auto' }}>
                    <Text style={styles.postText}>Post</Text>
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
                                    <Image source={{uri: group.image}} style={{width:20,height:20,borderRadius:20}}/>
                                    <Text style={{fontWeight:'600',marginLeft:3}}>{group.name}</Text>
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