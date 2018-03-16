import React, { Component } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating || 0
    };

    if (this.props.viewOnly === false) {
      this._createPanResponder();
    }
  }

  render() {
    let extraProps = this.props.viewOnly ? {} : this.panResponder.panHandlers;

    return (
      <View
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          this.viewX = layout.x;
        }}
        style={{ flexDirection: 'row' }}
        {...extraProps}
      >
        {this._getStars(this.state.rating)}
      </View>
    );
  }

  _getStars(currentRating) {
    let stars = [];
    for (let i = 0; i < this.props.maxRating; i++) {
      if (
        this.props.halfStar &&
        currentRating > i &&
        currentRating <= i + 0.5
      ) {
        stars.push(React.cloneElement(this.props.halfStar, { key: i }));
      } else if (currentRating >= i + 1) {
        stars.push(React.cloneElement(this.props.fullStar, { key: i }));
      } else {
        stars.push(React.cloneElement(this.props.emptyStar, { key: i }));
      }
    }

    return stars;
  }

  _round(value) {
    const inv = 1.0 / (this.props.halfStar ? 0.5 : 1.0);
    const rating = this.props.halfStar
      ? Math.round(value * inv) / inv
      : Math.ceil(value);
    if (rating < 0) {
      return 0;
    } else if (rating > this.props.maxRating) {
      return this.props.maxRating;
    }

    return rating;
  }

  _createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        const valueRating = this._round(
          (event.nativeEvent.pageX - this.viewX) / this.props.starSize
        );
        this.setState({
          rating: valueRating
        });
        if (this.props.clickOnly === true) {
          this.props.onChange && this.props.onChange(valueRating);
        }
      },
      onPanResponderMove: (event, gesture) => {
        if (this.props.clickOnly === true) {
          return;
        }
        const valueRating = this._round(
          (event.nativeEvent.pageX - this.viewX) / this.props.starSize
        );
        this.props.onChangeMove && this.props.onChangeMove(valueRating);
        this.setState({
          rating: valueRating
        });
      },
      onPanResponderRelease: event => {
        if (this.props.clickOnly === true) {
          return;
        }
        setTimeout(() => {
          this.props.onChange && this.props.onChange(this.state.rating);
        }, 100);
      }
    });
  }
}

Rating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  emptyStar: PropTypes.element.isRequired,
  fullStar: PropTypes.element.isRequired,
  halfStar: PropTypes.element,
  onChange: PropTypes.func,
  onChangeMove: PropTypes.func,
  starSize: PropTypes.number.isRequired,
  viewOnly: PropTypes.bool,
  clickOnly: PropTypes.bool
};

Rating.defaultProps = {
  rating: 0,
  maxRating: 5,
  viewOnly: false,
  clickOnly: false
};
