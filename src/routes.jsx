import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutMaster from './layouts/LayoutMaster/LayoutMaster';
import Home from './pages/user/Home/Home';
import About from './pages/user/About/About';
import Products from './pages/user/Products/Products';
// import News from "./pages/admin/News/AdminNews";
import Login from './components/Login';
import Register from './components/Register';
import Careers from './pages/user/Careers/Careers';
import Contact from './pages/user/Contact/Contact';
import { AuthContext } from './components/AuthContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminNews from './pages/admin/News/AdminNews';
import AdminCareers from './pages/admin/Careers/AdminCareers';
import AddEditJob from './pages/admin/Careers/AddEditJob';

import AdminProducts from './pages/admin/Product/AdminProducts';
// import { useLocation } from 'react-router-dom';
import AdminDashboard from './pages/admin/HomeAdmin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';

import ApplyJob from './pages/user/Careers/ApplyJob';

import Resources from './pages/user/Resources/Resources';
import Test from './test';
import NewAccount from './pages/admin/HomeAdmin/NewAccount';
import NewItem from './pages/admin/Product/NewItem';
import AdminApplications from './pages/admin/Careers/AdminApplications';
import AdminOverviewsList from './pages/admin/OurFirm/OverView/AdminOverviewsList';
import AdminOverviewForm from './pages/admin/OurFirm/OverView/AdminOverviewForm';
import AdminInvestorRelationsForm from './pages/admin/OurFirm/InvestorRelations/AdminInvestorRelationsForm';
import AdminInvestorRelationsList from './pages/admin/OurFirm/InvestorRelations/AdminInvestorRelationsList';
import AdminPersonForm from './pages/admin/OurFirm/Persons/AdminPersonForm';
import AdminPersonList from './pages/admin/OurFirm/Persons/AdminPersonList';
import AdminBusinessPrincipleForm from './pages/admin/OurFirm/BusinessPrinciples/AdminBusinessPrincipleForm';
import AdminBusinessPrincipleList from './pages/admin/OurFirm/BusinessPrinciples/AdminBusinessPrincipleList';
import InvestorRelationsDetail from './pages/user/About/InvestorRelationsDetail';


export default function PageRoutes() {
  const { auth } = useContext(AuthContext);
  // const location = useLocation();
  const isAuthenticated = !!auth.jwt;
  const isAdmin = auth?.user?.roles?.some(role => role.name === 'ADMIN');
  // console.log('Decoded Roles:', auth?.user?.roles);
  // console.log('Auth State:', auth);
  // console.log('isAdmin:', isAdmin);

  return (
    <Routes>
      <Route
        path='/'
        element={
          !isAdmin ? <LayoutMaster /> : <Navigate to={`/admin`} replace />
        }
      >
        <Route index element={<Home />} />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/' replace /> : <Login />}
        />
        <Route
          path='/register'
          element={isAuthenticated ? <Navigate to='/' replace /> : <Register />}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='about' element={<About />} />
        <Route path="/investor-relations/:id" element={<InvestorRelationsDetail />} />
        <Route path='products' element={<Products />} />
        <Route path='resources' element={<Resources />} />
        <Route path='careers' element={<Careers />} />
        <Route path="/jobs/:id/apply" element={<ApplyJob />} />
        <Route
          path='contact'
          element={
           
              <Contact />
          }
        />

        <Route path='test' element={<Test />} />
      </Route>

      <Route
        path='/admin'
        element={isAdmin ? <AdminLayout /> : <Navigate to='/' replace />}
      >
\        <Route index element={<AdminDashboard />} />
        <Route path="new-account" element={<NewAccount />} />

        {/* /admin/news */}
        <Route path='/admin/news/*' element={<AdminNews />} />

        {/* /admin/careers */}
        <Route path="/admin/jobs" element={<AdminCareers />} />
        <Route path="/admin/jobs/add" element={<AddEditJob mode="add" />} />
        <Route path="/admin/jobs/edit/:id" element={<AddEditJob mode="edit" />} />

        {/* /admin/products */}
        <Route path="/admin/products/:productType" element={<AdminProducts />} />
        <Route path="/admin/products/:productType/new" element={<NewItem />} />
        {/* /admin/contacts */}
        <Route path='contacts' element={<AdminContacts />} />
        <Route path="/admin/applications" element={<AdminApplications />} />

        <Route path="/admin/our-firm/overviews" element={<AdminOverviewsList />} />
        <Route path="/admin/our-firm/overviews/new" element={<AdminOverviewForm />} />
        <Route path="/admin/our-firm/overviews/:id" element={<AdminOverviewForm />} />
        <Route
          path="/admin/our-firm/business-principles"
          element={<AdminBusinessPrincipleList />}
        />
        <Route
          path="/admin/our-firm/business-principles/new"
          element={<AdminBusinessPrincipleForm />}
        />
        <Route
          path="/admin/our-firm/business-principles/:id"
          element={<AdminBusinessPrincipleForm />}
        />

        {/* Persons */}
        <Route path="/admin/our-firm/persons" element={<AdminPersonList />} />
        <Route path="/admin/our-firm/persons/new" element={<AdminPersonForm />} />
        <Route path="/admin/our-firm/persons/:id" element={<AdminPersonForm />} />

        {/* InvestorRelations */}
        <Route
          path="/admin/our-firm/investor-relations"
          element={<AdminInvestorRelationsList />}
        />
        <Route
          path="/admin/our-firm/investor-relations/new"
          element={<AdminInvestorRelationsForm />}
        />
        <Route
          path="/admin/our-firm/investor-relations/:id"
          element={<AdminInvestorRelationsForm />}
        />
      </Route>

      {/* Redirect */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
