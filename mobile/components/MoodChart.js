import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 60;

// Map moods to numeric values for chart
const moodValues = {
  happy: 5,
  excited: 5,
  hopeful: 4.5,
  content: 4,
  calm: 4,
  peaceful: 4,
  energetic: 3.5,
  tired: 3,
  frustrated: 2.5,
  anxious: 2,
  stressed: 2,
  overwhelmed: 1.5,
  sad: 1.5,
  angry: 1,
  depressed: 1,
};

const MoodChart = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Not enough data to show chart</Text>
      </View>
    );
  }

  // Reverse to show oldest to newest
  const reversedMoods = [...moods].reverse();

  const data = {
    labels: reversedMoods.map(m => {
      const date = new Date(m.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        data: reversedMoods.map(m => moodValues[m.mood] || 3),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      }
    ],
    legend: ['Mood Score (1-5)']
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#007AFF',
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
        segments={4}
        yAxisLabel=""
        yAxisSuffix=""
      />
      <View style={styles.legend}>
        <Text style={styles.legendText}>📈 Higher scores = Better mood</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});

export default MoodChart;

