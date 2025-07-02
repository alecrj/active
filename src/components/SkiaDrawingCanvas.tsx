import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';

// Conditional import for Skia to handle web loading
let Canvas: any, Path: any, Skia: any, useCanvasRef: any, useTouchHandler: any, useSharedValue: any;
let Paint: any, PaintStyle: any, StrokeCap: any, StrokeJoin: any;

try {
  const SkiaModule = require('@shopify/react-native-skia');
  Canvas = SkiaModule.Canvas;
  Path = SkiaModule.Path;
  Skia = SkiaModule.Skia;
  useCanvasRef = SkiaModule.useCanvasRef;
  useTouchHandler = SkiaModule.useTouchHandler;
  useSharedValue = SkiaModule.useSharedValue;
  Paint = SkiaModule.Paint;
  PaintStyle = SkiaModule.PaintStyle;
  StrokeCap = SkiaModule.StrokeCap;
  StrokeJoin = SkiaModule.StrokeJoin;
} catch (error) {
  console.warn('Skia not available:', error);
}

interface DrawingPath {
  path: string;
  color: string;
  strokeWidth: number;
  opacity: number;
}

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
}

export const SkiaDrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height * 0.7,
  strokeWidth = 5,
  strokeColor = '#000000',
  backgroundColor = '#FFFFFF'
}) => {
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const currentPath = useSharedValue ? useSharedValue<string>('') : { value: '' };
  const canvasRef = useCanvasRef ? useCanvasRef() : null;

  // Fallback if Skia is not available
  if (!Canvas || !Skia) {
    return (
      <View style={[styles.container, { width, height, backgroundColor }]}>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            Drawing canvas loading...
          </Text>
        </View>
      </View>
    );
  }

  // Create path for current stroke
  const createPath = useCallback(() => {
    return Skia.Path.Make();
  }, []);

  // Handle pressure sensitivity (if available)
  const getPressure = (event: any): number => {
    const pressure = event.force || 1.0;
    return Math.min(Math.max(pressure, 0.1), 1.0);
  };

  // Touch handler for drawing
  const touchHandler = useTouchHandler({
    onStart: (event) => {
      const path = createPath();
      const pressure = getPressure(event);
      const dynamicWidth = strokeWidth * pressure;
      
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
          strokeWidth: strokeWidth,
          opacity: 1.0
        };
        
        setPaths(prev => [...prev, newPath]);
        currentPath.value = '';
      }
    }
  });

  // Create paint for strokes
  const createPaint = (color: string, width: number, opacity: number) => {
    const paint = Skia.Paint();
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeWidth(width);
    paint.setColor(Skia.Color(color));
    paint.setAntiAlias(true);
    paint.setStrokeCap(StrokeCap.Round);
    paint.setStrokeJoin(StrokeJoin.Round);
    paint.setAlphaf(opacity);
    return paint;
  };

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setPaths([]);
    currentPath.value = '';
  }, [currentPath]);

  // Undo last stroke
  const undoLastStroke = useCallback(() => {
    setPaths(prev => prev.slice(0, -1));
  }, []);

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Canvas
        ref={canvasRef}
        style={styles.canvas}
        onTouch={touchHandler}
      >
        {/* Background */}
        <Paint color={backgroundColor} />
        
        {/* Render completed paths */}
        {paths.map((drawingPath, index) => (
          <Path
            key={index}
            path={drawingPath.path}
            paint={createPaint(
              drawingPath.color, 
              drawingPath.strokeWidth, 
              drawingPath.opacity
            )}
          />
        ))}
        
        {/* Render current path being drawn */}
        {currentPath.value !== '' && (
          <Path
            path={currentPath.value}
            paint={createPaint(strokeColor, strokeWidth, 1.0)}
          />
        )}
      </Canvas>
    </View>
  );
};

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
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  fallbackText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SkiaDrawingCanvas;