import React from 'react';
import { View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

import Colors from '../utils/Colors';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const CommentView = ({ comment, userName, score }) => {

    // Render Html comment 
    const renderComment = () => {
        let commentData = comment?.replaceAll('&lt;', '<');
        commentData = commentData?.replaceAll('&gt;', '>');
        return (
            <View style={styles.commentView}>
                <HTMLView 
                    value={commentData}
                    stylesheet={styles.title}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <PostHeader name={userName} thumbnail={'self'}/>
            {renderComment()}
            <PostFooter item={{score}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderColor: Colors.borderGrayColor,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10
    },
    commentView: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 0,
    },
})

export default CommentView