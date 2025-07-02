import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  PlayCircle, 
  Clock, 
  Star, 
  TrendingUp,
  Book,
  Target,
  Award
} from 'lucide-react-native';
import { fundamentalLessons, lessonCategories } from '../../src/content/lessons/fundamentals';

const { width: screenWidth } = Dimensions.get('window');

export default function LearnScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLessons = selectedCategory === 'All' 
    ? fundamentalLessons 
    : fundamentalLessons.filter(lesson => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const getLessonProgress = (lessonId: string) => {
    // This would normally come from user progress context
    // For now, return mock progress
    const completed = ['1', '2', '3'];
    return completed.includes(lessonId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learn to Draw</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Award size={16} color="#FFD700" />
            <Text style={styles.statText}>Level 3</Text>
          </View>
        </View>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
        <Text style={styles.progressText}>3 of 10 lessons completed</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'All' && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory('All')}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === 'All' && styles.selectedCategoryText
              ]}>
                All
              </Text>
            </TouchableOpacity>
            {lessonCategories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Lesson */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity 
            style={styles.featuredCard}
            onPress={() => router.push('/lesson/4')}
          >
            <View style={styles.featuredContent}>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>Line Weight and Variation</Text>
                <Text style={styles.featuredDescription}>
                  Explore different line weights and their expressive power
                </Text>
                <View style={styles.featuredMeta}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.featuredTime}>20 minutes</Text>
                </View>
              </View>
              <PlayCircle size={40} color="#2196F3" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Lessons List */}
        <View style={styles.lessonsSection}>
          <Text style={styles.sectionTitle}>All Lessons</Text>
          {filteredLessons.map((lesson, index) => {
            const isCompleted = getLessonProgress(lesson.id);
            const isLocked = false; // You could implement lesson locking logic here
            
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  isCompleted && styles.completedLessonCard,
                  isLocked && styles.lockedLessonCard
                ]}
                onPress={() => !isLocked && router.push(`/lesson/${lesson.id}`)}
                disabled={isLocked}
              >
                <View style={styles.lessonNumber}>
                  {isCompleted ? (
                    <Star size={20} color="#FFD700" />
                  ) : (
                    <Text style={styles.lessonNumberText}>{lesson.id}</Text>
                  )}
                </View>
                
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription} numberOfLines={2}>
                    {lesson.description}
                  </Text>
                  
                  <View style={styles.lessonMeta}>
                    <View style={styles.metaItem}>
                      <View style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(lesson.difficulty) }
                      ]}>
                        <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#666" />
                      <Text style={styles.metaText}>{lesson.estimatedTime}</Text>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <Target size={14} color="#666" />
                      <Text style={styles.metaText}>{lesson.objectives.length} goals</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.lessonAction}>
                  {isCompleted ? (
                    <Text style={styles.completedText}>✓</Text>
                  ) : (
                    <PlayCircle size={24} color="#2196F3" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Daily Tip</Text>
          <View style={styles.tipCard}>
            <TrendingUp size={24} color="#4CAF50" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Practice Daily</Text>
              <Text style={styles.tipText}>
                Even 10 minutes of daily practice is more effective than longer, 
                infrequent sessions. Consistency builds muscle memory!
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  categorySection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingLeft: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  featuredSection: {
    paddingVertical: 16,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  lessonsSection: {
    paddingVertical: 16,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  completedLessonCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  lockedLessonCard: {
    opacity: 0.6,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  lessonAction: {
    marginLeft: 12,
  },
  completedText: {
    fontSize: 24,
    color: '#4CAF50',
  },
  tipsSection: {
    paddingVertical: 16,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});