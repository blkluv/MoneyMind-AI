import React from 'react';
import { Transaction, Category } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { exportTransactionsToPDF } from '../../utils/pdfExporter';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

const categoryIcons: Record<Category, string> = {
    Food: '🍕',
    Travel: '✈️',
    Bills: '🧾',
    Shopping: '🛍️',
    Rent: '🏠',
    Groceries: '🛒',
    Entertainment: '🎬',
    Health: '❤️‍🩹',
    Education: '🎓',
    Salary: '💼',
    Investment: '📈',
    'Other Income': '🪙',
    'Other Expense': '🤷',
    Uncategorized: '❓',
};

const TransactionItem: React.FC<{ transaction: Transaction; onDelete: (id: number) => void; onEdit: (transaction: Transaction) => void; }> = React.memo(({ transaction, onDelete, onEdit }) => {
    const isIncome = transaction.type === 'income';
    const amountColor = isIncome ? 'text-secondary' : 'text-red-500';
    const amountSign = isIncome ? '+' : '-';
  
    return (
        <li className="flex items-center justify-between p-4 bg-card-bg dark:bg-dark-card-bg/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 md:space-x-4 overflow-hidden flex-1 min-w-0 pr-2">
                <span className="text-2xl flex-shrink-0">{categoryIcons[transaction.category] || '❓'}</span>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary dark:text-dark-text-primary truncate">{transaction.description}</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary truncate">{new Date(transaction.date).toLocaleDateString('en-IN')}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                <p className={`font-bold text-lg ${amountColor} whitespace-nowrap`}>{`${amountSign} ${formatCurrency(transaction.amount)}`}</p>
                <div className="flex space-x-1 md:space-x-2">
                  <button onClick={() => onEdit(transaction)} className="text-gray-400 hover:text-blue-500 p-1">✏️</button>
                  <button onClick={() => onDelete(transaction.id)} className="text-gray-400 hover:text-red-500 p-1">🗑️</button>
                </div>
            </div>
        </li>
    );
});

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-2xl shadow-md">
       <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Recent Transactions</h3>
        <button 
          onClick={() => exportTransactionsToPDF(transactions)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={transactions.length === 0}
          aria-label="Export all transactions to PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export PDF</span>
        </button>
      </div>
      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.slice(0, 10).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>
      ) : (
        <p className="text-text-secondary dark:text-dark-text-secondary text-center py-4">No transactions yet. Add one to get started! 🚀</p>
      )}
    </div>
  );
};

export default TransactionList;