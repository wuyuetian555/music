export const musicArtistType = [
  {
    value: '全部',
    id: '-1'
  },
  {
    value: '男歌手',
    id: '1'
  },
  {
    value: '女歌手',
    id: '2'
  },
  {
    value: '乐队',
    id: '3'
  }
];

export const musicArtistArea = [
  {
    value: '全部',
    id: -1
  },
  {
    value: '华语',
    id: 7
  },
  {
    value: '欧美',
    id: 96
  },
  {
    value: '日本',
    id: 8
  },
  {
    value: '韩国',
    id: 16
  },
  {
    value: '其他',
    id: 0
  }
];

export const musicArtistInitial = [
  { id: -1, value: '全部' },
  { id: 'a', value: 'A' },
  { id: 'b', value: 'B' },
  { id: 'c', value: 'C' },
  { id: 'd', value: 'D' },
  { id: 'e', value: 'E' },
  { id: 'f', value: 'F' },
  { id: 'g', value: 'G' },
  { id: 'h', value: 'H' },
  { id: 'i', value: 'I' },
  { id: 'j', value: 'J' },
  { id: 'k', value: 'K' },
  { id: 'l', value: 'L' },
  { id: 'm', value: 'M' },
  { id: 'n', value: 'N' },
  { id: 'o', value: 'O' },
  { id: 'p', value: 'P' },
  { id: 'q', value: 'Q' },
  { id: 'r', value: 'R' },
  { id: 's', value: 'S' },
  { id: 't', value: 'T' },
  { id: 'u', value: 'U' },
  { id: 'v', value: 'V' },
  { id: 'w', value: 'W' },
  { id: 'x', value: 'X' },
  { id: 'y', value: 'Y' },
  { id: 'z', value: 'Z' },
  { id: 0, value: '#' }
];

export const filterArtistList = (arr) => {
  arr = arr.map((item) => {
    return {
      singerId: item.id,
      singerName: item.name,
      singerBg: item.picUrl
    };
  });
  return arr;
};
