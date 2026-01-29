import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-id',
  imports: [],
  templateUrl: './custom-id.html',
  styleUrl: './custom-id.css',
})
export class CustomId {

  public id = input.required<number>();
}
