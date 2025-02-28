export interface HotelInterface {
  id: number;
  name: string;
  location: {
    hotelLocation: string;
    address: string;
    city: string;
    country: string;
  };
  rating: number;
  stars: number;
  pleasant: string;
  description: string[];
  facilities: string[];
  highlights: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    petsAllowed: boolean;
  };
  images: {
    cover: string;
    featured: string[];
  };
  reviews: {
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rooms: {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: {
      perNight: number;
      currency: string;
      discount: {
        percentage: number;
        description: string;
      };
    };
    policies: {
      cancellation: string;
      checkIn: string;
      checkOut: string;
    };
    availability: boolean;
  }[];
}

export interface RoomsInterface {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: {
    perNight: number;
    currency: string;
    discount: {
      percentage: number;
      description: string;
    };
  };
  policies: {
    cancellation: string;
    checkIn: string;
    checkOut: string;
  };
  availability: boolean;
}

export interface HotelReservationInterface {
  address: string;
  checkIn: string;
  checkOut: string;
  hotelId?: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: string;
  roomId?: string;
  rooms: number;
  stars: number;
}
[];
