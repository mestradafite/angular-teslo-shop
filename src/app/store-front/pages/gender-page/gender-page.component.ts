import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@/store-front/components/product-card/product-card.component';
import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-gender-page',
  imports: [TitleCasePipe, ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  productsService = inject(ProductsService);

  paginationService = inject(PaginationService);

  route = inject(ActivatedRoute);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9,
      });
    },
  });
}
