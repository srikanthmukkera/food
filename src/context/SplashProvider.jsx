import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

function SplashProvider({children, ...props}) {
  const [spashLoaded, setSplashLoaded] = useState(false);

  useEffect(() => {
    if (!spashLoaded) {
      setTimeout(() => {
        setSplashLoaded(true);
      }, 1500);
    }
  }, []);

  const splash = (
    <View className="flex flex-1 justify-center items-center">
      <View className="flex flex-row">
        <Text style={[styles.titleChar]}>F</Text>
        <Text style={[styles.titleChar]}>O</Text>
        <Text style={[styles.titleChar]}>O</Text>
        <Text style={[styles.titleChar]}>D</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView className="flex-1">
      {spashLoaded ? children : splash}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleChar: {
    fontSize: 40,
    fontWeight: '800',
  },
});

export default SplashProvider;
