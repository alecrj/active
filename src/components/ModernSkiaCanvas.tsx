import React, { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Safe import with fallback
let Canvas: any, Path: any, Skia: any, useCanvasRef: any, useTouchHandler: any, useSharedValue: any;

try {
  const SkiaModule = require('@shopify/react-native-skia');
  Canvas = SkiaModule.Canvas;
  Path = SkiaModule.Path;
  Skia = SkiaModule.Skia;
  useCanvasRef = SkiaModule.useCanvasRef;
  useTouchHandler = SkiaModule.useTouchHandler;
  useSharedValue = SkiaModule.useSharedValue;
} catch (error) {
  console.warn('Skia not available:', error);
}

interface DrawingPath {
  path: string;
  color: string;
  strokeWidth: number;
  opacity: number;
  id: string;
  timestamp: number;
  points: number; // for performance tracking
}

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  locked: boolean;
  paths: DrawingPath[];
}

interface EnhancedSkiaCanvasProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  onDrawingChange?: (paths: DrawingPath[]) => void;
  enableHaptics?: boolean;
  enableGrid?: boolean;
  gridSize?: number;
  maxUndoSteps?: number;
}

export interface EnhancedSkiaCanvasRef {
  clearCanvas: () => void;
  undoLastStroke: () => void;
  redoLastStroke: () => void;
  getPaths: () => DrawingPath[];
  getDrawingData: () => string;
  loadDrawingData: (data: string) => void;
  exportImage: () => Promise<string>;
  canUndo: () => boolean;
  canRedo: () => boolean;
  getStats: () => { pathCount: number; totalPoints: number };
}

export const EnhancedSkiaCanvas = forwardRef<EnhancedSkiaCanvasRef, EnhancedSkiaCanvasProps>(
  ({
    width = Dimensions.get('window').width,
    height = Dimensions.get('window').height * 0.7,
    strokeWidth = 5,
    strokeColor = '#000000',
    backgroundColor = '#FFFFFF',
    onDrawingChange,
    enableHaptics = true,
    enableGrid = false,
    gridSize = 20,
    maxUndoSteps = 50,
  }, ref) => {
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [undoStack, setUndoStack] = useState<DrawingPath[][]>([]);
    const [redoStack, setRedoStack] = useState<DrawingPath[][]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [pointCount, setPointCount] = useState(0);
    
    // Performance tracking
    const [fps, setFps] = useState(60);
    const lastFrameTime = useSharedValue ? useSharedValue(Date.now()) : { value: Date.now() };
    
    // Safe initialization with fallbacks
    const currentPath = useSharedValue ? useSharedValue<string>('') : { value: '' };
    const canvasRef = useCanvasRef ? useCanvasRef() : null;

    // Check if Skia is available
    if (!Canvas || !Skia) {
      return (
        <View style={[styles.container, { width, height, backgroundColor }]}>
          <View style={styles.fallbackContainer}>
            <View style={styles.loadingIndicator} />
          </View>
        </View>
      );
    }

    // Generate unique ID for each path
    const generatePathId = () => `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create path helper with smoothing
    const createPath = useCallback(() => {
      return Skia.Path.Make();
    }, []);

    // Haptic feedback helper
    const triggerHaptic = useCallback(() => {
      if (enableHaptics && Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }, [enableHaptics]);

    // Touch handler with performance optimization
    const touchHandler = useTouchHandler ? useTouchHandler({
      onStart: (event) => {
        try {
          // Start performance tracking
          const now = Date.now();
          lastFrameTime.value = now;
          
          setIsDrawing(true);
          setPointCount(1);
          triggerHaptic();
          
          const path = createPath();
          path.moveTo(event.x, event.y);
          currentPath.value = path.toSVGString();
          
          // Clear redo stack on new drawing
          setRedoStack([]);
        } catch (error) {
          console.warn('Touch start error:', error);
        }
      },
      onActive: (event) => {
        try {
          // Calculate FPS
          const now = Date.now();
          const delta = now - lastFrameTime.value;
          if (delta > 0) {
            setFps(Math.round(1000 / delta));
            lastFrameTime.value = now;
          }
          
          const path = Skia.Path.MakeFromSVGString(currentPath.value || '');
          if (path) {
            // Smooth line drawing
            path.lineTo(event.x, event.y);
            currentPath.value = path.toSVGString();
            setPointCount(prev => prev + 1);
          }
        } catch (error) {
          console.warn('Touch active error:', error);
        }
      },
      onEnd: () => {
        try {
          setIsDrawing(false);
          
          if (currentPath.value) {
            const newPath: DrawingPath = {
              path: currentPath.value,
              color: strokeColor,
              strokeWidth: strokeWidth,
              opacity: 1.0,
              id: generatePathId(),
              timestamp: Date.now(),
              points: pointCount,
            };
            
            // Update undo stack
            setUndoStack(prev => {
              const newStack = [...prev, paths];
              // Limit undo stack size
              if (newStack.length > maxUndoSteps) {
                newStack.shift();
              }
              return newStack;
            });
            
            setPaths(prev => {
              const newPaths = [...prev, newPath];
              onDrawingChange?.(newPaths);
              return newPaths;
            });
            
            currentPath.value = '';
            triggerHaptic();
          }
        } catch (error) {
          console.warn('Touch end error:', error);
        }
      },
    }, [strokeColor, strokeWidth, triggerHaptic, pointCount, paths, onDrawingChange, maxUndoSteps]) : undefined;

    // Canvas methods
    const clearCanvas = useCallback(() => {
      if (paths.length > 0) {
        setUndoStack(prev => [...prev, paths].slice(-maxUndoSteps));
        setPaths([]);
        setRedoStack([]);
        if (currentPath.value !== undefined) {
          currentPath.value = '';
        }
        onDrawingChange?.([]);
        triggerHaptic();
      }
    }, [paths, currentPath, onDrawingChange, triggerHaptic, maxUndoSteps]);

    const undoLastStroke = useCallback(() => {
      if (undoStack.length > 0) {
        const newUndoStack = [...undoStack];
        const previousState = newUndoStack.pop()!;
        
        setUndoStack(newUndoStack);
        setRedoStack(prev => [...prev, paths]);
        setPaths(previousState);
        onDrawingChange?.(previousState);
        triggerHaptic();
      }
    }, [undoStack, paths, onDrawingChange, triggerHaptic]);

    const redoLastStroke = useCallback(() => {
      if (redoStack.length > 0) {
        const newRedoStack = [...redoStack];
        const nextState = newRedoStack.pop()!;
        
        setRedoStack(newRedoStack);
        setUndoStack(prev => [...prev, paths]);
        setPaths(nextState);
        onDrawingChange?.(nextState);
        triggerHaptic();
      }
    }, [redoStack, paths, onDrawingChange, triggerHaptic]);

    const getPaths = useCallback(() => {
      return paths;
    }, [paths]);

    const getDrawingData = useCallback(() => {
      return JSON.stringify({
        paths,
        metadata: {
          version: '1.0',
          timestamp: Date.now(),
          canvasSize: { width, height },
        }
      });
    }, [paths, width, height]);

    const loadDrawingData = useCallback((data: string) => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.paths && Array.isArray(parsed.paths)) {
          setPaths(parsed.paths);
          onDrawingChange?.(parsed.paths);
          setUndoStack([]);
          setRedoStack([]);
        }
      } catch (error) {
        console.error('Failed to load drawing data:', error);
      }
    }, [onDrawingChange]);

    const exportImage = useCallback(async () => {
      // This would use Skia's makeImageSnapshot in production
      // For now, return a placeholder
      return 'exported_image_base64';
    }, []);

    const canUndo = useCallback(() => undoStack.length > 0, [undoStack]);
    const canRedo = useCallback(() => redoStack.length > 0, [redoStack]);

    const getStats = useCallback(() => {
      const totalPoints = paths.reduce((sum, path) => sum + path.points, 0);
      return {
        pathCount: paths.length,
        totalPoints,
      };
    }, [paths]);

    // Expose methods through ref
    useImperativeHandle(ref, () => ({
      clearCanvas,
      undoLastStroke,
      redoLastStroke,
      getPaths,
      getDrawingData,
      loadDrawingData,
      exportImage,
      canUndo,
      canRedo,
      getStats,
    }), [clearCanvas, undoLastStroke, redoLastStroke, getPaths, getDrawingData, loadDrawingData, exportImage, canUndo, canRedo, getStats]);

    // Performance monitoring
    useEffect(() => {
      if (isDrawing && fps < 30) {
        console.warn(`Low FPS detected: ${fps}`);
      }
    }, [fps, isDrawing]);

    // Grid rendering helper
    const renderGrid = () => {
      if (!enableGrid || !Path) return null;
      
      const gridPath = Skia.Path.Make();
      
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        gridPath.moveTo(x, 0);
        gridPath.lineTo(x, height);
      }
      
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        gridPath.moveTo(0, y);
        gridPath.lineTo(width, y);
      }
      
      return (
        <Path
          path={gridPath.toSVGString()}
          color="#E0E0E0"
          style="stroke"
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    };

    return (
      <View style={[styles.container, { width, height }]}>
        <Canvas
          ref={canvasRef}
          style={[styles.canvas, { backgroundColor }]}
          onTouch={touchHandler}
        >
          {/* Grid layer */}
          {renderGrid()}
          
          {/* Render all completed paths */}
          {paths.map((drawingPath) => (
            <Path
              key={drawingPath.id}
              path={drawingPath.path}
              color={drawingPath.color}
              style="stroke"
              strokeWidth={drawingPath.strokeWidth}
              strokeCap="round"
              strokeJoin="round"
              opacity={drawingPath.opacity}
            />
          ))}
          
          {/* Render current drawing path */}
          {currentPath.value !== '' && (
            <Path
              path={currentPath.value}
              color={strokeColor}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              strokeJoin="round"
              opacity={1.0}
            />
          )}
        </Canvas>
        
        {/* Performance overlay (debug mode) */}
        {__DEV__ && isDrawing && (
          <View style={styles.debugOverlay}>
            <View style={[styles.fpsIndicator, fps < 30 && styles.lowFps]}>
              <Text style={styles.fpsText}>{fps} FPS</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
);

EnhancedSkiaCanvas.displayName = 'EnhancedSkiaCanvas';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  canvas: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderTopColor: '#2196F3',
  },
  debugOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fpsIndicator: {
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lowFps: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
  fpsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EnhancedSkiaCanvas;