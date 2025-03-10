import { Product } from '@/products/interfaces/product.interface';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';
import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();

  imageUrl = computed(() => {
    return `${environment.baseUrl}/files/product/${this.product().images[0]}`;
  });
}
