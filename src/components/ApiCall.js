import React, { useState } from 'react'
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'


const ApiCall = () => {
    //declaring the use state for search and the result of the search
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);


    const url = `https://itunes.apple.com/search?term=${search}`

    const fetchMusicData = async () => {
        try {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    setSearchResult(json.results);

                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.wrapper}>
            <TouchableOpacity>
                <Image source={{ uri: item.artworkUrl100 }} style={styles.img} />
                <Text>{item.trackName}</Text>
                <Text>By {item.artistName}</Text>
                <Text>{item.collectionName}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView>

            <View style={styles.renderView}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSearch(text)}
                />
                <Button style={styles.btn} title="search" onPress={fetchMusicData} />
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50
    },
    input: {
        height: 40,
        margin: 12,
        marginTop: 40,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        height: 30,
        width: 20,

    },
    renderView: {
        padding: 10
    },
    img: {
        width: 50,
        height: 50
    }
})


export default ApiCall