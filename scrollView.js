import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import ProgressCircle from "react-native-progress-circle";

//import { ProgressCircle }  from 'react-native-svg-charts'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert
} from "react-native";

export default function scrollView(props) {
  let screenWidth = props.screenWidth;
  //const [count, setCount] = useState(0);
  const buttonClick = () => {
    props.sendData("value");
  };

  const showInfoScreen = () => {
    Alert.alert(
      "Konsumtions karantären",
      `
    1. Påbörja en ny karantän.
    2. Beskriv det du skulle vilja konsumera.
    3. Välj ett slutdatum.
    4. När karaktären är över: överväg om du fortfarande känner samma sak och köp det, begagnat om det går
    
         Lycka till! /Q`
    );
  };
  const arr = props.itemArr;
  return (
    <View style={styles.container}>
      <SimpleAnimation style={styles.container} delay={200} duration={500} fade staticType="zoom">
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
                <View
                  style={{
                    width: screenWidth - 60,
                    marginLeft: 30,
                    height: 400,
                    backgroundColor: item.color,
                    borderRadius: "40px",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 1,
                      height: 1
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,

                    elevation: 19
                  }}
                >
                  {/*            <ProgressCircle
                  percent={50}
                  radius={70}
                  borderWidth={8}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor={item.color}
                >
                  <Text style={{ fontSize: 18 }}> 30% </Text>
                </ProgressCircle> */}
                  <Text style={styles.textStyle}>{item.when}</Text>
                  <Text style={styles.textStyle2}>{item.what}</Text>
                  <Text style={styles.textStyle3}>{item.why}</Text>
                </View>
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
      </SimpleAnimation>
    </View>
  );
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
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    marginTop: 40,
    height: 40,
    fontSize: "25%"
  },
  textStyle2: {
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "'Roboto', sans-serif",
    marginTop: 150,
    height: 40,
    fontSize: "25%"
  },
  textStyle3: {
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "left",
    fontFamily: "'Roboto', sans-serif",
    height: 40,
    fontSize: "25%",
    color: "gray"
  }
});
