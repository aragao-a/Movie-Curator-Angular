import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarathonListComponent } from 'src/app/features/marathon/components/marathon-list/marathon-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MarathonListComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  title = 'CineLog';
}