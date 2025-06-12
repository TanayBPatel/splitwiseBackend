import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Search, Menu, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const MyMoneyApp = () => {
  const chartData = {
    labels: ['Clothing'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#E85A4F'],
        borderColor: ['#E85A4F'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-gray-800">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm bg-[#FDF6E3]">
        <div className="flex items-center space-x-1">
          <span>10:49</span>
          <div className="flex space-x-1 ml-2">
            <div className="w-4 h-3 bg-gray-600 rounded-sm"></div>
            <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
            <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-gray-600"></div>
            <div className="w-1 h-3 bg-gray-600"></div>
            <div className="w-1 h-3 bg-gray-400"></div>
            <div className="w-1 h-3 bg-gray-300"></div>
          </div>
          <span>71%</span>
          <div className="w-6 h-3 border border-gray-600 rounded-sm">
            <div className="w-5 h-2 bg-gray-600 rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Menu className="w-6 h-6 text-gray-700" />
        <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'cursive' }}>
          MyMoney
        </div>
        <Search className="w-6 h-6 text-gray-700" />
      </div>

      {/* Date Navigation */}
      <div className="flex justify-between items-center px-4 py-3">
        <ChevronLeft className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-700">June, 2025</h2>
        <div className="flex items-center space-x-2">
          <ChevronRight className="w-6 h-6 text-gray-600" />
          <Filter className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">EXPENSE</div>
          <div className="text-lg font-bold text-red-600">₹35.00</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">INCOME</div>
          <div className="text-lg font-bold text-green-600">₹0.00</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">TOTAL</div>
          <div className="text-lg font-bold text-red-600">-₹35.00</div>
        </div>
      </div>

      {/* Expense Overview */}
      <div className="px-4 mb-6">
        <div className="border-2 border-teal-600 rounded-lg p-4 bg-[#FDF6E3]">
          <div className="flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-teal-600 rotate-90" />
            <span className="text-teal-600 font-semibold mx-2">EXPENSE OVERVIEW</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Chart */}
          <div className="relative w-32 h-32">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">Expenses</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center ml-8">
            <div className="w-3 h-3 bg-red-500 mr-2"></div>
            <span className="text-gray-700">Clothing</span>
          </div>
        </div>
      </div>

      {/* Expense Item */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-4 bg-orange-500 rounded-sm"></div>
              </div>
            </div>
            <span className="text-gray-700 font-medium">Clothing</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 font-bold mr-4">-₹35.00</span>
            <span className="text-sm text-gray-600">100.00%</span>
          </div>
        </div>
        <div className="ml-15">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div className="bg-teal-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <button className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 border-2 border-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-500">Records</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-teal-600 rounded-full mb-1"></div>
            <span className="text-xs text-teal-600 font-medium">Analysis</span>
            <div className="w-8 h-0.5 bg-teal-600 mt-1"></div>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 border-2 border-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-500">Budgets</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 border-2 border-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-500">Accounts</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 border-2 border-gray-400 rounded mb-1"></div>
            <span className="text-xs text-gray-500">Categories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMoneyApp;