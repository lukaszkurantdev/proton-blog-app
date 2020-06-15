import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
//models
import {Post as PostModel} from '../core/models/Post.model';
//components
import Post from '../components/Post';
import Colors from '../styles/Colors';

interface IProps {
  data: PostModel[];
  showDetails: (item: PostModel) => void;
}

export default class MyCarousel extends React.Component<IProps> {
  state = {
    activeCard: 0,
  };

  renderItem = ({item, index}: {item: PostModel; index: number}) => {
    return (
      <Post
        type="card"
        {...item}
        onPress={() => this.props.showDetails(item)}
      />
    );
  };

  get pagination() {
    const {data} = this.props;
    const {activeCard} = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeCard}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        dotColor={Colors.SECONDARY}
        inactiveDotColor={Colors.GRAY}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.5}
      />
    );
  }

  render() {
    return (
      <>
        <Carousel
          data={this.props.data}
          renderItem={this.renderItem}
          slideStyle={styles.slideStyle}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
          onSnapToItem={(index: number) => this.setState({activeCard: index})}
        />
        {this.pagination}
      </>
    );
  }
}

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  slideStyle: {
    height: 220,
    marginTop: 20,
  },
});
