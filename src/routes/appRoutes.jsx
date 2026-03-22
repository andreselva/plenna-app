import { AlarmClock, BanknoteArrowDown, BanknoteArrowUp, BriefcaseBusiness, CreditCard, FileSpreadsheet, Landmark, LayoutDashboard, Users } from 'lucide-react';

import Categories from '../Pages/Categories/Categories';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Expenses from '../Pages/Expenses/Expenses';
import Revenues from '../Pages/Revenues/Revenues';
import { BankAccounts } from '../Pages/BankAccounts/BankAccounts';
import { CreditCards } from '../Pages/CreditCards/CreditCards';
import Signin from '../Pages/Signin/Signin';
import Invoices from '../Pages/Invoices/Invoices';
import NotFound from '../Pages/NotFound/NotFound';
import Reports from '../Pages/Reports/Reports';
import FinancialSummary from '../Pages/Reports/FinancialSummary';
import UsersPage from '../Pages/Users/Users';
import Appointments from '../Pages/Appointments/Appointments';
import Tenants from '../Pages/Tenants/Tenants';
import TenantDetails from '../Pages/Tenants/TenantDetails';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';

export const appRoutes = [
  {
    path: '/login',
    element: <Signin />,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    meta: {
      label: 'Dashboard',
      icon: <LayoutDashboard />,
      placements: ['sidebar'],
      accessPath: '/dashboard',
    },
  },
  {
    path: '/categories',
    element: <Categories />,
    meta: {
      label: 'Categorias',
      icon: <BriefcaseBusiness size={18}/>,
      placements: ['settings'],
      accessPath: '/categories',
    },
  },
  {
    path: '/expenses',
    element: <Expenses />,
    meta: {
      label: 'Contas a pagar',
      icon: <BanknoteArrowDown />,
      placements: ['sidebar'],
      accessPath: '/expenses',
    },
  },
  {
    path: '/revenues',
    element: <Revenues />,
    meta: {
      label: 'Contas a receber',
      icon: <BanknoteArrowUp />,
      placements: ['sidebar'],
      accessPath: '/revenues',
    },
  },
  {
    path: '/bank-accounts',
    element: <BankAccounts />,
    meta: {
      label: 'Contas Bancárias',
      icon: <Landmark />,
      placements: ['sidebar'],
      accessPath: '/bank-accounts',
    },
  },
  {
    path: '/credit-cards',
    element: <CreditCards />,
    meta: {
      label: 'Cartões de crédito',
      icon: <CreditCard size={18}/>,
      placements: ['settings'],
      accessPath: '/credit-cards',
    },
  },
  {
    path: '/invoices',
    element: <Invoices />,
    meta: {
      label: 'Faturas',
      icon: <CreditCard />,
      placements: ['sidebar'],
      accessPath: '/invoices',
    },
  },
  {
    path: '/reports',
    element: <Reports />,
    meta: {
      label: 'Relatórios',
      icon: <FileSpreadsheet />,
      placements: ['sidebar'],
      accessPath: '/reports',
    },
  },
  {
    path: '/reports/financial-summary',
    element: <FinancialSummary />,
    meta: {
      accessPath: '/reports/financial-summary',
    },
  },
  {
    path: '/users',
    element: <UsersPage />,
    meta: {
      label: 'Usuários',
      icon: <Users size={18} />,
      placements: ['settings'],
      accessPath: '/users',
    },
  },
  {
    path: '/appointments',
    element: <Appointments />,
    meta: {
      label: 'Agendamentos',
      icon: <AlarmClock size={18} />,
      placements: ['settings'],
      accessPath: '/appointments',
    },
  },
  {
    path: '/tenants',
    element: <Tenants />,
    meta: {
      accessPath: '/tenants',
    },
  },
  {
    path: '/tenants/:clientId',
    element: <TenantDetails />,
    meta: {
      accessPath: '/tenants',
    },
  },
  {
    path: '*',
    element: <NotFound />,
    meta: {
      isPublic: true,
    },
  }
];

export default appRoutes;