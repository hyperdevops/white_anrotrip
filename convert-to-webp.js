import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Директория с исходными изображениями
// const inputDir = './src/assets/tours';
const inputDir = '.';
// Директория для сохранения конвертированных изображений
// const outputDir = './src/assets/tours';
const outputDir = '.';

// Поддерживаемые форматы изображений
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.avif'];

async function convertToWebP() {
  console.log('Начинаю конвертацию изображений в формат WebP...');
  
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const fileExt = path.extname(file).toLowerCase();
    
    // Проверяем, является ли файл изображением поддерживаемого формата
    if (supportedFormats.includes(fileExt)) {
      // Если файл уже в формате WebP, пропускаем его
      if (fileExt === '.webp') {
        console.log(`Файл ${file} уже в формате WebP, пропускаю...`);
        continue;
      }
      
      const outputFileName = path.basename(file, fileExt) + '.webp';
      const outputPath = path.join(outputDir, outputFileName);
      
      try {
        await sharp(filePath)
          .webp({ 
            quality: 80,           // Качество 80 для баланса между размером и качеством
            lossless: false,       // Сжатие с потерями для меньшего размера
            effort: 4              // Баланс между скоростью и эффективностью сжатия
          })
          .toFile(outputPath);
          
        console.log(`Конвертировано: ${file} -> ${outputFileName}`);
        
        // Удаляем исходный файл, если он не в формате WebP
        fs.unlinkSync(filePath);
        console.log(`Удален исходный файл: ${file}`);
      } catch (error) {
        console.error(`Ошибка при конвертации файла ${file}:`, error);
      }
    } else {
      console.log(`Файл ${file} не поддерживается, пропускаю...`);
    }
  }
  
  console.log('Конвертация завершена!');
}

// Запуск конвертации
convertToWebP().catch(console.error);
