import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

//  Styles
import styles from './styles';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {children} = this.props;

    return <View style={styles.layout}>{children}</View>;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
