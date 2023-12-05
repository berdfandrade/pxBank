export default function formatarData(data) {
  const dataISO = new Date(data);
  
  const dia = dataISO.getDate().toString().padStart(2, '0');
  const mes = (dataISO.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataISO.getFullYear();

  return `${dia}/${mes}/${ano}`;
}