import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  version = 'dev'
  constructor() { }

  ngOnInit(): void {
  }

}
