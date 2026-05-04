/**
 * API Service Layer
 * 
 * This file serves as a placeholder for API calls that will replace static data.
 * Currently returns mock data but can be easily replaced with actual API calls.
 * 
 * Future use cases:
 * - Fetch projects from backend
 * - Fetch services dynamically
 * - Submit contact forms to API
 * - Authenticate users
 */

import { Project, Service, Client, ContactFormData, ApiResponse } from '@/types';
import { projectsData } from '@/data/projects';
import { servicesData } from '@/data/services';
import { clientsData } from '@/data/clients';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Projects API
export async function fetchProjects(): Promise<Project[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/projects`);
  // return response.json();
  
  return projectsData;
}

export async function fetchProjectById(id: string): Promise<Project | undefined> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  // return response.json();
  
  return projectsData.find((p) => p.id === id);
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/projects?featured=true`);
  // return response.json();
  
  return projectsData.filter((p) => p.featured);
}

// Services API
export async function fetchServices(): Promise<Service[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services`);
  // return response.json();
  
  return servicesData;
}

export async function fetchServiceById(id: string): Promise<Service | undefined> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/services/${id}`);
  // return response.json();
  
  return servicesData.find((s) => s.id === id);
}

// Clients API
export async function fetchClients(): Promise<Client[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/clients`);
  // return response.json();
  
  return clientsData;
}

// Contact Form Submission
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Vendor Inquiry Submission
export async function submitVendorInquiry(data: any): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/vendor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit vendor inquiry');
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
