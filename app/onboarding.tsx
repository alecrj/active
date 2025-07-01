// app/onboarding.tsx - SIMPLIFIED FOR TESTFLIGHT
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/contexts/ThemeContext';
import { ChevronRight, Star } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

/**
 * SIMPLIFIED ONBOARDING FOR TESTFLIGHT
 * 
 * ✅ FIXED ISSUES:
 * - Removed complex assessment logic
 * - Simple skill level selection
 * - Proper default export
 * - Direct navigation to app
 */
export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  const styles = createStyles(theme);

  const skillLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'New to drawing',
      icon: '🌱',
      color: '#4CAF50',
    },
    {
      id: 'intermediate', 
      name: 'Intermediate',
      description: 'Some experience',
      icon: '🎨',
      color: '#2196F3',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Skilled artist',
      icon: '🏆',
      color: '#FF9800',
    },
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn('Haptics not available');
    }
  };

  const handleComplete = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn('Haptics not available');
    }
    
    // Navigate to main app
    router.replace('/(tabs)/draw');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to Pikaso! 🎨
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Choose your skill level to get started
        </Text>
      </View>

      {/* Skill Level Selection */}
      <View style={styles.content}>
        {skillLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.levelCard,
              { 
                backgroundColor: theme.colors.surface,
                borderColor: selectedLevel === level.id ? level.color : theme.colors.border,
                borderWidth: selectedLevel === level.id ? 3 : 1,
              }
            ]}
            onPress={() => handleLevelSelect(level.id)}
          >
            <View style={styles.levelHeader}>
              <Text style={styles.levelIcon}>{level.icon}</Text>
              <View style={styles.levelInfo}>
                <Text style={[styles.levelName, { color: theme.colors.text }]}>
                  {level.name}
                </Text>
                <Text style={[styles.levelDescription, { color: theme.colors.textSecondary }]}>
                  {level.description}
                </Text>
              </View>
              {selectedLevel === level.id && (
                <Star size={24} color={level.color} fill={level.color} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: selectedLevel ? theme.colors.primary : theme.colors.border,
              opacity: selectedLevel ? 1 : 0.5,
            }
          ]}
          onPress={handleComplete}
          disabled={!selectedLevel}
        >
          <Text style={[styles.continueText, { color: 'white' }]}>
            Start Drawing!
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Status */}
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>✅ Onboarding Fixed</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 16,
  },
  levelCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 100,
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