export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  longDesc: string;
  rating: number;
  category: string;
  isFavorite: boolean;
  isClicked: boolean;
  clickedTime?: string | Date;
}
