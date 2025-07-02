import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Palette, Undo2, RotateCcw, Settings } from 'lucide-react-native';
import SkiaDrawingCanvas from '../../src/components/SkiaDrawingCanvas';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function DrawScreen() {
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Draw</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Drawing Canvas */}
      <View style={styles.canvasContainer}>
        <SkiaDrawingCanvas
          width={screenWidth - 32}
          height={screenHeight * 0.6}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          backgroundColor="#FFFFFF"
        />
      </View>

      {/* Brush Size Selector */}
      <View style={styles.brushSizeContainer}>
        <Text style={styles.sectionTitle}>Brush Size</Text>
        <View style={styles.brushSizeRow}>
          {brushSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.brushSizeButton,
                strokeWidth === size && styles.selectedBrushSize
              ]}
              onPress={() => setStrokeWidth(size)}
            >
              <View 
                style={[
                  styles.brushPreview,
                  { 
                    width: size + 10, 
                    height: size + 10,
                    backgroundColor: strokeWidth === size ? strokeColor : '#CCCCCC'
                  }
                ]} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Color Palette */}
      <View style={styles.colorContainer}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.colorRow}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                strokeColor === color && styles.selectedColor
              ]}
              onPress={() => setStrokeColor(color)}
            />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Undo2 size={20} color="#000" />
          <Text style={styles.actionText}>Undo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <RotateCcw size={20} color="#000" />
          <Text style={styles.actionText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Palette size={20} color="#000" />
          <Text style={styles.actionText}>More</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsButton: {
    padding: 8,
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  brushSizeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  brushSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  brushSizeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedBrushSize: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  brushPreview: {
    borderRadius: 50,
  },
  colorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
});