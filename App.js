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
  AsyncStorage
} from "react-native";
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
  

            <View style={styles.container}>
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
                        <Text style={styles.textStyle}>{item.when}</Text>
                        <Text style={styles.textStyle}>{item.what}</Text>
                        <Text style={styles.textStyle}>{item.why}</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
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
    } else if (this.state.isVisible === true){
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
      )
    } 
    
    
    else {
      return (
        <View style={styles.container}>

                      <TouchableOpacity
                        style={{
                          width: screenWidth - 60,
                          height: 400,
                          backgroundColor: 'Blue',
                          borderRadius: "40px",
                          borderStyle: "dotted",
                        }}
                      ></TouchableOpacity>

                      <View>
                <TouchableOpacity
                  onPress={this.newNote}
                  style={styles.myButton}
                ></TouchableOpacity>
              </View>
        </View>);
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
    marginLeft: 120
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    marginTop: 40,
    height: 40,
    fontSize: "25%"
  }
});

export default class App extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
