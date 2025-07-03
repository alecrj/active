// src/types/lesson.types.ts

export interface LessonObjective {
  id: string;
  description: string;
  completed: boolean;
}

export interface ValidationCriteria {
  type: 'shape_accuracy' | 'color_match' | 'stroke_count' | 'time_limit' | 'custom';
  threshold: number;
  customValidator?: (drawing: DrawingData) => boolean;
}

export interface PracticeExercise {
  id: string;
  type: 'trace' | 'copy' | 'freestyle' | 'challenge';
  referenceImage?: string;
  tracePath?: string;
  instructions: string;
  validation: ValidationCriteria[];
  hints: string[];
}

export interface LessonStep {
  id: string;
  title: string;
  instruction: string;
  demonstration?: {
    type: 'video' | 'animation' | 'image';
    url: string;
    duration?: number;
  };
  practice: PracticeExercise;
  tips: string[];
  commonMistakes: string[];
}

export interface Reward {
  type: 'badge' | 'brush' | 'color_palette' | 'achievement';
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'fundamental' | 'technique' | 'style' | 'project';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number; // minutes
  thumbnail: string;
  prerequisites: string[]; // lesson IDs
  objectives: LessonObjective[];
  steps: LessonStep[];
  reward: Reward;
  tags: string[];
}

export interface LessonProgress {
  lessonId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  currentStep: number;
  attempts: number;
  score: number;
  objectivesCompleted: string[];
  drawingSamples: string[]; // base64 images
}

export interface UserProfile {
  id: string;
  username: string;
  level: number;
  experience: number;
  lessonsCompleted: string[];
  achievements: string[];
  rewards: Reward[];
  dailyStreak: number;
  totalPracticeTime: number; // minutes
  preferredStyle?: 'realistic' | 'cartoon' | 'anime' | 'abstract';
}

// src/data/lessons/fundamentals.ts

export const FUNDAMENTAL_LESSONS: Lesson[] = [
  {
    id: 'lesson_001_first_strokes',
    title: 'First Strokes',
    description: 'Master the basics of line control and pressure sensitivity',
    category: 'fundamental',
    difficulty: 1,
    estimatedTime: 15,
    thumbnail: 'lessons/thumbs/first_strokes.png',
    prerequisites: [],
    objectives: [
      {
        id: 'obj_001_1',
        description: 'Draw 5 straight lines',
        completed: false
      },
      {
        id: 'obj_001_2',
        description: 'Draw 5 curved lines',
        completed: false
      },
      {
        id: 'obj_001_3',
        description: 'Create lines with varying pressure',
        completed: false
      }
    ],
    steps: [
      {
        id: 'step_001_1',
        title: 'Straight Lines',
        instruction: 'Practice drawing straight lines from left to right. Focus on keeping a steady hand.',
        demonstration: {
          type: 'animation',
          url: 'demos/straight_lines.gif',
          duration: 5
        },
        practice: {
          id: 'practice_001_1',
          type: 'trace',
          tracePath: 'M 50 100 L 250 100',
          instructions: 'Trace the dotted line shown on screen',
          validation: [
            {
              type: 'shape_accuracy',
              threshold: 0.8
            }
          ],
          hints: [
            'Move your whole arm, not just your wrist',
            'Draw quickly and confidently',
            'Don\'t worry about perfection'
          ]
        },
        tips: [
          'Rest your hand comfortably on the screen',
          'Breathe steadily while drawing'
        ],
        commonMistakes: [
          'Drawing too slowly causes wobbles',
          'Gripping too tightly creates tension'
        ]
      },
      {
        id: 'step_001_2',
        title: 'Curved Lines',
        instruction: 'Now let\'s practice smooth curves. These are the foundation of most drawings.',
        demonstration: {
          type: 'animation',
          url: 'demos/curved_lines.gif',
          duration: 5
        },
        practice: {
          id: 'practice_001_2',
          type: 'copy',
          referenceImage: 'refs/curves_sample.png',
          instructions: 'Copy the curved lines shown in the reference',
          validation: [
            {
              type: 'shape_accuracy',
              threshold: 0.7
            },
            {
              type: 'stroke_count',
              threshold: 5
            }
          ],
          hints: [
            'Use your shoulder for large curves',
            'Practice the motion in the air first',
            'One confident stroke is better than many small ones'
          ]
        },
        tips: [
          'Curves are everywhere in nature',
          'Practice drawing circles and spirals'
        ],
        commonMistakes: [
          'Making curves from many small lines',
          'Not rotating the canvas when needed'
        ]
      }
    ],
    reward: {
      type: 'achievement',
      id: 'achievement_first_strokes',
      name: 'Line Master',
      description: 'Completed your first drawing lesson!',
      icon: '✏️',
      rarity: 'common'
    },
    tags: ['basics', 'lines', 'beginner']
  },
  
  {
    id: 'lesson_002_shape_master',
    title: 'Shape Master',
    description: 'Learn to draw basic geometric shapes that form the foundation of all art',
    category: 'fundamental',
    difficulty: 1,
    estimatedTime: 20,
    thumbnail: 'lessons/thumbs/shapes.png',
    prerequisites: ['lesson_001_first_strokes'],
    objectives: [
      {
        id: 'obj_002_1',
        description: 'Draw perfect circles',
        completed: false
      },
      {
        id: 'obj_002_2',
        description: 'Draw squares and rectangles',
        completed: false
      },
      {
        id: 'obj_002_3',
        description: 'Draw triangles',
        completed: false
      },
      {
        id: 'obj_002_4',
        description: 'Combine shapes creatively',
        completed: false
      }
    ],
    steps: [
      {
        id: 'step_002_1',
        title: 'Circle Mastery',
        instruction: 'Circles are everywhere! Let\'s learn to draw them confidently.',
        demonstration: {
          type: 'video',
          url: 'demos/circle_technique.mp4',
          duration: 30
        },
        practice: {
          id: 'practice_002_1',
          type: 'challenge',
          instructions: 'Draw 5 circles of different sizes',
          validation: [
            {
              type: 'shape_accuracy',
              threshold: 0.75
            },
            {
              type: 'stroke_count',
              threshold: 5
            }
          ],
          hints: [
            'Draw from your shoulder, not your wrist',
            'Practice the motion before touching the screen',
            'Speed helps create smoother curves'
          ]
        },
        tips: [
          'Perfect circles take practice',
          'Try drawing in both directions'
        ],
        commonMistakes: [
          'Going too slow',
          'Starting and ending at different points'
        ]
      }
    ],
    reward: {
      type: 'brush',
      id: 'brush_geometric',
      name: 'Geometric Brush',
      description: 'A special brush for perfect shapes',
      icon: '🔷',
      rarity: 'rare'
    },
    tags: ['basics', 'shapes', 'geometry']
  }
];

// src/services/lessonService.ts

export class LessonService {
  private static instance: LessonService;
  private lessons: Map<string, Lesson> = new Map();
  private userProgress: Map<string, LessonProgress> = new Map();

  static getInstance(): LessonService {
    if (!LessonService.instance) {
      LessonService.instance = new LessonService();
    }
    return LessonService.instance;
  }

  constructor() {
    this.loadLessons();
  }

  private loadLessons() {
    FUNDAMENTAL_LESSONS.forEach(lesson => {
      this.lessons.set(lesson.id, lesson);
    });
  }

  getLessonById(id: string): Lesson | undefined {
    return this.lessons.get(id);
  }

  getLessonsByCategory(category: string): Lesson[] {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.category === category);
  }

  getRecommendedLessons(userId: string): Lesson[] {
    const completedLessons = this.getCompletedLessons(userId);
    const completedIds = new Set(completedLessons.map(l => l.id));
    
    return Array.from(this.lessons.values())
      .filter(lesson => {
        // Not completed
        if (completedIds.has(lesson.id)) return false;
        
        // Prerequisites met
        return lesson.prerequisites.every(prereq => completedIds.has(prereq));
      })
      .sort((a, b) => a.difficulty - b.difficulty)
      .slice(0, 3);
  }

  getCompletedLessons(userId: string): Lesson[] {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId && progress.completedAt)
      .map(progress => this.lessons.get(progress.lessonId)!)
      .filter(Boolean);
  }

  startLesson(userId: string, lessonId: string): LessonProgress {
    const progress: LessonProgress = {
      lessonId,
      userId,
      startedAt: new Date(),
      currentStep: 0,
      attempts: 0,
      score: 0,
      objectivesCompleted: [],
      drawingSamples: []
    };
    
    const key = `${userId}_${lessonId}`;
    this.userProgress.set(key, progress);
    
    return progress;
  }

  updateProgress(
    userId: string, 
    lessonId: string, 
    update: Partial<LessonProgress>
  ): LessonProgress | undefined {
    const key = `${userId}_${lessonId}`;
    const progress = this.userProgress.get(key);
    
    if (!progress) return undefined;
    
    const updated = { ...progress, ...update };
    this.userProgress.set(key, updated);
    
    return updated;
  }

  completeLesson(
    userId: string, 
    lessonId: string, 
    score: number
  ): { progress: LessonProgress; reward: Reward } | undefined {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) return undefined;
    
    const progress = this.updateProgress(userId, lessonId, {
      completedAt: new Date(),
      score,
      currentStep: lesson.steps.length
    });
    
    if (!progress) return undefined;
    
    return {
      progress,
      reward: lesson.reward
    };
  }

  validateDrawing(
    drawing: any, 
    criteria: ValidationCriteria[]
  ): { passed: boolean; score: number; feedback: string[] } {
    const feedback: string[] = [];
    let totalScore = 0;
    let passedCount = 0;
    
    criteria.forEach(criterion => {
      let passed = false;
      let score = 0;
      
      switch (criterion.type) {
        case 'shape_accuracy':
          // Implement shape matching algorithm
          score = this.calculateShapeAccuracy(drawing);
          passed = score >= criterion.threshold;
          if (!passed) {
            feedback.push('Try to match the shape more closely');
          }
          break;
          
        case 'stroke_count':
          const strokeCount = drawing.paths?.length || 0;
          passed = strokeCount <= criterion.threshold;
          score = passed ? 1 : 0;
          if (!passed) {
            feedback.push(`Use fewer strokes (${strokeCount}/${criterion.threshold})`);
          }
          break;
          
        case 'custom':
          if (criterion.customValidator) {
            passed = criterion.customValidator(drawing);
            score = passed ? 1 : 0;
          }
          break;
      }
      
      if (passed) passedCount++;
      totalScore += score;
    });
    
    const averageScore = totalScore / criteria.length;
    const allPassed = passedCount === criteria.length;
    
    if (allPassed) {
      feedback.unshift('Great job! 🎉');
    } else {
      feedback.unshift('Keep practicing! You\'re getting there.');
    }
    
    return {
      passed: allPassed,
      score: averageScore,
      feedback
    };
  }

  private calculateShapeAccuracy(drawing: any): number {
    // Simplified shape matching - in production would use
    // computer vision or path comparison algorithms
    return Math.random() * 0.3 + 0.7; // Mock 70-100% accuracy
  }
}

// src/hooks/useLesson.ts
import { useState, useEffect } from 'react';

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);
  
  const lessonService = LessonService.getInstance();
  
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const lessonData = lessonService.getLessonById(lessonId);
        if (lessonData) {
          setLesson(lessonData);
          // In production, load progress from storage/API
          const userId = 'current_user'; // Get from auth
          const progressData = lessonService.startLesson(userId, lessonId);
          setProgress(progressData);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadLesson();
  }, [lessonId]);
  
  const completeStep = (stepIndex: number, drawing: any) => {
    if (!lesson || !progress) return;
    
    const step = lesson.steps[stepIndex];
    const validation = lessonService.validateDrawing(
      drawing, 
      step.practice.validation
    );
    
    if (validation.passed) {
      // Update progress
      const userId = 'current_user';
      const updated = lessonService.updateProgress(userId, lessonId, {
        currentStep: stepIndex + 1,
        attempts: progress.attempts + 1,
        score: validation.score
      });
      
      setProgress(updated || progress);
    }
    
    return validation;
  };
  
  return {
    lesson,
    progress,
    loading,
    completeStep
  };
}