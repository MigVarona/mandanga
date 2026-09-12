export type StayOption = { value: string; label: string; price: number };

/** Precio y etiqueta viven juntos: la etiqueta es también el nombre de la opción en Notion. */
const RAW = [
  { value: "one-night", place: "Cama", nights: "una noche", price: 70 },
  { value: "two-nights", place: "Cama", nights: "dos noches", price: 90 },
  { value: "van-or-tent-one-night", place: "Furgo o tienda", nights: "una noche", price: 60 },
  { value: "van-or-tent-two-nights", place: "Furgo o tienda", nights: "dos noches", price: 70 },
];

export const STAY_OPTIONS: StayOption[] = RAW.map(({ value, place, nights, price }) => ({
  value,
  price,
  label: `${place} · ${nights} · ${price} €`,
}));
