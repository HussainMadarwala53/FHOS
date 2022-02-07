import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import db from '../config';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHospitals: [],
      searchText: '',
    };
  }
  componentDidMount = async () => {
    this.getHospitals();
    console.log(db['hospitals']);
  };

  getHospitals = () => {
    db.collection('hospitals')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            allHospitals: [...this.state.allHospitals, doc.data()],
          });
        });
      });
  };

  handleSearch = async (text) => {
    var enteredText = text.toUpperCase().split('');
    text = text.toUpperCase();
    this.setState({
      allHospitals: [],
    });
    if (!text) {
      this.getHospitals();
    }
  };

  render() {
    const { searchText, allHospitals } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ searchText: text })}
              placeholder={'Type here'}
              placeholderTextColor={'#FFFFFF'}
            />
            <TouchableOpacity
              style={styles.scanbutton}
              onPress={() => this.handleSearch(searchText)}>
              <Text style={styles.scanbuttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            data={allHospitals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, key }) => {
              // console.log(item);
              return (
                <View>
                  <Text>{item.hospitalName}</Text>
                  <Text>{item.phoneNumber}</Text>
                   <Text>{item.address}</Text>
                   ----------------------------
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5653D4',
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#9DFD24',
    borderColor: '#FFFFFF',
  },
  textinput: {
    width: '57%',
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#5653D4',
    fontFamily: 'Rajdhani_600SemiBold',
    color: '#FFFFFF',
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#9DFD24',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanbuttonText: {
    fontSize: 24,
    color: '#0A0101',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
  },
});
