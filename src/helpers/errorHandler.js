import React from 'react';
import { Alert } from 'react-native';

// export default function withError(component) {
//   return class ComponentWithError extends Component {
//     render() {
//       const { error } = this.props;
//       if (error) {
//         Alert.alert('Ada Error Lho');
//       }
//       return <component {...this.props} />;
//     }
//   };
// }

export default function withError(component) {
  return (props) => {
    const { error } = props; // eslint-disable-line react/prop-types
    console.log(props);
    if (error) {
      Alert.alert(error.tag, error.message);
    }
    return React.createElement(component, props, null);
  };
}
