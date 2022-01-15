import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import Images from '../assets';

const PostFooter = ({ item }) => {
    const { score, num_comments, all_awardings } = item;

    let awardCount = 0;
    let awardUrls = [];

    // Get Total Award count
    all_awardings?.forEach((ele, index) => {
        awardCount += ele.count;
        if (index < 3) {
            awardUrls.push(ele.icon_url);
        }
    })

    const convert = (val) => {
        // thousands, millions, billions etc..
        var s = ["", "k", "m", "b", "t"];

        // dividing the value by 3.
        var sNum = Math.floor(("" + val).length / 3);

        // calculating the precised value.
        var sVal = parseFloat((
            sNum != 0 ? (val / Math.pow(1000, sNum)) : val).toPrecision(2));

        if (sVal % 1 != 0) {
            sVal = sVal.toFixed(1);
        }

        // appending the letter to precised val.
        return sVal + s[sNum];
    }

    // Render Post Score
    const renderScoreView = () => {
        return (
            <View style={styles.scoreView}>
                <Image
                    source={Images.downArrow}
                    style={[styles.icon, { transform: [{ scaleY: -1 }] }]}
                    resizeMode={'contain'}
                />
                <Text>{convert(score)}</Text>
                <Image
                    source={Images.downArrow}
                    style={styles.icon}
                    resizeMode={'contain'}
                />
            </View>
        )
    }

    // Render Awards
    const renderAwards = () => {
        return (
            awardCount ? <View style={styles.scoreView}>
                {awardUrls.map(item => <Image
                    source={{ uri: item }}
                    style={styles.icon}
                    resizeMode={'contain'}
                />)}
                <Text style={{ marginLeft: 5 }}>{convert(awardCount)}</Text>
            </View> : null
        )
    }

    // Render Comment Count
    const renderCommentCount = () => {
        return (
            <View style={styles.scoreView}>
                <Image
                    source={Images.comment}
                    style={styles.icon}
                    resizeMode={'contain'}
                />
                <Text style={{ marginLeft: 5 }}>{num_comments != undefined ? convert(num_comments) : 'Reply'}</Text>
            </View>
        )
    }

    return (
        <View style={styles.topContainer}>
            {renderScoreView()}
            {renderAwards()}
            {renderCommentCount()}
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        height: 20,
        width: 20
    },
    scoreView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 10,
        paddingVertical: 5,
        borderColor: '#cccccd',
        paddingHorizontal: 10
    },
})

export default PostFooter;