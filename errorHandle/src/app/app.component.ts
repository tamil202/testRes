import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  numberCall = 0;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  data!: any[];
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.onUpload();
  }

  onUpload(): void {
    setInterval(() => {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:3000/upload/file', formData).subscribe({
        next: (response) => console.log('Upload successful', response),
        error: (error: HttpErrorResponse) =>
          console.error('Upload error', error),
      });
      this.getAllImageData();
      this.calls();
    }, 2000);
  }

  getAllImageData = () => {
    this.http.get('http://localhost:3000/upload').subscribe({
      next: (response: any) => (this.data = response.data),
      error: (error: HttpErrorResponse) => console.error('Upload error', error),
    });
  };
  calls() {
    this.numberCall++;
  }

  selectedFiles: File | null = null; // Fix the property name to match the usage

  // Capture selected file
  onFileSelecteds(event: Event) {
    // Corrected method name to match the typical singular file selection
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files[0];
      this.uploadFile();
    }
  }

  // Upload file to server
  uploadFile() {
    setInterval(() => {
      if (this.selectedFiles) {
        // Corrected to match the property name used in both methods
        const formData = new FormData();
        formData.append('file', this.selectedFiles, this.selectedFiles.name);

        this.http.post('http://localhost:3000/upload/pdf', formData).subscribe({
          next: (response) => {
            console.log('Upload successful', response);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Upload failed', error);
          },
        });
      }
    }, 2000);
  }
}
