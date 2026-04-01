import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useTransactionStore } from '../../store/transactionStore';

/**
 * AddEditModal Component - Modal form for adding/editing transactions
 */
const AddEditModal = ({ isOpen, onClose, transaction = null }) => {
  const { addTransaction, editTransaction, transactions } = useTransactionStore();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const categories = [...new Set(transactions.map(t => t.category))].sort();

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date.toISOString().split('T')[0],
        merchant: transaction.merchant,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        description: transaction.description,
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        merchant: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        description: '',
      });
    }
    setErrors({});
  }, [transaction, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.merchant.trim()) newErrors.merchant = 'Merchant is required';
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const txnData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
    };

    if (transaction) {
      editTransaction(transaction.id, txnData);
    } else {
      addTransaction(txnData);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const FormField = ({ label, name, type = 'text', required = true, children = null }) => (
    <div>
      <label className="block text-sm font-dm-sans font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border ${
            errors[name] ? 'border-red-500' : 'border-slate-600'
          } text-white font-dm-sans placeholder-slate-400 focus:ring-2 focus:ring-blue-500`}
        />
      )}
      {errors[name] && (
        <p className="text-xs text-red-400 mt-1 font-dm-sans">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Edit Transaction' : 'Add Transaction'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit}>
            {transaction ? 'Update' : 'Add'} Transaction
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Date" name="date" type="date" />
          <FormField label="Merchant" name="merchant" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Amount" name="amount" type="number" />
          <FormField label="Type" name="type">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </FormField>
        </div>

        <FormField label="Category" name="category">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Description" name="description" required={false}>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Optional description"
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default AddEditModal;
