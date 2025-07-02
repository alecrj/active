export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  category: string;
  objectives: string[];
  instructions: string[];
  tips: string[];
  nextLessonId?: string;
  requiredLessons?: string[];
}

export const fundamentalLessons: Lesson[] = [
  {
    id: '1',
    title: 'Basic Lines and Control',
    description: 'Master the foundation of all drawing - straight lines, curves, and basic control.',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    category: 'Fundamentals',
    objectives: [
      'Draw straight horizontal and vertical lines',
      'Control line length and direction',
      'Create smooth curves',
      'Understand pressure sensitivity'
    ],
    instructions: [
      'Practice drawing 10 horizontal lines across the canvas, keeping them as straight as possible',
      'Now draw 10 vertical lines, focusing on maintaining consistent direction',
      'Try diagonal lines at 45-degree angles - both directions',
      'Practice gentle curves like the letter S, focusing on smooth motion',
      'Experiment with pressure - light touch for thin lines, firm press for thick lines'
    ],
    tips: [
      'Use your whole arm for long lines, not just your wrist',
      'Look ahead to where you want the line to end',
      'Practice consistent speed for smoother lines'
    ],
    nextLessonId: '2'
  },
  
  {
    id: '2',
    title: 'Basic Shapes - Circles and Squares',
    description: 'Learn to draw perfect circles, squares, and understand geometric forms.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    category: 'Fundamentals',
    objectives: [
      'Draw circles of various sizes',
      'Create squares and rectangles',
      'Understand proportion and symmetry',
      'Control shape consistency'
    ],
    instructions: [
      'Start with small circles - practice drawing 20 circles about the same size',
      'Gradually increase circle size - draw 5 progressively larger circles',
      'Practice squares - draw 10 squares keeping all sides equal',
      'Try rectangles with different proportions - tall, wide, and medium',
      'Combine shapes - draw a circle inside a square, and a square inside a circle'
    ],
    tips: [
      'For circles, imagine a clock face and touch 12, 3, 6, and 9 o\'clock',
      'Rotate your canvas (mentally) when drawing to find comfortable angles',
      'Start light and strengthen lines once the shape looks right'
    ],
    nextLessonId: '3',
    requiredLessons: ['1']
  },

  {
    id: '3',
    title: 'Triangles and Complex Shapes',
    description: 'Master triangles and learn to combine shapes into complex forms.',
    difficulty: 'Beginner',
    estimatedTime: '25 minutes',
    category: 'Fundamentals',
    objectives: [
      'Draw equilateral triangles',
      'Create different triangle types',
      'Combine shapes into complex forms',
      'Understand geometric relationships'
    ],
    instructions: [
      'Practice equilateral triangles - all sides equal length',
      'Draw right triangles with one 90-degree angle',
      'Create isosceles triangles with two equal sides',
      'Combine shapes: draw a house using squares, triangles, and rectangles',
      'Create a simple robot or character using only geometric shapes'
    ],
    tips: [
      'Start with the base of triangles for stability',
      'Use guidelines to maintain symmetry',
      'Practice proportion by comparing shape sizes'
    ],
    nextLessonId: '4',
    requiredLessons: ['1', '2']
  },

  {
    id: '4',
    title: 'Line Weight and Variation',
    description: 'Explore different line weights and understand their expressive power.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    category: 'Technique',
    objectives: [
      'Control line thickness variations',
      'Understand line weight hierarchy',
      'Create expressive strokes',
      'Use pressure for artistic effect'
    ],
    instructions: [
      'Draw the same circle 5 times with different line weights - very thin to very thick',
      'Practice graduated lines - start thin and gradually get thicker',
      'Create a simple drawing using only thick lines for outlines',
      'Redraw the same subject using only thin, delicate lines',
      'Combine thick and thin lines in one drawing for contrast and emphasis'
    ],
    tips: [
      'Thicker lines come forward, thinner lines recede',
      'Use variation to create focus and interest',
      'Practice consistent pressure for uniform lines'
    ],
    nextLessonId: '5',
    requiredLessons: ['1', '2', '3']
  },

  {
    id: '5',
    title: 'Shading Basics - Values and Form',
    description: 'Introduction to shading, values, and creating the illusion of three-dimensional form.',
    difficulty: 'Beginner',
    estimatedTime: '30 minutes',
    category: 'Shading',
    objectives: [
      'Understand light and shadow',
      'Create value gradients',
      'Add volume to basic shapes',
      'Control shading pressure'
    ],
    instructions: [
      'Create a value scale - 5 boxes from white to black with gray steps between',
      'Draw a circle and shade it to look like a sphere with light from the top-left',
      'Transform a square into a cube using shading on three visible faces',
      'Practice cross-hatching - overlapping lines to create darker values',
      'Draw a cylinder and shade it to show roundness and form'
    ],
    tips: [
      'Squint to see value relationships more clearly',
      'Start light and build up darkness gradually',
      'Consistent light direction creates believable form'
    ],
    nextLessonId: '6',
    requiredLessons: ['1', '2', '3', '4']
  },

  {
    id: '6',
    title: 'Texture and Mark-Making',
    description: 'Explore different strokes and marks to create texture and surface quality.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    category: 'Technique',
    objectives: [
      'Create various texture patterns',
      'Master different stroke techniques',
      'Understand mark-making for expression',
      'Develop hand-eye coordination'
    ],
    instructions: [
      'Practice stippling - small dots to create texture and values',
      'Try cross-hatching at different angles for varying darkness',
      'Create fur texture using short, overlapping strokes',
      'Draw wood grain using flowing, parallel lines',
      'Experiment with scribbling techniques for abstract textures'
    ],
    tips: [
      'Vary your marks to avoid mechanical repetition',
      'Observe real textures for reference',
      'Build textures gradually, layer by layer'
    ],
    nextLessonId: '7',
    requiredLessons: ['1', '2', '3', '4', '5']
  },

  {
    id: '7',
    title: 'Perspective Basics - One Point',
    description: 'Learn the fundamentals of one-point perspective to create depth.',
    difficulty: 'Intermediate',
    estimatedTime: '35 minutes',
    category: 'Perspective',
    objectives: [
      'Understand vanishing points',
      'Draw boxes in perspective',
      'Create depth illusion',
      'Apply perspective to simple scenes'
    ],
    instructions: [
      'Draw a horizon line across your canvas and mark one vanishing point',
      'Draw a square facing you, then connect corners to the vanishing point',
      'Create a simple room with a back wall, ceiling, and floor',
      'Add furniture like tables and chairs using perspective guidelines',
      'Draw a simple street scene with buildings receding to the vanishing point'
    ],
    tips: [
      'All parallel lines going away from you meet at the vanishing point',
      'Objects get smaller as they move toward the vanishing point',
      'Keep your vanishing point consistent throughout the drawing'
    ],
    nextLessonId: '8',
    requiredLessons: ['1', '2', '3', '4', '5']
  },

  {
    id: '8',
    title: 'Simple Still Life',
    description: 'Apply your skills to draw a basic still life composition.',
    difficulty: 'Intermediate',
    estimatedTime: '40 minutes',
    category: 'Application',
    objectives: [
      'Compose a simple still life',
      'Apply learned techniques together',
      'Observe proportions and relationships',
      'Create a complete drawing'
    ],
    instructions: [
      'Imagine three simple objects: an apple, a cube, and a cylinder',
      'Sketch the basic shapes first, focusing on proportions',
      'Add the major shadow shapes to establish light direction',
      'Refine the contours and add surface details',
      'Complete with full shading and texture details'
    ],
    tips: [
      'Start with large shapes and work toward small details',
      'Compare sizes - how big is the apple compared to the cube?',
      'Step back (mentally) frequently to assess the whole drawing'
    ],
    nextLessonId: '9',
    requiredLessons: ['1', '2', '3', '4', '5', '6', '7']
  },

  {
    id: '9',
    title: 'Proportion and Measurement',
    description: 'Learn to see and draw accurate proportions using measurement techniques.',
    difficulty: 'Intermediate',
    estimatedTime: '30 minutes',
    category: 'Observation',
    objectives: [
      'Use comparative measurement',
      'Understand proportion relationships',
      'Develop observational skills',
      'Create accurate drawings'
    ],
    instructions: [
      'Draw a simple house shape and check that the roof is proportional to the walls',
      'Practice the "heads high" measurement - draw a figure that is 6-7 heads tall',
      'Draw two identical circles side by side, then check they really are the same size',
      'Create a drawing where you carefully measure angles using your pencil',
      'Draw overlapping shapes and check their size relationships'
    ],
    tips: [
      'Hold your pencil at arm\'s length to measure proportions',
      'Look for halfway points and quarter divisions',
      'Compare everything to everything else'
    ],
    nextLessonId: '10',
    requiredLessons: ['1', '2', '3', '4', '5', '6', '7', '8']
  },

  {
    id: '10',
    title: 'Composition and Balance',
    description: 'Learn the principles of good composition and visual balance.',
    difficulty: 'Intermediate',
    estimatedTime: '35 minutes',
    category: 'Composition',
    objectives: [
      'Understand rule of thirds',
      'Create visual balance',
      'Direct the viewer\'s eye',
      'Compose compelling drawings'
    ],
    instructions: [
      'Divide your canvas into thirds both horizontally and vertically',
      'Place important elements at the intersection points',
      'Create a balanced composition with equal visual weight on both sides',
      'Draw a scene with a clear focal point that draws the eye',
      'Experiment with symmetrical vs asymmetrical balance'
    ],
    tips: [
      'Use contrast to create focal points',
      'Lead the eye through the composition with lines and shapes',
      'Avoid placing important elements dead center'
    ],
    requiredLessons: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  }
];

export const lessonCategories = [
  'Fundamentals',
  'Technique', 
  'Shading',
  'Perspective',
  'Application',
  'Observation',
  'Composition'
];

export function getLessonById(id: string): Lesson | undefined {
  return fundamentalLessons.find(lesson => lesson.id === id);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return fundamentalLessons.filter(lesson => lesson.category === category);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentLesson = getLessonById(currentLessonId);
  if (currentLesson?.nextLessonId) {
    return getLessonById(currentLesson.nextLessonId);
  }
  return undefined;
}

// Add the missing function that's being imported
export function getFundamentalLessons(): Lesson[] {
  return fundamentalLessons;
}