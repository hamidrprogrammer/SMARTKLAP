// @flow
import * as React from 'react';
import {
  Platform,
  Animated,
  Easing,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import TextTimeComponent from './textBack';
import styles from './styles';

const { UIManager } = NativeModules;

// TODO: RESOLVE NATIVE MODULE CANNOT BE NULL
// import BackgroundTask from 'react-native-background-task';

// BackgroundTask.define(() => {
//     
//   BackgroundTask.finish();
// });

export type TimerProps = {
  beat: boolean,  // opt
  bgColor?: string,  // opt
  bgColorSecondary?: string,  // opt
  bgColorThirt?: string,  // opt
  borderWidth?: number,  // opt
  color?: string,  // opt
  containerStyle?: ViewPropTypes.style,
  isPausable?: boolean,  // opt
  maxScale?: number,  // opt
  minScale?: number,  // opt
  onPause?: Function,  // opt
  onResume?: Function,  // opt
  onTimeElapsed?: Function,  // opt
  radius: number,
  reverseCount: boolean,
  seconds?: number,
  startAt?: number,
  shadowColor?: string,  // opt
  subTextStyle?: Text.propTypes.style,
  textStyle?: Text.propTypes.style,
  updateText?: Function,  // opt
};

type Default = {
  beat: boolean,  // opt
  bgColor: string,  // opt
  bgColorSecondary: string,  // opt
  bgColorThirt: string,  // opt
  borderWidth: number,  // opt
  color: string,  // opt
  containerStyle: ViewPropTypes.style,
  isPausable: boolean,  // opt
  maxScale: number,  // opt
  minScale: number,  // opt
  onPause: Function,  // opt
  onResume: Function,  // opt
  onTimeElapsed: Function,  // opt
  reverseCount: boolean,

  shadowColor: string,  // opt
  subTextStyle: Text.propTypes.style,
  textStyle: Text.propTypes.style,
  updateText: Function,  // opt
};

type State = {
  active: boolean,
  bounceValue: any,
  circleProgress: any,
  circleProgressX2: any,
  h1Anim: any,
  h2Anim: any,
  interpolationValuesCircleRotate: any,
  interpolationValuesHalfCircle1: any,
  interpolationValuesHalfCircle2: any,
  secondsElapsed: number,
  text: number,
  timerScale: any,
  w1Anim: any,
  w2Anim: any,
};

function calcInterpolationValuesForCircleRotate(animatedValue, { shadowColor }) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 25, 25, 50, 75, 75, 100],
    outputRange: ['0deg', '180deg', '180deg', '360deg', '360deg', '360deg', '360deg'],
  });

  const backgroundColor = shadowColor;
  return { rotate, backgroundColor };
}

function calcInterpolationValuesForHalfCircle1(animatedValue, { shadowColor }) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '180deg', '180deg', '180deg'],
  });

  const backgroundColor = shadowColor;
  return { rotate, backgroundColor };
}

function calcInterpolationValuesForHalfCircle2(animatedValue, { color, shadowColor }) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '0deg', '180deg', '360deg'],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: [color, color, shadowColor, shadowColor],
  });
  return { rotate, backgroundColor };
}

function getInitialState(props: TimerProps): State {
  const circleProgress = new Animated.Value(0);
  const circleProgressX2 = new Animated.Value(0);
  return {
    circleProgress,
    circleProgressX2,
    secondsElapsed: 0,
    text: props.updateText(0, props.seconds),
    interpolationValuesHalfCircle1: calcInterpolationValuesForHalfCircle1(
      circleProgress,
      props,
    ),
    interpolationValuesHalfCircle2: calcInterpolationValuesForHalfCircle2(
      circleProgress,
      props,
    ),
    interpolationValuesCircleRotate: calcInterpolationValuesForCircleRotate(
      circleProgressX2,
      props,
    ),
    w1Anim: new Animated.Value((props.radius * 2) + 60),
    h1Anim: new Animated.Value((props.radius * 2) + 60),
    w2Anim: new Animated.Value(0),
    h2Anim: new Animated.Value(0),
    bounceValue: new Animated.Value(0),
    timerScale: new Animated.Value(1),
  };
}

export default class PercentageCircle extends React.Component<Default, TimerProps, State> {
  static defaultProps: Default = {
    beat: false,
    bgColor: '#fff',
    bgColorSecondary: '#fff',
    bgColorThirt: '#fff',
    borderWidth: 0,
    children: null,
    color: '#f00',
    containerStyle: null,
    isPausable: false,
    maxScale: 1,
    minScale: 0.7,
    onPause: () => null,
    onResume: () => null,
    onTimeElapsed: () => null,
    reverseCount: false,
    seconds: 10,
    startAt: 0,
    shadowColor: '#999',
    subTextStyle: null,
    textStyle: null,
    updateText: (elapsed, total) => (total - elapsed),
  }

  state: State = {
    ...getInitialState(this.props),
    active: true,
  };

  /**
   * Component will mount. Start the animation layout in Android
   * @returns {void}
   */
  componentWillMount(): void {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  /**
   * Component did mount. Execute initial functions for animations.
   * @returns {void}
   */
  componentDidMount(): void {
    this.beat();
    this.restartAnimation();
  }

  restartAnimation = (): void => {
    const self = this;
    self.state.circleProgress.stopAnimation();
    self.state.circleProgressX2.stopAnimation();

    Animated.timing(self.state.circleProgress, {
      toValue: 0,
      duration: self.state.text * 1000,
      easing: Easing.linear,
      useNativeDriver: false, // Set to true or false explicitly
    }).start();

    Animated.timing(self.state.circleProgressX2, {
      toValue: 0,
      duration: (self.state.text * 1000) * 2,
      easing: Easing.linear,
      useNativeDriver: false, // Set to true or false explicitly
    }).start();
  }

  toogleAnimation(): void {
    this.setState({ active: !this.state.active }, () => {
      const { active, bounceValue } = this.state;
      const { minScale, onResume } = this.props;
      if (active) {
        if (parseFloat(JSON.stringify(bounceValue)) === minScale) {
          this.beat();
          onResume();
        }
      }
    });
  }

  beat(): void {
    if (this.state.active) {
      Animated.sequence([
        Animated.timing(
          this.state.bounceValue,
          {
            duration: 272.5,
            toValue: this.props.maxScale,
            useNativeDriver: false, // Set to true or false explicitly
          },
        ),
        Animated.timing(
          this.state.bounceValue,
          {
            duration: 272.5,
            toValue: this.props.minScale,
            useNativeDriver: false, // Set to true or false explicitly
          },
        ),
      ]).start(() => {
        this.state.bounceValue.stopAnimation();
        if (this.state.active) {
          this.beat();
        } else {
          this.props.onPause.call(this);
        }
      });
    }
  }

  renderCircle({ rotate }: any): any {
    const { radius } = this.props;

    return (
      <View
        style={[
          styles.leftWrap,
          {
            left: radius,
            width: radius,
            height: radius * 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              left: -radius,
              width: radius,
              height: radius * 2,
              transform: [
              { translateX: radius / 2 },
              { rotate },
              { translateX: -radius / 2 },
              ],
            },
          ]}
        >
          {
            (Platform.OS === 'ios')
            ? (
              <View style={{
                
               
                height: radius / 5,
                left: radius - (radius / 16),
                top: 0 - (radius / 16),
                width: radius / 5,
              }}
              />
            )
            : null
          }
        </Animated.View>
      </View>
    );
  }

  renderHalfCircle({ rotate, backgroundColor }: any): any {
    const { radius } = this.props;

    return (
      <View
        style={[
          styles.leftWrap,
          {
            left: radius,
            width: radius,
            height: radius * 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.halfCircle,
            {
              left: -radius,
              width: radius,
              height: radius * 2,
              borderRadius: radius,
  
              transform: [
              { translateX: radius / 2 },
              { rotate },
              { translateX: -radius / 2 },
              ],
            },
          ]}
        />
      </View>
    );
  }

  renderInnerCircle(): any {
    const radiusMinusBorder = this.props.radius - this.props.borderWidth;
    return (
      <View
        style={[
        
          {
            width: 100 ,
            height: 40 ,
            borderRadius: radiusMinusBorder,
            borderWidth:1,
            borderColor:"#fed93a",
            
            alignItems:"center",
            justifyContent:"center"

          },
        ]}
      >
        <TextTimeComponent
          textStyle={this.props.textStyle}
          subTextStyle={this.props.subTextStyle}
          seconds={this.props.seconds}
          startAt={this.props.startAt}
          onTimeElapsed={this.props.onTimeElapsed}
          active={this.state.active}
          isPausable={this.props.isPausable}
          reverseCount={this.props.reverseCount}
        />
      </View>
    );
  }

  render(): any {
    const {
      interpolationValuesHalfCircle1,
      interpolationValuesHalfCircle2,
      interpolationValuesCircleRotate,
      // w1Anim,
      // h1Anim,
      // w2Anim,
      // h2Anim,
      bounceValue,
      timerScale,
    } = this.state;
    const innerRadius = this.props.radius * 2;
    const middleRadius = innerRadius + 30;
    const outerRadius = middleRadius + 30;

    return (
      // Beater animation
      <Animated.View
        style={{
          width: outerRadius,
          height: outerRadius,
          
        }}
      >
      
        <TouchableOpacity
          style={[
      
            {
              position: 'absolute',
         
              top: 15,
              width: innerRadius,
              height: innerRadius,
             
            
             
            },
          ]}
          onPress={() => this.toogleAnimation()}
        >
          
       
          {this.renderInnerCircle()}
        
        </TouchableOpacity>
      </Animated.View>
    );
  }
}