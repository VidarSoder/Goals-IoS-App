import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight
} from "react-native";

export default function scrollView (props) {
    let screenWidth = props.screenWidth;
    //const [count, setCount] = useState(0);
    const buttonClick = () => {
        props.sendData("value");
    }

    const showInfoScreen = () => {

        alert('clicked')

    }
const arr = props.itemArr;
    return (
<View style={styles.container}>
<TouchableHighlight
  style={{
    alignSelf: "flex-end",
    marginTop: 50,
    marginRight: 20
  }}
  onPress={() => showInfoScreen()}
>
  <Image
    style={{ width: 50, height: 50 }}
    source={require("./questionMark.png")}
    o
  />
</TouchableHighlight>
<ScrollView
  automaticallyAdjustContentInsets={false}
  horizontal={true}
  decelerationRate={0}
  snapToInterval={screenWidth}
  snapToAlignment={"center"}
  contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
>
  {arr.map(item => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: screenWidth,
          height: 400,
          backgroundColor: "white"
        }}
      >
        <TouchableOpacity
          style={{
            width: screenWidth - 60,
            marginLeft: 30,
            height: 400,
            backgroundColor: item.color,
            borderRadius: "40px"
          }}
        >
          <Text style={styles.textStyle}>{item.when}</Text>
          <Text style={styles.textStyle2}>{item.what}</Text>
          <Text style={styles.textStyle3}>{item.why}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  })}
</ScrollView>
<View>
  <TouchableOpacity
    onPress={buttonClick}
    style={styles.myButton}
  ></TouchableOpacity>
</View>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    myButton: {
      marginBottom: 30,
      height: 80,
      width: 80,
      borderRadius: 400,
      backgroundColor: "red"
    },
    textStyle: {
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
      marginTop: 40,
      height: 40,
      fontSize: "25%"
    },
    textStyle2: {
      paddingLeft: 10,
      fontWeight: "bold",
      textAlign: "left",
      fontFamily: "'Roboto', sans-serif",
      marginTop: 150,
      height: 40,
      fontSize: "25%"
    },
    textStyle3: {
      paddingLeft: 10,
      textAlign: "left",
      fontFamily: "'Roboto', sans-serif",
      height: 40,
      fontSize: "25%",
      color: "gray"
    }
  });