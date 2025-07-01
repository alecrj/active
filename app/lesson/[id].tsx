// app/lesson/[id].tsx - SIMPLIFIED FOR TESTFLIGHT
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../src/contexts/ThemeContext';
import { ChevronLeft } from 'lucide-react-native';

/**
 * SIMPLIFIED LESSON SCREEN FOR TESTFLIGHT
 * 
 * ✅ FIXED ISSUES:
 * - Removed complex dependencies
 * - Simple placeholder implementation
 * - Proper default export
 * - Basic navigation working
 */
export default function LessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Lesson {id}
          </Text>
        </View>
        
        <View style={styles.headerRight} />
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.placeholder, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.placeholderTitle, { color: theme.colors.text }]}>
            📚 Lesson System
          </Text>
          <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
            Lesson ID: {id}
          </Text>
          <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
            Coming after drawing system is complete!
          </Text>
          
          <TouchableOpacity
            style={[styles.backToDrawButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/(tabs)/draw')}
          >
            <Text style={styles.backToDrawText}>
              🎨 Back to Drawing
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Status */}
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>✅ Lesson Route Fixed</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholder: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  backToDrawButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToDrawText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'rgba(0, 200, 0, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});