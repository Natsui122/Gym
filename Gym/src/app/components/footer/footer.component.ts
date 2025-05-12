import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-footer',
  imports: [MatBadgeModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
   
}

