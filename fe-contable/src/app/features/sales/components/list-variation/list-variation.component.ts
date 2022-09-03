import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Variation } from '../../models/variation';

@Component({
  selector: 'app-list-variation',
  templateUrl: './list-variation.component.html',
  styleUrls: ['./list-variation.component.scss'],
})
export class ListVariationComponent implements OnInit {
  @Input() items = [];
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSaleVariation = new EventEmitter<Variation>();

  constructor() {}

  ngOnInit() {}

  refreshSaleVariation(data: any) {}
}
