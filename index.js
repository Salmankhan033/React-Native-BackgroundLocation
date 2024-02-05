/**
 * @format
 */

import {AppRegistry} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import App from './App';
import {name as appName} from './app.json';

ReactNativeForegroundService.register();

AppRegistry.registerComponent(appName, () => App);
