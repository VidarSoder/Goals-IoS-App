import React, { useState } from "react";
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
  let [remove, setRemove] = useState([]);
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

  const editMenu = id => {
    const proper = arr.find(item => item.id == id);
    props.itemArr[id].editActive = "active";
    console.log(props.itemArr[0]);
    props.updateItem("value");
  };

  const arr = props.itemArr;
  //console.log(arr)
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
            newDate = newDate / 1000 / 60 / 60 / 24;
            /*             console.log(newDate,'this is new date')
            console.log(item.date)
            console.log(dateTime, 'todays date') */
            const diff = item.dateUnFiltered - Math.ceil(newDate);
            const datePercent = Math.round((diff / item.dateUnFiltered) * 100);
            /* if (item.editActive !== 'active'){ */
            console.log("active item", item.editActive);
            /*             if (item.editActive !== 'active'){

              } */
            return (
              <TouchableOpacity
                onPress={() => editMenu(item.id)}
                style={{
                  marginTop: 20,
                  width: screenWidth,
                  height: 400,
                  backgroundColor: "white"
                }}
                key={item.id}
              >
                <View
                  style={
                    item.editActive !== "active"
                      ? {
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
                        }
                      : {
                          width: screenWidth - 60,
                          marginLeft: 30,
                          height: 400,
                          backgroundColor: "grey",
                          borderRadius: "40px",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 1,
                            height: 1
                          },
                          shadowOpacity: 0.5,
                          shadowRadius: 10,

                          elevation: 19
                        }
                  }
                >
                  <View
                    style={{
                      overflow: "hidden",
                      borderTopRightRadius: 40,
                      borderTopLeftRadius: 40
                    }}
                  >
                    {item.editActive !== "active" && (
                      <TouchableOpacity
                      >
                        <LottieView
                          source={require("./animations/animation.json")}
                          autoPlay
                          loop={false}
                        />
                      </TouchableOpacity>
                    )}
                    <Image
                      source={{ uri: item.photo, isStatic: true }}
                      style={{
                        width: screenWidth - 60,
                        overflow: "hidden",
                        height: 250
                      }}
                      blurRadius={item.editActive !== "active" ? 1 : 60}
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
                      {item.editActive !== "active" && (
                        <ProgressCircle
                          percent={datePercent}
                          radius={50}
                          borderWidth={8}
                          color="red"
                          shadowColor="#999"
                          bgColor="yellow"
                        >
                          <Text style={{ fontSize: 18 }}>
                            {" "}
                            {Math.ceil(newDate)} days{" "}
                          </Text>
                        </ProgressCircle>
                      )}
                    </View>
                  </View>

                  <Text
                    style={
                      item.editActive !== "active"
                        ? styles.textStyle2
                        : styles.textStyle22
                    }
                  >
                    {item.what}
                  </Text>
                  <Text
                    style={
                      item.editActive !== "active"
                        ? styles.textStyle3
                        : styles.textStyle33
                    }
                  >
                    {item.why}
                  </Text>
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
  },
  textStyle22: {
    display: "none"
  },
  textStyle33: {
    display: "none"
  }
});
