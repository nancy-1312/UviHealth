import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    SafeAreaView, 
    ActivityIndicator
} from 'react-native';

import Colors from '../utils/Colors';
import Card from '../components/Card';
import Header from '../components/Header';
import Comment from '../components/Comment';
import { getPostDetail } from '../utils/Api';

const Post = ({ route, navigation }) => {
    const { item } = route.params;
    const { num_comments, permalink } = item;

    // State variables
    const [comments, setComments] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    // Hooks

    useEffect(() => {
        let isSubscribed = true;
        setShowLoader(true);
        // Fetch Comments
        getPostDetail(permalink,resp => {
            if (isSubscribed) {
                setComments(resp.data?.[1]?.data.children);
                setShowLoader(false);
            }
        }, ex => setShowLoader(false))
        return () => {
            isSubscribed = false;
        }
    }, [])

    // Render Comments
    const renderItem = ({ item, index }) => {
        const {data} = item;
        return (
            <Comment
                key={index.toString()}
                userName={data.author}
                comment={data.body_html}
                score={data.score}
            />
        )
    }

    // Render Header, Post and Comment Count
    const renderFlatListHeader = () => {
        return (
            <>
                <Header showBackButton={true} navigateBack={() => navigation.goBack()} />
                <Card item={item} showCustomView={false}/>
                <View style={{ margin: 10 }}>
                    <Text>{num_comments} Comments</Text>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.topContainer(Colors.black)}>
            <View style={styles.topContainer(Colors.white)}>
                {showLoader && <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#000" animating={true} />
                </View>}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderFlatListHeader()}
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatlistContainer}
                />
            </View>
        </SafeAreaView>
    )
}

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

export default Post;