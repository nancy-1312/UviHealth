import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import Images from '../assets';

const PostHeader = ({name, thumbnail}) => {
    return (
        <View style={styles.postHeader}>
            <Image
                source={thumbnail == 'self' || thumbnail == 'default' ? Images.reddit : { uri: thumbnail }}
                style={styles.avatarContainer}
                resizeMode={'cover'}
            />
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    avatarContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    text: {
        fontSize: 16,
        color: '#4a4a4a'
    },
})

export default PostHeader;