import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";
import  groups from "../../../assets/data/groups.json";
import { selectedGroupAtom } from "../../atom";
import { useSetAtom } from "jotai";
import { Group } from "../../typs";

export default function GroupSelecter() {
    const [value, setValue] = useState<string>("");
    const setGroup = useSetAtom(selectedGroupAtom);

    const filteredGroup = groups.filter(group => group.name.toLowerCase().includes(value.toLowerCase()));
    const onGroupSelected = (group: Group) => {
        setGroup(group);
        router.back();
    }
    return (
        <SafeAreaView style={{padding:10,flex:1}}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
                <AntDesign name="close" size={24} color="black" onPress={() => router.back()}/>
                <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center',flex:1,paddingRight:30}}>Post to</Text>
            </View>
            <View style={{flexDirection:'row',marginTop: 8,alignItems:'center',borderRadius:5,backgroundColor:'lightgrey',paddingHorizontal:10,gap:10}}>
                <AntDesign name="search" size={16} color="gray"/>
                <TextInput placeholder="Search for community"
                    placeholderTextColor={"grey"}
                    style={{paddingVertical:10,flex:1}} 
                    value={value} 
                    onChangeText={setValue}/>
                {value && (
                    <AntDesign name="close-circle" size={15} color="#E4E4E4" onPress={() => setValue("")}/>
                )}
            </View>

            <FlatList
                data={filteredGroup}
                renderItem={({item}) => (
                    <Pressable 
                        onPress={() => onGroupSelected(item)}
                        style={{flexDirection:'row',alignItems:'center',gap:5,marginBottom:10,marginTop:10}}>
                        <Image source={{uri: item.image}} style={{width:40 , aspectRatio: 1,borderRadius:20}}/>
                        <Text style={{fontWeight:'600'}}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    )
}