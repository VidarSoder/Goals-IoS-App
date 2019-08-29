import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import { createStackNavigator, createAppContainer } from "react-navigation";
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

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      data: null
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
   // AsyncStorage.clear();

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
    alert("works");
  };

  render() {
    let screenWidth = Dimensions.get("window").width;
    const arr = this.state.data;
    if (arr) {
      return (
        <View style={styles.container}>
          {this.state.isVisible ? (
            <SimpleAnimation delay={100} duration={100} fade staticType="zoom">
              <AddItem sendData={this.getData} />
              <View>
                <TouchableOpacity
                  onPress={this.newNote}
                  style={styles.myButton2}
                ></TouchableOpacity>
              </View>
            </SimpleAnimation>
          ) : (

            <AllItemsScroll
              itemArr={arr}
              screenWidth={screenWidth}
              sendData={this.newNote}
            />
          )}
        </View>
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
              backgroundColor: "Blue",
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

export default class App extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
