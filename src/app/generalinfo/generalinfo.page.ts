import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { CanInfoService } from './../can-info.service';

interface Caninfo {
  name: string;
  application: string;
  customer_benefit: string;
  use_advices: string;
  image_url: string;
}

@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.page.html',
  styleUrls: ['./generalinfo.page.scss'],
})
export class GeneralinfoPage implements OnInit {

  caninfo: Caninfo = {
    name: '',
    application: '',
    customer_benefit: '',
    use_advices: '',
    image_url: ''
  };

    public constructor(private route: ActivatedRoute,
                       public canInfoService: CanInfoService) {
 
this.caninfo.name = this.canInfoService.GetCanName();
this.caninfo.application = this.canInfoService.GetApplication();
this.caninfo.customer_benefit = this.canInfoService.GetCustomerBenefit();
this.caninfo.use_advices = this.canInfoService.GetUseAdvices();  
this.caninfo.image_url = this.canInfoService.GetCanImage();
    }
  
    ngOnInit() {
      console.log('GetCanName()' + this.canInfoService.GetCanName());
    }

  }
