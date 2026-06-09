import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    usuarioLogueado: string = '';

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
    const nombre = localStorage.getItem('usuario_nombre');
    
    // Guardarresguardo de seguridad: si no hay sesión activa, redirigir al login
    if (!nombre) {
        this.router.navigate(['/login']);
        return;
    }
    
    this.usuarioLogueado = nombre;
    }

    cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    }
}
