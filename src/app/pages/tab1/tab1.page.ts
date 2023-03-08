import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {Article} from "../../interfaces";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {

  }

  ngOnInit() {
    this.newsService.getTopHeadlines()
      .subscribe(resp => this.articles.push(...resp));
  }

}
