/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const ErrorScreen = ({resetErrorBoundary}: any) => {
  return (
    <View style={styles.screen}>
      <Text style={{fontSize: 15, marginBottom: 5}}>Unexpected Error</Text>
      <Text>Oops, Something is not right!!!</Text>
      <View style={{marginTop: 10}}>
        <Button onPress={resetErrorBoundary} title="Try Again" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});
