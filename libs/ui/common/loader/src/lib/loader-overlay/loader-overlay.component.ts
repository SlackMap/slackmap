import { Component, OnInit } from '@angular/core';
import { Loader } from '../loader';

@Component({
  selector: 'sm-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss']
})
export class LoaderOverlayComponent implements OnInit {

  constructor(
    public loader: Loader
  ) { }

  ngOnInit(): void {
  }

}
