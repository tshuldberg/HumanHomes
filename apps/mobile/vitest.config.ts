import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    clearMocks: true,
  },
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, 'test/mocks/react-native.ts'),
      'react-native-safe-area-context': path.resolve(
        __dirname,
        'test/mocks/react-native-safe-area-context.ts',
      ),
      '@expo/vector-icons': path.resolve(__dirname, 'test/mocks/expo-vector-icons.ts'),
    },
  },
});
