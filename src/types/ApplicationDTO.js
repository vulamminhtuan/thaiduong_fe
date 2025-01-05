// src/types/ApplicationDTO.js
export interface ApplicationDTO {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume: string; // Tên tệp
    jobId: number;
    status: string;
    resumeUrl: string; // URL để truy cập resume
  }
