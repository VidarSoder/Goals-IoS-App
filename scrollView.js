import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import LottieView from "lottie-react-native";
import ProgressCircle from "react-native-progress-circle";
import moment from "moment";

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
      <SimpleAnimation
        style={styles.container}
        delay={200}
        duration={500}
        fade
        staticType="zoom"
      >
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
            let dateTime = new Date(item.date);
            let start = moment();
            let end = moment(dateTime);
            let newDate = end.diff(start);
            newDate = ((newDate / 1000) / 60 / 60 / 24)
            console.log(start, "start")
            console.log(end, 'end', ' ')
            console.log(item.dateUnFiltered, "un filted")
            console.log(Math.ceil(newDate), "new dates")
            console.log('___')
            const diff = item.dateUnFiltered - Math.ceil(newDate);
            const datePercent = Math.round((diff / item.dateUnFiltered) * 100);

            return (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  width: screenWidth,
                  height: 400,
                  backgroundColor: "white"
                }}
                key={item.id}
              >
                <View
                  style={{
                    width: screenWidth - 60,
                    marginLeft: 30,
                    height: 400,
                    backgroundColor: "#faedc8",
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
                  <View
                    style={{
                      overflow: "hidden",
                      borderTopRightRadius: 40,
                      borderTopLeftRadius: 40
                    }}
                  >
                    <Image
                      source={{ uri: item.photo, isStatic: true }}
                      style={{
                        width: screenWidth - 60,
                        overflow: "hidden",
                        height: 250
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: screenWidth - 170,
                        right: 0,
                        bottom: 140,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <ProgressCircle
                        percent={datePercent}
                        radius={50}
                        borderWidth={8}
                        color="red"
                        shadowColor="#999"
                        bgColor="yellow"
                      >
                        <Text style={{ fontSize: 18 }}> {Math.ceil(newDate)} days </Text>
                      </ProgressCircle>
                    </View>
                  </View>

                  <Text style={styles.textStyle2}>{item.what}</Text>
                  <Text style={styles.textStyle3}>{item.why}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View>
          <TouchableOpacity onPress={buttonClick} style={styles.myButton}>
            <LottieView
              source={require("./animations/addItemBasket.json")}
              autoPlay
              loop={false}
            />
          </TouchableOpacity>
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
    backgroundColor: "#ff9c9c",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
    height: 40
  },
  textStyle2: {
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,

    height: 40
  },
  textStyle3: {
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "left",
    maxHeight: "25%",
    fontSize: 20,
    color: "gray"
  }
});
