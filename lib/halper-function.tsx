import * as Icons from 'lucide-react';


export const formatCurrency = (amount: number, currency = 'USD') => {
    const value = amount || 0;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatDate = (dateStr: Date) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export const formatMonth = (yyyyMm: string) => {
    if (!yyyyMm) return '';
    const [year, month] = yyyyMm.split('-');
    const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

export const todayDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const timeAgo = (date: Date) => {
    if (!date) return '—';
    const diffMs = Date.now() - new Date(date).getTime();
    if (diffMs < 0) return 'just now';
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return formatDate(date);
};


export const lucideIconByName = (iconName: string) => {
    if (!iconName) return Icons.Tag;
    const pascal = iconName
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
    return Icons[pascal as keyof typeof Icons] || Icons.Tag;
};
