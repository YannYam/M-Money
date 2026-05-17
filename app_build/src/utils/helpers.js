export const parseShorthand = (input) => {
  if (!input) return { amount: 0, text: '' };
  
  // Try to match patterns like "15 lunch" or "lunch 15"
  // Shorthand rules: multiply numbers by 1000
  const match = input.match(/^([0-9]*\.?[0-9]+)\s*(.*)$/);
  if (match) {
    const val = parseFloat(match[1]);
    const text = match[2].trim() || 'General';
    return { amount: val * 1000, text };
  }

  const matchReverse = input.match(/^(.*?)\s*([0-9]*\.?[0-9]+)$/);
  if (matchReverse) {
    const text = matchReverse[1].trim() || 'General';
    const val = parseFloat(matchReverse[2]);
    return { amount: val * 1000, text };
  }

  // If just a number
  const numOnly = parseFloat(input);
  if (!isNaN(numOnly)) {
    return { amount: numOnly * 1000, text: 'General' };
  }

  return { amount: 0, text: input };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
