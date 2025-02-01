import { useState, useCallback } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { debug } from '@tauri-apps/plugin-log';

interface FilePickerProps {
  onFileSelect: (filePath: string, content: string) => void;
}

function FilePicker({ onFileSelect }: FilePickerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith('.srt') || file.name.endsWith('.vtt')) {
          try {
            const content = await readTextFile(file.name);
            onFileSelect(file.name, content);
          } catch (error) {
            console.error('Error reading file:', error);
            alert('Error reading file');
          }
        } else {
          alert('Please select a subtitle file (.srt or .vtt)');
        }
      }
    },
    [onFileSelect]
  );

  const handleClick = useCallback(async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'Subtitle Files',
          extensions: ['srt', 'vtt']
        }]
      });

      debug("Selected " + selected)
      if (selected) {
        try {
          const content = await readTextFile(selected as string);
          debug("Content: " + content)
          onFileSelect(selected as string, content);
        } catch (error) {
          console.error('Error reading file:', error);
          alert('Error reading file');
        }
      }

    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`m-2 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="text-center">
        <p className="text-gray-600">
          {isDragging ? 'Drop subtitle file here' : 'Click or drag subtitle file here'}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Supports .srt and .vtt files
        </p>
      </div>
    </div>
  );
}

export default FilePicker;