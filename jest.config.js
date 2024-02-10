// Importa nextJest usando require
const nextJest = require('next/jest.js');

// Crea la configuración de Jest para Next.js
const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env en tu entorno de prueba
  dir: './',
});

// Agrega cualquier configuración personalizada que se pasará a Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Agrega más opciones de configuración antes de ejecutar cada prueba
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: 'ts-jest',
};

// Combina la configuración de Next.js y Jest
const finalConfig = createJestConfig(config);

// Exporta la configuración final
module.exports = finalConfig;
