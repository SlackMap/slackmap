export interface ItemInterface {
  id?: string;
  rid?: string;
  type?: number;
  subtype?: number;
  user?: string;
  photo?: string;
  name?: string;
  description?: string;
  privacy?: number;
  _version?: number;
  created_at?: string;
  updated_at?: string;
}

export function itemRow2Entity(row: any): ItemInterface {
  if (row) {
    delete row['@type'];
    delete row['@rid'];
    delete row['@version'];
    row.id = row.id.toString();
  }
  return row;
}

// in_Viewed.size() as views_count,
// in_Likes.size() as likes_count,
// in_Dislikes.size() as dislikes_count,
// in_Walked.size() as walks_count,
