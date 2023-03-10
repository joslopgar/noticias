import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Article} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  get getLocalArticles(): Article[] {
    return [...this._localArticles];
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }

  async saveRemoveArticle(article: Article) {

    if (!this.articleAlreadyFavorited(article)) {
      this._localArticles = [article, ...this._localArticles];
      await this._storage?.set('articles', this._localArticles);
    }
  }

  articleAlreadyFavorited(article: Article) {
    return this._localArticles.includes(article);
  }

  async loadFavorites() {
    try {
      const articles = await this._storage?.get('articles');
      this._localArticles = articles || [];
    } catch (error) {

    }

    //return this._localArticles;
  }


}
