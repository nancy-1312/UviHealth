import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet
} from 'react-native';

import Colors from '../utils/Colors';
import Card from '../components/Card';
import Header from '../components/Header';
import { getPosts } from '../utils/Api';

const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        setShowLoader(true);
        getPosts(resp => {
            if (isSubscribed) {
                setData(resp.data.data.children);
                setShowLoader(false);
            }
        }, ex => setShowLoader(false))
        return () => {
            isSubscribed = false;
        }
    }, [])

    // navigate to Detail Post Screen
    const navigateToPostScreen = (item) => {
        navigation.navigate('Post', { item })
    }

    return (
        <SafeAreaView style={styles.topContainer(Colors.black)}>
            <View style={styles.topContainer(Colors.white)}>
                {showLoader && <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#000" animating={true} />
                </View>}
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Header />}
                    contentContainerStyle={styles.flatlistContainer}
                    renderItem={({ item }) =>
                        <Card
                            item={item?.data}
                            navigateToPostScreen={() => navigateToPostScreen(item.data)}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flatlistContainer: { 
        flexGrow: 1, 
        backgroundColor: Colors.borderGrayColor 
    },
    loadingView: { 
        position: 'absolute', 
        top: '48%', 
        left: '48%', 
        zIndex: 1, 
        backgroundColor: Colors.transparent
    },
    topContainer: color => ({ 
        flex: 1, 
        backgroundColor: color 
    })
})

export default Home;
