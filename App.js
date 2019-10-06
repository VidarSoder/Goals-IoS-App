import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableHighlight
} from "react-native";
import AllItemsScroll from "./scrollView";
import AddItem from "./addItem";
import LottieView from "lottie-react-native";
import moment from 'moment'
//import imagePicker from "react-native-imagepicker";
//import ImagePicker from 'react-native-image-picker';
//const imagePicker = require('react-native-imagepicker');

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      photo: "https://facebook.github.io/react-native/img/tiny_logo.png",
      update: 0,
    };
    this.getData = this.getData.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  newNote = () => {
    if (this.state.isVisisble) {
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  };

  _retrieveData = async () => {
    //AsyncStorage.clear();

    try {
      const value = await AsyncStorage.getItem("Items");
      if (value !== null) {
        this.setState({ data: JSON.parse(value) });
      }
    } catch (error) {
      alert(error);
    }
  };
  componentDidMount() {
    this._retrieveData();
  }

  getData(val) {
    this._retrieveData();
    this.setState({ isVisible: false });
  }

  onClick = () => {
    this.setState({ update: this.update + 1 });
  };

  render() {
    let screenWidth = Dimensions.get("window").width;
    const arr = this.state.data;
    console.log(arr);
    let uri = this.state.photo;
    if (arr && this.state.isVisible) {
      return (
        <SimpleAnimation delay={200} duration={1000} fade staticType="zoom">
          <AddItem sendData={this.getData} />
        </SimpleAnimation>
      );
    } else if (arr && !this.state.isVisible) {
      return (
        <>
          <Image source={require("./logo.png")} style={styles.logo} />
          <View style={styles.container}>
            <AllItemsScroll
              itemArr={arr}
              screenWidth={screenWidth}
              sendData={this.newNote}
              updateItem={this.onClick}
            />
          </View>
        </>
      );
    } else if (this.state.isVisible === true) {
      return (
        <View style={styles.container}>
          <SimpleAnimation delay={100} duration={300} fade staticType="zoom">
            <AddItem sendData={this.getData} />
            <View>
              <TouchableOpacity
                onPress={this.newNote}
                style={styles.myButton2}
              ></TouchableOpacity>
            </View>
          </SimpleAnimation>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              width: screenWidth - 60,
              height: 400,
              backgroundColor: "green",
              borderRadius: "40px",
              borderStyle: "dotted"
            }}
          ></TouchableOpacity>

          <View>
            <TouchableOpacity
              onPress={this.newNote}
              style={styles.myButton}
            ></TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

let screenWidth = Dimensions.get("window").width;

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
  myButton2: {
    marginBottom: 30,
    padding: 5,
    height: 80,
    width: 80,
    borderRadius: 400,
    marginLeft: 120
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    marginTop: 40,
    height: 40
  },
  textStyle2: {
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "'Roboto', sans-serif",
    marginTop: 150,
    height: 40
  },
  textStyle3: {
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "left",
    fontFamily: "'Roboto', sans-serif",
    height: 80,

    color: "gray"
  },
  logo: {
    position: "absolute",
    alignItems: "top",
    justifyContent: "center",
    width: screenWidth - 120,
    height: 65,
    top: "6%",
    left: "5%",
    zIndex: 2
  }
});

export default class App extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
