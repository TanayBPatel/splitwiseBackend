import React, { useState } from 'react';
import { Search, Menu, ChevronLeft, ChevronRight, Filter, Plus, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ExpenseTracker = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [amount, setAmount] = useState('0');
  const [selectedType, setSelectedType] = useState('EXPENSE');

  const handleNumberClick = (num) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (op === 'clear') {
      setAmount('0');
    } else if (op === 'backspace') {
      if (amount.length === 1) {
        setAmount('0');
      } else {
        setAmount(amount.slice(0, -1));
      }
    } else {
      setAmount(amount + op);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-yellow-50">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
        <div className="flex items-center space-x-1">
          <span className="font-medium">10:49</span>
          <div className="flex space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
          </svg>
          <span className="font-medium">71%</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 bg-white">
        <Menu className="w-6 h-6 text-gray-700" />
        <div className="text-2xl font-bold text-teal-600" style={{fontFamily: 'cursive'}}>
          MyMoney
        </div>
        <Search className="w-6 h-6 text-teal-600" />
      </div>

      {/* Date Navigation */}
      <div className="flex justify-between items-center px-4 py-4 bg-white border-b border-gray-200">
        <ChevronLeft className="w-6 h-6 text-gray-600" />
        <h2 className="text-lg font-semibold text-teal-600">June, 2025</h2>
        <div className="flex items-center space-x-2">
          <ChevronRight className="w-6 h-6 text-gray-600" />
          <Filter className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex bg-white px-4 py-6 border-b border-gray-200">
        <div className="flex-1 text-center">
          <div className="text-sm text-gray-600 font-medium mb-1">EXPENSE</div>
          <div className="text-lg font-bold text-red-500">₹35.00</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm text-gray-600 font-medium mb-1">INCOME</div>
          <div className="text-lg font-bold text-green-500">₹0.00</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm text-gray-600 font-medium mb-1">TOTAL</div>
          <div className="text-lg font-bold text-red-500">-₹35.00</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-yellow-50">
        {/* Date Header */}
        <div className="px-4 py-3 border-b border-gray-300">
          <h3 className="text-base font-semibold text-teal-700">Jun 12, Thursday</h3>
        </div>

        {/* Transaction Item */}
        <div className="px-4 py-4 bg-white mx-4 mt-2 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM13 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-800">Clothing</div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z"/>
                    <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V6z"/>
                  </svg>
                  Cash
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-red-500">-₹35.00</div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-24 right-6">
        <button 
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setShowAddExpense(true)}
        >
          <Plus className="w-6 h-6 text-teal-600" />
        </button>
      </div>

      {/* Add Expense Popup */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-yellow-50 w-full h-full flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
              <div className="flex items-center space-x-1">
                <span className="font-medium">10:49</span>
                <div className="flex space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
                </div>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">71%</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
            </div>

            {/* Header with Cancel/Save */}
            <div className="flex justify-between items-center px-4 py-4">
              <button 
                className="flex items-center text-teal-600 font-medium"
                onClick={() => setShowAddExpense(false)}
              >
                <X className="w-5 h-5 mr-1" />
                CANCEL
              </button>
              <button 
                className="flex items-center text-teal-600 font-medium"
                onClick={() => setShowAddExpense(false)}
              >
                <Check className="w-5 h-5 mr-1" />
                SAVE
              </button>
            </div>

            {/* Transaction Type Toggle */}
            <div className="flex justify-center items-center px-4 py-4 space-x-4">
              <button 
                className={`text-sm font-medium ${selectedType === 'INCOME' ? 'text-teal-600' : 'text-gray-400'}`}
                onClick={() => setSelectedType('INCOME')}
              >
                INCOME
              </button>
              <span className="text-gray-400">|</span>
              <button 
                className={`flex items-center text-sm font-medium ${selectedType === 'EXPENSE' ? 'text-teal-600' : 'text-gray-400'}`}
                onClick={() => setSelectedType('EXPENSE')}
              >
                {selectedType === 'EXPENSE' && (
                  <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center mr-2">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                EXPENSE
              </button>
              <span className="text-gray-400">|</span>
              <button 
                className={`text-sm font-medium ${selectedType === 'TRANSFER' ? 'text-teal-600' : 'text-gray-400'}`}
                onClick={() => setSelectedType('TRANSFER')}
              >
                TRANSFER
              </button>
            </div>

            {/* Account and Category Selection */}
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Account</div>
                  <button className="w-full p-3 border-2 border-teal-500 rounded-lg bg-white flex items-center justify-center">
                    <div className="w-6 h-6 bg-teal-600 rounded mr-2 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v4h4V6H4zm6 0v4h4V6h-4zM4 14v-2h4v2H4zm6 0v-2h4v2h-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-teal-600 font-medium">Account</span>
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Category</div>
                  <button className="w-full p-3 border-2 border-teal-500 rounded-lg bg-white flex items-center justify-center">
                    <div className="w-6 h-6 bg-teal-600 rounded mr-2 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-teal-600 font-medium">Category</span>
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-4">
                <textarea 
                  className="w-full p-4 border-2 border-teal-500 rounded-lg bg-yellow-50 text-gray-600 placeholder-gray-400 resize-none"
                  placeholder="Add notes"
                  rows="4"
                />
              </div>

              {/* Amount Display */}
              <div className="mb-4">
                <div className="bg-yellow-100 border-2 border-teal-500 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-teal-700">{amount}</span>
                  <button 
                    className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center"
                    onClick={() => handleOperatorClick('backspace')}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Calculator */}
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <button 
                  className="h-12 bg-teal-600 text-white text-xl font-medium rounded flex items-center justify-center"
                  onClick={() => handleOperatorClick('+')}
                >
                  +
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('7')}
                >
                  7
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('8')}
                >
                  8
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('9')}
                >
                  9
                </button>

                {/* Row 2 */}
                <button 
                  className="h-12 bg-teal-600 text-white text-xl font-medium rounded flex items-center justify-center"
                  onClick={() => handleOperatorClick('-')}
                >
                  -
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('4')}
                >
                  4
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('5')}
                >
                  5
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('6')}
                >
                  6
                </button>

                {/* Row 3 */}
                <button 
                  className="h-12 bg-teal-600 text-white text-xl font-medium rounded flex items-center justify-center"
                  onClick={() => handleOperatorClick('*')}
                >
                  ×
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('1')}
                >
                  1
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('2')}
                >
                  2
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('3')}
                >
                  3
                </button>

                {/* Row 4 */}
                <button 
                  className="h-12 bg-teal-600 text-white text-xl font-medium rounded flex items-center justify-center"
                  onClick={() => handleOperatorClick('/')}
                >
                  ÷
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('0')}
                >
                  0
                </button>
                <button 
                  className="h-12 bg-yellow-100 border border-teal-500 text-teal-700 text-xl font-medium rounded"
                  onClick={() => handleNumberClick('.')}
                >
                  .
                </button>
                <button 
                  className="h-12 bg-teal-600 text-white text-xl font-medium rounded flex items-center justify-center"
                  onClick={() => handleOperatorClick('=')}
                >
                  =
                </button>
              </div>

              {/* Date and Time */}
              <div className="flex justify-center items-center space-x-4 mt-6 text-teal-700 font-medium">
                <span>Jun 12, 2025</span>
                <span>|</span>
                <span>10:49 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex-1 flex flex-col items-center py-2">
          <div className="w-6 h-6 bg-teal-600 rounded-sm flex items-center justify-center mb-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <span className="text-xs font-medium text-teal-600">Records</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center py-2">
          <svg className="w-6 h-6 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
          </svg>
          <span className="text-xs text-gray-400"  ><button onClick={() => navigate('/analytics')}>Analysis</button></span>
        </div>
        
        <div className="flex-1 flex flex-col items-center py-2">
          <svg className="w-6 h-6 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs text-gray-400">Budgets</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center py-2">
          <svg className="w-6 h-6 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v4h4V6H4zm6 0v4h4V6h-4zM4 14v-2h4v2H4zm6 0v-2h4v2h-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs text-gray-400">Accounts</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center py-2">
          <svg className="w-6 h-6 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs text-gray-400">Categories</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;