import type { ApiResponse } from './auth.service';
export type Profile = {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    updated_at: string | null;
};
export declare function getMyProfile(): Promise<ApiResponse<Profile>>;
export declare function upsertMyProfile(input: {
    full_name?: string | null;
    avatar_url?: string | null;
}): Promise<ApiResponse<Profile>>;
//# sourceMappingURL=profile.service.d.ts.map