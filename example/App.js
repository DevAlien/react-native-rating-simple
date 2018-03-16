import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Rating from 'react-native-rating-simple';

const halfStar = require('./images/halfStar.png');
const fullStar = require('./images/fullStar.png');
const emptyStar = require('./images/emptyStar.png');

const halfStar1 = require('./images/halfStar1.png');
const fullStar1 = require('./images/fullStar1.png');
const emptyStar1 = require('./images/emptyStar1.png');

const ratingName = ['Very Bad', 'Bad', 'Average', 'Good', 'AWESOME!!'];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating1: 0,
      rating2: 0,
      rating3: 2.5,
      rating4: 1.5,
      rating5: 0
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          On move, half, max 5: {this.state.rating1}
        </Text>
        <Rating
          halfStar={
            <Image source={halfStar} style={{ width: 40, height: 40 }} />
          }
          fullStar={
            <Image source={fullStar} style={{ width: 40, height: 40 }} />
          }
          emptyStar={
            <Image source={emptyStar} style={{ width: 40, height: 40 }} />
          }
          starSize={40}
          onChangeMove={rating => {
            this.setState({ rating1: rating });
          }}
          onChange={rating => {
            this.setState({ rating1: rating });
          }}
        />
        <Text style={styles.text}>
          On release/click, no half, max 7: {this.state.rating2}
        </Text>
        <Rating
          emptyStar={
            <Image source={emptyStar1} style={{ width: 30, height: 30 }} />
          }
          fullStar={
            <Image source={fullStar1} style={{ width: 30, height: 30 }} />
          }
          maxRating={7}
          starSize={30}
          onChange={rating => {
            this.setState({ rating2: rating });
          }}
        />
        <Text style={styles.text}>
          View Only, half, max 5: {this.state.rating3}
        </Text>
        <Rating
          rating={this.state.rating3}
          viewOnly={true}
          halfStar={
            <Image source={halfStar} style={{ width: 40, height: 40 }} />
          }
          fullStar={
            <Image source={fullStar} style={{ width: 40, height: 40 }} />
          }
          emptyStar={
            <Image source={emptyStar} style={{ width: 40, height: 40 }} />
          }
          starSize={40}
        />

        <Text style={styles.text}>
          Click only, half, max 5: {this.state.rating4}
        </Text>
        <Rating
          rating={this.state.rating4}
          halfStar={
            <Image source={halfStar1} style={{ width: 40, height: 40 }} />
          }
          emptyStar={
            <Image source={emptyStar1} style={{ width: 40, height: 40 }} />
          }
          fullStar={
            <Image source={fullStar1} style={{ width: 40, height: 40 }} />
          }
          maxRating={5}
          clickOnly={true}
          starSize={40}
          onChange={rating => {
            this.setState({ rating4: rating });
          }}
        />
        <Text style={styles.text}>
          On move, no half, max 5, mapped:{' '}
          {this.state.rating5 > 0 ? ratingName[this.state.rating5 - 1] : ''}
        </Text>
        <Rating
          fullStar={
            <Image source={fullStar} style={{ width: 40, height: 40 }} />
          }
          emptyStar={
            <Image source={emptyStar} style={{ width: 40, height: 40 }} />
          }
          starSize={40}
          onChangeMove={rating => {
            this.setState({ rating5: rating });
          }}
          onChange={rating => {
            this.setState({ rating5: rating });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-start'
  },
  text: {
    marginTop: 30,
    paddingBottom: 5,
    fontSize: 14
  }
});
