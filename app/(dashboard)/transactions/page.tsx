"use client"
import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Wallet, Sparkles, X } from 'lucide-react';
import TransactionTrendChart from '@/components/custom-ui/TransactionTrendChart';
import { mockCategories, mockTransactionAnalysis, mockTransactions } from '@/lib/mockData.js';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import EmptyState from '@/components/custom-ui/EmptyState';
import CategoryBadge from '@/components/custom-ui/CategoryBadge';
import { formatCurrency, formatDate } from '@/lib/halper-function';
import StatusPill from '@/components/custom-ui/StatusPill';
import { Field } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const TransactionsPage = () => {
    const currency = 'USD';
    const [categories] = useState(mockCategories);
    const [filters, setFilters] = useState({ search: '', type: '', categoryId: '' });
    const [analysis, setAnalysis] = useState(mockTransactionAnalysis);
    const [timeRange, setTimeRange] = useState('monthly');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;


    const transactions = useMemo(
        () =>
            filters.type
                ? mockTransactions.filter((t) => t.type === filters.type)
                : mockTransactions,
        [filters.type]
    );

    const counts = useMemo(
        () => ({
            all: mockTransactions.length,
            income: mockTransactions.filter((t) => t.type === 'income').length,
            expense: mockTransactions.filter((t) => t.type === 'expense').length,
        }),
        []
    );

    const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartInterval = timeRange === '30d' ? 3 : timeRange === '3m' ? 10 : 0;

    const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const startIdx = (safePage - 1) * PAGE_SIZE;
    const paginated = transactions.slice(startIdx, startIdx + PAGE_SIZE);

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (safePage <= 4) return [1, 2, 3, 4, 5, '…', totalPages];
        if (safePage >= totalPages - 3) {
            return [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '…', safePage - 1, safePage, safePage + 1, '…', totalPages];
    };

    const tabs = [
        { value: '', label: 'All', count: counts.all, badge: 'bg-slate-200 text-slate-700' },
        { value: 'income', label: 'Income', count: counts.income, badge: 'bg-emerald-100 text-emerald-700' },
        { value: 'expense', label: 'Expense', count: counts.expense, badge: 'bg-rose-100 text-rose-700' },
    ];

    const trendData = useMemo(() => {
        const now = new Date();
        const txnKey = (t) => (t.transaction_date || '').split('T')[0];
        const addAmount = (entry, t) => {
            const amount = parseFloat(t.amount);
            if (t.type === 'income') entry.income += amount;
            else entry.expense += amount;
        };


        if (timeRange === 'yearly') {
            const buckets = [];
            for (let i = 4; i >= 0; i--) {
                const y = String(now.getFullYear() - i);
                buckets.push({ key: y, label: y, income: 0, expense: 0 });
            }
            const map = new Map(buckets.map((b) => [b.key, b]));
            mockTransactions.forEach((t) => {
                const year = txnKey(t).split('-')[0];
                const entry = map.get(year);
                if (entry) addAmount(entry, t);
            });
            return buckets;
        }

        return [];
    }, [timeRange]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between w-full">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
                    <p className="text-sm text-slate-500 mt-1.5">All your income and expenses</p>
                </div>
                <Button variant='default'>
                    <Plus size={16} /> Add Transaction
                </Button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Transaction Trend</h2>
                        <p className="text-xs text-slate-500 mt-1">Income vs expenses over time</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full shrink-0">
                        {[
                            { value: '30d', label: '30D' },
                            { value: '3m', label: '3M' },
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'yearly', label: 'Yearly' },
                        ].map((r) => (
                            <button
                                key={r.value}
                                onClick={() => setTimeRange(r.value)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${timeRange === r.value
                                    ? 'bg-white shadow-sm text-slate-900'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>
                <TransactionTrendChart data={trendData} currency={currency} interval={chartInterval} />
            </div>

            <div className="bg-white rounded-3xl border p-5">
                {!analysis ? (
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-900">AI Spending Insight</h3>
                                <p className="text-sm text-slate-500 truncate">
                                    Get a quick analysis of the {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} in this view
                                </p>
                            </div>
                        </div>
                        <Button>
                            <Sparkles size={14} />
                            Generate
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center shrink-0">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-slate-900">AI Spending Insight</h3>
                                {analysis.highlight && (
                                    <span className="inline-flex items-center bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {analysis.highlight}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">{analysis.insight}</p>
                            <Button
                                variant={'secondary'}
                                className="mt-3 text-xs font-medium text-violet-600 hover:text-violet-700 disabled:opacity-50"
                            >
                                Re-analyze
                            </Button>
                        </div>
                        <button
                            onClick={() => setAnalysis(mockTransactionAnalysis)}
                            className="text-slate-400 hover:text-slate-600 shrink-0 p-1"
                            title="Dismiss"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-3xl border p-5">
                <div className="flex gap-3 justify-between mb-5 w-full">
                    <div className="relative flex-1">
                        <Search size={24} className="absolute left-4 top-3.5 text-slate-400" />
                        <Input
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            placeholder="Search description or notes..."
                            className="w-full! pl-12 pr-4"
                        />
                    </div>

                    <div className="flex items-center px-3 gap-1 bg-input/50 p-1 h-12.5 rounded-full self-start lg:self-auto">
                        {tabs.map((tab) => (
                            <button
                                size={'lg'}
                                key={tab.value || 'all'}
                                onClick={() => setFilters({ ...filters, type: tab.value })}
                                className={`px-4 cursor-pointer py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${filters.type === tab.value
                                    ? 'bg-white shadow-sm text-slate-900'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {tab.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab.badge}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <Field className='max-w-75!'>
                        <Select defaultValue="" name='category'>
                            <SelectTrigger className='max-w-75!' id='category-select' >
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent
                                position="popper"

                            >
                                <SelectGroup>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                {false ? (
                    <div className="flex justify-center py-12">
                        <Spinner />
                    </div>
                ) : transactions.length === 0 ? (
                    <EmptyState
                        icon={Wallet}
                        title="No transactions"
                        description="Try adjusting filters, or add a new transaction."
                        action={
                            <Button >
                                <Plus size={24} /> Add Transaction
                            </Button>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                    <th className="pb-4 pr-4">Category</th>
                                    <th className="pb-4 pr-4">Description</th>
                                    <th className="pb-4 pr-4">Date</th>
                                    <th className="pb-4 pr-4">Type</th>
                                    <th className="pb-4 pr-4 text-right">Amount</th>
                                    <th className="pb-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginated.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 pr-4">
                                            <CategoryBadge
                                                name={t.category_name || 'Uncategorized'}
                                                icon={t.category_icon}
                                                color={t.category_color}
                                                size="sm"
                                            />
                                        </td>
                                        <td className="py-4 pr-4 text-sm text-slate-700">
                                            {t.description || '—'}
                                        </td>
                                        <td className="py-4 pr-4 text-sm text-slate-500 whitespace-nowrap">
                                            {formatDate(t.transaction_date)}
                                        </td>
                                        <td className="py-4 pr-4">
                                            <StatusPill variant={t.type === 'income' ? 'income' : 'expense'}>
                                                {t.type}
                                            </StatusPill>
                                        </td>
                                        <td
                                            className={`py-4 pr-4 text-sm font-semibold text-right whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                                                }`}
                                        >
                                            {t.type === 'income' ? '+' : '-'}
                                            {formatCurrency(t.amount, currency)}
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-rose-50 rounded-md text-rose-500 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionsPage;
