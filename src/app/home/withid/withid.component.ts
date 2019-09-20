import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {Router, NavigationExtras} from '@angular/router';
import { from } from 'rxjs';
import { CanInfoService } from './../../can-info.service';

@Component({
  selector: 'app-withid',
  templateUrl: './withid.component.html',
  styleUrls: ['./withid.component.scss'],
})
export class WithidComponent implements OnInit {

    public id: string;
    public caninfo = null;
    constructor(private route: ActivatedRoute,
                public loadingController: LoadingController,
                public http: HttpClient,
                public router: Router,
                public canInfoService: CanInfoService)
    {
    }

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      from(this.presentLoading())
      .subscribe(() => {
        this.http.get("http://192.168.0.15:3800/items/"+this.id) 
        .subscribe(
          (result) => {
            console.log(result);
            this.caninfo = result[0];
          },
          (error) => {
          }
        )
  //      .add(() => this.loading.dismiss());
        .add(() => this.dismissLoading());
      });
    }
  
    private async presentLoading(): Promise<any> {
      const loading = await this.loadingController.create({
        message: 'Please wait ...',
      });
      return await loading.present();
    }
  
    private async dismissLoading(): Promise<any> {

      return await this.loadingController.dismiss().then(() => 
      {
        if (this.caninfo) {
          this.canInfoService.SetCanInfo(this.caninfo.name,
                                         this.caninfo.desc_standard,
                                         this.caninfo.desc_storage,
                                         this.caninfo.desc_use,
                                         this.caninfo.url);
          this.router.navigate(['generalinfo']);
        }
        else {
          this.router.navigate(['error']);
        }
      });
    }
  }
