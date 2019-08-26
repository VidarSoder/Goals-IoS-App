import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './homeScreen'

const appNavigator = createStackNavigator({
    Home : {screen : HomeScreen}
})

export default createAppContainer(appNavigator);