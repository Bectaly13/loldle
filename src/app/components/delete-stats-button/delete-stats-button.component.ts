import { Component } from '@angular/core';
import { AlertController, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-delete-stats-button',
  templateUrl: './delete-stats-button.component.html',
  styleUrls: ['./delete-stats-button.component.scss'],
  imports: [ IonButton ]
})
export class DeleteStatsButtonComponent {
  currentRoute: string = "";

  constructor(private storage: StorageService,
              private alert: AlertController,
              private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace("/", "");
    });
  }

  async deleteStats() {
    const alert = await this.alert.create({
      header: "Supprimer vos données ?",
      message: "Cette action est irréversible.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
        },
        {
          text: "Confirmer",
          handler: (() => {
            this.router.navigate(["stats"]);
            this.storage.remove(this.currentRoute.slice(6) + "_stats_data");
          })
        }
      ]
    });

    await alert.present();
  }
}
