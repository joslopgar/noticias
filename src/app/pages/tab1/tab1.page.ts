import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {Article} from "../../interfaces";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll | undefined;


  constructor(private newsService: NewsService) {

  }

  public getBusinessTopHeadlines() {
    this.newsService.getTopHeadlinesByCategory('business').subscribe(articles => {
      this.articles = articles;
    });
  }

  ngOnInit() {
    this.newsService.getTopHeadlines().subscribe(articles => {
      this.articles.push(...articles);
    });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory('business', true).subscribe(articles => {
      if (this.articles.length === articles.length) {
        this.infiniteScroll!.disabled = true;
        return;
      }
      this.articles = articles;


      setTimeout(() => {
        this.infiniteScroll?.complete();
      }, 1000)
    });
  }


}
