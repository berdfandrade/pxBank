

export default function formatCPF(value) {
  const cleanValue = value.replace(/[^\d]/g, '');
  const match = cleanValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (match) {
    return !match[2]
      ? match[1]
      : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
  }
  return value;
}


