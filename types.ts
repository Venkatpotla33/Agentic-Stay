export interface HomeStay {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  imageKeywords: string;
  description: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}
