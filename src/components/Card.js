//Libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import FitImage from 'react-native-fit-image';

import Colors from '../utils/Colors';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Card = ({ item, showCustomView = true, navigateToPostScreen = () => {} }) => {
    const { subreddit_name_prefixed, thumbnail, title, media, url } = item;

    /**
     * This will render Media Components 
     */
    const renderMediaComponent = () => {
        return (
            media?.reddit_video ?
                <View style={styles.swiperContainer}>
                    <Video
                        source={{ uri: media.reddit_video.fallback_url }}
                        style={{ height: !showCustomView ? 250 : 100, width: !showCustomView ? 250 : 100 }}
                        resizeMode="contain"
                    />
                </View> :
                url?.includes('i.redd.it') ?
                    <FitImage
                        indicator={true}
                        indicatorColor="black"
                        indicatorSize="small"
                        source={{ uri: url }}
                        style={{ height: !showCustomView ? 250 : 100, width: !showCustomView ? '90%' : 100 }}
                        resizeMode="contain"
                    />
                    : <></>
        )
    }

    return (
        <TouchableOpacity style={styles.PostContainer} onPress={navigateToPostScreen}>
            <PostHeader name={subreddit_name_prefixed} thumbnail={thumbnail} />
            <View style={styles.container}>
                {title ?
                    <View style={styles.titleContainer}>
                        <Text style={styles.description}>{title}</Text>
                    </View> : null
                }
                {showCustomView && (media?.reddit_video || url) ? renderMediaComponent() : null}
            </View>
            {!showCustomView && (media?.reddit_video || url) ? <View style={styles.cardView}>
                {renderMediaComponent()}
            </View> : null}
            <PostFooter item={item} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        marginRight: 10 
    },
    PostContainer: {
        flex: 1,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.gray,
        backgroundColor: Colors.white,
    },
    text: {
        fontSize: 16,
        color: Colors.placeHolderColor
    },
    description: {
        fontSize: 16,
        color: Colors.black,
    },
    cardView: {
        margin: 20, 
        alignItems:'center'
    },
    titleContainer: { 
        flex: 1, 
        paddingHorizontal: 10, 
        paddingBottom: 10 
    }
})

export default Card;
