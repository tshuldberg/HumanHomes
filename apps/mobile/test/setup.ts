import React from 'react';
import '@testing-library/jest-dom/vitest';

(globalThis as { React?: typeof React }).React = React;
