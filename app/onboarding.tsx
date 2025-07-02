import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Star, Palette, Target, Users } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    icon: <Palette size={60} color="#2196F3" />,
    title: "Welcome to Pikaso",
    description: "Your personal drawing journey starts here. Learn from the fundamentals to advanced techniques with our guided lessons.",
    color: "#2196F3"
  },
  {
    id: 2,
    icon: <Target size={60} color="#4CAF50" />,
    title: "Structured Learning",
    description: "Follow our carefully crafted lessons that build upon each other. Master each skill before moving to the next level.",
    color: "#4CAF50"
  },
  {
    id: 3,
    icon: <Star size={60} color="#FF9800" />,
    title: "Track Progress",
    description: "See your improvement over time with detailed progress tracking and skill assessments. Earn achievements as you learn!",
    color: "#FF9800"
  },
  {
    id: 4,
    icon: <Users size={60} color="#9C27B0" />,
    title: "Join the Community",
    description: "Share your artwork, get feedback, and connect with other artists on their learning journey.",
    color: "#9C27B0"
  }
];

const experienceLevels = [
  {
    id: 'complete-beginner',
    title: 'Complete Beginner',
    description: "I've never drawn seriously before",
    icon: '🌱'
  },
  {
    id: 'some-experience',
    title: 'Some Experience',
    description: "I've drawn a little but want to improve",
    icon: '🎨'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: "I have drawing experience and want to advance",
    icon: '⭐'
  }
];

const learningGoals = [
  { id: 'fundamentals', title: 'Master the Basics', icon: '📐' },
  { id: 'portraits', title: 'Draw Portraits', icon: '👤' },
  { id: 'landscapes', title: 'Paint Landscapes', icon: '🏔️' },
  { id: 'digital-art', title: 'Digital Art Skills', icon: '💻' },
  { id: 'character-design', title: 'Character Design', icon: '🦸' },
  { id: 'general-improvement', title: 'General Improvement', icon: '📈' }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const isSetupStep = currentStep >= onboardingSteps.length;
  const setupStep = currentStep - onboardingSteps.length;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length + 1) { // +1 for the two setup steps
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    // Here you would typically save the user's preferences
    // For now, just navigate to the main app
    router.replace('/(tabs)');
  };

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const canProceed = () => {
    if (setupStep === 0) return selectedExperience !== '';
    if (setupStep === 1) return selectedGoals.length > 0;
    return true;
  };

  if (isSetupStep && setupStep === 0) {
    // Experience Level Selection
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View style={styles.setupHeader}>
          <Text style={styles.setupTitle}>What's your experience level?</Text>
          <Text style={styles.setupDescription}>
            This helps us personalize your learning path
          </Text>
        </View>

        <ScrollView style={styles.setupContent} showsVerticalScrollIndicator={false}>
          {experienceLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.optionCard,
                selectedExperience === level.id && styles.selectedOption
              ]}
              onPress={() => setSelectedExperience(level.id)}
            >
              <Text style={styles.optionIcon}>{level.icon}</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{level.title}</Text>
                <Text style={styles.optionDescription}>{level.description}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedExperience === level.id && styles.radioButtonSelected
              ]} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.setupFooter}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.nextButton, !canProceed() && styles.disabledButton]}
            onPress={handleNext}
            disabled={!canProceed()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isSetupStep && setupStep === 1) {
    // Learning Goals Selection
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View style={styles.setupHeader}>
          <Text style={styles.setupTitle}>What do you want to learn?</Text>
          <Text style={styles.setupDescription}>
            Select one or more areas you'd like to focus on
          </Text>
        </View>

        <ScrollView style={styles.setupContent} showsVerticalScrollIndicator={false}>
          <View style={styles.goalsGrid}>
            {learningGoals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoals.includes(goal.id) && styles.selectedGoal
                ]}
                onPress={() => toggleGoal(goal.id)}
              >
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                {selectedGoals.includes(goal.id) && (
                  <View style={styles.goalCheck}>
                    <Text style={styles.goalCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.setupFooter}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.nextButton, !canProceed() && styles.disabledButton]}
            onPress={handleNext}
            disabled={!canProceed()}
          >
            <Text style={styles.nextButtonText}>Start Learning</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Main onboarding steps
  const step = onboardingSteps[currentStep];
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentStep && styles.activeDot,
              index < currentStep && styles.completedDot
            ]}
          />
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {step.icon}
        </View>
        
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2196F3',
    width: 24,
  },
  completedDot: {
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  setupHeader: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
  setupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  setupDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  setupContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  setupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  radioButtonSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedGoal: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  goalIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 20,
  },
  goalCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalCheckText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});