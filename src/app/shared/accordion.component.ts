import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  //content projection
  // 3 variables as input (title, viewed, isHidden)
  @Input() cardTitle: string;
  @Input() isViewed: boolean;
  @Input() isHidden = false;

  constructor() { }

  ngOnInit(): void {
  }

}
