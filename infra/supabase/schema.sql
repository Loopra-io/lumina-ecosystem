-- ====================================================================================================
-- Voltschedule SQL Schema for Supabase
-- Place this file in infra/supabase/schema.sql
-- ====================================================================================================

-- 1. TIPOS DE DATOS (ENUMS)

CREATE TYPE tipo_documento AS ENUM ('TI', 'CC', 'CE', 'PASAPORTE');

CREATE TYPE rol_usuario AS ENUM ('SUPER_ADMIN', 'ADMINISTRATIVO', 'PROFESOR', 'ESTUDIANTE');

CREATE TYPE dia_semana AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');


-- ====================================================================================================
-- 2. USUARIOS Y PERFILES
-- ====================================================================================================

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    doc_type tipo_documento NOT NULL,
    doc_number TEXT NOT NULL,
    role rol_usuario NOT NULL DEFAULT 'ESTUDIANTE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_document UNIQUE (doc_type, doc_number)
);


-- ====================================================================================================
-- 3. ESTRUCTURA ESCOLAR (LOS CIMIENTOS)
-- ====================================================================================================

-- Periodos académicos (Ej: Año Lectivo 2026)
CREATE TABLE public.academic_periods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salones físicos
CREATE TABLE public.classrooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Catálogo de materias
CREATE TABLE public.subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grados / Cursos (Ej: 11-A)
CREATE TABLE public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    period_id UUID REFERENCES public.academic_periods(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ====================================================================================================
-- 4. MALLA CURRICULAR Y RELACIONES
-- ====================================================================================================

-- La Malla: ¿Cuántas horas de cada materia ve cada curso?
CREATE TABLE public.course_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    weekly_hours INT NOT NULL CHECK (weekly_hours > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_course_subject UNIQUE (course_id, subject_id)
);

-- Matrículas: ¿Qué estudiante está en qué curso?
CREATE TABLE public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
);

-- Carga Académica: ¿Qué profesor dicta la materia de la malla?
CREATE TABLE public.academic_load (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_subject_id UUID REFERENCES public.course_subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_course_subject_teacher UNIQUE (course_subject_id, teacher_id)
);


-- ====================================================================================================
-- 5. VOLTSCHEDULE (TABLAS PARA EL ALGORITMO)
-- ====================================================================================================

-- Bloques de tiempo (Ej: 7:00 AM - 8:30 AM)
CREATE TABLE public.time_slots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    period_id UUID REFERENCES public.academic_periods(id) ON DELETE CASCADE,
    day_of_week dia_semana NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restricciones de Profesores (Disponibilidad)
CREATE TABLE public.teacher_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    time_slot_id UUID REFERENCES public.time_slots(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    
    CONSTRAINT unique_teacher_timeslot UNIQUE (teacher_id, time_slot_id)
);

-- Horario Final (El resultado de tu algoritmo)
CREATE TABLE public.schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    academic_load_id UUID REFERENCES public.academic_load(id) ON DELETE CASCADE,
    time_slot_id UUID REFERENCES public.time_slots(id) ON DELETE CASCADE,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Evitar que a una misma carga se le asigne el mismo bloque de tiempo dos veces
    CONSTRAINT unique_schedule_block UNIQUE (academic_load_id, time_slot_id)
);


-- ====================================================================================================
-- 6. SEGURIDAD RLS (ROW LEVEL SECURITY)
-- ====================================================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_load ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- Políticas iniciales para Perfiles (Cada usuario lee y edita el suyo)
CREATE POLICY "Lectura propia perfil" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Actualizacion propia perfil" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Políticas generales de lectura para el resto del ecosistema (cualquier usuario logueado puede ver la info escolar)
CREATE POLICY "Lectura global periodos" ON public.academic_periods FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global salones" ON public.classrooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global materias" ON public.subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global cursos" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global malla" ON public.course_subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global matriculas" ON public.enrollments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global carga" ON public.academic_load FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global bloques de tiempo" ON public.time_slots FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lectura global horarios" ON public.schedules FOR SELECT TO authenticated USING (true);

-- ====================================================================================================
-- 1. AUTOMATIZACIÓN DE PERFILES (TRIGGER)
-- ====================================================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, doc_type, doc_number, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Nombre'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Apellido'),
    COALESCE((NEW.raw_user_meta_data->>'doc_type')::tipo_documento, 'CC'),
    COALESCE(NEW.raw_user_meta_data->>'doc_number', '00000000'),
    COALESCE((NEW.raw_user_meta_data->>'role')::rol_usuario, 'ESTUDIANTE')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ====================================================================================================
-- 2. BLINDAJE DE HORARIOS (CONSTRAINTS CONTRA CRUCES)
-- ====================================================================================================

ALTER TABLE public.schedules 
ADD CONSTRAINT unique_classroom_time_slot 
UNIQUE (classroom_id, time_slot_id);

ALTER TABLE public.schedules
ADD CONSTRAINT unique_teacher_time_slot_check
UNIQUE (time_slot_id, academic_load_id);

-- 1. Borramos el trigger viejo para poder actualizarlo sin conflictos
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Creamos la función optimizada y tolerante a fallos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, doc_type, doc_number, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Nuevo'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Usuario'),
    COALESCE((NEW.raw_user_meta_data->>'doc_type')::tipo_documento, 'CC'),
    -- Usamos el ID temporalmente para garantizar que NUNCA se repita el documento en el primer registro
    COALESCE(NEW.raw_user_meta_data->>'doc_number', SUBSTRING(NEW.id::text FROM 1 FOR 8)),
    COALESCE((NEW.raw_user_meta_data->>'role')::rol_usuario, 'ESTUDIANTE')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Volvemos a encender el trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
