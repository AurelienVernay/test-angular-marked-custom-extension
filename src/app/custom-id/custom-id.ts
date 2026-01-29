import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-id',
  imports: [],
  templateUrl: './custom-id.html',
  styleUrl: './custom-id.css',
})
export class CustomId {
  // this component represents the angular component that displays a source (for the moment it only displays an id but we can do whatever the fck we want with it)
  public id = input.required<number>();
}
