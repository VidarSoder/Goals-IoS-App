import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import HorScroll from "./scrollView";
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
  Keyboard,
  TextInput
} from "react-native";
//import { Button } from "native-base";
//import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      data: "OwO"
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
      alert(error)
    }
  };
  componentDidMount() {
    this._retrieveData();
  }

  getData(val) {
    this.setState({ isVisible: false });
  }

  render() {
    let screenWidth = Dimensions.get("window").width;
    const arr = this.state.data;
    return (
      <View style={styles.container}>
        {this.state.isVisible ? (
          <SimpleAnimation delay={100} duration={300} fade staticType="zoom">
            <DetailsScreen sendData={this.getData} />
            <View>
              <TouchableOpacity
                onPress={this.newNote}
                style={styles.myButton2}
              ></TouchableOpacity>
            </View>
          </SimpleAnimation>
        ) : (
          <View style={styles.container}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              decelerationRate={0}
              snapToInterval={screenWidth}
              snapToAlignment={"center"}
              contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 90,
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
                    backgroundColor: "powderblue",
                    borderRadius: "40px"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                    {arr[0].why}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                   {arr[1].why}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                    {arr[1].why}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 90,
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
                    backgroundColor: "powderblue",
                    borderRadius: "40px"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                   asdf
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                   asdf
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 40,
                      height: 40,
                      fontSize: "25%"
                    }}
                  >
                    asdf
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </ScrollView>
            <View>
              <TouchableOpacity
                onPress={this.newNote}
                style={styles.myButton}
              ></TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      text: "What Date?",
      what: "What is it?",
      why: "Why?",
      step: 0,
      data: null
    };
  }

  componentDidMount() {
    this._retrieveData();
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Items");
      if (value !== null) {
        this.setState({ data: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    // alert('Keyboard Hidden');
  }

  _storeData = async () => {
    let value = null;
    if (this.state.data !== null) {
      value = JSON.parse(this.state.data);
      alert(this.state.data)
      const newItem = {
        when: this.state.text,
        what: this.state.what,
        why: this.state.why
      };
      value.push(newItem);
    } else {
      value = [];
      const newItem = {
        when: this.state.text,
        what: this.state.what,
        why: this.state.why
      };
      value.push(newItem);
    }
    try {
      await AsyncStorage.setItem("Items", JSON.stringify(value));
      this.props.sendData("value");
    } catch (error) {
      //alert(error)
      // Error saving data
    }
  };

  render() {
    if (this.state.step === 0) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <TextInput
                style={{ height: 40, fontSize: "25%" }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
            </SimpleAnimation>
          </View>
        </View>
      );
    }
    if (this.state.step === 1) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <TextInput
                style={{ height: 40, fontSize: "25%" }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <TextInput
                style={{ marginTop: 40, height: 40, fontSize: "25%" }}
                onChangeText={what => this.setState({ what })}
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
            </SimpleAnimation>
          </View>
        </View>
      );
    }
    if (this.state.step === 2) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <TextInput
                style={{ height: 40, fontSize: "25%" }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <TextInput
                style={{ marginTop: 40, height: 40, fontSize: "25%" }}
                onChangeText={what => this.setState({ what })}
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
              <TextInput
                style={{ marginTop: 40, height: 40, fontSize: "25%" }}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />
            </SimpleAnimation>
          </View>
        </View>
      );
    }
    if (this.state.step === 3) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <TextInput
                style={{ height: 40, fontSize: "25%" }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <TextInput
                style={{ marginTop: 40, height: 40, fontSize: "25%" }}
                onChangeText={what => this.setState({ what })}
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
              <TextInput
                style={{ marginTop: 40, height: 40, fontSize: "25%" }}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />
            </SimpleAnimation>
          </View>
          <TouchableOpacity
            onPress={this._storeData}
            style={styles.myButton3}
          ></TouchableOpacity>
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
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    marginTop: 30
  },
  makeThing: {
    fontFamily: "'Roboto', sans-serif",
    marginTop: 90,
    width: 300,
    height: 400,
    backgroundColor: "#edfcfa",
    borderRadius: "40px"
  },
  myButton: {
    marginBottom: 30,
    padding: 5,
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
    backgroundColor: "#e2fadc",
    marginLeft: 120
  },
  myButton3: {
    marginBottom: 30,
    padding: 5,
    height: 80,
    width: 80,
    borderRadius: 400,
    backgroundColor: "green",
    marginLeft: 120
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  },
  {
    mode: "modal"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
