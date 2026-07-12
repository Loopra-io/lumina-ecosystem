export type Json = string | number | boolean | null | {
    [key: string]: Json;
} | Json[];
export type TipoDocumento = 'TI' | 'CC' | 'CE' | 'PASAPORTE';
export type RolUsuario = 'SUPER_ADMIN' | 'ADMINISTRATIVO' | 'PROFESOR' | 'ESTUDIANTE';
export type DiaSemana = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES' | 'SABADO' | 'DOMINGO';
export interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    doc_type: TipoDocumento;
    doc_number: string;
    role: RolUsuario;
    created_at: string;
}
export interface AcademicPeriod {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
}
export interface Classroom {
    id: string;
    name: string;
    capacity: number;
    created_at: string;
}
export interface Subject {
    id: string;
    name: string;
    created_at: string;
}
export interface Course {
    id: string;
    name: string;
    period_id: string;
    created_at: string;
}
export interface CourseSubject {
    id: string;
    course_id: string;
    subject_id: string;
    weekly_hours: number;
    created_at: string;
}
export interface Enrollment {
    id: string;
    student_id: string;
    course_id: string;
    created_at: string;
}
export interface AcademicLoad {
    id: string;
    course_subject_id: string;
    teacher_id: string;
    created_at: string;
}
export interface TimeSlot {
    id: string;
    period_id: string;
    day_of_week: DiaSemana;
    start_time: string;
    end_time: string;
    created_at: string;
}
export interface TeacherAvailability {
    id: string;
    teacher_id: string;
    time_slot_id: string;
    is_available: boolean;
}
export interface Schedule {
    id: string;
    academic_load_id: string;
    time_slot_id: string;
    classroom_id: string;
    created_at: string;
}
export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
}
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Omit<Profile, 'created_at'> & {
                    id: string;
                };
                Update: Partial<Profile> & {
                    id?: string;
                };
                Relationships: [];
            };
            academic_periods: {
                Row: AcademicPeriod;
                Insert: Omit<AcademicPeriod, 'created_at'> & Partial<Pick<AcademicPeriod, 'id' | 'is_active'>>;
                Update: Partial<AcademicPeriod>;
                Relationships: [];
            };
            classrooms: {
                Row: Classroom;
                Insert: Omit<Classroom, 'created_at'> & Partial<Pick<Classroom, 'id'>>;
                Update: Partial<Classroom>;
                Relationships: [];
            };
            subjects: {
                Row: Subject;
                Insert: Omit<Subject, 'created_at'> & Partial<Pick<Subject, 'id'>>;
                Update: Partial<Subject>;
                Relationships: [];
            };
            courses: {
                Row: Course;
                Insert: Omit<Course, 'created_at'> & Partial<Pick<Course, 'id'>>;
                Update: Partial<Course>;
                Relationships: [];
            };
            course_subjects: {
                Row: CourseSubject;
                Insert: Omit<CourseSubject, 'created_at'> & Partial<Pick<CourseSubject, 'id'>>;
                Update: Partial<CourseSubject>;
                Relationships: [];
            };
            enrollments: {
                Row: Enrollment;
                Insert: Omit<Enrollment, 'created_at'> & Partial<Pick<Enrollment, 'id'>>;
                Update: Partial<Enrollment>;
                Relationships: [];
            };
            academic_load: {
                Row: AcademicLoad;
                Insert: Omit<AcademicLoad, 'created_at'> & Partial<Pick<AcademicLoad, 'id'>>;
                Update: Partial<AcademicLoad>;
                Relationships: [];
            };
            time_slots: {
                Row: TimeSlot;
                Insert: Omit<TimeSlot, 'created_at'> & Partial<Pick<TimeSlot, 'id'>>;
                Update: Partial<TimeSlot>;
                Relationships: [];
            };
            teacher_availability: {
                Row: TeacherAvailability;
                Insert: Omit<TeacherAvailability, 'created_at'> & Partial<Pick<TeacherAvailability, 'id' | 'is_available'>>;
                Update: Partial<TeacherAvailability>;
                Relationships: [];
            };
            schedules: {
                Row: Schedule;
                Insert: Omit<Schedule, 'created_at'> & Partial<Pick<Schedule, 'id'>>;
                Update: Partial<Schedule>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: {
            tipo_documento: TipoDocumento;
            rol_usuario: RolUsuario;
            dia_semana: DiaSemana;
        };
    };
}
export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
//# sourceMappingURL=database.types.d.ts.map