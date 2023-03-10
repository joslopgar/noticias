import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Article, ArticlesByCategoryAndPage, NewsResponse} from "../interfaces";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  getTopHeadlines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');

    /*return this.http.get<NewsResponse>(
      `https://newsapi.org/v2/top-headlines?country=us&category=business`,
      {
        params: {
          apiKey,
        }
      }).pipe(
      map(resp => resp.articles)
    );*/
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // Ya existe la categoria, no hacer nada.
    } else {
      // No existe la categoria, crearla.
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    console.log('Peticion http generada!');

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}`, {
      params: {
        apiKey,
      }
    }).pipe(
      map(resp => {

        // Si no hay mas articulos, regresar un array vacio.
        if (resp.articles.length === 0) return [];

        // Si hay mas articulos, actualizar el objeto de la categoria.
        this.articlesByCategoryAndPage[category] = {
          page,
          articles:  [...this.articlesByCategoryAndPage[category].articles, ...resp.articles]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}
