import React from "react";
import { SimpleAnimation } from "react-native-simple-animations";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  TextInput,
  StyleSheet,
  Text,
  Image
} from "react-native";
import DatePicker from "react-native-datepicker";
import LottieView from "lottie-react-native";
import imagePicker from "react-native-imagepicker";
import moment from "moment";

//const colors = ["#DB6F5E", "#95687C", "#987F8A", "#C78766", "#E5B041"];
const colors = ["#ffffff"];

export default class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      text: "",
      what: "What is it?",
      why: "Why?",
      step: 0,
      data: null,
      date: "2019-08-29",
      dateUnFiltered: "",
      photo: null
    };
  }

  componentDidMount() {
    let d = new Date();
    const date =
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2);
    this.setState({ date: date });
    this.setState({ dateUnFiltered: date });
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

  _storePhoto = async () => {
    imagePicker
      .open({
        takePhoto: true,
        chooseFromLibrary: true
      })
      .then(
        ({ uri, width, height }) => {
          console.log("image asset", uri, width, height);
          this.setState({ photo: uri, step: 4 });
          //alert(uri);
        },
        error => {
          // Typically, user cancel
          console.log("error", error);
        }
      );
  };

  _storeData = async () => {
    let value = null;
    let start = moment(this.state.dateUnFiltered);
    let end = moment(this.state.date);
    const newDate = end.diff(start, "days");
    let str = this.state.date.charAt(this.state.date.length - 1);
    console.log(str, 'this is str')
    str = parseInt(str);
    str = (str + 1).toString();
    let newDateStr = this.state.date.replace(/.$/,`${str}`)
    console.log(newDateStr, ' new date str ');
    console.log(this.state.date, ' state date')
    console.log(moment(this.state.date), 'this is moment date')
    //this.setState({ date :})

    if (this.state.data !== null) {
      value = JSON.parse(this.state.data);
      const newItem = {
        id : value.length,
        when: this.state.date,
        what: this.state.what,
        why: this.state.why,
        photo: this.state.photo,
        date: this.state.date,
        dateUnFiltered: newDate,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      value.push(newItem);
    } else {
      // If localStorage is empty
      value = [];
      const newItem = {
        id : 0,
        when: this.state.date,
        what: this.state.what,
        why: this.state.why,
        photo: this.state.photo,
        date: this.state.date,
        dateUnFiltered: newDate,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      value.push(newItem);
    }
    try {
      await AsyncStorage.setItem("Items", JSON.stringify(value));
      this.props.sendData("vlue");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    if (this.state.step === 0) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={600} fade staticType="zoom">
              <Text style={styles.firstText}>What Date?</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                minDate={this.state.dateUnFiltered}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: "32%",
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: 20
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ date: date, step: 1 });
                }}
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
              <Text style={styles.firstText}>What Date?</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                minDate={this.state.dateUnFiltered}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: "32%",
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: 20
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ date: date, step: 1 });
                }}
              />
              <SimpleAnimation
                delay={300}
                duration={1000}
                distance={100}
                direction={"down"}
                movementType={"slide"}
              >
                <Text style={styles.text}>What is it?</Text>
                <TextInput
                  style={{ textAlign: "center" }}
                  onChangeText={what => this.setState({ what })}
                  placeholder="Write here.."
                  //value={this.state.what}
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
              <Text style={styles.firstText}>What Date?</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                minDate={this.state.dateUnFiltered}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: "32%",
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: 20
                  }
                }}
                onDateChange={date => {
                  this.setState({ date: date, step: 1 });
                }}
              />
              <Text style={styles.text}>What is it?</Text>
              <TextInput
                style={{ textAlign: "center" }}
                onChangeText={what => this.setState({ what })}
                placeholder="Write here.."
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
                <Text style={styles.text}>Why?</Text>
                <TextInput
                  style={{ textAlign: "center" }}
                  onChangeText={why => this.setState({ why })}
                  placeholder="Write here.."
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
              <Text style={styles.firstText}>What Date?</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={this.state.dateUnFiltered}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: "32%",
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: 20
                  }
                }}
                onDateChange={date => {
                  this.setState({ date: date, step: 1 });
                }}
              />
              <Text style={styles.text}>What is it?</Text>
              <TextInput
                style={{ textAlign: "center" }}
                onChangeText={what => this.setState({ what })}
                placeholder="Write here.."
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
              <Text style={styles.text}>Why?</Text>
              <TextInput
                style={{ textAlign: "center" }}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />

              <SimpleAnimation
                delay={300}
                duration={1000}
                distance={100}
                direction={"down"}
                movementType={"slide"}
              >
                <TouchableOpacity
                  onPress={this._storePhoto}
                  style={styles.myButton2}
                >
                  <Image
                    source={require("./animations/uploadImage.png")}
                    style={{
                      width: 80,
                      overflow: "hidden",
                      height: 80
                    }}
                  />
                </TouchableOpacity>
              </SimpleAnimation>
            </SimpleAnimation>
          </View>
        </View>
      );
    }
    if (this.state.step === 4) {
      return (
        <View style={styles.makeThing}>
          <View style={styles.container2}>
            <SimpleAnimation delay={200} duration={500} fade staticType="zoom">
              <Text style={styles.firstText}>What Date?</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={this.state.dateUnFiltered}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: "32%",
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginLeft: 20
                  }
                }}
                onDateChange={date => {
                  this.setState({ date: date, step: 1 });
                }}
              />
              <Text style={styles.text}>What is it?</Text>
              <TextInput
                style={{ textAlign: "center" }}
                onChangeText={what => this.setState({ what })}
                placeholder="Write here.."
                value={this.state.what}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 2 })}
              />
              <Text style={styles.text}>Why?</Text>
              <TextInput
                style={{ textAlign: "center" }}
                onChangeText={why => this.setState({ why })}
                value={this.state.why}
                returnKeyType="done"
                onSubmitEditing={event => this.setState({ step: 3 })}
              />
              <TouchableOpacity
                onPress={this._storePhoto}
                style={styles.myButton2}
              >
                <Image
                  source={require("./animations/uploadImage.png")}
                  style={{
                    width: 80,
                    overflow: "hidden",
                    height: 80
                  }}
                />
              </TouchableOpacity>

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
                >
                  <LottieView
                    source={require("./animations/animation.json")}
                    autoPlay
                    loop={false}
                  />
                </TouchableOpacity>
              </SimpleAnimation>
            </SimpleAnimation>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center"
  },
  makeThing: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    marginTop: "10%"
  },
  myButton2: {
    alignItems: "center",
    marginTop: 40,
    marginLeft: "38%",
    height: 80,
    width: 80,
    borderRadius: 400
  },
  myButton3: {
    marginLeft: "38%",
    marginTop: 40,
    height: 80,
    width: 80,
    borderRadius: 400
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    height: 40,
    fontSize: 30,
    color: "gray"
  },
  firstText: {
    textAlign: "center",
    alignItems: "center",
    height: 40,
    fontSize: 30,
    marginTop: "20%",
    color: "gray"
  },
  datePickerStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
