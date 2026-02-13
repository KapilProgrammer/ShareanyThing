import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CommunityScreen() {
    const [title, setTitle] = useState<string>("");
    const [bodyText, setBodyText] = useState<string>("");

    const goBack = () => {
        setTitle("");
        setBodyText("");
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
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 15}}>
                    {/* Community Selecter */}
                    <View style={styles.communityContainer}>
                        <Text style={styles.rStyles}>r/</Text>
                        <Text style={{ fontWeight: '600' }}>Select a Community</Text>
                    </View>

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