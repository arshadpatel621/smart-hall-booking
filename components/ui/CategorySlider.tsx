import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';

const CATEGORIES = [
  { id: '1', name: 'Banquets', icon: 'office-building' },
  { id: '2', name: 'Farmhouses', icon: 'home-variant' },
  { id: '3', name: 'Hotels', icon: 'hospital-building' },
  { id: '4', name: 'Lawns', icon: 'tree' },
  { id: '5', name: 'Caterers', icon: 'silverware-fork-knife' },
  { id: '6', name: 'Photographers', icon: 'camera' },
];

export function CategorySlider() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInRight.delay(index * 100).springify()}
          >
            <Pressable style={styles.item}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                  name={category.icon as any} 
                  size={28} 
                  color="#E11D48" 
                />
              </View>
              <Text style={styles.name}>{category.name}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 20,
  },
  item: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E6',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
});
