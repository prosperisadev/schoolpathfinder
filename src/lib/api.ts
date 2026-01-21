// API client for communicating with the API server
// In production (Vercel), use relative paths. In development, use localhost

const getApiUrl = () => {
  // In production (Vercel), use relative paths (same origin)
  // This ensures we always hit the serverless functions in /api/
  if (import.meta.env.PROD) {
    return "";
  }
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use localhost Express server
  return "http://localhost:3001";
};

const API_URL = getApiUrl();

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('[fetchApi] Request:', {
      url,
      method: options.method || 'GET',
      hasBody: !!options.body,
      bodyPreview: options.body ? String(options.body).substring(0, 200) + '...' : null
    });
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    console.log('[fetchApi] Response:', {
      url,
      status: response.status,
      ok: response.ok,
      hasData: !!data,
      hasError: !!(data && data.error),
      errorPreview: data.error ? String(data.error).substring(0, 200) + '...' : null
    });

    if (!response.ok) {
      return { error: data.error || "Request failed" };
    }

    return { data };
  } catch (error) {
    console.error("[fetchApi] Network error:", error);
    return { error: "Network error" };
  }
}

// ==================== ACCESS CODE API ====================

export interface ValidateCodeResponse {
  valid: boolean;
  expiresAt?: string;
  message?: string;
  error?: string;
}

export async function validateAccessCode(
  code: string,
  email: string
): Promise<ValidateCodeResponse> {
  const response = await fetchApi<ValidateCodeResponse>("/api/validate-access-code", {
    method: "POST",
    body: JSON.stringify({ code, email }),
  });

  if (response.error) {
    return { valid: false, error: response.error };
  }

  return response.data || { valid: false, error: "Unknown error" };
}

// ==================== SESSION API ====================

export interface Session {
  id: string;
  email: string;
  fullName?: string;
  assessmentData?: Record<string, unknown>;
  paymentStatus: string;
  transactionReference?: string;
  paidAt?: string;
  expiresAt?: string;
  accessCode?: string;
  shareToken?: string;
  academicTrack?: string;
  department?: string;
  waecEstimate?: string;
  jambEstimate?: string;
  learningStyle?: string;
  isShared: boolean;
  shareCreatedAt?: string;
  recommendations?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export async function getSessionByShareToken(token: string): Promise<Session | null> {
  const response = await fetchApi<Session>(`/api/session-by-token/${token}`);
  return response.data || null;
}

export async function saveSession(sessionData: Partial<Session>): Promise<Session | null> {
  console.log('[api.ts] saveSession called with data:', {
    email: sessionData.email,
    fullName: sessionData.fullName,
    shareToken: sessionData.shareToken,
    hasAssessmentData: !!sessionData.assessmentData,
    hasRecommendations: !!sessionData.recommendations,
    keys: Object.keys(sessionData)
  });
  
  const response = await fetchApi<Session>("/api/sessions", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
  
  console.log('[api.ts] saveSession response:', {
    hasData: !!response.data,
    hasError: !!response.error,
    error: response.error
  });
  
  if (response.error) {
    console.error('[api.ts] saveSession error details:', response.error);
    throw new Error(response.error);
  }
  return response.data || null;
}

export async function generateShareToken(email: string): Promise<string | null> {
  const response = await fetchApi<{ shareToken: string }>(`/api/share-token/${encodeURIComponent(email)}`, {
    method: "PATCH",
  });
  return response.data?.shareToken || null;
}

// ==================== UNIVERSITY API ====================

export interface UniversityRecommendation {
  id: string;
  name: string;
  country: string;
  region: string;
  globalRank?: number;
  countryRank?: number;
  rankingScore: string;
  website?: string;
  courseRankingScore: string;
  programStrength?: string;
}

export async function getUniversitiesForCourse(
  courseId: string,
  location: string = "nigeria"
): Promise<UniversityRecommendation[]> {
  const response = await fetchApi<UniversityRecommendation[]>(
    `/api/universities?courseId=${encodeURIComponent(courseId)}&location=${location}`
  );
  return response.data || [];
}

export async function getAllUniversities(): Promise<UniversityRecommendation[]> {
  const response = await fetchApi<UniversityRecommendation[]>("/api/universities");
  return response.data || [];
}
