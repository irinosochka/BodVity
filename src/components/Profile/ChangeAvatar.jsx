import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {colors} from "../../styles/Styles";

const ChangeAvatar = ({ avatarNumber, setAvatarNumber }) => {
    const [avatarCurrentNumber, setAvatarCurrentNumber] = useState(avatarNumber);

    const imageSources = [
        require('../../../assets/avatars/avatar1.png'),
        require('../../../assets/avatars/avatar2.png'),
        require('../../../assets/avatars/avatar3.png'),
        require('../../../assets/avatars/avatar4.png'),
        require('../../../assets/avatars/avatar5.png'),
        require('../../../assets/avatars/avatar6.png'),
    ];

    const scrollViewRef = useRef(null);
    const itemWidth = 120;
    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    useLayoutEffect(() => {
        setAvatarCurrentNumber(imageSources[avatarCurrentNumber]);
    }, []);

    useEffect(() => {
        const index = imageSources.indexOf(avatarCurrentNumber);
        const x =
            index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
        scrollViewRef.current.scrollTo({ x, animated: true });
    }, [avatarCurrentNumber, scrollViewWidth]);

    const handleAvatarSelect = (source, idx) => {
        setAvatarCurrentNumber(source);
        setAvatarNumber(idx);
        const index = imageSources.indexOf(source);
        const x =
            index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
        scrollViewRef.current.scrollTo({ x, animated: true });
    };

    return (
        <View style={{alignItems: 'center', paddingBottom: 30, paddingTop: 10,}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                contentContainerStyle={{ alignItems: 'center' }}
                onLayout={(event) =>
                    setScrollViewWidth(event.nativeEvent.layout.width)
                }
            >
                {imageSources.map((source, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAvatarSelect(source, index)}
                    >
                        <Image
                            source={source}
                            style={{
                                width: itemWidth,
                                height: itemWidth,
                                marginHorizontal: 5,
                                borderWidth: avatarCurrentNumber === source ? 2 : 0,
                                backgroundColor: colors.lightBlue,
                                borderColor: colors.primary,
                                borderRadius: itemWidth/2
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default ChangeAvatar;
