import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {Article} from "../../interfaces";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll | undefined;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles => {
      this.articles = [...articles];
    });
  }

  segmentChanged(e: any) {
    this.selectedCategory = e.detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles => {
      this.articles = articles;
    });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true).subscribe(articles => {
      if (this.articles.length  === articles.length) {
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
