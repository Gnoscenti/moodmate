import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api';

const MOODS = [
  { label: 'Select a mood...', value: '' },
  { label: '😊 Happy', value: 'happy' },
  { label: '😢 Sad', value: 'sad' },
  { label: '😰 Anxious', value: 'anxious' },
  { label: '😫 Stressed', value: 'stressed' },
  { label: '😌 Calm', value: 'calm' },
  { label: '⚡ Energetic', value: 'energetic' },
  { label: '😔 Depressed', value: 'depressed' },
  { label: '😠 Angry', value: 'angry' },
  { label: '🤩 Excited', value: 'excited' },
  { label: '😴 Tired', value: 'tired' },
  { label: '😊 Content', value: 'content' },
  { label: '😤 Frustrated', value: 'frustrated' },
  { label: '🌟 Hopeful', value: 'hopeful' },
  { label: '😵 Overwhelmed', value: 'overwhelmed' },
  { label: '☮️ Peaceful', value: 'peaceful' },
];

const MoodForm = ({ onAdd }) => {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mood) {
      setError('Please select a mood');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/moods', { 
        mood: mood.trim(), 
        notes: notes.trim() 
      });
      
      onAdd(res.data);
      
      // Reset form
      setMood('');
      setNotes('');
      
      Alert.alert('Success', 'Mood logged successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to log mood';
      setError(errorMsg);
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={mood}
          onValueChange={(itemValue) => setMood(itemValue)}
          style={styles.picker}
        >
          {MOODS.map((moodOption) => (
            <Picker.Item 
              key={moodOption.value} 
              label={moodOption.label} 
              value={moodOption.value} 
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add notes (optional)..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging...' : 'Log Mood'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 80,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MoodForm;

