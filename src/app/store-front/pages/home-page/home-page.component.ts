import { Product } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/products.service';
import { ProductCardComponent } from '@/store-front/components/product-card/product-card.component';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts({}).subscribe({});
  }

  // countryResource = resource({
  //   request: () => ({  }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     // Convert
  //     return await firstValueFrom(
  //       this.productsService.getProducts({}).subscribe({});
  //     );
  //   },
  // });
}
