import { NavigationActions, StackActions } from 'react-navigation';

let _routeNavigator;

/**
 * Sets the top level navigator.
 * Should be called only at top level routeNavigator ref
 */
export const setupNavigator = navRef => {
  _routeNavigator = navRef;
};

const getCurrentRoute = (field = 'routeName') => {
  if (!_routeNavigator) return null;

  const findCurrentRoute = navState => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index]);
    }
    return navState[field];
  };

  return findCurrentRoute(_routeNavigator.state.nav);
};

const navigate = (routeName, params = {}) => {
  if (_routeNavigator) {
    console.log('> Navigate to:', routeName, params);
    _routeNavigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }
};

const resetToHome = () => {
  if (_routeNavigator) {
    _routeNavigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      })
    );
  }
};

const resetStack = () => {
  if (_routeNavigator) {
    resetToHome();
    _routeNavigator.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
  }
};

const replaceCurrentWith = (routeName, params = {}) => {
  if (_routeNavigator) {
    _routeNavigator.dispatch(
      StackActions.replace({
        key: getCurrentRoute('key'),
        routeName,
        params,
      })
    );
  }
};

const currentRouteIs = routeName => getCurrentRoute() === routeName;

const back = () => {
  if (_routeNavigator) {
    _routeNavigator.dispatch(NavigationActions.back());
  }
};

export default {
  navigate,
  back,
  resetStack,
  resetToHome,
  replaceCurrentWith,
  getCurrentRoute,
  currentRouteIs,
};
