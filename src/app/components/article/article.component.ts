import {Component, Input} from '@angular/core';
import {Article} from "../../interfaces";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article = {} as Article;
  @Input() index: number = 0;

  openArticle = async () => {
    await Browser.open({url: this.article.url});
  }

  onClick() {

  }
}
