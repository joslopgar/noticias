import {Component, Input} from '@angular/core';
import {Article} from "../../interfaces";
import {Browser} from "@capacitor/browser";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article = {} as Article;
  @Input() index: number = 0;

  constructor(private actionSheetController: ActionSheetController) {
  }

  openArticle = async () => {
    await Browser.open({url: this.article.url});
  }

  async onOpenMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => {
            this.onShareArticle();
          }
        }, {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => {
            this.onToggleFavorite();
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  private onShareArticle() {

  }

  private onToggleFavorite() {

  }
}
