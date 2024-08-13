import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function PinchableImage({ imageURL }) {
  const scale = useSharedValue(1);
  const lastScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = lastScale.value * event.scale;
    })
    .onEnd(() => {
      //scale.value = withTiming(1, { duration: 200 });
      lastScale.value = scale.value; // Preserve the zoomed state
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={styles.imageContainer}>
        <Animated.Image
          source={{ uri: imageURL }}
          style={[styles.imageWork, animatedStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWork: {
    width: "100%",
    height: "100%",
  },
});
