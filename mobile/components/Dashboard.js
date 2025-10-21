import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../api';
import MoodForm from './MoodForm';
import MoodChart from './MoodChart';

const Dashboard = ({ navigation }) => {
  const [moods, setMoods] = useState([]);
  const [insight, setInsight] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await api.get('/moods');
      setMoods(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load moods');
      console.error(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMoods();
    setRefreshing(false);
  };

  const handleAddMood = async (newMood) => {
    setMoods([newMood, ...moods]);
    // Auto-fetch insight after logging mood
    await getInsight(newMood.mood, newMood.notes);
  };

  const getInsight = async (mood, notes) => {
    setLoading(true);
    try {
      const res = await api.post('/insights', { mood, notes });
      setInsight(res.data.insight);
      setError('');
    } catch (err) {
      setError('Failed to get AI insights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await SecureStore.deleteItemAsync('token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>MoodMate Dashboard</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Log Your Mood</Text>
        <MoodForm onAdd={handleAddMood} />
      </View>

      {insight ? (
        <View style={styles.insightContainer}>
          <Text style={styles.insightTitle}>💡 AI Insights</Text>
          <Text style={styles.insightText}>{insight}</Text>
          <Text style={styles.insightDisclaimer}>
            Remember: This is for reflection only, not medical advice.
          </Text>
        </View>
      ) : loading ? (
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>Getting insights...</Text>
        </View>
      ) : null}

      {moods.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Trends</Text>
          <MoodChart moods={moods.slice(0, 7)} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Moods</Text>
        {moods.length === 0 ? (
          <Text style={styles.emptyText}>No moods logged yet. Start tracking!</Text>
        ) : (
          moods.slice(0, 10).map((mood) => (
            <View key={mood._id} style={styles.moodItem}>
              <View style={styles.moodHeader}>
                <Text style={styles.moodValue}>{mood.mood}</Text>
                <Text style={styles.moodDate}>
                  {new Date(mood.date).toLocaleDateString()}
                </Text>
              </View>
              {mood.notes ? (
                <Text style={styles.moodNotes}>{mood.notes}</Text>
              ) : null}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  error: {
    color: 'red',
    padding: 10,
    textAlign: 'center',
  },
  insightContainer: {
    backgroundColor: '#E8F4FD',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  insightText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 24,
  },
  insightDisclaimer: {
    fontSize: 12,
    marginTop: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  moodItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    textTransform: 'capitalize',
  },
  moodDate: {
    fontSize: 14,
    color: '#666',
  },
  moodNotes: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    padding: 20,
  },
});

export default Dashboard;

