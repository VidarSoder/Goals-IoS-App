import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import HorScroll from "./scrollView";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  TextInput,
  StyleSheet,
  DatePickerIOS
} from "react-native";

export default class DetailsScreen extends React.Component {
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

  _storeData = async () => {
    let value = null;
    if (this.state.data !== null) {
      value = JSON.parse(this.state.data);
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
      alert(error);
    }
  };

  render() {
    if (this.state.step === 0) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <TextInput
                style={styles.firstText}
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
                style={styles.firstText}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <SimpleAnimation
                delay={300}
                duration={1000}
                distance={100}
                direction={"down"}
                movementType={"slide"}
              >
                <TextInput
                  style={styles.text}
                  onChangeText={what => this.setState({ what })}
                  value={this.state.what}
                  returnKeyType="done"
                  onSubmitEditing={event => this.setState({ step: 2 })}
                />
              </SimpleAnimation>
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
                style={styles.firstText}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <TextInput
                style={styles.text}
                onChangeText={what => this.setState({ what })}
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
                          <SimpleAnimation
                delay={300}
                duration={1000}
                distance={100}
                direction={"down"}
                movementType={"slide"}
              >
              <TextInput
                style={styles.text}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />
              </SimpleAnimation>
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
                style={styles.firstText}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 1 })}
              />
              <TextInput
                style={styles.text}
                onChangeText={what => this.setState({ what })}
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
              <TextInput
                style={styles.text}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />
            </SimpleAnimation>
          </View>
          <SimpleAnimation
                delay={300}
                duration={1000}
                distance={100}
                direction={"down"}
                movementType={"slide"}
              >
          <TouchableOpacity
            onPress={this._storeData}
            style={styles.myButton3}
          ></TouchableOpacity>
          </SimpleAnimation>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    marginTop: 30
  },
  makeThing: {
    flex: 1,
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif",
    marginTop: 90,
    width: 300,
    height: 400,
    backgroundColor: "#edfcfa",
    borderRadius: "40px",
  },
  myButton3: {
    marginBottom: 90,
    height: 80,
    width: 80,
    borderRadius: 400,
    backgroundColor: "green",
  },
  text: {
    textAlign: 'center',
    marginTop: 40,
    height: 40,
    fontSize: "25%"
  },
  firstText: {
    textAlign: 'center',
    alignItems: "center",
    height: 40,
    fontSize: "25%"
  }
});
