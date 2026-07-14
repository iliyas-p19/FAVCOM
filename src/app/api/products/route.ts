import { NextRequest, NextResponse } from 'next/server';
import { loadCategories, loadProducts, searchProducts } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const categoriesOnly = searchParams.get('categories') === 'true';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const requestedLimit = parseInt(searchParams.get('limit') || '20', 10);
    const limit = Math.min(Math.max(1, Number.isFinite(requestedLimit) ? requestedLimit : 20), 100);
    const search = searchParams.get('q') || searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '1000000');

    if (categoriesOnly) {
      return NextResponse.json({ categories: loadCategories() });
    }

    if (id) {
      const product = loadProducts().find(item => String(item.id) === String(id));
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    let products = [...loadProducts()];

    // Apply filters
    if (search) {
      products = [...searchProducts(search)];
    }

    if (category) {
      products = products.filter(product =>
        product.category.toLowerCase().includes(category.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Apply price filter
    products = products.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // Apply sorting
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating-low':
          return a.rating - b.rating;
        case 'rating-high':
          return b.rating - a.rating;
        case 'reviews-high':
          return b.reviews - a.reviews;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Calculate pagination
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
