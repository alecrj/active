import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Play, CheckCircle, Star } from 'lucide-react-native';
import ModernSkiaCanvas from '../../src/components/ModernSkiaCanvas';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sample lesson data - will be replaced with actual lesson content
const LESSONS = {
  '1': {
    id: '1',
    title: 'Basic Lines and Shapes',
    description: 'Learn to draw straight lines, curves, and basic geometric shapes.',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    objectives: [
      'Draw straight horizontal lines',
      'Draw vertical lines',
      'Create perfect circles',
      'Draw squares and rectangles'
    ],
    instructions: [
      'Start by drawing 5 horizontal lines across the canvas',
      'Now draw 5 vertical lines to create a grid',
      'Practice drawing circles - start small and work up to larger ones',
      'Complete the exercise by drawing squares inside some grid sections'
    ]
  },
  '2': {
    id: '2',
    title: 'Pressure and Brush Control',
    description: 'Master pressure sensitivity and brush stroke variations.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    objectives: [
      'Control line thickness with pressure',
      'Create smooth curves',
      'Practice brush dynamics',
      'Understand stroke flow'
    ],
    instructions: [
      'Press lightly to create thin lines',
      'Press harder to create thick lines',
      'Practice transitioning from thin to thick in one stroke',
      'Draw flowing S-curves with varying pressure'
    ]
  }
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lessonStarted, setLessonStarted] = useState(false);

  const lesson = LESSONS[id as string];

  useEffect(() => {
    if (!lesson) {
      router.back();
    }
  }, [lesson, router]);

  if (!lesson) {
    return null;
  }

  const handleStartLesson = () => {
    setLessonStarted(true);
  };

  const handleNextStep = () => {
    if (currentStep < lesson.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteLesson = () => {
    // Here you would typically save progress to context/storage
    router.push('/(tabs)/learn');
  };

  if (!lessonStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lesson {lesson.id}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.lessonOverview}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
            
            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Difficulty</Text>
                <Text style={styles.metaValue}>{lesson.difficulty}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Time</Text>
                <Text style={styles.metaValue}>{lesson.estimatedTime}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Learning Objectives</Text>
            {lesson.objectives.map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <Star size={16} color="#FFD700" />
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            ))}

            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStartLesson}
            >
              <Play size={20} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Start Lesson</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completionContainer}>
          <CheckCircle size={80} color="#4CAF50" />
          <Text style={styles.completionTitle}>Lesson Complete!</Text>
          <Text style={styles.completionMessage}>
            Great job! You've completed "{lesson.title}". 
            Keep practicing to improve your skills.
          </Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleCompleteLesson}
          >
            <Text style={styles.continueButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Step {currentStep + 1} of {lesson.instructions.length}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentStep + 1) / lesson.instructions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Instruction */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          {lesson.instructions[currentStep]}
        </Text>
      </View>

      {/* Drawing Canvas */}
      <View style={styles.canvasContainer}>
        <ModernSkiaCanvas
          width={screenWidth - 32}
          height={screenHeight * 0.4}
          strokeWidth={5}
          strokeColor="#000000"
          backgroundColor="#FFFFFF"
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentStep === 0 && styles.disabledButton]}
          onPress={handlePreviousStep}
          disabled={currentStep === 0}
        >
          <Text style={[styles.navButtonText, currentStep === 0 && styles.disabledText]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === lesson.instructions.length - 1 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  lessonOverview: {
    padding: 20,
  },
  lessonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#333',
  },
  disabledText: {
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  completionMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});