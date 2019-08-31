import AbstractComponent from "./abstract-component";
import {sortTypes} from "../util";

export default class Sort extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort='${sortTypes.DEFAULT}'>SORT BY DEFAULT</a>
          <a href="#" class="board__filter" data-sort='${sortTypes.DATE_UP}'>SORT BY DATE up</a>
          <a href="#" class="board__filter" data-sort='${sortTypes.DATE_DOWN}'>SORT BY DATE down</a>
        </div>`;
  }
}
