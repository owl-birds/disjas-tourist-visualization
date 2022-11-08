interface RegionType {
  [index: string]: boolean;
}
const asiaPacificCountries: RegionType = {
  "Brunei Darussalam": true,
  Malaysia: true,
  Filipina: true,
  Singapura: true,
  Thailand: true,
  Vietnam: true,
  Hongkong: true,
  India: true,
  Jepang: true,
  "Korea Selatan": true,
  Pakistan: true,
  Bangladesh: true,
  Srilanka: true,
  Taiwan: true,
  "Tiongkok / Cina": true,
  Australia: true,
  "Selandia Baru": true,
  "Asia Pasifik Lainnya": true,
};
const americaCountries: RegionType = {
  "Amerika Serikat": true,
  Kanada: true,
  "Amerika Lainnya": true,
};
const europeCountries: RegionType = {
  Austria: true,
  Belgia: true,
  Denmark: true,
  Perancis: true,
  Jerman: true,
  Italia: true,
  Belanda: true,
  Spanyol: true,
  Portugal: true,
  Swedia: true,
  Norwegia: true,
  Finlandia: true,
  Swiss: true,
  Inggris: true,
  Rusia: true,
  "Eropa Lainnya": true,
};
export { asiaPacificCountries, americaCountries, europeCountries };
