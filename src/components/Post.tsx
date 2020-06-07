import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  title: string;
  image: string;
  content: string;
  type?: 'default' | 'card';
  onPress?: () => void;
}

const Post = (props: IProps) => {
  const {title, image, content, type, onPress} = props;
  const isCard = type === 'card';

  return (
    <TouchableOpacity
      style={[
        isCard ? styles.cardContainer : styles.container,
        isCard ? GlobalStyles.shadow : GlobalStyles.smallShadow,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Image
        style={isCard ? styles.cardImage : styles.image}
        source={{uri: image}}
      />
      <View style={styles.textContainer}>
        <Text style={GlobalStyles.mainHeader}>{title}</Text>

        <Text
          style={GlobalStyles.mainHeaderDescription}
          numberOfLines={2}
          ellipsizeMode="tail">
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardContainer: {
    height: 200,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  image: {
    height: 90,
    width: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardImage: {
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
});
