import React, { Component } from 'react';
import {
    appRegistry,
    ScrollView,
    Text, View,
    Dimensions 
} from 'react-native'

export default class scrollView extends Component {
    render()  {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        return (
            <ScrollView horizontal={true}
            >
                <View style={{
                    backgroundColor: 'red',
                    flex: 1,
                    marginTop: 20,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>
                        xD 
                    </Text>
                </View>
                <View style={{
                    backgroundColor: 'red',
                    flex: 1,
                    marginTop: 20,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>
                        xDer4tsdfg 
                    </Text>
                </View>
            </ScrollView>
        )
     }
}