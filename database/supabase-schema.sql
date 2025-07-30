-- Supabase 資料庫建立腳本
-- 在 Supabase SQL Editor 中執行

-- 講師表
CREATE TABLE public.instructors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200),
  bio TEXT,
  avatar_url VARCHAR(500),
  email VARCHAR(255) UNIQUE,
  students_count INTEGER DEFAULT 0,
  courses_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 教學課程表
CREATE TABLE public.tutorials (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  category VARCHAR(100),
  level VARCHAR(20) CHECK (level IN ('初級', '中級', '高級')) DEFAULT '初級',
  duration VARCHAR(50),
  image_url VARCHAR(500),
  instructor_id BIGINT REFERENCES public.instructors(id),
  rating DECIMAL(2,1) DEFAULT 0.0,
  students_count INTEGER DEFAULT 0,
  lessons_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 課程章節表
CREATE TABLE public.tutorial_chapters (
  id BIGSERIAL PRIMARY KEY,
  tutorial_id BIGINT NOT NULL REFERENCES public.tutorials(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 課程課時表
CREATE TABLE public.tutorial_lessons (
  id BIGSERIAL PRIMARY KEY,
  chapter_id BIGINT NOT NULL REFERENCES public.tutorial_chapters(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(500),
  duration VARCHAR(50),
  type VARCHAR(20) CHECK (type IN ('video', 'text', 'practice')) DEFAULT 'video',
  order_index INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 用戶資料表（擴展 auth.users）
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(20) CHECK (role IN ('student', 'instructor', 'admin')) DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 用戶課程進度表
CREATE TABLE public.user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id BIGINT NOT NULL REFERENCES public.tutorial_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- 課程評價表
CREATE TABLE public.tutorial_reviews (
  id BIGSERIAL PRIMARY KEY,
  tutorial_id BIGINT NOT NULL REFERENCES public.tutorials(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, tutorial_id)
);

-- 插入範例講師數據
INSERT INTO public.instructors (name, title, bio, avatar_url, email) VALUES
('張小明', '資深前端工程師', '擁有 8 年前端開發經驗，專精於 Vue.js 生態系統', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&face=center', 'zhang@example.com'),
('李小華', '全端開發專家', '精通前後端開發，有豐富的教學經驗', 'https://images.unsplash.com/photo-1494790108755-2616b612b6fd?w=80&h=80&fit=crop&auto=format&face=center', 'li@example.com'),
('王小強', '前端架構師', '專注於現代化前端工具鏈和最佳實踐', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&face=center', 'wang@example.com');

-- 插入範例教學數據
INSERT INTO public.tutorials (title, description, category, level, duration, image_url, instructor_id, rating, students_count, lessons_count, is_published) VALUES
('Vue 3 基礎入門', '從零開始學習 Vue 3 的核心概念，包括響應式數據、組件開發和 Composition API。通過實際項目練習，掌握現代前端開發技能。', 'Vue.js', '初級', '2小時', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&auto=format', 1, 4.8, 1250, 8, true),
('Vite 構建工具詳解', '深入了解 Vite 的特性和配置，學習如何優化開發環境和構建流程。掌握現代前端構建工具的使用技巧。', '工具', '中級', '1.5小時', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format', 2, 4.6, 890, 6, true),
('Element Plus 組件庫', '掌握 Element Plus 組件的使用技巧，學習如何自定義主題和組件。構建美觀實用的前端界面。', 'Vue.js', '初級', '3小時', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format', 1, 4.7, 2100, 12, true),
('JavaScript ES6+ 進階', '深入學習現代 JavaScript 特性，包括異步編程、模組化和新語法。提升 JavaScript 編程技能。', 'JavaScript', '中級', '4小時', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop&auto=format', 3, 4.9, 3200, 15, true),
('Vue Router 4 路由管理', '學習 Vue Router 4 的新特性，實現單頁應用的路由管理。掌握現代 SPA 開發技巧。', 'Vue.js', '高級', '2小時', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop&auto=format', 1, 4.6, 950, 8, true);

-- 插入範例章節和課時數據
INSERT INTO public.tutorial_chapters (tutorial_id, title, description, order_index) VALUES
(1, 'Vue 3 介紹與環境設置', '了解 Vue 3 的新特性並設置開發環境', 1),
(1, 'Composition API 基礎', '學習 Vue 3 的 Composition API', 2),
(1, '組件開發實戰', '實際開發 Vue 3 組件', 3);

INSERT INTO public.tutorial_lessons (chapter_id, title, content, duration, type, order_index, is_free) VALUES
(1, 'Vue 3 新特性概覽', '介紹 Vue 3 相較於 Vue 2 的主要改進和新功能', '10分鐘', 'video', 1, true),
(1, '開發環境設置', '安裝 Node.js、Vue CLI 和配置開發環境', '15分鐘', 'video', 2, true),
(1, '創建第一個 Vue 3 應用', '使用 Vite 創建並運行第一個 Vue 3 專案', '20分鐘', 'video', 3, false),
(2, 'setup 函數介紹', '深入了解 Composition API 的核心 setup 函數', '18分鐘', 'video', 1, false),
(2, 'ref 和 reactive', '學習響應式數據的創建和使用', '25分鐘', 'video', 2, false),
(3, '組件基礎與 Props', '創建可重用組件並傳遞數據', '22分鐘', 'video', 1, false);

-- 設置 Row Level Security (RLS) 政策
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorial_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorial_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorial_reviews ENABLE ROW LEVEL SECURITY;

-- 允許讀取已發布的公開內容
CREATE POLICY "Enable read access for published tutorials" ON public.tutorials
FOR SELECT USING (is_published = true);

CREATE POLICY "Enable read access for instructors" ON public.instructors
FOR SELECT USING (true);

CREATE POLICY "Enable read access for tutorial chapters" ON public.tutorial_chapters
FOR SELECT USING (true);

CREATE POLICY "Enable read access for tutorial lessons" ON public.tutorial_lessons
FOR SELECT USING (true);

-- 用戶只能讀寫自己的數據
CREATE POLICY "Users can view own profile" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON public.user_progress
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reviews" ON public.tutorial_reviews
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own reviews" ON public.tutorial_reviews
FOR ALL USING (auth.uid() = user_id);

-- 創建用戶註冊時自動創建 profile 的觸發器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 創建更新 updated_at 欄位的觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tutorials_updated_at BEFORE UPDATE ON public.tutorials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
