import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, Users } from 'lucide-react';

interface TableRow {
  id: number;
  name: string;
  email: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

interface DataTableProps {
  onBack: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const mockData: TableRow[] = [
    {
      id: 1,
      name: 'Иван Смирнов',
      email: 'ivan.smirnov@example.com',
      category: 'Разработчик',
      status: 'Активен',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Анна Петрова',
      email: 'anna.petrova@example.com',
      category: 'Дизайнер',
      status: 'Активна',
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Михаил Волков',
      email: 'mikhail.volkov@example.com',
      category: 'Менеджер',
      status: 'Неактивен',
      joinDate: '2022-11-10'
    },
    {
      id: 4,
      name: 'Елена Козлова',
      email: 'elena.kozlova@example.com',
      category: 'Разработчик',
      status: 'В ожидании',
      joinDate: '2023-03-05'
    },
    {
      id: 5,
      name: 'Дмитрий Соколов',
      email: 'dmitry.sokolov@example.com',
      category: 'Дизайнер',
      status: 'Активен',
      joinDate: '2023-01-28'
    },
    {
      id: 6,
      name: 'Ольга Морозова',
      email: 'olga.morozova@example.com',
      category: 'Менеджер',
      status: 'Активна',
      joinDate: '2022-12-12'
    },
    {
      id: 7,
      name: 'Алексей Новиков',
      email: 'alexey.novikov@example.com',
      category: 'Разработчик',
      status: 'Неактивен',
      joinDate: '2023-02-14'
    },
    {
      id: 8,
      name: 'Мария Федорова',
      email: 'maria.fedorova@example.com',
      category: 'Дизайнер',
      status: 'Активна',
      joinDate: '2023-03-20'
    },
    {
      id: 9,
      name: 'Сергей Лебедев',
      email: 'sergey.lebedev@example.com',
      category: 'Менеджер',
      status: 'В ожидании',
      joinDate: '2023-04-01'
    },
    {
      id: 10,
      name: 'Татьяна Васильева',
      email: 'tatyana.vasileva@example.com',
      category: 'Разработчик',
      status: 'Активна',
      joinDate: '2023-03-15'
    }
  ];

  const categories = ['all', 'Разработчик', 'Дизайнер', 'Менеджер'];

  // Filtered data based on search and category
  const filteredData = useMemo(() => {
    return mockData.filter(row => {
      const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || row.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен':
      case 'Активна':
        return 'bg-green-100 text-green-800';
      case 'Неактивен':
        return 'bg-red-100 text-red-800';
      case 'В ожидании':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к меню</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Таблица данных</h1>
          <p className="text-gray-600">Поиск и фильтрация пользовательских данных</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Box */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Поиск по имени
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск пользователей..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="sm:w-64">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Фильтр по категории
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Все категории' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>
                  Показано {filteredData.length} из {mockData.length} пользователей
                </span>
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Очистить фильтры
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Fixed Header */}
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Имя
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата присоединения
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`transition-colors duration-200 hover:bg-blue-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {row.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {row.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatDate(row.joinDate)}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">Пользователи не найдены</p>
                          <p className="text-sm">
                            {searchTerm || selectedCategory !== 'all'
                              ? 'Попробуйте изменить критерии поиска или фильтрации'
                              : 'Данные недоступны'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;