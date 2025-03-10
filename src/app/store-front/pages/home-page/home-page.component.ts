import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@/store-front/components/product-card/product-card.component';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({ offset: request.page * 9 });
    },
  });
}
