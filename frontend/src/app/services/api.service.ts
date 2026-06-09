import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseURL = 'http://localhost:3000';

    constructor() {}

  // Centralizador de peticiones de manera directa
    async get(endpoint: string) {
    const response = await axios.get(`${this.baseURL}/${endpoint}`);
    return response.data;
    }

    async post(endpoint: string, data: any) {
    const response = await axios.post(`${this.baseURL}/${endpoint}`, data);
    return response.data;
    }

    async put(endpoint: string, data: any) {
    const response = await axios.put(`${this.baseURL}/${endpoint}`, data);
    return response.data;
    }
}