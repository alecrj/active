import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  useCanvasRef,
  useTouchHandler,
  useSharedValue,
} from '@shopify/react-native-skia';

interface DrawingPath {
  path: string;
  color: string;
  strokeWidth: number;
  opacity: number;
  id: string;
}

interface ModernSkiaCanvasProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
}

export interface ModernSkiaCanvasRef {
  clearCanvas: () => void;
  undoLastStroke: () => void;
  getPaths: () => DrawingPath[];
}

export const ModernSkiaCanvas = forwardRef<ModernSkiaCanvasRef, ModernSkiaCanvasProps>(
  ({
    width = Dimensions.get('window').width,
    height = Dimensions.get('window').height * 0.7,
    strokeWidth = 5,
    strokeColor = '#000000',
    backgroundColor = '#FFFFFF',
  }, ref) => {
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const currentPath = useSharedValue<string>('');
    const canvasRef = useCanvasRef();

    // Generate unique ID for each path
    const generatePathId = () => `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create path helper
    const createPath = useCallback(() => {
      return Skia.Path.Make();
    }, []);

    // Handle pressure sensitivity
    const getPressure = (event: any): number => {
      const pressure = event.force || 1.0;
      return Math.min(Math.max(pressure, 0.1), 1.0);
    };

    // Modern touch handler optimized for Skia 1.3.13
    const touchHandler = useTouchHandler({
      onStart: (event) => {
        const path = createPath();
        const pressure = getPressure(event);
        path.moveTo(event.x, event.y);
        currentPath.value = path.toSVGString();
      },
      onActive: (event) => {
        const path = Skia.Path.MakeFromSVGString(currentPath.value || '');
        if (path) {
          const pressure = getPressure(event);
          path.lineTo(event.x, event.y);
          currentPath.value = path.toSVGString();
        }
      },
      onEnd: () => {
        if (currentPath.value) {
          const newPath: DrawingPath = {
            path: currentPath.value,
            color: strokeColor,
            strokeWidth: strokeWidth * (Math.random() * 0.3 + 0.85), // Slight variation
            opacity: 1.0,
            id: generatePathId(),
          };
          
          setPaths(prev => [...prev, newPath]);
          currentPath.value = '';
        }
      },
    }, [strokeColor, strokeWidth]);

    // Canvas methods
    const clearCanvas = useCallback(() => {
      setPaths([]);
      currentPath.value = '';
    }, [currentPath]);

    const undoLastStroke = useCallback(() => {
      setPaths(prev => prev.slice(0, -1));
    }, []);

    const getPaths = useCallback(() => {
      return paths;
    }, [paths]);

    // Expose methods through ref
    useImperativeHandle(ref, () => ({
      clearCanvas,
      undoLastStroke,
      getPaths,
    }), [clearCanvas, undoLastStroke, getPaths]);

    return (
      <View style={[styles.container, { width, height }]}>
        <Canvas
          ref={canvasRef}
          style={[styles.canvas, { backgroundColor }]}
          onTouch={touchHandler}
        >
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
      </View>
    );
  }
);

ModernSkiaCanvas.displayName = 'ModernSkiaCanvas';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
});

export default ModernSkiaCanvas;