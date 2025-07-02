// src/engines/drawing/index.ts - FIXED EXPORTS

// FIXED: Export the BrushSystem class and functions properly
export {
  defaultBrushes,
  createBrush,
  getBrushById,
  getBrushesByCategory,
  calculateBrushSize,
  calculateBrushOpacity,
  validateBrushSettings,
  brushTextures,
  analyzeBrushUsage,
} from './BrushSystem';

// FIXED: Export default object as named export BrushSystem
import BrushSystemDefault from './BrushSystem';
export const BrushSystem = BrushSystemDefault;

// Export drawing engine
export { DrawingEngine, drawingEngine } from './DrawingEngine';

// Export types
export type {
  Point,
  Stroke,
  BrushSettings,
  Layer,
  CanvasState,
  DrawingStats,
} from './DrawingEngine';

export type {
  BrushCategory,
  BrushPreset,
  BrushDynamics,
} from './BrushSystem';