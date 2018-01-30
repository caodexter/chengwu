
import { StackNavigator } from 'react-navigation'
import welcome from '../welcome/welcome'
import home from '../home/home'
import good from '../home/good'
import model from '../model/model'
import mirror from '../mirror/mirror'
import favorite from '../favorite/favorite'
import me from '../me/me'
import login from '../me/login'
import detail from '../model/detail'
import {
    View, ActivityIndicator, StyleSheet, Image
} from 'react-native';



const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0000FF'
    }
});


const PrimaryNav = StackNavigator({

    welcome: { screen: welcome },
    home: { screen: home },
    good: { screen: good },
    model: { screen: model },
    mirror: { screen: mirror },
    favorite: { screen: favorite },
    me: { screen: me },
    login: { screen: login },
    detail: { screen: detail },
}, 
{
        // Default config for all screens
        headerMode: 'screen',
        initialRouteName: 'welcome',
        navigationOptions: {
            headerStyle: styles.header,
            
        }
    })




export default PrimaryNav