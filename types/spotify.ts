export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
}

export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface Album {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface SearchResults {
  tracks?: { items: Track[] };
  artists?: { items: Artist[] };
  albums?: { items: Album[] };
}