import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import iconAdd from "./images/add.png";
import iconAttach from "./images/attach.png";
import iconEmail from "./images/email.png";
import iconPerson from "./images/person.png";
import iconSetting from "./images/setting.png";

class CircleButton extends Component {
  constructor() {
    super();

    this.state = {
      isClicked: false,
    };

    this.rotateAnimated = new Animated.Value(0);
    this.scaleAnimated = new Animated.Value(0);
    this.bringToBackAnimated = new Animated.Value(0);
    this.bringToLeftAnimated = new Animated.Value(0);
    this.bringToRightAnimated = new Animated.Value(0);
    this.bringToTopAnimated = new Animated.Value(0);
    this.bringToBottomAnimated = new Animated.Value(0);
    this.fadeAnimated = new Animated.Value(0);
    this._button = this._button.bind(this);
    this._buttonCenter = this._buttonCenter.bind(this);
  }

  createAnimation(obj, toValue, duration) {
    return Animated.timing(obj, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  startAnimation() {
    this.createAnimation(this.rotateAnimated, 1, 200);
    this.createAnimation(this.scaleAnimated, 1, 200);
    this.createAnimation(this.bringToBackAnimated, 1, 150);
    this.createAnimation(this.bringToLeftAnimated, 1, 200);
    this.createAnimation(this.bringToRightAnimated, 1, 200);
    this.createAnimation(this.bringToTopAnimated, 1, 200);
    this.createAnimation(this.bringToBottomAnimated, 1, 200);
    this.createAnimation(this.fadeAnimated, 1, 200);
  }

  endAnimation() {
    this.createAnimation(this.rotateAnimated, 2, 200);
    this.createAnimation(this.scaleAnimated, 0, 200);
    this.createAnimation(this.bringToBackAnimated, 0, 2000);
    this.createAnimation(this.bringToLeftAnimated, 0, 200);
    this.createAnimation(this.bringToRightAnimated, 0, 200);
    this.createAnimation(this.bringToTopAnimated, 0, 200);
    this.createAnimation(this.bringToBottomAnimated, 0, 200);
    this.createAnimation(this.fadeAnimated, 0, 200);
  }

  _button(onPress) {
    this.setState({ isClicked: !this.state.isClicked });
    this.endAnimation();
    onPress();
  }

  _buttonCenter() {
    this.startAnimation();
    this.setState({ isClicked: !this.state.isClicked });
    if (this.state.isClicked) this.endAnimation();
  }

  render() {
    const { size, primaryColor, secondaryColor } = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonWrapper: {
        right: size * 2 - 10,
      },
      buttonLeft: {
        alignItems: "center",
        justifyContent: "center",
        width: size - 5,
        height: size - 5,
        borderRadius: 360,
      },
      buttonRight: {
        alignItems: "center",
        justifyContent: "center",
        width: size - 5,
        height: size - 5,
        borderRadius: 360,
      },
      buttonCenter: {
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 360,
        backgroundColor: primaryColor,
      },
      buttonTop: {
        right: -size * 2 + 7,
        alignItems: "center",
        justifyContent: "center",
        width: size - 5,
        height: size - 5,
        borderRadius: 360,
      },
      buttonBottom: {
        right: size - 7,
        alignItems: "center",
        justifyContent: "center",
        width: size - 5,
        height: size - 5,
        borderRadius: 360,
      },
      text: {
        color: "#EECE69",
        fontWeight: "bold",
        letterSpacing: 1,
      },
      centerImage: {
        width: size - 5,
        height: size - 5,
      },
      childImage: {
        width: size - 15,
        height: size - 15,
      },
      circle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 360,
        backgroundColor: secondaryColor,
      },
    });

    const rotateMe = this.rotateAnimated.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["0deg", "45deg", "0deg"],
    });

    const scaleMe = this.scaleAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [size, size * 2.8],
    });

    const bringToBack = this.bringToBackAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [99, -1],
    });

    const bringMeToLeft = this.bringToLeftAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [size, 0],
    });

    const bringMeToRight = this.bringToRightAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size],
    });

    const bringMeToTop = this.bringToTopAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -size + 2],
    });

    const bringMeToBottom = this.bringToBottomAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size - 2],
    });

    const fadeInOut = this.fadeAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const childStyle = [styles.childImage, { opacity: fadeInOut }];
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, { width: scaleMe, height: scaleMe }]}
        >
          <Animated.View style={{ top: bringMeToTop }}>
            <TouchableOpacity
              onPress={() => this._button(this.props.top.onPress)}
              activeOpacity={1}
              style={styles.buttonTop}
            >
              {this.props.top.component(childStyle)}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ left: bringMeToLeft }}>
            <TouchableOpacity
              onPress={() => this._button(this.props.left.onPress)}
              activeOpacity={1}
              style={styles.buttonLeft}
            >
              {this.props.left.component(childStyle)}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ left: bringMeToRight }}>
            <TouchableOpacity
              onPress={() => this._button(this.props.right.onPress)}
              activeOpacity={1}
              style={styles.buttonRight}
            >
              {this.props.right.component(childStyle)}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ top: bringMeToBottom }}>
            <TouchableOpacity
              onPress={() => this._button(this.props.bottom.onPress)}
              activeOpacity={1}
              style={styles.buttonBottom}
            >
              {this.props.bottom.component(childStyle)}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.buttonWrapper,
              { transform: [{ rotate: rotateMe }] },
            ]}
          >
            <TouchableOpacity
              onPress={this._buttonCenter}
              activeOpacity={1}
              style={styles.buttonCenter}
            >
              {this.props.center.component(styles.centerImage)}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

function removeOpacity(style) {
  if (Array.isArray(style)) {
    style = style.filter((o) => o.opacity === undefined);
  }
  return style;
}

CircleButton.defaultProps = {
  size: 40,
  primaryColor: "#41727E",
  secondaryColor: "#459186",
  center: {
    component: (style) => <Animated.Image source={iconAdd} style={style} />,
    onPress: () => {},
  },
  left: {
    component: (style) => <Animated.Image source={iconAttach} style={style} />,
    onPress: () => {},
  },
  right: {
    component: (style) => <Animated.Image source={iconEmail} style={style} />,
    onPress: () => {},
  },
  top: {
    component: (style) => <Animated.Image source={iconPerson} style={style} />,
    onPress: () => {},
  },
  bottom: {
    component: (style) => <Animated.Image source={iconSetting} style={style} />,
    onPress: () => {},
  },
};

CircleButton.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  center: PropTypes.object,
  left: PropTypes.object,
  right: PropTypes.object,
  top: PropTypes.object,
  bottom: PropTypes.object,
};
module.exports = CircleButton;
