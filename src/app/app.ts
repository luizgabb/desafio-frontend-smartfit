import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component/header';
import { Forms } from "./components/forms/forms";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Forms],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('desafio-smartfit');
}
