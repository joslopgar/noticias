import {Component, Input} from '@angular/core';
import {Article} from "../../interfaces";
import {Browser} from "@capacitor/browser";
import {Share} from "@capacitor/share";
import {ActionSheetController} from "@ionic/angular";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article = {} as Article;
  @Input() index: number = 0;

  constructor(
    private actionSheetController: ActionSheetController,
    private storageService: StorageService,
    ) {
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

  private async onShareArticle() {
    await Share.share({
      title: this.article.title,
      text: '¡Mira qué artículo he encontrado!',
      url: this.article.url,
      dialogTitle: 'Compartir'
    });
  }

  private async onToggleFavorite() {
    await this.storageService.saveRemoveArticle(this.article);
  }
}
