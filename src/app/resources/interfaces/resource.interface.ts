export interface Resource {
  id:          string;
  title:       string;
  spotifyUrl:  string;
  youtubeUrl:  string;
  description: string;
  resume:      string;
  private:     boolean;
  date:        Date;
  bibleBook:   BibleBook;
  serie:       Serie;
  author:      Author;
  frontpage:   Frontpage;
  audio:       Audio;
  tags:        Tag[];
}

export interface Audio {
  url: string;
}
export interface Frontpage {
  url: string;
}

export interface Tag {
  id: string
  title: string;
}

export interface Author {
  id:   string;
  name: string;
}

export interface BibleBook {
  id:    string;
  title: string;
}

export interface Serie{
  id:    string;
  title: string;
  imageUrl : string
}
