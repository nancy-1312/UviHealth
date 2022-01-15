import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Images from '../assets';
import Colors from '../utils/Colors';

const Header = ({ showBackButton = false, navigateBack = () => { } }) => {
    return (
        <View style={styles.imageView}>
            <Image source={Images.logo} style={styles.logo} />
            {showBackButton ? <TouchableOpacity onPress={navigateBack}>
                <Text style={styles.close}>{'X'}</Text>
            </TouchableOpacity> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        backgroundColor: Colors.headerColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        width: '33%',
        height: 55,
        resizeMode: 'cover'
    },
    close: { 
        color: '#fff', 
        marginRight: 20,
        fontSize: 18,
        fontWeight: 'bold' 
    }
})

export default Header;