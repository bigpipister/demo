-- 教學課程表
CREATE TABLE tutorials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content LONGTEXT,
  category VARCHAR(100),
  level ENUM('初級', '中級', '高級') DEFAULT '初級',
  duration VARCHAR(50),
  image_url VARCHAR(500),
  instructor_id INT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  students_count INT DEFAULT 0,
  lessons_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 課程章節表
CREATE TABLE tutorial_chapters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tutorial_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutorial_id) REFERENCES tutorials(id) ON DELETE CASCADE
);

-- 課程課時表
CREATE TABLE tutorial_lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chapter_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT,
  video_url VARCHAR(500),
  duration VARCHAR(50),
  type ENUM('video', 'text', 'practice') DEFAULT 'video',
  order_index INT NOT NULL,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES tutorial_chapters(id) ON DELETE CASCADE
);

-- 講師表
CREATE TABLE instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200),
  bio TEXT,
  avatar_url VARCHAR(500),
  email VARCHAR(255) UNIQUE,
  students_count INT DEFAULT 0,
  courses_count INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用戶表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url VARCHAR(500),
  role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用戶課程進度表
CREATE TABLE user_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES tutorial_lessons(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_lesson (user_id, lesson_id)
);

-- 課程評價表
CREATE TABLE tutorial_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tutorial_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tutorial_id) REFERENCES tutorials(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_tutorial (user_id, tutorial_id)
);

-- 插入範例數據
INSERT INTO instructors (name, title, bio, avatar_url, email) VALUES
('張小明', '資深前端工程師', '擁有 8 年前端開發經驗，專精於 Vue.js 生態系統', 'https://via.placeholder.com/80x80?text=張小明', 'zhang@example.com'),
('李小華', '全端開發專家', '精通前後端開發，有豐富的教學經驗', 'https://via.placeholder.com/80x80?text=李小華', 'li@example.com');

INSERT INTO tutorials (title, description, category, level, duration, instructor_id, rating, students_count, lessons_count, is_published) VALUES
('Vue 3 基礎入門', '從零開始學習 Vue 3 的核心概念，包括響應式數據、組件開發和 Composition API', 'Vue.js', '初級', '2小時', 1, 4.8, 1250, 8, true),
('Vite 構建工具詳解', '深入了解 Vite 的特性和配置，學習如何優化開發環境和構建流程', '工具', '中級', '1.5小時', 2, 4.6, 890, 6, true),
('Element Plus 組件庫', '掌握 Element Plus 組件的使用技巧，學習如何自定義主題和組件', 'Vue.js', '初級', '3小時', 1, 4.7, 2100, 12, true);
