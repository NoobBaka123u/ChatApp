import analytics, {firebase} from '@react-native-firebase/analytics';

class Analytics {
  static init() {
    if (firebase.utils.isRunningInTestLab) {
      analytics().setAnalyticsCollectionEnabled(false);
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
    }
  }

  static onLogin = async userObject => {
    console.log('login');
    const {id, email} = userObject;
    await Promise.all([
      analytics().setUserId(id),
      analytics().setUserProperty('email', email),
      this.logEvent('sign_in'),
    ]);
  };

  static onRegister = async userObject => {
    const {id, email} = userObject;
    await Promise.all([
      analytics().setUserId(id),
      analytics().setUserProperty('email', email),
      analytics().setUserProperty('created_at', new Date()),
      this.logEvent('sign_up'),
    ]);
  };

  static setCurrentScreen = async screenName => {
    await analytics().setCurrentScreen(screenName, screenName);
  };

  static logEvent = async (eventName, propertyObject = {}) => {
    await analytics().logEvent(eventName, propertyObject);
  };

  static onLogout = async () => {
    await analytics().resetAnalyticsData();
  };
}

export default Analytics;
