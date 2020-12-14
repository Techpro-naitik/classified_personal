import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-category-detail-page',
  templateUrl: './category-detail-page.component.html',
  styleUrls: ['./category-detail-page.component.css']
})
export class CategoryDetailPageComponent implements OnInit {
  origine: any;
  getSubCategoryById = [];
  id: string;

  constructor(
    private Activatedroute: ActivatedRoute,
    private service: ServiceService,
    private router:Router

  ) {
    
   }

  ngOnInit(): void {
    

    this.id = JSON.parse(localStorage.getItem('id'));
    console.log(this.id,"hi")
    this.getSubCategory()

  }


  async getSubCategory() {
    debugger
    let subcategory = await this.service.get_subcategory(0).toPromise();
    console.log(subcategory);

    this.getSubCategoryById = subcategory.filter(ele => ele.SubCategoryId === this.id);
    console.log(this.getSubCategoryById)

  }
}
