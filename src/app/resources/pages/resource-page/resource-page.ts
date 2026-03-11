import { Component, inject, signal } from '@angular/core';
import { ResourceCard } from '../../components/resource-card/resource-card';
import { Resource } from '../../interfaces/resource.interface';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response';
import { PaginationComponent } from "../../../components/pagination/pagination";
import { LoadingBarComponent } from "../../../components/loading-bar-component/loading-bar-component";

@Component({
  selector: 'app-resource-page',
  imports: [ResourceCard, PaginationComponent, LoadingBarComponent],
  templateUrl: './resource-page.html',
  styleUrl: './resource-page.css',
})
export class ResourcePage {
  private resourceService = inject(ResourceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  data = signal<Resource[]>([])
  meta = signal<PaginatedResponse<Resource>['meta'] | null>(null)
  loading = signal(false)

  ngOnInit(){
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page'] || 1)
      const limit = Number(params['limit'] || 12)
      this.load(page, limit)
    })
  }

  load(page : number, limit : number){
    this.loading.set(true)
    this.resourceService.getResources(page, limit).subscribe((res) => {
      this.data.set(res.data)
      this.meta.set(res.meta)
      this.loading.set(false)
    })
  }

  goToPage(page : number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams : {page},
      queryParamsHandling : 'merge'
    })
  }


}
